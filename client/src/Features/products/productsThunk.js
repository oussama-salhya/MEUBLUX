import customFetch, { checkForUnauthenticatedError } from "../../utils/axios"
import { clearFilters, clearSingleProductValues, getAllProducts, getFilteredProducts, setProgressPercentage, setupFilters } from "./ProductsSlice";



export const getAllProductsThunk = async (_, thunkAPI) => {
    const { search } = thunkAPI.getState().products;
    let url = `/products/`;
    if (search) {
        url += `?search=${search}`
    }
    url += search ? '&limit=5' : '?limit=5'
    try {
        const { data } = await customFetch.get(url, {
            onDownloadProgress: progressEvent => {
                thunkAPI.dispatch(setProgressPercentage({ loaded: progressEvent.loaded, size: progressEvent.event.currentTarget.getResponseHeader('size') }))
            }
        });
        thunkAPI.dispatch(clearFilters())
        return data
    } catch (error) {
        console.log(error);
    }
}
export const getFilteredProductsThunk = async (_, thunkAPI) => {
    const { page, sort, companies, categories, colors, price, search } = thunkAPI.getState().products;
    let url = `/products/filter?sort=${sort}&limit=5`; //
    if (search) {
        url += `&search=${search}`
    }
    if (page) {
        url += `&page=${page}`
    }
    if (price) {
        url += `&price=${price}`
    }
    if (categories.length > 0) {
        url += `&category=${categories.join(',')}`
    }
    if (companies.length > 0) {
        url += `&company=${companies.join(',')}`
    }
    if (colors.length > 0) {
        url += `&colors=${colors.join(',')}`
    }
    try {
        const { data: { maxPrice, products, categories, companies, numOfPages, totalProducts } } = await customFetch.get(url);
        thunkAPI.dispatch(setupFilters({ maxPrice, categories, companies }))
        return { products, numOfPages, totalProducts }
    } catch (error) {
        console.log(error);
    }
}
export const getSingleProductThunk = async (id, thunkAPI) => {

    const url = `/products/${id}`
    const { isEditing } = thunkAPI.getState().products
    try {
        const { data } = await customFetch.get(url);
        if (isEditing) {
            data.product.category = data.product.category._id
            data.product.mainImgIndex = 0;
        }
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const createProductThunk = async (_, thunkAPI) => {
    const url = `/products/`
    const { singleProduct } = thunkAPI.getState().products
    const product = { ...singleProduct }
    const mainImage = product.images[product.mainImgIndex]
    product.images = product.images.filter((item, index) => {
        if (index !== product.mainImgIndex) {
            return item
        }
    })
    product.mainImage = mainImage
    try {
        await customFetch.post(url, product)
        thunkAPI.dispatch(getAllProducts())
        return;
    } catch (error) {
        checkForUnauthenticatedError(error, thunkAPI)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const editProductThunk = async (_, thunkAPI) => {
    const { singleProduct } = thunkAPI.getState().products
    const product = { ...singleProduct }
    const url = `/products/${product._id}`
    product._id = undefined;
    product.id = undefined;
    product.mainImage = product.images[product.mainImgIndex]
    try {
        await customFetch.patch(url, product)
        thunkAPI.dispatch(getFilteredProducts())
    } catch (error) {
        checkForUnauthenticatedError(error, thunkAPI)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const deleteProductThunk = async (id, thunkAPI) => {
    const url = `/products/${id}`

    try {
        await customFetch.delete(url)
        thunkAPI.dispatch(getFilteredProducts())
    } catch (error) {
        checkForUnauthenticatedError(error, thunkAPI)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}



export const getSearchSuggestionsThunk = async (_, thunkAPI) => {
    const searchTerm = thunkAPI.getState().products.search;
    const url = '/products//getSearchSuggestions?searchTerm=' + searchTerm
    try {
        const { data } = await customFetch.get(url)
        return data
    } catch (error) {
        console.log(error);
    }
}


