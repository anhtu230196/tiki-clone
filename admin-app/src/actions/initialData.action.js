import axiosInstance from "../helpers/axios"
import { categoryConstants, intialDataConstants, productConstants } from "./constants"

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

export const getInitialDate = () => {
    return async dispatch => {
        const res = await axiosInstance.get("/initialData")
        if (res.status === 200) {
            const { categories, products } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: createCategories(categories) }
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
    }
}