import React from 'react'
import styled from 'styled-components'
import formatPrice from '../utils/formatPrice'
const Price = ({ price }) => {
    const strPrice = formatPrice(price).split('$')
    const [number, decimal] = strPrice[1].split('.')
    return (
        <Wrapper className='price'>
            <span className='dollar'>$</span>
            <span className='number'>{number}</span>
            <sup className='decimal'>.{decimal}</sup>
        </Wrapper>
    )
}
const Wrapper = styled.span`
    font-family : 'Quicksand';
    .dollar{
        font-size: 70%;
        margin-right: 3px;
        font-family: 'Quicksand';
    }
    sup{
        font-size: 60%;
        line-height: 1.5;
        margin-left: 0.1rem;
    }


`

export default Price
