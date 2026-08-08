import { createSlice } from "@reduxjs/toolkit";


const getInitialDarkMode = () => {
    const darkMode = localStorage.getItem("darkMode");
    return darkMode ? JSON.parse(darkMode) : false;
}

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isDarkMode: getInitialDarkMode(),
        isLoading: false
    },
    reducers: {
        toggleDarkMode: (state) => {
            localStorage.setItem("darkMode", JSON.stringify(!state.isDarkMode));
            state.isDarkMode = !state.isDarkMode;
        },
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { toggleDarkMode, startLoading, stopLoading } = uiSlice.actions;