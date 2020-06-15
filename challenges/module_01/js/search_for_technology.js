const usuarios = [{
        name: "Carlos",
        technology: ["HTML", "CSS"]
    },
    {
        name: "Jasmine",
        technology: ["JavaScript", "CSS"]
    },
    {
        name: "Tuane",
        technology: ["HTML", "Node.js"]
    }
];

function checaSeUsuarioUsaCSS(usuario){
    for (tech of usuario) {
        if (tech == 'CSS'){
            return true
        } else {
            return false
        }
    }
}
console.log(checaSeUsuarioUsaCSS(usuarios))