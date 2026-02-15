import React from "react";
import { Box, Link, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 3, md: 3.5 },
        px: 2,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(247,251,244,0.95) 0%, rgba(234,243,229,0.95) 100%)",
      }}
      color="text.primary"
    >
      <Box className="page-shell" sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {"\u00A9"} {new Date().getFullYear()} eShop. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link
            href="https://ankitsinghmyself.vercel.app/"
            color="inherit"
            sx={{
              mx: 1,
              textDecorationColor: "transparent",
              "&:hover": { textDecorationColor: "currentColor" },
            }}
          >
            Developed and Designed by Ankit
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
