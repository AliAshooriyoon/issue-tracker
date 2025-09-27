-- AlterTable
ALTER TABLE "public"."Issue" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
