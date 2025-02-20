import { createSlice } from "@reduxjs/toolkit";



const initialState = {

  name: "",
  course: "",
  from: "",
  to: "",

};



const certificateSlice = createSlice({

  name: "certificate",

  initialState,

  reducers: {

    setCertificate: (state, action) => {

      state.name = action.payload.name;

      state.course = action.payload.course;
      state.from = action.payload.from;
      state.to = action.payload.to;

    },

    resetCertificate: (state) => {

      state.name = "";

      state.course = "";
      state.from = "";
      state.to = "";
    },

  },

});



export const { setCertificate, resetCertificate } = certificateSlice.actions;

export default certificateSlice.reducer;