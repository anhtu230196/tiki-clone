import { productConstants } from "../actions/constants"

const initialState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: []
    }
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_BY_SLUG:
            return {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
        default:
            return state
    }

}

export default productReducer