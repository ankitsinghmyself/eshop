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
import { getUsers, addUser, updateUser, deleteUser } from "@/lib/userService";
import { User } from "@/types/types";

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    const newUser = await addUser({
      firstName,
      lastName: lastName || null,
      middleName: null,
      birthdate: null,
      gender: null,
      address: null,
      phone: null,
      website: null,
      username: username || null,
      email: email || null,
      emailVerified: null, // Set as null for new users
      image: null, // Set as null for new users
      password,
      isAdmin,
      createdAt: new Date(), // Set the creation date
      updatedAt: new Date(), // Set the updated date
    });
    setUsers((prevUsers) => [...prevUsers, newUser]);
    resetForm();
  };

  const handleUpdateUser = async () => {
    if (editUserId === null) return;
    const updatedUser = await updateUser(editUserId, {
      firstName,
      lastName: lastName || null,
      middleName: null,
      birthdate: null,
      gender: null,
      address: null,
      phone: null,
      website: null,
      username: username || null,
      email: email || null,
      emailVerified: null, // Optional; handle as needed
      image: null, // Optional; handle as needed
      password,
      isAdmin,
      updatedAt: new Date(), // Set the updated date
    });
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editUserId ? updatedUser : user))
    );
    resetForm();
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    setEditUserId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName || ""); // Handle optional last name
    setUsername(user.username || ""); // Handle optional username
    setEmail(user.email || ""); // Handle optional email
    setPassword(""); // Do not pre-fill the password
    setIsAdmin(user.isAdmin);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setEditUserId(null);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
          >
            <TextField
              required
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
        <Grid item xs={6}>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName || ""}`}
                  secondary={user.email}
                />
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
