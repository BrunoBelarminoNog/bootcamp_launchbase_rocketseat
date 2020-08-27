const db = require('../../config/db');

module.exports = {
    all() {
        return db.query(`
            SELECT * FROM chefs ORDER BY name asc
        `)
    },
    create(data) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url
            ) VALUES ($1, $2) RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON(recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id])
    },
    findName(id) {
        return db.query(`
            SELECT name FROM chefs WHERE id = $1
        `, [id])
    }
}