-- Seed demo data for testing
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) 
VALUES 
  ('admin@carryluxe.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', '+1-555-000-0001', 'admin'),
  ('customer@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', '+1-555-123-4567', 'customer'),
  ('jane.smith@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', '+1-555-987-6543', 'customer')
ON CONFLICT (email) DO NOTHING;

-- Add sample shipping addresses
INSERT INTO shipping_addresses (user_id, address_line_1, address_line_2, city, state, postal_code, is_default)
VALUES 
  (2, '123 Luxury Lane', 'Apt 4B', 'Beverly Hills', 'CA', '90210', true),
  (3, '456 Fashion Ave', NULL, 'New York', 'NY', '10001', true)
ON CONFLICT DO NOTHING;

-- Add sample orders
INSERT INTO orders (user_id, order_number, status, payment_status, subtotal, tax, shipping, total, shipping_address_id)
VALUES 
  (2, 'ORD-2024-001', 'delivered', 'paid', 12500.00, 1000.00, 0.00, 13500.00, 1),
  (2, 'ORD-2024-002', 'shipped', 'paid', 2030.00, 162.40, 0.00, 2192.40, 1),
  (3, 'ORD-2024-003', 'pending', 'paid', 6050.00, 484.00, 0.00, 6534.00, 2)
ON CONFLICT (order_number) DO NOTHING;

-- Add sample order items
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, color)
VALUES 
  (1, 'hermes-1', 'Birkin 30', 12500.00, 1, 'Noir'),
  (2, 'lv-1', 'Neverfull MM', 2030.00, 1, 'Monogram'),
  (3, 'lv-3', 'Capucines MM', 6050.00, 1, 'Noir')
ON CONFLICT DO NOTHING;
