-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "answerChoice" TEXT NOT NULL,
    "parentSurveyId" INTEGER NOT NULL,
    CONSTRAINT "Question_parentSurveyId_fkey" FOREIGN KEY ("parentSurveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
