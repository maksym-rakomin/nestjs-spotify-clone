-- CreateTable
CREATE TABLE "IUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "IProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IProfile_userId_key" ON "IProfile"("userId");

-- AddForeignKey
ALTER TABLE "IProfile" ADD CONSTRAINT "IProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "IUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
