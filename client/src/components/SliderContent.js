import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import rightChevron from '../assets/right-chevron.png'
const SliderComponent = (({ children, currentSlide, draggable, setCurrentSlide, distance, control, dots }) => {
    const [prevSlide, setPrevSlide] = useState(children.length - 1)
    const ref = useRef(null);
    const [heightSize, setHeightSize] = useState(undefined)
    const [isDraggable, setIsDraggable] = useState(false)
    const changecurrentSlide = (action) => {
        if (action) {
            setPrevSlide(currentSlide)
            if (action === 'i') {
                setCurrentSlide((oldValue) => {
                    return oldValue + 1 < children.length ? oldValue + 1 : 0
                })
            }
            else {
                setCurrentSlide((oldValue) => {
                    return oldValue - 1 < 0 ? children.length - 1 : oldValue - 1
                })
            }
        }
    }
    const changeSize = () => {
        const container = document.querySelector('.container-slide')
        if (container) {
            if (container.firstChild.nodeName === 'IMG') {
                container.firstChild.addEventListener('load', (e) => {
                    setHeightSize(e.currentTarget.offsetHeight)
                })
            }
            setHeightSize(container.firstChild.offsetHeight)
        }

    }
    useEffect(() => {
        window.addEventListener('resize', changeSize)
        return () => {
            window.removeEventListener('resize', changeSize)

        }
    })
    useEffect(() => {
        changeSize()
    }, [children])


    return (
        <Wrapper style={{ height: `${heightSize}px` }}>
            <div className="container-slider">
                {
                    control &&
                    <>
                        <button
                            className="control left"
                            onClick={() => changecurrentSlide('d')}>
                            <img src={rightChevron} alt="" />
                        </button>
                        <button
                            className="control right"
                            onClick={() => changecurrentSlide('i')}
                        >
                            <img src={rightChevron} alt="" />
                        </button>
                    </>

                }
                {
                    children.map((item, index) => {
                        let x = (index - currentSlide) * distance
                        let zIndex = 1;
                        let transition = ''
                        if (currentSlide === children.length - 1 && index === 0) {
                            x = 100;
                        }
                        if (currentSlide === 0 && index === children.length - 1) {
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
                        return <div
                            key={index}
                            className="container-slide"
                            style={{ transform: `translateX(${x}%)`, zIndex, transition }}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            {item}
                        </div>
                    })
                }
                {
                    dots && <ol className="slider-dots">
                        {
                            children.map((_, index) => {
                                return <li
                                    className={`${index === currentSlide ? 'dot selected' : 'dot'}`}
                                    key={index}
                                    onClick={() => setCurrentSlide(index)} >
                                </li>
                            })
                        }
                    </ol>
                }
            </div>

        </Wrapper>

    );
})
const Wrapper = styled.div`
    height : 100%;
    position : relative;
    width: 100;
    overflow : hidden ; 
    div{
        height : 100%;
    }
    img{
        /* height : 100%; */
        cursor : grab;
    }
    .container-slide{
        position : absolute ; 
        top : 0; 
        left : 0;
    }
    .control{
        position : absolute ;
        top : 50%;
        z-index : 4;
        opacity : 0;
        transition : .5s ease;
    }
    .control.left{
        left : 0;
        transform : translateY(-50%) translateX(10px);
    }
    .control.right{
        right : 0;
        transform : translateY(-50%) translateX(-10px);
    }
    .control > img{
        width: 30px;
    }
    .left > img:first-child{
        transform : rotate(180deg);
    }
    .container-slider:hover .control{
        opacity : 1;
        transform : translateY(-50%);
    }
    .slider-dots{
        position: absolute;
        padding: 0;
        margin: 0;
        display: block;
        width: 100%;
        list-style: none;
        text-align: center;
        line-height: 1;
        z-index: 4;
        bottom: 20px;
        left : 50%;
        transform : translateX(-50%);
        padding: 10px 0;
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
    @media screen and (max-width : 768px){
        .control{
            display : none ; 
        }
    }
    

`

export default SliderComponent
