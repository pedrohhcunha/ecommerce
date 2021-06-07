const modal = document.querySelector('.area-modal')
const openCriarProduto = document.querySelector('#openCriarProduto')
const closeCriarProduto = document.querySelector('#closeCriarProduto')
let btnsCloseAdded = document.querySelectorAll('#deleteAdded')
let added = document.querySelectorAll('.added')
const priceInput = document.querySelector('#priceInput')
openCriarProduto.addEventListener('click', () => {
    modal.classList.add('active')
})
closeCriarProduto.addEventListener('click', () => {
    modal.classList.remove('active')
})
document.addEventListener('keydown', function(event) { //pega o evento de precionar uma tecla
    if(event.keyCode != 46 && event.keyCode != 8){//verifica se a tecla precionada nao e um backspace e delete
        var i = priceInput.value.length; //aqui pega o tamanho do input
        if (i === 3) //aqui faz a divisoes colocando uma , no terceiro 
            priceInput.value = priceInput.value + ",";
        }
});
window.onload = ()=> {
    adding("inputSize", "btnSize", "size")
    adding("inputColor", "btnColor", "color")
    adding("inputCategory", "btnCategory", "category")
    criarProduto()
}
function adding(input, btn, area){
    input = document.querySelector(`#${input}`)
    btn = document.querySelector(`#${btn}`)
    area = document.querySelector(`#${area}`)
    btn.addEventListener('click', () => {
        let div = document.createElement('div')
        div.classList.add('added')
        area.appendChild(div)

        let span = document.createElement('span')
        span.innerText = input.value
        div.appendChild(span)

        let i = document.createElement('i')
        i.classList.add('fas')
        i.classList.add('fa-trash')
        i.setAttribute('id', 'deleteAdded')
        div.appendChild(i)
        input.value = ""
        btnsCloseAdded = document.querySelectorAll('#deleteAdded')
        added = document.querySelectorAll('.added')
        for (let index = 0; index < btnsCloseAdded.length; index++) {
            const btn = btnsCloseAdded[index];
            btn.addEventListener('click', () => {
                added[index].remove()
            })
        }
    })
}
function criarProduto() {
    let idAtual = 0

    products.forEach(element => {
        product = document.createElement("div")
        product.classList.add('produto')
        let categorys = ""
        element.category.forEach(category => {
            categorys += category + " " 
        });
        product.setAttribute('data-price', element.price)
        product.setAttribute('data-date', element.date)
        product.setAttribute('data-category', categorys)
        product.setAttribute('data-id', idAtual)
        document.querySelector('.produtos').appendChild(product)

        h2 = document.createElement("h2")
        h2.innerText = element.name
        product.appendChild(h2)
    
        div = document.createElement("div")
        div.classList.add('area-right')
        product.appendChild(div)    
        
        icon = document.createElement('i')
        icon.classList.add('fas')
        icon.classList.add('fa-edit')
        div.appendChild(icon)

        i2 = document.createElement('i')
        i2.classList.add('fas')
        i2.classList.add('fa-trash')
        div.appendChild(i2)
    
        idAtual++
    })
}
document.querySelector('#selectFiltro').addEventListener('click', () => {
    filtrarProdutos(document.querySelector('#selectFiltro').value)
})
function filtrarProdutos(filtro) {
    filtro = filtro.toLowerCase()

    if(filtro != "todos"){
        document.querySelectorAll('.produto').forEach(element => {
            element.style.display = "none"
            let categorysElement = element.getAttribute('data-category')
            console.log(categorysElement, categorysElement.indexOf(filtro))
            if(categorysElement.indexOf(filtro) >= 0){
                element.style.display = "flex"
            }
        });
    }else{
        document.querySelectorAll('.produto').forEach(element => {
                element.style.display = "flex"
        }); 
    }
}
document.querySelector('#selectOrdem').addEventListener('click', () => {
    let atributo = document.querySelector('#selectOrdem').value.split('/')[0]
    let tipo = document.querySelector('#selectOrdem').value.split('/')[1]
    ordenarProdutos(atributo, tipo)
})
function ordenarProdutos(atributo, tipo) {
    let produtos = document.querySelectorAll('.produto')
    var ordem = [].map.call(produtos, function(element) {
        return element;
    });
    if(atributo === "price"){
        ordem.sort(function(a,b) {
            var ca = parseInt(a.getAttribute(`data-price`), 10);
            var cb = parseInt(b.getAttribute(`data-price`), 10);
            return cb - ca;
        });
    }else{
        ordem.sort(function(a,b) {
            var ca = new Date(a.getAttribute(`data-date`));
            var cb = new Date(b.getAttribute(`data-date`));
            return cb - ca;
        });   
    }
    if(tipo == "c"){
        ordem = ordem.reverse()
    }
    for(var i=0; i<ordem.length; i++) {
        document.querySelector('.produtos').appendChild(ordem[i]);   
    }
    
}
document.querySelector('#fileUpload').onchange = evt => {
    for(let i = 0; i < document.querySelector('#fileUpload').files.length; i++) {
        let file = document.querySelector('#fileUpload').files[i];
        if(file){
            if(i === 0){
                document.querySelector('#imgPrincipal').src = URL.createObjectURL(file)

            } else {
                document.querySelectorAll('.imgS')[i-1].src = URL.createObjectURL(file)
                //Não sei pq -1 mas funcionou
            }
            console.count()
        }
    }
}
  