-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "answerChoice" TEXT NOT NULL,
    "lastQuestion" BOOLEAN NOT NULL DEFAULT false,
    "parentSurveyId" INTEGER NOT NULL,
    CONSTRAINT "Question_parentSurveyId_fkey" FOREIGN KEY ("parentSurveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("answerChoice", "id", "parentSurveyId", "value") SELECT "answerChoice", "id", "parentSurveyId", "value" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
