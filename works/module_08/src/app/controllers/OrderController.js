const LoadProductService = require('../services/LoadProductService')
const LoadOrderService = require('../services/LoadOrderService')
const User = require('../models/User')
const Order = require('../models/Order')


const mailer = require('../../lib/mailer')
const Cart = require('../../lib/cart')
const { update } = require('../models/Order')



const email = (seller, product, buyer) => `
<h2> Olá ${seller.name}</h2>
<p> Você tem um novo pedido de compra do seu produto. </p>
<p>Produto: ${product.name}</p>
<p>Preço: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador</h3>
<p>${buyer.name}</p>
<p>${buyer.email}</p>
<p>${buyer.address}</p>
<p>${buyer.cep}</p>
<p><br/><br/></p>
<p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
<p><br/><br/></p>
<p>Atenciosamente, Equipe Launchstore.
`

module.exports = {
    async index (req, res) {
        //pegar os pedidos do usuario
        const orders = await LoadOrderService.load('orders', {
            where: {buyer_id: req.session.userId}
        })


        return res.render("orders/index", {orders})

    },
    async sales(req, res) {
        //pegar os pedidos do usuario
        const sales = await LoadOrderService.load('orders', {
            where: {
                seller_id: req.session.userId
            }
        })


        return res.render("orders/sales", {
            sales
        })

    },
    async show(req, res) {
        const order = await LoadOrderService.load('order', {
            where: {id: req.params.id}
        })

        return res.render("orders/details", {order})
    },
    async post(req, res) {

        try {
            //pegar os produtos do carrinho
            const cart = Cart.init(req.session.cart)

            //verificar se o vendedor de algum item do carrinho é o mesmo que esta fazendo a compra 
            const buyer_id = req.session.userId
            const filteredItems = cart.items.filter(item =>
                item.product.user_id != buyer_id
            )

            //criar o pedido
            const createOrdersPromise = filteredItems.map(async item => {
                let {
                    product,
                    price: total,
                    quantity
                } = item
                const {
                    price,
                    id: product_id,
                    user_id: seller_id
                } = product
                const status = "open"

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status
                })

                //pegar os dados do produto
                product = await LoadProductService.load('product', {
                    where: {
                        id: product_id
                    }
                })

                //os dados do vendedor
                const seller = await User.findOne({
                    where: {
                        id: seller_id
                    }
                })

                //os dados do comprador
                const buyer = await User.findOne({
                    where: {
                        id: buyer_id
                    }
                })

                //enviar email com dados da compra para o vendedor do produto
                await mailer.sendMail({
                    to: seller.email,
                    from: 'no-replay@launchstore.com',
                    subject: 'Novo pedido de compra',
                    html: email(seller, product, buyer)
                })

                return order

            })

            await Promise.all(createOrdersPromise)

            //limpar carrinho
            delete req.session.cart
            Cart.init()

            //notificar o usuario com mensagens de sucesso
            return res.render('orders/success')

        } catch (error) {
            console.error(error);
            return res.render('orders/error')
        }
    },
    async update(req, res){
        try {
            
            const {id, action} = req.params

            const acceptedAction = ['close', 'cancel']

            if(!acceptedAction.includes(action)) return res.send("Can't do this action")

            //pegar pedido
            const order = await Order.findOne({
                where: {id}
            })

            if(!order) return res.send("Order not found")

            //verificar se ele está aberto
            if(order.status != 'open') return res.send("Can't do this action")

            //atualizar o pedido
            const statuses = {
                close: "sold",
                cancel: "canceled"
            }

            order.status = statuses[action]

            await Order.update(id, {
                status: order.status
            })

            //redirecionar
            return res.redirect("/orders/sales")

        } catch (error) {
            console.error(error);
        }
    }

}