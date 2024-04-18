import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FormRow, Review, ReviewForm } from '../components'
import { cleanReviewForm, getSingleProductReviews } from '../Features/reviews/reviewsSlice'
import { toggleLoginPage } from '../Features/user/userSlice'



const SingleProductReviews = ({ productId, productName }) => {
    const { reviews, numOfReviews, isEditing, showError } = useSelector(store => store.reviews)
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleProductReviews(productId))
        dispatch(cleanReviewForm())
    }, [productId])
    const openLoginForm = (e) => {
        e.stopPropagation()
        dispatch(toggleLoginPage())
    }
    const getReviewFormTitle = () => {
        if (isEditing) {
            return 'edit your review'
        }
        return numOfReviews ? 'add your review' : 'be the first to review ' + productName

    }
    return (
        <Wrapper>
            <div className="reviews">
                <h2 className='title'>Reviews</h2>
                {
                    numOfReviews ? reviews.map((review) => {
                        return <Review key={review._id} {...review} addButtons={review.user._id === user?._id} />

                    }) : <p className="no-reviews">
                        There are no reviews yet.
                    </p>
                }
            </div>
            <div className="add-review">
                <h2 className='title'>
                    {
                        getReviewFormTitle()
                    }
                </h2>
                {
                    !user && showError && <p className="sign-up-p danger">
                        you need to <button className='important' onClick={openLoginForm}> sign up</button> before reviewing the product
                    </p>
                }
                {
                    !user && !showError && <p className='sign-up-p'>
                        <button className='important' onClick={openLoginForm}> Click Here</button> to sign up and then add your review
                    </p>
                }
                <ReviewForm productId={productId} />

            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-top : 2rem ;
    display : grid ; 
    
    .review{
        padding-left : 0 !important;
    }
    .title{
        font-size: 1.875rem;
    }
    .no-reviews , .sign-up-p{
        color: #3a3a3a;
        font-size: 1.25rem;
        font-weight: 300;
        text-transform : capitalize ;
    }
    .danger{
        color : var(--red-dark);
    }
    .important{
        font-weight : bold ;
        color : black ; 
        text-decoration : underline;
        text-transform : capitalize;
    }
    .danger .important{
        color : inherit;
    }

    @media screen and (min-width : 1200px){
        grid-template-columns : 55% 45% ;
        .reviews{
        padding-right : 60px ;
        border-right : 1px solid #ebe9eb;
    }
    .add-review{
        padding-left : 60px;
    }
    }
    @media screen and (max-width : 1200px){
        max-width : 780px;
        margin : 1.5rem auto ; 
    }
`

export default SingleProductReviews
