import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { HeaderDashboardPage, Loading, ProductInfo, ProductOrderChart, ReviewsDetails } from '../components'
import { getSingleProductOrders } from '../Features/orders/orderSlice'
import { getSingleProduct, hideError } from '../Features/products/ProductsSlice'
import { getSingleProductReviews } from '../Features/reviews/reviewsSlice'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, singleProduct, showMsg, msg } = useSelector(store => store.products)
    const [currentIndex, setCurrentIndex] = useState(0)
    const list = [
        {
            label: 'orders',
            component: <ProductOrderChart />
        },
        {
            label: 'reviews',
            component: <ReviewsDetails />
        }
    ]

    useEffect(() => {
        dispatch(getSingleProduct(id))
        dispatch(getSingleProductReviews(id))
        dispatch(getSingleProductOrders(id))
    }, [id, dispatch])
    if (isLoading) {
        return <Loading />
    }

    if (showMsg) {
        setTimeout(() => {
            navigate('/dashboard/products')
            dispatch(hideError())
        }, 3000)
        return (
            <Wrapper>
                <HeaderDashboardPage title={'reviews'} pathList={["dashboard", "Product Details"]} />
                <h2>There was an error</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <HeaderDashboardPage title={'reviews'} pathList={["dashboard", "Product Details"]} />
            <ProductInfo />

            <div className="card">
                <ul>
                    {
                        list.map((item, index) => {
                            return <button
                                key={index}
                                className={`${currentIndex === index ? 'trigger-btn active' : 'trigger-btn'}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                {item.label}
                            </button>
                        })
                    }
                </ul>
                <div>
                    {
                        list[currentIndex].component
                    }
                </div>
            </div>

        </Wrapper>
    )
}
const Wrapper = styled.section`
    padding: 40px;
    position: relative;
    vertical-align: top;
    @media only screen and (min-width: 768px) {
        margin-left: 300px;
    }
    @media only screen and (max-width: 767px){
        padding: 0 15px 15px;
    }
    .card{
        margin-top : 2rem ;
        overflow : hidden ; 
    }
    .trigger-btn{
        padding :1rem 1.5rem ; 
    }
    .trigger-btn.active{
        background : var(--black);
        color : var(--white);
    }
    .quantity{
        display : none !important ; 
    }
    .dark-btn{
        display : none !important ; 
    }

    

`
export default ProductDetails
