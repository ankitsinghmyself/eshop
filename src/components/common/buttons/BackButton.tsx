import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}
