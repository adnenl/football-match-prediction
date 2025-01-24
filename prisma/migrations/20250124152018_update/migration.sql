/*
  Warnings:

  - You are about to drop the column `result` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `predictedResult` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fixtureId" INTEGER NOT NULL,
    "predictedResult" TEXT NOT NULL,
    CONSTRAINT "Prediction_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prediction" ("fixtureId", "id") SELECT "fixtureId", "id" FROM "Prediction";
DROP TABLE "Prediction";
ALTER TABLE "new_Prediction" RENAME TO "Prediction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
