/*
  Warnings:

  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `checkout_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkout_url` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `OrderedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `OrderedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'unpaid', 'no_payment_required');

-- CreateEnum
CREATE TYPE "CheckoutStatus" AS ENUM ('open', 'complete', 'expired');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('progress', 'cancelled', 'delivered');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total_price",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "checkout_status" "CheckoutStatus" NOT NULL,
ADD COLUMN     "checkout_url" TEXT NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderedProduct" ADD COLUMN     "color" "ColorVariant" NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "size" "SizeVariant" NOT NULL;

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
