
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ST_API_KEY = Deno.env.get("ST_API_KEY") || "";
const ST_API_BASE_URL = Deno.env.get("ST_API_BASE_URL") || "https://api.example.com/st-vpc/v1";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

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

    // Only process POST requests for payment transactions
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed", message: "Only POST requests are allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const requestData = await req.json();
    const { card_number, cvv, amount, order_id } = requestData;

    // Validate input data
    if (!card_number || !cvv || !amount || !order_id) {
      return new Response(
        JSON.stringify({ 
          error: "Bad Request", 
          message: "Missing required fields. Required: card_number, cvv, amount, order_id" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format data for ST API
    const stRequestData = {
      card_number: card_number.replace(/\s+/g, ''),
      cvv,
      amount: Number(amount.toFixed(5)),
      order_id: order_id.toString()
    };

    console.log("Processing payment transaction", { order_id, amount });

    // Call ST virtual card API
    const stResponse = await fetch(`${ST_API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ST_API_KEY,
      },
      body: JSON.stringify(stRequestData),
    });

    const stResponseData = await stResponse.json();

    if (!stResponse.ok) {
      console.error("ST API payment error", stResponseData);
      return new Response(
        JSON.stringify({ 
          error: "Payment Failed", 
          message: stResponseData.message || "Failed to process payment",
          code: stResponseData.code || "unknown_error",
          data: stResponseData.data || {}
        }),
        { status: stResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record transaction in database
    const { data: transactionData, error: transactionError } = await supabase
      .from("st_virtual_card_transactions")
      .insert({
        transaction_id: stResponseData.transaction_id.toString(),
        transaction_type: "payment",
        card_number: stRequestData.card_number,
        card_last_four: stRequestData.card_number.slice(-4),
        cvv: stRequestData.cvv,
        amount: stRequestData.amount,
        order_id: stRequestData.order_id,
        status: stResponseData.status || "frozen",
        user_id: user.id
      })
      .select("id, transaction_id, status")
      .single();

    if (transactionError) {
      console.error("Database error recording payment", transactionError);
      // Return successful payment but log the database error
      return new Response(
        JSON.stringify({ 
          transaction_id: stResponseData.transaction_id,
          status: stResponseData.status,
          message: "Payment processed but failed to record in database"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify({ 
        transaction_id: stResponseData.transaction_id,
        status: stResponseData.status,
        db_record: transactionData
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Payment processing error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        message: error.message || "An unexpected error occurred"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
