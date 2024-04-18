import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaClipboardList } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { TbUserCircle } from 'react-icons/tb'
import { ImUser } from "react-icons/im"
import { logout, toggleLoginPage } from '../Features/user/userSlice'
import UserAvatar from './UserAvatar'
import { clearCart } from '../Features/cart/cartSlice'
const AcountMenu = () => {
    const dispatch = useDispatch()
    const { image, name, email } = useSelector(store => store.user.user)
    const logoutUser = (e) => {
        e.stopPropagation()
        dispatch(logout())
        dispatch(clearCart())
    }
    const closeMenu = () => {
        console.log("toggle from login");
        dispatch(toggleLoginPage())
    }
    useEffect(() => {
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    })
    return (
        <Wrapper>
            <div
                className="row avatar"
                onClick={(e) => e.stopPropagation()}>
                <div className="container-img">
                    <UserAvatar name={name} image={image} />
                </div>
                <div className="user-info">
                    <h4 className="user-name">{name.toLowerCase()}</h4>
                    <p className='user-email'>{email}</p>
                </div>
            </div>
            <div className="border-top"></div>
            <div className="links">
                <ul>
                    <li>
                        <Link to='/account' className='row link'> <ImUser /> my account </Link>
                    </li>
                    <li>
                        <Link to='/orders' className='row link'> <FaClipboardList /> my orders </Link>
                    </li>
                </ul>
            </div>
            <div className="border-top"></div>
            <div className="logout">
                <button
                    className="row link"
                    onClick={logoutUser}
                >
                    <BiLogOut /> logout
                </button>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 40px;
    background: var(--white);
    color: var(--black);
    border-radius: .5rem;
    padding: 1.75rem 1.5rem;
    width : 260px;
    display : grid ; 
    gap: 1.5rem;
    box-shadow : var(--shadow-1);
    .row{
        display : flex;
    }
    .border-top{
        border-top : 1px solid var(--grey-100);
    }
    .avatar{
        gap : 1rem ; 
        align-items: center;
    }
    .container-img{
        width : 3rem ;
        height : 3rem;
        border-radius : 50%;
        display : grid ; 
        place-items : center;
        overflow : hidden;
    }
    .container-img svg{
        width: 40px;
        height: 40px;
    }
    .container-img .user-img{
        width: 100%;
        height: 100%;
    }
    .container-img .img-name{
        width: 100%;
        height: 100%;
        font-size: 1.3rem !important;
    }
    .user-name{
        font-size: 1rem;
        text-transform: lowercase;
        text-transform: capitalize;
        font-weight: 600;
        font-family: 'Nunito';
        margin : 0;
    }
    .user-email{
        font-size : .75rem;
        margin : 0;
    }
    .links{
        display : block !important;
    }
    .links ul{
        margin : 0;
    }
    .links li:first-child .link , .logout .link{
        padding-top : 0;
    }
    .links li:last-child .link{
        padding-bottom:0;
    }
    .link{
        align-items: center;
        gap : 1rem;
        align-items: center;
        gap: 1rem;
        padding: .5rem 0;
        text-transform: capitalize;
        width: 100%;
    }
    .link svg{
        width: 24px;
        height: 24px;
    }
    
    
`

export default AcountMenu
