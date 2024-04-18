import React, { useEffect } from 'react'
// import { BsFillCheckCircleFill } from 'react-icons/bs'
import styled from 'styled-components'
import { VscClose } from 'react-icons/vsc'
import { AiOutlineCheck } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { hideMsg as hideProductsMsg, clearMsgContent as clearProductsMsgContent, hideError as hideProductsError } from '../Features/products/ProductsSlice'
import { hideMsg as hideCategoriesMsg, clearMsgContent as claerCategoriesMsgContent, hideError as hideCategoriesError } from '../Features/categories/categoriesSlice'
import { hideError as hideUserError, hideMsg as hideUserMsg } from '../Features/user/userSlice'

const Toast = () => {
    const {
        products: { showError: showProductsError, showMsg: showProductsMsg, msg: productsMsg },
        categories: { showError: showCategoriesError, showMsg: showCategoriesMsg, msg: categoriesMsg },
        user: { showError: showUserError, showMsg: showUserMsg, msg: UserMsg }
    } = useSelector(store => store)
    const dispatch = useDispatch()
    const verifyIsToastOpen = () => {
        return showProductsMsg || showCategoriesMsg || showUserMsg
    }
    const getToastMsg = () => {
        if (productsMsg) {
            return productsMsg
        }
        if (categoriesMsg) {
            return categoriesMsg
        }
        if (UserMsg) {
            return UserMsg
        }
    }
    const getToastStatus = () => {
        if (showCategoriesError || showProductsError || showUserError) {
            return 'warning'
        }
        return 'success'
    }
    const closeToast = () => {
        if (showProductsMsg) {
            dispatch(hideProductsMsg())
        }
        if (showCategoriesMsg) {
            dispatch(hideCategoriesMsg())
        }
        if (showUserMsg) {
            dispatch(hideUserMsg())
        }
    }
    useEffect(() => {
        let timer;
        if (showProductsMsg) {
            timer = setTimeout(() => {
                dispatch(hideProductsMsg())
            }, 4400)
        }
        if (showCategoriesMsg) {
            timer = setTimeout(() => {
                dispatch(hideCategoriesMsg())
            }, 4400)
        }
        if (showUserMsg) {
            timer = setTimeout(() => {
                dispatch(hideUserMsg())
            }, 4400)
        }
        return () => clearTimeout(timer)
    }, [showProductsMsg, showCategoriesMsg, showUserMsg])
    useEffect(() => {
        let timer;
        if (productsMsg && !showProductsMsg) {
            timer = setTimeout(() => {
                dispatch(clearProductsMsgContent())
                if (showProductsError) {
                    dispatch(hideProductsError())
                }
            }, 500)
        }
        if (categoriesMsg && !showCategoriesMsg) {
            timer = setTimeout(() => {
                dispatch(claerCategoriesMsgContent())
                if (showCategoriesError) {
                    dispatch(hideCategoriesError())
                }
            }, 500)
        }
        if (UserMsg && !showUserMsg) {
            timer = setTimeout(() => {
                dispatch(hideUserMsg(true))
                if (showUserError) {
                    dispatch(hideUserError())
                }
            }, 500)
        }
        return () => clearTimeout(timer)
    }, [showProductsMsg, showCategoriesMsg, showUserMsg])
    return (
        <Wrapper className={`${verifyIsToastOpen() ? 'toast open' : 'toast'} ${getToastStatus()}`}>
            <div className="toast-content">
                <div className={`check`}>
                    {
                        getToastStatus() === 'success' ? <AiOutlineCheck /> : '!'
                    }
                </div>
                <div className="message">
                    <span className="text text-1">{getToastStatus()}</span>
                    <span className="text text-2">{getToastMsg()}</span>
                </div>
            </div>
            <div className="close" onClick={closeToast}>
                <VscClose />
            </div>
            <div className={`${verifyIsToastOpen() ? "progress active" : "progress"}`}></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    top: 80px;
    right: 30px;
    border-radius: .5rem;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    border-left: 6px solid var(--alert-color);
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 10000;
    max-width : 350px;
    &.success{
        --alert-color : var(--green-dark);
    }
    &.warning{
        --alert-color : #d73342;
    }
    &.open{
        transform: translateX(0%);
    }
    .toast-content{
        display: grid;
        grid-template-columns : 35px 1fr;
        align-items: center;
    }
    .toast-content .check{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        width: 35px;
        background-color: var(--alert-color);
        color: #fff;
        font-size: 20px;
        border-radius: 50%;
    }
    .toast-content .message{
        display: flex;
        flex-direction: column;
        margin: 0 20px;
    }
    .message .text{
        font-size: 1rem;
        font-weight: 600;
        color: var(--black);
        text-transform : capitalize ; 
    }
    .message .text.text-1{
        font-weight: 700;
        color: var(--alert-color);
    }

    .close{
        position: absolute;
        top: 10px;
        right: 15px;
        padding: 5px;
        cursor: pointer;
        opacity: 0.7;
    }

    .close:hover{
        opacity: 1;
    }

    .progress{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: #ddd;
    }

    .progress:before{
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        height: 100%;
        background-color: var(--alert-color);
    }

    .progress.active:before{
        width: 100%;
        animation: progress 4s linear forwards;
    }

    @keyframes progress {
        100%{
            right: 100%;
        }
    }


`

export default Toast
