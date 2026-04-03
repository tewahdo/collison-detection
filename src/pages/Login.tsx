


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { useLanguage } from '@/i18n/LanguageContext';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Shield, LogIn, UserPlus, Users, Briefcase } from 'lucide-react';
// import { toast } from 'sonner';

// type LoginRole = 'sector_user' | 'manager';

// export default function Login() {
//   const { t } = useLanguage();
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedRole, setSelectedRole] = useState<LoginRole | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedRole) {
//       toast.error(t('auth.select.role.error'));
//       return;
//     }
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: { full_name: fullName },
//             emailRedirectTo: window.location.origin,
//           },
//         });
//         if (error) throw error;
//         toast.success(t('auth.verify.email'));
//       } else {
//         const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;

//         if (authData.user) {
//           const { data: roleData } = await supabase
//             .from('user_roles')
//             .select('role')
//             .eq('user_id', authData.user.id)
//             .maybeSingle();

//           const dbRole = roleData?.role ?? 'sector_user';

//           // Validate role selection matches database role
//           if (selectedRole === 'manager' && dbRole !== 'manager' && dbRole !== 'admin') {
//             await supabase.auth.signOut();
//             toast.error(t('auth.role.mismatch'));
//             setLoading(false);
//             return;
//           }

//           toast.success(t('common.success'));
//           if (selectedRole === 'manager') {
//             navigate('/manager');
//           } else {
//             navigate('/submissions');
//           }
//         }
//       }
//     } catch (err: any) {
//       toast.error(err.message || t('common.error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Role selection screen
//   if (!selectedRole) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
//               <Shield className="h-8 w-8 text-primary" />
//             </div>
//             <h1 className="text-xl font-bold text-foreground">{t('common.appname')}</h1>
//             <p className="text-sm text-muted-foreground mt-1">{t('common.tagline')}</p>
//             <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium">
//               {t('common.gov')}
//             </div>
//           </div>

//           <Card className="border-border shadow-lg">
//             <CardHeader className="pb-2 text-center">
//               <CardTitle className="text-lg">{t('auth.select.role')}</CardTitle>
//               <CardDescription>{t('auth.select.role.desc')}</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <button
//                 onClick={() => setSelectedRole('sector_user')}
//                 className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
//               >
//                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
//                   <Users className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-foreground">{t('auth.role.sector')}</p>
//                   <p className="text-xs text-muted-foreground">{t('auth.role.sector.desc')}</p>
//                 </div>
//               </button>

//               <button
//                 onClick={() => setSelectedRole('manager')}
//                 className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
//               >
//                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
//                   <Briefcase className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-foreground">{t('auth.role.manager')}</p>
//                   <p className="text-xs text-muted-foreground">{t('auth.role.manager.desc')}</p>
//                 </div>
//               </button>
//             </CardContent>
//           </Card>

//           <p className="text-xs text-muted-foreground text-center mt-6">
//             {t('common.copyright')}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
//             <Shield className="h-8 w-8 text-primary" />
//           </div>
//           <h1 className="text-xl font-bold text-foreground">{t('common.appname')}</h1>
//           <p className="text-sm text-muted-foreground mt-1">{t('common.tagline')}</p>
//           <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium">
//             {t('common.gov')}
//           </div>
//         </div>

//         <Card className="border-border shadow-lg">
//           <CardHeader className="pb-2 text-center">
//             <div className="flex items-center justify-center gap-2 mb-1">
//               {selectedRole === 'manager' ? (
//                 <Briefcase className="h-5 w-5 text-primary" />
//               ) : (
//                 <Users className="h-5 w-5 text-primary" />
//               )}
//               <span className="text-sm font-medium text-primary">
//                 {selectedRole === 'manager' ? t('auth.role.manager') : t('auth.role.sector')}
//               </span>
//             </div>
//             <CardTitle className="text-lg">
//               {isSignUp ? t('auth.signup') : t('auth.login')}
//             </CardTitle>
//             <CardDescription>
//               {isSignUp ? t('auth.welcome.new') : t('auth.welcome')}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {isSignUp && (
//                 <div className="space-y-2">
//                   <Label htmlFor="fullname">{t('auth.fullname')}</Label>
//                   <Input
//                     id="fullname"
//                     value={fullName}
//                     onChange={e => setFullName(e.target.value)}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="email">{t('auth.email')}</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">{t('auth.password')}</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? t('common.loading') : (
//                   <>
//                     {isSignUp ? <UserPlus className="h-4 w-4 mr-2" /> : <LogIn className="h-4 w-4 mr-2" />}
//                     {isSignUp ? t('auth.signup.btn') : t('auth.login.btn')}
//                   </>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-4 text-center space-y-2">
//               <button
//                 type="button"
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="text-sm text-primary hover:underline"
//               >
//                 {isSignUp ? t('auth.have.account') : t('auth.no.account')}
//               </button>
//               <div>
//                 <button
//                   type="button"
//                   onClick={() => setSelectedRole(null)}
//                   className="text-xs text-muted-foreground hover:text-foreground hover:underline"
//                 >
//                   ← {t('auth.change.role')}
//                 </button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <p className="text-xs text-muted-foreground text-center mt-6">
//           {t('common.copyright')}
//         </p>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Shield,
  LogIn,
  UserPlus,
  Users,
  Briefcase,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

type LoginRole = "sector_user" | "manager";

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<LoginRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error(t("auth.select.role.error"));
      return;
    }
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, role: selectedRole },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success(t("auth.verify.email"));
      } else {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (authData.user) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", authData.user.id)
            .maybeSingle();

          const dbRole = roleData?.role ?? "sector_user";

          if (
            selectedRole === "manager" &&
            dbRole !== "manager" &&
            dbRole !== "admin"
          ) {
            await supabase.auth.signOut();
            toast.error(t("auth.role.mismatch"));
            setLoading(false);
            return;
          }

          toast.success(t("auth.login.success"));
          if (selectedRole === "manager") {
            navigate("/manager");
          } else {
            navigate("/submissions");
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="gov-stripe" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary shadow-lg shadow-primary/20 mb-5">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-extrabold text-foreground">
                {t("common.appname")}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {t("common.tagline")}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-semibold border border-primary/10">
                {t("common.gov")}
              </div>
            </div>

            <Card className="border-border shadow-xl">
              <CardHeader className="pb-4 text-center">
                <CardTitle className="text-xl">
                  {t("auth.select.role")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("auth.select.role.desc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                <button
                  onClick={() => setSelectedRole("sector_user")}
                  className="w-full flex items-center gap-5 p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      {t("auth.role.sector")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {t("auth.role.sector.desc")}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedRole("manager")}
                  className="w-full flex items-center gap-5 p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      {t("auth.role.manager")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {t("auth.role.manager.desc")}
                    </p>
                  </div>
                </button>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center mt-8">
              {t("common.copyright")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="gov-stripe" />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary shadow-lg shadow-primary/20 mb-4">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-extrabold text-foreground">
              {t("common.appname")}
            </h1>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-semibold border border-primary/10">
              {t("common.gov")}
            </div>
          </div>

          <Card className="border-border shadow-xl">
            <CardHeader className="pb-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center ${selectedRole === "manager" ? "bg-accent/10" : "bg-primary/10"}`}
                >
                  {selectedRole === "manager" ? (
                    <Briefcase className="h-4 w-4 text-accent" />
                  ) : (
                    <Users className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {selectedRole === "manager"
                    ? t("auth.role.manager")
                    : t("auth.role.sector")}
                </span>
              </div>
              <CardTitle className="text-xl">
                {isSignUp ? t("auth.signup") : t("auth.login")}
              </CardTitle>
              <CardDescription>
                {isSignUp ? t("auth.welcome.new") : t("auth.welcome")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullname">{t("auth.fullname")}</Label>
                    <Input
                      id="fullname"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder={t("auth.fullname.placeholder")}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t("auth.email.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={loading}
                >
                  {loading ? (
                    t("common.loading")
                  ) : (
                    <>
                      {isSignUp ? (
                        <UserPlus className="h-4 w-4 mr-2" />
                      ) : (
                        <LogIn className="h-4 w-4 mr-2" />
                      )}
                      {isSignUp ? t("auth.signup.btn") : t("auth.login.btn")}
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-5 space-y-3">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    {isSignUp ? t("auth.have.account") : t("auth.no.account")}
                  </button>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    {t("auth.change.role")}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-8">
            {t("common.copyright")}
          </p>
        </div>
      </div>
    </div>
  );
}
