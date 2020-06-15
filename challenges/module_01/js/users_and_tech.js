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

 function checaSeUsuarioUsaCSS(usuario) {
     
     if ((usuario.technology).indexOf('CSS') != -1) {
        return true
     } else {
        return false
     }
 }

 for (let i = 0; i < usuarios.length; i++) {
     const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);

     if (usuarioTrabalhaComCSS) {
        console.log(`O usuário ${usuarios[i].name} trabalha com CSS`);
     }
 }