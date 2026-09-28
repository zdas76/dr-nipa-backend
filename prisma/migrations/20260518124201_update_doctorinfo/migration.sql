/*
  Warnings:

  - You are about to drop the column `chamberAddress` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalName` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `memberships` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `DoctorInfo` table. All the data in the column will be lost.
  - You are about to drop the `SafeMode` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `DoctorInfo` DROP COLUMN `chamberAddress`,
    DROP COLUMN `degree`,
    DROP COLUMN `hospitalName`,
    DROP COLUMN `memberships`,
    DROP COLUMN `name`,
    DROP COLUMN `specialty`,
    ADD COLUMN `nameBangla` VARCHAR(191) NULL,
    ADD COLUMN `nameEnglish` VARCHAR(191) NULL,
    MODIFY `designation` VARCHAR(191) NULL,
    MODIFY `contactNumber` VARCHAR(191) NULL,
    MODIFY `newPatientVisitingFee` INTEGER NULL,
    MODIFY `oldPatientVisitingFee` INTEGER NULL;

-- DropTable
DROP TABLE `SafeMode`;

-- CreateTable
CREATE TABLE `IsSafe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isSafe` BOOLEAN NOT NULL DEFAULT false,
    `limit` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
