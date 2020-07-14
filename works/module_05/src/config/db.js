const {Pool} = require("pg")
//Poll => tipo pool conecta automaticamnete no banco qndo for necessário fazer uma query(pesquisa no banco)

//implementar as credenciais do banco de dados em um novo objeto Pool:
module.exports= new Pool ({
    user: 'postgres',
    password: '403251',
    host: 'localhost',
    port: '5432',
    database: 'gymmanager'
})

