import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { HiOutlineShare } from 'react-icons/hi'
import { Price, Quantity, } from './'
import { useState } from 'react'
import { getStars } from '../utils/getStars'
// import Slider from '../components/SliderContent'
import Slider from '../components/Slider'
import AddToCartComponent from './AddToCartComponent'
import { Link } from 'react-router-dom'
const ProductInfo = ({ displayIntro }) => {
    const { id, stock, averageRating, numOfReviews, name, description, price, images, category: { name: categoryName }, company } = useSelector(store => store.products.singleProduct)
    const { cartItems } = useSelector(store => store.cart)
    const [currentSlide, setCurrentSlide] = useState(0)
    const stars = getStars(averageRating)
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
        <Wrapper className='product-info'>
            <div className="container-slider-img">
                <Slider
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    distance={100}
                    control={true}
                    dots={true}
                >
                    {
                        images.map((image, index) => {
                            return <img
                                src={image}
                                key={index}
                                alt="" />
                        })
                    }
                </Slider>
            </div>
            <div className="details">
                {
                    displayIntro &&
                    <div className="intro">
                        <Link to='/'>
                            home / {categoryName}
                        </Link>
                        <button className='share'>
                            <HiOutlineShare />
                        </button>

                    </div>
                }

                <h1 className="product-title">
                    {name}
                </h1>
                {
                    numOfReviews ?
                        <div className="rating">
                            {
                                <span className="stars">
                                    {
                                        stars.map((item) => {
                                            return item
                                        })}
                                </span>

                            }
                            ({numOfReviews} customer reviews)
                        </div>
                        : ''
                }
                <div className="product-price">
                    <Price price={price} />
                </div>
                <p className="description">
                    {description}
                </p>
                <p className="info">
                    <span>Brand : </span> {company}
                </p>
                <p className="info">
                    <span>Available : </span> {stock > 0 ? 'In Stock' : <span className='danger'>currently out of the stock</span>}
                </p>
                <hr />


                {
                    getProductAmountLeft() > 0 && <AddToCartComponent
                        productAmountLeft={getProductAmountLeft()}
                    />
                }



            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display : grid; 
    .details{
        color : black;
    }
    .intro{
        display : flex ; 
        justify-content : space-between ;
        align-items: center;
        margin-bottom: 20px;
    }
    .intro > a{
        text-transform : capitalize;
        line-height: 1.3 !important;
        font-weight: 300 !important;
        color: #000;
        font-size: 1.15rem;
        color: #3a3a3a;
    }
    .intro .share{
        width: 45px ; 
        height : 45px ;
        display : flex ; 
        justify-content : center ; 
        align-items : center ; 
        background :var(--white);
        box-shadow : var(--shadow-3);
        border-radius : 50%;
        position:relative;
        transition : .5s ease;
        z-index : 1;
    }
     .share::after{
        content : '';
        position : absolute;
        top : 0; 
        left : 0; 
        background : black ; 
        width : 100%;
        height : 100%;
        transform: scale(0);
        transform-origin : center;
        transition : .5s ease;
        border-radius : 50%;
        z-index : -1;
    }
    .share:hover{
        color : white;
    }
    .share:hover svg{
        transform : scale(0.9);
    }
    .share:hover::after{
         transform: scale(1);
    }
    .product-title{
        font-size : 3.5rem;
        font-weight: 700;
        letter-spacing: -2px;
        line-height: 1.1;
        margin-bottom : 40px;
    }
    .product-price{
        font-size : 1.8rem;
        line-height: 1.1;
        font-weight: 700;
        margin-bottom : 40px;
    }
    .description{
        font-size: 1.15rem;
        line-height: 1.7;
        font-weight: 300;
        letter-spacing: 0px;
        width: 90%;
        color: #3a3a3a;
        margin-bottom : 40px;
    }
    .label {
        font-size: 1.2rem;
        line-height: 1;
        padding: 0.25rem 0 0.5rem;
        display: inline-block;
        margin-bottom: .5rem;
    }
    .container-colors{
        display: flex ; 
        gap : 1rem;
    }
    .colors{
        margin-bottom : 40px;
    }
    .color{
        width : 24px;
        height: 24px;
        border-radius : 50%;
        cursor: pointer;
        transition : .5s ease ;
        position : relative;
    }
    .color:hover{
        transform : scale(1.2);
    }
    .color.selected{
        transform : scale(1.2);
    }
    .color.selected::after{
        content : '';
        position : absolute;
        width: 30%;
        height :30%;
        border-radius : 50%;
        background :white;
        top : 50%;
        left : 50%;
        transform : translate(-50%, -50%);
    }
    .quantity{
        margin-bottom : 1.5rem;
    }
    .dark-btn{
        font-weight: .85rem;
    }
    .rating{
        display : flex;
        align-items : center;
        gap : 1rem;
        margin-bottom : 20px;
    }
    .stars{
        font-size : 1.2rem ;
        display : flex ; 
        color : #ffc107;
        gap : .2rem;
    }
    .info{
        text-transform: capitalize;
        display: grid;
        grid-template-columns: 125px 1fr;
        align-items : center;
        margin-bottom : .75rem;
        font-size : 1rem ;
    }
    .info span {
        font-weight: 700;
    }
    hr{
        margin: 40px 0;
    }
    .add-to-cart .info{
        margin-bottom : 1.5rem;
    }
    .info .danger{
        font-weight: 400;
        color: #d52c3b;
    }


    @media screen and (min-width : 768px){
        grid-template-columns : 41.6666666667% 58.3333333333% ;
        .details{
            padding-left: calc(11.7647058824vw - 50.4705882353px);
        }
    }
    @media screen and (min-width : 1024px){
        grid-template-columns : 1fr 1fr ;
        .details{
            padding-left: calc(11.71875vw - 50px);
        }
    }
    @media screen and (min-width : 1280px){
        .details{
            padding-top: calc(4.6875vw - 30px);
        }
    }
    @media only screen and (max-width: 1280px){
        .product-title{
            font-size: 3.2rem;
        }
    }
    @media only screen and (max-width: 1024px){
        .product-title{
            font-size: 3.1rem;
        }
    }
    @media screen and (max-width : 768px){
        .details{
            margin-top: 1rem;
            padding-bottom: 3rem;
        }
         .product-title{
            font-size: 2.3rem;
        }

    }
    

`
export default ProductInfo
