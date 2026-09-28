/*
  Warnings:

  - You are about to drop the column `assistantId` on the `User` table. All the data in the column will be lost.
  - The values [CONVERTED] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ConnectorAmount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitAmount` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `AssistantInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `DoctorInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `PatientInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `AssistantInfo` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `newPatientAmount` to the `ConnectorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPatientAmount` to the `ConnectorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPatientVisitingFee` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPatientVisitingFee` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_connectorId_fkey`;

-- DropForeignKey
ALTER TABLE `ConnectorAmount` DROP FOREIGN KEY `ConnectorAmount_connectorId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_assistantId_fkey`;

-- DropIndex
DROP INDEX `Appointment_connectorId_fkey` ON `Appointment`;

-- DropIndex
DROP INDEX `User_assistantId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `visitingTime` VARCHAR(191) NULL,
    MODIFY `connectorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `AssistantInfo` MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ConnectorInfo` ADD COLUMN `newPatientAmount` INTEGER NOT NULL,
    ADD COLUMN `oldPatientAmount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DoctorInfo` ADD COLUMN `newPatientVisitingFee` INTEGER NOT NULL,
    ADD COLUMN `oldPatientVisitingFee` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `assistantId`,
    MODIFY `status` ENUM('ACTIVE', 'DELETED', 'PUSH', 'BLOCK', 'PENDING', 'CHECKED', 'CLOSED', 'COMPLETED') NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE `ConnectorAmount`;

-- DropTable
DROP TABLE `VisitAmount`;

-- CreateIndex
CREATE UNIQUE INDEX `AssistantInfo_email_key` ON `AssistantInfo`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `DoctorInfo_email_key` ON `DoctorInfo`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientInfo_contactNumber_key` ON `PatientInfo`(`contactNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userName_key` ON `User`(`userName`);

-- AddForeignKey
ALTER TABLE `DoctorInfo` ADD CONSTRAINT `DoctorInfo_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssistantInfo` ADD CONSTRAINT `AssistantInfo_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_connectorId_fkey` FOREIGN KEY (`connectorId`) REFERENCES `ConnectorInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
