import React from 'react'
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './ChatList.module.css';


const ChatList = (props) => {
  const email = useSelector(state=>state.auth.loginEmail);
  return (
    <div className={classes.chatListContainer}>
        {props.active?.map(active=>{
            return(
                <Alert variant={active.email===email? 'warning': 'primary'} className="fw-bold text-center w-75 mx-auto">
                    - {active.email===email? 'You' : `${active.name}`} joined -
                </Alert>
            )
        })}
        {props.chats?.map(chat=>{
            return(
                <Alert></Alert>
            )
        })}
    </div>
  )
}

export default ChatList