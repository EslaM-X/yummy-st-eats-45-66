
import { supabase } from '@/integrations/supabase/client';

/**
 * خدمة نقاط المكافآت في التطبيق
 */
export const RewardService = {
  /**
   * جلب نقاط المستخدم
   */
  async getUserPoints() {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول للوصول إلى نقاط المكافآت');
      }

      const { data, error } = await supabase
        .from('reward_points')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) throw error;

      // إذا لم يتم العثور على سجل للمستخدم، قم بإنشائه
      if (!data) {
        const { data: new_data, error: insert_error } = await supabase
          .from('reward_points')
          .insert({
            user_id: session.user.id,
            points: 0,
            lifetime_points: 0,
            level: 'bronze'
          })
          .select()
          .single();

        if (insert_error) throw insert_error;

        return { data: new_data, error: null };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching user points:', error);
      return { data: null, error };
    }
  },

  /**
   * جلب سجل نقاط المستخدم
   */
  async getUserPointsHistory() {
    try {
      const { data, error } = await supabase
        .from('reward_points_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching user points history:', error);
      return { data: [], error };
    }
  },

  /**
   * إضافة نقاط للمستخدم
   */
  async addPoints(amount: number, description: string, source: string, reference_id?: string) {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لإضافة نقاط المكافآت');
      }

      // إضافة سجل للنقاط
      const { error: history_error } = await supabase
        .from('reward_points_history')
        .insert({
          user_id: session.user.id,
          amount,
          description,
          source,
          reference_id
        });

      if (history_error) throw history_error;

      // جلب النقاط الحالية للمستخدم
      const { data: points_data } = await supabase
        .from('reward_points')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      // تحديث نقاط المستخدم
      if (!points_data) {
        // إنشاء سجل جديد إذا لم يكن موجودًا
        const { data, error } = await supabase
          .from('reward_points')
          .insert({
            user_id: session.user.id,
            points: amount,
            lifetime_points: amount,
            level: this.calculateLevel(amount)
          })
          .select()
          .single();

        if (error) throw error;
        return { data, error: null };
      } else {
        // تحديث السجل الموجود
        const new_points = points_data.points + amount;
        const new_lifetime_points = points_data.lifetime_points + amount;
        const new_level = this.calculateLevel(new_lifetime_points);

        const { data, error } = await supabase
          .from('reward_points')
          .update({
            points: new_points,
            lifetime_points: new_lifetime_points,
            level: new_level,
            updated_at: new Date().toISOString()
          })
          .eq('id', points_data.id)
          .select()
          .single();

        if (error) throw error;
        return { data, error: null };
      }
    } catch (error: any) {
      console.error('Error adding points:', error);
      return { data: null, error };
    }
  },

  /**
   * استخدام النقاط (استبدالها)
   */
  async redeemPoints(amount: number, description: string, reference_id?: string) {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لاستبدال نقاط المكافآت');
      }

      // جلب النقاط الحالية للمستخدم
      const { data: points_data } = await supabase
        .from('reward_points')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!points_data) {
        throw new Error('لا توجد نقاط مكافآت للاستبدال');
      }

      if (points_data.points < amount) {
        throw new Error('نقاط المكافآت غير كافية للاستبدال');
      }

      // إضافة سجل للنقاط (قيمة سالبة للاستبدال)
      const { error: history_error } = await supabase
        .from('reward_points_history')
        .insert({
          user_id: session.user.id,
          amount: -amount, // قيمة سالبة للاستبدال
          description,
          source: 'redemption',
          reference_id
        });

      if (history_error) throw history_error;

      // تحديث نقاط المستخدم
      const new_points = points_data.points - amount;
      const { data, error } = await supabase
        .from('reward_points')
        .update({
          points: new_points,
          updated_at: new Date().toISOString()
        })
        .eq('id', points_data.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error redeeming points:', error);
      return { data: null, error };
    }
  },

  /**
   * حساب مستوى المستخدم بناءً على نقاط المكافآت التراكمية
   */
  calculateLevel(lifetimePoints: number): 'bronze' | 'silver' | 'gold' | 'platinum' {
    if (lifetimePoints >= 5000) {
      return 'platinum';
    } else if (lifetimePoints >= 2000) {
      return 'gold';
    } else if (lifetimePoints >= 500) {
      return 'silver';
    } else {
      return 'bronze';
    }
  }
};
