/*
  Warnings:

  - Added the required column `id_user` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
