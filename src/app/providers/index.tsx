"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/main/navigation/Navbar";
import store from "@/utils/redux/store";
import { createTheme, ThemeProvider } from "@mui/material";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#61a146",
      },
      background: {
        default: "#f5f5f5",
      },
      text: {
        primary: "#333333",
        secondary: "#999999",
      },
      action: {
        disabledBackground: "#f5f5f5",
      },
      divider: "#e5e5e5",
      mode: "light",
    },
    typography: {
      fontFamily: "Lato, sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="z-[99999]">
          <Toaster position="top-center" reverseOrder={false} />
        </div>
          <Navbar />
            {children} 
          <Footer />
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
