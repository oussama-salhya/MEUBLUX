import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error = () => {
    return (
        <Wrapper className='Error container'>
            <h1>
                Oops! That page can’t be found.
            </h1>
            <div className='error-description'>It looks like nothing was found at this location. Maybe try a search?</div>
            <Link to='/' className='btn dark-btn'>Back to home</Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display : flex ; 
    justify-content : center ; 
    align-items : center ; 
    min-height : 80vh;
    flex-direction:column ; 
    max-width : 60ch;
    text-align : center;
    h1{
        font-weight : 700 ;
    }
    .error-description{
        font-size : 1.375rem ; 
        font-weight : 300;
        margin-bottom : 1.38rem;
    }
    @media screen and (max-width: 760px){
        h1{
            font-size : 2rem;
        }
    }

`

export default Error
