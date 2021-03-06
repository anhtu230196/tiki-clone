import React from 'react'
import { Form } from 'react-bootstrap'

function Input({ label, errorMessage, placeholder, type, onChange, value, name }) {
    return (
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Form.Text className="text-muted">
                {errorMessage}
            </Form.Text>
        </Form.Group>
    )
}

export default Input
