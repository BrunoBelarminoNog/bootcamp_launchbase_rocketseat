const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const closeModal = document.querySelector('.close-modal');

for (let card of cards){
    card.addEventListener('click', function(){
        modalOverlay.classList.add('active')
    })
}

closeModal.addEventListener('click', function () {
    modalOverlay.classList.remove('active')
})

modalOverlay.querySelector('iframe').src = 'https://www.youtube.com/embed/XcU9GEUZTQA'