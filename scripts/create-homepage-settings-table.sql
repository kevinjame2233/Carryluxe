-- Create homepage settings table
CREATE TABLE IF NOT EXISTS homepage_settings (
  id SERIAL PRIMARY KEY,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_media JSONB DEFAULT '[]'::jsonb,
  hermes_title VARCHAR(255) DEFAULT 'Hermès',
  hermes_description TEXT DEFAULT 'The pinnacle of French craftsmanship since 1837',
  hermes_image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
  lv_title VARCHAR(255) DEFAULT 'Louis Vuitton',
  lv_description TEXT DEFAULT 'Iconic monogram and timeless elegance since 1854',
  lv_image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
  shop_by_icon_title VARCHAR(255) DEFAULT 'Shop by Icon',
  shop_by_icon_subtitle TEXT DEFAULT 'The most coveted handbags in the world',
  trending_title VARCHAR(255) DEFAULT 'Trending Now',
  trending_subtitle TEXT DEFAULT 'The latest arrivals that are capturing hearts worldwide',
  cta_title VARCHAR(255) DEFAULT 'Join the Elite',
  cta_description TEXT DEFAULT 'Become part of an exclusive community that appreciates the finest in luxury craftsmanship. Discover pieces that transcend trends and define timeless elegance.',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default homepage settings
INSERT INTO homepage_settings (
  hero_title,
  hero_subtitle,
  hero_media
) VALUES (
  'Elevated Luxury.
Timeless Icons.',
  'Discover the world''s most coveted handbags from Hermès and Louis Vuitton.
Where heritage meets contemporary elegance.',
  '[{"type": "image", "url": "/placeholder.svg?height=1080&width=1920", "alt": "Luxury handbags collection"}]'::jsonb
) ON CONFLICT DO NOTHING;
