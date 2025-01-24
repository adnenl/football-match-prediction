/*
  Warnings:

  - Added the required column `gameweek` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fixture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "home" TEXT NOT NULL,
    "away" TEXT NOT NULL,
    "gameweek" TEXT NOT NULL
);
INSERT INTO "new_Fixture" ("away", "home", "id") SELECT "away", "home", "id" FROM "Fixture";
DROP TABLE "Fixture";
ALTER TABLE "new_Fixture" RENAME TO "Fixture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
