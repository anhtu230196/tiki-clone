import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/category.action'
import "./style.css"

function MenuHeader() {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])
    console.log(category.categories)
    const renderCategories = categories => {
        let myCategories = []
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a href={category.slug}>{category.name}</a> : <span>{category.name}</span>
                    }
                    {category.children.length > 0 && <ul>{renderCategories(category.children)}</ul>}
                </li>
            )
        }
        return myCategories
    }

    return (
        <div className="menuHeader">
            <ul>
                {renderCategories(category.categories)}
            </ul>
        </div>
    )
}

export default MenuHeader
