"use client";

import Footer from "@/components/common/Footer";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import store from "@/utils/redux/store";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import React, { useState, useMemo } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#fff",
          },
          secondary: {
            main: "#61a146",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#333333",
            secondary: "#999999",
          },
          action: {
            disabledBackground: "#f5f5f5",
          },
          divider: "#e5e5e5",
        },
        typography: {
          fontFamily: "Lato, sans-serif",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <div className="z-[99999]">
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <ResponsiveNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {children}
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
