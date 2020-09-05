const Product = require("../models/Product")
const File = require("../models/File")
const {
    formatPrice
} = require("../../lib/utils")

module.exports = {
    async index(req, res) {

        try {

            let results;
            let params = {}

            const {filter, category} = req.query

            if(!filter) return res.redirect("/")

            params.filter = filter

            if (category) {
                params.category = category
            }

            results = await Product.search(params)
            
            let product = results.rows

            async function getImage(productId) {
                results = await Product.files(productId)
                let files = results.rows.map(file => `${req.protocol}://${req.headers.host}/images/${file.name}`)

                return files[0]
            }

            const productsPromise = product.map(async product => {
            product.image = await getImage(product.id)
            product.price = formatPrice(product.price)
            product.oldPrice = formatPrice(product.old_price)

            return product
            })

            let products = await Promise.all(productsPromise)

            const search = {
                term: req.query.filter,
                total: products.length  
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {

                const found = categoriesFiltered.some(cat => cat.id == category.id)

                if(!found) categoriesFiltered.push(category)

                return categoriesFiltered
            }, [])

            return res.render('search/index', {
            products, search, categories
        })

        } catch (err) {
            console.error(err);
        }
    }
}