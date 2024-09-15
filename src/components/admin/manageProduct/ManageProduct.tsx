// pages/admin/manage-product.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

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
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState<number | string>(0);
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState<number | string>(0);
  const [isActive, setIsActive] = useState(true);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !price || !img || !quantity) return;

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    setName("");
    setDetails("");
    setPrice(0);
    setImg("");
    setQuantity(0);
    setIsActive(true);
    toast.success("Product added successfully");
  };

  const handleUpdateProduct = async () => {
    if (editProductId === null || !name || !price || !img || !quantity) return;

    const response = await fetch("/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
    setName("");
    setDetails("");
    setPrice(0);
    setImg("");
    setQuantity(0);
    setIsActive(true);
    setEditProductId(null);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product: Product) => {
    setEditProductId(product.id);
    setName(product.name);
    setDetails(product.details);
    setPrice(product.price);
    setImg(product.img);
    setQuantity(product.quantity);
    setIsActive(product.isActive);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Products
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
          >
            <TextField
              label="Product Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Price *"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Image URL *"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Quantity *"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Active"
            />
            {editProductId ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProduct}
              >
                Update Product
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <List>
            {products.map((product) => (
              <ListItem key={product.id} divider>
                <ListItemText
                  primary={product.name}
                  secondary={`Price: $${product.price}, Quantity: ${product.quantity}, Active: ${product.isActive}, Author ID: ${product.authorId}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    color="primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageProduct;
