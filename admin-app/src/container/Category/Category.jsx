import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions/category.action'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'
import MyModal from '../../components/UI/Modal/MyModal'
import CheckboxTree from 'react-checkbox-tree'
import "react-checkbox-tree/lib/react-checkbox-tree.css"
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown
} from 'react-icons/io'

function Category() {
    const category = useSelector(state => state.category)
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)


    const dispatch = useDispatch()

    const renderCategories = (categories) => {
        let myCategories = []
        categories.forEach(category => {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        });
        return myCategories
    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const updateCategory = () => {
        setUpdateCategoryModal(true)
        checked.length > 0 && checked.forEach()
        const categories = createCategoryList(category.categories)
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>Category</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Add New Category
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Update</button>
                    </Col>
                </Row>
            </Container>

            <MyModal
                modalTitle="Add Category"
                show={show}
                handleClose={handleClose}
            >
                <Input
                    value={categoryName}
                    placeholder={"Category Name"}
                    onChange={e => setCategoryName(e.target.value)}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                >
                    <option value="">select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </MyModal>

            {/* Edit Category */}
            <MyModal
                modalTitle="Update Category"
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                size="lg"
            >
                <Row>
                    <Col>
                        <Input
                            value={categoryName}
                            placeholder={"Category Name"}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <select
                            className="form-control"
                            value={parentCategoryId}
                            onChange={(e) => setParentCategoryId(e.target.value)}
                        >
                            <option value="">select category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </Col>
                    <Col>
                        <select
                            className="form-control"
                        >
                            <option value="">Select Type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                        </select>
                    </Col>
                </Row>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </MyModal>
        </Layout>
    )
}

export default Category
