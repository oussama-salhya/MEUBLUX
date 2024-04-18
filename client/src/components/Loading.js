import React from 'react'
import styled from 'styled-components'

const Loading = () => {
    return (
        <Wrapper>
            <div className="lds-ring">
                {
                    Array.from({ length: 10 }, (_, index) => {
                        if (index === 9) {
                            return <div key={index}></div>
                        }
                        return <div key={index} style={{ animationDelay: `-${(10 - (index + 1)) * 0.05}s` }}></div>
                    })
                }
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 40px;
        height: 40px;
        margin: 8px;
        border: 2px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--black) transparent transparent transparent;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


    
`
export default Loading
