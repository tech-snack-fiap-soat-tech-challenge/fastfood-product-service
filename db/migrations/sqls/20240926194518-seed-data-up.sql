-- Insert test data into product table
INSERT INTO "product" ("name", "description", "unit_price", "category_id", "stock_quantity", "created_at", "updated_at") VALUES
('Burger','Description Burger', 5.99, 1, 50, NOW(), NOW()),
('Cheeseburger','Description Cheeseburger', 6.49, 1, 40, NOW(), NOW()),
('Bacon Burger','Description Bacon Burger', 7.49, 1, 30, NOW(), NOW()),
('Veggie Burger','Description Veggie Burger', 6.99, 1, 20, NOW(), NOW()),
('Double Burger','Description Double Burger', 8.99, 1, 25, NOW(), NOW()),
('Spicy Burger','Description Spicy Burger', 7.99, 1, 15, NOW(), NOW()),
('Ice Cream','Description Ice Cream', 2.99, 4, 60, NOW(), NOW()),
('Soda','Description Soda', 1.99, 3, 70, NOW(), NOW()),
('Chips','Description Chips', 1.49, 2, 80, NOW(), NOW());

