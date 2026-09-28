-- AlterTable
ALTER TABLE `IsSafe` ADD COLUMN `doctorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `IsSafe` ADD CONSTRAINT `IsSafe_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `DoctorInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
