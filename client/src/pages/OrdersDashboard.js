import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Filters } from '../components'
import DashboardTable from '../components/DashboardTable'
import HeaderDashboardPage from '../components/HeaderDashboardPage'
import { clearFilters, getAllOrders, getFilteredOrders, toggleFilter } from '../Features/orders/orderSlice'
import filtersList from '../utils/FiltersListByModel'
import getKeysAndValuesList from '../utils/setValuesList'

const OrdersDashboard = () => {
    const dispatch = useDispatch()
    const { isLoading, orders } = useSelector(store => store.orders)
    const { keysList, valuesList } = getKeysAndValuesList('order', orders)
    const handleChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value
        dispatch(toggleFilter({ name, value }))
        dispatch(getFilteredOrders())
    }
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])
    const resetFilters = () => {
        dispatch(clearFilters())
        dispatch(getFilteredOrders())
    }

    return (
        <Wrapper>
            <HeaderDashboardPage title='orders' pathList={["dashboard", "orders"]} />
            <div className="container-filters">
                <Filters
                    handleChange={handleChange}
                    filtersList={filtersList.getListFiltersOrders(useSelector(store => store.orders))}
                    resetFilters={resetFilters}
                />
            </div>
            <DashboardTable isLoading={isLoading} keysList={keysList} valuesList={valuesList} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 40px;
    position: relative;
    vertical-align: top;
    .container-filters{
        margin-top : 3rem ; 
    }
    @media only screen and (min-width: 768px) {
        margin-left: 300px;
    }
    @media only screen and (max-width: 767px){
        padding: 0 15px 15px;
    }
    .price {
    font-size: 1.3rem;
    line-height: 1.1;
}
`

export default OrdersDashboard
