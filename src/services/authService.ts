
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: { full_name?: string, phone?: string }) {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: userData
        }
      });
      
      return { data, error };
    } catch (error) {
      console.error('Exception during sign up:', error);
      return { data: null, error };
    }
  },
  
  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error };
    } catch (error) {
      console.error('Exception during sign in:', error);
      return { data: null, error };
    }
  },
  
  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Exception during sign out:', error);
      return { error };
    }
  },
  
  // Reset password
  async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      return { data, error };
    } catch (error) {
      console.error('Exception during password reset:', error);
      return { data: null, error };
    }
  },
  
  // Update user password
  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      return { data, error };
    } catch (error) {
      console.error('Exception during password update:', error);
      return { data: null, error };
    }
  },
  
  // Get current user
  getCurrentUser() {
    return supabase.auth.getUser();
  },
  
  // Get current session
  getSession() {
    return supabase.auth.getSession();
  }
};

export default authService;
