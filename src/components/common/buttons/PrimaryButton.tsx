import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        color: "#fff",
        textTransform: "none",
        background: "var(--secondary-gradient)",
        "&:hover": {
          background: "linear-gradient(120deg, #3d692c 0%, #61a146 100%)",
        },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
