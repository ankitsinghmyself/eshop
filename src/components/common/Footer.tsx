import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        background: "var(--primary-gradient)",
      }}
      color={(theme) => (theme.palette.mode === "light" ? "black" : "white")}
    >
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} eshop. All rights reserved.
      </Typography>
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Link
          href="https://ankitsinghmyself.vercel.app/"
          color="inherit"
          sx={{ mx: 1 }}
        >
          Developed and Designed by Ankit
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
