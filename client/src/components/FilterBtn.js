import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Price } from "../components"
const FilterBtn = ({ list, inputType, name, value, maxPrice, handleChange, filtersChoosed, isOpen }) => {
    const isFilterChoosed = (itemId, itemName, item) => {
        return filtersChoosed.includes(itemId)
            || filtersChoosed.includes(itemName)
            || filtersChoosed === item
    }
    return (
        <AnimatePresence>
            {
                isOpen &&
                <Wrapper
                    className='container-filter-btns'
                    onClick={(e) => e.stopPropagation()}
                    initial={{ height: 0, transformOrigin: "top", opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        type: "easeInOut",
                        duration: 0.4,
                    }}

                >
                    {
                        list ?
                            (
                                list.map((item, index) => {
                                    const itemId = typeof item === 'object' ? item.id : undefined
                                    const itemName = typeof item === 'object' ? item.name : item
                                    const isItemEnabled = item.enabled || name === 'sort'
                                    return <motion.label
                                        initial={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            delay: 0.2 * (index + 1)
                                        }}
                                        htmlFor={`${name}-${index + 1}`} key={index}
                                        className={`${!isItemEnabled ? 'disabled-label' : ''}`}
                                    >
                                        <span> {itemName}</span>
                                        <div className={`container-input ${inputType === 'radio' ? 'radio-btn' : 'checkbox-btn'}`}>
                                            <input
                                                type={inputType}
                                                name={name || ''}
                                                id={`${name}-${index + 1}`}
                                                onChange={handleChange}
                                                value={itemId || itemName}
                                                checked={isFilterChoosed(itemId, itemName, item)}
                                                disabled={!isItemEnabled}
                                            />
                                            <span className='symbol'></span>
                                        </div>
                                    </motion.label>
                                })
                            )
                            :
                            <div>
                                <input
                                    type={inputType}
                                    value={value}
                                    name={name}
                                    onChange={handleChange}
                                    max={maxPrice}
                                />
                                <span>
                                    {
                                        name === 'price' ? <>Price : <Price price={value} /></> : <>{name}</>
                                    }

                                </span>
                            </div>


                    }

                </Wrapper>
            }

        </AnimatePresence>

    )
}

const Wrapper = styled(motion.div)`
    position: absolute;
    padding: 2rem;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 10;
    border: 1px solid #dfdfdf;
    border-radius: var(--borderRadius);
    background-color: #fff;
    box-shadow: var(--shadow-1);
    label{
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        /* align-items : center; */
        cursor : pointer;
    }
    .disabled-label{
        cursor : default;
    }
    label span{
        text-transform : capitalize
    }
    .disabled-label span{
        opacity : .3;
    }
    .container-input{
        position: relative;
        display: flex;
        align-items: flex-start;
    }
    .disabled-label .container-input{
        opacity : .3
    }
    .checkbox-btn{
        width: 1.5rem;
    }
    .container-input span::after{
        content : "" ;
        display: block;
        width: 1rem;
        height: 1rem;
    }   
    .container-input.radio-btn span::after{
        border-radius: 64px;
    }
    .container-input.checkbox-btn span::after{
        transform: rotate(45deg);
        border: 2px solid currentColor;
        border-left: 0;
        border-top: 0;
        height: 0.65rem;
        width: 0.35rem;
        opacity: 0;
        margin-top: -0.25rem;
        color: #fff;
    }

    label:hover .radio-btn input:not(:checked) + span::after{
        background : #b2b6b9;
        width: .5rem;
        height: .5rem;
    }
    label:hover .checkbox-btn input:not(:checked) + span::after{
        opacity : 1 ; 
        color : #b2b6b9;
    }

    input[type=checkbox] , input[type="radio"]{
        position: absolute;
        left: -0.625rem;
        top: -0.625rem;
        width: 2.75rem;
        height: 2.75rem;
        display: inline-block;
        border: 0;
        opacity: 0;
        padding: 0;
        z-index: 1;
        cursor: pointer;
    }
    .container-input span{
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border: 1px solid #929292;
        flex-shrink: 0;
    }
    .container-input.radio-btn span{
        border-radius: 64px;
    }
    .checkbox-btn span{
        border-radius : 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    label:hover .container-input span{
        border-color : var(--black);
    }
    input:checked ~ span {
        border-color: var(--black);
    }

    input[type=radio]:checked ~ span::after ,
    input[type=checkbox]:checked ~ span  {
        background: var(--black);    
    }
    input[type=checkbox]:checked ~ span::after{
        opacity : 1;
    }
    input[type=range]{
        -webkit-appearance: none;
        width: 100%;
        height: 3px;
        border-radius: 8px;
        background-color: var(--black);
        outline: none;
    }
    input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--white);
    border : 3px solid var(--black);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  input[type=range]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: none;
    border : 3px solid var(--black);
    border-radius: 50%;
    background-color: var(--white);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  input[type=range]::-moz-range-thumb:hover {
    background-color: #333;
  }
  input[type=range]::-moz-range-track {
    height: 3px;
    border-radius: 8px;
    background-color: var(--black);
    border: none;
  }

  input[type=range]::-ms-track {
    height: 12px;
    border-radius: 8px;
    background-color: #f4f4f4;
    border: none;
  }

  input[type=range]::-ms-thumb {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #000;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  input[type=range]::-ms-thumb:hover {
    background-color: #333;
  }

  input[type=range]::-ms-fill-lower {
    background-color: #f4f4f4;
    border-radius: 8px;
  }

  input[type=range]::-ms-fill-upper {
    background-color: #f4f4f4;
    border-radius: 8px;
  }

  input[type=range]:hover {
    opacity: 1;
  }
  input[type=range] + span{
        margin-top: 1rem;
        display: block;
        font-size: 1.1rem;
        font-weight: 300;
  }
  .price{
        font-weight: 700;
  }
    
    
    
    button{
        /* display : block;  */
    }
`

export default FilterBtn
