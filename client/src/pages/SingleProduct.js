import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Loading, ProductInfo, SingleProductReviews } from '../components'
import { clearMsgContent, getSingleProduct, hideError, hideMsg } from '../Features/products/ProductsSlice'
import Error from './Error'
const SingleProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, singleProduct, showError } = useSelector(store => store.products)

    useEffect(() => {
        if (id !== undefined && id !== null) {
            dispatch(getSingleProduct(id))
        }
    }, [id])
    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                navigate('/')
                dispatch(hideError())
            }, 3000)
        }
    }, [showError])
    if (isLoading) {
        return <Wrapper>
            <div className="loading">
                <h2>Loading ...</h2>
            </div>
        </Wrapper>
    }
    if (showError) {
        return <Error />
    }
    return (
        <Wrapper>
            {
                isLoading && <div className='loading'> Loading ..</div>
            }
            <div className="container">
                <ProductInfo displayIntro={true} />
            </div>
            <div className="container">
                <SingleProductReviews productId={id} productName={singleProduct.name} />
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    margin-top : 2rem;
    .container{
        max-width: 1400px;
        padding-bottom : 3rem ; 
    }
    .loading{
        position : fixed ; 
        top : 0; 
        left : 0 ; 
        width : 100%; 
        height : 100% ; 
        display : flex ; 
        justify-content : center ; 
        align-items : center ; 
        background : var(--white);
        z-index : 100;
    }
    .loading h2{
        font-size: 3rem;
        font-weight: bold;
    }

`

export default SingleProduct
