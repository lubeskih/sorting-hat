/*
  Warnings:

  - Added the required column `scoreMatrixId` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "parentQuestionId" INTEGER NOT NULL,
    "nextQuestionId" INTEGER NOT NULL,
    CONSTRAINT "Answer_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Matrix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyTitle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scoreArray" TEXT NOT NULL,
    "matrixId" INTEGER NOT NULL,
    CONSTRAINT "Score_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "Matrix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyTitle" TEXT NOT NULL,
    "scoreMatrixId" INTEGER NOT NULL,
    CONSTRAINT "Survey_scoreMatrixId_fkey" FOREIGN KEY ("scoreMatrixId") REFERENCES "Matrix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Survey" ("id", "surveyTitle") SELECT "id", "surveyTitle" FROM "Survey";
DROP TABLE "Survey";
ALTER TABLE "new_Survey" RENAME TO "Survey";
CREATE UNIQUE INDEX "Survey_scoreMatrixId_key" ON "Survey"("scoreMatrixId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
