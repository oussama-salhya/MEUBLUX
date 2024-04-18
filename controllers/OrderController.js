import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import createPaymentIntent from "../utils/createPayementIntent.js";
import Category from "../models/Category.js";
import { getAverageRating } from "./ReviewController.js";


const checkCart = async (req, res) => {
    const orderItems = req.body
    console.log(orderItems);
    let total = 0;
    for (const item of orderItems) {
        const { productId, amount, price } = item
        if (!productId || !amount || !price) {
            throw new BadRequestError('product , amount and price are required')
        }
        const product = await Product.findById(productId)
        if (!product) {
            throw new NotFoundError('no item with id ' + productId)
        }
        if (product.stock < amount) {
            throw new BadRequestError(`the stock contains only ${product.stock} item${product.stock > 1 ? 's' : ''}`)
        }
        if (product.price !== price) {
            throw new BadRequestError(`the price of the product ${product.name} is changing please refresh the page to see the new price`)
        }
        total += amount * price
    }
    const paymentIntent = await createPaymentIntent(total)
    res.status(StatusCodes.OK).json(paymentIntent)

}
const createOrder = async (req, res) => {
    const { paymentIntentId, orderItems } = req.body;
    console.log(orderItems);
    const isOrderExists = await Order.findOne({
        paymentIntentId
    })
    if (isOrderExists) {
        throw new BadRequestError('the order has been already confirmed')
    }
    const total = orderItems.reduce((total, item) => {
        return total += item.price * item.amount
    }
        , 0)
    const order = await Order.create({
        paymentIntentId,
        orderItems,
        total,
        user: req.user.userId
    })
    for (const item of orderItems) {
        const { product: productId, amount, price } = item
        const product = await Product.findById(productId)
        if (!product) {
            throw new NotFoundError('no item with id ' + productId)
        }
        product.stock = product.stock - amount;
        await product.save()
    }
    res.status(StatusCodes.CREATED).json({ msg: 'success ! the order is created' })
}
const getAllOrders = async (req, res) => {
    const { role, userId } = req.user
    if (role === 'user') {
        const orders = await Order.find({ user: userId }).select('orderItems createdAt')
        res.status(StatusCodes.OK).json({ orders })
        return;
    }
    // working on admin request 

    // get the ids of  products that is ordered
    const ListIdProductsOrdered = await Order.aggregate([
        {
            $unwind: {
                path: "$orderItems"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "orderItems.product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$product._id"
            }
        }

    ])
    // get the cities of users 
    let cities = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                city: '$user.city'
            }
        },
        {
            $unwind: {
                path: "$city",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: '$city'
            }
        }
    ])
    cities = cities.map((item) => item._id)
    // use the previous list of the ids to get the products , 
    // companies , categories 
    let categories = await Product.find({ _id: { $in: ListIdProductsOrdered } })
        .select({ category: 1 })
        .distinct('category')
        .populate({
            path: 'category',
            select: 'name'
        })
    categories = await Category.find({ _id: { $in: categories } }).distinct('name')
    let orders = await Order.aggregate([
        {
            $unwind: {
                path: "$orderItems",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'orderItems.product',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'product.category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$product._id",
                'turn over': {
                    $sum: { $multiply: ["$orderItems.amount", "$orderItems.price"] }
                },
                Sales: {
                    $sum: "$orderItems.amount"
                },
                name: { $first: "$product.name" },
                image: { $first: "$product.mainImage" },
                price: { $first: "$product.price" },
                category: { $first: "$category.name" },

            }
        }


    ])
    const companies = await Product.find({ _id: { $in: ListIdProductsOrdered } }).select({ company: 1 }).distinct('company')
    res.status(StatusCodes.OK).json({ categories, companies, cities, orders })


}
const getFilteredOrders = async (req, res) => {

    const { company, category, city, page, date } = req.query

    let productCondictionsPipeline = [{ $eq: ["$_id", "$$productId"] }]
    let categoryConditionPipeline = []
    let userConditionPipeline = []
    if (company) {
        productCondictionsPipeline.push({
            $in: ["$company", company.split(',')]
        })
    }
    if (category) {
        categoryConditionPipeline = [
            {
                $lookup: {
                    from: "categories",
                    let: { "categoryId": '$category' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and:
                                        [
                                            { $eq: ["$_id", "$$categoryId"] },
                                            { $in: ["$name", category.split(',')] }
                                        ]
                                }
                            }
                        }
                    ],
                    as: 'result'
                }
            },
            {
                "$match": {
                    "result": { "$ne": [] }
                }
            }
        ]
    }
    if (city) {
        userConditionPipeline = [
            {
                $lookup: {
                    from: "users",
                    let: { 'userId': '$user' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and:
                                        [
                                            { $eq: ["$_id", "$$userId"] },
                                            { $in: ["$city", city.split(',')] }
                                        ]


                                }
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: false
                }
            }

        ]
    }
    const pipeline = [
        {
            $unwind: {
                'path': '$orderItems'
            }
        },
        {
            $project: {
                'product': '$orderItems.product',
                'amount': '$orderItems.amount',
                'price': '$orderItems.price',
                'user': '$user'
            }
        },
        {
            $lookup: {
                from: "products",
                let: { 'productId': "$product" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: productCondictionsPipeline
                            }
                        }
                    },
                    ...categoryConditionPipeline
                ],
                as: "product"
            }
        },
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: false
            }
        },
        ...userConditionPipeline,
        {
            $lookup: {
                from: 'categories',
                localField: 'product.category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$product._id",
                'turn over': {
                    $sum: { $multiply: ["$amount", "$price"] }
                },
                Sales: {
                    $sum: "$amount"
                },
                name: { $first: "$product.name" },
                image: { $first: "$product.mainImage" },
                price: { $first: "$product.price" },
                category: { $first: "$category.name" },

            }
        }
    ]
    if (date) {
        const startOfMonth = new Date(date)
        const endOfMonth = new Date(date)
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        pipeline.unshift({
            $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        }
        )
    }
    const orders = await Order.aggregate(pipeline)
    res.status(StatusCodes.OK).json({ orders })
}
const getTotalOrdersByCategory = async (req, res) => {
    const result = await Order.aggregate([
        {
            $unwind: {
                'path': '$orderItems'
            }
        }, {
            '$project': {
                'product': '$orderItems.product',
                'amount': '$orderItems.amount',
                'price': '$orderItems.price',
                'totalPriceOrderItem': {
                    '$multiply': [
                        '$orderItems.amount', '$orderItems.price'
                    ]
                }
            }
        }, {
            '$lookup': {
                'from': 'products',
                'localField': 'product',
                'foreignField': '_id',
                'as': 'product'
            }
        }, {
            '$lookup': {
                'from': 'categories',
                'localField': 'product.category',
                'foreignField': '_id',
                'as': 'category'
            }
        }, {
            '$unwind': {
                'path': '$category'
            }
        }, {
            '$group': {
                '_id': '$category.name',
                'Sales': {
                    '$sum': {
                        '$sum': '$amount'
                    }
                },
                'turn over': {
                    '$sum': {
                        '$sum': '$totalPriceOrderItem'
                    }
                }
            }
        }
    ])

    res.status(StatusCodes.OK).json({ stats: result })
}
const getCustomers = async (req, res) => {
    const customers = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$user._id",
                name: { $first: "$user.name" },
                email: { $first: "$user.email" },
                city: { $first: "$user.city" },
                image: { $first: "$user.image" }
            }
        }
    ])
    res.status(StatusCodes.OK).json({ customers })
}
const getTopProducts = async (limit, date) => {
    const startOfMonth = date ? new Date(date) : new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = date ? new Date(date) : new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(1);
    endOfMonth.setHours(0, 0, 0, 0);
    return Order.aggregate([
        {
            $match: {
                "createdAt": {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },
        {
            $unwind: {
                path: "$orderItems",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$orderItems.product",
                totalOrders: { $sum: "$orderItems.amount" },
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            }
        },
        {
            $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $project: {
                _id: "$_id",
                name: '$product.name',
                image: "$product.mainImage",
                price: '$product.price',
                totalOrders: "$totalOrders",
            }
        },
        {
            $sort: {
                totalOrders: -1
            }
        },
        {
            $limit: limit
        }
    ])
}
const getCustomersByCity = async () => {
    const totalCustomersByCity = await Order.aggregate([
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$unwind': {
                'path': '$user',
                'preserveNullAndEmptyArrays': false
            }
        },
        {
            $group: {
                _id: "$user.city",
                customers: {
                    $addToSet: "$user._id"
                }
            }
        }
    ])
    if (totalCustomersByCity.length === 0) {
        return []
    }
    const avgCustomersByCity = totalCustomersByCity.map((item) => {
        return { city: item._id, avg: (item.customers.length / totalCustomersByCity.length) * 100 }
    })
    return avgCustomersByCity
}
const setupDashboard = async (req, res) => {
    let [{ avgRating }] = await getAverageRating()
    let [{ totalOrders, totalPrice }] = await Order.getTotalOrders()
    let customers = (await Order.find({}).distinct('user')).length
    const avgCustomersByCity = await getCustomersByCity()
    res.status(StatusCodes.OK).json({ avgRating, totalOrders, totalPrice, totalCustomers: customers, avgCustomersByCity })
}
const getStats = async (req, res) => {
    const date = req.params.date;
    const [{ totalOrders, totalPrice }] = await Order.getTotalOrders(false, date)
    let totalOrdersByDate = await Order.getTotalOrders(true, date)
    const topProducts = await getTopProducts(5, date)
    res.status(StatusCodes.OK).json({ totalOrdersByDate, topProducts, totalOrders, totalPrice })
}
const getProductOrders = async (req, res) => {
    const { i: productId, d: date } = req.query
    const orders = await Order.getTotalOrders(true, date, productId)
    res.status(StatusCodes.OK).json({ orders })
}
export {
    checkCart,
    createOrder,
    getAllOrders,
    getTotalOrdersByCategory,
    getFilteredOrders,
    getCustomers,
    setupDashboard,
    getStats,
    getProductOrders
}


