const db = require('../../config/db');

module.exports = {
    all() {
        return db.query(`
            SELECT id, chef_id, title FROM recipes ORDER BY title ASC
        `)
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                title,
                chef_id,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5) RETURNING id
        `

        const values = [
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
    findBy(filter) {
        const query = `
        SELECT * FROM recipes
        WHERE recipes.title ILIKE '%${filter}%'
        ORDER BY title ASC 
        `
        return db.query(query)
    },
    update(data) {
        const query = `
            UPDATE recipes SET
                title=($1),
                chef_id=($2),
                ingredients=($3),
                preparation=($4),
                information=($5)
            WHERE id = $6
        `

        const values = [
            data.title,
            data.chef_id,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)

    },
    async delete(id) {
        await db.query(`DELETE FROM recipe_files WHERE recipe_id = $1`, [id]);


        return db.query(`DELETE FROM recipes WHERE id=$1`, [id])
    },
    chefSelectOptions() {
        return db.query(`SELECT name, id FROM chefs`)
    },
    chefRecipes(id) {
        return db.query(`
            SELECT id, title FROM recipes WHERE chef_id = $1 `, [id])
    },
    filesId(id) {
        return db.query(`
            SELECT file_id FROM recipe_files WHERE recipe_id = $1
        `, [id])
    },
    files(id) {
        return db.query(`
            SELECT files.* 
            FROM files 
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id) 
            WHERE recipes.id = $1
        `, [id]);
    }
}