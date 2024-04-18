import React from 'react'
import styled from 'styled-components'
import UserAvatar from './UserAvatar'
import { useState } from 'react'
import { useEffect } from 'react'
import { getStars } from '../utils/getStars'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteReview, triggerUpdateReview } from '../Features/reviews/reviewsSlice'
const Review = ({ _id, rating, comment, updatedAt, user: { name, image }, addButtons }) => {
    const dispatch = useDispatch()
    const stars = getStars(rating)
    const [distance, setDistance] = useState(0);
    const handleUpdate = () => {
        dispatch(triggerUpdateReview(_id))
    }
    const handleDelete = () => {
        dispatch(deleteReview(_id))
    }

    useEffect(() => {
        const date = new Date(updatedAt)
        let period = (Date.now() - date.getTime()) / 1000;
        if (period >= 365 * 24 * 60 * 60) {
            period = `${parseInt(period / (365 * 24 * 60 * 60))} year${parseInt(period / 365 * 24 * 60 * 60) > 1 ? 's' : ''} ago`
        }
        else if (period >= 30 * 24 * 60 * 60) {
            period = `${parseInt(period / (30 * 24 * 60 * 60))} month${parseInt(period / 30 * 24 * 60 * 60) > 1 ? 's' : ''} ago`
        }
        else if (period >= 7 * 24 * 60 * 60) {
            period = `${parseInt(period / (7 * 24 * 60 * 60))} week${parseInt(period / 7 * 24 * 60 * 60) > 1 ? 's' : ''} ago`
        }
        else if (period >= 24 * 60 * 60) {
            period = `${parseInt(period / (24 * 60 * 60))} day${parseInt(period / 24 * 60 * 60) > 1 ? 's' : ''} ago`
        }
        else if (period >= 60 * 60) {
            period = `${parseInt(period / (60 * 60))} hour${parseInt(period / 60 * 60) > 1 ? 's' : ''} ago`
        }
        else if (period >= 60) {
            period = `${parseInt(period / 60)} minute${parseInt(period / 60) > 1 ? 's' : ''} ago`
        }
        else {
            period = `${parseInt(period)} second${period > 1 ? 's' : ''} ago`
        }
        setDistance(period)
    }, [updatedAt])



    return (
        <Wrapper className="review">
            <div className="review-header">
                <UserAvatar name={name} />
                <div>
                    <h5 className='name'>{name}</h5>
                    <div className="rating">
                        <div className='stars'>
                            {
                                stars.map(item => item)
                            }
                        </div>
                        <div className="date">
                            {distance}
                        </div>

                    </div>

                </div>
            </div>
            <div className="review-comment">
                {comment}
            </div>
            {
                addButtons && <div className="container-btns-actions">
                    <button className='important' onClick={handleUpdate}>Update</button>
                    <button className='important' onClick={handleDelete}>Delete</button>
                </div>
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-bottom : 1rem;
    padding : 1.5rem ; 
    display : grid;

    .review-header{
        grid-template-rows: 75px;
        display: grid;
        grid-template-columns: 3.5rem auto;
        align-items: center;
        text-align: left;
        gap: 1rem;
    }
    img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--borderRadius);
    object-fit: cover;
  }
  h5 {
    font-size: 1rem;
    margin-bottom: 0;
    font-weight : 500;
  }
  .rating{
    display: flex;
    align-items: center;
    gap: 0.4rem;
    line-height: 1.2;
  }
  .stars {
    font-size : .75rem ;
    display : flex ; 
    color : #ffc107;
  }
  .date{
    color: #454c53;
    font-size: .85rem;
    font-weight : bold;
  }
  .name {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: .25rem;
    }
    .user-img{
        border-radius : 50%;
        overflow: hidden;
        width: 3.5rem;
        height: 3.5rem;
    }
    .img-name{
        width: 3.5rem;
        height: 3.5rem;
    }
    .user-img + div{
        margin-bottom: 1rem;
    }
    .container-btns-actions{
        margin-top : .5rem ; 
        display : flex ; 
        gap : .5rem ;
        text-transform : capitalize ; 
        font-size : .85rem ;
    }
`

export default Review
