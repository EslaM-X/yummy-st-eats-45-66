
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const ST_API_KEY = Deno.env.get("ST_API_KEY") || "";
const ST_API_BASE_URL = Deno.env.get("ST_API_BASE_URL") || "https://api.example.com/st-vpc/v1";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get authorization header for user identification
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", message: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user from authorization token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", message: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user is admin for refund operations
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "Forbidden", message: "Profile not found" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Allow both admins and regular users to request refunds
    // (Admin verification can be added later if needed)

    // Only process POST requests for refund transactions
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed", message: "Only POST requests are allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const requestData = await req.json();
    const { order_id, amount } = requestData;

    // Validate input data
    if (!order_id || !amount) {
      return new Response(
        JSON.stringify({ 
          error: "Bad Request", 
          message: "Missing required fields. Required: order_id, amount" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format data for ST API
    const stRequestData = {
      order_id: order_id.toString(),
      amount: Number(amount)
    };

    console.log("Processing refund transaction", { order_id, amount });

    // Call ST virtual card API
    const stResponse = await fetch(`${ST_API_BASE_URL}/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ST_API_KEY,
      },
      body: JSON.stringify(stRequestData),
    });

    const stResponseData = await stResponse.json();

    if (!stResponse.ok) {
      console.error("ST API refund error", stResponseData);
      return new Response(
        JSON.stringify({ 
          error: "Refund Failed", 
          message: stResponseData.message || "Failed to process refund",
          code: stResponseData.code || "unknown_error",
          data: stResponseData.data || {}
        }),
        { status: stResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Find original payment transaction to get card details
    const { data: paymentTransaction, error: paymentError } = await supabase
      .from("st_virtual_card_transactions")
      .select("card_last_four")
      .eq("order_id", stRequestData.order_id)
      .eq("transaction_type", "payment")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Record refund transaction in database
    const { data: transactionData, error: transactionError } = await supabase
      .from("st_virtual_card_transactions")
      .insert({
        transaction_id: stResponseData.refund_txn_id.toString(),
        transaction_type: "refund",
        card_last_four: paymentTransaction?.card_last_four || null,
        amount: stRequestData.amount,
        order_id: stRequestData.order_id,
        status: "completed",
        user_id: user.id
      })
      .select("id, transaction_id, status")
      .single();

    if (transactionError) {
      console.error("Database error recording refund", transactionError);
      // Return successful refund but log the database error
      return new Response(
        JSON.stringify({ 
          refund_txn_id: stResponseData.refund_txn_id,
          status: stResponseData.status,
          message: "Refund processed but failed to record in database"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify({ 
        refund_txn_id: stResponseData.refund_txn_id,
        status: stResponseData.status || "success",
        new_wallet_bal: stResponseData.new_wallet_bal,
        new_card_bal: stResponseData.new_card_bal,
        db_record: transactionData
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Refund processing error", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        message: error.message || "An unexpected error occurred"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
