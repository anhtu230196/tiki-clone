const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error })
        if (cart) {
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product)

            let condition, action;
            if (item) {
                condition = { "user": req.user._id, "cartItems.product": product };
                action = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
            } else {
                condition = { "user": req.user._id }
                action = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }
            }
            Cart.findOneAndUpdate(condition, action).exec((error, _cart) => {
                if (error) return res.status(400).json({ error })
                if (_cart) return res.status(201).json({ cart: _cart })
            })

        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })

            cart.save()
                .then(cart => res.status(200).json({ cart }))
                .catch(err => res.status(400).json({ err }))
        }
    })

}