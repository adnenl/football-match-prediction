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
    "homeGoals" INTEGER,
    "awayGoals" INTEGER
);
INSERT INTO "new_Fixture" ("awayGoals", "awayTeam", "date", "homeGoals", "homeTeam", "id", "round", "status") SELECT "awayGoals", "awayTeam", "date", "homeGoals", "homeTeam", "id", "round", "status" FROM "Fixture";
DROP TABLE "Fixture";
ALTER TABLE "new_Fixture" RENAME TO "Fixture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
