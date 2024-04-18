import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { closeFilterMenu, openFilterMenu } from '../Features/products/ProductsSlice'
import FilterBtn from './FilterBtn'
import { HiChevronDown } from 'react-icons/hi'
import { GoSettings } from 'react-icons/go'
import Price from './Price'
const Filters = ({ filtersList, handleChange, resetFilters }) => {
    const { filtersMenu: { isOpen, id } } = useSelector(store => store.products)
    const dispatch = useDispatch()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleListFilter = (listId) => {
        if (isOpen && listId == id) {
            return dispatch(closeFilterMenu())
        }
        else {
            return dispatch(openFilterMenu(listId))
        }
    }
    const closeMenu = () => {
        if (isOpen) dispatch(closeFilterMenu())
    }
    useEffect(() => {
        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    });
    return (
        <Wrapper className='filters-list'>
            <div
                className={`${isSidebarOpen ? "row-list fixed-list open" : "row-list fixed-list"}`}
                onClick={() => setIsSidebarOpen(false)}
            >
                <div
                    className="wrapper-fixed-list"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h5>filters</h5>
                    {
                        filtersList.map((item, index) => {
                            const isOpen = item.listId == id
                            const isSelected = item.name !== 'sort' && (item.filtersChoosed?.length ||
                                (item.inputType === 'range' && item.value < item.maxPrice)
                                || (item.name !== 'price' && item.value));
                            let filtersChoosed = '';
                            if (item.filtersChoosed) {
                                if (Array.isArray(item.filtersChoosed)) {
                                    filtersChoosed = item.filtersChoosed.join(',')
                                }
                                else {
                                    filtersChoosed = item.filtersChoosed
                                }
                            }
                            if (item.value) {
                                if (item.name === 'price') {
                                    filtersChoosed = <Price price={item.value} ></Price>
                                }
                                else {
                                    filtersChoosed = item.value
                                }

                            }
                            if (item.list?.length <= 1) {
                                return <React.Fragment key={index}></React.Fragment>
                            }
                            return <div className="container-filter" key={index}>
                                <button
                                    className={`${isOpen ? 'btn btn-active' : 'btn'}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleListFilter(item.listId)
                                    }}

                                >
                                    <span className={`${isSelected ? 'selected' : ''}`}>
                                        {item.name}
                                    </span>
                                    <span>
                                        <HiChevronDown />
                                    </span>

                                </button>
                                {
                                    filtersChoosed && <div className="filters-choosed">
                                        {
                                            filtersChoosed
                                        }
                                    </div>
                                }

                                <FilterBtn {...item} handleChange={handleChange} isOpen={isOpen} />
                            </div>
                        })
                    }
                    <button className='btn btn-clear-filters' onClick={resetFilters}>reset filters</button>
                </div>
            </div>
            <div>
                <button
                    className='btn btn-show-fixed-list'
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <GoSettings />
                    show filters
                </button>
            </div>




        </Wrapper>
    )
}
const Wrapper = styled.div`
    margin-bottom : 1rem ; 
    padding : 1rem 0;
    .row-list{
        display: flex ;
    }
    .row-list .wrapper-fixed-list{
        display: flex ;
    }
    .btn{
        color: var(--black); 
        font-weight : bold ;
        background : transparent ; 
        box-shadow : none;
        display : flex ; 
        justify-content : space-between ; 
        align-items: center;
        gap : .2rem;
    }
    .btn span{
        position : relative ; 
    }
    .btn-active svg{
        transform : rotate(180deg);
    }
    .btn-show-fixed-list{
        display : none ; 
    }
    .btn-show-fixed-list svg{
        transform : rotate(90deg);
    }
    .filters-choosed{
        display : none;
    }
    .container-filter{
        position : relative ;
        margin-right: 1rem ; 
    }
    .container-filter-btns{
        position : absolute ; 
        left : 0; 
        top : 130%;
        background : white; 
    }
    .container-filter-btns.open{
        transform : scale(1); 
    }
    h5{
        display : none;
    }
    
    
    @media screen and (max-width : 768px){
        h5{
            display : block ;
            font-size: 1.375rem;
        }
        .btn-show-fixed-list{
            display: flex;
            gap: .7rem;
        }
        .row-list .wrapper-fixed-list{
            display: block ;
        }
        .fixed-list{
        position : fixed ; 
        top : 0 ; 
        left : 0 ; 
        width : 100vw;
        height : 100vh ; 
        z-index : -1;
        opacity : 0 ; 
         background : #000000a6 ;
        transition: all 0.3s;
        }
        
        .fixed-list.open{
            opacity : 1 ; 
            z-index: 102;
        }

        .fixed-list .wrapper-fixed-list{
            width : 90vw ;
            max-width: 350px;
            background-color: #ffffff;
            overflow: auto;
            padding: 24px;
            height : 100%;
            transform : translatex(-100%);
            transition: all 0.3s;
        }
        .fixed-list.open .wrapper-fixed-list{
            transform : translatex(0)
        }
        .wrapper-fixed-list h5{
            font-weight: 500;
            position: relative;
            padding : 0 0.75rem;
        }
        .wrapper-fixed-list .btn{
            width : 100%; 
            justify-content : space-between;
        }
        .wrapper-fixed-list .container-filter{
            padding-bottom : 14px;
            padding-top : 14px;
            margin-right : 0 ;
            border-bottom: 1px solid lightgrey;
        }
        .wrapper-fixed-list .container-filter-btns{
            position : static;
            width : 100%;
            min-width : 0;
            box-shadow : none;
            border : none;
            padding: 0 0.8rem;
        }
        .wrapper-fixed-list .btn-clear-filters{
            padding-top : 14px;
            text-align : left ; 
        }
        .filters-choosed{
            display : block ; 
            padding-top: 0;
            padding-left: .75rem;
            font-size: .85rem;
            text-transform : capitalize;
            margin-top : -15px;
        }
    }
    @media screen and (min-width:768px){
            
    }
    
`
export default Filters
