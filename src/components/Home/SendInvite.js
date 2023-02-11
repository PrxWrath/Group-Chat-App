import React, {useState} from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const SendInvite = (props) => {
   const toRef = useRef();
   const token = useSelector(state=>state.auth.loginToken);
   const [alert, setAlert] = useState(<></>);

   //send a group invite
   const inviteHandler = async() => {
    try{
        const res = await axios.post("http://localhost:4000/invites/send-invite", {
            to: toRef.current.value,
            for: props.Group.id
        }, {headers:{
            'Authorization' : token
        }})
        toRef.current.value = '';
        if(res.status === 201){
            setAlert(<Alert variant="success" className="text-center">Sent your invite!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 2000);
        }
        else if(res.data.err){
            setAlert(<Alert variant="danger" className="text-center">{res.data.err}</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 2000);
        }
    }catch(err){
        setAlert(<Alert variant="danger" className="text-center">Couldn't send invite</Alert>)
        setTimeout(()=>{setAlert(<></>)}, 2000);
    }
   }

   return (
    <Form className='p-2 w-75 mx-auto'>
        <div className='w-100 p-1 my-2 text-end'>
            <Button onClick={()=>{props.setShowInvite(false)}} variant="danger">Close X</Button>
        </div>
        {alert}
        <Form.Group className="mb-3">
            <Form.Label>User Name/Email/Phone no.</Form.Label>
            <Form.Control type="text" id="groupName" placeholder="Type a unique user detail to invite" ref={toRef}/>    
        </Form.Group>
        <Button onClick={inviteHandler} variant="warning" size="md">Send Invite</Button>
    </Form>
  )
}

export default SendInvite