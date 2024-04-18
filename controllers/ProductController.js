import { StatusCodes } from 'http-status-codes'
import Product from '../models/Product.js'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { getListCategoriesByIds } from './CategoryController.js'
import uploadImages from '../utils/uploadImage.js'
import Category from '../models/Category.js'


const getBasicQuery = async (search) => {
    const queryObject = {
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ]
    };
    const categories = await Category.find({ name: { $regex: search, $options: 'i' } });
    if (categories.length) {
        const categoryIds = categories.map(category => {
            return category._id
        });
        queryObject.$or.push({ category: { $in: categoryIds } });
    }
    return queryObject
}

const getAllProducts = async (req, res) => {
    const { search } = req.query
    let queryObject = {}
    let categories
    if (search) {
        queryObject = await getBasicQuery(search)
    }
    const limit = Number(req.query.limit) || 10
    categories = await Product.find(queryObject)
        .select({ category: 1 })
        .distinct('category')
        .populate({
            path: 'category',
            select: 'name'
        })
    categories = await getListCategoriesByIds(categories)
    const companies = await Product.find(queryObject).select({ company: 1 }).distinct('company')
    const maxPrice = await Product.getMaxPriceOfProducts(queryObject)
    let products = await Product.find({ ...queryObject }).populate({
        path: 'category',
        select: 'name'
    })
        .sort({ createdAt: -1 })
        .limit(limit)
    const totalProducts = await Product.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalProducts / limit)
    const response = { products, categories, companies, maxPrice, numOfPages, totalProducts }
    res.setHeader('size', Buffer.byteLength(JSON.stringify(response)));
    res.status(StatusCodes.OK).json(response)
}
const filterProducts = async (req, res) => {
    const { search, sort, company, category, price } = req.query
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const sortOptions = {
        latest: { createdAt: -1 },
        "highest price": { price: -1 },
        "lower price": { price: 1 }
    }
    let queryObject = {};
    let categories;
    let companies;
    if (search) {
        console.log('====================================');
        console.log('search : ' + search);
        console.log('====================================');
        queryObject = await getBasicQuery(search)
    }
    if (price) {
        queryObject.price = { $lte: Number(price) }
    }

    if (category) {
        categories = category.split(',')
        categories = await Category.find({ name: { $in: categories } }).distinct('_id')
        queryObject.category = { $in: categories }
    }
    if (company) {
        companies = company.split(',')
        queryObject.company = { $in: companies }
    }
    let result = Product.find(queryObject).populate({
        path: 'category',
        select: 'name'
    }).select('-createdAt -updatedAt -__v')
    if (sort) {
        result = result.sort(sortOptions[sort])
    }
    else {
        result = result.sort({ createdAt: -1 })
    }
    if (skip) {
        result.skip(skip)
    }
    const products = await result.limit(limit)
    categories = await Product.find(queryObject)
        .select({ category: 1 })
        .distinct('category')
    categories = await getListCategoriesByIds(categories)
    companies = await Product.find(queryObject).select({ company: 1 }).distinct('company')
    const maxPrice = await Product.getMaxPriceOfProducts(queryObject)
    const totalProducts = await Product.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalProducts / limit)
    res.status(StatusCodes.OK).json({ products, companies, categories, maxPrice, numOfPages, totalProducts })
}

const createProduct = async (req, res) => {
    const images = await uploadImages(req.body.images)
    const [mainImage] = await uploadImages([req.body.mainImage])
    images.unshift(mainImage)
    req.body.images = images
    req.body.mainImage = mainImage
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}
const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const oldProduct = req.body;
    // here we will check if there is some additional images
    //  if it's the case we will add these images 
    let addedImages = oldProduct.images.filter(image => !image.startsWith('http'))
    if (addedImages.length > 0) {
        addedImages = await uploadImages(addedImages)
        oldProduct.images = oldProduct.images.filter(image => image.startsWith('http'))
        oldProduct.images = [...oldProduct.images, ...addedImages]
    }
    // here we will check if the main image was changed 
    // we will know this by the index of the main image passed by the client
    // if it's different from zero than it's changed 
    // we will then permute the values of it with the index of the new main image
    if (oldProduct.mainImgIndex) {
        oldProduct.mainImage = oldProduct.images[oldProduct.mainImgIndex]
        // permute 
        oldProduct.images[oldProduct.mainImgIndex] = oldProduct.images[0]
        oldProduct.images[0] = oldProduct.mainImage
    }
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        throw new NotFoundError(`No product with id : ${productId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'the product has been updated successfully' });
}
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new NotFoundError(`No product with id : ${productId}`);
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
}
const getSingleProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).populate({
        path: 'category',
        select: 'name'
    });
    if (!product) {
        throw new BadRequestError('no item with id ' + id)
    }
    res.status(StatusCodes.OK).json({ product })
}
const getSearchSuggestions = async (req, res) => {
    const { searchTerm, limit } = req.query;
    let completions = []
    const categories = await Category.find({ name: { $regex: searchTerm, $options: 'i' } });
    if (categories.length) {
        const categoryIds = categories.map(category => {
            // we want also to add the names to completions 
            completions.push({ value: category.name, label: `categories` })
            return category._id
        });
    }
    const companies = await Product.find({ company: { $regex: searchTerm, $options: 'i' } })
        .select({ company: 1 })
        .distinct('company')
    if (companies.length) {
        companies.forEach(company => {
            completions.push({ value: company, label: 'companies' })
        })
    }
    const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } })
        .select('name company mainImage')
        .limit(limit || 5)

    res.status(StatusCodes.OK).json({ completions, products })
    // res.status(StatusCodes.OK).json({ searchTerm })
}

const uploadImage = async (req, res) => {
    const images = await uploadImages(req.body.images)
    res.status(StatusCodes.OK).json({ images })
}

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    uploadImage,
    filterProducts,
    getSearchSuggestions
}


