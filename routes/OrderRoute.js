import { Router } from "express";
import {
    checkCart,
    createOrder,
    getAllOrders,
    getCustomers,
    getFilteredOrders,
    getTotalOrdersByCategory,
    setupDashboard,
    getStats,
    getProductOrders
} from "../controllers/OrderController.js";
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js'
const router = Router();


router.route('/create-payment-intent').post(authenticateUser, checkCart)
router.route('/createOrder').post(authenticateUser, createOrder)
router.route('/').get(authenticateUser, getAllOrders)
router.route('/get-filtered-orders').get([authenticateUser, authorizePermissions('admin', 'test')], getFilteredOrders)
router.route('/get-total-orders-by-category').get([authenticateUser, authorizePermissions('admin', 'test')], getTotalOrdersByCategory)
router.route('/get-customers').get([authenticateUser, authorizePermissions('admin', 'test')], getCustomers)
router.route('/dashboard').get([authenticateUser, authorizePermissions('admin', 'test')], setupDashboard)
router.route('/stats/:date').get([authenticateUser, authorizePermissions('admin', 'test')], getStats)
router.route('/get-product-orders').get([authenticateUser, authorizePermissions('admin', 'test')], getProductOrders)
export default router


