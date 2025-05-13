"use client";

import { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

interface AuthModalManagerProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModalManager({ open, onClose }: AuthModalManagerProps) {
  const [view, setView] = useState<"signIn" | "signUp">("signIn");

  const handleClose = () => {
    setView("signIn");
    onClose();
  };

  return (
    <>
      {view === "signIn" && (
        <SignInModal
          open={open}
          onClose={handleClose}
          switchToSignUp={() => setView("signUp")}
        />
      )}
      {view === "signUp" && (
        <SignUpModal
          open={open}
          onClose={handleClose}
          switchToSignIn={() => setView("signIn")}
        />
      )}
    </>
  );
}
