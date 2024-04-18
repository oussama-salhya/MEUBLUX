import React from 'react'
import styled from 'styled-components'
import { MdDone } from 'react-icons/md'
import { VscClose } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import Price from './Price'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideModal } from '../Features/cart/cartSlice'
const CartModal = () => {
    const { itemAdded: { name, image, price, amount } } = useSelector(store => store.cart)
    const dispatch = useDispatch()
    const closeCartModal = () => {
        dispatch(hideModal())
    }
    return (
        <Wrapper className='cart-modal'
            onClick={closeCartModal}
        >
            <div className="card"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="row">
                    <h6 className='card-title'>
                        <MdDone />
                        <span>item added to cart</span>
                    </h6>
                    <button
                        className='close-btn'
                        onClick={closeCartModal}
                    >
                        <VscClose />
                    </button>
                </div>
                <div className="row product-item">
                    <div className="container-img">
                        <img src={image} alt={name} />
                    </div>
                    <div className="description">
                        <h6 className='name'>{name}</h6>
                        <p className='amount'>Quantity : {amount}</p>
                        <p className='price'>Price : < Price price={price} /></p>
                        <p className='total'>Total : <Price price={price * amount} /></p>
                    </div>
                </div>
                <div className="container-btns">
                    <Link to='/cart'
                        onClick={closeCartModal}
                        className='dark-btn'>
                        View my cart
                    </Link>
                    <button
                        className='dark-btn'
                        onClick={closeCartModal}
                    >
                        continue shopping
                    </button>
                </div>


            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position : fixed ; 
    top : 0 ; 
    left : 0;
    width : 100vw; 
    height : 100vh ; 
    z-index : 100;
    background :rgba(0,0,0,.6) ; 
    display : flex ; 
    justify-content : center ; 
    align-items :center ; 
    h6{
        margin : 0;
    }
    .card{
        background : white;
        width : 90vw ;
        max-width : 400px; 
        padding : 32px;
        color : black ;
    }
    .row{
        display : flex;
    }
    .card .row:first-child{
        justify-content : space-between ;
        margin-bottom : 15px;
    }
    .card-title{
        font-size: calc(16px + 0*(100vw - 575px));
        display : flex ; 
        gap : 1rem ;
        margin: 0;
        align-items: center;
        text-transform : capitalize;
    }
    .card-title .close-btn{
        font-size: 24px;
    }
    .container-img img{
        max-width : 100px;
        height : 123px;
        margin-right : 20px;
    }
    .description > h6{
        font-size : 1rem ;
        text-transform : capitalize;
    }
    .description  > p{
        font-size : 1rem ;
        text-transform : uppercase;
        margin : 0 ;
    }
    .container-btns {
        margin-top : 24px;
    }
    .container-btns .dark-btn{
        display : block ; 
        margin-bottom : 15px;
        text-align : center ; 
        width : 100%;
    }
    .container-btns .dark-btn:last-child{
        background: #fff;
        color: var(--grey-300);
        border-color: #e1e1e1; 
    }
    @media screen and (max-width : 340px){
        .product-item{
            flex-direction : column;
        }
        .container-img img{
            width : 100%;
            max-width : 100%;
            height : 200px;
        }
        .description{
            margin-top : 20px;
        }
        .close-btn{
            display : none;
        }
        .container-btns .dark-btn:last-child{
            padding : 1.8em .5rem;
        }
    }


`

export default CartModal
