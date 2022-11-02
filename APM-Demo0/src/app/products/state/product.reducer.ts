import { ProductPageActions, ProductAPIActions } from './actions';
import { Product } from '../product';
import { createReducer, on } from '@ngrx/store';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: false,
  currentProductId: null,
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductAPIActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductAPIActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  })
);
