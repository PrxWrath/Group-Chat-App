import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import classes from './GroupList.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GroupInfo = (props) => {

  const [info, setInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const email = useSelector(state=>state.auth.loginEmail);

  //get group details and participants list
  const loadGroupInfo = async(group) => {
    try{
        const res = await axios.post("http://localhost:4000/chats/group-info", {group});
        if(res.status === 200){
            setInfo(res.data.info);
            setMembers(res.data.members);
        }
    }catch(err){
        console.log(err.message)
    }
  }

  useEffect(()=>{
    loadGroupInfo(props.group.id)
  },[])

  //make a group admin
  const makeAdminHandler = async(member) => {
    try{
        const res = await axios.post("http://localhost:4000/admin/make-admin", {userId:member, group: props.group.id})
        if(res.status===201){
            loadGroupInfo(props.group.id);
        } 
    }catch(err){
        console.log(err.message)
    }
  }

  //remove a meb=mber from group
  const removeHandler = async(member) => {
    try{
        const res = await axios.post("http://localhost:4000/admin/remove", {userId:member, group: props.group.id})
        if(res.status===200){
            loadGroupInfo(props.group.id);
        } 
    }catch(err){
        console.log(err.message)
    }
  }
    return (
    <>
        <div className='w-100 p-1 my-2 text-end'>
            <Button onClick={()=>{props.setShowInfo(false)}} variant="danger">Close X</Button>
        </div>
        {info&& <>
        <Row>
           <Col xs lg className='border-bottom mx-3 mb-1 p-2 text-center'>
                
                {info.groupImg?
                    <img src={info.groupImg} alt="groupDp" className={classes.groupImage} style={{width:'8.5rem', height:'8.5rem'}}/>
                    :
                    <img src={require('../../resources/userFormBg.jpg')} alt="groupDp" className={classes.groupImage} style={{width:'8rem', height:'8rem'}}/>
                }
           </Col> 
        </Row>
        <Row>
            <Col xs lg className='border-bottom mx-3 mb-2 p-2 text-center fs-5'>
                <b>Name: </b>{info.name} |  
                <b> Created By:</b> {info.createdBy} | 
                <b> Created At:</b> {new Date(info.createdAt).toLocaleString("en-US", {month:'2-digit', day:'2-digit', year:'numeric'})}
            </Col>
        </Row>
        </>
        }
        <h4>Participants {`(${members.length})`}:</h4>
        {members.length>0? members.map(member=>{
          return(
            <Row key={member.id}>
                <Col xs lg className="border-bottom mx-3 p-2 mb-2">
                    <h5>
                        <Col xs lg className='d-flex text-danger'>
                            {member.name}  
                            {member.groupusers.isAdmin && <span className='mx-5 text-success fs-6 border border-success rounded p-1'>Group Admin</span>}  
                        </Col>                
                    </h5> 
                        {/*show admin options if current user is an admin*/
                        props.group.groupusers.isAdmin && !member.groupusers.isAdmin &&
                        <Row>
                            <Col xs lg>
                                <Button onClick={()=>{makeAdminHandler(member.id)}} size ="sm" variant="success" className="mx-2 my-1">
                                    Make Admin
                                </Button>
                                <Button onClick={()=>{removeHandler(member.id)}} size ="sm" variant="danger" className="mx-2 my-1">
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                        }   
                    
                </Col>
            </Row>
          )
        })
        :
        <></>
        }
    </>
  )
}

export default GroupInfo