import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Visibility,
  VisibilityOff,
  Refresh,
  CloudUpload
} from "@mui/icons-material";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  details?: string;
  price: number;
  img: string;
  quantity: number;
  isActive: boolean;
}

const initialForm = {
  name: "",
  details: "",
  price: "",
  img: "",
  quantity: "",
  isActive: true,
};

const ManageProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products/getAllProducts");
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const key = search.trim().toLowerCase();
    if (!key) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(key) ||
        product.details?.toLowerCase().includes(key)
    );
  }, [products, search]);

  const resetForm = () => {
    setForm(initialForm);
    setEditProductId(null);
  };

  const validateRequired = () =>
    form.name && form.img && Number(form.price) > 0 && Number(form.quantity) >= 0;

  const handleAddProduct = async () => {
    if (!validateRequired()) {
      toast.error("Fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          details: form.details,
          price: Number(form.price),
          img: form.img,
          quantity: Number(form.quantity),
          isActive: form.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create product");
      }
      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
      resetForm();
      toast.success("Product added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editProductId || !validateRequired()) {
      toast.error("Fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editProductId,
          updateData: {
            name: form.name,
            details: form.details,
            price: Number(form.price),
            img: form.img,
            quantity: Number(form.quantity),
            isActive: form.isActive,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update product");
      }
      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product.id === editProductId ? updatedProduct : product))
      );
      resetForm();
      toast.success("Product updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        throw new Error("Unable to delete product");
      }
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditProductId(product.id);
    setForm({
      name: product.name,
      details: product.details || "",
      price: String(product.price),
      img: product.img,
      quantity: String(product.quantity),
      isActive: product.isActive,
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
        Product Management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create, update, and monitor inventory status in one place.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              {editProductId ? "Edit Product" : "Add Product"}
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                label="Product Name *"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <TextField
                label="Details"
                value={form.details}
                onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                multiline
                minRows={2}
              />
              <TextField
                label="Price *"
                value={form.price}
                type="number"
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              />
              <TextField
                label="Image URL *"
                value={form.img}
                onChange={(e) => setForm((prev) => ({ ...prev, img: e.target.value }))}
              />
              <TextField
                label="Quantity *"
                value={form.quantity}
                type="number"
                onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, isActive: e.target.checked }))
                    }
                  />
                }
                label="Active"
              />
              {form.img ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src={form.img} variant="rounded" sx={{ width: 72, height: 72 }} />
                  <Typography variant="body2" color="text.secondary">
                    Image preview
                  </Typography>
                </Box>
              ) : null}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={editProductId ? handleUpdateProduct : handleAddProduct}
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editProductId
                    ? "Update Product"
                    : "Add Product"}
                </Button>
                {editProductId ? (
                  <Button variant="outlined" color="secondary" onClick={resetForm}>
                    Cancel
                  </Button>
                ) : null}
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Products ({filteredProducts.length})
              </Typography>
              <TextField
                size="small"
                label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Stack>

            <Stack spacing={1}>
              {loading ? (
                <Typography color="text.secondary">Loading products...</Typography>
              ) : filteredProducts.length === 0 ? (
                <Typography color="text.secondary">No products found.</Typography>
              ) : (
                filteredProducts.map((product) => (
                  <Paper
                    key={product.id}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        variant="rounded"
                        src={product.img}
                        alt={product.name}
                        sx={{ width: 54, height: 54 }}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{product.price.toFixed(2)} • Qty {product.quantity}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        size="small"
                        label={product.isActive ? "Active" : "Inactive"}
                        color={product.isActive ? "success" : "default"}
                        variant={product.isActive ? "filled" : "outlined"}
                      />
                      <Button size="small" onClick={() => handleEditProduct(product)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageProduct;