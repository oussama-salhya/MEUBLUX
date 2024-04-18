import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCategories, getTotalOrdersByCategory } from '../Features/categories/categoriesSlice'
import HeaderDashboardPage from '../components/HeaderDashboardPage'
import DashboardTable from '../components/DashboardTable'
import DashboardProductsActions from '../components/ActionsButtons'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import getKeysAndValuesList from '../utils/setValuesList'
import CategoryForm from '../components/CategoryForm'
import { SplineLineChart } from '../components'
import ApexCharts from 'react-apexcharts'
const Categories = () => {
    const dispatch = useDispatch()
    const { isLoading, categories, name, ordersByCategories } = useSelector(store => store.categories)
    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getTotalOrdersByCategory())
    }, [])
    const { keysList, valuesList } = getKeysAndValuesList('category', categories)
    return (
        <Wrapper>
            <HeaderDashboardPage title='categories' pathList={['dashboard', 'categories']} />
            <div className="row-container">
                <DashboardTable keysList={keysList} valuesList={valuesList} isLoading={isLoading} ></DashboardTable>
                <CategoryForm />
            </div>
            <div className='categories-chart'>
                <SplineLineChart
                    data={ordersByCategories}
                    type={'bar'}
                    color={'black'}
                    name={'orders'}
                    label={'Sales'} />


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
    /* .container-table{
        width : 500px ; 
    } */
    table{
        width : 400px;
    }
    .row-container{
        display : grid ; 
        justify-content: center;
        grid-template-columns: 500px;
    }
    .categories-chart{
        margin-top : 40px; 
        height : 400px;
        max-width : 800px;
    }
    @media screen and (min-width: 1200px) {
        .row-container{
           grid-template-columns : 1fr 1fr ;
           gap : 2rem; 
           justify-content: flex-start ;
        }
        
    }
`

export default Categories
