import React from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import formatPrice from '../utils/formatPrice'
import ActionsButtons from './ActionsButtons'
import { useState } from 'react'
const DashboardProductTableItem = ({ name, price, image, company, averageRating, stock, category, id }) => {
  return (
    <Wrapper>
      <div className='title'>
        <img src={image} alt={name} />
        <div>
          <h5 className='name'>{name}</h5>
          <h5 className='price-small'>{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className='category'>{category.name}</h5>
      <h5 className="stock">{stock}</h5>
      <h5 className='company'>{company}</h5>
      <h5 className="reviews">{averageRating}</h5>
      <ActionsButtons id={id} />

    </Wrapper>
  )
}


const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
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
  .actions{
    position : relative
  }
  .price-small {
    color: var(--clr-primary-5);
    font-size : .75rem ;
  }
  .remove-btn {
    color: var(--white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  .container-actions{
    display : flex ; 
  }
  @media (min-width: 776px) {
    .company {
      display: block;
      margin-bottom: 0;
      font-size: 1rem;
    }

    .category {
      display: block;
      font-size: 1rem;
    }
    .name {
      font-size: 0.85rem;
      font-weight: bold;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 316px 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`

export default DashboardProductTableItem
