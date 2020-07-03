

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

function newIngredient() {
        const ingredients = document.querySelector("#ingredients")
        const newIngredient = document.querySelectorAll(".new_ingredients");
        const spanHidden = document.querySelector(".span_ing")


        const newField = newIngredient[newIngredient.length - 1].cloneNode(true);

        
        if(newField.children[0].value == "") {
                alert("Preencher campo vazio")
                return false
        }

        if (spanHidden.classList == "material-icons span_ing hidden") {
                spanHidden.classList = "material-icons"
        }


        newField.children[0].value = "";

        ingredients.appendChild(newField)

}

function removeIngredient(span) {
        const ingredients = document.querySelector("#ingredients")

        const field = span.parentNode;

        ingredients.removeChild(field)

}

function newPreparation() {
        const preparations = document.querySelector("#preparation")
        const newPreparation = document.querySelectorAll(".new_preparation");
        const spanHidden2 = document.querySelector(".span_prep")


        const newField = newPreparation[newPreparation.length - 1].cloneNode(true);

        if (newField.children[0].value == "") {
                alert("Preencher campo vazio")
                return false
        }

       if (spanHidden2.classList == "material-icons span_prep hidden2") {
               spanHidden2.classList = "material-icons"
       }


        newField.children[0].value = "";

        preparations.appendChild(newField)

}

function removePreparation(span) {
        const preparations = document.querySelector("#preparation")

        const field = span.parentNode;

        preparations.removeChild(field)

}