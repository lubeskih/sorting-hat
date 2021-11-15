-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whichSurveyIsTaking" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "currentQuestionId" INTEGER NOT NULL,
    CONSTRAINT "User_whichSurveyIsTaking_fkey" FOREIGN KEY ("whichSurveyIsTaking") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "currentQuestionId", "id", "whichSurveyIsTaking") SELECT "createdAt", "currentQuestionId", "id", "whichSurveyIsTaking" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
