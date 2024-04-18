
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createReviewThunk, deleteReviewThunk, getAllReviewsThunk, getSingleProductReviewsThunk, updateReviewThunk } from "./reviewsThunk"

const initialState = {
    reviews: [],
    singleProductId: localStorage.getItem('singleProductId') ? JSON.parse(localStorage.getItem('singleProductId')) : '',
    isLoading: false,
    showError: false,
    numOfReviews: 0,
    reviewsGroupedByRating: [],
    averageRating: 0,
    comment: '',
    rating: 0,
    msg: '',
    isEditing: false,
    idReview: '',
}
export const getAllReviews = createAsyncThunk('reviews/getAllReviews', getAllReviewsThunk)
export const getSingleProductReviews = createAsyncThunk('/reviews/getSingleProductReviews', getSingleProductReviewsThunk)
export const deleteReview = createAsyncThunk('/reviews/deleteReview', deleteReviewThunk)
export const updateReview = createAsyncThunk('/reviews/updateReview', updateReviewThunk)
export const createReview = createAsyncThunk('/reviews/createReview', createReviewThunk)
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setSingleProductId: (state, { payload: id }) => {
            state.singleProductId = id;
        },
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value
        },
        triggerUpdateReview: (state, { payload: reviewId }) => {
            const review = state.reviews.find(review => review._id === reviewId)
            state.comment = review.comment
            state.rating = review.rating;
            state.isEditing = true
            state.idReview = reviewId
        },
        cleanReviewForm: (state) => {
            state.comment = "";
            state.isEditing = false;
            state.rating = 0;
            state.idReview = ''
        },
        displayError: (state) => {
            state.showError = true
        },
        hideError: (state) => {
            state.showError = false
            state.msg = ''
        },
    },
    extraReducers: {
        [getAllReviews.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllReviews.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.reviews = payload.reviews;
            state.numOfReviews = payload.numOfReviews
            state.reviewsGroupedByRating = payload.reviewsGrouped
            state.averageRating = payload.averageRating
        },
        [getAllReviews.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
        [getSingleProductReviews.pending]: (state) => {
            state.isLoading = true;

        },
        [getSingleProductReviews.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.reviews = payload.reviews;
            state.numOfReviews = payload.numOfReviews
            state.reviewsGroupedByRating = payload.reviewsGrouped
            state.averageRating = payload.averageRating
        },
        [getSingleProductReviews.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
        [createReview.pending]: (state) => {
            state.isLoading = true;
        },
        [createReview.fulfilled]: (state, { payload: review }) => {
            state.isLoading = false;
            state.comment = "";
            state.rating = 0;
            state.reviews.unshift(review)
            state.numOfReviews = state.numOfReviews + 1;
        },
        [createReview.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.msg = payload;
        },
        [deleteReview.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteReview.fulfilled]: (state, { payload: numOfReviews }) => {
            state.isLoading = false;
            state.numOfReviews = numOfReviews;
            state.reviews.shift()
        },
        [deleteReview.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.msg = payload
        },
        [updateReview.pending]: (state) => {
            state.isLoading = true;
        },
        [updateReview.fulfilled]: (state, { payload: review }) => {
            state.isLoading = false;
            state.comment = "";
            state.rating = 0;
            state.isEditing = false
            state.idReview = ''
            state.reviews[0] = review
        },
        [updateReview.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },


    }
})

export const { setSingleProductId, handleChange, triggerUpdateReview, cleanReviewForm, displayError, hideError } = reviewsSlice.actions
export default reviewsSlice.reducer