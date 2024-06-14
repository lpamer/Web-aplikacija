-- Creator:       MySQL Workbench 8.0.34/ExportSQLite Plugin 0.1.0
-- Author:        Administrator
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-10-20 13:20
-- Created:       2023-10-14 16:51


-- Schema: mydb

BEGIN;
CREATE TABLE "serija"(
  "id_serija" INTEGER PRIMARY KEY NOT NULL,
  "ime" VARCHAR(45) NOT NULL,
  "opis_serije" VARCHAR(45) NOT NULL,
  "br_sezona" INTEGER NOT NULL,
  "br_epizoda" INTEGER,
  "popularnost" VARCHAR(45),
  "slika" VARCHAR(45) NOT NULL,
  "poveznica" VARCHAR(45),
  "tmdb_id" INTEGER NOT NULL
);
CREATE TABLE "sezona"(
  "id_sezona" INTEGER PRIMARY KEY NOT NULL,
  "opis_sezona" VARCHAR(45),
  "br_epizoda" VARCHAR(45) NOT NULL,
  "poveznica" VARCHAR(45),
  "tmdb_id_sezone" INTEGER NOT NULL,
  "serija_id_serija" INTEGER NOT NULL,
  CONSTRAINT "fk_sezona_serija1"
    FOREIGN KEY("serija_id_serija")
    REFERENCES "serija"("id_serija")
);
CREATE INDEX "sezona.fk_sezona_serija1_idx" ON "sezona" ("serija_id_serija");
CREATE TABLE "tip_korisnika"(
  "id" INTEGER PRIMARY KEY NOT NULL,
  "naziv" VARCHAR(45) NOT NULL,
  "opis" VARCHAR(45)
);
CREATE TABLE "korisnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "username" VARCHAR(45) NOT NULL,
  "password" VARCHAR(45) NOT NULL,
  "email" VARCHAR(45) NOT NULL,
  "prezime" VARCHAR(45),
  "ime" VARCHAR(45),
  "tip_korisnika_id" INTEGER NOT NULL,
  CONSTRAINT "username_UNIQUE"
    UNIQUE("username"),
  CONSTRAINT "email_UNIQUE"
    UNIQUE("email"),
  CONSTRAINT "fk_korisnik_tip_korisnika"
    FOREIGN KEY("tip_korisnika_id")
    REFERENCES "tip_korisnika"("id")
);
CREATE INDEX "korisnik.fk_korisnik_tip_korisnika_idx" ON "korisnik" ("tip_korisnika_id");
CREATE TABLE "dnevnik"(
  "idDnevnik" INTEGER NOT NULL,
  "datum" DATE NOT NULL,
  "vrijeme" TIME NOT NULL,
  "tijelo" VARCHAR(45),
  "zahtjev" VARCHAR(45) NOT NULL,
  "resurs" VARCHAR(45) NOT NULL,
  "korisnik_id" INTEGER NOT NULL,
  PRIMARY KEY("idDnevnik","korisnik_id"),
  CONSTRAINT "fk_dnevnik_korisnik1"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id")
);
CREATE INDEX "dnevnik.fk_dnevnik_korisnik1_idx" ON "dnevnik" ("korisnik_id");
CREATE TABLE "favoriti"(
  "korisnik_id" INTEGER NOT NULL,
  "serija_id_serija" INTEGER NOT NULL,
  PRIMARY KEY("korisnik_id","serija_id_serija"),
  CONSTRAINT "fk_korisnik_has_serija_korisnik1"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id"),
  CONSTRAINT "fk_korisnik_has_serija_serija1"
    FOREIGN KEY("serija_id_serija")
    REFERENCES "serija"("id_serija")
);
CREATE INDEX "favoriti.fk_korisnik_has_serija_serija1_idx" ON "favoriti" ("serija_id_serija");
CREATE INDEX "favoriti.fk_korisnik_has_serija_korisnik1_idx" ON "favoriti" ("korisnik_id");
COMMIT;

INSERT INTO tip_korisnika(naziv,opis)  VALUES("admin","administrator");
INSERT INTO tip_korisnika(naziv,opis)  VALUES("korisnik","korisnik");
INSERT INTO tip_korisnika(naziv,opis)  VALUES("gost","gost");

INSERT INTO korisnik(username,password,email,tip_korisnika_id) VALUES("obican","rwa","obican@gmail.com",2);
INSERT INTO korisnik(username,password,email,tip_korisnika_id) VALUES("admin","rwa","admin@gmail.com",1);



