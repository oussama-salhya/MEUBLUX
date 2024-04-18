import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, toggleFilter, getFilteredProducts, clearFilters, hideLoading, incrementPage } from '../Features/products/ProductsSlice'
import styled from 'styled-components'
import getKeysAndValuesList from '../utils/setValuesList'
import { Filters, HeaderDashboardPage, DashboardTable, SearchBar } from '../components'
import filtersList from '../utils/FiltersListByModel'
import { useRef } from 'react'
const DashboardProducts = () => {
    const { products, isLoading, categories, companies, sort, price, page } = useSelector(store => store.products);
    const dispatch = useDispatch();
    const { keysList, valuesList } = getKeysAndValuesList('product', products)
    const productsFiltersList = filtersList.getListFiltersProducts(useSelector(store => store.products))
    const ref = useRef(null)
    const productsRef = useRef(null)
    const handleChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value
        dispatch(toggleFilter({ name, value }))
    }
    const resetFilters = () => {
        dispatch(clearFilters())
    }
    useEffect(() => {
        if (!products.length) {
            dispatch(getAllProducts())
        }
    }, [])
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
            return;
        }
        if (isLoading) {
            dispatch(hideLoading())
            return;
        }
        dispatch(getFilteredProducts())
    }, [companies, categories, sort, dispatch, price, page])
    useEffect(() => {
        let debounce
        const handleScroll = () => {
            let timeoutId;
            debounce = () => {
                if (!isLoading) {
                    clearTimeout(timeoutId)
                    const scrollY = window.scrollY
                    const windowHeight = window.innerHeight
                    const bodyHeight = document.body.scrollHeight
                    if (scrollY + windowHeight >= bodyHeight - 2) {
                        timeoutId = setTimeout(() => {
                            dispatch(incrementPage())
                        }, 300)
                    }
                }
            }
            return debounce

        }
        const timer = window.addEventListener('scroll', handleScroll())
        return () => window.removeEventListener('scroll', debounce)
    }, [page])


    return (
        <Wrapper>
            <HeaderDashboardPage title='products' pathList={["dashboard", "products"]} />
            <SearchBar linkToNavigate='/dashboard/products' />
            <Filters filtersList={productsFiltersList} handleChange={handleChange} resetFilters={resetFilters} />
            <DashboardTable keysList={keysList} valuesList={valuesList} isLoading={isLoading} />


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
    .filters-list{
        margin-top: 40px;
        padding: 0;
        border-bottom : none !important;
    }
    .container-table{
        margin-top : 1rem !important ; 
    }
    .search-bar{
        margin : 0 auto ; 
        margin-top : 3rem ; 
    }
    .search-bar .form-input{
        height: 50px;
    }
    .search-bar .btn-submit{
        height : 50px !important ; 
        font-size: 25px;
    }
    .dashboard-table{
        margin-top : 1rem !important;
    }

`

export default DashboardProducts
