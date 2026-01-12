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

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

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
