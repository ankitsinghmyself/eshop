"use client";
import { useSession, signOut } from "next-auth/react";
import { Grid, Box, Typography, Button } from "@mui/material";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Grid container justifyContent="center" alignItems="center" padding={4}>
      {session?.user && (
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome, {session.user.name}
          </Typography>
          <Box
            component="pre"
            sx={{
              textAlign: "left",
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 1,
              overflowX: "auto",
              mb: 3,
            }}
          >
            {JSON.stringify(session?.user, null, 2)}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut()}
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "gray",
              },
              color: "white",
              fontWeight: "bold",
              py: 1,
              px: 2,
              borderRadius: 1,
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Grid>
  );
}
