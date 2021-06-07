const areaProdutos = document.querySelector('.produtos')
const escModal = document.querySelector('#escModal')
window.onload += criarElementos()
const buttonsViewMore = document.querySelectorAll('.viewMore');
escModal.onclick = closeModal
document.querySelector('#btnComprar').onclick = comprarProduto
for (let i = 0; i < buttonsViewMore.length; i++) {
    const button = buttonsViewMore[i];
        button.addEventListener('click', () => {
        abrirModal(i)
    })
    
}
document.querySelector('.imgPrincipalModal').addEventListener('mousemove', (e) => {
    const X = e.clientX - 276
    const Y = e.clientY - 90

    document.querySelector('.imgPrincipalModal').style.transformOrigin = `${X}px ${Y}px`
    document.querySelector('.imgPrincipalModal').style.transform = "scale(3)"
})
document.querySelector('.imgPrincipalModal').addEventListener('mouseout', (e) => {
    document.querySelector('.imgPrincipalModal').style.transformOrigin = `0px 0px`
    document.querySelector('.imgPrincipalModal').style.transform = "scale(1)"
})
document.querySelector('#selectFiltro').addEventListener('click', () => {
    filtrarProdutos(document.querySelector('#selectFiltro').value)
})
document.querySelector('#selectOrdem').addEventListener('click', () => {
    let atributo = document.querySelector('#selectOrdem').value.split('/')[0]
    let tipo = document.querySelector('#selectOrdem').value.split('/')[1]
    ordenarProdutos(atributo, tipo)
})
function criarElementos() {
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
        areaProdutos.appendChild(product)
    
        areaImg = document.createElement("div")
        areaImg.classList.add('area-img')
        product.appendChild(areaImg)
    
        img = document.createElement("img")
        img.src = "img/products/" + idAtual + "/" + element.images[0]
        areaImg.appendChild(img)
    
        filter = document.createElement("div")
        filter.classList.add('filter')
        areaImg.appendChild(filter);
    
        verMais = document.createElement("button")
        verMais.innerText = "Ver Detalhes"
        verMais.classList.add("viewMore")
        areaImg.appendChild(verMais)
    
        areaInfo = document.createElement("div")
        areaInfo.classList.add('area-info')
        product.appendChild(areaInfo)
    
        principalInfo = document.createElement("div")
        principalInfo.classList.add('principal-info')
        areaInfo.appendChild(principalInfo)
    
        title = document.createElement('h3')
        title.innerText = element.name
        principalInfo.appendChild(title)
    
        price = document.createElement('h2')
        price.innerText = "R$" + element.price
        principalInfo.appendChild(price)
    
        sizeInfo = document.createElement("div")
        sizeInfo.classList.add('size-info')
        areaInfo.appendChild(sizeInfo)
    
        size = document.createElement("h3")
        size.innerText = "Tamanho:"
        sizeInfo.appendChild(size)
    
        sizes = document.createElement("div")
        sizes.classList.add('sizes')
        sizeInfo.appendChild(sizes)
    
        element.sizes.forEach(ele => {
            eleCreate = document.createElement("span")
            eleCreate.innerText = ele
            sizes.appendChild(eleCreate)
        });
    
        colorInfo = document.createElement("div")
        colorInfo.classList.add('color-info')
        areaInfo.appendChild(colorInfo)
    
        color = document.createElement("h3")
        color.innerText = "Cor:"
        colorInfo.appendChild(color)
    
        colors = document.createElement("div")
        colors.classList.add('colors')
        colorInfo.appendChild(colors)
    
        element.colors.forEach(ele => {
            colorSpan = document.createElement("span")
            colorSpan.style.background = ele[1]
            colors.appendChild(colorSpan)
        });
    
        idAtual++
    }); 
}
function filtrarProdutos(filtro) {
    filtro = filtro.toLowerCase()

    if(filtro != "todos"){
        document.querySelectorAll('.produto').forEach(element => {
            element.style.display = "none"
            let categorysElement = element.getAttribute('data-category')
            console.log(categorysElement, categorysElement.indexOf(filtro))
            if(categorysElement.indexOf(filtro) >= 0){
                element.style.display = "block"
            }
        });
    }else{
        document.querySelectorAll('.produto').forEach(element => {
                element.style.display = "block"
        }); 
    }
}
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
function abrirModal(id) {

    document.querySelector('.imgPrincipalModal').src = "img/products/"+ id + "/" + products[id].images[0]
    for (let index = 0; index < document.querySelectorAll('.imgModal').length; index++) {
        const element = document.querySelectorAll('.imgModal')[index];
        if(products[id].images[index]){
            element.src = "img/products/"+ id + "/" + products[id].images[index]
        } else{
            element.src = "img/logo.png"
        }
    }
    document.querySelector('#nomeModal').innerText = products[id].name
    document.querySelector('#priceModal').innerText = "R$ " + products[id].price
    document.querySelector('#descModal').innerText = products[id].desc
    document.querySelector("#sizesModal").innerHTML = ""
    products[id].sizes.forEach(element => {
        spanModal = document.createElement("span")
        spanModal.innerText = element
        spanModal.classList.add('size-option')
        document.querySelector("#sizesModal").appendChild(spanModal)
        let sizeOptions = document.querySelectorAll('.size-option')
        sizeOptions.forEach(elementIn => {
            elementIn.addEventListener('click', () => {
                sizeOptions.forEach(elementInto => {
                    elementInto.classList.remove('active')
                });
                elementIn.classList.add('active')
            })
        });
    });
    document.querySelector("#colorsModal").innerHTML = ""
    products[id].colors.forEach(element => {
        spanColorModal = document.createElement("span")
        spanColorModal.style.background = element[1]
        spanColorModal.classList.add('color-option')
        spanColorModal.setAttribute('data-color', element[0])
        document.querySelector("#colorsModal").appendChild(spanColorModal)

        let colorsOptions = document.querySelectorAll('.color-option')
        colorsOptions.forEach(elementIn => {
            elementIn.addEventListener('click', () => {
                colorsOptions.forEach(elementInto => {
                    elementInto.classList.remove('active')
                });
                elementIn.classList.add('active')
            })
        });
    });

    document.querySelector('.area-modal').classList.add('active')
    document.querySelector('body').classList.add('modal')

    document.querySelectorAll('.imgModal').forEach(imgModal => {
        imgModal.addEventListener('click', () =>{
            document.querySelector('.imgPrincipalModal').src = imgModal.src
        })
    });
}
function closeModal() {
    document.querySelector('.area-modal').classList.remove('active')
    document.querySelector('body').classList.remove ('modal')
}
function comprarProduto() {
    let nome = document.querySelector('#nomeModal').innerText
    let size = ""
    let color = ""
    document.querySelectorAll('.size-option').forEach(element => {
        if(element.classList.contains('active')){
            size = element.innerText
            return
        }
    })
    document.querySelectorAll('.color-option').forEach(element => {
        if(element.classList.contains('active')){
            color = element.getAttribute('data-color')
            return
        }
    })
    let error = ""
    if(size === "" && color === ""){
        error = "Você precisa selecionar o tamanho e a cor para efetuar a compra!"
    } else if(size === ""){
        error = "Você precisa selecionar o tamanho a compra"
    } else if(color === ""){
        error = "você precisa selecionar a cor para efetuar a compra"
    }
    if(error != ""){
        alert(error)
    } else{
        let string = `Olá vim atráves do seu site! Gostaria de comprar o item "${nome}" na cor "${color}" e tamanho "${size}".`
        let apiComplete = `https://api.whatsapp.com/send?phone=49988825870&text=${string}`
        let a = document.createElement('a')
        a.href = apiComplete
        a.target = "BLANK"
        a.click()
    }
}