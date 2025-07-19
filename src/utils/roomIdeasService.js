import { supabase } from './supabase';

const roomIdeasService = {
  // Get all room ideas
  getRoomIdeas: async () => {
    try {
      const { data, error } = await supabase
        .from('room_ideas')
        .select('*')
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
      return { success: false, error: 'Failed to load room ideas', data: [] };
    }
  },

  // Get featured room ideas
  getFeaturedRoomIdeas: async () => {
    try {
      const { data, error } = await supabase
        .from('room_ideas')
        .select('*')
        .eq('featured', true)
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
      return { success: false, error: 'Failed to load featured room ideas', data: [] };
    }
  },

  // Get room ideas by type
  getRoomIdeasByType: async (roomType) => {
    try {
      const { data, error } = await supabase
        .from('room_ideas')
        .select('*')
        .eq('room_type', roomType)
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
      return { success: false, error: 'Failed to load room ideas by type', data: [] };
    }
  }
};

export default roomIdeasService;