import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getSingleProductReviews, getAllReviews } from '../Features/reviews/reviewsSlice'
import { Loading, Review } from '../components'
import { getStars } from '../utils/getStars'
const ReviewsDetails = () => {
    const { reviews, singleProductId, isLoading, averageRating, numOfReviews, reviewsGroupedByRating } = useSelector(store => store.reviews)
    const dispatch = useDispatch()
    const getPoucentage = (item) => {
        return (item / (reviewsGroupedByRating.reduce((res, item) => res + item, 0))) * 100
    }
    if (isLoading) {
        return <Loading />
    }
    if (!isLoading && singleProductId && reviews.length < 1) {
        return <Wrapper >No reviews for this product  </Wrapper>
    }
    if (!isLoading && !singleProductId) {
        return <Wrapper>
            please choose the product you want to see its reviews
            <Link to='/dashboard/products' >back to products </Link>
        </Wrapper>
    }
    return (
        <Wrapper>
            <div className="general-info">
                <div className="total-reviews">
                    <h3 className="title">Total reviews</h3>
                    <span className='amount'>{numOfReviews}</span>
                </div>
                <div className="average-rating">
                    <h3 className='title'>Average Rating</h3>
                    <div className="rating">
                        <span className='amount'>{parseFloat(averageRating).toFixed(1)}</span>
                        <span className='stars'>{getStars(averageRating)}</span>
                    </div>
                </div>
                <div className="rating-grouped">
                    {
                        reviewsGroupedByRating.map((item, index) => {
                            return <div key={index}>
                                <span>{index + 1}</span>
                                <div className="container-pourcentage" key={index}>
                                    <div className="pourcentage" style={{ width: `${getPoucentage(item)}%` }}></div>
                                </div>
                            </div>

                        })
                    }

                </div>
            </div>
            <div className="container-reviews">
                {
                    reviews.map((item, index) => {
                        return <Review key={index} {...item} />
                    })
                }

            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-top : 5rem;
    background : var(--white);
    padding : 3rem 0 ;
    .general-info{
        display : grid ; 
        grid-template-columns : repeat(auto-fit , minmax(300px , 1fr));
        grid-template-rows : 150px ; 
    }
    .general-info > div:not(:last-child){
        border-right : 1px solid #d1d7dc;
    }
    .general-info > div{
        display : flex ; 
        flex-direction : column ; 
        align-items : center ;
        justify-content: center;
    }
    .general-info .title{
        font-size : 1.3rem ;
    }
    .general-info .amount {
        font-size: 2rem;
    }
    .average-rating .rating{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .average-rating .stars{
        display: flex;
        margin-bottom: .25rem;
        color: #e59819;
    }
    .general-info .container-pourcentage{
        width : 90% ;
        background : #d1d7dc ; 
        height : 10px;
        border-radius : 10px;
        display  :flex ; 
        overflow: hidden;
    }
    .general-info .pourcentage{
        background : var(--black);
    }
    .rating-grouped{
        padding : 2rem;
    }
    .rating-grouped > div{
        width : 100%;
        display : flex;
        padding: 0 1rem;
        gap: 1.5rem;
        align-items: center;
    }
    .container-reviews{
        margin-top : 3rem;
        padding : 2rem;
        display : grid ; 
    }
    .review{
        max-width : 900px;
    }
`
export default ReviewsDetails
