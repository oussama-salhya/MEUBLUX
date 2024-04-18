import React from 'react'
import styled from 'styled-components'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import readFile from '../utils/readFile'
import { useDispatch, useSelector } from 'react-redux'
import { appendImgtoSingleProductImages, deleteImgFromSingleProductImages, handleChange } from '../Features/products/ProductsSlice'
const DropZone = () => {
    const { images, mainImgIndex } = useSelector(store => store.products.singleProduct)
    const dispatch = useDispatch()
    const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
        for (const file of acceptedFiles) {
            const image = await readFile(file)
            dispatch(appendImgtoSingleProductImages(image))
        }
    }, [])
    const deleteImg = (index) => {
        dispatch(deleteImgFromSingleProductImages(index))
    }
    const setMainImg = (index) => {
        dispatch(handleChange({ name: 'mainImgIndex', value: index, changeProduct: true }))
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    })
    return (
        <Wrapper {...getRootProps()}>
            <input {...getInputProps()} />
            {
                images.length === 0 ? (
                    <span className="dropzone-upload-message">
                        <AiOutlineCloudUpload />
                        <b>Drag/Upload</b> your images here.
                    </span>
                ) :
                    (
                        images.map((item, index) => {
                            return <ContainerDropZoneImg
                                src={item}
                                key={index}
                                deleteImg={() => deleteImg(index)}
                                setMainImg={() => setMainImg(index)}
                                isMainImg={mainImgIndex === index}
                            />
                        })
                    )

            }
        </Wrapper>

    )
}
const ContainerDropZoneImg = ({ src, deleteImg, setMainImg, isMainImg }) => {
    const handleClick = (e) => {
        e.stopPropagation()
    }
    return (
        <div className={`${isMainImg ? "container-img selected" : "container-img"}`}
            onClick={handleClick}>
            <img src={src} alt="img" onClick={setMainImg} />
            <button type='button' className='remove-btn' onClick={() => deleteImg()}>
                <TiDeleteOutline />
            </button>
        </div>
    )
}

const Wrapper = styled.div`
    border: 2px dashed #e7e7e7;
    min-height: 200px;
    transition: ease opacity 300ms;
    padding: 23px;
    border-radius: 3px;
    position : relative ; 
    cursor : pointer ; 
    display : flex; 
    gap : 1.5rem ; 
    flex-wrap : wrap ; 
    .dropzone-upload-message {
        position: absolute;
        top: 50%;
        left: 50%;
        pointer-events: none;
        transform: translate3d(-50%, -50%, 0);
    }
    svg{
        font-size: 3rem;
        width: 100%;
    }
    b{
        color: #0088CC !important;
    }
    .container-img{
        width : 120px ; 
        height : 120px ; 
        border-radius : 1rem;
        position : relative ; 
    }
    .container-img.selected{
        opacity : .7;
    }
    .container-img.selected::after{
        content : '';
        position : absolute ; 
        top : 50%;
        left : 50%;
        transform : translate(-50%,-50%) rotate(45deg);
        width : 15%;
        height : 30%;
        border :2px solid black ;
        border-left: 0;
        border-top: 0;
    }
    img{
        height : 100%;
        border-radius : 1rem;
        width : 100%;
    }
    .remove-btn{
        position: absolute;
        top: -10px;
        left: -10px;
    }
    .remove-btn svg{
        width: 25px;
        height: 25px;
    }
`


export default DropZone
