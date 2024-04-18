import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Filters, Loading, Product, ProductInfo, ProductsHeaderPage } from '../components'
import { clearFilters, getAllProducts, getFilteredProducts, hideLoading, incrementPage, showLoading, toggleFilter } from '../Features/products/ProductsSlice'
import filtersList from '../utils/FiltersListByModel'
import { motion } from 'framer-motion'
const Products = () => {
  const dispatch = useDispatch()
  const { search, products, isLoading, categories, companies, sort, page, price, numOfPages } = useSelector(store => store.products)
  const productsState = useSelector(store => store.products)
  const productsFiltersList = filtersList.getListFiltersProducts(productsState)
  const [QuickLook, setQuickLook] = useState({ id: '', isOpen: false })
  const { showModal } = useSelector(store => store.cart)
  const ref = useRef(null)
  const productsRef = useRef(null)
  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value
    dispatch(toggleFilter({ name, value }))
    // dispatch(getFilteredProducts())
  }
  const resetFilters = () => {
    dispatch(clearFilters())
  }
  useEffect(() => {
    if (!products.length && !isLoading) {
      dispatch(getAllProducts());
    }
  }, []);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true
      return
    }
    if (isLoading) {
      dispatch(hideLoading())
      return
    }
    dispatch(getFilteredProducts())
  }, [categories, companies, sort, page, price])



  useEffect(() => {
    if (showModal) {
      setQuickLook({ id: '', isOpen: false })
    }
  }, [showModal])
  useEffect(() => {
    let debounce
    const handleScroll = () => {
      let timeoutId;
      debounce = () => {
        if (!isLoading && productsRef.current) {
          clearTimeout(timeoutId)
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const bodyHeight = document.body.scrollHeight - document.querySelector('footer').clientHeight
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
    <>
      <ProductsHeaderPage />
      <Wrapper className='container'>
        <Filters
          filtersList={productsFiltersList}
          handleChange={handleChange}
          resetFilters={resetFilters}
        />
        <div className="products-container" ref={productsRef}>
          {
            products.map((product) => {
              return <Product {...product} key={product.id} setQuickLook={setQuickLook} />
            })
          }
          {
            QuickLook.isOpen && !isLoading && <QuickLookComponent setQuickLook={setQuickLook} />
          }

        </div>
        {
          isLoading && <div className="loading">
            <Loading />
          </div>
        }
      </Wrapper>
    </>

  )
}
const QuickLookComponent = ({ setQuickLook }) => {
  return <motion.div
    className={`quick-look-product`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, type: "tween", delay: 0.5 }}
    onClick={() => setQuickLook({ isOpen: false, id: '' })}
  >
    <div
      className="wrapper-content"
      onClick={(e) => e.stopPropagation()}
    >
      <ProductInfo />
      <div className="close-button-wrapper">
        <button className="close-button" onClick={() => setQuickLook({ isOpen: false, id: '' })}>
          <span className="close-icon_top"></span>
          <span className="close-icon_bottom"></span>
        </button>
      </div>
    </div>

  </motion.div>
}

const Wrapper = styled.section`
    margin-top:2rem ; 
    position :relative ;
    .loading{
        text-align : center;
        padding: 7rem;
    }
  .products-container {
    display: grid;
    gap: 2rem;
    padding-bottom : 4rem ;
  }
  .quick-look-product{
   background: rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }
  .wrapper-content {
    background-color: #fff;
    width: 300px;
    height: auto;
    position: relative;
    max-height: 80vh;
    overflow: hidden;
    /* transition: opacity 0.5s ease-in-out; */
    box-shadow: 5px 5px 130px 5px rgb(0 0 0 / 20%);
}
.wrapper-content .details::-webkit-scrollbar{
        width: 2px;
    }
  .close-button-wrapper {
    overflow: hidden;
    z-index: 4;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    background-color: transparent;
    cursor: pointer;
    transition: border-color 1s ease-in-out, background-color 1s ease-in-out;
    transition-delay: 0.7s;
}
.product-info .details{
  padding : 2.5rem;
  margin-top : 0;
}
  .close-button {
    z-index: 4;
    position: absolute;
    top: calc(50% - 10px);
    right: calc(50% - 10px);
    left: auto;
    overflow: visible;
    visibility: visible;
    display: block;
      width: 1.3rem;
    height: 1.3rem;
}
  .close-button > span{
        position: absolute;
        top: 50%;
        left: 0%;
        background: black;
        width: 100%;
        height: 0.16rem;
        margin-top: -0.09375rem;
        height: 0.14rem;
  }
  .close-button > span:first-child{
      transform: rotate(-45deg);
  }
  .close-button > span:last-child{
      transform: rotate(45deg);
  }

   @media screen and (min-width : 600px){
      .products-container{
          grid-template-columns : repeat(2 , 1fr); 
          justify-content : space-between;
      }
      
  }
  @media screen and (min-width : 1000px){
      .products-container{
          grid-template-columns : repeat(3 , 1fr); 
          justify-content : space-between;
      }
      
  }
  @media screen and (min-width : 1400px){
    .products-container{
      grid-template-columns : repeat(4 , 1fr);
      gap : 3rem;
      
    }
    
  }
  @media (min-width: 375px){
    .wrapper-content {
        width: calc(92.5925925926vw - 47.2222222222px);
    }
  }
  @media (min-width: 1023px){
    .wrapper-content {
        width: 900px;
    }
  }
  @media (min-width: 1280px){
    .wrapper-content {
        width: calc(31.25vw + 500px);
    }
  }
  @media screen and (max-width: 768px){
      .close-button-wrapper {
        width: 35px;
        height: 35px;
        position: fixed;
    }
      .close-button {
        width: 1.3rem;
        height: 1.3rem;
    }
    .wrapper-content{
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100%;
        max-height: 100%;
        width: 100%;
    }
    .wrapper-content::-webkit-scrollbar{
        width: 0px;
    }
  }
  @media screen and (min-width : 768px){
    .product-info .details{
      overflow-y: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      height: auto;
      max-height: 80vh;
      width: 50%;
      padding: 3.5rem;
      padding-top : 4.5rem ;
    }
  }


`

export default Products
