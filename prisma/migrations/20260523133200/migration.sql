/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `serialNumber` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_serialNumber_key` ON `Appointment`(`serialNumber`);
