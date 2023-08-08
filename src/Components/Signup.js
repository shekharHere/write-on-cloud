import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className='my-5 pt-5 w-50 position-absolute bottom-0 start-50' style={{transform: "translate(-50%, -15%)"}}>
        <h1 className='text-center my-2 pb-5'>Start Your Journey!</h1>
        <form className='container' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={onChange} required minLength={3}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" >Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default Signup;
