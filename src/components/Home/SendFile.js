import React, {useState} from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AWS from 'aws-sdk';

const SendFile = (props) => {
   const [file, setFile] = useState(null);
   const token = useSelector(state=>state.auth.loginToken);
   const [alert, setAlert] = useState(<></>);
   
   //handle s3 upload
   const uploadToS3 = (fileContent, fileName)=>{
    const s3Bucket = new AWS.S3({
        accessKeyId: process.env.REACT_APP_IAM_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_IAM_SECRET,
    })    
   
    const params = {
          Bucket: process.env.REACT_APP_S3_BUCKET,
          Key: fileName,
          Body: fileContent,
          ACL: 'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3Bucket.upload(params, (err, s3response)=>{
            if(err){ 
                reject(err);
            }else{
                resolve(s3response.Location);
            }
        })
    })
    
    }

   //select a file
   const selectFileHandler = (e) => {
    setFile(e.target.files[0]);
   }
   
   //send a file (create new chat entry in backend with url)
   const sendFileHandler = async() => {
    try{
        if(!file){
            setAlert(<Alert variant="danger" className="text-center">Select a file to upload!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 2000);
        }else{

            const url = await uploadToS3(file, file.name); //downloadable s3 file url
            const res = await axios.post("http://localhost:4000/chats/send-file", {
                fileName: file.name,
                fileUrl: url,
                group: props.Group.id
            }, {headers:{
                'Authorization' : token
            }})
        
            if(res.status === 201){
                setAlert(<Alert variant="success" className="text-center">Sent your file!</Alert>)
                setTimeout(()=>{setAlert(<></>)}, 2000);
            }
        }
    }catch(err){
        setAlert(<Alert variant="danger" className="text-center">Couldn't send invite</Alert>)
        setTimeout(()=>{setAlert(<></>)}, 2000);
    }
   }

   return (
    <Form className='p-2 w-75 mx-auto'>
        <div className='w-100 p-1 my-2 text-end'>
            <Button onClick={()=>{props.setShowFile(false)}} variant="danger">Close X</Button>
        </div>
        {alert}
        <Form.Group className="mb-3">
            <Form.Label>Select a file</Form.Label>
            <Form.Control type="file" onChange={selectFileHandler}/>    
        </Form.Group>
        <Button onClick={sendFileHandler} variant="warning" size="md">Upload</Button>
    </Form>
  )
}

export default SendFile