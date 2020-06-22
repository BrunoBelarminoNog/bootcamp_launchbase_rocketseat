const modalOverlay = document.querySelector('.modalOverlay');
const cards = document.querySelectorAll('.card');
const modalClose = document.querySelector('.modal_close');


for (let card of cards){
    card.addEventListener('click', () => {
        const recipeId = card.getAttribute('id');
        const recipeTitle = document.querySelector(`#${recipeId} h3`).innerHTML
        const recipeBy = document.querySelector(`#${recipeId} p`).innerHTML


        modalOverlay.classList.add('active');
        modalOverlay.querySelector('img').src = `./assets/${recipeId}.png`
        modalOverlay.querySelector('h3').innerHTML = recipeTitle
        modalOverlay.querySelector('p').innerHTML = recipeBy
    })
}

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
})

function fechar() {
    modalOverlay.classList.remove('active');
}
function abrir() {
    modalOverlay.classList.add('active');
}