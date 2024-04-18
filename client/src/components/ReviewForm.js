import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { createReview, displayError, handleChange, hideError, updateReview } from '../Features/reviews/reviewsSlice'
import { getStars } from '../utils/getStars'
import FormRow from './FormRow'

const ReviewForm = ({ productId }) => {
    const { reviews: { comment, rating, isLoading, isEditing, showError }, user: { user } } = useSelector(store => store)
    const dispatch = useDispatch()
    const [hover, setHover] = useState(0)
    const stars = getStars(rating, hover)
    const OnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!comment || !rating || !user) {
            dispatch(displayError())
            return;
        }
        if (showError) {
            dispatch(hideError())
        }
        if (isEditing) {
            dispatch(updateReview())
            return;
        }
        dispatch(createReview(productId))
    }
    return (
        <Wrapper>
            <form
                onSubmit={handleSubmit}
            >
                <div className='stars'>
                    {stars.map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label
                                key={i}
                                htmlFor={'rating-' + ratingValue}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                                style={{ cursor: 'pointer' }}
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={OnChange}
                                    className='rating-input'
                                    id={'rating-' + ratingValue}
                                />
                                {star}
                            </label>
                        );
                    })}
                </div>
                {
                    showError && !rating && <>
                        <span className="form-alert"> rating should be at least 1</span>
                    </>
                }
                <FormRow
                    type='textarea'
                    name='comment'
                    label='your review'
                    handleChange={OnChange}
                    value={comment}
                    showError={showError}
                />
                <button className="dark-btn" type='submit' disabled={isLoading}>
                    {
                        isEditing ? 'update' : 'submit'
                    }
                </button>
            </form>


        </Wrapper>
    )
}
const Wrapper = styled.div`
    .container-input{
        padding-top : 1.5rem ;
    }
    .dark-btn{
        margin-top: 1.5rem;
    }
    .rating-input{
        display : none;
    }
    .stars{
        font-size : 1.1rem ; 
        color : #ffc107;
        display : flex;
    }
    .form-alert{
        display : block;
    }
`

export default ReviewForm
