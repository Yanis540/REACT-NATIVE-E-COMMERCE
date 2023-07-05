-- CreateEnum
CREATE TYPE "SizeVariant" AS ENUM ('L', 'M', 'S');

-- CreateEnum
CREATE TYPE "ColorVariant" AS ENUM ('blue', 'red', 'green', 'white', 'black');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "size_variants" "SizeVariant"[],
    "colors" "ColorVariant"[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedProduct" (
    "id_product" TEXT NOT NULL,
    "id_order" TEXT NOT NULL,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id_order","id_product")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
