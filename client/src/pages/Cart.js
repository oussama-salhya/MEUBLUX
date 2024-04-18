import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { Price } from '../components'
import { toggleLoginPage } from '../Features/user/userSlice'
const Cart = () => {
    const { cartItems, totalAmount } = useSelector(store => store.cart)
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const openLoginPage = (e) => {
        e.stopPropagation()
        dispatch(toggleLoginPage())
    }
    if (cartItems.length <= 0) {
        return <Wrapper>
            <div className="empty-cart">
                <div className="container">
                    <h1>your cart is currently Empty</h1>
                    <Link to='/products' className='dark-btn' > Fill it </Link>
                </div>

            </div>

        </Wrapper>
    }
    return (
        <Wrapper>
            <div className="container-cart">
                <div className="container-intro">
                    <div className="container-title">
                        <h1>Cart</h1>
                    </div>
                </div>
                <div className="cart-items">
                    <div className="title">
                        <h1>Cart</h1>
                    </div>
                    {
                        cartItems.map((item, index) => {
                            return <CartItem
                                key={index}
                                {...item}
                            />
                        })
                    }

                </div>
                <div className="cart-totals">
                    <h2 className='cart-totals-title'>Cart totals</h2>
                    <div className="sub-total">
                        <span className='title'>Subtotal</span>
                        <span><Price price={totalAmount} /></span>
                    </div>
                    <div className="shipping">
                        <h2 className="title">
                            Shipping
                        </h2>
                        <span>Free Shipping on all orders over <Price price={7500} /></span>

                    </div>
                    <div className="separator"></div>
                    <div className="total">
                        <span className="title">
                            Total
                        </span>
                        <span>
                            <Price price={totalAmount} />
                        </span>
                    </div>
                    {
                        user ? <Link to='/checkout' className="dark-btn" >
                            Proceed To Checkout
                        </Link> : <button className='dark-btn' onClick={openLoginPage}>
                            Login and Proceed To Checkout
                        </button>
                    }
                    <Link className='link' to='/products'><HiArrowNarrowLeft /> Continue shopping</Link>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    margin-top: -7rem;
    .empty-cart{
        padding-top : 10rem ; 
        min-height : calc( 100vh - 200px);
        text-align : center;
    }
    .empty-cart h1{
        font-weight : bold ; 
        text-align : center ; 

    }
    .empty-cart .dark-btn{
        display : inline-block;
        width : auto;
    }
    .container-cart{
        display : flex ; 
        position: relative;
        z-index: 0;
        min-height : 100vh;
    }
    .container-title{
        padding-right: 3.125rem;
        color : black ;
        padding-top: 185px;
    }
    .container-title h1{
        font-size: 90px;
        letter-spacing: -2px;
        line-height: 1.2;
        font-weight : bold;
    }
    .cart-items{
        width: 41.6666666667%;
        padding-top: 185px;
    }

    .cart-items .title{
        display : none;
        
    }
    .cart-items h1{
        font-weight : 700;
        margin-bottom: 2rem;
    }
    .cart-totals{
        background-color: #f4f4f4;
        padding-top: 185px;
    }
    .cart-totals .cart-totals-title{
        font-size: 2rem;
        font-weight: 600;
    }
    .cart-totals .title{
        color: #000000;
        font-size: 1.5rem;
        font-weight : 500;
        font-family : serif;
    }
    .cart-totals h2{
        margin-bottom: 2rem;
    }
    .cart-totals .link{
        display : flex;
        margin-top : 2rem ;
        align-items : center ; 
        justify-content : center;
        gap: 1rem;
        font-size: 1.4rem;
        text-transform: capitalize;
    }
    .cart-totals .link > svg{
        transition : .3s ease;
    }
    .cart-totals .link:hover > svg{
        transform : translateX(-1rem);
    }
    .cart-totals .sub-total , .cart-totals .total{
        display : flex ; 
        justify-content : space-between ;
        align-items :center;
        font-weight: bold;
        padding: 1rem 0;
        border-bottom: 1px solid #00000026;
    }
    .dollar{
        font-size: 0.85rem;
        font-weight : bold;
    }
    .shipping{
        margin-top : 2rem;
    }
    .shipping > span{
        font-size: 1.2rem;
        opacity: .7;
        margin-top: -1rem;
        display: block;
    }
    .shipping p{
        margin-top: 1rem;

    }
    .separator{
        width: 100%;
        height : 5px;
        background:black;
        margin-top : 5rem;
    }
    .cart-totals .total{
        border-bottom : none;
    }
    .dark-btn{
        margin-top : 2rem;
        display : inline-block ;
        text-align:center;
        width : 100%;
    }
    .cart-totals .price{
        font-size : 1.3rem;
    }
    @media screen and (min-width: 768px){
        .container-intro{
            width: 25%;
        }
        .container-title{
            padding-bottom: calc(6.9444444444vw - 3.3333333333px);
            padding-right: calc(7.8125vw - 20px);
            padding-left: calc(7.8125vw - 20px);
        }
        .cart-items{
            padding-right: calc(7.8125vw - 20px);
        }
        .cart-totals{
            padding-bottom: calc(6.9444444444vw - 3.3333333333px);
            padding-right: calc(7.8125vw - 20px);
            padding-left: calc(7.8125vw - 20px);
        }

    }
     @media screen and (min-width: 1300px){
        .cart-totals{
            width: 33.3333333333%;
        }
     }
    @media screen and (max-width : 1300px){
        .container-intro{
            display : none;
        }
        .cart-items .title{
            display: block ;
        }
        .container-title h1{
            font-size : 72px;
        }
        .cart-items{
            width: 58.333%;
            padding-left: 3.5rem;
            padding-top : 125px;
        }
        .cart-totals {
            padding-top : 125px;
            width: 41.667%;
        }
    }
    @media screen and (max-width : 768px){
        .container-cart{
            flex-wrap : wrap ;
        }
        .cart-items {
            padding-left: 2rem;
            padding-right: 1.75rem;
            width: 100%;
            padding-bottom : 5rem;
        }
        .cart-items h1{
            text-align : center ;
            margin-bottom : 4rem;
        }
        .cart-totals {
            width: 100%;
            padding: 125px 2rem;
        }
    }
    @media screen and (max-width : 320px){
        .dark-btn{
           padding : 1.8em .5rem;
        }
        .cart-totals .link{
            font-size : 1.2rem;
        }
    }

    
   
    @media screen and (min-width: 992px){
        .empty-cart{
            min-height : calc( 100vh - 381px);
        }
    }
    @media screen and (min-width : 1200px){
        .empty-cart{
            min-height : calc( 100vh - 343px);
        }
        
    }

`
export default Cart
