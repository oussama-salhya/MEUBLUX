import { Router } from "express";
import { createReview, deleteReview, getProductReviews, updateReview, getAllReviews } from "../controllers/ReviewController.js";
import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";
const router = Router();

router.route('/').post(authenticateUser, createReview).get([authenticateUser, authorizePermissions('admin', 'test')], getAllReviews)
router.route('/:id').get(getProductReviews).patch(authenticateUser, updateReview).delete(authenticateUser, deleteReview)

export default router