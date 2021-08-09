const Product = require('../models/product')
const sluggify = require('slugify')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
    const { name, price, description, category, createdBy, quantity } = req.body
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map(file => { return { img: file.filename } })
    }
    const product = new Product({
        name,
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
        quantity,
        slug: sluggify(name)
    })
    product.save()
        .then(product => {
            res.status(200).json({ product })
        })
        .catch(err => res.status(400).json({ err }))
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug: slug }).select("_id")
        .then(category => {
            Product.find({ category: category._id })
                .then(products => {
                    if (products.length > 0) {
                        res.status(200).json({
                            products,
                            productsByPrice: {
                                under5k: products.filter(product => product.price <= 5000),
                                under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                            }
                        })
                    }
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}