"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/navigation/Navbar";
import ProductsList from "@/components/products/ProductsList";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
export default function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
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
    <ThemeProvider theme={theme} 
    >
      <Navbar />
      <div style={{ padding: "6rem 2rem" }} 
      >
        <ProductsList />
      </div>
      <Footer />
    </ThemeProvider>
  );
}
