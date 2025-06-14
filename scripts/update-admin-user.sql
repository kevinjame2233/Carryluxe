-- Update admin user credentials
UPDATE users 
SET 
  email = 'carryluxe3@gmail.com',
  password_hash = '$2a$10$...' -- This would be the hashed version of 'kevinjame@2'
WHERE role = 'admin';

-- If no admin user exists, create one
INSERT INTO users (email, password_hash, first_name, last_name, role)
SELECT 'carryluxe3@gmail.com', '$2a$10$...', 'Admin', 'User', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'admin');
