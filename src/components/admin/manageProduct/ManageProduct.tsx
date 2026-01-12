"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  InputAdornment,
  Fab
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
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  details: string;
  price: number;
  img: string;
  quantity: number;
  isActive: boolean;
  authorId: number;
}

const ManageProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState<number | string>(0);
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState<number | string>(0);
  const [isActive, setIsActive] = useState(true);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, showActiveOnly]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products/getAllProducts/");
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (showActiveOnly) {
      filtered = filtered.filter(product => product.isActive);
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddProduct = async () => {
    if (!name || !price || !img || !quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          details,
          price: Number(price),
          img,
          quantity: Number(quantity),
          isActive,
        }),
      });

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      resetForm();
      setOpenDialog(false);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (editProductId === null || !name || !price || !img || !quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editProductId,
          updateData: {
            name,
            details,
            price: Number(price),
            img,
            quantity: Number(quantity),
            isActive,
          },
        }),
      });

      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product.id === editProductId ? updatedProduct : product
        )
      );
      resetForm();
      setOpenDialog(false);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      setProducts(products.filter((product) => product.id !== id));
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditProductId(product.id);
    setName(product.name);
    setDetails(product.details);
    setPrice(product.price);
    setImg(product.img);
    setQuantity(product.quantity);
    setIsActive(product.isActive);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setName("");
    setDetails("");
    setPrice(0);
    setImg("");
    setQuantity(0);
    setIsActive(true);
    setEditProductId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setOpenDialog(true);
  };

  const confirmDelete = (id: number) => {
    setProductToDelete(id);
    setDeleteConfirmOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Product Management
        </Typography>
        <Box display="flex" gap={2}>
          <Tooltip title="Refresh Products">
            <IconButton onClick={fetchProducts} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openAddDialog}
            size="large"
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                />
              }
              label="Show Active Only"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="textSecondary">
              Total: {filteredProducts.length} products
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative', height: 200 }}>
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholders/product-placeholder.svg';
                  }}
                />
                <Chip
                  label={product.isActive ? 'Active' : 'Inactive'}
                  color={product.isActive ? 'success' : 'default'}
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                />
              </Box>
              
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {product.details.length > 100 
                    ? `${product.details.substring(0, 100)}...` 
                    : product.details
                  }
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${product.price}
                  </Typography>
                  <Chip 
                    label={`Stock: ${product.quantity}`} 
                    color={product.quantity > 10 ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => confirmDelete(product.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" color="textSecondary">
            No products found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first product'}
          </Typography>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editProductId ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price *"
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image URL *"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity *"
                value={quantity}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Product is active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={editProductId ? handleUpdateProduct : handleAddProduct}
            disabled={loading}
          >
            {loading ? 'Saving...' : (editProductId ? 'Update' : 'Add Product')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageProduct;
