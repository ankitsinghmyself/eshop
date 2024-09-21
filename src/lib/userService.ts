import { User } from "@prisma/client";

// lib/userService.ts
export async function getUsers(): Promise<User[]> {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
  
  export async function addUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    return response.json();
  }
  
  export async function updateUser(id: string, user: Partial<Omit<User, 'id'>>): Promise<User> {
    const response = await fetch(`/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...user }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  }
  
  export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`/api/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  }
  