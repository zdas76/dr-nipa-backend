/*
  Warnings:

  - You are about to drop the column `fatherName` on the `PatientInfo` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `PatientInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `PatientInfo` DROP COLUMN `fatherName`,
    DROP COLUMN `motherName`;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
