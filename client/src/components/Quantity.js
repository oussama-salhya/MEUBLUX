import React from 'react'
import styled from 'styled-components'

const Quantity = ({ amount, increase, decrease }) => {
    return (
        <Wrapper className="quantity">
            <button className="decrease-btn" onClick={decrease}>-</button>
            <span className="amount">{amount}</span>
            <button className="increase-btn" onClick={increase}>+</button>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    button{
        width: 35px;
        height: 35px;
        background: #f5f5f5;
        position: relative;
        display: inline-block;
        border-radius: 50%;
        text-align: center; 
        overflow : hidden ;
        z-index : 1;
    }
    button:hover{
        color: white;
    }
    button::after{
        content : '';
        position : absolute;
        top : 0; 
        left : 0; 
        background : black ; 
        width : 100%;
        height : 100%;
        transform: scale(0);
        transform-origin : center;
        transition : .5s ease;
        border-radius : 50%;
        z-index : -1;
    }
    button:hover::after{
         transform: scale(1);
    }
    .amount{
        vertical-align: top;
        padding: 0;
        margin: 0;
        width: 40px;
        border: none;
        display: inline-block;
        text-align: center;
        font-weight: bold;
        outline: none;
        font-size: 20px;
        line-height: 2;
        height: 30px; 
    }
`
export default Quantity
