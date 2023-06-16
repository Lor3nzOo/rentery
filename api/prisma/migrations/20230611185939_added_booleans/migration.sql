/*
  Warnings:

  - Added the required column `air` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pets` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smoke` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "air" BOOLEAN NOT NULL,
ADD COLUMN     "pets" BOOLEAN NOT NULL,
ADD COLUMN     "smoke" BOOLEAN NOT NULL;
