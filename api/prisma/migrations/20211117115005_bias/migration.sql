/*
  Warnings:

  - Added the required column `bias` to the `Matrix` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matrix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyTitle" TEXT NOT NULL,
    "bias" TEXT NOT NULL
);
INSERT INTO "new_Matrix" ("id", "surveyTitle") SELECT "id", "surveyTitle" FROM "Matrix";
DROP TABLE "Matrix";
ALTER TABLE "new_Matrix" RENAME TO "Matrix";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
