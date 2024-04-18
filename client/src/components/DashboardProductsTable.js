import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardProductTableItem from './DashboardProductTableItem'
const DashboardProductsTable = () => {
  const { products } = useSelector(store => store.products)
  console.log(products);
  return (
    <Wrapper>
      <div className="container-header">
        <div className='content'>
          <h5>product</h5>
          <h5>category</h5>
          <h5>stock</h5>
          <h5>company</h5>
          <h5>rating</h5>
          <span></span>
        </div>
      </div>
      <div className="container-body">
        {
          products.map((item, index) => {
            return <DashboardProductTableItem key={index} {...item} />
          })
        }
      </div>

    </Wrapper>


  )
}
const Wrapper = styled.div`
    border-radius: 7px;
    box-shadow: 0px 0px 37px -36px rgb(0 0 0 / 40%);
    background : white ; 
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x : auto; 
    word-wrap: break-word;
    padding: 25px;
    margin-top : 3rem ; 
    .container-header{
        display: none;
    }
  @media (min-width: 776px) {
    .container-header{
        display: block;    
    }
    .content {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr 1fr auto;
      column-gap: 1rem;
      min-width : 800px ; 
      h5 {
        font-size : 13px;
        font-weight: 600;
      }
    }

    span {
      width: 2rem;
      height: 2rem;
    }
    hr {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  }
`

export default DashboardProductsTable
