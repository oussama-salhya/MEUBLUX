import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearValues, createCategory, displayError, handleChange, updateCategory } from '../Features/categories/categoriesSlice'
import { hideError } from '../Features/categories/categoriesSlice'
import readFile from '../utils/readFile'
import FormRow from './FormRow'

const CategoryForm = () => {
    const { isEditing, name, image, imagePath, showError, msg } = useSelector(store => store.categories)
    const dispatch = useDispatch();
    const onChange = (e) => {
        const name = e.target.name
        if (name === 'image') {
            dispatch(handleChange({ name: 'imagePath', value: e.target.files[0].name }))
            readFile(e.target.files[0])
                .then(res => dispatch(handleChange({ name, value: res })))
            return;
        }
        const value = e.target.value
        dispatch(handleChange({ name, value }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (!name || !image) {
            dispatch(displayError())
            return;
        }
        if (isEditing) {
            dispatch(updateCategory())
            if (showError) {
                dispatch(hideError())
            }
            return;
        }
        dispatch(createCategory())
        if (showError) {
            dispatch(hideError())
        }
    }
    const onClear = () => {
        dispatch(clearValues())
    }
    return (
        <Wrapper className='card'>
            <h3>
                {
                    isEditing ? 'Update Category' : 'Create Category'
                }
            </h3>
            <form onSubmit={onSubmit}>
                <FormRow
                    name='name'
                    type='text'
                    handleChange={onChange}
                    value={name}
                    showError={showError && !msg}
                />
                <FormRow
                    type='file'
                    name='image'
                    value={imagePath}
                    handleChange={onChange}
                    label={`${isEditing ? 'update the image' : 'choose an image'}`}
                    showError={showError && !msg}
                />
                <button className='btn' type='submit'>
                    {
                        isEditing ? 'Update' : 'Create'
                    }
                </button>
                <button type='button' className="btn btn-clear" onClick={onClear}>
                    clear
                </button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width : 500px ; 
    min-width : 350px ; 
    padding: 2rem;
    margin-top: 3rem;
    .btn{
        --gold : var(--black);
        padding: .4rem 2rem;
        margin-top : 1rem ;
        margin-right : 1rem ; 
    }
    .btn.btn-clear{
        --gold : var(--red-dark);
    }
    input{
        border-radius : .25rem  ;
    }
    h3{
        margin-bottom: 2.5rem;
        font-weight: 600;
    }
    input[type=file] + span{
        margin-top: -0.5rem;
        display: block;
    }

`

export default CategoryForm
