import { Link } from "react-router-dom"
import styled from 'styled-components'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import SliderComponent from "./Slider"

const Hero = () => {
    const heroSlides = [
        {
            id: 1,
            category: 'kitchen',
            subTitle: 'NEW ARRIVALS',
            title: 'New Kitchen Collection',
            description: 'Vivamus pellentesque quam sed purus fermentum, eu vehicula mi luctus.',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 2,
            category: 'office',
            subTitle: 'LIVING ROOM',
            title: 'Armchairs Collection',
            description: 'Proin ultrices augue vitae massa maximus, ac vehicula est auctor',
            image: 'https://images.unsplash.com/photo-1520453714493-d85cdd7b033b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80'
        },
        {
            id: 3,
            category: 'office',
            subTitle: 'SMOOTH ELEGANCE',
            title: 'Our Vintage Collection',
            description: 'Aliquam egestas et tellus quis malesuada. Nunc eget molestie lorem.',
            image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        }
    ]
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(heroSlides.length - 1)
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
    return (
        <Wrapper>
            <div className="container-slider">
                <div className="left-slide">
                    {
                        heroSlides.map(({ image }, index) => {
                            let position = 'next-slide';
                            if (index === currentSlide - 1 || (currentSlide === 0 && index === heroSlides.length - 1)) {
                                position = 'active-slide'
                            }
                            if (index === currentSlide - 2 || (currentSlide === 0 && index === heroSlides.length - 2)) {
                                position = 'prev-slide'
                            }
                            return <img key={index} src={image} alt="img-left" className={position} />
                        })
                    }

                </div>
                <div className="slide-content">
                    <div className="slide-content-wrapper">
                        <div>
                            {
                                heroSlides.map((item, index) => {
                                    const { subTitle, title, description } = item
                                    let position = 'next-slide';
                                    if (index === currentSlide) {
                                        position = 'active-slide'
                                    }
                                    if (index === currentSlide - 1 || (currentSlide === 0 && index === heroSlides.length - 1)) {
                                        position = 'prev-slide'
                                    }
                                    return (
                                        <div key={index} className={`description ${position}`}>
                                            <h4 className="slide-subtitle">{subTitle}</h4>
                                            <h1 className="slide-title">{title}</h1>
                                            <p className="slide-description">
                                                {description}
                                            </p>
                                            <div className="cta">
                                                <button className="slide-cta">
                                                    View Collection
                                                </button>
                                            </div>
                                        </div>
                                    )
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
                                        onClick={() => setCurrentSlide(index)} >
                                    </li>
                                })
                            }
                        </ol>

                    </div>
                </div>
                <div className="slide-img">
                    <SliderComponent
                        currentSlide={currentSlide}
                        draggable={true}
                        setCurrentSlide={setCurrentSlide}
                        prevSlide={prevSlide}
                        setPrevSlide={setPrevSlide}
                    >
                        {
                            heroSlides.map(({ image }, index) => {
                                return <img key={index} src={image} alt="slide" />
                            })
                        }
                    </SliderComponent>

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
        position : absolute ; 
        width : 100%;
        height : 100%;
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
    }
    .description {
        opacity : 0 ; 
        position : absolute ;
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
        font-size: calc(2.34375vw + 10px);
    }
    .slide-description{
        opacity: .6;
        font-size: 1rem;
        line-height: 1.4;
    }
    .slide-cta{
        color: black;
        margin-top: 0.9375rem;
        display: inline-block;
        line-height: 2;
        font-weight: 700!important;
        text-transform: uppercase;
        letter-spacing: 3px;
        border-bottom: 3px solid #000;
        transition: border-color .3s!important;
        padding: 0;
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
    /* .slide-img .slider{
        width : 100% !important ; 
        height : 100%!important ;
    }
    .slider .slick-slide {
        height: 100% !important;
    } */
    /* .slide-img > img{
        position: absolute;
        left: 0;
        top: 0;
        transition :transform .3s ease ; 
    } */
    /* styling the animations */
    .active-slide{
        transform : translateX(0);
        opacity : 1;
        z-index : 3 ; 
        transition :transform 1s ease ;
    }
    .next-slide{
        transform : translateX(100%);
        z-index : 1 ;
    }
    .prev-slide{
        transform : translateX(-100%);
        z-index : 2 ;
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
        }
        .slide-dots{
            bottom: 80px;
        }
    }
    @media screen and (max-width: 768px){
        .container-slider {
            height: auto;
            align-items: flex-start;
            flex-wrap: wrap;
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
        .slide-cta{
            font-size: .8rem;
        }
    }
    
`

export default Hero