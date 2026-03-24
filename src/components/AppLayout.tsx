import {
  Shield,
  Map,
  ClipboardCheck,
  Home,
  Info,
  Phone,
  LogIn,
  LogOut,
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
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
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
    { title: t("nav.contact"), url: "/contact", icon: Phone },
  ];

  const appNav = [
    { title: t("nav.submissions"), url: "/submissions", icon: Map },
    ...(userRole === "manager" || userRole === "admin"
      ? [{ title: t("nav.manager"), url: "/manager", icon: ClipboardCheck }]
      : []),
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
                {t("common.appname")}
              </span>
              <p className="text-[10px] text-sidebar-foreground/60 leading-tight">
                {t("common.gov")}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
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
            <SidebarGroupLabel>{t("nav.submissions")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {appNav.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent/50"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
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
        )}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={signOut}
                className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span>{t("nav.logout")}</span>}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild isActive={isActive("/login")}>
                <NavLink
                  to="/login"
                  className="hover:bg-sidebar-accent/50"
                  activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
