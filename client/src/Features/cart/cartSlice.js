import { createSlice } from "@reduxjs/toolkit"


const getCartFromLocalStorage = () => {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

const initialState = {
    cartItems: getCartFromLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    showSmallMsg: false,
    smallMsg: '',
    showModal: false,
    amountItemsRefused: 0,
    itemAdded: {},
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseAmount: (state, { payload: { id } }) => {
            const newCart = state.cartItems.map(item => {
                const { amount, stock } = item
                if (item.id === id) {
                    return { ...item, amount: amount + 1 > stock ? amount : amount + 1 }
                }
                return item
            })
            state.cartItems = newCart
        },
        decreaseAmount: (state, { payload: { id } }) => {
            const newCart = state.cartItems.map(item => {
                const { amount } = item
                if (item.id === id) {
                    return { ...item, amount: amount - 1 <= 0 ? 1 : amount - 1 }
                }
                return item
            })
            state.cartItems = newCart
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, { payload: { id } }) => {
            const newCart = state.cartItems.filter(item => item.id !== id)
            state.cartItems = newCart
        },
        calculateTotal: (state) => {
            const { totalAmount, totalItems } = state.cartItems.reduce((total, item) => {
                total.totalItems += item.amount;
                total.totalAmount += item.amount * item.price
                return total;
            }, { totalAmount: 0, totalItems: 0 })
            return { ...state, totalAmount, totalItems }
        },
        addTocart: (state, { payload: { id, stock, name, price, amount, image } }) => {
            const tempItem = state.cartItems.find(item => item.id === id)
            let newCart = [...state.cartItems];
            state.itemAdded = { name, image, price, amount }
            if (tempItem) {
                newCart = state.cartItems.map((item) => {
                    if (item.id === id) {
                        if (amount + item.amount > item.stock) {
                            state.amountItemsRefused = amount + item.amount - item.stock
                            state.smallMsg = `only ${item.stock - item.amount} items available`
                            state.showSmallMsg = true
                            state.itemAdded = { name, image, price, amount: item.stock - item.amount }
                            return { ...item, amount: stock }
                        }
                        else {
                            return { ...item, amount: item.amount + amount }
                        }
                    }
                    return item
                })
            }
            else {
                newCart = [...newCart, { id, amount, stock, name, price, image }]
            }
            state.cartItems = newCart
            state.showModal = true
        },
        hideModal: (state) => {
            state.amountItemsRefused = 0;
            state.smallMsg = '';
            state.showSmallMsg = false;
            state.showModal = false
        }
    }
})

export const { addTocart, removeItem, clearCart, increaseAmount, decreaseAmount, calculateTotal, hideModal } = cartSlice.actions


export default cartSlice.reducer