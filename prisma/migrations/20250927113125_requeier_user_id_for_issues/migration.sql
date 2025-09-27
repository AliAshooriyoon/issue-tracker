/*
  Warnings:

  - Made the column `userId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Issue" ALTER COLUMN "userId" SET NOT NULL;
