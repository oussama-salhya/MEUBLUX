import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Category from '../models/Category.js'
import { deleteImageFile, writeImageFile } from '../utils/imageFile.js'
import uploadImage from '../utils/uploadImage.js'





const getCategories = async (req, res) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json({ categories })
}
const getSingleCategory = async (req, res) => {
    const { name } = req.params
    if (!name) {
        throw new BadRequestError('please provide an name to get the category')
    }
    const category = await Category.findOne({ name })
    if (!category) {
        throw new NotFoundError('no category with name : ' + name);
    }
    res.status(StatusCodes.OK).json({ category })
}

const deleteCategory = async (req, res) => {
    const { params: { id } } = req
    const categorie = await Category.findById(id)
    if (!categorie) {
        throw new BadRequestError('sorry the is no category with the id ' + id)
    }
    await deleteImageFile(categorie.image)
    await categorie.remove()
    res.status(StatusCodes.OK).json({ msg: 'success ! categroy removed' })
}
const updateCategory = async (req, res) => {
    let { params: { id }, body: { name, image } } = req;

    if (!image.startsWith('/assets')) {
        image = await writeImageFile(image, name)
    }

    const category = await Category.findByIdAndUpdate(id, { image, name }, {
        runValidators: true,
        new: true
    })
    // res.status(StatusCodes.OK).json({ msg: 'OK' })
    res.status(StatusCodes.OK).json({ category })
}
const createCategory = async (req, res) => {
    let { name, image } = req.body;
    if (!name || !image) {
        throw new BadRequestError('must provide both name and image')
    }
    const isNameAlreadyexists = await Category.findOne({ name })
    if (isNameAlreadyexists) {
        throw new BadRequestError('category name already exists')
    }
    image = await writeImageFile(image, name)
    const category = await Category.create({ name, image })
    res.status(StatusCodes.CREATED).json({ category })
}
const getListCategoriesByIds = async (list) => {
    const categories = await Category.find({ _id: { $in: list } }).select({ name: 1 }).distinct('name')
    return categories
}



export {
    getCategories,
    deleteCategory,
    updateCategory,
    createCategory,
    getListCategoriesByIds,
    getSingleCategory
}