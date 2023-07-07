-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
