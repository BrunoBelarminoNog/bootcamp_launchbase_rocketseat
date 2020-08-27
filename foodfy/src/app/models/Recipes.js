const db = require('../../config/db');

module.exports = {
    all() {
        return db.query(`
            SELECT id, chef_id, title, image FROM recipes ORDER BY title ASC
        `)
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                image,
                title,
                chef_id,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.chef_id,
            data.ingredients,
            data.preparation,
            data.information
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT * FROM recipes WHERE id = $1`, [id])
    },
    chefSelectOptions() {
       return db.query(`SELECT name, id FROM chefs`)
    },
    chefRecipes(id) {
        return db.query(`
            SELECT id, title, image FROM recipes WHERE chef_id = $1 `, [id])
    }
}