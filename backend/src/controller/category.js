const Category = require('../models/category')
const sluggify = require('slugify')

function createCategories(categories, parentId = null) {
    const categoryList = []
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: sluggify(req.body.name),
    }
    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj)
    cat.save()
        .then(data => {
            return res.status(201).json({ category: data })
        }).catch(err => {
            return res.status(400).json({ message: 'Something wrong' })
        })
}

exports.getCategories = (req, res) => {
    Category.find({}).then(data => {
        const categoryList = createCategories(data)
        res.status(200).json({ categoryList })
    }).catch(error => {
        res.status(400).json({ error })
    })
}