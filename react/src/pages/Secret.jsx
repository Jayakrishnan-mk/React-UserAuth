import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


function Secret() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookie.jwt) {
                navigate('/login')
            }
            else {
                const { data } = await axios.post(
                    "http://localhost:3001", {}, { withCredentials: true });
                if (!data.status) {
                    removeCookie("jwt");
                    navigate('/login');
                }
                else toast(`HI ${data.user}` )
            }
        };
        verifyUser();
    }, [cookie, navigate, removeCookie])
    const logout = () => {
        removeCookie("jwt");
        navigate('/register')
    }

    return (
        <div>

            <div class="contextt">
                <h1 style={{ "position": "absolute", "color" : "white", "margin": "20rem 0rem 0rem 35rem" }}>Welcome to Home page</h1>
                <button style={{ "position": "absolute", "margin": "20.5rem 0rem 0rem 65rem", "backgroundColor": "rgb(136 144 209)" }}
                    onClick={logout}>Logout</button>
                <ToastContainer />
            </div>



        </div>
    )
}

export default Secret