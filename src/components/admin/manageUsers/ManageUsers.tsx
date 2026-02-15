import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
  Grid,
  Paper,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import toast from "react-hot-toast";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
  type AdminUser,
} from "@/lib/userService";

type UserForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const initialForm: UserForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  isAdmin: false,
};

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState<UserForm>(initialForm);
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const key = search.trim().toLowerCase();
    if (!key) return users;
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName || ""}`.toLowerCase();
      return fullName.includes(key) || (user.email || "").toLowerCase().includes(key);
    });
  }, [users, search]);

  const resetForm = () => {
    setForm(initialForm);
    setEditUserId(null);
  };

  const handleAddUser = async () => {
    if (!form.firstName || !form.email || !form.password) {
      toast.error("First name, email, and password are required");
      return;
    }

    setSubmitting(true);
    try {
      const created = await addUser({
        firstName: form.firstName,
        lastName: form.lastName || null,
        username: form.username || null,
        email: form.email || null,
        password: form.password,
        isAdmin: form.isAdmin,
      });
      setUsers((prev) => [created, ...prev]);
      resetForm();
      toast.success("User added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editUserId || !form.firstName || !form.email) {
      toast.error("First name and email are required");
      return;
    }

    setSubmitting(true);
    try {
      const updated = await updateUser(editUserId, {
        firstName: form.firstName,
        lastName: form.lastName || null,
        username: form.username || null,
        email: form.email || null,
        password: form.password || undefined,
        isAdmin: form.isAdmin,
      });

      setUsers((prev) => prev.map((user) => (user.id === editUserId ? updated : user)));
      resetForm();
      toast.success("User updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  const handleEditUser = (user: AdminUser) => {
    setEditUserId(user.id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      isAdmin: user.isAdmin,
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
        User Management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create and maintain admin/customer accounts.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              {editUserId ? "Edit User" : "Add User"}
            </Typography>

            <Stack spacing={1.5}>
              <TextField
                required
                label="First Name"
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
              />
              <TextField
                label="Last Name"
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
              />
              <TextField
                label="Username"
                value={form.username}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              />
              <TextField
                required
                label="Email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              />
              <TextField
                required={!editUserId}
                label={editUserId ? "Password (leave blank to keep)" : "Password"}
                type="password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                autoComplete="off"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isAdmin}
                    onChange={(e) => setForm((prev) => ({ ...prev, isAdmin: e.target.checked }))}
                  />
                }
                label="Admin"
              />
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={editUserId ? handleUpdateUser : handleAddUser}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : editUserId ? "Update User" : "Add User"}
                </Button>
                {editUserId ? (
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
                Users ({filteredUsers.length})
              </Typography>
              <TextField
                size="small"
                label="Search users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Stack>

            <Stack spacing={1}>
              {loading ? (
                <Typography color="text.secondary">Loading users...</Typography>
              ) : filteredUsers.length === 0 ? (
                <Typography color="text.secondary">No users found.</Typography>
              ) : (
                filteredUsers.map((user) => (
                  <Paper
                    key={user.id}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {(user.firstName || "U").charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>
                          {user.firstName} {user.lastName || ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email || "No email"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        size="small"
                        label={user.isAdmin ? "Admin" : "Customer"}
                        color={user.isAdmin ? "secondary" : "default"}
                        variant={user.isAdmin ? "filled" : "outlined"}
                      />
                      <Button size="small" onClick={() => handleEditUser(user)}>
                        Edit
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
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

export default ManageUsers;
