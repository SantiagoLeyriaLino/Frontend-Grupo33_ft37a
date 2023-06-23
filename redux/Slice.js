import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Slice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    isLoading: false,
    error: null,
    filterProducts:[],
    productsSearch:[],
    nameSearch:""
  },
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    },
    getProductsFilterSuccess: (state, action) =>{
      state.isLoading = false;
      state.filterProducts = action.payload;
    },
    searchProductsSuccess: (state, action) =>{
      state.isLoading = false;
      state.productsSearch = action.payload.allProducts;
      state.nameSearch = action.payload.name
      state.filterProducts = action.payload.allProducts;
    },
    clearRender: (state, action) =>{
      state.filterProducts = []
    },
    clearSearch:(state, action) =>{
      state.productsSearch = []
    },
    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure, getProductsFilterSuccess, clearRender, clearSearch, searchProductsSuccess } =
  Slice.actions;

export const getProducts = (gender, category) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-grupo-33ft37a.vercel.app/products";
    if (gender && category) {
      const query = { gender, category };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    const allProducts = response.data.documents;
    dispatch(getProductsSuccess(allProducts));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const getFilterProducts = (gender, category, brand, color, name) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-grupo-33ft37a.vercel.app/products";
    if ((gender && category) || (brand || color || name )) {
      const query = { gender, category, brand, color, name };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    console.log(URL+url)
    const allProducts = response.data.documents;
    console.log({FIJATEESTO:category})
    dispatch(clearRender())
    dispatch(getProductsFilterSuccess(allProducts));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const searchProducts = (name) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-grupo-33ft37a.vercel.app/products";
  
    if (name) {
      url += `/search?name=${name}`;
    }
    const response = await axios.get(url);
    let allProducts = response.data.documents;
    console.log({FIJATEESTO:name})
    dispatch(clearSearch())
    dispatch(searchProductsSuccess({allProducts:allProducts, name:name}));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export default Slice.reducer;