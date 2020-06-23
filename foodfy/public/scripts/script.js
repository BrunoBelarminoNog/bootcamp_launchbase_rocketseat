

function abrirReceita(index) {
        window.location.href = `/receitas/${index}`

}

function esconder(element, id){
       let elements = document.querySelector(`.${element}`);
        let button = document.querySelector(`span#${id}`)

        if ( elements.classList == `${element} none`) {
                elements.classList.remove('none');
                button.innerHTML = 'ESCONDER'
        } else {
                elements.classList.add('none');
                button.innerHTML = 'MOSTRAR'

        }
       
        console.log(element)


}