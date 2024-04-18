import React, { Component } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
// import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import rightChevron from '../assets/right-chevron.png'
const SliderComponent = (({ children, currentSlide, draggable, setCurrentSlide, distance, control, dots }) => {
    const [prevSlide, setPrevSlide] = useState(children.length - 1)
    const containerSliderRef = useRef(null);
    const [heightSize, setHeightSize] = useState(undefined)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState(0)
    const changecurrentSlide = ({ action, payload }) => {
        setPrevSlide(currentSlide)

        if (action === 'toggle') {
            if (payload === 'i') {
                setCurrentSlide((oldValue) => {
                    return oldValue + 1 <= children.length ? oldValue + 1 : 0
                })
            }
            else {
                setCurrentSlide((oldValue) => {
                    return oldValue - 1 < 0 ? children.length : oldValue - 1
                })
            }
        }
        if (action === 'change') {
            if ((currentSlide === 0 && payload === children.length - 1) || (currentSlide === children.length - 1 && payload === 0)) {
                setCurrentSlide(children.length)
                return;
            }
            setCurrentSlide(payload)
        }
        // if(action === 'drag'){

        // }

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
    const animateSlide = () => {
        let translateX = -currentSlide * 100
        let transition = '.5s ease';
        // to ensure that this is not the first time the component rendered
        if (containerSliderRef.current.style.transform) {
            if (currentSlide === children.length && prevSlide === children.length) {
                translateX = -children.length * 100
                // transition = 'none'
            }
            if (currentSlide === 0 && prevSlide === children.length) {
                transition = '0s ease'
            }
            if (currentSlide === children.length && prevSlide === 0) {
                transition = '0s ease'
            }

        }

        containerSliderRef.current.style = `transform: translateX(${translateX}%) ; transition : ${transition}`
    }
    function touchStart(event) {
        setIsDragging(true)
        setStartPos(getPosX(event))
    }
    function touchEnd() {
        setIsDragging(false)
    }
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPosX(event)
            const moved = startPos - currentPosition
            if (moved < -50) {
                changecurrentSlide({ action: 'toggle', payload: 'd' })
                touchEnd()
            }
            else if (moved > 50) {
                changecurrentSlide({ action: 'toggle', payload: 'i' })
                touchEnd()
            }
        }
    }
    function getPosX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }

    useEffect(() => {
        animateSlide()
    }, [currentSlide])
    useEffect(() => {
        window.addEventListener('resize', changeSize)
        return () => {
            window.removeEventListener('resize', changeSize)
        }
    })
    useEffect(() => {
        changeSize()
    }, [children])
    useEffect(() => {
        // containerSliderRef.current?.firstElementChild &&
        if (currentSlide === children.length) {
            if (prevSlide === children.length - 1) {
                const timer = setTimeout(() => changecurrentSlide('i'), 700)
                return () => clearTimeout(timer)
            }
            if (prevSlide === 0) {
                changecurrentSlide('d')
            }

        }
    }, [currentSlide])
    return (
        <Wrapper style={{ height: `${heightSize}px` }}>
            <div className="container-slider">
                {
                    control &&
                    <>
                        <button
                            className="control left"
                            onClick={() => changecurrentSlide({ action: 'toggle', payload: 'd' })}>
                            <img src={rightChevron} alt="" />
                        </button>
                        <button
                            className="control right"
                            onClick={() => changecurrentSlide({ action: 'toggle', payload: 'i' })}
                        >
                            <img src={rightChevron} alt="" />
                        </button>
                    </>

                }
                <div
                    className="container-slides"
                    ref={containerSliderRef}
                >
                    {
                        children.map((item, index) => {
                            let x = index * 100
                            if (index === 0) { // || currentSlide === 0
                                if (currentSlide >= children.length - 1) {
                                    x = children.length * 100;
                                }
                            }

                            // if (currentSlide === 0 && index === children.length - 1) {
                            //     x = -100;
                            // }

                            return <div
                                key={index}
                                className={`${isDragging ? "container-slide grabbing" : "container-slide"}`}
                                style={{ left: `${x}%` }}
                                onDragStart={(e) => e.preventDefault()}
                                onTouchStart={touchStart}
                                onMouseDown={touchStart}
                                onMouseUp={touchEnd}
                                onTouchEnd={touchEnd}
                                onMouseMove={touchMove}
                                onTouchMove={touchMove}
                                onMouseLeave={touchEnd}
                            >
                                {item}
                            </div>
                        })
                    }
                </div>
                {
                    dots && <ol className="slider-dots">
                        {
                            children.map((_, index) => {
                                return <li
                                    className={`${index === currentSlide || (index === 0 && currentSlide === children.length) ? 'dot selected' : 'dot'}`}
                                    key={index}
                                    onClick={() => changecurrentSlide({ action: 'change', payload: index })} >
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
    width: 100%;
    overflow : hidden ; 
    div{
        height : 100%;
    }
    .container-slider{
        position : relative;
    }
    .container-slide img{
        /* height : 100%; */
        cursor : grab;
    }
    .container-slide.grabbing img{
        cursor : grabbing !important; 
    }
    .container-slides{
        position : absolute ;
        width : 100%;
        height : 100%;
        /* transition : .5s ease ;  */
    }
    .container-slide{
        position : absolute ; 
        top : 0; 
        left : 0;
        width : 100%;
        z-index: 1;
    }

    .control{
        position : absolute ;
        top : 50%;
        z-index : 4;
        opacity : 0;
        transition : .5s ease;
    }
    .control.left{
        left : 10px;
        transform : translateY(-50%) translateX(10px);
    }
    .control.right{
        right :10px;
        transform : translateY(-50%) translateX(-10px);
    }
    .control > img{
        width: 25px;
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
        bottom: 10px;
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
        .slider-dots{
            bottom : 0px;
        }
    }
    

`

export default SliderComponent
