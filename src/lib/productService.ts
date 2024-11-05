// lib/productService.ts
'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTotalProducts(): Promise<number> {
  const totalProducts = await prisma.products.count();
  return totalProducts;
}

export async function getActiveProducts(): Promise<number> {
  const activeProducts = await prisma.products.count({
    where: { isActive: true },
  });
  return activeProducts;
}

export async function getProducts() {
  return await prisma.products.findMany();
}

export async function addProduct(data: { name: string; details: string; price: number; img: string; quantity: number; isActive: boolean; authorId: string }) {
  return await prisma.products.create({ data });
}

export async function updateProduct(id: string, data: { name: string; details: string; price: number; img: string; quantity: number; isActive: boolean; authorId: string }) {
  return await prisma.products.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string) {
  return await prisma.products.delete({
    where: { id },
  });
}
