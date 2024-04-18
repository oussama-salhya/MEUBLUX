import React from 'react'
import Cart from '../assets/cart'
import styled from 'styled-components'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart } from '../Features/cart/cartSlice'
import { getSingleProduct, handleChange } from '../Features/products/ProductsSlice'
import Price from './Price'
const Product = ({ mainImage, name, id, price, stock, setQuickLook }) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(store => store.cart)
    const addItemToCart = () => {
        dispatch(addTocart({ id, name, price, amount: 1, image: mainImage, stock }))
    }
    const handleQuickLook = () => {
        dispatch(getSingleProduct(id))
        setQuickLook({ isOpen: true, id })
    }
    const getProductAmountLeft = () => {
        const product = cartItems.find(item => item.id === id)
        if (product) {
            return product.stock - product.amount
        }
        else {
            return stock
        }
    }
    return (
        <Wrapper className="card">
            <div className="container-img">
                <Link to={`/products/${id}`}>
                    <img src={mainImage} alt={name} />
                </Link>
            </div>
            <div className="description">
                <Link to={`/products/${id}`}>
                    <h3>{name}</h3>
                </Link>
                <Price price={price} />
                <div className="container-btns">
                    {
                        getProductAmountLeft() > 0 && <button
                            className="btn add-to-cart"
                            onClick={addItemToCart}>
                            <Cart />
                        </button>
                    }

                    <button
                        className='btn quick-look'
                        onClick={handleQuickLook}
                    >
                        <AiOutlineEye />
                    </button>

                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`


 h3 {
    font-weight: 600;
}

 span {
    font-weight: 800;
    font-size: 1.1rem;
}

 h3 {
    font-size: 1.25rem;
    margin: 0;
    margin-top: 1rem;
}

 .description {
    display: grid;
    gap: .5rem;
}

 .btn {
    padding: 0.6rem;
    border-radius: 50%;
    background : var(--black);
    margin-right : .5rem;
    width : 40px;
    height :40px;
    display : flex ; 
    justify-content : center ; 
    align-items : center ;
    float : left ;
}


 .btn.add-to-cart svg path {
    fill: var(--white);
}

 .btn.quick-look {
    background: var(--white);
    color : var(--black);
    font-size : 1.5rem;
}
.btn:hover{
    transform : scale(1.2);
}
img{
    width : 100%;
}
.price{
    font-size : 1.4rem;
}
@media screen and (min-width:600px){
    img{
        height : 260px;
    }
}
@media screen and (min-width:900px){
    img{
        height : 300px;
    }
}
@media screen and (min-width:1200px){
    img{
        height : 350px;
    }
}

`

export default Product
