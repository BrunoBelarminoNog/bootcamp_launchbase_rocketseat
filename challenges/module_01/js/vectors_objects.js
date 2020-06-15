const name = 'Carlos'
const age = 32
const technologies = [
    {   name: 'C++',
        specialty: 'Desktop'
    },
    {   name: 'Python',
        specialty: 'Data Science'
    },
    {   name: 'JavaScript',
        specialty: 'Web/Mobile'
    }
]

console.log(`O usuário ${name} tem ${age} e usa a tecnologia ${technologies[0].name} com especialidade em ${technologies[0].specialty}.`)