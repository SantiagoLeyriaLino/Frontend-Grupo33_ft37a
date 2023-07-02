import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Slice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    isLoading: false,
    error: false,
    filterProducts: [],
    productsSearch: [],
    nameSearch: "",
    renderProducts: [],
    totalPay: 0,
    desc:0,
    cupon:false,
    arrayPrice: []
  },
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
      state.filterProducts = []
      state.renderProducts = []
      state.error = false;
    },
    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.filterProducts = [];
      state.allProducts = action.payload;
    },
    getProductsFilterSuccess: (state, action) => {
      state.isLoading = false;
      state.filterProducts = action.payload;
    },
    searchProductsSuccess: (state, action) => {
      state.isLoading = false;
      console.log('esto se esta ejecuatando')
      state.productsSearch = action.payload.allProducts;
      state.nameSearch = action.payload.name
      state.filterProducts = action.payload.allProducts;
    },
    productsRenderPerPage: (state, action) => {
      console.log({ ESTOESLOQUELLEGAARENDER: action.payload })
      state.renderProducts = action.payload
    },
    clearRender: (state, action) => {
      state.filterProducts = []
      state.renderProducts = []
    },
    clearSearch: (state, action) => {
      state.productsSearch = []
    },
    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log('ACA KAPO """"""""""""""""""""""""""""')
    },
    addTotalPay: (state, action) => {
      state.totalPay = action.payload;
      state.desc = Math.round(action.payload*0.15)
    },
    changeCupon:(state,action)=>{
      state.cupon = action.payload
    },
    addArrayPrice: (state, action) => {
      console.log(action.payload.id);
      const newArray = state.arrayPrice.filter(price => price.id !== action.payload.id)
      console.log(newArray);
      state.arrayPrice = [...newArray,action.payload]
    },
  },
});

export const { getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  getProductsFilterSuccess,
  clearRender, clearSearch,
  searchProductsSuccess,
  productsRenderPerPage,
  addTotalPay,
  changeCupon,
  addArrayPrice,
 } = Slice.actions;

export const getProducts = (gender, category) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-33ft37a-deploy.vercel.app/products";
    if (gender && category) {
      const query = { gender, category };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    const allProducts = response.data;
    dispatch(getProductsSuccess(allProducts));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const getFilterProducts = (gender, category, brand, color, name, price) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-33ft37a-deploy.vercel.app/products";
    if ((gender && category) || (brand || color || name || price)) {
      const query = { gender, category, brand, color, name, price };
      const queryString = Object.entries(query)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `/search?${queryString}`;
    }
    const response = await axios.get(url);
    console.log(URL + url)
    const allProducts = response.data;
    console.log({ FIJATEESTO: category })
    dispatch(clearRender())
    dispatch(getProductsFilterSuccess(allProducts));
  } catch (error) {
    console.log('ESTOESLOQUEBUSCASKAPO')
    dispatch(getProductsFailure(error.message));
  }
};

export const searchProducts = (name) => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    let url = "https://backend-33ft37a-deploy.vercel.app/products";

    if (name) {
      url += `/search?name=${name}`;
    }
    const response = await axios.get(url);
    let allProducts = response.data;
    console.log({ FIJATEESTO: name })
    dispatch(clearSearch())
    dispatch(searchProductsSuccess({ allProducts: allProducts, name: name }));
  } catch (error) {
    console.log('ACA')
    dispatch(getProductsFailure(error.message));
  }
};

export const getProductsRender = (products) => (dispatch) => {
  dispatch(productsRenderPerPage(products))
}

export const clearState = () => (dispatch) => {
  dispatch(clearRender())
}

export default Slice.reducer;