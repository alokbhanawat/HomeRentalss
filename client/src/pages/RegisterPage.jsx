import React, { useEffect, useState } from 'react'
import "../styles/Register.scss"
import {useNavigate} from "react-router-dom"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    });

    console.log(formData)


    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value,
        });

    };
    
    const [passwordMatch,setPasswordMatch]=useState(true)

    useEffect(()=>{
        setPasswordMatch(formData.password ===formData.confirmPassword || formData.confirmPassword === "" )
    })

    const navigate =useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

       

        try {
            const register_form = new FormData()
      
            for (var key in formData) {
              register_form.append(key, formData[key])
            }
      

            const response =await fetch("http://localhost:3001/auth/register",{
                method:"POST",
                body:register_form
            })
            if (response.ok){
                navigate("/login")
            }
        } catch (err) {
            console.log("Registration Failed", err.message)
            
            
        }
    }

    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form' onSubmit={handleSubmit}>
                    <input
                        placeholder='First Name'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required />

                    <input
                        placeholder='Last Name'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required />

                    <input
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        type='email'
                        onChange={handleChange}
                        required />

                    <input
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        type='password'
                        onChange={handleChange}
                        required />

                    <input
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        type='password'
                        onChange={handleChange}
                        required />

                        {!passwordMatch && (
                            <p style={{color:"red"}}>Passwords are not matched!</p>
                        )}

                    <input
                        id='image'
                        name='profileImage'
                        type='file'
                        accept='image/*'
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        required />

                    <label htmlFor="image">
                        <img src="/assets/addImage.png" alt="add profile Photo" />
                        <p>Add Profile Photo</p>
                    </label>
                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)} 
                        alt="Profile Photo" 
                        style={{maxWidth:"80px"}}
                        className="src" />
                    )}
                    <button type='submit' disabled={!passwordMatch}>REGISTER</button>
                </form>
                <a href='/login'>Already have a account? Log In Here</a>
            </div>
        </div>
    )
}

export default RegisterPage
