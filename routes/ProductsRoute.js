import { Router } from "express"

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    filterProducts,
    getSingleProduct,
    getSearchSuggestions
} from '../controllers/ProductController.js'
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js"

const router = Router()


router.route('/').get(getAllProducts).post([authenticateUser, authorizePermissions('admin')], createProduct)
router.route('/filter').get(filterProducts)
router.get('/getSearchSuggestions', getSearchSuggestions)
router.route('/:id').get(getSingleProduct).patch([authenticateUser, authorizePermissions('admin')], updateProduct).delete([authenticateUser, authorizePermissions('admin')], deleteProduct)
router.route('/uploadImage').post([authenticateUser, authorizePermissions('admin')], uploadImage)


export default router