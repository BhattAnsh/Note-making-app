import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/form.css'

function Form({ route, method }) {
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const name = method === "login" ? "Login" : "Register"
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, { username: userName, password: userPassword });
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("This account does not exist");
                navigate("/register")
            } else {
                // Handle other errors or display a generic error message
                alert("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required></input>
            <input
                className="form-input" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Password" required></input>
            <button className="form-button" type="submit">{name}</button>
            {method === "login" ? <a className="navigator" onClick={()=>navigate("/register")}>Register</a> : <a className="navigator" onClick={()=>navigate('/login')}>Login</a>}
            
        </form>
    )
}

export default Form;