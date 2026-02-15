"use client";

import Footer from "@/components/common/Footer";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import store from "@/utils/redux/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import React, { useState, useMemo, useEffect } from "react";
import { createAppTheme } from "@/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        shape: {
          borderRadius: 10,
        },
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#61a146",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#3d692c",
          },
          background: {
            default: darkMode ? "#0f1710" : "#f4f8f2",
            paper: darkMode ? "#1a251b" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#eaf4e6" : "#1c2b18",
            secondary: darkMode ? "#b5c6ae" : "#4d6047",
          },
          action: {
            disabledBackground: darkMode ? "#233526" : "#d8e7d1",
          },
          divider: darkMode ? "#2f4232" : "#d3e3cc",
        },
        typography: {
          fontFamily: "Lato, sans-serif",
          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
                paddingInline: 18,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 14,
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <div className="z-[99999]">
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: darkMode ? '#262626' : '#ffffff',
                color: darkMode ? '#fafafa' : '#171717',
                border: `1px solid ${darkMode ? '#404040' : '#e5e5e5'}`,
                borderRadius: '8px',
                fontSize: '14px',
              },
            }}
          />
        </div>
        <ResponsiveNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          {children}
        </main>
        <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
