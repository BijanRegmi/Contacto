-- Drop previous db if exists
DROP DATABASE phonebook;
-- CreateDatabase
CREATE DATABASE phonebook;
\c phonebook;

-- Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create account table
CREATE TABLE "account" (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- Create record table
CREATE TABLE "record" (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "company" TEXT,
    "phone" BIGINT NOT NULL,
    "email" TEXT,
    "birthday" TIMESTAMP(3),
    "accountId" uuid,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "account_id_key" ON "account"("id");
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
CREATE UNIQUE INDEX "record_id_key" ON "record"("id");

ALTER TABLE "record" ADD CONSTRAINT "record_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
