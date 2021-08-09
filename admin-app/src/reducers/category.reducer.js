import { categoryConstants } from "../actions/constants"

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    if (!parentId) {
        return [
            ...categories,
            {
                ...category,
                children: []
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            })
        }
    }
    return myCategories
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const updatedCategories = buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category)
            return {
                ...state,
                loading: false,
                categories: updatedCategories
            }
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false
            }
        default: return state
    }

}

export default categoryReducer