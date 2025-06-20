-- CreateTable
CREATE TABLE "listing_analytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listingId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "inquiries" INTEGER NOT NULL DEFAULT 0,
    "favorited" INTEGER NOT NULL DEFAULT 0,
    "lastViewed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "averageViewTime" REAL NOT NULL DEFAULT 0,
    "clickThroughRate" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "listing_analytics_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "listing_analytics_listingId_key" ON "listing_analytics"("listingId");
