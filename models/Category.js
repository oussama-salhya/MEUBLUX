import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, 'Please provide a unique name'],
        required: [true, 'Please provide category name'],
        maxlength: [100, 'Name can not be more than 100 characters'],
    },
    image: {
        type: String,
        required: [true, 'Please provide category image'],
    }
})

categorySchema.pre('save', function () {
    console.log(this.aggregate);
    this.name = this.name.toLowerCase()
})
categorySchema.pre('remove', async function () {
    console.log(this.aggregate);
    await this.model('Product').deleteMany({ category: this._id })
})


export default mongoose.model('Category', categorySchema)