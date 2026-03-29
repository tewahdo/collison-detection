// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Shield, LogIn, UserPlus } from "lucide-react";
// import { toast } from "sonner";

// export default function Login() {
//   const { t } = useLanguage();
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
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
//         toast.success(
//           "Account created! Please check your email to verify your account.",
//         );
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         toast.success(t("common.success"));
//         navigate("/submissions");
//       }
//     } catch (err: any) {
//       toast.error(err.message || t("common.error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Gov header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
//             <Shield className="h-8 w-8 text-primary" />
//           </div>
//           <h1 className="text-xl font-bold text-foreground">
//             {t("common.appname")}
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             {t("common.tagline")}
//           </p>
//           <p className="text-xs text-muted-foreground mt-0.5">
//             {t("common.gov")}
//           </p>
//         </div>

//         <Card className="border-border shadow-lg">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg text-center">
//               {isSignUp ? t("auth.signup") : t("auth.login")}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {isSignUp && (
//                 <div className="space-y-2">
//                   <Label htmlFor="fullname">{t("auth.fullname")}</Label>
//                   <Input
//                     id="fullname"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="email">{t("auth.email")}</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">{t("auth.password")}</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? (
//                   t("common.loading")
//                 ) : (
//                   <>
//                     {isSignUp ? (
//                       <UserPlus className="h-4 w-4 mr-2" />
//                     ) : (
//                       <LogIn className="h-4 w-4 mr-2" />
//                     )}
//                     {isSignUp ? t("auth.signup.btn") : t("auth.login.btn")}
//                   </>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-4 text-center">
//               <button
//                 type="button"
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="text-sm text-primary hover:underline"
//               >
//                 {isSignUp ? t("auth.have.account") : t("auth.no.account")}
//               </button>
//             </div>
//           </CardContent>
//         </Card>

//         <p className="text-xs text-muted-foreground text-center mt-6">
//           {t("common.copyright")}
//         </p>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useLanguage } from "@/i18n/LanguageContext";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Shield, LogIn, UserPlus } from "lucide-react";
// import { toast } from "sonner";

// export default function Login() {
//   const { t } = useLanguage();
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
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
//         toast.success(t("auth.verify.email"));
//       } else {
//         const { data: authData, error } =
//           await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;
//         toast.success(t("common.success"));

//         // Check user role and redirect accordingly
//         if (authData.user) {
//           const { data: roleData } = await supabase
//             .from("user_roles")
//             .select("role")
//             .eq("user_id", authData.user.id)
//             .maybeSingle();

//           const role = roleData?.role ?? "sector_user";
//           if (role === "manager" || role === "admin") {
//             navigate("/manager");
//           } else {
//             navigate("/submissions");
//           }
//         } else {
//           navigate("/submissions");
//         }
//       }
//     } catch (err: any) {
//       toast.error(err.message || t("common.error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Gov header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
//             <Shield className="h-8 w-8 text-primary" />
//           </div>
//           <h1 className="text-xl font-bold text-foreground">
//             {t("common.appname")}
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             {t("common.tagline")}
//           </p>
//           <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium">
//             {t("common.gov")}
//           </div>
//         </div>

//         <Card className="border-border shadow-lg">
//           <CardHeader className="pb-2 text-center">
//             <CardTitle className="text-lg">
//               {isSignUp ? t("auth.signup") : t("auth.login")}
//             </CardTitle>
//             <CardDescription>
//               {isSignUp ? t("auth.welcome.new") : t("auth.welcome")}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {isSignUp && (
//                 <div className="space-y-2">
//                   <Label htmlFor="fullname">{t("auth.fullname")}</Label>
//                   <Input
//                     id="fullname"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="email">{t("auth.email")}</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">{t("auth.password")}</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? (
//                   t("common.loading")
//                 ) : (
//                   <>
//                     {isSignUp ? (
//                       <UserPlus className="h-4 w-4 mr-2" />
//                     ) : (
//                       <LogIn className="h-4 w-4 mr-2" />
//                     )}
//                     {isSignUp ? t("auth.signup.btn") : t("auth.login.btn")}
//                   </>
//                 )}
//               </Button>
//             </form>

//             <div className="mt-4 text-center">
//               <button
//                 type="button"
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="text-sm text-primary hover:underline"
//               >
//                 {isSignUp ? t("auth.have.account") : t("auth.no.account")}
//               </button>
//             </div>
//           </CardContent>
//         </Card>

//         <p className="text-xs text-muted-foreground text-center mt-6">
//           {t("common.copyright")}
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, LogIn, UserPlus, Users, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

type LoginRole = 'sector_user' | 'manager';

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<LoginRole | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error(t('auth.select.role.error'));
      return;
    }
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success(t('auth.verify.email'));
      } else {
        const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (authData.user) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', authData.user.id)
            .maybeSingle();

          const dbRole = roleData?.role ?? 'sector_user';

          // Validate role selection matches database role
          if (selectedRole === 'manager' && dbRole !== 'manager' && dbRole !== 'admin') {
            await supabase.auth.signOut();
            toast.error(t('auth.role.mismatch'));
            setLoading(false);
            return;
          }

          toast.success(t('common.success'));
          if (selectedRole === 'manager') {
            navigate('/manager');
          } else {
            navigate('/submissions');
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t('common.appname')}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t('common.tagline')}</p>
            <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium">
              {t('common.gov')}
            </div>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-lg">{t('auth.select.role')}</CardTitle>
              <CardDescription>{t('auth.select.role.desc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setSelectedRole('sector_user')}
                className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('auth.role.sector')}</p>
                  <p className="text-xs text-muted-foreground">{t('auth.role.sector.desc')}</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('manager')}
                className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('auth.role.manager')}</p>
                  <p className="text-xs text-muted-foreground">{t('auth.role.manager.desc')}</p>
                </div>
              </button>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {t('common.copyright')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{t('common.appname')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('common.tagline')}</p>
          <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium">
            {t('common.gov')}
          </div>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-2 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              {selectedRole === 'manager' ? (
                <Briefcase className="h-5 w-5 text-primary" />
              ) : (
                <Users className="h-5 w-5 text-primary" />
              )}
              <span className="text-sm font-medium text-primary">
                {selectedRole === 'manager' ? t('auth.role.manager') : t('auth.role.sector')}
              </span>
            </div>
            <CardTitle className="text-lg">
              {isSignUp ? t('auth.signup') : t('auth.login')}
            </CardTitle>
            <CardDescription>
              {isSignUp ? t('auth.welcome.new') : t('auth.welcome')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullname">{t('auth.fullname')}</Label>
                  <Input
                    id="fullname"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : (
                  <>
                    {isSignUp ? <UserPlus className="h-4 w-4 mr-2" /> : <LogIn className="h-4 w-4 mr-2" />}
                    {isSignUp ? t('auth.signup.btn') : t('auth.login.btn')}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? t('auth.have.account') : t('auth.no.account')}
              </button>
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  ← {t('auth.change.role')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          {t('common.copyright')}
        </p>
      </div>
    </div>
  );
}
