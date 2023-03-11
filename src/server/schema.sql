-- CreateDatabase
DROP DATABASE IF EXISTS contacto;
CREATE DATABASE contacto;
use contacto;

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    id uuid DEFAULT uuid (),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username TEXT NOT NULL,

    CONSTRAINT account_pkey PRIMARY KEY (id)
);

-- Create record table
CREATE TABLE IF NOT EXISTS record (
    id uuid DEFAULT uuid (),
    firstname TEXT NOT NULL,
    lastname TEXT,
    company TEXT,
    phone BIGINT NOT NULL,
    email TEXT,
    accountId uuid,
    image LONGTEXT,

    CONSTRAINT record_pkey PRIMARY KEY (id),
    CONSTRAINT record_accountId_fkey FOREIGN KEY (accountId) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT record_unique UNIQUE (accountId, phone)
);
