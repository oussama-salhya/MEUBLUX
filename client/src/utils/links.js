import { GrCart } from 'react-icons/gr'
import { FaClipboardList } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiHomeAlt, BiCartAlt } from 'react-icons/bi'
import { HiChevronRight } from 'react-icons/hi'
const links = [
    {
        icon: <BiHomeAlt />,
        label: "dashboard",
        path: '/dashboard'
    },
    {
        icon: <BiCartAlt />,
        groupLabel: 'Products',
        subLinks: [
            {
                label: 'List',
                path: '/dashboard/products',
            },
            {
                label: 'Add Product',
                path: '/dashboard/add-product'
            }
        ]
    },
    {
        icon: <FaClipboardList />,
        label: 'orders',
        path: '/dashboard/orders'
    },
    {
        icon: <BsFillPersonFill />,
        label: 'customers',
        path: '/dashboard/customers'
    },
    {
        icon: <BiCategoryAlt />,
        label: 'categories',
        path: '/dashboard/categories'
    }
]


export default links