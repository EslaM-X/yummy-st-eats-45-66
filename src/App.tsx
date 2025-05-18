
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantsPage from "./pages/RestaurantsPage";
import ProductsPage from "./pages/ProductsPage";
import WalletPage from "./pages/WalletPage";
import CartPage from "./pages/CartPage";
import RewardsPage from "./pages/RewardsPage"; // صفحة المكافآت الجديدة
import AddFoodPage from "./pages/AddFoodPage"; // صفحة إضافة الطعام الجديدة

// Create theme provider for dark mode
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="st-eats-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/add-food" element={<AddFoodPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
