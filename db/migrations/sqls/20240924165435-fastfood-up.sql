CREATE TABLE IF NOT EXISTS "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

INSERT INTO "category" ("id", "name", "description", "created_at", "updated_at") VALUES
(1, 'Lanche', 'Lanche', NOW(), NOW()),
(2, 'Acompanhamento', 'Acompanhamento', NOW(), NOW()),
(3, 'Bebida', 'Bebida', NOW(), NOW()),
(4, 'Sobremesa', 'Sobremesa', NOW(), NOW());

CREATE TABLE IF NOT EXISTS "product" (
  "id" SERIAL PRIMARY KEY,
  "category_id" integer NOT NULL,  
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "unit_price" decimal NOT NULL DEFAULT 0,
  "stock_quantity" integer NOT NULL DEFAULT 0,
  "image_url" varchar,
  "is_active" boolean NOT NULL DEFAULT TRUE,
  "created_at" timestamp,
  "updated_at" timestamp,
  FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE SET NULL
);