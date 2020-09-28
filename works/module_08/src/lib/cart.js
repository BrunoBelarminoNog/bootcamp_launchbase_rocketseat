const { formatPrice } = require('./utils')

//carrinho fica guardado na sessão(req.session)

const Cart = {
    init(oldCart) {
        if(oldCart){
            this.items = oldCart.items;
            this.total = oldCart.total;
        } else {
            this.items = [];
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            } 
        }

        return this
    },
    //adicionar 1 item do carrinho
    addOne(product) {
        //ver se o produto ja existe no carrinho
        let inCart = this.items.find(item => item.product.id == product.id)

        //se não existe
        if(!inCart) {
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        if(inCart.quantity >= product.quantity) return this

        //UPDATE ITEM (1 item do carrinho)
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        //UPDATE CART (carrinho inteiro)
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this

    },
    //remover 1 item do carrinho
    removeOne(productId) {
        //pegar o item do carrinho
        const inCart = this.items.find(item => item.product.id == productId)

        if(!inCart) return this
        
        //atualizar o item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)

        //atualizar o carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {
            //PRIMEIRA FORMA DE CHEGAR NO RESULTADO:
            const itemIndex = this.items.indexOf(inCart)
            this.items.splice(itemIndex, 1)

            /* SEGUNDA FORMA DE CHEGAR NO MESMO RESULTADO:

            const filteredItems = this.items.filter(item => 
                item.product.id != inCart.product.id)

                this.items = filteredItems
            */
            return this
        }

        return this
    },
    //deletar todo o item 
    delete(productId) {
        const inCart = this.items.find(item => item.product.id == productId)

        if (!inCart) return this

        if(this.items.length > 0) {
            this.total.quantity -= inCart.quantity
            this.total.price -= (inCart.product.price * inCart.quantity)
            this.total.formattedPrice = formatPrice(this.total.price)
        }

        this.items = this.items.filter(item => inCart.product.id != item.product.id)
        return this
    }
}


/*********** TESTE *********/
/*
const product = {
    id: 1,
    price: 199,
    quantity: 2
}

const product2 = {
    id: 2,
    price: 999,
    quantity: 1
}

console.log('add first cart item')
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('add second cart item')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('add third cart item')
oldCart = Cart.init(oldCart).addOne(product2)
console.log(oldCart)

console.log('add last cart item')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('remove one cart item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)

console.log('remove one product')
oldCart = Cart.init(oldCart).delete(product2.id)
console.log(oldCart) 
*/

module.exports = Cart