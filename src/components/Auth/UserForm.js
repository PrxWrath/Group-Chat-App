import React, {useRef, useState} from 'react'
import { Alert, Button, Container, FloatingLabel, Form, Row, Col } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Layout/Loader';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/AuthReducer';


const UserForm = () => {

  const [alert, setAlert] = useState(<></>);
  const [login, setLogin] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const toggleLoginHandler = () => {
    setLogin(prev=>!prev);
  }
  
  const togglePasswordReset = () => {
    setForgot(prev=>!prev);
  }
  
  const submitHandler = async(e) => {
    e.preventDefault();
      if(!login){
        
        try{
          if(!emailRef.current.value || !passwordRef.current.value || !nameRef.current.value || !phoneRef.current.value){
            setAlert(<Alert variant='danger'>Fill all the fields!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else if(!emailRef.current.value.includes('@')){
            setAlert(<Alert variant='danger'>Enter a valid email id!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else{
            setLoading(true);
            let userObj = {
              name: nameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
              phone: phoneRef.current.value
            }        
            const res = await axios.post('http://localhost:4000/users/user-signup', userObj); //send signup request
            if(res.data.error){
              throw new Error(res.data.error)
            }else{
              setAlert(<Alert variant='success'>{res.data.msg}</Alert>)
              setTimeout(()=>{setAlert(<></>)}, 3000)
            }
            emailRef.current.value = '';
            passwordRef.current.value = '';
            nameRef.current.value = '';
            phoneRef.current.value = '';
            setLoading(false);
          }
        }catch(err){
          setAlert(<Alert variant='danger'>{err.message}</Alert>)
          setTimeout(()=>{setAlert(<></>)}, 3000)
        }

      }else{
        try{
          if(!emailRef.current.value || !passwordRef.current.value){
            setAlert(<Alert variant='danger'>Fill all the fields!</Alert>)
            setTimeout(()=>{setAlert(<></>)}, 3000)
          }
          else{
            let userObj = {
              email: emailRef.current.value,
              password: passwordRef.current.value
            }        
            const res = await axios.post('http://localhost:4000/users/user-login', userObj) //send login request
            //check for errors
            if(!res.data){
              throw new Error('Network error!');
            }else if(res.data.err){
              throw new Error(res.data.err);
            }else{
              dispatch(authActions.login({token: res.data.token})); //intialize central user state
              history.replace('/')
            }
            emailRef.current.value = '';
            passwordRef.current.value = '';
          }
        }catch(err){
          setAlert(<Alert variant='danger'>{err.message}</Alert>)
          setTimeout(()=>{setAlert(<></>)}, 3000)
        }

      }
    
  };

  const passwordResetHandler = async() => {
    //forgot password backend logic
  }

   return (
    <Container style={{paddingTop:'6rem', height: '100vh'}}>
        <div className='w-75 fw-bold text-center mx-auto my-1'>
            {alert}
        </div>
        <div className='w-100 h-100 p-5 mx-auto border border-warning userForm'>
          <Row>
            <Col xs lg='6' className="mx-auto">

            <Form className='bg-light shadow-lg rounded  bg-dark p-3 my-5 text-warning' onSubmit={submitHandler}>
              {!forgot?
              <>
                <h3 className='mx-auto my-2 mb-3 w-50 border-bottom border-warning text-center'>{login?'Login':'Signup'}</h3>
                {!login&&<>
                <FloatingLabel controlId='name' className='mb-3 fw-bold text-dark' label='User Name'>
                    <Form.Control type='text' ref={nameRef}/>
                </FloatingLabel>
                <FloatingLabel controlId='phone' className='mb-3 fw-bold text-dark' label='Your Phone no. (+91)'>
                  <Form.Control type='text' ref={phoneRef}/>
                 </FloatingLabel></>
                }
                <FloatingLabel controlId='email' className='mb-3 fw-bold text-dark' label='Your Email'>
                    <Form.Control type='email' ref={emailRef}/>
                </FloatingLabel>
                
                <FloatingLabel controlId='password' className='mb-3 fw-bold text-dark' label='Your Password'>
                    <Form.Control type='password' ref={passwordRef}/>
                </FloatingLabel>
                
                <div className='my-2 w-100 text-center'>
                    <Button type='submit' variant='warning' size='md'>{login?'Login':'Create Account'}</Button>
                </div>
                {login&&
                <div className='my-2 w-100 text-center'>
                  <NavLink to='#' onClick={togglePasswordReset} className='text-warning'>Forgot Password?</NavLink>
                </div>
                }
                <div className='my-2 w-100 text-center'>
                    <Button onClick={toggleLoginHandler} size='sm' variant='outline-warning'>{login?'Create new account':'Login with existing account'}</Button>
                </div>
              </>
              :
              <>
                <h3 className='mx-auto my-2 mb-5 w-75 border-bottom border-warning text-center'>Forgot Password?</h3>
                <Form.Group className='mb-5'>
                  <Form.Label className='mb-1 fw-bold'>Enter your registered email id</Form.Label> 
                  <Form.Control type='email' ref={emailRef}/>
                </Form.Group>
                {loading?
                  <Loader className='my-2'/>
                  :
                  <div className='my-2 w-100 text-center'>
                      <Button onClick={passwordResetHandler} variant='warning' size='md'>Send Link</Button>
                  </div>
                }
                <div className='my-2 w-100 text-center'>
                    <Button variant='outline-warning' size='md' onClick={togglePasswordReset}>Back to Login</Button>
                </div>
              </>
              }
            </Form>

            </Col>
          </Row>
          
        </div>
    </Container>
  )
}

export default UserForm