import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const ChatBox = () => {
  return (
    <Form className='bg-dark p-2 w-100'>
        <Form.Group className='w-100'>
            <Row>
                <Col xs="9" lg="11">
                    <Form.Control type="text" placeholder="Type your message"/>
                </Col>
                <Col xs="3" lg="1">
                    <Button variant="warning">Send</Button>
                </Col>
            </Row>
        </Form.Group>
    </Form>
  )
}

export default ChatBox