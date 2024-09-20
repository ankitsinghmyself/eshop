import React from "react";
import Button from "@mui/material/Button";

export default function PrimaryButton(props) {
  return (
    <Button variant="contained" sx={{
        color: "#fff",
        textTransform: "uppercase",
        backgroundColor: "var(--secondary-color)",
        borderColor: "var(--primary-color)",
        "&:hover": {
          backgroundColor: "var(--secondary-color)",
          borderColor: "var(--primary-color)",
        },
      }} {...props}>
      {props.children}
    </Button>
  );
}
