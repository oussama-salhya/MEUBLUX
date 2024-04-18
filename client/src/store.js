import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Features/cart/cartSlice";
import categoriesSlice from "./Features/categories/categoriesSlice";
import orderSlice from "./Features/orders/orderSlice";
import productsSlice from "./Features/products/ProductsSlice";
import reviewsSlice from "./Features/reviews/reviewsSlice";
import userSlice from "./Features/user/userSlice";
const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice,
        cart: cartSlice,
        reviews: reviewsSlice,
        orders: orderSlice,
        categories: categoriesSlice
    }
})

export default store