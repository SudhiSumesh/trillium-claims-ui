import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "./Login/login.reducer";
import priorReducer from "./PriorAuth/PriorAuthApis/prior.reducer";
import productionReducer from "./Production/productions.reducer";
import claimsReducer from "./Claim/claim.reducer";
import diagnosisReducer from "./Diagnosis/diagnosis.reducer";
import chargesReducer from "./Charges/charges.reducer";
const rootReducer = combineReducers({
  login: loginReducer,
  prior: priorReducer,
  production: productionReducer,
  claim: claimsReducer,
  diagnosis: diagnosisReducer,
  charges: chargesReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
