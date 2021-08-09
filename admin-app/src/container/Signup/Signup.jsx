import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'

function Signup() {
    return (
        <Container>
            <Row style={{ marginTop: '50px' }}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Input
                                    value=""
                                    type="text"
                                    placeholder="FirstName"
                                    label="FirstName"
                                    onChange={() => { }}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    value=""
                                    type="text"
                                    placeholder="LastName"
                                    label="LastName"
                                    onChange={() => { }}
                                />
                            </Col>
                        </Row>
                        <Input
                            value=""
                            type="text"
                            placeholder="Email"
                            label="Email"
                            onChange={() => { }}
                        />

                        <Input
                            value=""
                            type="password"
                            placeholder="Password"
                            label="Password"
                            onChange={() => { }}
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

export default Signup
