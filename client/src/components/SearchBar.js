import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAllProducts, getSearchSuggestions, handleChange, handleSearchBar } from '../Features/products/ProductsSlice'
import { BsArrowLeft } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
const SearchBar = ({ closeSearch, linkToNavigate }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search, searchSuggestions: { completions, products } } = useSelector(store => store.products)
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
    const onChange = (e) => {
        openSearchResults()
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
    }
    const onPressKey = (e) => {
        if (e.code === "ArrowUp" && selectedLinkIndex > 0) {
            setSelectedLinkIndex(currentValue => currentValue - 1)
        }
        if (e.code === "ArrowDown" && selectedLinkIndex < completions.length + products.length) {
            setSelectedLinkIndex(currentValue => currentValue + 1)
        }
    }
    const handleSearchClick = ({ value, getProducts }) => {
        dispatch(handleSearchBar(value))
        closeSearchResult()
        if (getProducts) {
            dispatch(getAllProducts())
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) {
            return;
        }
        dispatch(getAllProducts())
        navigate(linkToNavigate)
        closeSearchResult()
    }
    const closeSearchResult = () => {
        setShowSearchResult(false)
    }
    const closeBar = () => {
        if (closeSearch) {
            closeSearch()
        }
        closeSearchResult()
    }

    const openSearchResults = () => {
        setShowSearchResult(true)
    }
    useEffect(() => {
        document.addEventListener('click', closeBar)
        return () => document.removeEventListener('click', closeBar)
    })
    const SearchResults = () => {
        if (completions.length || products.length) {
            return <div className="container-search-results">
                <ul>
                    <Completions
                        linkToNavigate={linkToNavigate}
                        completions={completions}
                        handleSearchClick={handleSearchClick}
                        selectedLinkIndex={selectedLinkIndex}
                    />
                    <Products
                        products={products}
                        linkToNavigate={linkToNavigate}
                        handleSearchClick={handleSearchClick}
                    />
                </ul>
            </div>
        }
        else {
            return <></>
        }
    }
    useEffect(() => {
        if (search.length >= 2) {
            dispatch(getSearchSuggestions())
        }
    }, [search])
    return (
        <Wrapper
            className='search-bar'
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className='btn-close-search-bar'
                onClick={closeSearch}
            >
                <BsArrowLeft />
            </button>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder='type and press enter'
                    className='form-input'
                    name='search'
                    value={search}
                    autoComplete='off'
                    onChange={onChange}
                    onClick={openSearchResults}
                    onKeyDown={onPressKey}

                />
                <button type='submit' className='btn-submit'>
                    <BiSearch />
                </button>
            </form>
            <div className="search-results">
                {
                    showSearchResult && <SearchResults />
                }
            </div>
        </Wrapper>
    )
}
// working on the categories or companies that appers on the search 
const Completions = React.memo(({ completions, linkToNavigate, handleSearchClick, selectedLinkIndex }) => {
    return <>
        {
            completions.length ? completions.map((item, index) => {
                const { value } = item
                return <li key={index} role='option'>
                    <Link
                        to={linkToNavigate}
                        className={`${index + 1 === selectedLinkIndex ? 'search-link' : 'search-link'}`}
                        onClick={() => handleSearchClick({ value, getProducts: true })}
                        id={`item-${index}`}
                        aria-selected={selectedLinkIndex === index + 1}
                    >
                        <h5 className='name'>{value}</h5>
                    </Link>
                </li>
            }) : ''
        }
    </>

})
const Products = React.memo(({ products, linkToNavigate, handleSearchClick }) => {
    return <>
        {
            products.length ?
                products.map((item, index) => {
                    return <ProductItem
                        {...item}
                        key={index}
                        linkToNavigate={linkToNavigate}
                        handleSearchClick={handleSearchClick}
                    />
                })
                :
                ''
        }
    </>
})
const ProductItem = React.memo(({ mainImage: image, name, company, id, linkToNavigate, handleSearchClick }) => {
    return <li>
        <Link
            to={`${linkToNavigate}/${id}`}
            className='search-link'
            onClick={() => handleSearchClick({ value: name })}
        >
            <div className='product-avatar'>
                <img src={image} alt={name} />
                <div>
                    <h5 className='name'>{name}</h5>
                    <h5 className='price-small'>{company}</h5>
                </div>
            </div>
        </Link>

    </li>
})

const Wrapper = styled.div`
    width : 50%;
    max-width : 600px;
    form{
        display: flex;
        align-items: center;
    }
    .form-input{
        border-radius : .25rem ; 
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right : 0;
    }
    .btn-close-search-bar{
        display : none;
    }
    .search-results{
        position : relative ; 
    }
    .container-search-results{
        position : absolute;
        padding: 1rem 2rem 1.5rem;
        background : var(--white);
        box-shadow : var(--shadow-1);
        width : 100%;
        z-index : 100;
    }
    .search-link{
        padding: 10px;
        display: block;
    }
    .search-link.selected{
        border : 1px solid var(--black);
    }
    .search-link > .name{
        font-family: 'Nunito';
        font-weight : 600;
    }
    .search-link:hover .name{
        text-decoration : underline;
    }
    .product-avatar{
        grid-template-rows: 60px;
        display: grid;
        grid-template-columns: 75px 125px;
        align-items: center;
        text-align: left;
        gap: 1rem;
    }
    img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: var(--borderRadius);
        object-fit: cover;
    }
    h5 {
        font-size: 1rem;
        margin-bottom: 0;
        font-weight : 500;
    }
    .price-small {
        font-size : .75rem ;
    }
    .product-avatar .name {
        font-size: 0.85rem;
        font-weight: bold;
    }
    .btn-submit{
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
        background : var(--black);
        color : var(--white);
    }
    @media screen and (max-width:768px){
        position: fixed;
        top: 0;
        left: 0;
        padding: 5%;
        width: 100%;
        z-index: 100;
        background: white;
        max-width : none;
        padding-left : calc(5% + 30px);
        padding-top : 30px;
        .btn-close-search-bar{
            display: block;
            position: absolute;
            left: 4vw;
            top: 50px;
            width: 30px;
            transform: translatey(-50%);

        }
    }
    @media screen and (max-width: 400px){
        .container-search-results{
            padding: 1rem 0.75rem 1.5rem;
        }
    }
`

export default SearchBar
