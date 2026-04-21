// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { LanguageProvider } from "@/i18n/LanguageContext";
// import { AuthProvider, useAuth } from "@/contexts/AuthContext";
// import AppLayout from "@/components/AppLayout";

// // PAGES
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Index from "./pages/index";
// import Manager from "./pages/Manager";
// import News from "./pages/News";
// import Services from "./pages/Services";
// import FAQ from "./pages/FAQ";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// // -----------------------------
// // PROTECTED ROUTE
// // -----------------------------
// function ProtectedRoute({
//   children,
//   requiredRole,
// }: {
//   children: React.ReactNode;
//   requiredRole?: string;
// }) {
//   const { user, loading, userRole } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-muted-foreground">
//         Loading...
//       </div>
//     );
//   }

//   // ❌ not logged in
//   if (!user) return <Navigate to="/login" replace />;

//   // ❌ wrong role
//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/submissions" replace />;
//   }

//   return <>{children}</>;
// }

// // -----------------------------
// // APP
// // -----------------------------
// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <LanguageProvider>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />

//           <BrowserRouter>
//             <AppLayout>
//               <Routes>
//                 {/* ---------------- PUBLIC ---------------- */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/news" element={<News />} />
//                 <Route path="/services" element={<Services />} />
//                 <Route path="/faq" element={<FAQ />} />
//                 <Route path="/login" element={<Login />} />

//                 {/* ---------------- USER ---------------- */}
//                 {/* <Route
//                   path="/submissions"
//                   element={
//                     <ProtectedRoute>
//                       <Index />
//                     </ProtectedRoute>
//                   }
//                 /> */}
//                 <Route
//                   path="/submissions"
//                   element={
//                     <ProtectedRoute requiredRole="sector_user">
//                       <Index />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* ---------------- MANAGER ---------------- */}
//                 {/* <Route
//                   path="/manager"
//                   element={
//                     <ProtectedRoute requiredRole="manager">
//                       <Manager />
//                     </ProtectedRoute>
//                   }
//                 /> */}
//                 <Route
//                   path="/manager"
//                   element={
//                     <ProtectedRoute requiredRole="manager">
//                       <Manager />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* ---------------- 404 ---------------- */}
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </AppLayout>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </LanguageProvider>
//   </QueryClientProvider>
// );

// export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext"; // ✅ NEW
import AppLayout from "@/components/AppLayout";

// PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Index from "./pages/index";
import Manager from "./pages/Manager";
import News from "./pages/News";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help"; // ✅ NEW
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// -----------------------------
// PROTECTED ROUTE
// -----------------------------
function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading, userRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading...
      </div>
    );
  }

  // ❌ not logged in
  if (!user) return <Navigate to="/login" replace />;

  // ❌ wrong role (allow admin override like your new version)
  if (requiredRole && userRole !== requiredRole && userRole !== "admin") {
    return <Navigate to="/submissions" replace />;
  }

  return <>{children}</>;
}

// -----------------------------
// APP
// -----------------------------
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      {" "}
      {/* ✅ NEW */}
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <AppLayout>
                <Routes>
                  {/* ---------------- PUBLIC ---------------- */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/help" element={<Help />} /> {/* ✅ NEW */}
                  <Route path="/login" element={<Login />} />
                  {/* ---------------- USER ---------------- */}
                  <Route
                    path="/submissions"
                    element={
                      <ProtectedRoute requiredRole="sector_user">
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  {/* ---------------- MANAGER ---------------- */}
                  <Route
                    path="/manager"
                    element={
                      <ProtectedRoute requiredRole="manager">
                        <Manager />
                      </ProtectedRoute>
                    }
                  />
                  {/* ---------------- 404 ---------------- */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;