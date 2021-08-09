import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { login } from '../../actions/auth.action'
import Input from '../../components/UI/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }))
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }
    return (
        <Container>
            <Row style={{ marginTop: '50px' }}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={userLogin}>
                        <Input
                            value={email}
                            type="text"
                            placeholder="Email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            value={password}
                            type="password"
                            placeholder="Password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Signin
