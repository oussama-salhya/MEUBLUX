import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import kitchen from '../assets/hero-bcg.jpg'
import chairs from '../assets/chairs.jpeg'
import office from '../assets/office.jpeg'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFilters, getAllProducts, getFilteredProducts, handleSearchBar, setFilter } from "../Features/products/ProductsSlice";
import Slider from './Slider'
const heroSlides = [
    {
        id: 1,
        category: 'kitchen',
        subTitle: 'NEW ARRIVALS',
        title: 'New Kitchen Collection',
        description: 'Vivamus pellentesque quam sed purus fermentum, eu vehicula mi luctus.',
        image: kitchen
    },
    {
        id: 2,
        category: 'office',
        subTitle: 'LIVING ROOM',
        title: 'Armchairs Collection',
        description: 'Proin ultrices augue vitae massa maximus, ac vehicula est auctor',
        image: chairs
    },
    {
        id: 3,
        category: 'office',
        subTitle: 'SMOOTH ELEGANCE',
        title: 'Our Vintage Collection',
        description: 'Aliquam egestas et tellus quis malesuada. Nunc eget molestie lorem.',
        image: office
    }
]

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(heroSlides.length - 1)
    const dispatch = useDispatch()
    const navigateToProductsPage = (category) => {
        dispatch(handleSearchBar(category))
        dispatch(getAllProducts())
    }
    const changecurrentSlide = (action) => {
        if (action) {
            setPrevSlide(currentSlide)
            if (action === 'i') {
                setCurrentSlide(currentSlide + 1 < heroSlides.length ? currentSlide + 1 : 0)
            }
            else {
                setCurrentSlide(currentSlide - 1 < 0 ? heroSlides.length - 1 : currentSlide - 1)
            }
        }
    }
    const getPrevIndex = () => {
        return currentSlide - 1 < 0 ? heroSlides.length - 1 : currentSlide - 1
    }
    const handleClick = (index) => {
        setPrevSlide(currentSlide)
        setCurrentSlide(index)
    }
    useEffect(() => {
        dispatch(clearFilters())
    }, [])
    return (
        <Wrapper>
            <div className="container-slider">
                <div className="left-slide">
                    {
                        heroSlides.map((slide, index) => {
                            const prevIndex = getPrevIndex()
                            let x = (index - prevIndex) * 100
                            let zIndex = 1;
                            let transition = ''
                            if (prevIndex === heroSlides.length - 1 && index === 0) {
                                x = 100;
                            }
                            if (prevIndex === 0 && index === heroSlides.length - 1) {
                                x = -100;
                            }
                            if (index === prevIndex) {
                                zIndex = 3;
                                transition = 'transform 1s ease'
                            }
                            if (index === prevSlide - 1 || index === 0) {
                                zIndex = 2;
                                transition = 'transform 1s ease'
                            }

                            return <img src={slide.image}
                                key={index}
                                alt={slide.subTitle}
                                style={{ transform: `translateX(${x}%)`, transition, zIndex }}
                            />
                        })
                    }
                </div>
                <div className="slide-content">
                    <div className="slide-content-wrapper">
                        <div>
                            {
                                heroSlides.map((item, index) => {
                                    const { subTitle, title, description, category } = item
                                    let x = (index + 1) * 10
                                    let zIndex = 1;
                                    let transition = 'transform 1s ease'
                                    let opacity = currentSlide === index ? 1 : 0;
                                    if (currentSlide === index) {
                                        x = 0;
                                        transition = '1s ease'
                                    }
                                    return <div
                                        className={`description`}
                                        style={{ transform: `translateX(${x}%)`, transition, zIndex, opacity }}
                                        key={index}
                                    >
                                        <h4 className="slide-subtitle">{subTitle}</h4>
                                        <h1 className="slide-title">{title}</h1>
                                        <p className="slide-description">
                                            {description}
                                        </p>
                                        <div className="cta">
                                            <Link to='/products'
                                                className="slide-cta"
                                                onClick={() => navigateToProductsPage(category)}
                                            >
                                                View Collection
                                            </Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <button className="slide-btn prev-btn" onClick={() => changecurrentSlide('d')}><BsArrowLeft /> </button>
                        <button className="slide-btn next-btn" onClick={() => changecurrentSlide('i')}><BsArrowRight /> </button>
                        <ol className="slide-dots">
                            {
                                heroSlides.map((_, index) => {
                                    return <li
                                        className={`${index === currentSlide ? 'dot selected' : 'dot'}`}
                                        key={index}
                                        onClick={() => handleClick(index)} >
                                    </li>
                                })
                            }
                        </ol>

                    </div>
                </div>
                <div className="slide-img">
                    {
                        heroSlides.map((slide, index) => {
                            let x = (index - currentSlide) * 100
                            let zIndex = 1;
                            let transition = ''
                            if (currentSlide === heroSlides.length - 1 && index === 0) {
                                x = 100;
                            }
                            if (currentSlide === 0 && index === heroSlides.length - 1) {
                                x = -100;
                            }
                            if (index === currentSlide) {
                                zIndex = 3;
                                transition = 'transform 1s ease'
                            }
                            if (index === prevSlide) {
                                zIndex = 2;
                                transition = 'transform 1s ease'
                            }

                            return <img src={slide.image}
                                key={index}
                                alt={slide.subTitle}
                                style={{ transform: `translateX(${x}%)`, zIndex, transition }}
                            />
                        })
                    }
                </div>

            </div>


        </Wrapper>
    )
}

const Wrapper = styled.section`
    .container-slider{
        height: calc(100vh - 5rem);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .left-slide{
        position: relative;
        overflow: hidden;
        flex-basis: 10%;
        height: 65%;
    }
    .left-slide > img{
        width : 100%;
        height : 100%;
        position : absolute ;
        top : 0 ; 
        left:0;
    }
    img{
        height : 100%;
        width : 100%;
    }
    .slide-content {
        position: relative;
        flex-basis: 15%;
        height: 65%;
        color :  #000000;
    }
    .slide-content-wrapper {
        padding: 60px;
        z-index: 4;
        position: absolute;
        left: -2px;
        top: 60px;
        width: 180%;
        height: 100%;
        background-color: #fff;
        padding-left: 40px;
    }
    .slide-content-wrapper > div{
        width: 100%;
        height: 100%;
        position: relative;
        min-height : 315px;
    }
    .slide-content-wrapper .description{
        position : absolute;
        top : 0;
        left : 0;
    }
    .slide-subtitle{
        display: inline-block;
        font-weight: 700;
        line-height: 1.1;
        text-transform: uppercase;
        letter-spacing: 3px;
        margin-bottom: 1.5625rem;
        font-size: 0.85rem;
        color: #cba14a;
    }
    .slide-title{
        text-indent: -34px;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: -1px;
        font-size: 3.5rem;
    }
    .slide-description{
        opacity: .6;
        font-size: 1rem;
        line-height: 1.4;
        margin-bottom : 1.1rem;
    }
    .slide-cta{
        color: black;
        margin-top: 0.9375rem;
        line-height: 2;
        font-weight: 700!important;
        text-transform: uppercase;
        letter-spacing: 3px;
        border-bottom: 3px solid #000;
        transition: border-color .3s!important;
        padding-bottom: 5px;
    }
    .slide-cta:hover{
        border-color : transparent ; 
    }
    .slide-btn{
        background: #000;
        color: var(--white);
        height: 60px;
        width: 65px;
        top: -60px;
        left: 0;
        position: absolute;
        font-size: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid white;
    }
    .next-btn{
        left : 65px;
    }
    .slide-dots{
        position: absolute;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
        line-height: 1;
        z-index: 4;
        bottom: 50px;
        width: auto;
    }
    .dot{
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 8px;
        background: #333;
        border-radius: 50%;
        cursor : pointer ; 
        opacity: .25;
        transition : .3s ease ; 
    }
    .dot:hover{
        transform :scale(1.5);
    }
    .dot:first-child{
        margin-left : 0;
    }
    .dot.selected{
        opacity : 1 ; 
        transform: scale(1.5);
    }
    .slide-img{
        height : 100%;
        position: relative;
        overflow: hidden;
        flex-basis: 75%;
    }
    .slide-img > img{
        position : absolute ; 
        top : 0 ; 
        left : 0;
        width : 100%;
        height : 100%;
        /* transition : 1s ease; */
    }
    /* .slide-img > img{
        z-index : 10 ;
    } */
    /* styling the animations */
    .active-slide{
        transform : translateX(0);
        opacity : 1;
    }
    .next-slide{
        transform : translateX(100%);
        opacity : 0;
    }
    .prev-slide{
        transform : translateX(-100%);
        opacity : 0;
    }
    @media (min-width: 768px){
        .slide-content-wrapper {
            padding-left: calc(7.8125vw - 20px);
        }
    }
    @media screen and (max-width : 1200px){
        .left-slide{
            display : none ; 
        }
        .slide-content{
            flex-basis: 20%;
        }
        .slide-img{
            flex-basis : 80%;
        }
    }
    @media screen and (max-width: 1020px){
        .container-slider{
            height : 500px;
        }
        .slide-content-wrapper {
            padding : 40px;
        }
        .slide-title{
            text-indent : 0px;
            font-size: 2.2rem;
            margin-bottom: 1rem;
        }
        .slide-dots{
            bottom: 60px;
        }
    }
    @media screen and (max-width: 768px){
        .container-slider {
            height: auto;
            align-items: flex-start;
            flex-wrap: wrap;
            padding-bottom: 5rem;
        }
        .slide-title{
            font-size: 2.15rem;
        }
        .slide-subtitle{
            font-size : 0.75rem;
        }
        .slide-content{
            flex-basis: 100%;
            height: auto;
            min-height: 300px;
            order: 2;
        }
        .slide-content-wrapper{
            padding-top: 20px;
            top: 5px;
            width: 100%;
        }
        .slide-content-wrapper > div{
            overflow : hidden;
        }
        .slide-btn{
            display : none;
        }
        .slide-dots{
            left: auto;
            bottom: auto;
            right: auto;
            top: -30px;
            padding: 5px 10px;
            background-color: #fff;
        }
        .dot:first-child {
            margin-left : 8px; 
        }
        .slide-img{
            flex-basis : 100%;
            height : 300px;
        }
    }
    
`

export default Hero