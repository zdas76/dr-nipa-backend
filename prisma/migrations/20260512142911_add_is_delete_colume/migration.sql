-- AlterTable
ALTER TABLE `AssistantInfo` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ConnectorInfo` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PatientInfo` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
