/*
  Warnings:

  - You are about to drop the column `newPatientAmount` on the `ConnectorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `oldPatientAmount` on the `ConnectorInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactNumber]` on the table `ConnectorInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `PatientInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_patientId_fkey`;

-- DropIndex
DROP INDEX `Appointment_patientId_fkey` ON `Appointment`;

-- DropIndex
DROP INDEX `PatientInfo_contactNumber_key` ON `PatientInfo`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `status` ENUM('BOOKED', 'PRESENT', 'ABSENT', 'VISITED') NOT NULL DEFAULT 'BOOKED';

-- AlterTable
ALTER TABLE `ConnectorInfo` DROP COLUMN `newPatientAmount`,
    DROP COLUMN `oldPatientAmount`;

-- AlterTable
ALTER TABLE `PatientInfo` ADD COLUMN `patientId` INTEGER NULL,
    MODIFY `age` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `SendMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contactNumber` VARCHAR(191) NOT NULL,
    `message_ID` VARCHAR(191) NOT NULL,
    `appointmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ConnectorInfo_contactNumber_key` ON `ConnectorInfo`(`contactNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientInfo_patientId_key` ON `PatientInfo`(`patientId`);

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `PatientInfo`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SendMessage` ADD CONSTRAINT `SendMessage_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
