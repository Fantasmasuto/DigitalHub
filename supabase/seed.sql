-- DigitalHub Seed Data
-- Run after schema.sql

-- Categories
INSERT INTO categories (id, name, slug, description, icon, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Streaming', 'streaming', 'Plataformas de streaming de video', 'Tv', 1),
  ('00000000-0000-0000-0000-000000000002', 'Música', 'musica', 'Plataformas de streaming de música', 'Music', 2),
  ('00000000-0000-0000-0000-000000000003', 'Gaming', 'gaming', 'Videojuegos y créditos de juegos', 'Gamepad2', 3),
  ('00000000-0000-0000-0000-000000000004', 'Recargas', 'recargas', 'Recargas de celular y datos', 'Smartphone', 4),
  ('00000000-0000-0000-0000-000000000005', 'Gift Cards', 'gift-cards', 'Tarjetas de regalo digitales', 'Gift', 5),
  ('00000000-0000-0000-0000-000000000006', 'Otros Servicios', 'otros-servicios', 'VPN, software, almacenamiento', 'Globe', 6);

-- Products
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, cost_price, category_id, product_type, image_url, stock, is_active, is_featured, tags) VALUES
  ('Netflix Premium', 'netflix-premium', 'Cuenta Netflix Premium con acceso a 4 pantallas simultáneas en calidad Ultra HD.', '4 pantallas, Ultra HD, catálogo completo', 5.99, 15.99, 3.00, '00000000-0000-0000-0000-000000000001', 'profile', 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400&h=300&fit=crop', 50, true, true, ARRAY['streaming', 'netflix', 'premium']),
  ('Disney+ Premium', 'disney-plus-premium', 'Accede a todo el contenido de Disney, Pixar, Marvel, Star Wars y National Geographic en calidad 4K HDR.', 'Disney, Marvel, Star Wars en 4K HDR', 4.99, 12.99, 2.50, '00000000-0000-0000-0000-000000000001', 'profile', 'https://images.unsplash.com/photo-1640499900704-b00dd6a1104a?w=400&h=300&fit=crop', 35, true, true, ARRAY['streaming', 'disney', 'marvel']),
  ('Max (HBO) Premium', 'max-hbo-premium', 'Disfruta de HBO Max con acceso completo a series exclusivas y películas de estreno.', 'Series HBO, películas de estreno', 4.49, 11.99, 2.00, '00000000-0000-0000-0000-000000000001', 'profile', 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop', 28, true, false, ARRAY['streaming', 'hbo', 'max']),
  ('Amazon Prime Video', 'amazon-prime-video', 'Cuenta de Amazon Prime Video con acceso a series, películas y contenido exclusivo.', 'Series y películas exclusivas Amazon', 3.99, 9.99, 2.00, '00000000-0000-0000-0000-000000000001', 'full_account', 'https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?w=400&h=300&fit=crop', 40, true, false, ARRAY['streaming', 'amazon', 'prime']),
  ('Spotify Premium', 'spotify-premium', 'Escucha millones de canciones sin anuncios, descarga música offline y disfruta de audio en alta calidad.', 'Sin anuncios, descarga offline, HQ audio', 3.99, 9.99, 2.00, '00000000-0000-0000-0000-000000000002', 'membership', 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop', 60, true, true, ARRAY['musica', 'spotify', 'premium']),
  ('Apple Music', 'apple-music', 'Accede a más de 100 millones de canciones, audio sin pérdida y Dolby Atmos.', '100M+ canciones, Lossless, Dolby Atmos', 4.49, 10.99, 2.50, '00000000-0000-0000-0000-000000000002', 'membership', 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=300&fit=crop', 30, true, false, ARRAY['musica', 'apple', 'lossless']),
  ('Xbox Game Pass Ultimate', 'xbox-game-pass-ultimate', 'Accede a cientos de juegos en Xbox, PC y la nube. Incluye Xbox Live Gold, EA Play y más.', 'Cientos de juegos, Xbox + PC + Cloud', 12.99, 17.99, 8.00, '00000000-0000-0000-0000-000000000003', 'subscription', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop', 25, true, true, ARRAY['gaming', 'xbox', 'gamepass']),
  ('Robux 800', 'robux-800', '800 Robux para Roblox. Personaliza tu avatar, compra accesorios y desbloquea experiencias.', '800 Robux para tu cuenta de Roblox', 9.99, NULL, 7.00, '00000000-0000-0000-0000-000000000003', 'code', 'https://images.unsplash.com/photo-1616588589676-62b3d4ff6a90?w=400&h=300&fit=crop', 100, true, false, ARRAY['gaming', 'roblox', 'robux']),
  ('V-Bucks 1000', 'v-bucks-1000', '1000 V-Bucks para Fortnite. Compra skins, pases de batalla y más.', '1000 V-Bucks para Fortnite', 8.99, 11.99, 6.00, '00000000-0000-0000-0000-000000000003', 'code', 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=300&fit=crop', 75, true, false, ARRAY['gaming', 'fortnite', 'vbucks']),
  ('Recarga Telcel $50', 'recarga-telcel-50', 'Recarga de saldo Telcel por $50 MXN. Se aplica automáticamente a tu número.', 'Recarga automática de saldo Telcel', 5.00, NULL, 4.50, '00000000-0000-0000-0000-000000000004', 'recharge', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop', 200, true, false, ARRAY['recargas', 'telcel', 'saldo']),
  ('Google Play $25', 'google-play-25', 'Tarjeta de regalo Google Play de $25 USD. Compra apps, juegos, películas y más.', 'Gift card $25 USD Google Play', 25.00, NULL, 22.00, '00000000-0000-0000-0000-000000000005', 'gift_card', 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop', 45, true, true, ARRAY['giftcard', 'google', 'play']),
  ('NordVPN 1 Año', 'nordvpn-1-year', 'Suscripción de NordVPN por 1 año. Navega de forma segura y privada desde cualquier lugar.', 'VPN premium por 1 año completo', 29.99, 59.99, 15.00, '00000000-0000-0000-0000-000000000006', 'subscription', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop', 20, true, false, ARRAY['vpn', 'nordvpn', 'seguridad']);

-- Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_purchase, max_uses, expires_at) VALUES
  ('WELCOME10', '10% de descuento para nuevos usuarios', 'percentage', 10, 0, 1000, '2025-12-31'),
  ('SAVE5', '$5 de descuento en tu compra', 'fixed', 5, 10, 500, '2025-06-30'),
  ('SUMMER25', '25% descuento de verano', 'percentage', 25, 20, 200, '2025-09-01');
