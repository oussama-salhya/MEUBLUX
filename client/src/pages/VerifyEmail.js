import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import { verifyEmail } from '../Features/user/userSlice'
const VerifyEmail = () => {
    const { search } = useLocation()
    const { user, showError, msg } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const getTitle = () => {
        if (showError) {
            return 'Oops ' + msg
        }
        if (user) {
            return `Welcome ${user.name} .`
        }
        return 'Verification Email'
    }
    const getMessage = () => {
        if (showError) {
            return 'the credentials that you provided does not match any account'
        }
        if (user) {
            return 'your account is created and now you are logging in'
        }
        return 'Please stand by while we verify your email'
    }
    useEffect(() => {
        if (search && search.includes('token') && search.includes('email')) {
            let [verificationToken, email] = search.split('&')
            email = email.split('=')[1]
            verificationToken = verificationToken.split('=')[1]
            dispatch(verifyEmail({ email, verificationToken }))
        }
    }, [])


    if (!search || !search.includes('token') || !search.includes('email')) {
        return <Error />
    }
    return (
        <Wrapper className='Error container'>
            <h1>
                {
                    getTitle()
                }

            </h1>
            <div className='error-description'>
                {
                    getMessage()
                }
            </div>

            <Link to='/' className='btn dark-btn'>Back to home</Link>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    display : flex ; 
    justify-content : center ; 
    align-items : center ; 
    min-height : 80vh;
    flex-direction:column ; 
    max-width : 60ch;
    text-align : center;
    h1{
        font-weight : 700 ;
    }
    .error-description{
        font-size : 1.375rem ; 
        font-weight : 300;
        margin-bottom : 1.38rem;
        text-transform : capitalize ; 
    }
    @media screen and (max-width: 760px){
        h1{
            font-size : 2rem;
        }
    }

`

export default VerifyEmail
