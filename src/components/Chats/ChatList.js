import React from 'react'
import { Alert, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './ChatList.module.css';


const ChatList = (props) => {
  const email = useSelector(state=>state.auth.loginEmail);
  return (
    <div className={classes.chatListContainer}>
        {props.active?.map(active=>{
            return(
                <Alert key={active.id} variant={active.email===email? 'warning': 'primary'} className="fw-bold text-center w-75 mx-auto">
                    - {active.email===email? 'You' : `${active.name}`} joined -
                </Alert>
            )
        })}
        {props.chats.length>0 ? props.chats.map(chat=>{
            return(
                <Alert 
                key={chat.id} 
                variant={chat.from.substring(0, chat.from.indexOf('-'))===email?'warning':'primary'} 
                className={`w-50 ${chat.from.substring(0, chat.from.indexOf('-'))===email?'ms-auto':'me-auto'}`}>
                    
                    <Row>
                        <Col xs lg="6" className='fw-bold mb-2'>
                        {/*Check if the sender is You otherwise display the name*/}
                        {chat.from.substring(0,chat.from.indexOf('-'))===email ? 'You': chat.from.substring(chat.from.indexOf('-'))} 
                        </Col>
                    </Row>
                    <Row>
                        <Col xs lg style={{fontSize:'17px'}}>
                            {chat.message}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs lg="6" className='text-secondary ms-auto text-end' style={{fontSize:'14px'}}>
                        {new Date(chat.updatedAt).toLocaleString("en-US",{month:'2-digit', day:'2-digit', year:'numeric'})}
                        </Col>
                    </Row>
                </Alert>
            )
        }):
        <></>
        }
    </div>
  )
}

export default ChatList