-- Create homepage_settings table for storing homepage content
CREATE TABLE IF NOT EXISTS homepage_settings (
  id SERIAL PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT 'Elevated Luxury.\nTimeless Icons.',
  hero_subtitle TEXT NOT NULL DEFAULT 'Discover the world''s most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.',
  hero_media JSONB DEFAULT '[]'::jsonb,
  hermes_title VARCHAR(255) NOT NULL DEFAULT 'Hermès',
  hermes_description TEXT NOT NULL DEFAULT 'The pinnacle of French craftsmanship since 1837',
  hermes_image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
  lv_title VARCHAR(255) NOT NULL DEFAULT 'Louis Vuitton',
  lv_description TEXT NOT NULL DEFAULT 'Iconic monogram and timeless elegance since 1854',
  lv_image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
  shop_by_icon_title VARCHAR(255) NOT NULL DEFAULT 'Shop by Icon',
  shop_by_icon_subtitle TEXT NOT NULL DEFAULT 'The most coveted handbags in the world',
  trending_title VARCHAR(255) NOT NULL DEFAULT 'Trending Now',
  trending_subtitle TEXT NOT NULL DEFAULT 'The latest arrivals that are capturing hearts worldwide',
  cta_title VARCHAR(255) NOT NULL DEFAULT 'Join the Elite',
  cta_description TEXT NOT NULL DEFAULT 'Become part of an exclusive community that appreciates the finest in luxury craftsmanship. Discover pieces that transcend trends and define timeless elegance.',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on updated_at for performance
CREATE INDEX IF NOT EXISTS idx_homepage_settings_updated_at ON homepage_settings(updated_at);

-- Insert default settings if table is empty
INSERT INTO homepage_settings (
  hero_title,
  hero_subtitle,
  hero_media,
  hermes_title,
  hermes_description,
  hermes_image,
  lv_title,
  lv_description,
  lv_image,
  shop_by_icon_title,
  shop_by_icon_subtitle,
  trending_title,
  trending_subtitle,
  cta_title,
  cta_description
) 
SELECT 
  'Elevated Luxury.\nTimeless Icons.',
  'Discover the world''s most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.',
  '[{"type": "image", "url": "/placeholder.svg?height=1080&width=1920", "alt": "Luxury handbags collection"}]'::jsonb,
  'Hermès',
  'The pinnacle of French craftsmanship since 1837',
  '/placeholder.svg?height=400&width=600',
  'Louis Vuitton',
  'Iconic monogram and timeless elegance since 1854',
  '/placeholder.svg?height=400&width=600',
  'Shop by Icon',
  'The most coveted handbags in the world',
  'Trending Now',
  'The latest arrivals that are capturing hearts worldwide',
  'Join the Elite',
  'Become part of an exclusive community that appreciates the finest in luxury craftsmanship. Discover pieces that transcend trends and define timeless elegance.'
WHERE NOT EXISTS (SELECT 1 FROM homepage_settings);
