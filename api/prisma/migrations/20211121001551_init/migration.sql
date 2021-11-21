-- CreateTable
CREATE TABLE "Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyTitle" TEXT NOT NULL,
    "scoreMatrixId" INTEGER NOT NULL,
    CONSTRAINT "Survey_scoreMatrixId_fkey" FOREIGN KEY ("scoreMatrixId") REFERENCES "Matrix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "answerChoice" TEXT NOT NULL,
    "lastQuestion" BOOLEAN NOT NULL DEFAULT false,
    "parentSurveyId" INTEGER NOT NULL,
    CONSTRAINT "Question_parentSurveyId_fkey" FOREIGN KEY ("parentSurveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "surveyTitle" TEXT NOT NULL,
    "bias" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scoreArray" TEXT NOT NULL,
    "matrixId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    CONSTRAINT "Score_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "Matrix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionToken" TEXT NOT NULL,
    "whichSurveyIsTaking" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "currentQuestionId" INTEGER NOT NULL,
    CONSTRAINT "User_whichSurveyIsTaking_fkey" FOREIGN KEY ("whichSurveyIsTaking") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "answerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "UserAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_scoreMatrixId_key" ON "Survey"("scoreMatrixId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_answerId_key" ON "Score"("answerId");
