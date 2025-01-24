/*
  Warnings:

  - You are about to drop the column `away` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `home` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `prediction` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `awayGoals` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awayTeam` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeGoals` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeam` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fixture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "round" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "homeGoals" INTEGER NOT NULL,
    "awayGoals" INTEGER NOT NULL
);
INSERT INTO "new_Fixture" ("id", "round") SELECT "id", "round" FROM "Fixture";
DROP TABLE "Fixture";
ALTER TABLE "new_Fixture" RENAME TO "Fixture";
CREATE TABLE "new_Prediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fixtureId" INTEGER NOT NULL,
    "result" TEXT NOT NULL
);
INSERT INTO "new_Prediction" ("fixtureId", "id") SELECT "fixtureId", "id" FROM "Prediction";
DROP TABLE "Prediction";
ALTER TABLE "new_Prediction" RENAME TO "Prediction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
