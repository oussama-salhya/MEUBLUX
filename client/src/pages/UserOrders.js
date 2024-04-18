import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DashboardTable, Price, ProductAvatar } from '../components'
import { getAllOrders } from '../Features/orders/orderSlice'

const UserOrders = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector(store => store.orders)
    const getKeysAndValuesList = () => {
        const keysList = ['item', 'quantity', 'subtotal', 'date']
        const valuesList = orders.map(({ orderItems, createdAt }) => {
            return orderItems.map(({ image, name, price, amount }) => {
                const date = new Date(createdAt)
                return {
                    item: <ProductAvatar image={image} name={name} price={price} />,
                    quantity: amount,
                    subtotal: <Price price={amount * price} />,
                    date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                }
            })
        }).reduce((res, orderItems) => {
            res = [...res, ...orderItems]
            return res
        }, [])

        return { keysList, valuesList }
    }
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])
    const { keysList, valuesList } = getKeysAndValuesList()
    return (
        <Wrapper>
            <DashboardTable
                keysList={keysList}
                valuesList={valuesList}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin : 3rem 5vw ; 
    margin-bottom : 5rem ; 
    tr th, tr td{
        text-align : center !important; 
    }
    
    @media screen and (min-width :900px){
        .product-avatar {
            width : 150px;
        }
    }
    @media screen and (min-width :1200px){
        .product-avatar {
            width : 100px;
        }
    }
    @media screen and (min-width : 1500px){
        .product-avatar {
            width : 0px;
        }
    }

`

export default UserOrders
