module.exports = {
    age: function(birth) {
        const today = new Date();
        const birthDay = new Date(birth);

        let age = today.getFullYear() - birthDay.getFullYear();
        const month = today.getMonth() - birthDay.getMonth();

        if (month < 0) {
            age = age - 1
        }

        return age
    },

    grau: function(escolaridade) {
        if (escolaridade == 2) return "Ensino Médio Completo";
        if (escolaridade == 3) return "Ensino Superior Completo";
        if (escolaridade == 4) return "Mestrado";
        if (escolaridade == 5) return "Doutorado";
    },

    aula: function(tipo) {
            if (tipo == "P") return "Presencial";
            if (tipo == "D") return "À distância";
    },

    date: function (timestamp) {
        const date = new Date(timestamp)

        let year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        const datas = {
            year,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            data: `${day} / ${month} / ${year}`
        }

        return datas
    }


}