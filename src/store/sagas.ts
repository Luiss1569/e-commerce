import { all } from "redux-saga/effects";

import categoriesSaga from "./categories/saga";
import userSaga from "./user/saga";
import productsSaga from "./products/saga";
import cartSaga from "./cart/saga";
import purchaseSaga from "./purchases/saga";
import cardSaga from "./card/saga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    categoriesSaga(),
    productsSaga(),
    cartSaga(),
    cardSaga(),
    purchaseSaga(),
  ]);
}
