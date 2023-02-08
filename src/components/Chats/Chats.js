import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios';
import ChatList from './ChatList'
import ChatBox from './ChatBox';

const Chats = () => {
 const [active, setActive] = useState([]);
 const [chats, setChats] = useState([]);
 const [alert, setAlert] = useState(<></>);
 const [scroll, setScroll] = useState(false);

 //load the list of currently active users
 const loadActiveUsers = async () => {
    try{
        const res = await axios.get('http://localhost:4000/users/active-users');    
        if(!res.data){
            throw new Error();
        }else{
            setActive(res.data.active);
        }
    }catch(err){
        setAlert(<Alert variant="danger">No active users found!</Alert>)
        setTimeout(()=>{setAlert(<></>)}, 2000);
    }
 }

 //load all chats from backend
 const loadChats = async() => {
    try{
        const chats = JSON.parse(localStorage.getItem('Chats'));
        let lastMsgId = 0;
        if(chats && chats.length>0){
          lastMsgId = chats[chats.length-1].id
        }
        const res = await axios.get(`http://localhost:4000/chats/${lastMsgId}`);    
        if(!res.data){
            throw new Error();
        }else{
            let data = res.data;
            if(chats && chats.length>0){
              data = chats.concat(res.data); //merge the old and new chats
            } 
            if(data.length>10){
                while(data.length>10){
                    data.shift(); //remove the oldest chats until only recent 10 chats remain
                }
              }
            localStorage.setItem('Chats', JSON.stringify(data));
            setChats(JSON.parse(localStorage.getItem('Chats')));
        }     
    }catch(err){
        console.log(err);
    }
 }

 //load chats and active users evry 1s
 useEffect(()=>{
    //real-time logic
    // let interval = setInterval(() => {
    //     loadActiveUsers();
    //     loadChats();
    // }, 1000);
    // return ()=>clearInterval(interval);
    loadActiveUsers();
    loadChats();
 }, [])

 return (
    <Container fluid style={{paddingTop:'5rem'}}>
        <Row>
            <Col xs="11" lg="8" className='border border-dark h-75 mx-auto'>
                <Row>
                    <Col xs lg className="bg-dark text-warning text-center p-1 mb-2">
                        <h3>Chats</h3>
                    </Col>
                </Row>
                {alert}
                <Row>
                    <Col xs lg>
                        <ChatList active={Object.values(active)} chats={chats} scroll={scroll}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg className='p-1'>
                        <ChatBox load={loadChats} setScroll = {setScroll}/>
                    </Col>
                </Row>
            </Col>
        </Row>
        
    </Container>
  )
}

export default Chats