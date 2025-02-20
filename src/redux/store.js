import { configureStore } from "@reduxjs/toolkit";

import certificateSlice from "./certificateSlice";



const store = configureStore({

 reducer: {

  certificate: certificateSlice,

 },

});



export default store;