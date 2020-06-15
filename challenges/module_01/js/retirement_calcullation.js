const name = prompt("Digite seu nome: ");
let gender = prompt("Sexo masculino ou feminino? (Digite M / F)");
let age = prompt("Digite sua idade: ")
let contribution = prompt("Digite quantos anos você contribuiu: ")

age = parseInt(age);
contribution = parseInt(contribution);
gender = (gender).toUpperCase()

let sumAgeContribution = age + contribution

if ((gender === 'M' && contribution >= 35 && sumAgeContribution >= 95) || (gender === 'F' && contribution >= 30 && sumAgeContribution >= 85)){
    document.write(`${name}, você pode se aposentar!`)
} else {
    document.write(`${name}, você ainda <strong>não</strong> pode se aposentar!`)
}