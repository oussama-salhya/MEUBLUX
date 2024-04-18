import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide product name'],
            maxlength: [100, 'Name can not be more than 100 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            maxlength: [1000, 'Description can not be more than 1000 characters'],
        },
        mainImage: {
            type: String,
            default: '/uploads/example.jpeg',
        },
        images: {
            type: [String]
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Please provide product category'],
        },
        company: {
            type: String,
            required: [true, 'Please provide company'],
        },
        colors: {
            type: [String],
            default: ['#222'],
            required: true,
        },
        stock: {
            type: Number,
            required: true
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
});

ProductSchema.statics.getMaxPriceOfProducts = async function (queryObject) {
    const result = await this.aggregate([{
        $match: queryObject
    }, {
        $group: {
            _id: null,
            maxPrice: {
                $max: '$price'
            }
        }
    }])

    return result.length > 0 ? result[0].maxPrice : 0
}

ProductSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id });
});

export default mongoose.model('Product', ProductSchema);
