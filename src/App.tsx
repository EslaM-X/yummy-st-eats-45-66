
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantsPage from "./pages/RestaurantsPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RewardsPage from "./pages/RewardsPage";
import AddFoodPage from "./pages/AddFoodPage";
import RegisterRestaurantPage from "./pages/RegisterRestaurantPage";
import AdminPage from "./pages/AdminPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import CoreTeamPage from "./pages/CoreTeamPage";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="st-eats-theme">
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <TooltipProvider>
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/restaurants" element={<RestaurantsPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="/add-food" element={<AddFoodPage />} />
                  <Route path="/register-restaurant" element={<RegisterRestaurantPage />} />
                  <Route path="/admin-login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="/core-team" element={<CoreTeamPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
