import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Hero from "../assets/generalBackground.jpeg"
import { getSingleCategory, handleChange } from '../Features/categories/categoriesSlice'
const ProductsHeaderPage = () => {
    const { categories, categoriesOptions } = useSelector(store => store.products)
    const { image, name } = useSelector(store => store.categories)
    const dispatch = useDispatch()
    const getStyle = () => {
        return {
            background: `linear-gradient(rgb(255 255 255 / 10%), rgb(255 255 255 / 90%)),
                            url(${image}) center/ cover`
        }

    }
    const getCurrentCatgory = () => {
        return categories.length === 1 ? categories[0] : 'the shop'
    }
    useEffect(() => {
        if (categories.length === 1 && categories[0].name === 'kitchen') {
            const background = new Image()
            background.src = image
            dispatch(handleChange({ name: 'image', value: background }))
            return;
        }
        if (categories.length === 1) {
            dispatch(getSingleCategory(categories[0]))
            return;
        }

        dispatch(handleChange({ name: 'image', value: Hero }))
    }, [categories])
    return (
        <Wrapper style={getStyle()}>
            <div className="title-section">
                <div className="wrapper">
                    <div className="path-wrapper">
                        <span><Link to={'/'}>Home</Link> <span className='delimiter'>/</span> {getCurrentCatgory()}</span>
                    </div>
                    <div className="title-wrapper">
                        <h1>{getCurrentCatgory()}</h1>
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top : -7rem;
    .title-section {
        padding-top: 250px;
        padding-bottom: 250px;
        backdrop-filter: blur(2px);
    }
    .wrapper {
        margin-top: 97.5px;
        text-align : center;
    }
    .path-wrapper{
        margin-bottom: 10px;
        font-size: 20px;
        text-transform: capitalize;
        line-height: 1.3 !important;
        font-weight: 300 !important;
        color: #000;
        opacity: .7;
        font-family: serif;
    }
    span.delimiter {
        padding: 0 10px;
    }
    .title-wrapper h1{
        font-size: 4.5rem;
        font-weight: 700;
        letter-spacing: -2.5px;
        line-height: 1.3;
    }
    @media screen and (max-width :1400px){
        .title-section {
            padding-top: 150px;
            padding-bottom: 150px;
        }
        
    }
    @media screen and (max-width :1024px){
        .title-section {
            padding-top: 130px;
            padding-bottom: 130px;
        }
        .wrapper {
            margin-top: 67.5px;
        }
        .path-wrapper{
            margin-bottom: 15px;
            font-size : 18px;
        }
        .title-wrapper h1{
            font-size: 3.6rem;
        }
    }
    @media screen and (max-width : 768px){
        .title-section {
            padding-top: 40px;
            padding-bottom: 40px;
        }
        .path-wrapper{
            margin-bottom: 10px;
        }
        .title-wrapper h1{
            font-size: 2.7rem;
        }
    }
    
`

export default ProductsHeaderPage
