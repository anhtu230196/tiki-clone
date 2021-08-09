const Category = require('../../models/category')
const Product = require('../../models/product')

exports.inititalData = async (req, res) => {
    const categories = await Category.find()
    const products = await Product
        .find()
        .select('_id name price slug description quantity productPictures category')
        .populate({ path: 'category', select: '_id name' })
    res.status(200).json({
        categories,
        products
    })
}