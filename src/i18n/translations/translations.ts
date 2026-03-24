// eslint-disable-next-line @typescript-eslint/no-unused-expressions
export type Language = "en" | "am" | "om";

export const languageNames: Record<Language, string> = {
  en: "English",
  am: "አማርኛ",
  om: "Afaan Oromoo",
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact Us",
    "nav.submissions": "Submissions",
    "nav.manager": "Manager Review",
    "nav.login": "Sign In",
    "nav.logout": "Sign Out",
    "nav.signup": "Create Account",

    // Homepage
    "home.title": "Infrastructure Collision Detection System",
    "home.subtitle":
      "Ensuring safe and coordinated infrastructure development through advanced spatial analysis",
    "home.cta": "Submit a Sector",
    "home.cta.login": "Sign In to Get Started",
    "home.mission.title": "Our Mission",
    "home.mission.text":
      "To facilitate coordinated infrastructure planning by detecting spatial collisions between proposed and existing sectors, ensuring public safety and efficient resource allocation.",
    "home.feature1.title": "Spatial Analysis",
    "home.feature1.text":
      "Advanced PostGIS-powered collision detection across all infrastructure types.",
    "home.feature2.title": "Real-Time Review",
    "home.feature2.text":
      "Managers review and approve or reject submissions with full spatial context.",
    "home.feature3.title": "Multi-Sector Support",
    "home.feature3.text":
      "Supports airports, railways, pipelines, powerlines, buildings, and more.",
    "home.stats.total": "Total Submissions",
    "home.stats.collisions": "Collisions Detected",
    "home.stats.approved": "Approved Sectors",
    "home.stats.pending": "Pending Reviews",

    // About
    "about.title": "About the System",
    "about.intro":
      "The Infrastructure Collision Detection System is a government initiative designed to streamline the process of infrastructure planning and coordination between multiple agencies and sectors.",
    "about.how.title": "How It Works",
    "about.how.step1":
      "Sector operators submit proposed infrastructure coordinates and metadata.",
    "about.how.step2":
      "The system automatically analyzes spatial data using PostGIS to detect collisions.",
    "about.how.step3":
      "Managers review flagged submissions and approve or reject based on analysis.",
    "about.purpose.title": "Purpose",
    "about.purpose.text":
      "This platform ensures that new infrastructure projects do not conflict with existing or planned developments, reducing costly errors and ensuring public safety.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our team for inquiries and support.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.hours": "Office Hours",
    "contact.hours.value": "Monday – Friday, 8:30 AM – 5:30 PM",

    // Auth
    "auth.login": "Sign In",
    "auth.signup": "Create Account",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.fullname": "Full Name",
    "auth.login.btn": "Sign In",
    "auth.signup.btn": "Create Account",
    "auth.no.account": "Don't have an account?",
    "auth.have.account": "Already have an account?",
    "auth.forgot": "Forgot password?",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.appname": "Collision AI",
    "common.tagline": "Infrastructure Collision Detection System",
    "common.gov": "Federal Democratic Republic of Ethiopia",
    "common.copyright":
      "© 2026 Infrastructure Collision Detection System. All rights reserved.",

    // Dashboard
    "dashboard.title": "Submissions Dashboard",
    "dashboard.new": "New Submission",
    "dashboard.map": "Map",
    "dashboard.table": "Table",
    "dashboard.filter.sector": "Sector Type",
    "dashboard.filter.status": "Status",
    "dashboard.filter.collision": "Collision",
  },

  am: {
    // Nav
    "nav.home": "መጀመሪያ ገጽ",
    "nav.about": "ስለ እኛ",
    "nav.contact": "አግኙን",
    "nav.submissions": "ማስረከቢያዎች",
    "nav.manager": "ስራ አስኪያጅ ግምገማ",
    "nav.login": "ይግቡ",
    "nav.logout": "ይውጡ",
    "nav.signup": "መለያ ይፍጠሩ",

    // Homepage
    "home.title": "የመሠረተ ልማት ግጭት ማወቂያ ስርዓት",
    "home.subtitle": "ደህንነት የተጠበቀ እና የተቀናጀ የመሠረተ ልማት ልማትን በላቀ የቦታ ትንተና በማረጋገጥ",
    "home.cta": "ዘርፍ ያስረክቡ",
    "home.cta.login": "ለመጀመር ይግቡ",
    "home.mission.title": "ራዕያችን",
    "home.mission.text":
      "በተጠቀሰ እና ያለ ዘርፎች መካከል የቦታ ግጭቶችን በማወቅ የመሠረተ ልማት ዕቅድን በማቀናጀት፣ የህዝብ ደህንነትን እና ውጤታማ ሀብት ክፍፍልን በማረጋገጥ።",
    "home.feature1.title": "የቦታ ትንተና",
    "home.feature1.text": "በPostGIS የተደገፈ የላቀ የግጭት ማወቂያ በሁሉም የመሠረተ ልማት ዓይነቶች።",
    "home.feature2.title": "በጊዜው ግምገማ",
    "home.feature2.text": "ስራ አስኪያጆች ማስረከቢያዎችን ይገመግማሉ፣ ይቀበላሉ ወይም ይከለክላሉ።",
    "home.feature3.title": "ብዙ ዘርፍ ድጋፍ",
    "home.feature3.text":
      "የአየር ማረፊያዎችን፣ የባቡር መስመሮችን፣ ቧንቧዎችን፣ የኤሌክትሪክ መስመሮችን፣ ህንፃዎችን ይደግፋል።",
    "home.stats.total": "ጠቅላላ ማስረከቢያዎች",
    "home.stats.collisions": "የተወሰኑ ግጭቶች",
    "home.stats.approved": "የፀደቁ ዘርፎች",
    "home.stats.pending": "በሂደት ግምገማዎች",

    // About
    "about.title": "ስለ ስርዓቱ",
    "about.intro":
      "የመሠረተ ልማት ግጭት ማወቂያ ስርዓት በብዙ ኤጀንሲዎች እና ዘርፎች መካከል የመሠረተ ልማት ዕቅድ እና ቅንጅት ሂደትን ለማቀላጠፍ የተዘጋጀ የመንግስት ተነሳሽነት ነው።",
    "about.how.title": "እንዴት ይሰራል",
    "about.how.step1": "የዘርፍ ኦፕሬተሮች የተጠቀሱ የመሠረተ ልማት ቅንጅቶችን እና ሜታ ዳታዎችን ያስረክባሉ።",
    "about.how.step2": "ስርዓቱ PostGIS በመጠቀም የቦታ ዳታን በራስ-ሰር ተንትኖ ግጭቶችን ያወቃል።",
    "about.how.step3":
      "ስራ አስኪያጆች የተሰየሙ ማስረከቢያዎችን ይገመግማሉ፣ በትንተና ላይ በመመርኮዝ ይቀበላሉ ወይም ይከለክላሉ።",
    "about.purpose.title": "ዓላማ",
    "about.purpose.text":
      "ይህ መድረክ አዲስ የመሠረተ ልማት ፕሮጀክቶች ከነባር ወይም ከታቀዱ ልማቶች ጋር እንዳይጋጩ፣ ውድ ስህተቶችን እና የህዝብ ደህንነትን በማረጋገጥ።",

    // Contact
    "contact.title": "አግኙን",
    "contact.subtitle": "ለጥያቄዎች እና ድጋፍ ከቡድናችን ጋር ይገናኙ።",
    "contact.name": "ሙሉ ስም",
    "contact.email": "የኢሜል አድራሻ",
    "contact.subject": "ርዕሰ ጉዳይ",
    "contact.message": "መልእክት",
    "contact.send": "መልእክት ላክ",
    "contact.address": "አድራሻ",
    "contact.phone": "ስልክ",
    "contact.hours": "የቢሮ ሰዓቶች",
    "contact.hours.value": "ሰኞ – አርብ, 8:30 ጥዋት – 5:30 ከሰዓት",

    // Auth
    "auth.login": "ይግቡ",
    "auth.signup": "መለያ ይፍጠሩ",
    "auth.email": "የኢሜል አድራሻ",
    "auth.password": "የምስጢር ቃል",
    "auth.fullname": "ሙሉ ስም",
    "auth.login.btn": "ይግቡ",
    "auth.signup.btn": "መለያ ይፍጠሩ",
    "auth.no.account": "መለያ የለዎትም?",
    "auth.have.account": "አስቀድመው መለያ አለዎት?",
    "auth.forgot": "የምስጢር ቃል ረስተዋል?",

    // Common
    "common.loading": "በመጫን ላይ...",
    "common.error": "ስህተት ተከስቷል",
    "common.success": "ስኬታማ",
    "common.appname": "Collision AI",
    "common.tagline": "የመሠረተ ልማት ግጭት ማወቂያ ስርዓት",
    "common.gov": "የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
    "common.copyright": "© 2026 የመሠረተ ልማት ግጭት ማወቂያ ስርዓት። ሁሉም መብት የተጠበቀ ነው።",

    // Dashboard
    "dashboard.title": "የማስረከቢያ ዳሽቦርድ",
    "dashboard.new": "አዲስ ማስረከቢያ",
    "dashboard.map": "ካርታ",
    "dashboard.table": "ሰንጠረዥ",
    "dashboard.filter.sector": "የዘርፍ ዓይነት",
    "dashboard.filter.status": "ሁኔታ",
    "dashboard.filter.collision": "ግጭት",
  },

  om: {
    // Nav
    "nav.home": "Fuula Jalqabaa",
    "nav.about": "Waa'ee Keenya",
    "nav.contact": "Nu Qunnamaa",
    "nav.submissions": "Galfatoota",
    "nav.manager": "Gamaaggama Bulchiinsaa",
    "nav.login": "Seeni",
    "nav.logout": "Ba'i",
    "nav.signup": "Herrega Uumi",

    // Homepage
    "home.title": "Sirna Adda Baasuu Walitti Bu'iinsa Bu'uuraalee Misoomaa",
    "home.subtitle":
      "Xiinxala qubee olaanaadhaan misoommii bu'uuraalee nageenya qabu fi walitti hidhaminsa qabu mirkaneessuu",
    "home.cta": "Damee Galchi",
    "home.cta.login": "Jalqabuuf Seeni",
    "home.mission.title": "Ergama Keenya",
    "home.mission.text":
      "Karoora bu'uuraalee misoomaa walitti hidhame kan walitti bu'iinsa qubee damelee yaadamee fi jiru gidduu adda baasuun haala mijeessuu, nageenya ummataa fi ramaddii qabeenyaa si'aawaa mirkaneessuu.",
    "home.feature1.title": "Xiinxala Qubee",
    "home.feature1.text":
      "Adda baasuu walitti bu'iinsa olaanaa PostGIS'n deeggarame gosa bu'uuraalee misoomaa hunda irratti.",
    "home.feature2.title": "Gamaaggama Yeroo Dhugaa",
    "home.feature2.text":
      "Bulchiinsitoonni galfatoota ni gamaaggamu, ni fudhatama yookiin ni dhorkama.",
    "home.feature3.title": "Deeggarsa Damee Heddu",
    "home.feature3.text":
      "Buufata xiyyaaraa, baaburaa, ujummoo, sararoota humna ibsaa, gamolee fi kkf ni deeggara.",
    "home.stats.total": "Galfatoota Waliigalaa",
    "home.stats.collisions": "Walitti Bu'iinsa Argame",
    "home.stats.approved": "Damelee Mirkanaa'an",
    "home.stats.pending": "Gamaaggama Eeggata",

    // About
    "about.title": "Waa'ee Sirnichaa",
    "about.intro":
      "Sirni Adda Baasuu Walitti Bu'iinsa Bu'uuraalee Misoomaa karoora bu'uuraalee misoomaa fi walitti hidhaminsa ejensiilee fi damelee heddu gidduu jiru salphisuuf kan qopha'e jalqabbii mootummati.",
    "about.how.title": "Akkamitti Hojjeta",
    "about.how.step1":
      "Ogeessonnii damee koordinaatii bu'uuraalee misoomaa yaadame fi daataa galchu.",
    "about.how.step2":
      "Sirni PostGIS fayyaadamuu daataa qubee ofumaan xiinxalee walitti bu'iinsa adda baasa.",
    "about.how.step3":
      "Bulchiinsitoonni galfatoota mallattaa'an gamaaggamanii xiinxala irratti hundaa'uun ni mirkanneessu yookiin ni dhiisu.",
    "about.purpose.title": "Kaayyo",
    "about.purpose.text":
      "Ardiin kun pirojektooota bu'uuraalee misoomaa haaraa misoomotaa jiranii yookiin karoorfaman waliin akka hin walitti hin buune mirkaneessa.",

    // Contact
    "contact.title": "Nu Qunnamaa",
    "contact.subtitle":
      "Gaaffiilee fi deeggarsaa tiif garee keenya waliin wal qunnamaa.",
    "contact.name": "Maqaa Guutuu",
    "contact.email": "Teessoo Imeelii",
    "contact.subject": "Mata Duree",
    "contact.message": "Ergaa",
    "contact.send": "Ergaa Ergi",
    "contact.address": "Teessoo",
    "contact.phone": "Bilbila",
    "contact.hours": "Sa'aatii Biiroo",
    "contact.hours.value": "Wiixata – Jimaata, 8:30 WD – 5:30 WB",

    // Auth
    "auth.login": "Seeni",
    "auth.signup": "Herrega Uumi",
    "auth.email": "Teessoo Imeelii",
    "auth.password": "Jecha Darbii",
    "auth.fullname": "Maqaa Guutuu",
    "auth.login.btn": "Seeni",
    "auth.signup.btn": "Herrega Uumi",
    "auth.no.account": "Herrega hin qabdu?",
    "auth.have.account": "Duraan herrega qabdaa?",
    "auth.forgot": "Jecha darbii dagattee?",

    // Common
    "common.loading": "Fe'aa jira...",
    "common.error": "Dogoggorri uumame",
    "common.success": "Milkaa'e",
    "common.appname": "Collision AI",
    "common.tagline": "Sirna Adda Baasuu Walitti Bu'iinsa Bu'uuraalee Misoomaa",
    "common.gov": "Rippaabilikii Dimokiraataawaa Federaalawaa Itoophiyaa",
    "common.copyright":
      "© 2026 Sirna Adda Baasuu Walitti Bu'iinsa Bu'uuraalee Misoomaa. Mirgi seeraan eegame.",

    // Dashboard
    "dashboard.title": "Daashboordii Galfatoota",
    "dashboard.new": "Galfata Haaraa",
    "dashboard.map": "Kaartaa",
    "dashboard.table": "Gabatee",
    "dashboard.filter.sector": "Gosa Damee",
    "dashboard.filter.status": "Haala",
    "dashboard.filter.collision": "Walitti Bu'iinsa",
  },
};
