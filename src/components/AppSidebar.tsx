// import {
//   Shield,
//   Map,
//   ClipboardCheck,
//   Home,
//   Info,
//   Phone,
//   LogIn,
//   LogOut,
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   useSidebar,
// } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const collapsed = state === "collapsed";
//   const location = useLocation();
//   const { t } = useLanguage();
//   const { user, userRole, signOut } = useAuth();
//   const isActive = (path: string) => location.pathname === path;

//   const publicNav = [
//     { title: t("nav.home"), url: "/", icon: Home },
//     { title: t("nav.about"), url: "/about", icon: Info },
//     { title: t("nav.contact"), url: "/contact", icon: Phone },
//   ];

//   const appNav = [
//     { title: t("nav.submissions"), url: "/submissions", icon: Map },
//     ...(userRole === "manager" || userRole === "admin"
//       ? [{ title: t("nav.manager"), url: "/manager", icon: ClipboardCheck }]
//       : []),
//   ];

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4">
//         <div className="flex items-center gap-2.5">
//           <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
//             <Shield className="h-4 w-4 text-primary-foreground" />
//           </div>
//           {!collapsed && (
//             <div>
//               <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
//                 {t("common.appname")}
//               </span>
//               <p className="text-[10px] text-sidebar-foreground/60 leading-tight">
//                 {t("common.gov")}
//               </p>
//             </div>
//           )}
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>{t("nav.home")}</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {publicNav.map((item) => (
//                 <SidebarMenuItem key={item.url}>
//                   <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                     <NavLink
//                       to={item.url}
//                       end
//                       className="hover:bg-sidebar-accent/50"
//                       activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                     >
//                       <item.icon className="mr-2 h-4 w-4" />
//                       {!collapsed && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {user && (
//           <SidebarGroup>
//             <SidebarGroupLabel>{t("nav.submissions")}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {appNav.map((item) => (
//                   <SidebarMenuItem key={item.url}>
//                     <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                       <NavLink
//                         to={item.url}
//                         end
//                         className="hover:bg-sidebar-accent/50"
//                         activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                       >
//                         <item.icon className="mr-2 h-4 w-4" />
//                         {!collapsed && <span>{item.title}</span>}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         )}
//       </SidebarContent>

//       <SidebarFooter className="p-3">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             {user ? (
//               <SidebarMenuButton
//                 onClick={signOut}
//                 className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 {!collapsed && <span>{t("nav.logout")}</span>}
//               </SidebarMenuButton>
//             ) : (
//               <SidebarMenuButton asChild isActive={isActive("/login")}>
//                 <NavLink
//                   to="/login"
//                   className="hover:bg-sidebar-accent/50"
//                   activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                 >
//                   <LogIn className="mr-2 h-4 w-4" />
//                   {!collapsed && <span>{t("nav.login")}</span>}
//                 </NavLink>
//               </SidebarMenuButton>
//             )}
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }



// import {
//   Shield,
//   Map,
//   ClipboardCheck,
//   Home,
//   Info,
//   Phone,
//   LogIn,
//   LogOut,
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   useSidebar,
// } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const collapsed = state === "collapsed";
//   const location = useLocation();
//   const { t } = useLanguage();
//   const { user, userRole, signOut } = useAuth();
//   const isActive = (path: string) => location.pathname === path;

//   const publicNav = [
//     { title: t("nav.home"), url: "/", icon: Home },
//     { title: t("nav.about"), url: "/about", icon: Info },
//     { title: t("nav.contact"), url: "/contact", icon: Phone },
//   ];

//   // Show different nav based on role
//   const isManager = userRole === "manager" || userRole === "admin";
//   const appNav = [
//     ...(isManager
//       ? [{ title: t("nav.manager"), url: "/manager", icon: ClipboardCheck }]
//       : []),
//     { title: t("nav.submissions"), url: "/submissions", icon: Map },
//   ];

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4">
//         <div className="flex items-center gap-2.5">
//           <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
//             <Shield className="h-4 w-4 text-primary-foreground" />
//           </div>
//           {!collapsed && (
//             <div>
//               <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
//                 {t("common.appname")}
//               </span>
//               <p className="text-[10px] text-sidebar-foreground/60 leading-tight">
//                 {t("common.gov")}
//               </p>
//             </div>
//           )}
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>{t("nav.home")}</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {publicNav.map((item) => (
//                 <SidebarMenuItem key={item.url}>
//                   <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                     <NavLink
//                       to={item.url}
//                       end
//                       className="hover:bg-sidebar-accent/50"
//                       activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                     >
//                       <item.icon className="mr-2 h-4 w-4" />
//                       {!collapsed && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {user && (
//           <SidebarGroup>
//             <SidebarGroupLabel>
//               {isManager ? t("nav.manager") : t("nav.submissions")}
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {appNav.map((item) => (
//                   <SidebarMenuItem key={item.url}>
//                     <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                       <NavLink
//                         to={item.url}
//                         end
//                         className="hover:bg-sidebar-accent/50"
//                         activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                       >
//                         <item.icon className="mr-2 h-4 w-4" />
//                         {!collapsed && <span>{item.title}</span>}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         )}
//       </SidebarContent>

//       <SidebarFooter className="p-3">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             {user ? (
//               <SidebarMenuButton
//                 onClick={signOut}
//                 className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 {!collapsed && <span>{t("nav.logout")}</span>}
//               </SidebarMenuButton>
//             ) : (
//               <SidebarMenuButton asChild isActive={isActive("/login")}>
//                 <NavLink
//                   to="/login"
//                   className="hover:bg-sidebar-accent/50"
//                   activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
//                 >
//                   <LogIn className="mr-2 h-4 w-4" />
//                   {!collapsed && <span>{t("nav.login")}</span>}
//                 </NavLink>
//               </SidebarMenuButton>
//             )}
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }










// import {
//   Shield,
//   Map,
//   ClipboardCheck,
//   Home,
//   Info,
//   Phone,
//   LogIn,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useLocation } from "react-router-dom";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   useSidebar,
// } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const collapsed = state === "collapsed";
//   const location = useLocation();
//   const { t } = useLanguage();
//   const { user, userRole, signOut } = useAuth();
//   const isActive = (path: string) => location.pathname === path;

//   const publicNav = [
//     { title: t("nav.home"), url: "/", icon: Home },
//     { title: t("nav.about"), url: "/about", icon: Info },
//     { title: t("nav.contact"), url: "/contact", icon: Phone },
//   ];

//   const isManager = userRole === "manager" || userRole === "admin";
//   const appNav = [
//     ...(isManager
//       ? [{ title: t("nav.manager"), url: "/manager", icon: ClipboardCheck }]
//       : []),
//     { title: t("nav.submissions"), url: "/submissions", icon: Map },
//   ];

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4">
//         <div className="flex items-center gap-3">
//           <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
//             <Shield className="h-4.5 w-4.5 text-primary-foreground" />
//           </div>
//           {!collapsed && (
//             <div>
//               <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
//                 {t("common.appname")}
//               </span>
//               <p className="text-[10px] text-sidebar-foreground/50 leading-tight mt-0.5">
//                 {t("common.gov")}
//               </p>
//             </div>
//           )}
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
//             {t("nav.home")}
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {publicNav.map((item) => (
//                 <SidebarMenuItem key={item.url}>
//                   <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                     <NavLink
//                       to={item.url}
//                       end
//                       className="hover:bg-sidebar-accent/50"
//                       activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
//                     >
//                       <item.icon className="mr-2 h-4 w-4" />
//                       {!collapsed && <span>{item.title}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {user && (
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
//               {isManager ? t("nav.manager") : t("nav.submissions")}
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {appNav.map((item) => (
//                   <SidebarMenuItem key={item.url}>
//                     <SidebarMenuButton asChild isActive={isActive(item.url)}>
//                       <NavLink
//                         to={item.url}
//                         end
//                         className="hover:bg-sidebar-accent/50"
//                         activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
//                       >
//                         <item.icon className="mr-2 h-4 w-4" />
//                         {!collapsed && <span>{item.title}</span>}
//                         {!collapsed && isActive(item.url) && (
//                           <ChevronRight className="ml-auto h-3.5 w-3.5 text-sidebar-primary" />
//                         )}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         )}
//       </SidebarContent>

//       <SidebarFooter className="p-3">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             {user ? (
//               <SidebarMenuButton
//                 onClick={signOut}
//                 className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 {!collapsed && <span>{t("nav.logout")}</span>}
//               </SidebarMenuButton>
//             ) : (
//               <SidebarMenuButton asChild isActive={isActive("/login")}>
//                 <NavLink
//                   to="/login"
//                   className="hover:bg-sidebar-accent/50"
//                   activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
//                 >
//                   <LogIn className="mr-2 h-4 w-4" />
//                   {!collapsed && <span>{t("nav.login")}</span>}
//                 </NavLink>
//               </SidebarMenuButton>
//             )}
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }




import {
  Shield,
  Map,
  ClipboardCheck,
  Home,
  Info,
  Phone,
  LogIn,
  LogOut,
  ChevronRight,
  Newspaper,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useLanguage();
  const { user, userRole, signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const publicNav = [
    { title: t("nav.home"), url: "/", icon: Home },
    { title: t("nav.about"), url: "/about", icon: Info },
    { title: t("home.quick.services"), url: "/services", icon: BookOpen },
    { title: t("home.quick.news"), url: "/news", icon: Newspaper },
    { title: t("home.quick.faq"), url: "/faq", icon: HelpCircle },
    { title: t("nav.contact"), url: "/contact", icon: Phone },
  ];

  const isManager = userRole === "manager" || userRole === "admin";
  const appNav = [
    ...(isManager
      ? [{ title: t("nav.manager"), url: "/manager", icon: ClipboardCheck }]
      : []),
    { title: t("nav.submissions"), url: "/submissions", icon: Map },
  ];
// if(userRole  !== "manager") return null;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
            <Shield className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
                {t("common.appname")}
              </span>
              <p className="text-[10px] text-sidebar-foreground/50 leading-tight mt-0.5">
                {t("common.gov")}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
            {t("nav.home")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40">
              {isManager ? t("nav.manager") : t("nav.submissions")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {appNav.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent/50"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                        {!collapsed && isActive(item.url) && (
                          <ChevronRight className="ml-auto h-3.5 w-3.5 text-sidebar-primary" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={signOut}
                className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span>{t("nav.logout")}</span>}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild isActive={isActive("/login")}>
                <NavLink
                  to="/login"
                  className="hover:bg-sidebar-accent/50"
                  activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{t("nav.login")}</span>}
                </NavLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
