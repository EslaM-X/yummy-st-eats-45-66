
import { supabase } from '@/integrations/supabase/client';

/**
 * خدمة التعامل مع الإشعارات في التطبيق
 */
export const NotificationService = {
  /**
   * جلب إشعارات المستخدم
   */
  async getUserNotifications() {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching user notifications:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب عدد الإشعارات غير المقروءة
   */
  async getUnreadCount() {
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

      if (error) throw error;

      return { count: count || 0, error: null };
    } catch (error: any) {
      console.error('Error fetching unread notification count:', error);
      return { count: 0, error };
    }
  },

  /**
   * تحديث حالة قراءة الإشعار
   */
  async markAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      return { data: null, error };
    }
  },

  /**
   * تحديث حالة قراءة جميع الإشعارات
   */
  async markAllAsRead() {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error);
      return { success: false, error };
    }
  },

  /**
   * إنشاء إشعار جديد
   */
  async createNotification(notification: {
    title: string;
    message: string;
    notification_type: 'order' | 'promotion' | 'system' | 'reward' | 'other';
    reference_id?: string;
    user_id: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating notification:', error);
      return { data: null, error };
    }
  }
};
