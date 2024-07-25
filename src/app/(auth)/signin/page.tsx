"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const items = useSelector((state: RootState) => state.cart.items);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sign in using credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      toast.success("Sign in successful!");
      if (items.length > 0) {
        try {
          await fetch("/api/cart/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }), // No need to parse JSON again
          });
          // Optionally: You can add a success toast or message here
        } catch (error) {
          console.error("Error saving cart items:", error);
          toast.error("Error saving cart items.");
        }
      }

      // Redirect to the dashboard page (replace '/dashboard' with your desired path)
      window.location.href = "/dashboard";
    } else {
      toast.error("Sign in failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => signIn("google")}>Sign In with Google</button>
      <p>
        Don't have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
