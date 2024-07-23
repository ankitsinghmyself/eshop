// components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/utils/redux/store';
import { removeItem, clearCart, selectTotalItems } from '@/utils/redux/cartSlice';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalItems})
      </Typography>
      <List>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={`${item.name} - $${item.price}`}
                secondary={`Quantity: ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => dispatch(removeItem(item.id))}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      {items.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your cart is empty.
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
