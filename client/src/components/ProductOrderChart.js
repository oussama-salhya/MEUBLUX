import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import SplineLineChart from './SplineLineChart'

const ProductOrderChart = () => {
    const { singleProductOrders, isLoading } = useSelector(store => store.orders)
    if (isLoading) {
        return <Loading />
    }
    return (
        <div style={{ height: '400px' }}>
            <SplineLineChart
                data={singleProductOrders}
                label={'totalOrders'}
                name='total orders'
                color={'#0088cc'}
            />
        </div>
    )
}

export default ProductOrderChart
