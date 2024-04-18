import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsThreeDots } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { closeActionsButton, handleChange, openActionsButton } from '../Features/products/ProductsSlice'
import { useNavigate } from 'react-router-dom'
const DashboardProductsActions = ({ id, isLast, actionsList, modelName }) => {
    const { actions } = useSelector(store => store.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeButtons = () => dispatch(closeActionsButton())
    const toggleActions = (e) => {
        e.stopPropagation()
        if (actions.isOpen && actions.id === id) {
            dispatch(closeActionsButton())
        }
        else {
            dispatch(openActionsButton(id))
        }
    }
    const handleClick = (label, fct) => {
        if (modelName === 'product') {
            if (label === 'update') {
                console.log('navigating...');
                dispatch(handleChange({ name: 'isEditing', value: true }))
                navigate('/dashboard/add-product')
            }
            if (label === 'see details') {
                navigate('/dashboard/products/' + id)
            }
            closeButtons()
        }
        dispatch(fct(id))
    }

    useEffect(() => {
        document.addEventListener('click', closeButtons);
        return () => document.removeEventListener('click', closeButtons);
    });
    return (
        <Wrapper className="text-end">
            <div className="d-flex">
                <div className={`${isLast ? 'dropdown dropdown-last' : 'dropdown'}`}>
                    <button className="btn actions" onClick={toggleActions}>
                        <BsThreeDots />
                    </button>
                    <div className={`${actions.isOpen && actions.id === id ? "dropdown-menu show" : "dropdown-menu"}`} style={{ margin: "0px" }}>
                        {
                            actionsList.map((item, index) => {
                                const { label, onClick } = item;
                                return <button
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleClick(label, onClick)}
                                >
                                    {label}
                                </button>
                            })
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.td`
    .d-flex{
        display : flex ; 
        justify-content: end;
    }
    .dropdown {
        position: relative;
    }
    .btn{
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.675rem 1.25rem;
        border-radius : .35rem;
        box-shadow : none;
        color : var(--black);
        transition : .3s ease;
    }
    .btn:hover , .btn:focus {
        box-shadow : var(--shadow-1) ; 
        border-color : black ; 
    }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 1000;
        /* display: none; */
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 0.5rem;
        visibility: hidden;
        opacity: 0;
        height: 0;
        min-width: 13rem;
        transition: margin-top .2s,opacity .2s;
        border: none;
        box-shadow: 0 0 50px 0 rgba(82,63,105,.15)!important;
    }
    .dropdown-menu.show {
        margin-top: 0;
        visibility: visible;
        opacity: 1;
        height: auto;
        display: block;
        inset: 0px auto auto 0px;
        transform: translate(-152px, 45px);
    }
    .dropdown-last .dropdown-menu.show{
        top : -100% !important;
        transform: translate(-152px, -77%) !important;
    }
    .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.25rem 1rem;
        clear: both;
        font-weight: 400;
        color: #212529;
        text-align: inherit;
        text-decoration: none;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        padding: 8px 25px;
    }
    
    
`
export default DashboardProductsActions
