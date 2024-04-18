import styled from 'styled-components'
import { HiOutlineArchive, HiOutlineCamera } from 'react-icons/hi'
import { FormRow, HeaderDashboardPage, DropZone, FormRowSelect, Loading } from '../components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearSingleProductValues, createProduct, displayError, editProduct, handleChange, hideError } from '../Features/products/ProductsSlice'
import { useEffect } from 'react'
import { getAllCategories } from '../Features/categories/categoriesSlice'

const AddProductDashboard = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const dispatch = useDispatch()
    const { isEditing, showError, isLoading, singleProduct: { name, description, price, category, company, stock, images } } = useSelector(store => store.products)
    const { categories } = useSelector(store => store.categories)
    const OnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value, changeProduct: true }))
    }
    const clearProduct = () => {
        dispatch(clearSingleProductValues())
        if (showError) {
            dispatch(hideError())
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (!name || !description || !Number(price) || !category || !company || images.length === 0) {
            dispatch(displayError())
            return;
        }
        if (isEditing) {
            dispatch(editProduct())
            if (showError) {
                dispatch(hideError())
            }
            return;
        }
        if (showError) {
            dispatch(hideError())
        }
        dispatch(createProduct())
    }

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])
    useEffect(() => {
        if (!isEditing) {
            dispatch(clearSingleProductValues())
        }
    }, [])
    return (
        <Wrapper>
            <HeaderDashboardPage
                title={isEditing ? 'Edit product' : 'add product'}
                pathList={['dashboard', 'Products', isEditing ? 'Edit product' : 'add product']}
            />
            <form onSubmit={handleSubmit}>
                <div className="general-info">
                    <div className="row">
                        <div className='card-header'>
                            <HiOutlineArchive />
                            <h2 className="title">General Info</h2>
                            <p className="desc">Add here the product description with all details and necessary information. All fields are required, so be sure to complete each one before submitting the form. </p>
                        </div>
                        <div className="card-content">
                            {/* product name */}
                            <FormRow
                                type='text'
                                label='product name'
                                name='name'
                                value={name}
                                handleChange={OnChange}
                                showError={showError}
                            />
                            {/* company */}
                            <FormRow
                                name='company'
                                handleChange={OnChange}
                                type='text'
                                value={company}
                                showError={showError}
                            />
                            {/* category */}
                            <FormRowSelect
                                name="category"
                                id='category'
                                handleChange={OnChange}
                                value={category}
                                showError={showError}
                            >
                                {
                                    categories.map((item, index) => {
                                        const { _id: id, name } = item
                                        return <option key={index} value={id}>{name}</option>
                                    })
                                }
                            </FormRowSelect>
                            {/* stock */}
                            <FormRow
                                name='stock'
                                handleChange={OnChange}
                                type='text'
                                value={stock}
                                showError={false}
                            />
                            {/* price */}
                            <FormRow
                                name='price'
                                handleChange={OnChange}
                                type='text'
                                value={price}
                                showError={showError}
                            />
                            {/* description */}
                            <FormRow
                                type='textarea'
                                label='product description'
                                name='description'
                                value={description}
                                handleChange={OnChange}
                                showError={showError}
                            />
                        </div>
                    </div>
                </div>
                <div className="general-info">
                    <div className="row">
                        <div className="card-header">
                            <HiOutlineCamera />
                            <h2 className="title">Product Image</h2>
                            <p className="desc">Upload your product images. Once the images appears , click on the image that will appear to the user as a main image</p>
                        </div>
                        <div className="card-content">
                            <DropZone />
                            {
                                showError && !images.length && <span className="form-alert">
                                    product should contain images
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className="container-btns">
                    <button
                        type='submit'
                        className='btn btn-save'
                        onClick={onSubmit} >
                        {
                            isLoading ? 'Loading ...' : 'Save changes'
                        }
                    </button>
                    <button
                        type='button'
                        className='btn btn-clear'
                        onClick={clearProduct}>
                        clear
                    </button>

                </div>
            </form>
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
    form{
        margin-top: 2rem;
    }
    .form-input{
        border-radius : .3rem ; 
        border-width : 1px;
    }
    .general-info{
        background: var(--white);
        border-radius: .35rem;
        margin-top : 1rem;
        overflow : hidden;
    }
    
    .row , .container-input{
        display: flex;
        flex-wrap: wrap;
    }
    .container-input {
        padding-bottom: 1rem!important;
    }
    .row > div{
        padding: 2.5rem 2rem;
    }
    .card-header{
        background : var(--black);
        color : var(--white);
    }
    .card-header svg{
        font-size: 5.2rem;
        position: relative;
        left: -9px;
        margin-bottom : 10px;
    }
    .card-header .title{
        color:var(--white);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.2;
        margin: 0 0 10px;
    }
    .card-header .desc{
        font-size: 1rem ;
    }
    .container-btns{
        margin-top : 1.5rem;
    }
    .btn{
        background : #0088CC ;
        margin-right : 1.5rem;
    }

    @media (min-width: 992px)
    {
        .card-header {
            flex: 0 0 40%;
            max-width: 40%;
        }
        .card-content {
            flex: 0 0 60%;
            max-width: 60%;
        }
        .form-label {
            text-align: right!important;
            flex: 0 0 auto;
            width: 41.66666667%;
            padding-right : 1.5rem;
            padding-top : .35rem;
        }
        .container-input > div {
            flex: 0 0 auto;
            width: 58.33333333%;
        }
    }
    @media (min-width: 1200px){
        .card-header {
            flex: 0 0 20%;
            max-width: 20%;
        }
        .card-content {
            flex: 0 0 80%;
            max-width: 80%;
        }
        .form-label {
            flex: 0 0 auto;
            width: 25%;
            
        }
        .container-input > div {
            flex: 0 0 auto;
            width: 50%;
        }
    }
    
   
    
`
export default AddProductDashboard
