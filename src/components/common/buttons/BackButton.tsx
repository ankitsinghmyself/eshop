import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} style={styles.button}>
      Back
    </button>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "var(--secondary-color)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
