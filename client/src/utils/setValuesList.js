import { Price } from '../components'
import ActionsButtons from '../components/ActionsButtons'
import ProductAvatar from '../components/ProductAvatar'
import { deleteCategory, triggerUpdateCategory, updateCategory } from '../Features/categories/categoriesSlice'
import { deleteProduct, getSingleProduct } from '../Features/products/ProductsSlice'
import { getSingleProductReviews, setSingleProductId } from '../Features/reviews/reviewsSlice'
import formatPrice from './formatPrice'


const modelKeys = {
    category: ["name", "action"],
    product: ['item', 'category', 'company', 'rating', 'stock', 'action'],
    order: ['item', 'category', 'Sales', 'turn over'],
    customer: ['image', 'name', 'city', 'email']
}

const modelActions = {
    category: [
        {
            label: 'update',
            onClick: triggerUpdateCategory
        },
        {
            label: 'delete',
            onClick: deleteCategory
        }
    ],
    product: [
        {
            label: 'update',
            onClick: getSingleProduct
        },
        {
            label: 'see details',
            onClick: setSingleProductId,
        },
        {
            label: 'delete',
            onClick: deleteProduct
        }

    ]

}

const getKeysAndValuesList = (modelName, modelData, additionalModalActions) => {
    const keysList = modelKeys[modelName]
    const valuesList = modelData.map((item, index) => {
        const { _id: id } = item
        const modelItem = keysList.reduce((result, key) => {
            if (key === 'action') {
                let actions = modelActions[modelName]
                result[key] = <ActionsButtons id={id} modelName={modelName} isLast={index == modelData.length - 1} actionsList={actions} />
            }
            else if (key === 'item') {
                result[key] = <ProductAvatar name={item.name} price={item.price} image={item.image || item.mainImage} />
            }
            else if (key === 'category' && modelName === 'product') {
                result[key] = item[key].name
            }
            else if (key === 'rating') {
                result[key] = item['averageRating']
            }
            else if (key === 'turn over') {
                result[key] = <Price price={item[key]} />
            }
            else {
                result[key] = item[key]
            }
            return result
        }, {})
        return modelItem
    })
    return { keysList, valuesList }
}

export default getKeysAndValuesList