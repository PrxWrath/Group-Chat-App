import axios from 'axios';
import React from 'react'
import { Col, Row, Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Invites = (props) => {
  
  const token = useSelector(state=>state.auth.loginToken);

  //send accept request to add user to group
  const acceptInviteHandler = async(group, invite)=> {
    try{
      const res = await axios.post("http://localhost:4000/invites/accept-invite", {
        group,
        invite
      }, {headers:{
        'Authorization': token
      }})
      if(res.status === 200){
        document.getElementById(invite).style.display = 'none';
      }
    }catch(err){
      console.log(err.message)
    }
  }

  //send reject request to add user to group
  const rejectInviteHandler = async(invite)=> {
    try{
      const res = await axios.post("http://localhost:4000/invites/reject-invite", {invite})
      if(res.status === 200){
        document.getElementById(invite).style.display = 'none';
      }
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
        <div className='w-100 p-1 my-2 text-end'>
            <Button onClick={()=>{props.setShowInvites(false)}} variant="danger">Close X</Button>
        </div>
        {props.invites.length>0? props.invites.map(invite=>{
          return(
            <Row key={invite.id} id={invite.id}>
                <Col xs lg className="border-bottom mx-3">
                    <h4>
                        <span className='text-danger mx-1'>{invite.from}</span> 
                        invited you To Join : 
                        <span className='text-danger mx-1'>{invite.forgroup}</span>
                    </h4>
                    <Button onClick={()=>{acceptInviteHandler(invite.groupId, invite.id)}} className='mx-2 my-1'>Accept</Button>
                    <Button onClick={()=>{rejectInviteHandler(invite.id)}} className='mx-2 my-1' variant="danger">Reject</Button>
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

export default Invites