function TAREFA() {

    const tarefas = document.querySelector('.tarefas')
    const inputTarefas = document.querySelector('.input-tarefa')

    // Pegar o evento click dos botoes ->
     
    document.addEventListener('click', function(e) {
        const elemento = e.target
        
        if(elemento.classList.contains('botao-add')) {
            if(inputTarefas.value === '') {
                return
            }
            criaTarefa(inputTarefas.value)
            LimparInput()
        } 

        if(elemento.classList.contains('apagar')) {
            elemento.parentElement.remove()
            SalvarTarefas()  // Salvar as tarefas quando clicar pra apagar
        }

    })

    // Funções

    function CriarLi() {
        const li = document.createElement('li')
        return li
    }

    function criaTarefa(textoInput) {
        //let textoInput = inputTarefas.value
        //const li = document.createElement('li')  //Poderia criar uma função só pra criar Li
        const li = CriarLi()
        li.innerText = textoInput
        tarefas.appendChild(li)
        //LimparInput()
        BotaoApagar(li)
        SalvarTarefas()
    }

    function LimparInput() {
        inputTarefas.value = ''
        inputTarefas.focus()
    }

    function BotaoApagar(li) {
        li.innerText += ' '
        const btnApagar = document.createElement('button')
        btnApagar.innerText = 'Apagar'
        li.appendChild(btnApagar)
        btnApagar.setAttribute('class', 'apagar')
    }

    // Pegar o codigo de click de cada tecla do teclado ->

    inputTarefas.addEventListener('keypress', function(e) {
        //console.log(e)

        if(e.keyCode === 13) {
            if(inputTarefas.value === '') {
                return
            }
            criaTarefa(inputTarefas.value)
            LimparInput()
        }
    })

    // Salvar a lista ->

    function SalvarTarefas() {
        const liTarefas = tarefas.querySelectorAll('li')
        //console.log(liTarefas)
        const listaDeTarefas = []

        for(let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
            listaDeTarefas.push(tarefaTexto) 
        }

        // Salvar a lista ->

        const TarefaJson = JSON.stringify(listaDeTarefas) //Transforma JSON em String
        localStorage.setItem('tarefas', TarefaJson) //Lugar para salvar a lista de Tarefas
        //console.log(TarefaJson)
    }
    
    // Vai ler as tarefas salvas e jogar elas na web

    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas')
        const listaDeTarefas = JSON.parse(tarefas)  // converter de novo de string para Array

        for(let tarefa of listaDeTarefas) {
            criaTarefa(tarefa)
            console.log(listaDeTarefas)
        }
    }

    adicionaTarefasSalvas()
    
}

TAREFA()
