import CircularChart from "@/components/common/charts/CircularChart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

type DashboardProps = {
  onSelect: (item: "Users" | "ManageProducts") => void;
};

const metricCardSx = {
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0 10px 24px rgba(61, 105, 44, 0.08)",
  borderRadius: 3,
  height: "100%",
};

const AdminDashboard: React.FC<DashboardProps> = ({ onSelect }) => {
  const [activeProducts, setActiveProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch("/api/products/getAllProducts"),
          fetch("/api/user"),
        ]);

        const products = productsRes.ok ? await productsRes.json() : [];
        const users = usersRes.ok ? await usersRes.json() : [];

        setTotalProducts(products.length);
        setActiveProducts(products.filter((p: { isActive: boolean }) => p.isActive).length);
        setTotalUsers(users.length);
      } catch (error) {
        console.error("Failed to load dashboard metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const inactiveProducts = useMemo(
    () => Math.max(0, totalProducts - activeProducts),
    [activeProducts, totalProducts]
  );
  const activeRatio = useMemo(
    () => (totalProducts === 0 ? 0 : Math.round((activeProducts / totalProducts) * 100)),
    [activeProducts, totalProducts]
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
        Admin Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Monitor users, product health, and catalog activity.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={metricCardSx}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Products
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {loading ? "..." : totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={metricCardSx}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Active Products
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {loading ? "..." : activeProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={metricCardSx}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Inactive Products
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {loading ? "..." : inactiveProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={metricCardSx}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {loading ? "..." : totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ ...metricCardSx, minHeight: 340 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                Catalog Activity
              </Typography>
              <Box sx={{ maxWidth: 320, mx: "auto" }}>
                <CircularChart
                  activeProducts={activeProducts}
                  totalProducts={Math.max(1, totalProducts)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ ...metricCardSx, minHeight: 340 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                Quick Actions
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Active ratio: {activeRatio}% of your product catalog.
              </Typography>
              <Stack spacing={1.5}>
                <Button variant="contained" color="secondary" onClick={() => onSelect("ManageProducts")}>
                  Manage Products
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onSelect("Users")}>
                  Manage Users
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default AdminDashboard;
