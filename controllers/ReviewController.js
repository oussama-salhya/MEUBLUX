import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { BadRequestError, NotFoundError } from "../errors/index.js"
import Product from "../models/Product.js"
import Review from "../models/Review.js"
import checkPermissions from "../utils/checkPermissions.js"

const createReview = async (req, res) => {
    const { body: { product: productId }, user: { userId } } = req
    const isProductexist = await Product.findById(productId)
    if (!isProductexist) {
        throw new BadRequestError('no product with id : ' + productId)
    }
    const isProductReviewd = await Review.findOne({
        product: productId,
        user: userId
    })
    if (isProductReviewd) {
        throw new BadRequestError('the product has already a review')
    }
    req.body.user = userId
    const review = await Review.create(req.body)
    const { averageRating, numOfReviews } = await Product.findOne({ _id: productId }).select('numOfReviews averageRating')
    res.status(StatusCodes.OK).json({ review, numOfReviews, averageRating })
}
const updateReview = async (req, res) => {
    const { body: { comment, rating, title }, params: { id }, user: { userId } } = req
    const review = await Review.findById(id);
    if (!review) {
        throw new NotFoundError('no review with id ' + id)
    }
    console.log(review.user);
    checkPermissions(req.user, review.user)
    review.comment = comment
    review.rating = rating
    review.title = title
    await review.save()
    const { numOfReviews, averageRating } = await Product.findOne({ _id: review.product })
    res.status(StatusCodes.OK).json({ review, numOfReviews, averageRating })
}
const deleteReview = async (req, res) => {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) {
        throw new NotFoundError('no review with id ' + id)
    }
    const productId = review.product
    checkPermissions(req.user, review.user)
    await review.remove()
    const { numOfReviews, averageRating } = await Product.findOne({ _id: productId })
    res.status(StatusCodes.OK).json({ numOfReviews, averageRating })
}
const getProductReviews = async (req, res) => {
    const productId = req.params.id;
    let productReviews = await Review.find({
        product: productId
    }).populate({
        path: 'user',
        select: { name: 1, image: 1 },
    })
    const { numOfReviews, averageRating } = await Product.findById(productId).select({ numOfReviews: 1, averageRating: 1 })
    let reviewsGrouped = await Review.aggregate([
        {
            $match: {
                product: mongoose.Types.ObjectId(productId)
            }
        },
        {
            $group: {
                _id: "$rating",
                numOfReviews: {
                    $sum: 1
                }
            }
        }
    ])
    reviewsGrouped = reviewsGrouped.reduce((res, item) => {
        res[item._id] = item.numOfReviews
        return res;
    }, {})
    reviewsGrouped = Array.from({ length: 5 }, (_, index) => {
        if (reviewsGrouped[index + 1]) {
            return reviewsGrouped[index + 1]
        }
        return 0;
    })
    res.status(StatusCodes.OK).json({ reviews: productReviews, numOfReviews, averageRating, reviewsGrouped })

}
const getAllReviews = async (req, res) => {
    const reviews = await Review.find({}).populate({
        path: 'user',
        select: { name: 1, email: 1, image: 1 }
    })
    res.status(StatusCodes.OK).json({ reviews })
}
const getAverageRating = async () => {
    return Review.aggregate([
        {
            $group: {
                _id: null,
                avgRating: {
                    $avg: "$rating"
                }
            }
        }
    ])
}
export {
    createReview,
    updateReview,
    deleteReview,
    getProductReviews,
    getAllReviews,
    getAverageRating
}