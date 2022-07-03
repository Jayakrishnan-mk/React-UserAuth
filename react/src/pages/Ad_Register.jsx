import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Ad_Register() {

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
            console.log('vvvvvvvvv', values);
            const { data } = await axios.post("http://localhost:3001/admin/admin-register", {
                ...values
            },
                {
                    withCredentials: true
                }
            );
            // console.log('axios data.....................',data);
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password)
                }
                else {
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>

            <div className='container' style={{ "margin": "auto", "width": "35%", "margin-top": "10rem" }}>
                <h2>Register Admin</h2>
                <form onSubmit={(e) => handleSubmit(e)}>


                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Name" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>
                    
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name="phone" placeholder="Phone" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>

                    <button type='submit'>Submit</button>
                    <span>Already have an account? <Link to={'/admin-login'}>Login</Link></span>
                </form>
                <ToastContainer />
            </div>


            <div class='box'>
                <div class='wave -one'></div>
                <div class='wave -two'></div>
                <div class='wave -three'></div>
            </div>

        </div>
    )
}

export default Ad_Register