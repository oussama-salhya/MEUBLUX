import {
    getCategories,
    deleteCategory,
    updateCategory,
    createCategory,
    getSingleCategory
} from '../controllers/CategoryController.js'
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js';
import { Router } from 'express'


const router = Router();

router.route('/').get(getCategories).post([authenticateUser, authorizePermissions('admin')], createCategory)
router.route('/:id').patch([authenticateUser, authorizePermissions('admin')], updateCategory).delete([authenticateUser, authorizePermissions('admin')], deleteCategory)
router.route('/:name').get(getSingleCategory)
export default router

