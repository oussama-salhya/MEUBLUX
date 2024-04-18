import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import styled from 'styled-components'
const Alert = ({ msg, showError }) => {
    return <Wrapper className={`${showError ? 'alert alert-danger' : 'alert'}`}>
        <div className='icon-alert'>
            <span>
                {showError ? '!' : <AiOutlineCheck />}
            </span>
        </div>
        <span className='msg'>{msg}</span>
    </Wrapper>
}
const Wrapper = styled.div`
    &{
        --bg-icon : var(--green-dark);
        --bg-text : var(--green-light);
        display :flex ; 
        margin-bottom : 1rem ;
        align-items : center ; 
        background : var(--bg-text);
        max-width : var(--fixed-width);
    }
    &.alert-danger{
        --bg-icon : #d73342;
        --bg-text : var(--red-light);
    }
    .icon-alert{
        padding: 1rem ; 
        background : var(--bg-icon) ; 
    }
    .icon-alert span{
        display : flex;
        justify-content : center; 
        align-items : center ; 
        height: 25px;
        width: 25px;
        color : var(--white);
        border : 1px solid var(--white);
        border-radius : 50%;
    }
    .msg{
        text-transform : capitalize ; 
        text-align : center ; 
        font-size : 1rem ; 
        font-weight : bold; 
        display : block ;
        width : 100%;
    }
`

export default Alert
