import React, {useEffect, useRef, useState} from 'react'
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './ChatList.module.css';
import GroupInfo from './GroupInfo';
import SendFile from './SendFile';
import SendInvite from './SendInvite';


const ChatList = (props) => {
  const email = useSelector(state=>state.auth.loginEmail);
  const endRef = useRef(); //bottom of chat conatiner
  const [showInvite, setShowInvite] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showFile, setShowFile] = useState(false);

  //scroll to newest chat
  const scrollEndHandler = () => {
    endRef.current.scrollBy(0,10000,{behaviour: "smooth"});
  }
  useEffect(()=>{
   scrollEndHandler();
  },[props.scroll])

  

  return (
    <div className={classes.chatListContainer} ref={endRef}>
        {showInvite && <SendInvite setShowInvite ={setShowInvite} Group={props.Group}/>}
        {showInfo && <GroupInfo group={props.Group} setShowInfo={setShowInfo}/>}
        {showFile && <SendFile Group={props.Group} setShowFile={setShowFile}/>}
        
        {!showInvite && !showInfo && !showFile && <>
        <div className='w-100 border-bottom mb-2 p-2'>
            <Button onClick={scrollEndHandler} className="rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 18 18">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg>
            </Button>

            {/*show option to invite members to admin*/
            props.Group.groupusers.isAdmin && 
            <Button onClick={()=>{setShowInvite(true)}} variant="warning" className="mx-2 my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                Invite Members
            </Button>
            }

            <Button onClick={()=>{setShowInfo(true)}} variant="primary" className="mx-2 my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                Group Info
            </Button>

            <Button onClick={()=>{setShowFile(true)}} variant="primary" className="mx-2 my-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/>
            </svg>
                Send File
            </Button>
        </div>
        
        {/* online users */}
        {props.active?.map(active=>{
            return(
                <Alert key={active.id} variant={active.email===email? 'warning': 'primary'} className="fw-bold text-center w-75 mx-auto">
                    - {active.email===email? 'You' : `${active.name}`} joined -
                </Alert>
            )
        })}

        {/* chats */}
        {props.chats.length>0 ? props.chats.map(chat=>{
            return(
                <>
                <Alert 
                key={chat.id} 
                variant={chat.from.substring(0, chat.from.indexOf(' '))===email?'warning':'primary'} 
                className={`w-50 ${chat.from.substring(0, chat.from.indexOf(' '))===email?'ms-auto':'me-auto'}`}>
                    
                    <Row>
                        <Col xs lg="6" className='fw-bold mb-2'>
                        {/*Check if the sender is You otherwise display the name*/}
                        {chat.from.substring(0,chat.from.indexOf(' '))===email ? 'You': chat.from.substring(chat.from.indexOf(' '))} 
                        </Col>
                    </Row>
                    
                    <Row>
        
                        <Col xs lg style={{fontSize:'17px'}}>
                            {chat.fileUrl&&
                                <>
                                    <img src={chat.fileUrl} alt={chat.message} style={{width:'100%', height:'80%', objectFit:'contain'}}/>
                                    <h6 className='mx-auto my-1'><a href={chat.fileUrl}>Download File</a></h6>
                                </>
                            }
                            {!chat.fileUrl?chat.message:<></>}
                        </Col>
                        
                    </Row>
                  
                    <Row>
                        <Col xs lg="6" className='text-secondary ms-auto text-end' style={{fontSize:'14px'}}>
                        {new Date(chat.updatedAt).toLocaleString("en-US",{month:'2-digit', day:'2-digit', year:'numeric'})}
                        </Col>
                    </Row>
                </Alert>
                </>
            )
        }):
        <></>
        }
        </>}
    </div>
  )
}

export default ChatList