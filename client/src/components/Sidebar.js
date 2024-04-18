import React from 'react'
import styled from 'styled-components'
import { VscClose } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ImUser } from 'react-icons/im'
import { FaClipboardList } from 'react-icons/fa'
import { TbUserCircle } from 'react-icons/tb'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { logout, toggleLoginPage } from '../Features/user/userSlice'
import UserAvatar from './UserAvatar'
const Sidebar = ({ showSidebar, closeSidebar }) => {
    const { isLoggedIn, user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const imageStyle = {
        background: `url(${user ? user.image : ''}) center/ cover`
    }
    const manageClosing = (e) => {
        if (!e.target.classList.contains('wrapper-sidebar')) {
            closeSidebar()
        }
    }
    const logoutUser = (e) => {
        e.stopPropagation()
        closeSidebar()
        dispatch(logout())
    }
    const openLoginPage = (e) => {
        e.stopPropagation()
        closeSidebar()
        dispatch(toggleLoginPage())
    }

    return (
        <Wrapper
            className={`${showSidebar ? 'sidebar sidebar-open' : "sidebar"}`}
            onClick={manageClosing}
        >
            <div className="wrapper-sidebar">
                <div className="close-btn">
                    <button>
                        <VscClose />
                    </button>
                </div>
                {
                    isLoggedIn && <div
                        className="row avatar"
                        onClick={(e) => e.stopPropagation()}>
                        <UserAvatar name={user.name} image={user.image} />
                        <div className="user-info">
                            <h4 className="user-name">{user.name.toLowerCase()}</h4>
                            <p className='user-email'>{user.email}</p>
                        </div>
                    </div>
                }
                <ul className="links">
                    <li><Link to='/' className=''> Home</Link> </li>
                    <li><Link to="/products" className="link">Products</Link></li>
                    <li><Link to="/about" className="link">About</Link></li>
                </ul>
                {
                    isLoggedIn && <ul className='user-links'>
                        <li>
                            <Link to='/account' className='row user-link'> <ImUser /> my account </Link>
                        </li>
                        <li>
                            <Link to='/orders' className='row user-link'> <FaClipboardList /> my orders </Link>
                        </li>
                        <li>
                            <button
                                onClick={logoutUser}
                                className="row user-link">
                                <BiLogOut /> logout
                            </button>
                        </li>
                    </ul>
                }
                {
                    !isLoggedIn && <div className='login-user'>
                        <button
                            className="row user-link"
                            onClick={openLoginPage}>
                            <ImUser /> login
                        </button>
                    </div>
                }

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position : fixed ; 
    top : 0 ; 
    left : 0 ; 
    width : 100vw;
    height : 100vh ; 
    z-index : -1;
    opacity : 0 ; 
    background : #000000a6 ;
    transition: all 0.3s;
    .wrapper-sidebar{
        width : 90vw ;
        max-width: 350px;
        background-color: var(--white);
        overflow: auto;
        padding: 24px;
        height : 100%;
        transform : translatex(-100%);
        transition: all 0.3s;
    }
    .close-btn{
        display: flex;
        justify-content: flex-end;
    }
    .close-btn button{
        width: 40px;
        height: 40px;
    }
    .close-btn svg{
        width : 30px ; 
        height : 30px;
    }
    .links{
        margin-top: 5rem;
        font-size: 1.5rem;
        font-weight: 500;
        display: grid;
        gap: 1rem;
    }
    .links a{
        width: 100%;
        display : block ;
        text-transform : capitalize ; 
    }
    .row{
        display : flex;
    }
    .avatar{
        gap : 1rem ; 
        align-items: center;
        margin-top : 5rem;
    }
    .user-img{
        width : 3rem ;
        height : 3rem;
        border-radius : 50%;
        overflow : hidden ;
    }
    .user-img .img-name{
        width: 100%;
        height: 100%;
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
    .user-links{
        margin-top : 2.5rem;
        display: grid;
        gap: .5rem;
    }
    .user-link{
        align-items : center;
        gap :1rem;
        text-transform : capitalize;
        font-weight: 300;
        font-size : 1.2rem;
    }
    .login-user{
        margin-top : 2.5rem;
    }
`

export default Sidebar
