import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductThunk,
  deleteProductThunk,
  editProductThunk,
  getAllProductsThunk,
  getFilteredProductsThunk,
  getSearchSuggestionsThunk,
  getSingleProductThunk,
  uploadImagesThunk,
} from "./productsThunk";

const initialFilters = {
  search: "",
  sort: "latest",
  price: 0,
  companies: [],
  categories: [],
  colors: [],
  page: 1,
};
const singleProduct = {
  images: [],
  mainImgIndex: 0,
  name: "",
  description: "",
  price: 0,
  category: "",
  company: "",
  stock: 0,
};
const initialState = {
  isLoading: false,
  isEditing: false,
  showMsg: false,
  showError: false,
  msg: "",
  products: [],
  totalProducts: 0,
  categoriesOptions: [],
  companiesOptions: [],
  sortOptions: ["latest", "lower price", "highest price"],
  maxPrice: 0,
  numOfPages: 0,
  progressPercentage: "0%",
  singleProduct,
  actions: {
    id: "",
    isOpen: false,
  },
  filtersMenu: {
    id: "",
    isOpen: false,
  },
  searchSuggestions: {
    completions: [],
    products: [],
  },
  isFetching: true,
  ...initialFilters,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  getAllProductsThunk
);
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  getSingleProductThunk
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  createProductThunk
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  editProductThunk
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  deleteProductThunk
);
export const getFilteredProducts = createAsyncThunk(
  "/products/getFilteredProducts",
  getFilteredProductsThunk
);
export const getSearchSuggestions = createAsyncThunk(
  "/products/getSearchSuggestions",
  getSearchSuggestionsThunk
);
const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value, changeProduct } }) => {
      if (!changeProduct) {
        // in case the field is an array
        if (Array.isArray(state[name])) {
          state[name] = [value];
        } else {
          state[name] = value;
        }
      } else {
        state.singleProduct[name] = value;
      }
    },
    handleSearchBar: (state, { payload: value }) => {
      state.search = value;
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFilters,
        search: state.search,
        price: state.maxPrice,
      };
    },
    clearSingleProductValues: (state) => {
      return { ...state, isEditing: false, singleProduct };
    },
    addFilter: (state, { payload: { name, value } }) => {
      if (name === "sort" || name === "price") {
        return { ...state, [name]: value };
      }
      state[name].push(value);
    },
    removeFilter: (state, { payload: { name, value } }) => {
      state[name] = state[name].filter((item) => item !== value);
    },
    toggleFilter: (state, { payload: { name, value } }) => {
      state.page = 1;
      // in case the filter is a list
      if (Array.isArray(state[name])) {
        if (state[name].includes(value)) {
          // we will remove the filter because it exists
          state[name] = state[name].filter((item) => item !== value);
        } else {
          // we will then add filter
          state[name].push(value);
        }
      }
      // in case the filter is just an item
      else {
        state[name] = value;
      }
    },
    openActionsButton: (state, { payload: id }) => {
      state.actions.isOpen = true;
      state.actions.id = id;
    },
    closeActionsButton: (state) => {
      state.actions.isOpen = false;
    },
    openFilterMenu: (state, { payload: id }) => {
      state.filtersMenu.isOpen = true;
      state.filtersMenu.id = id;
    },
    closeFilterMenu: (state) => {
      state.filtersMenu.isOpen = false;
      state.filtersMenu.id = "";
    },
    changeSingleProductValues: (state, { payload: { name, value } }) => {
      state.singleProduct[name] = value;
    },
    appendImgtoSingleProductImages: (state, { payload: image }) => {
      const images = state.singleProduct.images;
      state.singleProduct.images = [...images, image];
    },
    deleteImgFromSingleProductImages: (state, { payload: id }) => {
      const images = state.singleProduct.images.filter(
        (item, index) => index !== id
      );
      state.singleProduct.images = images;
    },
    displayError: (state) => {
      state.showError = true;
    },
    hideError: (state) => {
      state.showError = false;
      state.msg = "";
    },
    hideMsg: (state) => {
      state.showMsg = false;
    },
    clearMsgContent: (state) => {
      state.msg = "";
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setupFilters: (state, { payload }) => {
      if (state.maxPrice !== Number(state.price)) {
        state.categoriesOptions = state.categoriesOptions.map((category) => {
          if (payload.categories.includes(category.name)) {
            return { name: category.name, enabled: true };
          }
          return { name: category.name, enabled: false };
        });
        state.companiesOptions = state.companiesOptions.map((company) => {
          if (!payload.companies.includes(company.name)) {
            return { name: company.name, enabled: false };
          }
          return { name: company.name, enabled: true };
        });
        return;
      } else {
        state.categoriesOptions = state.categoriesOptions.map((category) => ({
          ...category,
          enabled: true,
        }));
        state.companiesOptions = state.companiesOptions.map((company) => ({
          ...company,
          enabled: true,
        }));
      }

      if (state.categories.length) {
        state.companiesOptions = state.companiesOptions.map((company) => {
          if (!payload.companies.includes(company.name)) {
            return { name: company.name, enabled: false };
          }
          return { name: company.name, enabled: true };
        });
      }
      if (state.companies.length) {
        state.categoriesOptions = state.categoriesOptions.map((category) => {
          if (!payload.categories.includes(category.name)) {
            return { name: category.name, enabled: false };
          }
          return { name: category.name, enabled: true };
        });
      }
      state.companies = state.companies.filter((company) =>
        payload.companies.includes(company)
      );
      state.categories = state.categories.filter((category) =>
        payload.categories.includes(category)
      );
    },
    changeSingleProductRating: (
      state,
      { payload: { numOfReviews, averageRating } }
    ) => {
      state.singleProduct.numOfReviews = numOfReviews;
      state.singleProduct.averageRating = averageRating;
    },
    setProgressPercentage: (state, { payload: { loaded, size } }) => {
      state.progressPercentage = `${Math.round((loaded * 100) / size)}%`;
    },
    setFilter: (state, { payload: { name, value } }) => {
      if (name !== "page") {
        state.page = 1;
      }
      if (Array.isArray(state[name])) {
        state[name] = [value];
      } else {
        state[name] = value;
      }
    },
    incrementPage: (state) => {
      if (state.numOfPages < state.page + 1) {
        return;
      }
      state.page = state.page + 1;
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.categoriesOptions = payload.categories.map((category) => ({
        name: category,
        enabled: true,
      }));
      state.companiesOptions = payload.companies.map((company) => ({
        name: company,
        enabled: true,
      }));
      state.numOfPages = payload.numOfPages;
      state.totalProducts = payload.totalProducts;
      state.maxPrice = payload.maxPrice;
      state.price = payload.maxPrice;
      state.page = 1;
      if (payload.categories.length === 1) {
        state.categories = [payload.categories];
      }
      if (payload.companies.length === 1) {
        state.companies = [payload.companies];
      }
      state.progressPercentage = "0%";
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getFilteredProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getFilteredProducts.fulfilled]: (state, { payload }) => {
      state.totalProducts = payload.totalProducts;
      state.numOfPages = payload.numOfPages;
      // state.isLoading = false;
      if (state.page > 1) {
        state.products.push(...payload.products);
      } else {
        state.products = payload.products;
      }
    },
    [getFilteredProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state.singleProduct = payload.product;
      state.isLoading = false;
    },
    [getSingleProduct.rejected]: (state, { payload }) => {
      state.showError = true;
      state.isLoading = false;
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state) => {
      state.singleProduct = singleProduct;
      state.showMsg = true;
      state.msg = "product has been created successfully";
      state.isLoading = false;
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.showMsg = true;
      state.showError = true;
      state.msg = payload;
      state.isLoading = false;
    },
    [editProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editProduct.fulfilled]: (state) => {
      state.showMsg = true;
      state.msg = "Your changes has been saved";
      state.isEditing = false;
      state.isLoading = false;
      state.singleProduct = singleProduct;
    },
    [editProduct.rejected]: (state, { payload }) => {
      state.showMsg = true;
      state.showError = true;
      state.msg = payload;
      state.isLoading = false;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.showMsg = true;
      state.msg = "the product has been deleted successfully";
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.showMsg = true;
      state.showError = true;
      state.msg = payload;
    },
    [getSearchSuggestions.fulfilled]: (state, { payload }) => {
      state.searchSuggestions = payload;
    },
  },
});

export const {
  setFilter,
  incrementPage,
  setProgressPercentage,
  changeSingleProductRating,
  setupFilters,
  handleChange,
  handleSearchBar,
  hideMsg,
  clearMsgContent,
  displayError,
  hideError,
  openFilterMenu,
  closeFilterMenu,
  toggleFilter,
  clearFilters,
  clearSingleProductValues,
  openActionsButton,
  closeActionsButton,
  appendImgtoSingleProductImages,
  changeSingleProductValues,
  deleteImgFromSingleProductImages,
  showLoading,
  hideLoading,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
