import React, { useRef } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {useSelector} from 'react-redux';
import axios from 'axios'

const ChatBox = (props) => {
   const msgRef = useRef();
   const token = useSelector(state=>state.auth.loginToken)
   
   //send message to backend with specific user token
   const sendChatHandler = async() => {
     try{
        if(msgRef.current.value){
            await axios.post('http://localhost:4000/chats/send-chat', {
                msg: msgRef.current.value,
                group: props.groupId
            }, {headers: {
                'Authorization': token
            }});
        }
        msgRef.current.value = ''
        props.load();
        props.setScroll(prev=>!prev)
     }catch(err){
        console.log("Something went wrong while sending message...")
     }
   }
   return (
    <Form className='bg-dark p-2 w-100'>
        <Form.Group className='w-100'>
            <Row>
                <Col xs="9" lg="11">
                    <Form.Control type="text" placeholder="Type your message" ref={msgRef}/>
                </Col>
                <Col xs="3" lg="1">
                    <Button onClick={sendChatHandler} variant="warning">Send</Button>
                </Col>
            </Row>
        </Form.Group>
    </Form>
  )
}

export default ChatBox