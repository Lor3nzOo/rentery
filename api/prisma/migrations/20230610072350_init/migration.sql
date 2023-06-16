-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "night" DOUBLE PRECISION NOT NULL,
    "beds" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "customData" JSONB NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_session_key" ON "User"("session");

-- CreateIndex
CREATE UNIQUE INDEX "Property_name_key" ON "Property"("name");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
