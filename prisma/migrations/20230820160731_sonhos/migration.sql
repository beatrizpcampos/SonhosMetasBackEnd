-- CreateTable
CREATE TABLE "Sonhos" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Sonhos_pkey" PRIMARY KEY ("id")
);
