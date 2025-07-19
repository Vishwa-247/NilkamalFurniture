import { supabase } from './supabase';

const productService = {
  // Get all products with optional filters
  getProducts: async (filters = {}) => {
    try {
      let query = supabase.from('products').select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else {
        query = query.eq('status', 'active');
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to load products', data: [] };
    }
  },

  // Get product by ID
  getProduct: async (id) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load product' };
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return productService.getProducts({ featured: true });
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    return productService.getProducts({ category });
  },

  // Search products
  searchProducts: async (searchTerm) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to search products', data: [] };
    }
  }
};

export default productService;