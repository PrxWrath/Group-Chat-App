import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import ChatList from './ChatList'
import ChatBox from './ChatBox';
import GroupList from './GroupList';
import { useSelector } from 'react-redux';

const Chats = () => {
 const [active, setActive] = useState([]);
 const [chats, setChats] = useState([]);
 const [scroll, setScroll] = useState(false);
 const [activeGroup, setActiveGroup] = useState(null);
 const [groups, setGroups] = useState([]);
 const [invites, setInvites] = useState([])
 const [UIShift, setUIShift] = useState(false);

 const token = useSelector(state=>state.auth.loginToken);

 //remove active user when the group is closed
 const removeUserHandler = async ()=>{
    await axios.post('http://localhost:4000/users/remove-user', {group:activeGroup?.id}, {headers: {
      'Authorization': token
    }})
  }


  //load user's groups
  const loadGroups = async() => {
    try{
        const res = await axios.get("http://localhost:4000/chats/groups", {headers:{
            'Authorization': token
        }});
        if(res.status === 200){
            setGroups(res.data);
        }
    }catch(err){
        console.log(err.message)
    }
  }
  
  //load user's invites
  const loadInvites = async() => {
    try{
        const res = await axios.get("http://localhost:4000/invites", {headers:{
            'Authorization': token
        }});
        if(res.status === 200){
            setInvites(res.data);
        }
    }catch(err){
        console.log(err.message)
    }
  }
  
 //load all chats from backend
 const loadChats = async() => {
    try{
        const chats = JSON.parse(localStorage.getItem(`Chats ${activeGroup?.id}`));
        let lastMsgId = 0;
        if(chats && chats.length>0){
          lastMsgId = chats[chats.length-1].id
        }
        const res = await axios.post(`http://localhost:4000/chats/get-chats`, {
            lastMsgId,
            group: activeGroup?.id
        });    
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
            localStorage.setItem(`Chats ${activeGroup?.id}`, JSON.stringify(data));
            setChats(JSON.parse(localStorage.getItem(`Chats ${activeGroup?.id}`)));
        }     
    }catch(err){
        console.log(err);
    }
 }

 //load chats and active users evry 1s
 useEffect(()=>{
    //real-time logic
    let interval = setInterval(() => {
       if(activeGroup){
        loadChats();
    }
    }, 1000);
    return ()=>clearInterval(interval);
    // if(activeGroup){
    //     loadChats();
    // }
 }, [activeGroup])
 
 useEffect(()=>{
    loadGroups();
    loadInvites();
 },[UIShift]);
 
 return (
    <Container fluid style={{paddingTop:'5rem'}}>
        <Row>
            {activeGroup?
            <Col xs="11" lg="9" className='border border-dark mx-auto'>
                <Row>
                    <Col xs lg className="bg-dark text-warning text-center p-1 mb-2">
                        <h3 className='d-flex justify-content-between'>
                            <span className='mx-3'>{activeGroup.name}</span> 
                            <Button onClick={()=>{removeUserHandler(); setActiveGroup(null); setUIShift(prev=>!prev)}} variant="warning" className="ms-auto">
                                Close X
                            </Button>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg>
                        <ChatList active={active} chats={chats} scroll={scroll} Group={activeGroup}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg className='p-1'>
                        <ChatBox load={loadChats} setScroll = {setScroll} groupId={activeGroup?.id}/>
                    </Col>
                </Row>
            </Col>
            :
             <Col xs lg="6" className="mx-auto">
                <GroupList groups={groups} invites={invites} setActiveGroup={setActiveGroup} setActive={setActive}/>
             </Col>
            }
        </Row>
        
    </Container>
  )
}

export default Chats