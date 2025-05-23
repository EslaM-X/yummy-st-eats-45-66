
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types';

export class NotificationService {
  static async getUserNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching notifications:', error);
        return { data: null, error };
      }
      
      return { data: data as Notification[], error: null };
    } catch (error) {
      console.error('Exception fetching notifications:', error);
      return { data: null, error };
    }
  }
  
  static async markNotificationAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      if (error) {
        console.error('Error marking notification as read:', error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Exception marking notification as read:', error);
      return { success: false, error };
    }
  }
  
  static async markAllNotificationsAsRead(userId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);
      
      if (error) {
        console.error('Error marking all notifications as read:', error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Exception marking all notifications as read:', error);
      return { success: false, error };
    }
  }
  
  static async deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) {
        console.error('Error deleting notification:', error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Exception deleting notification:', error);
      return { success: false, error };
    }
  }
  
  static async getUnreadCount(userId: string) {
    try {
      const { data, error, count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false);
      
      if (error) {
        console.error('Error getting unread notification count:', error);
        return { count: 0, error };
      }
      
      return { count, error: null };
    } catch (error) {
      console.error('Exception getting unread notification count:', error);
      return { count: 0, error };
    }
  }
}
