import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { DonutChart, DashboardCard, DashboardTable, HeaderDashboardPage, SplineLineChart, Loading, FormRow } from '../components'
import { getDashboardInfo, getStats } from '../Features/orders/orderSlice'
import { getListIntro, getTopProducts } from '../utils/setupDasahboard'
const DashboardHome = () => {
    const { dashboardInfo, isLoading } = useSelector(store => store.orders)
    const dispatch = useDispatch()
    const topProductsList = getTopProducts(dashboardInfo.topProducts || [])
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7))
    const listIntro = getListIntro(dashboardInfo, date)
    const handleChange = (e) => {
        console.log(e.target.value);
        setDate(e.target.value)
    }
    useEffect(() => {
        dispatch(getDashboardInfo())
    }, [])
    useEffect(() => {
        dispatch(getStats(date))
    }, [date])
    if (isLoading) {
        return <Loading />
    }


    return (
        <Wrapper>
            <HeaderDashboardPage
                title='dashboard'
                pathList={['dashboard']}
            />
            <div className="container-intro">
                {
                    listIntro.map((item, index) => {
                        return <DashboardCard
                            key={index}
                            {...item}
                        />
                    })
                }
            </div>
            <div className="container-stats">
                <div className="row">
                    <div className="top-products">
                        <div className="card">
                            <h3 className="card-title">Top {topProductsList.length} selling products </h3>
                            <DashboardTable
                                keysList={['product', 'amount']}
                                valuesList={topProductsList}
                            />
                        </div>
                    </div>
                    <div className="orders-by-date">
                        <div className="card">
                            <div className="title-date">
                                <h3 className="card-title">Revenue</h3>
                                <div>
                                    <input
                                        type="month"
                                        onChange={handleChange}
                                        value={date}
                                    />
                                </div>
                            </div>


                            <div className="container-line-chart">
                                <SplineLineChart
                                    data={dashboardInfo.totalOrdersByDate || []}
                                    label='totalPrice'
                                    color={'#0088cc'}
                                    name="turn over"
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="customers-by-location">
                        <div className="card">
                            <h3 className="card-title">Customers By Location</h3>
                            <div className="container-pie-chart">
                                <DonutChart
                                    data={dashboardInfo.avgCustomersByCity || []}
                                    labelField='city'
                                    serieField='avg'
                                />
                            </div>

                        </div>
                    </div>
                    <div className="orders-by-date">
                        <div className="card">
                            <h3 className="card-title">Sales</h3>
                            <div className="container-line-chart">
                                <SplineLineChart
                                    data={dashboardInfo.totalOrdersByDate || []}
                                    label='totalOrders'
                                    color={'#2baab1'}
                                    name='amount'
                                />
                            </div>

                        </div>
                    </div>

                </div>


            </div>



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
    .header-dashboard{
        margin-bottom : 3rem;
    }
    .container-intro{
        display :grid ; 
        gap : 1rem;
        grid-template-columns : repeat(auto-fit , minmax(350px, 1fr));
    }
    .container-stats .row{
        display : grid ; 
        flex-wrap : wrap ;
        gap : 1rem ; 
        margin-top : 1rem;
    }
    .top-products{

    }
    .card{
        padding: 25px 1rem;
        border-radius: var(--borderRadius);
        box-shadow: var(--shadow-1);
        background : var(--white) ;
    }
    .card-title{
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.2;
        margin: 0;
    }
    .container-table{
        box-shadow : none !important ; 
        border-radius: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    .container-pie-chart{
        margin-top : 2rem;
    }
    .orders-by-date{
        height : 500px;
    }
    .orders-by-date .card{
        height : 100%;
    }
    .container-line-chart{
        padding : 3rem;
        height : 100%;
    }
    .title-date{
        display : flex;
        justify-content : space-between;
    }
    @media screen and (min-width : 1300px){
        .container-stats .row{
            grid-template-columns : 1.25fr 2fr ;
            grid-template-rows : 100%;
        }
        .orders-by-date{
            height : calc(100% - .7rem);
        }
    }
`

export default DashboardHome
