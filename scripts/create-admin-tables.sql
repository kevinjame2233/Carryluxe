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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);

-- Insert sample products if the table is empty
INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Birkin 30',
    15000.00,
    'The iconic Hermès Birkin bag in premium leather. A timeless symbol of luxury and craftsmanship that has been coveted by fashion enthusiasts worldwide.',
    'Hermès',
    '["Black", "Brown", "Gold", "Rouge"]'::jsonb,
    true,
    true,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Neverfull MM',
    1800.00,
    'The classic Louis Vuitton Neverfull tote bag in monogram canvas. Perfect for everyday luxury with its spacious interior and timeless design.',
    'Louis Vuitton',
    '["Monogram", "Damier Ebene", "Damier Azur"]'::jsonb,
    true,
    true,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 2;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Kelly 28',
    12000.00,
    'The elegant Hermès Kelly bag, a masterpiece of French leather craftsmanship and sophistication. Named after Grace Kelly, this bag embodies timeless elegance.',
    'Hermès',
    '["Black", "Rouge", "Etoupe", "Gold"]'::jsonb,
    true,
    false,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 3;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Speedy 30',
    1200.00,
    'The iconic Louis Vuitton Speedy handbag in classic monogram canvas. A timeless design since 1930, perfect for the modern woman on the go.',
    'Louis Vuitton',
    '["Monogram", "Damier Ebene", "Epi Leather"]'::jsonb,
    true,
    false,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 4;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Constance 24',
    8500.00,
    'The sophisticated Hermès Constance bag with its distinctive H clasp. A perfect blend of functionality and elegance for the discerning fashion lover.',
    'Hermès',
    '["Black", "Gold", "Etoupe"]'::jsonb,
    true,
    true,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 5;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Capucines MM',
    4500.00,
    'The elegant Louis Vuitton Capucines bag, named after the street where Louis Vuitton opened his first store. A symbol of understated luxury.',
    'Louis Vuitton',
    '["Black", "Navy", "Beige"]'::jsonb,
    true,
    true,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 6;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Hermès Evelyne III PM',
    3200.00,
    'The casual yet chic Hermès Evelyne bag with its perforated H logo. Perfect for everyday use while maintaining the luxury Hermès standard.',
    'Hermès',
    '["Black", "Gold", "Etoupe", "Rouge"]'::jsonb,
    false,
    false,
    false,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 7;

INSERT INTO products (name, price, description, category, colors, in_stock, featured, new_arrival, main_image, gallery_images)
SELECT 
    'Louis Vuitton Twist MM',
    3800.00,
    'The innovative Louis Vuitton Twist bag with its unique turning lock mechanism. A modern interpretation of the classic LV monogram.',
    'Louis Vuitton',
    '["Black", "Epi Indigo", "Rose Ballerine"]'::jsonb,
    true,
    false,
    true,
    '/placeholder.svg?height=400&width=400',
    '["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"]'::jsonb
WHERE (SELECT COUNT(*) FROM products) < 8;

-- Insert default homepage settings if none exist
INSERT INTO homepage_settings (id, settings_data)
SELECT 
    1,
    '{
        "heroTitle": "Elevated Luxury.\nTimeless Icons.",
        "heroSubtitle": "Discover the world''s most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.",
        "heroMedia": [
            {
                "type": "image",
                "url": "/placeholder.svg?height=1080&width=1920",
                "alt": "Luxury handbags collection"
            }
        ],
        "hermesTitle": "Hermès",
        "hermesDescription": "The pinnacle of French craftsmanship since 1837",
        "hermesImage": "/placeholder.svg?height=400&width=600",
        "lvTitle": "Louis Vuitton",
        "lvDescription": "Iconic monogram and timeless elegance since 1854",
        "lvImage": "/placeholder.svg?height=400&width=600",
        "shopByIconTitle": "Shop by Icon",
        "shopByIconSubtitle": "The most coveted handbags in the world",
        "trendingTitle": "Trending Now",
        "trendingSubtitle": "The latest arrivals that are capturing hearts worldwide",
        "ctaTitle": "Join the Elite",
        "ctaDescription": "Become part of an exclusive community that appreciates the finest in luxury craftsmanship. Discover pieces that transcend trends and define timeless elegance."
    }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM homepage_settings WHERE id = 1);

-- Insert default site settings if none exist
INSERT INTO site_settings (id, settings_data)
SELECT 
    1,
    '{
        "contactInfo": {
            "email": "carryluxe3@gmail.com",
            "phone": "+1 (618) 850-9790",
            "address": "123 Luxury Lane, Beverly Hills, CA 90210"
        },
        "quickLinks": [
            {"id": "1", "title": "About", "url": "/about"},
            {"id": "2", "title": "Contact", "url": "/contact"},
            {"id": "3", "title": "Terms", "url": "/terms"},
            {"id": "4", "title": "Privacy", "url": "/privacy"}
        ],
        "customerCare": [
            {"id": "1", "title": "Shipping", "url": "/shipping"},
            {"id": "2", "title": "Returns", "url": "/returns"},
            {"id": "3", "title": "Size Guide", "url": "/size-guide"},
            {"id": "4", "title": "Care Instructions", "url": "/care"}
        ],
        "socialMedia": [
            {"id": "1", "platform": "Instagram", "url": "https://instagram.com/carryluxe"},
            {"id": "2", "platform": "Facebook", "url": "https://facebook.com/carryluxe"},
            {"id": "3", "platform": "Twitter", "url": "https://twitter.com/carryluxe"}
        ]
    }'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE id = 1);
