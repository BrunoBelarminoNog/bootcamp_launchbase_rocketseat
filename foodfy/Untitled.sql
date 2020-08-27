CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int UNIQUE,
  "title" text NOT NULL,
  "image" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text
);

ALTER TABLE "chefs" ADD FOREIGN KEY ("id") REFERENCES "recipes" ("chef_id");
