-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "videoArtistId" INTEGER;

-- CreateTable
CREATE TABLE "VideoArtist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VideoArtist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_videoArtistId_fkey" FOREIGN KEY ("videoArtistId") REFERENCES "VideoArtist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
