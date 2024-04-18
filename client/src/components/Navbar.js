import React, { useEffect } from 'react'
import styled from 'styled-components'
import { HiOutlineShoppingBag as Cart } from "react-icons/hi"
import Person from '../assets/Person'
import { BiSearch } from 'react-icons/bi'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal } from '../Features/cart/cartSlice'
import Login from './Login'
import { showMe, toggleLoginPage } from '../Features/user/userSlice'
import Logo from '../assets/logo.png'
import WhiteLogo from '../assets/logo-white.png'
import iconLogoBlack from "../assets/icon-logo-black.png"
import iconLogoWhite from "../assets/icon-logo-white.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import AcountMenu from './AcountMenu'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import CartModal from './CartModal'
import Footer from './Footer'
const Navbar = () => {
    const { cartItems, totalItems, showModal: showCartModal } = useSelector(store => store.cart)
    const { isLoginPageOpened, showAccountMenu, isLoggedIn } = useSelector(store => store.user)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const togglePageLogin = (e) => {
        e.stopPropagation()
        dispatch(toggleLoginPage())
    }
    const getLogo = () => {
        return location.pathname === '/about' ? WhiteLogo : Logo
    }
    const getSmallLogo = () => {
        return location.pathname === '/about' ? iconLogoWhite : iconLogoBlack
    }
    const closeSearchBar = () => {
        setShowSearchBar(false)
    }
    const toggleSearchBar = (e) => {
        e.stopPropagation()
        setShowSearchBar(!showSearchBar)
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    useEffect(() => {
        dispatch(showMe())
    }, [])
    useEffect(() => {
        dispatch(calculateTotal())
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])
    useEffect(() => {
        if (showAccountMenu && window.innerWidth < 768) {
            setShowSidebar(true)
        }
    }, [showAccountMenu])

    return (
        <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_OAUTH_CLIENT_ID}`}
        >
            <Wrapper
                style={{ backgroundColor: showSearchBar ? 'var(--white)' : 'transparent' }}
            >
                <div className="container">
                    <nav>
                        <button className="toggle-sidebar" onClick={toggleSidebar}>
                            <div className="hamburger-menu">
                                <div className="line-1"></div>
                                <div className="line-2"></div>
                            </div>
                        </button>
                        <div className="logo">
                            <Link to='/' className=''>
                                <img src={getLogo()} alt="logo" className='big-logo' />
                                <img src={getSmallLogo()} className='logo-as-icon' alt="logo" />
                            </Link>
                        </div>
                        {
                            showSearchBar ? <SearchBar closeSearch={closeSearchBar} linkToNavigate='/products' /> :
                                <ul className="links">
                                    <li><Link to='/' className=''>Home</Link> </li>
                                    <li><Link to="/products" className="link">Products</Link></li>
                                    <li><Link to="/about" className="link">About</Link></li>

                                </ul>
                        }

                        <div className="container-btns">
                            <button
                                className='btn'
                                onClick={toggleSearchBar}
                            >
                                <BiSearch />
                            </button >
                            <div className="container-account">
                                <button className='btn' onClick={togglePageLogin}>
                                    <Person />
                                </button>
                                {showAccountMenu && <AcountMenu />}
                            </div>

                            <Link to='/cart' className="btn cart-btn">
                                <span className="right-cart-number">{totalItems}</span>
                                <Cart />
                            </Link>
                        </div>
                    </nav>
                </div>


            </Wrapper>
            {isLoginPageOpened && <Login />}
            {showSearchBar && <div className="search-background"></div>}
            {
                showCartModal && <CartModal />
            }
            <Sidebar showSidebar={showSidebar} closeSidebar={toggleSidebar} />
            <Outlet />
            <Footer />
        </GoogleOAuthProvider>

    )
}

const Wrapper = styled.header`
    position: relative;
    z-index: 101;
    nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7rem;
   }
    svg{
        width:20px; 
        height:20px;
    }
    .logo {
        width : 150px ; 
    }
    .logo-as-icon{
        display : none;
    }
    .toggle-sidebar {
        display: none;
    }
    .container-btns{
        display : flex;
    }
    .btn{
        box-shadow:none ;
        color: var(--black);
        background : transparent;
    }
    .links {
        display: flex;
        gap: 3.5rem;
        font-size: 1.15rem;
        font-weight: 500;
    }

    .cart-btn {
        position: relative;
    }
    .cart-btn svg{
        width : 23px;
        height : 23px;
    }
    .cart-btn span {
        background: var(--gold);
        max-width: 25px;
        min-width: 20px;
        height: 20px;
        color: #fff;
        border-radius: 10px;
        position: absolute;
        top: -11px;
        left: 20px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        padding: 0 2px;
    }
    .hamburger-menu {
        display: grid;
        gap: 0.3rem;
        padding: 0.5rem 0;
    }
    .line-1,
    .line-2 {
        width: 30px;
        background-color: var(--black);
        height: 2px;
    }

    .line-2 {
        width: 20px;
    }
    .container-account{
        position : relative ;
    }

    @media screen and (max-width:786px) {
        .links {
            display: none;
        }

        .toggle-sidebar {
            display: block;
        }
        .container-account{
            display : none ; 
        }
    }
    @media screen and (max-width : 500px){
        .logo {
            width : 50px ; 
        }
        .big-logo{
            display : none;
        }
        .logo-as-icon{
            display : block;
        }
    }

`

export default Navbar
