import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//  thunk function
export const getWeather = createAsyncThunk("getWeaherThunk", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=31.898043&lon=35.204269&appid=e0c0ed54a37f0444ba95f174ab44dc20"
  );
  const currentTemp = Math.round(response.data.main.temp - 272.15);
  const maxTemp = Math.round(response.data.main.temp_max - 272.15);
  const minTemp = Math.round(response.data.main.temp_min - 272.15);
  const desc = response.data.weather[0].description;
  const weatherStatusIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  return { currentTemp, maxTemp, minTemp, desc, weatherStatusIcon }; // this return go to the action in payload
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    isLoading: false,
  },
  reducers: {
    weatherChange: (state, action) => {
        // this sync code  
        state.weather = "notEmpty";
    },
  },
  extraReducers: (builder) => {
    // this async code 
    builder
      .addCase(getWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoading = false;
      });
  },
});

export const { weatherChange } = weatherSlice.actions;

export default weatherSlice.reducer;
