import React, {useState} from 'react'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import CreateGroup from './CreateGroup';
import Invites from './Invites';
import classes from './GroupList.module.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

const GroupList = (props) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showInvites, setShowInvites] = useState(false);
  const token = useSelector(state=>state.auth.loginToken);
  const invites = props.invites;
  const pendingInvites = invites?.reduce((initial, invite)=>{
    return initial+1;
  }, 0);

  //create an active group user entry
  const userJoinedHandler = async(group) => {
    try{
        const res = await axios.post("http://localhost:4000/users/active-users", {group}, {headers: {
            'Authorization': token
        }})
        props.setActive(res.data);
    }catch(err){
        console.log(err.message)
    }
  } 

  return (
    <div className={classes.groupContainer}>
        <Row>
            <Col xs lg className="bg-dark p-1 text-center text-warning">
                <h3>{showCreate?'Create Group':`${showInvites? 'Invites': 'Groups'}`}</h3>
            </Col>
        </Row>
        {showCreate&&<CreateGroup setShowCreate={setShowCreate}/>}
        {showInvites&&<Invites invites = {invites} setShowInvites={setShowInvites}/>}
        {!showCreate && !showInvites && 
        <>
        <Row>
            <Col xs lg className="p-1 border-bottom">
                <Button onClick={()=>{setShowCreate(true)}} variant="warning" className="mx-3 my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                Create New Group
                </Button>
                <Button onClick={()=>{setShowInvites(true)}} variant="primary" className="mx-3 my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                Invites {`(${pendingInvites})`}
                </Button>
            </Col>
        </Row>

        {/* groups display */
           props.groups.length>0? props.groups.map(group=>{
            return(
                <Row key={group.id}>
                    <Col onClick={()=>{userJoinedHandler(group.id); props.setActiveGroup(group)}} xs lg className="mx-3 p-3 border-bottom d-flex jutify-content-between" style={{cursor:"pointer"}}>
                        {group.groupImg? 
                        <img className={classes.groupImage} src={group.groupImg} alt="groupDp"/>
                        :
                        <img className={classes.groupImage} src={require('../../resources/userFormBg.jpg')} alt="groupDp"/>
                        }
                        <h4 className='mx-2'>{group.name}</h4>
                    </Col>
                </Row>
            )
        })
            
            :
            <Alert  className="my-5 mx-auto w-50 text-center"variant="warning">No groups to show :(</Alert>
        }
        </>}
        
    </div>
  )
}

export default GroupList