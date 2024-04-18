import React from 'react'
import styled from 'styled-components'
import { HiChevronRight } from 'react-icons/hi'
const HeaderDashboardPage = ({ title, pathList }) => {
    return (
        <Wrapper className='header-dashboard'>
            <h2>{title}</h2>
            <div className="container-path">
                {
                    pathList.map((item, index) => {
                        return <li key={index}>
                            <span>{item}</span>
                            {
                                index < pathList.length - 1 ? <HiChevronRight /> : ''
                            }
                        </li>
                    })
                }
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.header`
    display : flex; 
    align-items : center ; 
    h2{
        font-weight: 700;
        padding-right : 22px;
        float : left;
        margin: 0;
    }
    .container-path{
        align-self: end;
        margin-bottom: 3px;
    }
    li{
        color: #C3C3C3;
        display: inline-block;
        font-weight: 300;
    }
    svg{
        display : inline-block ; 
        vertical-align: middle;
        margin: 0 5px;
        margin-bottom: 2px;
    }
    span{
        font-size: 0.75rem;
        font-weight: 400;
        color: #757677;
        text-transform: uppercase;
    }
`

export default HeaderDashboardPage
