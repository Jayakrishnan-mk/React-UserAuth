import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
      email: "",
      password: ""
  })

  const generateError = (err) => 
      toast.error(err, {
          position: "bottom-right"
      })
    

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("http://localhost:3001/login", { 
          ...values 
        },
        {
          withCredentials: true
        }
        );
        console.log('compiler coming........');
          console.log('axios data.....................',data);
          if (data) {
              if (data.errors) {
                  const {email, password} = data.errors;
                  if(email) generateError ( email );
                  else if(password) generateError(password)
              }
              else {
                  navigate("/"); 
              }
          }
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div style={{ overflow: "hidden" }}>

      <div className="area" >

        <div className="context">

          <div className='container'>
            <h2>Login Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={(e) => {setValues({ ...values, [e.target.name]: e.target.value })}} />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" onChange={(e) => {setValues({ ...values, [e.target.name]: e.target.value })}} />
              </div>

              <button type='submit'>Submit</button>
              <span>Already have an account? <Link to={'/register'}>Register</Link></span>
            </form>
            <ToastContainer />
          </div>
        </div>


        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >

    </div>
  )
}

export default Login