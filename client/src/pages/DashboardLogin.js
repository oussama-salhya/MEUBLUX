import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Form } from '../components'
import { displayError, displayMsg, hideError, login, showMe } from '../Features/user/userSlice'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const initialState = {
    email: '',
    password: '',
}
const DashboardLogin = () => {
    const [values, setValues] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, showError, msg, isLoading } = useSelector(store => store.user)
    const handleChange = (e) => {
        const { target: { name, value } } = e
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = () => {
        if (!values.email || !values.password) {
            dispatch(displayError())
            return;
        }
        dispatch(login({ email: values.email, password: values.password }))
        if (showError) {
            dispatch(hideError())
        }
    }
    const loginAsDemoApp = () => {
        console.log('====================================');
        console.log("demo");
        console.log('====================================');
        if (showError) {
            dispatch(hideError())
        }
        dispatch(login({ email: process.env.REACT_APP_USER_DEMO_EMAIL, password: process.env.REACT_APP_USER_DEMO_PASSWORD }))
    }
    const loginFormInputs = [
        {
            type: 'email',
            name: 'email',
            value: values.email,
            handleChange
        },
        {
            type: 'password',
            name: 'password',
            value: values.password,
            handleChange
        }
    ]
    useEffect(() => {
        if (user?.role === 'admin' || user?.role === 'test') {
            dispatch(displayMsg('successfully logged in. redirecting ...'))
            const timeoutID = setTimeout(() => {
                navigate('/dashboard')
            }, 1000)
            return () => clearTimeout(timeoutID);
        }
        if (user?.role === 'user') {
            dispatch(displayError())
            dispatch(displayMsg('unauthorized to access admin privileges'))
        }
    }, [user])
    useEffect(() => {
        if (msg) {
            dispatch(displayMsg())
        }
    }, [msg])
    return (
        <Wrapper>
            <div className="container">
                <Form
                    formInputs={loginFormInputs}
                    handleForm={handleSubmit}
                    title={<img src={Logo} alt="logo" />}
                    submitLabel='Log in'
                    cta={{ label: 'Demo app', onCall: loginAsDemoApp }}
                    showError={showError && !msg}
                    isLoading={isLoading}
                />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background : var(--grey-50);
    min-height : 100vh;
    display : grid ; 
    place-items : center ; 
    .container{
        max-width: 500px;
        padding: 3.5rem 2.5rem;
        box-shadow: var(--shadow-3);
        background: white;
        border-radius: .25rem;
    }
    h1{
        display: flex;
        justify-content: center;
        margin-bottom: 4rem;
    }
    h1 img{
        width : 200px ; 
        height : 40px;
    }
    .form-row{
        border-radius: .25rem;
    }
    .dark-btn{
        border-radius: .25rem;
        display: block;
        width: 100%;
        padding: .8rem !important;
    }
`

export default DashboardLogin
