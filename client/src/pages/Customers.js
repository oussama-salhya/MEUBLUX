import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { HeaderDashboardPage, DashboardTable } from '../components'
import { getCustomers } from '../Features/orders/orderSlice'
import getKeysAndValuesList from '../utils/setValuesList'
const Customers = () => {
    const dispatch = useDispatch()
    const { customers, isLoading } = useSelector(store => store.orders)
    const { keysList, valuesList } = getKeysAndValuesList('customer', customers)
    console.log({ keysList, valuesList });
    useEffect(() => {
        dispatch(getCustomers())
    }, [])
    return (
        <Wrapper>
            <HeaderDashboardPage
                title='customers'
                pathList={["dashboard", 'customers']}
            />
            <DashboardTable
                keysList={keysList}
                valuesList={valuesList}
                isLoading={isLoading}
            />

        </Wrapper>
    )
}
const Wrapper = styled.section`
    padding: 40px;
    position: relative;
    vertical-align: top;
    margin-top: 10px;
    @media only screen and (min-width: 768px) {
        margin-left: 300px;
    }
    @media only screen and (max-width: 767px){
        padding: 0 15px 15px;
    }
    
`

export default Customers
