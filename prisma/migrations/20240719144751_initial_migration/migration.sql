/*
  Warnings:

  - You are about to drop the column `productDetails` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `productTitle` on the `products` table. All the data in the column will be lost.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `productDetails`,
    DROP COLUMN `productTitle`,
    ADD COLUMN `details` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;
