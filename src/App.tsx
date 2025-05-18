
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantsPage from "./pages/RestaurantsPage";
import ProductsPage from "./pages/ProductsPage";
import WalletPage from "./pages/WalletPage";
import CartPage from "./pages/CartPage";
import RewardsPage from "./pages/RewardsPage";
import AddFoodPage from "./pages/AddFoodPage";
import RegisterRestaurantPage from "./pages/RegisterRestaurantPage";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/add-food" element={<AddFoodPage />} />
              <Route path="/register-restaurant" element={<RegisterRestaurantPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
