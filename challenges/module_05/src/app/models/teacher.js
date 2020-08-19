const db = require("../../config/db")
const {
    age,
    grau,
    aula,
    date
} = require("../../lib/utils")

module.exports = {
    all(callback){
        db.query(`
        SELECT *
        FROM teachers
        ORDER BY name`, function (err, results) {
            if(err) throw 'Database error!'

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
        INSERT INTO teachers (
            name,
            birth,
            schooling,
            type,
            areas,
            avatar_url,
            created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`

        const values = [
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.type,
            data.areas,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback){
        const query = `
        SELECT *
        FROM teachers
        WHERE id = $1`

        db.query(query, [id], function (err, results) {
            if(err) throw 'Database error!'

            callback(results.rows[0])
        })
    }
}