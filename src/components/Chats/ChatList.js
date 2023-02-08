import React, {useEffect, useRef} from 'react'
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './ChatList.module.css';


const ChatList = (props) => {
  const email = useSelector(state=>state.auth.loginEmail);
  const endRef = useRef(); //bottom of chat conatiner
  
  //scroll to newest chat
  const scrollEndHandler = () => {
    endRef.current.scrollBy(0,10000,{behaviour: "smooth"});
  }
  useEffect(()=>{
   scrollEndHandler();
  },[props.scroll])

  return (
    <div className={classes.chatListContainer} ref={endRef}>
        <Button onClick={scrollEndHandler} className="rounded-circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 18 18">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
        </svg>
        </Button>
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