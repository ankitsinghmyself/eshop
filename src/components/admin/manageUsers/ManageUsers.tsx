import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material";
import { getUsers, addUser, updateUser, deleteUser } from "@/lib/userService"; // Implement these functions

interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  isAdmin: boolean;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser = await addUser({ name, username, email, password, isAdmin });
    setUsers([...users, newUser]);
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  const handleUpdateUser = async () => {
    if (editUserId === null) return;
    const updatedUser = await updateUser(editUserId, {
      name,
      username,
      email,
      password,
      isAdmin,
    });
    setUsers(
      users.map((user) => (user.id === editUserId ? updatedUser : user))
    );
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setEditUserId(null);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    setEditUserId(user.id);
    setName(user.name || "");
    setUsername(user.username || "");
    setEmail(user.email || "");
    setPassword(""); // Do not pre-fill the password
    setIsAdmin(user.isAdmin);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
          >
            <TextField
              required
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              autoComplete="off"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Admin"
            />
            {editUserId ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateUser}
              >
                Update User
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
              >
                Add User
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText primary={user.name} secondary={user.email} />
                <ListItemSecondaryAction>
                  <Button color="primary" onClick={() => handleEditUser(user)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
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

export default ManageUsers;
