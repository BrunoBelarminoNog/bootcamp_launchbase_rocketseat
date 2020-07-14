const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const closeModal = document.querySelector('.close-modal');
const maximizeMOdal = document.querySelector('.maximize-modal');

for (let card of cards) {
    card.addEventListener('click', function () {
        const cursoId = card.getAttribute('id')


        
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${cursoId}`
        maximizeMOdal.href = `https://rocketseat.com.br/${cursoId}`
        
    })
    
}

closeModal.addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
})

