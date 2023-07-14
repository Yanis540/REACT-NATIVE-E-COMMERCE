/*
  Warnings:

  - You are about to drop the column `checkout_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `checkout_url` on the `Order` table. All the data in the column will be lost.
  - The `type` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `payment_status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentIntentStatus" AS ENUM ('canceled', 'processing', 'requires_action', 'requires_capture', 'requires_confirmation', 'requires_payment_method', 'succeeded');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "checkout_status",
DROP COLUMN "checkout_url",
DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentIntentStatus" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT[];

-- AlterTable
ALTER TABLE "OrderedProduct" ALTER COLUMN "color" DROP NOT NULL;

-- DropEnum
DROP TYPE "CheckoutStatus";
