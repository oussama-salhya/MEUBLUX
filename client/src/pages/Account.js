import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Alert, FormRow, UserAvatar } from '../components'
import { BsImage } from 'react-icons/bs'
import readFile from '../utils/readFile'
import { displayError, hideError, hideMsg, updateUser } from '../Features/user/userSlice'

const Account = () => {
    const { user: { name, image, city, email, _id }, showError, msg, isLoading } = useSelector(store => store.user)
    const [user, setUser] = useState({ name, image, city, email })
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const name = e.target.name
        const value = name === 'image' ? e.target.files[0] : e.target.value
        if (name === 'image') {
            readFile(value).then(res => setUser({ ...user, [name]: res }))
            return;
        }
        setUser({ ...user, [name]: value })
    }
    const submit = (e) => {
        e.preventDefault()
        if (!user.name || !user.email) {
            dispatch(displayError())
            return;
        }
        dispatch(hideMsg(true))
        dispatch(hideError())
        dispatch(updateUser({ user, userId: _id }))
    }
    useEffect(() => {
        setUser({ ...user, image })
    }, [image])
    useEffect(() => {
        if (msg && !showError) {
            setTimeout(() => {
                dispatch(hideMsg(true))
            }, 5000)
        }
    }, [msg])
    return (
        <Wrapper>
            <div className="container">
                <div className="intro">
                    <h1>Account</h1>
                    <span className='welcome'>Hi , <span>{name}</span></span>
                </div>

                <div className="info">

                    <div className="container-img">
                        <UserAvatar name={name} image={user.image} />
                        <label htmlFor='img-file' className="modify-img">
                            <BsImage />
                            <span>change image</span>
                        </label>
                        <input
                            type="file"
                            id='img-file'
                            name='image'
                            onChange={handleChange}
                            accept="image/*"
                        />

                    </div>
                    <div className="user-credentials">
                        {
                            msg && <Alert showError={showError} msg={msg} />
                        }
                        <form onSubmit={submit} className='form'>
                            {/* name */}
                            <FormRow
                                name='name'
                                type='text'
                                handleChange={handleChange}
                                value={user.name}
                                showError={showError}
                            />
                            {/* email */}
                            <FormRow
                                name='email'
                                type='email'
                                handleChange={handleChange}
                                value={user.email}
                                showError={showError}
                            />
                            {/* city */}
                            <FormRow
                                name='city'
                                type='text'
                                handleChange={handleChange}
                                value={user.city}
                                showError={false}
                            />
                            <button type="submit" className='dark-btn' disabled={isLoading}>
                                {
                                    isLoading ? 'Loading ...' : 'save changes'
                                }
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding : 3rem 0;
    .intro{
        text-transform : capitalize;
    }
    .welcome{
        font-size : 1.15rem;
    }
    .welcome span{
        font-weight : bold;
    }
    .info{
        margin : 1.5rem auto;
    }
    .container-img{
        position : relative;
        width : 128px;
        height: 128px;
        border-radius : 50%;
        overflow: hidden;
        margin-bottom : 1.5rem ;
    }
    .container-img .modify-img{
        position : absolute ; 
        cursor : pointer;
        top: 50%;
        left : 50%;
        transform: translate(-50%,-50%);
        width : 100%;
        height : 100%;
        display : flex;
        justify-content : center ; 
        align-items : center;
        background : rgb(0,0,0,0.5);
        opacity : 0 ;
        transition : .5s ease;
        color: white;
        flex-direction: column;
        text-transform: capitalize;
    }
    .container-img:hover .modify-img{
        opacity : 1;
    }
    .modify-img svg{
        font-size : 30px;
        color : var(--white);
    }
    .container-img .user-img{
        width : 100%;
        height: 100%;
    }
    .user-img > div{
        width : 100%;
        height : 100%;
    }
    #img-file{
        display : none;
    }
    .form{
        margin : 0;
    }
    .dark-btn{
        margin-top: 1rem;
    }
    @media screen and (min-width: 768px){
        .info{
                display: grid;
                grid-template-columns: auto minmax(300px,600px);
                gap: 3rem;
                max-width: 800px;
                margin-top : 5rem ;
        }
    }
`

export default Account
