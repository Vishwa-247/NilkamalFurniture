-- Create enums and types
CREATE TYPE public.product_category AS ENUM ('living_room', 'bedroom', 'dining', 'office', 'outdoor', 'storage');
CREATE TYPE public.product_status AS ENUM ('active', 'inactive', 'out_of_stock');
CREATE TYPE public.user_role AS ENUM ('admin', 'customer', 'manager');

-- User profiles table (intermediary for auth relationships)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'customer'::public.user_role,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category public.product_category NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    images TEXT[] DEFAULT '{}',
    stock_quantity INTEGER DEFAULT 0,
    status public.product_status DEFAULT 'active'::public.product_status,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Collections table
CREATE TABLE public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Room ideas table
CREATE TABLE public.room_ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    room_type TEXT NOT NULL,
    style TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Wishlist items table
CREATE TABLE public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_featured ON public.products(featured);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_wishlist_items_user_id ON public.wishlist_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.owns_cart_item(item_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.cart_items ci
    WHERE ci.id = item_id AND ci.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.owns_wishlist_item(item_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.wishlist_items wi
    WHERE wi.id = item_id AND wi.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.owns_order(order_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_id AND o.user_id = auth.uid()
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
-- User profiles
CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Products (public read, admin write)
CREATE POLICY "public_can_read_products" ON public.products FOR SELECT
TO public USING (status = 'active'::public.product_status);

CREATE POLICY "admin_manage_products" ON public.products FOR ALL
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Collections (public read, admin write)
CREATE POLICY "public_can_read_collections" ON public.collections FOR SELECT
TO public USING (true);

CREATE POLICY "admin_manage_collections" ON public.collections FOR ALL
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Room ideas (public read, admin write)
CREATE POLICY "public_can_read_room_ideas" ON public.room_ideas FOR SELECT
TO public USING (true);

CREATE POLICY "admin_manage_room_ideas" ON public.room_ideas FOR ALL
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Cart items (user owns)
CREATE POLICY "users_manage_cart" ON public.cart_items FOR ALL
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Wishlist items (user owns)
CREATE POLICY "users_manage_wishlist" ON public.wishlist_items FOR ALL
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Orders (user owns or admin)
CREATE POLICY "users_view_own_orders" ON public.orders FOR SELECT
TO authenticated USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "users_create_own_orders" ON public.orders FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_manage_all_orders" ON public.orders FOR ALL
TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Mock data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    customer_uuid UUID := gen_random_uuid();
    living_collection_id UUID := gen_random_uuid();
    bedroom_collection_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@myfurniturestore.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Store Admin", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (customer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'customer@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Demo Customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert collections
    INSERT INTO public.collections (id, name, description, image_url, slug, featured) VALUES
        (living_collection_id, 'Modern Living', 'Contemporary furniture for your living space', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'modern-living', true),
        (bedroom_collection_id, 'Cozy Bedroom', 'Comfortable and stylish bedroom furniture', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800', 'cozy-bedroom', true),
        (gen_random_uuid(), 'Office Essentials', 'Productive workspace furniture', 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800', 'office-essentials', false),
        (gen_random_uuid(), 'Dining Elegance', 'Elegant dining room furniture', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800', 'dining-elegance', true);

    -- Insert room ideas
    INSERT INTO public.room_ideas (title, description, image_url, room_type, style, featured) VALUES
        ('Scandinavian Living Room', 'Minimalist design with natural materials', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'living_room', 'scandinavian', true),
        ('Industrial Bedroom', 'Raw materials with modern comfort', 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800', 'bedroom', 'industrial', true),
        ('Modern Home Office', 'Clean lines for productivity', 'https://images.unsplash.com/photo-1555652488-b8db11a11bcd?w=800', 'office', 'modern', false),
        ('Rustic Dining Room', 'Warm wood tones for family gatherings', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', 'dining', 'rustic', true);

    -- Insert sample products
    INSERT INTO public.products (name, description, category, price, sale_price, images, stock_quantity, featured) VALUES
        ('Luxury Sofa Set', 'Premium 3-seater sofa with matching armchair', 'living_room'::public.product_category, 89999.00, 74999.00, 
         ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1563040426-37011d6e2531?w=800'], 15, true),
        ('King Size Bed', 'Elegant wooden bed frame with storage', 'bedroom'::public.product_category, 54999.00, null, 
         ARRAY['https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800'], 8, true),
        ('Executive Office Chair', 'Ergonomic chair for long work hours', 'office'::public.product_category, 19999.00, 16999.00, 
         ARRAY['https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800'], 25, false),
        ('Dining Table Set', '6-seater dining table with chairs', 'dining'::public.product_category, 42999.00, null, 
         ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800'], 5, true),
        ('Coffee Table', 'Modern glass-top coffee table', 'living_room'::public.product_category, 12999.00, 9999.00, 
         ARRAY['https://images.unsplash.com/photo-1549497538-303791108f95?w=800'], 20, false),
        ('Wardrobe', 'Spacious 4-door wardrobe with mirror', 'bedroom'::public.product_category, 35999.00, null, 
         ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], 12, false);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;