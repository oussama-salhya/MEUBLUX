import React from 'react'
import styled from 'styled-components'
import { GrCart } from 'react-icons/gr'
const DashboardCard = ({ title, value, description, icon }) => {
    return (
        <Wrapper className='dashboard-card'>
            <div className="info">
                <h4 className='title'>{title}</h4>
                <span className="number">{value}</span>
                <span className='sub-description'>{description}</span>
            </div>
            <div className="icon">
                {icon}
            </div>

        </Wrapper>
    )
}
const Wrapper = styled.div`
    padding: 1.5rem;
    display: flex;
    background-color: var(--white);
    border-radius: .5rem;
    display : flex ; 
    justify-content : space-between ;
    align-items: center;
    box-shadow : var(--shadow-1);
    /* min-width : 300px; */

    .info{
        display : grid ; 
        gap : 1rem ;
    }
    .info > *{
        margin : 0;
    }
    .title{
        /* margin-bottom : 1rem; */
        font-size: calc(1.25625rem + .075vw);
        font-weight : 600;
        text-transform : capitalize ;
        /* line-height: revert; */
    }
    .number{
        font-size: calc(1.325rem + .9vw);
        font-weight: 600;
        line-height: 1.2;
    }
    .sub-description{
        color: #05b171!important;
    }
    .icon {
        font-size: 2.1rem;
        font-weight: 400;
        line-height: 1.2;
        padding: 1.1rem;
        background: #0088cc;
        border-radius: 500%;
        color: var(--white);
    }
    .icon * {
        stroke : var(--white);
    }

`

export default DashboardCard
