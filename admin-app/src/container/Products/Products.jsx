import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions/product.action'
import MyModal from '../../components/UI/Modal/MyModal'
import "./style.css"
import { generatePublicUrl } from '../../urlConfig'

function Products() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const { products } = useSelector(state => state.product)

    console.log(products)

    const [productDetailModal, setProductDetailModal] = useState(false)
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const [productDetails, setProductDetails] = useState(null)

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)

        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))
        setShow(false)

    };

    const handleShow = () => {
        setShow(true)
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    const renderTable = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0
                        ? products.map((product) => (
                            <tr key={product._id}>
                                <td>2</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <button onClick={() => showProductDetailModal(product)}>
                                        info
                    </button>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                productId: product._id,
                                            };
                                            // dispatch(deleteProductById(payload));
                                        }}
                                    >
                                        del
                    </button>
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return <MyModal
            modalTitle="Products"
            handleClose={handleClose}
            show={show}
        >
            <Input
                value={name}
                label="Product Name:"
                onChange={e => setName(e.target.value)}
            />

            <Input
                value={quantity}
                label="Quantity:"
                onChange={e => setQuantity(e.target.value)}
            />

            <Input
                value={price}
                label="Price:"
                onChange={e => setPrice(e.target.value)}
            />

            <Input
                value={description}
                label="Description:"
                onChange={e => setDescription(e.target.value)}
            />

            <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">select category</option>
                {
                    createCategoryList(category.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>

            {
                productPictures.map((pic, index) => <div key={index}>
                    {pic.name}
                </div>)
            }

            <input type="file" name="productPicture" onChange={handleProductPictures} />
        </MyModal>
    }

    const showProductDetailModal = (product) => {
        setProductDetailModal(true)
        setProductDetails(product)
    }

    const renderProductDetailModal = () => {
        if (!productDetails) return null
        return <MyModal
            show={productDetailModal}
            handleClose={() => setProductDetailModal(false)}
            modalTitle="Product Detail"
            size="lg"
        >
            <Row>
                <Col md="6">
                    <label className="key">Name</label>
                    <p className="value">{productDetails.name}</p>
                </Col>
                <Col md="6">
                    <label className="key">Price</label>
                    <p className="value">{productDetails.price}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <label className="key">Quantity</label>
                    <p className="value">{productDetails.quantity}</p>
                </Col>
                <Col md="6">
                    <label className="key">Category</label>
                    <p className="value">{productDetails.category.name}</p>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <label className="key">Description</label>
                    <p className="value">{productDetails.description}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="key">Product Pictures</label>
                    <div style={{ display: "flex" }}>
                        {productDetails.productPictures.map((picture) => (
                            <div className="productImgContainer">
                                <img src={generatePublicUrl(picture.img)} alt="" />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

        </MyModal>
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add New Product
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderTable()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    )
}

export default Products
