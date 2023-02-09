import React, {useState} from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CreateGroup = (props) => {
   const grpNameRef = useRef();
   const imgRef = useRef()
   const token = useSelector(state=>state.auth.loginToken);
   const [alert, setAlert] = useState(<></>);

   //create new group
   const createGroupHandler = async() => {
    try{
        const res = await axios.post("http://localhost:4000/chats/create-group", {
            name: grpNameRef.current.value,
            img: imgRef.current.value? imgRef.current.value : null
        }, {headers:{
            'Authorization' : token
        }})
        grpNameRef.current.value = '';
        imgRef.current.value = '';
        if(res.status === 201){
            setAlert(<Alert variant="success" className="text-center">New group created</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 2000);
        }
    }catch(err){
        setAlert(<Alert variant="danger" className="text-center">Couldn't create new group</Alert>)
        setTimeout(()=>{setAlert(<></>)}, 2000);
    }
   }

   return (
    <Form className='p-2'>
        <div className='w-100 p-1 my-2 text-end'>
            <Button onClick={()=>{props.setShowCreate(false)}} variant="danger">Close X</Button>
        </div>
        {alert}
        <Form.Group className="mb-3">
            <Form.Label>Group Name</Form.Label>
            <Form.Control type="text" id="groupName" ref={grpNameRef}/>    
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Group Image Url</Form.Label>
            <Form.Control type="text" id="groupName" ref={imgRef}/>    
        </Form.Group>
        <Button onClick={createGroupHandler} variant="warning" size="md">+ Create</Button>
    </Form>
  )
}

export default CreateGroup