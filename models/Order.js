import mongoose from "mongoose";

const orderItem = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});




const OrderSchema = mongoose.Schema({
    total: {
        type: Number,
        default: 0,
    },
    orderItems: [orderItem],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    paymentIntentId: {
        type: String,
        required: [true, 'the id of the payment intent is required']
    },
}, { timestamps: true })

OrderSchema.statics.getTotalOrders = async function (groupByday, date, productId) {
    const startOfMonth = date ? new Date(date) : new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = date ? new Date(date) : new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(1);
    endOfMonth.setHours(0, 0, 0, 0);
    const condition = productId ? {
        'orderItems.product': mongoose.Types.ObjectId(productId),
        "createdAt": {
            $gte: startOfMonth,
            $lt: endOfMonth
        }
    } : {
        "createdAt": {
            $gte: startOfMonth,
            $lt: endOfMonth
        }
    }
    let result = await this.aggregate([
        {
            $match: condition
        },
        {
            $unwind: {
                path: "$orderItems",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: groupByday ? { $dateToString: { format: "%d", date: "$createdAt" } } : null,
                totalOrders: { $sum: "$orderItems.amount" },
                totalPrice: { $sum: { $multiply: ["$orderItems.amount", "$orderItems.price"] } }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ])
    if (result.length === 0 && !groupByday) {
        result = [{ totalOrders: 0, totalPrice: 0 }]
    }
    return result
}

export default mongoose.model('Order', OrderSchema)