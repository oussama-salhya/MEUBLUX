import React from 'react'
import styled from 'styled-components'
import formatPrice from '../utils/formatPrice'
const ProductAvatar = ({ image, name, price }) => {
  return (
    <Wrapper className='product-avatar'>
      <img src={image} alt={name} />
      <div>
        <h5 className='name'>{name}</h5>
        <h5 className='price-small'>{formatPrice(price)}</h5>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    grid-template-rows: 60px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
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
  .price-small {
    font-size : .75rem ;
  }
  .name {
      font-size: 0.85rem;
      font-weight: bold;
    }
  @media (min-width: 776px) {
        height: 100%;
        display: grid;
        align-items: center;
        gap: 1rem;
        text-align: left;
  }
`

export default ProductAvatar
