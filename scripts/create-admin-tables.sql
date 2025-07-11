-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    colors JSONB DEFAULT '[]',
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    new_arrival BOOLEAN DEFAULT false,
    main_image TEXT,
    gallery_images JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create homepage_settings table
CREATE TABLE IF NOT EXISTS homepage_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    settings_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    settings_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample products if the table is empty
INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Birkin 30',
    15000.00,
    'The iconic Hermès Birkin bag in premium leather. A timeless symbol of luxury and craftsmanship.',
    'Hermès',
    '["Black", "Brown", "Gold"]',
    true,
    true,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Neverfull MM',
    1800.00,
    'The classic Louis Vuitton Neverfull tote bag in monogram canvas. Perfect for everyday luxury.',
    'Louis Vuitton',
    '["Monogram", "Damier Ebene", "Damier Azur"]',
    true,
    true,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'
WHERE (SELECT COUNT(*) FROM products) < 2;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Kelly 28',
    12000.00,
    'The elegant Hermès Kelly bag, a masterpiece of French leather craftsmanship and sophistication.',
    'Hermès',
    '["Black", "Rouge", "Etoupe"]',
    true,
    false,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'
WHERE (SELECT COUNT(*) FROM products) < 3;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Speedy 30',
    1200.00,
    'The iconic Louis Vuitton Speedy handbag in classic monogram canvas. A timeless design since 1930.',
    'Louis Vuitton',
    '["Monogram", "Damier Ebene", "Epi Leather"]',
    true,
    false,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'
WHERE (SELECT COUNT(*) FROM products) < 4;
