const form = document.getElementById('formCadastro');
const res = document.getElementById('res')
const listR = document.getElementById('listaR')
const select = document.getElementById('select')

// evento de submit do form
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const chave = document.getElementById('chave')
  const valor = document.getElementById('valor')

  if (!chave.value || !valor.value){
    res.style.color = 'red'
    res.innerText = 'Preencha os campos'
    return
  } 

  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      if (key == chave.value){
        res.style.color = 'red'
        res.innerText = 'Coleção ja existe'
        return
      } 
    }
  }

  // Salva na Local Storage
  localStorage.setItem(chave.value, valor.value)
  res.style.color = 'rgb(3, 87, 3)'
  res.innerText = 'Adcionado'
  setTimeout(()=> {res.innerText = ''}, 2000)
  // Limpa o campo de entrada
  chave.value = ''
  valor.value = ''

  init()
})

// Carrega items da LocalStorage na inicialização da página
function init() {
  if(localStorage.length == 0){
    listR.innerText = 'Nenhum item para exibir'
    return select.style.display = 'none'
  }else{
    document.getElementById('divColecao').innerHTML = `${localStorage.length} items`
    listR.innerText = ''
    select.style.display = 'flex'
  } 
  select.innerHTML = '<option disabled selected ">Selecione</option>'
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      select.innerHTML += `<option value="${key}">${key}</option>`
    }
  }
}

// chama a função que mostra o item selecionado - onclick no html do select 
function acaoSelect(value){
  console.log(value)
  res.innerText = ''
  vizualizar(value)
}

init()

/////////////////  Segundo    /////////////////////////////
let resposta = document.getElementById('resposta')
let divColecao = document.getElementById('divColecao')

// função que apaga o item
function apagar(chave) {
  let result = confirm(`Deseja apagar, ${chave} ?`)
  if (result) {
    localStorage.removeItem(chave)
    init()
    divColecao.innerHTML = '<p class="del">Apagado<p>'
    setTimeout(()=> {document.getElementById('divColecao').innerHTML = ''}, 2000)
  }
}

// função que atualiza o item
function atualiar(chave){
  let colecao = document.querySelector('.colecao')
  localStorage.setItem(chave, colecao.value)
  resposta.innerText = 'Atualizado'
  setTimeout(()=> {resposta.innerText = ''}, 2000)
}

// mostra o item selecionado
function vizualizar(chave) {
  
  let colecao

  // se for [] ou {}
  try {
  colecao = JSON.parse(localStorage.getItem(chave))
  console.log('Coleção parse', colecao)
  divColecao.innerHTML = `
  <textarea class='colecao'>${JSON.stringify(colecao, null, 2)}</textarea>
  <div>
  <button id='btn-copiar'>Copiar</button>
  <button onclick="apagar('${chave}')">Apagar</button>
  <button onclick="atualiar('${chave}')">Atualizar</button>
  <div>`

  // string
  } catch (error) {
    colecao = localStorage.getItem(chave)
    console.log('Coleção string', colecao)
    divColecao.innerHTML = `
    <textarea class='colecao'>${colecao}</textarea>
    <div>
    <button id='btn-copiar'>Copiar</button>
    <button onclick="apagar('${chave}')">Apagar</button>
    <button onclick="atualiar('${chave}')">Atualizar</button>
    <div>`    
  }
  
  let btnCopiar = document.getElementById('btn-copiar')
  
  // copiar para area de transferencia ao clicar no botao
  btnCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(colecao))
    .then(()=>{
      console.log('texto copiado com sucesso')
      resposta.innerText = 'Copiado'
      setTimeout(()=> {resposta.innerText = ''}, 2000)
    })
    .catch( error => {
      console.log('Falha ao copiar', error)
      resposta.innerText = 'Falha ao copiar'
      setTimeout(()=> {resposta.innerText = ''}, 2000)
    })
  })
}



