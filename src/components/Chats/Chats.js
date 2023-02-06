import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios';
import ChatList from './ChatList'
import ChatBox from './ChatBox';

const Chats = () => {
 const [active, setActive] = useState([]);
 const [chats, setChats] = useState([]);
 const [alert, setAlert] = useState(<></>);

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
        const res = await axios.get('http://localhost:4000/chats');    
        if(!res.data){
            throw new Error();
        }else{
            setChats(res.data);
        }     
    }catch(err){
        console.log("No chats to display");
    }
 }

 useEffect(()=>{
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
                        <ChatList active={Object.values(active)} chats={chats} />
                    </Col>
                </Row>
                <Row>
                    <Col xs lg className='p-1'>
                        <ChatBox load={loadChats}/>
                    </Col>
                </Row>
            </Col>
        </Row>
        
    </Container>
  )
}

export default Chats