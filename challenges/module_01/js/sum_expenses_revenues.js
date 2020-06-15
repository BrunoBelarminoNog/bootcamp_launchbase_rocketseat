const usuarios = [{
        nome: "Salvio",
        receitas: [115.3, 48.7, 98.3, 14.5],
        despesas: [85.3, 13.5, 19.9]
    },
    {
        nome: "Marcio",
        receitas: [24.6, 214.3, 45.3],
        despesas: [185.3, 12.1, 120.0]
    },
    {
        nome: "Lucia",
        receitas: [9.8, 120.3, 340.2, 45.3],
        despesas: [450.2, 29.9]
    }
];

function somaNumeros(numeros) {
    let soma = 0

    for (numero of numeros) {
        soma += numero
    }

    return soma
}

function calculaSaldo(receitas, despesas) {
    let receita = somaNumeros(receitas)
    let despesa = somaNumeros(despesas)
    let saldo = receita - despesa

    return saldo
}

for (let i = 0; i < usuarios.length; i++) {
    let saldo = calculaSaldo(usuarios[i].receitas, usuarios[i].despesas)

    if (saldo < 0) {
        console.log(`${usuarios[i].nome} possui saldo NEGATIVO de ${saldo}`)
    } else {
        console.log(`${usuarios[i].nome} possui saldo POSITIVO de ${saldo}`)
    }
}