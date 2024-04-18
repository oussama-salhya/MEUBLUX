import React from 'react'
import styled from 'styled-components'

const DashboardTable = ({ keysList, valuesList, isLoading }) => {
    if (valuesList.length === 0) {
        return <Wrapper >
            <h2 style={{ textAlign: 'center' }}>No results for this search</h2>
        </Wrapper>
    }
    return (
        <Wrapper className='container-table'>
            <table className="table" id="products">
                <thead>
                    <tr>
                        {
                            keysList.map((item, index) => {
                                return <th key={index} className={`${item === 'action' ? 'text-end' : ""}`}>{item} </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        valuesList.map((item, index) => {
                            return <tr key={index}>
                                {
                                    keysList.map((key, index) => {
                                        if (key === 'image') {
                                            return <td key={index}>
                                                <div>
                                                    <img src={item[key]} alt="" />
                                                </div>
                                            </td>
                                        }
                                        if (key === 'action') {
                                            return <React.Fragment key={index}>{item[key]}</React.Fragment>;
                                        }
                                        if (key === 'rating') {
                                            return <td key={index}>{item[key].toFixed(2)}</td>
                                        }

                                        return <td key={index}>{item[key]}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>


        </Wrapper>
    )
}

const Wrapper = styled.div`
    overflow-x : auto;
    overflow-y:hidden ;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-1);
    background : var(--white) ;
    padding: 25px;
    margin-top : 3rem ; 
    position : relative;


    ::-webkit-scrollbar {
        width: 6px;
        height: 0px;
        background-color: var(--white);
    }
    .table{
        margin: 0 !important;
        width: 100% !important;
        border-spacing: 0 1rem;
        border-collapse: separate;
    }
    table thead th{
        padding-right: 21px !important;
        box-sizing: content-box;

    }
    th , td {
        padding: 0.5rem 0.5rem;
        text-transform : capitalize ; 
    }
    img{
        width : 100px;
    }
    thead th{
        text-align: left;
        font-size : 1rem ;
        letter-spacing: 1px;
        font-weight: 600;
    }
    tbody tr td {
        border-top: 1px solid rgba(0,0,0,.125);
        border-bottom: 1px solid rgba(0,0,0,.125);
    }

    tbody tr td:first-child {
        border-left: 1px solid rgba(0,0,0,.125);
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        padding-left: 1rem;
    }
    tbody tr td:last-child {
        border-right: 1px solid rgba(0,0,0,.125);
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding-right: 1rem;
    }
    .text-end {
        text-align: right!important;
    }
`

export default DashboardTable
