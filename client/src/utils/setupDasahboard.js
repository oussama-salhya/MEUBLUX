import { GrCart } from 'react-icons/gr'
import { IoIosPricetag } from 'react-icons/io'
import { GoPerson } from 'react-icons/go'
import { MdOutlineRateReview } from 'react-icons/md'
import { Price, ProductAvatar } from '../components'
export const getListIntro = (info, date) => {
    return [
        {
            title: "sales",
            value: info.totalOrders,
            description: date.split('-').reverse().join('/'),
            icon: <GrCart />
        },
        {
            title: "revenue",
            value: <Price price={info.totalPrice} />,
            description: date.split('-').reverse().join('/'),
            icon: <IoIosPricetag />,
        },
        {
            title: 'customers',
            value: info.totalCustomers,
            description: "Since our first start",
            icon: <GoPerson />
        },
        {
            title: 'average rating',
            value: parseFloat(info.avgRating).toFixed(2),
            description: "Since our first start",
            icon: <MdOutlineRateReview />
        }
    ]
}

export const getOrdersByDate = (list) => {

}

export const getTopProducts = (list) => {
    return list.map((item) => {
        return {
            product: <ProductAvatar {...item} />,
            amount: item.totalOrders
        }
    })
}

