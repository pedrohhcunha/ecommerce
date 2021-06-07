const prevCarrossel = document.querySelector('#prevCarrossel')
const nextCarrossel = document.querySelector('#nextCarrossel')
const dotsCarrossel = document.querySelectorAll('.dot')
const imgsCarrossel = document.querySelectorAll('.imgCarrossel')
let control = 0;

nextCarrossel.addEventListener('click', () => {
    switch (control) {
        case 0:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position0')
                element.classList.add('position1')
            });
            control = 1;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[1].classList.add('active')
            break;
        case 1:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position1')
                element.classList.add('position2')
            });
            control = 2;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[2].classList.add('active')
            break;
        case 2:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position2')
                element.classList.add('position3')
            });
            control = 3;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[3].classList.add('active')
            break;
        default:
            break;
    }
})
prevCarrossel.addEventListener('click', () => {
    switch (control) {
        case 1:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position1')
                element.classList.add('position0')
            });
            control = 0;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[0].classList.add('active')
            break;
        case 2:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position2')
                element.classList.add('position1')
            });
            control = 1;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[1].classList.add('active')
            break;
        case 3:
            imgsCarrossel.forEach(element => {
                element.classList.remove('position3')
                element.classList.add('position2')
            });
            control = 2;
            dotsCarrossel.forEach(element => {
                element.classList.remove('active')
            });
            dotsCarrossel[2].classList.add('active')
            break;
        default:
            break;
    }
})
const header = document.querySelector('header')
document.querySelector('#btnHeader').addEventListener('click', () =>{
    header.classList.toggle('active')
})
