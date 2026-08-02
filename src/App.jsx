import React, { useState, useEffect } from "react";
import {
  Heart, MessageCircle, Share2, Play, Search, Bell, Home, PlusCircle, User, X,
  Type, Image as ImageIcon, Video as VideoIcon, Send, ArrowLeft, Mail, Phone as PhoneIcon,
  LogOut, Grid3x3, UserPlus, MessageSquare, Plus, Mic, MicOff, PhoneOff, VideoOff, Sparkles, Copy, Check as CheckIcon,
  Users, Radio, Trash2, ShoppingBag, Briefcase, MapPin, GraduationCap, BookOpen, Gamepad2, Trophy, Building2,
  LayoutGrid, Settings as SettingsIcon, Palette,
} from "lucide-react";

let colors = {
  ink: "#2B1B0E", bg: "#E9E2D0", surface: "#FBF6ED", cream: "#FFF6EA",
  sunset: "#E8622C", gold: "#D4A72C", forest: "#3F7D5C", charcoal: "#22262E",
  muted: "#9A8F7A", line: "#EDE6D6",
};
const THEMES = {
  neon: { name: "Neon Blue-Green", ink: "#070C16", bg: "#05080F", surface: "#111A2B", cream: "#EAF6FF", sunset: "#22D3EE", gold: "#3BFFB0", forest: "#12E8A8", charcoal: "#DCE6F2", muted: "#7E8FA8", line: "#1E2A3F" },
  sunsetTheme: { name: "Sunset Orange", ink: "#160B08", bg: "#0F0705", surface: "#241209", cream: "#FFF3E8", sunset: "#FF8A3D", gold: "#FFC65C", forest: "#FF6B6B", charcoal: "#F4E3D3", muted: "#A9856B", line: "#3A2416" },
  purple: { name: "Purple Dream", ink: "#0E0A1C", bg: "#080512", surface: "#1B1330", cream: "#F2ECFF", sunset: "#B084FF", gold: "#FF7AD1", forest: "#7C6BFF", charcoal: "#E3DAFB", muted: "#8F82B3", line: "#2C2350" },
  daylight: { name: "Classic Light", ink: "#2B1B0E", bg: "#E9E2D0", surface: "#FBF6ED", cream: "#FFF6EA", sunset: "#E8622C", gold: "#D4A72C", forest: "#3F7D5C", charcoal: "#22262E", muted: "#9A8F7A", line: "#EDE6D6" },
};
function applyThemeColors(key) {
  Object.assign(colors, THEMES[key] || THEMES.neon);
}
const NEON_GRADIENT = "linear-gradient(90deg, #E8622C, #D4A72C)";

// Orodha ya nchi za dunia (bendera + msimbo wa kupiga simu) - mtumiaji anachagua mwenyewe
const COUNTRIES = [
  { name: "Afghanistan", dial: "+93", flag: "🇦🇫" }, { name: "Albania", dial: "+355", flag: "🇦🇱" },
  { name: "Algeria", dial: "+213", flag: "🇩🇿" }, { name: "Angola", dial: "+244", flag: "🇦🇴" },
  { name: "Argentina", dial: "+54", flag: "🇦🇷" }, { name: "Armenia", dial: "+374", flag: "🇦🇲" },
  { name: "Australia", dial: "+61", flag: "🇦🇺" }, { name: "Austria", dial: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", dial: "+994", flag: "🇦🇿" }, { name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", dial: "+880", flag: "🇧🇩" }, { name: "Belarus", dial: "+375", flag: "🇧🇾" },
  { name: "Belgium", dial: "+32", flag: "🇧🇪" }, { name: "Benin", dial: "+229", flag: "🇧🇯" },
  { name: "Bolivia", dial: "+591", flag: "🇧🇴" }, { name: "Bosnia and Herzegovina", dial: "+387", flag: "🇧🇦" },
  { name: "Botswana", dial: "+267", flag: "🇧🇼" }, { name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { name: "Bulgaria", dial: "+359", flag: "🇧🇬" }, { name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { name: "Burundi", dial: "+257", flag: "🇧🇮" }, { name: "Cambodia", dial: "+855", flag: "🇰🇭" },
  { name: "Cameroon", dial: "+237", flag: "🇨🇲" }, { name: "Canada", dial: "+1", flag: "🇨🇦" },
  { name: "Chad", dial: "+235", flag: "🇹🇩" }, { name: "Chile", dial: "+56", flag: "🇨🇱" },
  { name: "China", dial: "+86", flag: "🇨🇳" }, { name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { name: "Comoros", dial: "+269", flag: "🇰🇲" }, { name: "Congo (DRC)", dial: "+243", flag: "🇨🇩" },
  { name: "Congo (Republic)", dial: "+242", flag: "🇨🇬" }, { name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { name: "Croatia", dial: "+385", flag: "🇭🇷" }, { name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { name: "Cyprus", dial: "+357", flag: "🇨🇾" }, { name: "Czechia", dial: "+420", flag: "🇨🇿" },
  { name: "Denmark", dial: "+45", flag: "🇩🇰" }, { name: "Djibouti", dial: "+253", flag: "🇩🇯" },
  { name: "Dominican Republic", dial: "+1", flag: "🇩🇴" }, { name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { name: "Egypt", dial: "+20", flag: "🇪🇬" }, { name: "El Salvador", dial: "+503", flag: "🇸🇻" },
  { name: "Eritrea", dial: "+291", flag: "🇪🇷" }, { name: "Estonia", dial: "+372", flag: "🇪🇪" },
  { name: "Eswatini", dial: "+268", flag: "🇸🇿" }, { name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { name: "Fiji", dial: "+679", flag: "🇫🇯" }, { name: "Finland", dial: "+358", flag: "🇫🇮" },
  { name: "France", dial: "+33", flag: "🇫🇷" }, { name: "Gabon", dial: "+241", flag: "🇬🇦" },
  { name: "Gambia", dial: "+220", flag: "🇬🇲" }, { name: "Georgia", dial: "+995", flag: "🇬🇪" },
  { name: "Germany", dial: "+49", flag: "🇩🇪" }, { name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { name: "Greece", dial: "+30", flag: "🇬🇷" }, { name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { name: "Guinea", dial: "+224", flag: "🇬🇳" }, { name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { name: "Honduras", dial: "+504", flag: "🇭🇳" }, { name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { name: "Iceland", dial: "+354", flag: "🇮🇸" }, { name: "India", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", dial: "+62", flag: "🇮🇩" }, { name: "Iran", dial: "+98", flag: "🇮🇷" },
  { name: "Iraq", dial: "+964", flag: "🇮🇶" }, { name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { name: "Israel", dial: "+972", flag: "🇮🇱" }, { name: "Italy", dial: "+39", flag: "🇮🇹" },
  { name: "Ivory Coast", dial: "+225", flag: "🇨🇮" }, { name: "Jamaica", dial: "+1", flag: "🇯🇲" },
  { name: "Japan", dial: "+81", flag: "🇯🇵" }, { name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", dial: "+7", flag: "🇰🇿" }, { name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { name: "Kuwait", dial: "+965", flag: "🇰🇼" }, { name: "Laos", dial: "+856", flag: "🇱🇦" },
  { name: "Latvia", dial: "+371", flag: "🇱🇻" }, { name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { name: "Lesotho", dial: "+266", flag: "🇱🇸" }, { name: "Liberia", dial: "+231", flag: "🇱🇷" },
  { name: "Libya", dial: "+218", flag: "🇱🇾" }, { name: "Lithuania", dial: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", dial: "+352", flag: "🇱🇺" }, { name: "Madagascar", dial: "+261", flag: "🇲🇬" },
  { name: "Malawi", dial: "+265", flag: "🇲🇼" }, { name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { name: "Maldives", dial: "+960", flag: "🇲🇻" }, { name: "Mali", dial: "+223", flag: "🇲🇱" },
  { name: "Malta", dial: "+356", flag: "🇲🇹" }, { name: "Mauritania", dial: "+222", flag: "🇲🇷" },
  { name: "Mauritius", dial: "+230", flag: "🇲🇺" }, { name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { name: "Moldova", dial: "+373", flag: "🇲🇩" }, { name: "Mongolia", dial: "+976", flag: "🇲🇳" },
  { name: "Montenegro", dial: "+382", flag: "🇲🇪" }, { name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { name: "Mozambique", dial: "+258", flag: "🇲🇿" }, { name: "Myanmar", dial: "+95", flag: "🇲🇲" },
  { name: "Namibia", dial: "+264", flag: "🇳🇦" }, { name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { name: "Netherlands", dial: "+31", flag: "🇳🇱" }, { name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { name: "Nicaragua", dial: "+505", flag: "🇳🇮" }, { name: "Niger", dial: "+227", flag: "🇳🇪" },
  { name: "Nigeria", dial: "+234", flag: "🇳🇬" }, { name: "North Korea", dial: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", dial: "+389", flag: "🇲🇰" }, { name: "Norway", dial: "+47", flag: "🇳🇴" },
  { name: "Oman", dial: "+968", flag: "🇴🇲" }, { name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { name: "Panama", dial: "+507", flag: "🇵🇦" }, { name: "Papua New Guinea", dial: "+675", flag: "🇵🇬" },
  { name: "Paraguay", dial: "+595", flag: "🇵🇾" }, { name: "Peru", dial: "+51", flag: "🇵🇪" },
  { name: "Philippines", dial: "+63", flag: "🇵🇭" }, { name: "Poland", dial: "+48", flag: "🇵🇱" },
  { name: "Portugal", dial: "+351", flag: "🇵🇹" }, { name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { name: "Romania", dial: "+40", flag: "🇷🇴" }, { name: "Russia", dial: "+7", flag: "🇷🇺" },
  { name: "Rwanda", dial: "+250", flag: "🇷🇼" }, { name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { name: "Senegal", dial: "+221", flag: "🇸🇳" }, { name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { name: "Sierra Leone", dial: "+232", flag: "🇸🇱" }, { name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { name: "Slovakia", dial: "+421", flag: "🇸🇰" }, { name: "Slovenia", dial: "+386", flag: "🇸🇮" },
  { name: "Somalia", dial: "+252", flag: "🇸🇴" }, { name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { name: "South Korea", dial: "+82", flag: "🇰🇷" }, { name: "South Sudan", dial: "+211", flag: "🇸🇸" },
  { name: "Spain", dial: "+34", flag: "🇪🇸" }, { name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { name: "Sudan", dial: "+249", flag: "🇸🇩" }, { name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { name: "Switzerland", dial: "+41", flag: "🇨🇭" }, { name: "Syria", dial: "+963", flag: "🇸🇾" },
  { name: "Taiwan", dial: "+886", flag: "🇹🇼" }, { name: "Tajikistan", dial: "+992", flag: "🇹🇯" },
  { name: "Tanzania", dial: "+255", flag: "🇹🇿" }, { name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { name: "Togo", dial: "+228", flag: "🇹🇬" }, { name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { name: "Turkey", dial: "+90", flag: "🇹🇷" }, { name: "Turkmenistan", dial: "+993", flag: "🇹🇲" },
  { name: "Uganda", dial: "+256", flag: "🇺🇬" }, { name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" }, { name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { name: "United States", dial: "+1", flag: "🇺🇸" }, { name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { name: "Uzbekistan", dial: "+998", flag: "🇺🇿" }, { name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { name: "Vietnam", dial: "+84", flag: "🇻🇳" }, { name: "Yemen", dial: "+967", flag: "🇾🇪" },
  { name: "Zambia", dial: "+260", flag: "🇿🇲" }, { name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
  { name: "Andorra", dial: "+376", flag: "🇦🇩" }, { name: "Antigua and Barbuda", dial: "+1", flag: "🇦🇬" },
  { name: "Bahamas", dial: "+1", flag: "🇧🇸" }, { name: "Barbados", dial: "+1", flag: "🇧🇧" },
  { name: "Belize", dial: "+501", flag: "🇧🇿" }, { name: "Bhutan", dial: "+975", flag: "🇧🇹" },
  { name: "Brunei", dial: "+673", flag: "🇧🇳" }, { name: "Cabo Verde", dial: "+238", flag: "🇨🇻" },
  { name: "Dominica", dial: "+1", flag: "🇩🇲" }, { name: "Equatorial Guinea", dial: "+240", flag: "🇬🇶" },
  { name: "Grenada", dial: "+1", flag: "🇬🇩" }, { name: "Guinea-Bissau", dial: "+245", flag: "🇬🇼" },
  { name: "Guyana", dial: "+592", flag: "🇬🇾" }, { name: "Kiribati", dial: "+686", flag: "🇰🇮" },
  { name: "Kosovo", dial: "+383", flag: "🇽🇰" }, { name: "Kyrgyzstan", dial: "+996", flag: "🇰🇬" },
  { name: "Liechtenstein", dial: "+423", flag: "🇱🇮" }, { name: "Marshall Islands", dial: "+692", flag: "🇲🇭" },
  { name: "Micronesia", dial: "+691", flag: "🇫🇲" }, { name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { name: "Nauru", dial: "+674", flag: "🇳🇷" }, { name: "North Cyprus", dial: "+90", flag: "🇹🇷" },
  { name: "Palau", dial: "+680", flag: "🇵🇼" }, { name: "Palestine", dial: "+970", flag: "🇵🇸" },
  { name: "Saint Kitts and Nevis", dial: "+1", flag: "🇰🇳" }, { name: "Saint Lucia", dial: "+1", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", dial: "+1", flag: "🇻🇨" }, { name: "Samoa", dial: "+685", flag: "🇼🇸" },
  { name: "San Marino", dial: "+378", flag: "🇸🇲" }, { name: "São Tomé and Príncipe", dial: "+239", flag: "🇸🇹" },
  { name: "Seychelles", dial: "+248", flag: "🇸🇨" }, { name: "Solomon Islands", dial: "+677", flag: "🇸🇧" },
  { name: "Suriname", dial: "+597", flag: "🇸🇷" }, { name: "Timor-Leste", dial: "+670", flag: "🇹🇱" },
  { name: "Tonga", dial: "+676", flag: "🇹🇴" }, { name: "Trinidad and Tobago", dial: "+1", flag: "🇹🇹" },
  { name: "Tuvalu", dial: "+688", flag: "🇹🇻" }, { name: "Vanuatu", dial: "+678", flag: "🇻🇺" },
  { name: "Vatican City", dial: "+379", flag: "🇻🇦" },
].sort((a, b) => a.name.localeCompare(b.name));

const SUPABASE_URL = "https://utymdqaglzeuswmesglt.supabase.co";
const SUPABASE_KEY = "sb_publishable_V0B_tMJBwj4lxV442L_gTw_aPmFtIYo";

// ===================== I18N — muundo unaokubali LUGHA YOYOTE ya dunia =====================
// Kuongeza lugha mpya: ongeza tu kitu kimoja kwenye LANGUAGES na kamusi moja kwenye TRANSLATIONS.
// Mfumo wenyewe (t(), RTL, kichaguzi) tayari unafanya kazi kwa lugha yoyote bila kubadilisha code nyingine.
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧", rtl: false },
  { code: "sw", name: "Kiswahili", flag: "🇹🇿", rtl: false },
  { code: "fr", name: "Français", flag: "🇫🇷", rtl: false },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "es", name: "Español", flag: "🇪🇸", rtl: false },
  { code: "pt", name: "Português", flag: "🇵🇹", rtl: false },
  { code: "zh", name: "中文", flag: "🇨🇳", rtl: false },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", rtl: false },
  { code: "ru", name: "Русский", flag: "🇷🇺", rtl: false },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", rtl: false },
  { code: "de", name: "Deutsch", flag: "🇩🇪", rtl: false },
  { code: "ja", name: "日本語", flag: "🇯🇵", rtl: false },
];

const TRANSLATIONS = {
  en: {
    appName: "I'm Me", tagline: "Text, photos, and video — all in one place",
    email: "Email", phone: "Phone", emailPh: "Your email", passwordPh: "Password",
    signIn: "Sign in", signUp: "Sign up", haveAccount: "Have an account? Sign in", noAccount: "No account? Sign up",
    selectCountry: "-- Select your country --", phonePh: "Your number", sendCode: "Send SMS code",
    codePh: "6-digit code", verifyCode: "Verify and sign in", changeNumber: "Change number",
    home: "Home", search: "Search", add: "Post", alerts: "Alerts", profile: "Profile", signOut: "Sign out",
    composeTitle: "New post", composePh: "What's on your mind?", publish: "Post",
    commentsTitle: "Comments", noComments: "No comments yet.", commentPh: "Write a comment...",
    myPosts: "My posts", noPosts: "You haven't posted yet.", loadingFeed: "Loading...",
    noPostsFeed: "No posts yet. Be the first!", demoNotice: "This feature is still a demo — not connected to the database yet.",
    language: "Language", chooseLanguage: "Choose your language",
    messages: "Messages", newChat: "New chat", searchUsers: "Search people...", typeMessage: "Type a message...",
    noConversations: "No conversations yet.", noMessagesYet: "No messages yet. Say hello!", noUsersFound: "No one found.",
    explore: "Explore", trending: "Trending", forYou: "For You", catGeneral: "General", catMusic: "Music",
    catSports: "Sports", catGaming: "Gaming", catBusiness: "Business", catTechnology: "Technology", catEducation: "Education",
    noExplorePosts: "No posts in this category yet.", reels: "Reels", noReels: "No videos yet.",
    aiCreator: "AI Creator", aiCaption: "Caption", aiImprove: "Improve Text", aiTranslate: "Translate", aiVideoIdeas: "Video Ideas",
    aiInputPh: "Type your topic or text here...", aiGenerate: "Generate", aiGenerating: "Generating...", aiCopy: "Copy", aiCopied: "Copied!",
    aiTranslateTo: "Translate to",
    circles: "Circles", newCircle: "New circle", circleName: "Circle name", noCircles: "No circles yet.",
    addMember: "Add member", noMembers: "No members yet.", createCircle: "Create",
    live: "Live", goLive: "Go Live", liveTitle: "Live title (optional)", startLive: "Start Live", endLive: "End Live",
    noLives: "No one is live right now.", join: "Join", viewers: "viewers", liveChatPh: "Say something...",
    marketplace: "Marketplace", sell: "Sell", productTitle: "Title", productDesc: "Description", productPrice: "Price",
    productNew: "New", productUsed: "Used", noProducts: "No products yet.", messageSeller: "Message Seller",
    sold: "Sold", listProduct: "List product",
    jobs: "Jobs", postJob: "Post a job", jobTitle: "Job title", company: "Company", jobDescription: "Description",
    location: "Location", salary: "Salary (optional)", fullTime: "Full-time", partTime: "Part-time", remote: "Remote", contract: "Contract",
    apply: "Apply", applied: "Applied!", noJobs: "No jobs posted yet.", applicationMessage: "Why are you a good fit?",
    submitApplication: "Submit application",
    learningHub: "Learning Hub", createCourse: "Create course", courseTitle: "Course title", courseDesc: "Description",
    noCourses: "No courses yet.", lessons: "Lessons", addLesson: "Add lesson", lessonTitle: "Lesson title",
    lessonContent: "Lesson content", enroll: "Enroll", enrolled: "Enrolled", noLessons: "No lessons yet.",
    gamingHub: "Gaming Hub", quickMath: "Quick Math", leaderboard: "Leaderboard", startGame: "Start Game",
    yourScore: "Your score", timeLeft: "Time left", playAgain: "Play Again", noScores: "No scores yet. Be the first!",
    businessPages: "Business Pages", createPage: "Create page", pageName: "Business name", pageDesc: "Description",
    follow: "Follow", following: "Following", followers: "followers", noPages: "No business pages yet.",
    more: "More", settings: "Settings", theme: "Theme", chooseTheme: "Choose your theme",
  },
  sw: {
    appName: "I'm Me", tagline: "Andiko, picha, na video — sehemu moja",
    email: "Email", phone: "Simu", emailPh: "Email yako", passwordPh: "Password",
    signIn: "Ingia", signUp: "Jisajili", haveAccount: "Una akaunti? Ingia", noAccount: "Huna akaunti? Jisajili",
    selectCountry: "-- Chagua nchi yako --", phonePh: "Namba yako", sendCode: "Tuma msimbo wa SMS",
    codePh: "Msimbo wa herufi 6", verifyCode: "Thibitisha na Ingia", changeNumber: "Badilisha namba",
    home: "Nyumbani", search: "Tafuta", add: "Weka", alerts: "Arifa", profile: "Wasifu", signOut: "Toka",
    composeTitle: "Weka chapisho", composePh: "Una nini akilini?", publish: "Chapisha",
    commentsTitle: "Maoni", noComments: "Bado hakuna maoni.", commentPh: "Andika maoni...",
    myPosts: "Machapisho yangu", noPosts: "Bado hujaweka chapisho.", loadingFeed: "Inapakia...",
    noPostsFeed: "Bado hakuna machapisho. Kuwa wa kwanza!", demoNotice: "Kipengele hiki bado ni demo — hakijaunganishwa na database.",
    language: "Lugha", chooseLanguage: "Chagua lugha yako",
    messages: "Ujumbe", newChat: "Mazungumzo mapya", searchUsers: "Tafuta watu...", typeMessage: "Andika ujumbe...",
    noConversations: "Bado hakuna mazungumzo.", noMessagesYet: "Bado hakuna ujumbe. Sema hujambo!", noUsersFound: "Hakuna aliyepatikana.",
    explore: "Gundua", trending: "Yanayovuma", forYou: "Kwa Ajili Yako", catGeneral: "Kwa Ujumla", catMusic: "Muziki",
    catSports: "Michezo", catGaming: "Michezo ya Video", catBusiness: "Biashara", catTechnology: "Teknolojia", catEducation: "Elimu",
    noExplorePosts: "Bado hakuna machapisho kwenye kategoria hii.", reels: "Reels", noReels: "Bado hakuna video.",
    aiCreator: "AI Creator", aiCaption: "Caption", aiImprove: "Boresha Maandishi", aiTranslate: "Tafsiri", aiVideoIdeas: "Wazo za Video",
    aiInputPh: "Andika mada au maandishi yako hapa...", aiGenerate: "Tengeneza", aiGenerating: "Inatengeneza...", aiCopy: "Nakili", aiCopied: "Imenakiliwa!",
    aiTranslateTo: "Tafsiri kwenda",
    circles: "Circles", newCircle: "Circle mpya", circleName: "Jina la circle", noCircles: "Bado hakuna circles.",
    addMember: "Ongeza mwanachama", noMembers: "Bado hakuna wanachama.", createCircle: "Unda",
    live: "Live", goLive: "Anza Live", liveTitle: "Jina la Live (hiari)", startLive: "Anza Live", endLive: "Maliza Live",
    noLives: "Hakuna anayefanya Live sasa.", join: "Jiunge", viewers: "watazamaji", liveChatPh: "Sema kitu...",
    marketplace: "Marketplace", sell: "Uza", productTitle: "Jina la bidhaa", productDesc: "Maelezo", productPrice: "Bei",
    productNew: "Mpya", productUsed: "Iliyotumika", noProducts: "Bado hakuna bidhaa.", messageSeller: "Tuma ujumbe kwa muuzaji",
    sold: "Imeuzwa", listProduct: "Weka bidhaa",
    jobs: "Kazi", postJob: "Tangaza kazi", jobTitle: "Jina la kazi", company: "Kampuni", jobDescription: "Maelezo",
    location: "Mahali", salary: "Mshahara (hiari)", fullTime: "Muda wote", partTime: "Muda mfupi", remote: "Mbali (remote)", contract: "Mkataba",
    apply: "Omba", applied: "Umeomba!", noJobs: "Bado hakuna kazi zilizotangazwa.", applicationMessage: "Kwa nini unafaa kazi hii?",
    submitApplication: "Wasilisha maombi",
    learningHub: "Learning Hub", createCourse: "Unda kozi", courseTitle: "Jina la kozi", courseDesc: "Maelezo",
    noCourses: "Bado hakuna kozi.", lessons: "Masomo", addLesson: "Ongeza somo", lessonTitle: "Jina la somo",
    lessonContent: "Maudhui ya somo", enroll: "Jiunge", enrolled: "Umejiunga", noLessons: "Bado hakuna masomo.",
    gamingHub: "Gaming Hub", quickMath: "Hesabu za Haraka", leaderboard: "Leaderboard", startGame: "Anza Mchezo",
    yourScore: "Alama zako", timeLeft: "Muda uliobaki", playAgain: "Cheza Tena", noScores: "Bado hakuna alama. Kuwa wa kwanza!",
    businessPages: "Kurasa za Biashara", createPage: "Unda ukurasa", pageName: "Jina la biashara", pageDesc: "Maelezo",
    follow: "Fuata", following: "Unafuata", followers: "wafuasi", noPages: "Bado hakuna kurasa za biashara.",
    more: "Zaidi", settings: "Mipangilio", theme: "Rangi/Theme", chooseTheme: "Chagua mtindo wako",
  },
  fr: {
    appName: "I'm Me", tagline: "Texte, photos et vidéos — tout au même endroit",
    email: "Email", phone: "Téléphone", emailPh: "Votre email", passwordPh: "Mot de passe",
    signIn: "Se connecter", signUp: "S'inscrire", haveAccount: "Déjà un compte ? Connectez-vous", noAccount: "Pas de compte ? Inscrivez-vous",
    selectCountry: "-- Choisissez votre pays --", phonePh: "Votre numéro", sendCode: "Envoyer le code SMS",
    codePh: "Code à 6 chiffres", verifyCode: "Vérifier et se connecter", changeNumber: "Changer de numéro",
    home: "Accueil", search: "Recherche", add: "Publier", alerts: "Alertes", profile: "Profil", signOut: "Déconnexion",
    composeTitle: "Nouvelle publication", composePh: "À quoi pensez-vous ?", publish: "Publier",
    commentsTitle: "Commentaires", noComments: "Aucun commentaire.", commentPh: "Écrire un commentaire...",
    myPosts: "Mes publications", noPosts: "Vous n'avez encore rien publié.", loadingFeed: "Chargement...",
    noPostsFeed: "Aucune publication. Soyez le premier !", demoNotice: "Cette fonctionnalité est encore une démo — pas encore connectée à la base de données.",
    language: "Langue", chooseLanguage: "Choisissez votre langue",
  },
  ar: {
    appName: "I'm Me", tagline: "نص وصور وفيديو — كل ذلك في مكان واحد",
    email: "البريد الإلكتروني", phone: "الهاتف", emailPh: "بريدك الإلكتروني", passwordPh: "كلمة المرور",
    signIn: "تسجيل الدخول", signUp: "إنشاء حساب", haveAccount: "لديك حساب؟ سجّل الدخول", noAccount: "لا حساب؟ أنشئ واحدًا",
    selectCountry: "-- اختر بلدك --", phonePh: "رقمك", sendCode: "إرسال رمز عبر الرسائل",
    codePh: "رمز من 6 أرقام", verifyCode: "تحقق وسجّل الدخول", changeNumber: "تغيير الرقم",
    home: "الرئيسية", search: "بحث", add: "نشر", alerts: "الإشعارات", profile: "الملف الشخصي", signOut: "تسجيل الخروج",
    composeTitle: "منشور جديد", composePh: "بماذا تفكر؟", publish: "نشر",
    commentsTitle: "التعليقات", noComments: "لا توجد تعليقات بعد.", commentPh: "اكتب تعليقًا...",
    myPosts: "منشوراتي", noPosts: "لم تنشر شيئًا بعد.", loadingFeed: "جارٍ التحميل...",
    noPostsFeed: "لا توجد منشورات بعد. كن الأول!", demoNotice: "هذه الميزة لا تزال تجريبية — لم يتم ربطها بقاعدة البيانات بعد.",
    language: "اللغة", chooseLanguage: "اختر لغتك",
  },
  es: {
    appName: "I'm Me", tagline: "Texto, fotos y video — todo en un solo lugar",
    email: "Correo", phone: "Teléfono", emailPh: "Tu correo", passwordPh: "Contraseña",
    signIn: "Iniciar sesión", signUp: "Registrarse", haveAccount: "¿Ya tienes cuenta? Inicia sesión", noAccount: "¿Sin cuenta? Regístrate",
    selectCountry: "-- Elige tu país --", phonePh: "Tu número", sendCode: "Enviar código SMS",
    codePh: "Código de 6 dígitos", verifyCode: "Verificar e iniciar sesión", changeNumber: "Cambiar número",
    home: "Inicio", search: "Buscar", add: "Publicar", alerts: "Alertas", profile: "Perfil", signOut: "Cerrar sesión",
    composeTitle: "Nueva publicación", composePh: "¿Qué estás pensando?", publish: "Publicar",
    commentsTitle: "Comentarios", noComments: "Sin comentarios aún.", commentPh: "Escribe un comentario...",
    myPosts: "Mis publicaciones", noPosts: "Aún no has publicado nada.", loadingFeed: "Cargando...",
    noPostsFeed: "Sin publicaciones aún. ¡Sé el primero!", demoNotice: "Esta función sigue siendo una demo — aún no conectada a la base de datos.",
    language: "Idioma", chooseLanguage: "Elige tu idioma",
  },
  pt: {
    appName: "I'm Me", tagline: "Texto, fotos e vídeo — tudo em um só lugar",
    email: "Email", phone: "Telefone", emailPh: "Seu email", passwordPh: "Senha",
    signIn: "Entrar", signUp: "Cadastrar", haveAccount: "Já tem conta? Entrar", noAccount: "Sem conta? Cadastre-se",
    selectCountry: "-- Escolha seu país --", phonePh: "Seu número", sendCode: "Enviar código SMS",
    codePh: "Código de 6 dígitos", verifyCode: "Verificar e entrar", changeNumber: "Mudar número",
    home: "Início", search: "Buscar", add: "Publicar", alerts: "Alertas", profile: "Perfil", signOut: "Sair",
    composeTitle: "Nova publicação", composePh: "No que você está pensando?", publish: "Publicar",
    commentsTitle: "Comentários", noComments: "Sem comentários ainda.", commentPh: "Escreva um comentário...",
    myPosts: "Minhas publicações", noPosts: "Você ainda não publicou nada.", loadingFeed: "Carregando...",
    noPostsFeed: "Sem publicações ainda. Seja o primeiro!", demoNotice: "Este recurso ainda é uma demo — ainda não conectado ao banco de dados.",
    language: "Idioma", chooseLanguage: "Escolha seu idioma",
  },
  zh: {
    appName: "I'm Me", tagline: "文字、照片和视频——尽在一处",
    email: "邮箱", phone: "电话", emailPh: "您的邮箱", passwordPh: "密码",
    signIn: "登录", signUp: "注册", haveAccount: "已有账户？登录", noAccount: "没有账户？注册",
    selectCountry: "-- 选择您的国家 --", phonePh: "您的号码", sendCode: "发送短信验证码",
    codePh: "6位验证码", verifyCode: "验证并登录", changeNumber: "更改号码",
    home: "首页", search: "搜索", add: "发布", alerts: "通知", profile: "个人资料", signOut: "退出登录",
    composeTitle: "新帖子", composePh: "你在想什么？", publish: "发布",
    commentsTitle: "评论", noComments: "暂无评论。", commentPh: "写评论...",
    myPosts: "我的帖子", noPosts: "您还没有发布任何内容。", loadingFeed: "加载中...",
    noPostsFeed: "暂无帖子，快来成为第一个吧！", demoNotice: "此功能仍为演示——尚未连接数据库。",
    language: "语言", chooseLanguage: "选择您的语言",
  },
  hi: {
    appName: "I'm Me", tagline: "टेक्स्ट, फ़ोटो और वीडियो — सब एक ही जगह",
    email: "ईमेल", phone: "फ़ोन", emailPh: "आपका ईमेल", passwordPh: "पासवर्ड",
    signIn: "साइन इन करें", signUp: "साइन अप करें", haveAccount: "खाता है? साइन इन करें", noAccount: "खाता नहीं? साइन अप करें",
    selectCountry: "-- अपना देश चुनें --", phonePh: "आपका नंबर", sendCode: "SMS कोड भेजें",
    codePh: "6 अंकों का कोड", verifyCode: "सत्यापित करें और साइन इन करें", changeNumber: "नंबर बदलें",
    home: "होम", search: "खोजें", add: "पोस्ट करें", alerts: "सूचनाएं", profile: "प्रोफ़ाइल", signOut: "साइन आउट",
    composeTitle: "नई पोस्ट", composePh: "आप क्या सोच रहे हैं?", publish: "पोस्ट करें",
    commentsTitle: "टिप्पणियाँ", noComments: "अभी तक कोई टिप्पणी नहीं।", commentPh: "टिप्पणी लिखें...",
    myPosts: "मेरी पोस्ट", noPosts: "आपने अभी तक पोस्ट नहीं किया।", loadingFeed: "लोड हो रहा है...",
    noPostsFeed: "अभी तक कोई पोस्ट नहीं। पहले बनें!", demoNotice: "यह सुविधा अभी भी डेमो है — डेटाबेस से जुड़ी नहीं है।",
    language: "भाषा", chooseLanguage: "अपनी भाषा चुनें",
  },
  ru: {
    appName: "I'm Me", tagline: "Текст, фото и видео — всё в одном месте",
    email: "Эл. почта", phone: "Телефон", emailPh: "Ваша почта", passwordPh: "Пароль",
    signIn: "Войти", signUp: "Регистрация", haveAccount: "Есть аккаунт? Войти", noAccount: "Нет аккаунта? Регистрация",
    selectCountry: "-- Выберите страну --", phonePh: "Ваш номер", sendCode: "Отправить SMS-код",
    codePh: "Код из 6 цифр", verifyCode: "Подтвердить и войти", changeNumber: "Изменить номер",
    home: "Главная", search: "Поиск", add: "Опубликовать", alerts: "Уведомления", profile: "Профиль", signOut: "Выйти",
    composeTitle: "Новая запись", composePh: "О чём вы думаете?", publish: "Опубликовать",
    commentsTitle: "Комментарии", noComments: "Пока нет комментариев.", commentPh: "Написать комментарий...",
    myPosts: "Мои записи", noPosts: "Вы ещё ничего не публиковали.", loadingFeed: "Загрузка...",
    noPostsFeed: "Пока нет записей. Будьте первым!", demoNotice: "Эта функция всё ещё демо — пока не подключена к базе данных.",
    language: "Язык", chooseLanguage: "Выберите ваш язык",
  },
  id: {
    appName: "I'm Me", tagline: "Teks, foto, dan video — semua di satu tempat",
    email: "Email", phone: "Telepon", emailPh: "Email Anda", passwordPh: "Kata sandi",
    signIn: "Masuk", signUp: "Daftar", haveAccount: "Sudah punya akun? Masuk", noAccount: "Belum punya akun? Daftar",
    selectCountry: "-- Pilih negara Anda --", phonePh: "Nomor Anda", sendCode: "Kirim kode SMS",
    codePh: "Kode 6 digit", verifyCode: "Verifikasi dan masuk", changeNumber: "Ganti nomor",
    home: "Beranda", search: "Cari", add: "Posting", alerts: "Notifikasi", profile: "Profil", signOut: "Keluar",
    composeTitle: "Postingan baru", composePh: "Apa yang Anda pikirkan?", publish: "Posting",
    commentsTitle: "Komentar", noComments: "Belum ada komentar.", commentPh: "Tulis komentar...",
    myPosts: "Postingan saya", noPosts: "Anda belum memposting apa pun.", loadingFeed: "Memuat...",
    noPostsFeed: "Belum ada postingan. Jadilah yang pertama!", demoNotice: "Fitur ini masih demo — belum terhubung ke database.",
    language: "Bahasa", chooseLanguage: "Pilih bahasa Anda",
  },
  de: {
    appName: "I'm Me", tagline: "Text, Fotos und Video — alles an einem Ort",
    email: "E-Mail", phone: "Telefon", emailPh: "Ihre E-Mail", passwordPh: "Passwort",
    signIn: "Anmelden", signUp: "Registrieren", haveAccount: "Konto vorhanden? Anmelden", noAccount: "Kein Konto? Registrieren",
    selectCountry: "-- Land auswählen --", phonePh: "Ihre Nummer", sendCode: "SMS-Code senden",
    codePh: "6-stelliger Code", verifyCode: "Bestätigen und anmelden", changeNumber: "Nummer ändern",
    home: "Start", search: "Suche", add: "Posten", alerts: "Benachrichtigungen", profile: "Profil", signOut: "Abmelden",
    composeTitle: "Neuer Beitrag", composePh: "Was denkst du?", publish: "Posten",
    commentsTitle: "Kommentare", noComments: "Noch keine Kommentare.", commentPh: "Kommentar schreiben...",
    myPosts: "Meine Beiträge", noPosts: "Du hast noch nichts gepostet.", loadingFeed: "Lädt...",
    noPostsFeed: "Noch keine Beiträge. Sei der Erste!", demoNotice: "Diese Funktion ist noch eine Demo — noch nicht mit der Datenbank verbunden.",
    language: "Sprache", chooseLanguage: "Sprache wählen",
  },
  ja: {
    appName: "I'm Me", tagline: "テキスト、写真、動画 — すべてを一つの場所に",
    email: "メール", phone: "電話", emailPh: "メールアドレス", passwordPh: "パスワード",
    signIn: "ログイン", signUp: "登録", haveAccount: "アカウントをお持ちですか？ログイン", noAccount: "アカウントがない？登録",
    selectCountry: "-- 国を選択 --", phonePh: "電話番号", sendCode: "SMSコードを送信",
    codePh: "6桁のコード", verifyCode: "確認してログイン", changeNumber: "番号を変更",
    home: "ホーム", search: "検索", add: "投稿", alerts: "通知", profile: "プロフィール", signOut: "ログアウト",
    composeTitle: "新規投稿", composePh: "何を考えていますか？", publish: "投稿",
    commentsTitle: "コメント", noComments: "まだコメントはありません。", commentPh: "コメントを書く...",
    myPosts: "自分の投稿", noPosts: "まだ投稿していません。", loadingFeed: "読み込み中...",
    noPostsFeed: "まだ投稿がありません。最初の投稿をしましょう！", demoNotice: "この機能はまだデモです — データベースにはまだ接続されていません。",
    language: "言語", chooseLanguage: "言語を選択",
  },
};

function detectDefaultLang() {
  const nav = (typeof navigator !== "undefined" && navigator.language) ? navigator.language.slice(0, 2) : "en";
  return LANGUAGES.some((l) => l.code === nav) ? nav : "en";
}

// ---------- Supabase REST helpers (fetch-based, hakuna SDK) ----------
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${token || SUPABASE_KEY}`,
});

async function authRequest(path, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || data.error || "Hitilafu ya uthibitisho");
  return data;
}
const signUpEmail = (email, password) => authRequest("signup", { email, password });
const signInEmail = (email, password) => authRequest("token?grant_type=password", { email, password });
const sendPhoneOtp = (phone) => authRequest("otp", { phone });
const verifyPhoneOtp = (phone, token) => authRequest("verify", { type: "sms", phone, token });

async function apiGet(path, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function apiPost(path, body, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "POST",
    headers: { ...authHeaders(token), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}
async function apiDelete(path, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { method: "DELETE", headers: authHeaders(token) });
  return res.ok;
}
async function apiPatch(path, body, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "PATCH",
    headers: { ...authHeaders(token), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  return res.ok ? res.json() : Promise.reject(await res.text());
}

// ---------- AI Creator (Claude API) ----------
async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("\n").trim();
  return text || "...";
}

const ICE_SERVERS = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// ---------- Call Screen (WebRTC + Supabase signaling kwa polling) ----------
function CallScreen({ call, uid, token, otherUser, isCaller, callType, t, onEnd }) {
  const [status, setStatus] = useState(isCaller ? "calling" : "connecting");
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const localVideoRef = React.useRef(null);
  const remoteVideoRef = React.useRef(null);
  const pcRef = React.useRef(null);
  const localStreamRef = React.useRef(null);
  const seenSignalIds = React.useRef(new Set());

  useEffect(() => {
    let stopped = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: callType === "video" });
        if (stopped) return;
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(ICE_SERVERS);
        pcRef.current = pc;
        stream.getTracks().forEach((tr) => pc.addTrack(tr, stream));

        pc.ontrack = (e) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
          setStatus("connected");
        };
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            apiPost("call_signals", { call_id: call.id, sender_id: uid, kind: "candidate", payload: JSON.stringify(e.candidate) }, token).catch(() => {});
          }
        };

        if (isCaller) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await apiPost("call_signals", { call_id: call.id, sender_id: uid, kind: "offer", payload: JSON.stringify(offer) }, token);
        }
      } catch (e) {
        setStatus("error");
      }
    })();
    return () => {
      stopped = true;
      localStreamRef.current?.getTracks().forEach((tr) => tr.stop());
      pcRef.current?.close();
    };
  }, []);

  // Poll kwa signals kutoka upande mwingine
  useEffect(() => {
    const iv = setInterval(async () => {
      const pc = pcRef.current;
      if (!pc) return;
      try {
        const signals = await apiGet(`call_signals?call_id=eq.${call.id}&sender_id=neq.${uid}&order=created_at.asc`, token);
        for (const s of signals) {
          if (seenSignalIds.current.has(s.id)) continue;
          seenSignalIds.current.add(s.id);
          const payload = JSON.parse(s.payload);
          if (s.kind === "offer" && !isCaller) {
            await pc.setRemoteDescription(new RTCSessionDescription(payload));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            await apiPost("call_signals", { call_id: call.id, sender_id: uid, kind: "answer", payload: JSON.stringify(answer) }, token);
          } else if (s.kind === "answer" && isCaller) {
            await pc.setRemoteDescription(new RTCSessionDescription(payload));
          } else if (s.kind === "candidate") {
            try { await pc.addIceCandidate(new RTCIceCandidate(payload)); } catch (e) {}
          }
        }
        const callRow = await apiGet(`calls?id=eq.${call.id}&select=status`, token);
        if (callRow[0]?.status === "ended") { onEnd(); }
      } catch (e) {}
    }, 1500);
    return () => clearInterval(iv);
  }, [call.id]);

  const toggleMute = () => {
    localStreamRef.current?.getAudioTracks().forEach((tr) => (tr.enabled = muted));
    setMuted(!muted);
  };
  const toggleVideo = () => {
    localStreamRef.current?.getVideoTracks().forEach((tr) => (tr.enabled = videoOff));
    setVideoOff(!videoOff);
  };
  const endCall = async () => {
    try { await apiPatch(`calls?id=eq.${call.id}`, { status: "ended" }, token); } catch (e) {}
    onEnd();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: colors.ink }}>
      <div className="flex-1 relative">
        {callType === "video" ? (
          <>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <video ref={localVideoRef} autoPlay playsInline muted className="absolute bottom-4 right-4 w-28 h-40 rounded-xl object-cover border-2" style={{ borderColor: colors.gold }} />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={otherUser.avatar_url || `https://i.pravatar.cc/150?u=${otherUser.id}`} alt="" className="w-28 h-28 rounded-full object-cover mb-4" style={{ boxShadow: `0 0 0 4px ${colors.gold}` }} />
            <p className="text-xl font-semibold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{otherUser.name}</p>
            <p className="text-sm mt-1" style={{ color: colors.muted }}>
              {status === "calling" ? "..." : status === "connected" ? "00:00" : "..."}
            </p>
            <audio ref={remoteVideoRef} autoPlay />
          </div>
        )}
        {status !== "connected" && (
          <div className="absolute top-6 left-0 right-0 text-center">
            <p className="text-sm" style={{ color: colors.gold }}>
              {status === "calling" ? `${otherUser.name}...` : status === "error" ? "Camera/Mic error" : "..."}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-6 py-8" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
        <button onClick={toggleMute} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: muted ? colors.sunset : "rgba(255,255,255,0.15)" }}>
          {muted ? <MicOff size={22} color={colors.cream} /> : <Mic size={22} color={colors.cream} />}
        </button>
        {callType === "video" && (
          <button onClick={toggleVideo} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: videoOff ? colors.sunset : "rgba(255,255,255,0.15)" }}>
            {videoOff ? <VideoOff size={22} color={colors.cream} /> : <VideoIcon size={22} color={colors.cream} />}
          </button>
        )}
        <button onClick={endCall} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E23B3B" }}>
          <PhoneOff size={22} color={colors.cream} />
        </button>
      </div>
    </div>
  );
}

function IncomingCallBanner({ call, otherUser, t, onAccept, onDecline }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: colors.ink, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
      <img src={otherUser.avatar_url || `https://i.pravatar.cc/150?u=${otherUser.id}`} alt="" className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ color: colors.cream }}>{otherUser.name}</p>
        <p className="text-xs" style={{ color: colors.muted }}>{call.type === "video" ? "Video call..." : "Voice call..."}</p>
      </div>
      <button onClick={onDecline} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E23B3B" }}>
        <PhoneOff size={16} color={colors.cream} />
      </button>
      <button onClick={onAccept} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.forest }}>
        <PhoneIcon size={16} color={colors.cream} />
      </button>
    </div>
  );
}

// ---------- Auth Screen ----------
function AuthScreen({ onAuthed, lang, setLang }) {
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
  const isRtl = LANGUAGES.find((l) => l.code === lang)?.rtl;
  const [mode, setMode] = useState("email"); // email | phone
  const [emailMode, setEmailMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleEmailSubmit = async () => {
    setError(""); setInfo(""); setLoading(true);
    try {
      if (emailMode === "signup") {
        const data = await signUpEmail(email, password);
        if (data.access_token) onAuthed(data);
        else setInfo("Angalia email yako kuthibitisha akaunti, kisha ingia.");
      } else {
        const data = await signInEmail(email, password);
        onAuthed(data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fullPhone = () => `${country.dial}${phone}`;

  const handleSendOtp = async () => {
    setError(""); setLoading(true);
    try {
      await sendPhoneOtp(fullPhone());
      setOtpSent(true);
      setInfo("Msimbo umetumwa kwa SMS.");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(""); setLoading(true);
    try {
      const data = await verifyPhoneOtp(fullPhone(), otp);
      onAuthed(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center" style={{ backgroundColor: colors.ink }} dir={isRtl ? "rtl" : "ltr"}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <div className="w-full max-w-md px-6 py-10">
        <select value={lang} onChange={(e) => setLang(e.target.value)}
          className="mb-6 px-3 py-2 rounded-full text-xs mx-auto block outline-none"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", color: colors.cream }}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} style={{ color: "#1a1a1a" }}>{l.flag} {l.name}</option>
          ))}
        </select>

        <h1 className="text-4xl font-bold text-center mb-1" style={{ backgroundImage: NEON_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "'Fraunces', serif" }}>{t("appName")}</h1>
        <p className="text-center text-sm mb-8" style={{ color: colors.muted }}>{t("tagline")}</p>

        <div className="flex rounded-full p-1 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          <button onClick={() => { setMode("email"); setError(""); }} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: mode === "email" ? colors.sunset : "transparent", color: colors.cream }}>
            <Mail size={15} /> {t("email")}
          </button>
          <button onClick={() => { setMode("phone"); setError(""); }} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: mode === "phone" ? colors.sunset : "transparent", color: colors.cream }}>
            <PhoneIcon size={15} /> {t("phone")}
          </button>
        </div>

        {mode === "email" && (
          <div className="space-y-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPh")} type="email"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("passwordPh")} type="password"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <button onClick={handleEmailSubmit} disabled={loading || !email || !password}
              className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: colors.sunset, color: colors.cream, opacity: loading ? 0.6 : 1 }}>
              {loading ? "..." : emailMode === "signup" ? t("signUp") : t("signIn")}
            </button>
            <button onClick={() => setEmailMode(emailMode === "signup" ? "signin" : "signup")} className="w-full text-center text-xs" style={{ color: colors.gold }}>
              {emailMode === "signup" ? t("haveAccount") : t("noAccount")}
            </button>
          </div>
        )}

        {mode === "phone" && (
          <div className="space-y-3">
            <select value={country ? country.name : ""} onChange={(e) => setCountry(COUNTRIES.find((c) => c.name === e.target.value) || null)}
              disabled={otpSent} className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: colors.surface, color: country ? colors.charcoal : colors.muted, opacity: otpSent ? 0.6 : 1 }}>
              <option value="" disabled style={{ color: "#1a1a1a" }}>{t("selectCountry")}</option>
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name} style={{ color: "#1a1a1a" }}>{c.flag} {c.name} ({c.dial})</option>
              ))}
            </select>
            <div className="flex gap-2">
              <span className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center min-w-[64px] justify-center" style={{ backgroundColor: colors.surface, color: colors.charcoal }}>
                {country ? country.dial : "—"}
              </span>
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder={t("phonePh")} type="tel"
                disabled={otpSent || !country}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal, opacity: (otpSent || !country) ? 0.6 : 1 }} />
            </div>
            {!otpSent ? (
              <button onClick={handleSendOtp} disabled={loading || !phone || !country}
                className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: colors.sunset, color: colors.cream, opacity: (loading || !country) ? 0.6 : 1 }}>
                {loading ? "..." : t("sendCode")}
              </button>
            ) : (
              <>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder={t("codePh")} type="text"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none tracking-widest" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
                <button onClick={handleVerifyOtp} disabled={loading || !otp}
                  className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: colors.sunset, color: colors.cream, opacity: loading ? 0.6 : 1 }}>
                  {loading ? "..." : t("verifyCode")}
                </button>
                <button onClick={() => { setOtpSent(false); setOtp(""); }} className="w-full text-center text-xs" style={{ color: colors.gold }}>
                  {t("changeNumber")}
                </button>
              </>
            )}
          </div>
        )}

        {error && <p className="text-xs mt-3 text-center" style={{ color: "#FF9E80" }}>{error}</p>}
        {info && <p className="text-xs mt-3 text-center" style={{ color: colors.gold }}>{info}</p>}
      </div>
    </div>
  );
}

// ---------- Post Card ----------
function Badge({ type }) {
  const map = {
    text: { label: "ANDIKO", color: colors.gold, Icon: Type },
    photo: { label: "PICHA", color: colors.sunset, Icon: ImageIcon },
    video: { label: "VIDEO", color: colors.forest, Icon: VideoIcon },
  };
  const { label, color, Icon } = map[type] || map.text;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}1A`, color }}>
      <Icon size={11} strokeWidth={2.5} />{label}
    </span>
  );
}

function PostCard({ post, onToggleLike, onOpenComments }) {
  const author = post.users || { name: "Mtumiaji", handle: "@user", avatar_url: null };
  return (
    <div className="rounded-2xl mb-4 overflow-hidden border" style={{ backgroundColor: colors.surface, borderColor: colors.line }}>
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-3">
          <img src={author.avatar_url || `https://i.pravatar.cc/150?u=${post.user_id}`} alt="" className="w-10 h-10 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${colors.gold}` }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: colors.cream }}>{author.name}</p>
            <p className="text-xs" style={{ color: colors.muted, fontFamily: "'IBM Plex Mono', monospace" }}>{author.handle}</p>
          </div>
        </div>
        <Badge type={post.type} />
      </div>
      <div className="px-4 py-4">
        {post.type === "text" ? (
          <p className="text-lg leading-snug" style={{ color: colors.charcoal, fontFamily: "'Fraunces', serif" }}>{post.content}</p>
        ) : (
          <p className="text-sm" style={{ color: colors.charcoal }}>{post.content}</p>
        )}
      </div>
      {post.media_url && (
        <div className="relative">
          <img src={post.media_url} alt="" className="w-full h-72 object-cover" />
          {post.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(27,42,74,0.75)" }}>
                <Play size={22} color={colors.cream} fill={colors.cream} />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-5 px-4 py-3">
        <button onClick={() => onToggleLike(post)} className="flex items-center gap-1.5 text-sm" style={{ color: post.liked ? colors.sunset : colors.muted }}>
          <Heart size={18} fill={post.liked ? colors.sunset : "none"} />{post.likeCount ?? 0}
        </button>
        <button onClick={() => onOpenComments(post)} className="flex items-center gap-1.5 text-sm" style={{ color: colors.muted }}>
          <MessageCircle size={18} />{post.commentCount ?? 0}
        </button>
        <button className="flex items-center gap-1.5 text-sm ml-auto" style={{ color: colors.muted }}><Share2 size={17} /></button>
      </div>
    </div>
  );
}

function ComposeModal({ onClose, onSubmit, t }) {
  const [type, setType] = useState("text");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("general");
  const options = [
    { key: "text", label: "Andiko", Icon: Type, color: colors.gold },
    { key: "photo", label: "Picha", Icon: ImageIcon, color: colors.sunset },
    { key: "video", label: "Video", Icon: VideoIcon, color: colors.forest },
  ];
  const CATS = ["general", "music", "sports", "gaming", "business", "technology", "education"];
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50" style={{ backgroundColor: "rgba(27,42,74,0.55)" }} onClick={onClose}>
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5" style={{ backgroundColor: colors.surface }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("composeTitle")}</h2>
          <button onClick={onClose}><X size={20} color={colors.cream} /></button>
        </div>
        <div className="flex gap-2 mb-4">
          {options.map(({ key, label, Icon, color }) => (
            <button key={key} onClick={() => setType(key)} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2"
              style={{ borderColor: type === key ? color : colors.line, backgroundColor: type === key ? `${color}14` : "transparent" }}>
              <Icon size={18} color={type === key ? color : colors.muted} />
              <span className="text-xs font-semibold" style={{ color: type === key ? color : colors.muted }}>{label}</span>
            </button>
          ))}
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-sm outline-none border mb-3" style={{ borderColor: colors.line, backgroundColor: colors.surface, color: colors.charcoal }}>
          {CATS.map((c) => (
            <option key={c} value={c} style={{ color: "#1a1a1a" }}>{t("cat" + c.charAt(0).toUpperCase() + c.slice(1))}</option>
          ))}
        </select>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("composePh")} rows={4}
          className="w-full rounded-xl p-3 text-sm outline-none resize-none border" style={{ borderColor: colors.line, color: colors.charcoal }} />
        <button onClick={() => { onSubmit(type, text, category); setText(""); }} disabled={!text.trim()}
          className="w-full mt-4 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: colors.sunset, color: colors.ink }}>
          {t("publish")}
        </button>
      </div>
    </div>
  );
}

function CommentsModal({ post, comments, onClose, onAddComment, t }) {
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ backgroundColor: "rgba(27,42,74,0.55)" }} onClick={onClose}>
      <div className="w-full sm:max-w-md h-[70vh] rounded-t-3xl sm:rounded-3xl flex flex-col" style={{ backgroundColor: colors.surface }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: colors.line }}>
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("commentsTitle")}</h2>
          <button onClick={onClose}><X size={20} color={colors.cream} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {comments.length === 0 && <p className="text-sm text-center mt-8" style={{ color: colors.muted }}>{t("noComments")}</p>}
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <img src={c.users?.avatar_url || `https://i.pravatar.cc/150?u=${c.user_id}`} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold" style={{ color: colors.cream }}>{c.users?.name || "..."}</p>
                <p className="text-sm" style={{ color: colors.charcoal }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: colors.line }}>
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && text.trim() && (onAddComment(text), setText(""))}
            placeholder={t("commentPh")} className="flex-1 text-sm px-3 py-2 rounded-full border outline-none" style={{ borderColor: colors.line }} />
          <button onClick={() => { if (text.trim()) { onAddComment(text); setText(""); } }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.sunset }}>
            <Send size={15} color={colors.cream} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DMScreen({ uid, token, profile, t, onClose, onStartCall, initialUser }) {
  const [view, setView] = useState("list"); // list | chat | newchat
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadConversations = async () => {
    try {
      const rows = await apiGet(`conversation_participants?user_id=eq.${uid}&select=conversation_id`, token);
      const detailed = await Promise.all(
        rows.map(async (r) => {
          const [others, lastMsgs] = await Promise.all([
            apiGet(`conversation_participants?conversation_id=eq.${r.conversation_id}&user_id=neq.${uid}&select=users(id,name,handle,avatar_url)`, token),
            apiGet(`messages?conversation_id=eq.${r.conversation_id}&select=*&order=created_at.desc&limit=1`, token),
          ]);
          return {
            id: r.conversation_id,
            other: others[0]?.users || { name: "?", handle: "" },
            lastMessage: lastMsgs[0]?.text || "",
            lastTime: lastMsgs[0]?.created_at,
          };
        })
      );
      detailed.sort((a, b) => new Date(b.lastTime || 0) - new Date(a.lastTime || 0));
      setConversations(detailed);
    } catch (e) { /* silent - list may just be empty */ }
  };

  useEffect(() => { loadConversations(); }, []);
  useEffect(() => {
    const iv = setInterval(() => { if (view === "list") loadConversations(); }, 5000);
    return () => clearInterval(iv);
  }, [view]);

  const openConversation = async (conv) => {
    setActiveConv(conv);
    setView("chat");
    try {
      const data = await apiGet(`messages?conversation_id=eq.${conv.id}&select=*,users(name,avatar_url)&order=created_at.asc`, token);
      setMessages(data);
    } catch (e) { setMessages([]); }
  };

  useEffect(() => {
    if (view !== "chat" || !activeConv) return;
    const iv = setInterval(async () => {
      try {
        const data = await apiGet(`messages?conversation_id=eq.${activeConv.id}&select=*,users(name,avatar_url)&order=created_at.asc`, token);
        setMessages(data);
      } catch (e) {}
    }, 3000);
    return () => clearInterval(iv);
  }, [view, activeConv]);

  const sendMessage = async () => {
    if (!text.trim() || !activeConv) return;
    const body = text;
    setText("");
    try {
      const created = await apiPost("messages", { conversation_id: activeConv.id, sender_id: uid, text: body }, token);
      setMessages((prev) => [...prev, { ...created[0], users: profile }]);
    } catch (e) {}
  };

  const searchUsers = async (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const data = await apiGet(`users?or=(name.ilike.*${q}*,handle.ilike.*${q}*)&id=neq.${uid}&select=*&limit=20`, token);
      setResults(data);
    } catch (e) { setResults([]); }
    setLoading(false);
  };

  const startConversation = async (otherUser) => {
    try {
      const conv = await apiPost("conversations", {}, token);
      const convId = conv[0].id;
      await apiPost("conversation_participants", [
        { conversation_id: convId, user_id: uid },
        { conversation_id: convId, user_id: otherUser.id },
      ], token);
      const newConv = { id: convId, other: otherUser, lastMessage: "", lastTime: null };
      setConversations((prev) => [newConv, ...prev]);
      openConversation(newConv);
    } catch (e) {}
  };

  useEffect(() => { if (initialUser) startConversation(initialUser); }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.surface }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4" style={{ backgroundColor: colors.ink }}>
          <button onClick={() => (view === "list" ? onClose() : setView("list"))}>
            <ArrowLeft size={20} color={colors.cream} />
          </button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {view === "chat" ? activeConv?.other?.name : t("messages")}
          </h2>
          {view === "list" && (
            <button onClick={() => setView("newchat")}><Plus size={22} color={colors.cream} /></button>
          )}
          {view === "chat" && (
            <div className="flex items-center gap-3">
              <button onClick={() => onStartCall(activeConv.other, "voice", activeConv.id)}><PhoneIcon size={19} color={colors.cream} /></button>
              <button onClick={() => onStartCall(activeConv.other, "video", activeConv.id)}><VideoIcon size={19} color={colors.cream} /></button>
            </div>
          )}
        </div>

        {view === "list" && (
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 && <p className="text-sm text-center mt-10" style={{ color: colors.muted }}>{t("noConversations")}</p>}
            {conversations.map((c) => (
              <button key={c.id} onClick={() => openConversation(c)} className="w-full flex items-center gap-3 px-4 py-3 border-b text-left" style={{ borderColor: colors.line }}>
                <img src={c.other.avatar_url || `https://i.pravatar.cc/150?u=${c.other.id}`} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: colors.cream }}>{c.other.name}</p>
                  <p className="text-xs truncate" style={{ color: colors.muted }}>{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "newchat" && (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <input value={query} onChange={(e) => searchUsers(e.target.value)} placeholder={t("searchUsers")}
              className="w-full px-4 py-3 rounded-full text-sm outline-none border mb-4" style={{ borderColor: colors.line }} />
            {loading && <p className="text-sm text-center" style={{ color: colors.muted }}>...</p>}
            {!loading && query && results.length === 0 && <p className="text-sm text-center" style={{ color: colors.muted }}>{t("noUsersFound")}</p>}
            {results.map((u) => (
              <button key={u.id} onClick={() => startConversation(u)} className="w-full flex items-center gap-3 py-3 text-left">
                <img src={u.avatar_url || `https://i.pravatar.cc/150?u=${u.id}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: colors.cream }}>{u.name}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{u.handle}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && <p className="text-sm text-center mt-10" style={{ color: colors.muted }}>{t("noMessagesYet")}</p>}
              {messages.map((m) => {
                const mine = m.sender_id === uid;
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[75%] px-4 py-2 rounded-2xl text-sm"
                      style={{ backgroundColor: mine ? colors.sunset : colors.surface, color: mine ? colors.ink : colors.charcoal, border: mine ? "none" : `1px solid ${colors.line}` }}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: colors.line }}>
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("typeMessage")} className="flex-1 text-sm px-3 py-2 rounded-full border outline-none" style={{ borderColor: colors.line }} />
              <button onClick={sendMessage} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.sunset }}>
                <Send size={15} color={colors.cream} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ReelsScreen({ uid, token, t, onToggleLike, onOpenComments, onClose }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const rows = await apiGet("posts?type=eq.video&select=*,users!posts_user_id_fkey(name,handle,avatar_url)&order=created_at.desc&limit=30", token);
        const likes = await apiGet(`likes?user_id=eq.${uid}&select=post_id`, token);
        const likedIds = new Set(likes.map((l) => l.post_id));
        const withCounts = await Promise.all(
          rows.map(async (p) => {
            const [likeRows, commentRows] = await Promise.all([
              apiGet(`likes?post_id=eq.${p.id}&select=post_id`, token),
              apiGet(`comments?post_id=eq.${p.id}&select=id`, token),
            ]);
            return { ...p, likeCount: likeRows.length, commentCount: commentRows.length, liked: likedIds.has(p.id) };
          })
        );
        setReels(withCounts);
      } catch (e) {
        setReels([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: "#000000" }}>
      <div className="w-full max-w-md h-full relative">
        <button onClick={onClose} className="absolute top-4 left-4 z-10"><X size={24} color="#FFFFFF" /></button>
        <h2 className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-sm font-bold" style={{ color: "#FFFFFF", fontFamily: "'Fraunces', serif" }}>{t("reels")}</h2>

        {loading && <p className="text-sm text-center pt-24" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
        {!loading && reels.length === 0 && <p className="text-sm text-center pt-24" style={{ color: colors.muted }}>{t("noReels")}</p>}

        <div className="h-full overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {reels.map((post) => (
            <div key={post.id} className="h-full w-full snap-start relative flex items-center justify-center">
              {post.media_url ? (
                <video src={post.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.surface }}>
                  <p className="text-sm px-8 text-center" style={{ color: colors.charcoal, fontFamily: "'Fraunces', serif" }}>{post.content}</p>
                </div>
              )}

              <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
                <button onClick={() => onToggleLike(post)} className="flex flex-col items-center gap-1">
                  <Heart size={28} color={post.liked ? colors.sunset : "#FFFFFF"} fill={post.liked ? colors.sunset : "none"} />
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>{post.likeCount}</span>
                </button>
                <button onClick={() => onOpenComments(post)} className="flex flex-col items-center gap-1">
                  <MessageCircle size={26} color="#FFFFFF" />
                  <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>{post.commentCount}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <Share2 size={24} color="#FFFFFF" />
                </button>
              </div>

              <div className="absolute left-4 bottom-8 right-20">
                <div className="flex items-center gap-2 mb-1">
                  <img src={post.users?.avatar_url || `https://i.pravatar.cc/150?u=${post.user_id}`} alt="" className="w-8 h-8 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${colors.gold}` }} />
                  <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{post.users?.handle}</span>
                </div>
                <p className="text-sm" style={{ color: "#FFFFFF" }}>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AICreatorScreen({ t, lang, onClose }) {
  const MODES = [
    { key: "caption", label: t("aiCaption"), Icon: Type },
    { key: "improve", label: t("aiImprove"), Icon: Sparkles },
    { key: "translate", label: t("aiTranslate"), Icon: MessageSquare },
    { key: "video", label: t("aiVideoIdeas"), Icon: VideoIcon },
  ];
  const [mode, setMode] = useState("caption");
  const [input, setInput] = useState("");
  const [targetLang, setTargetLang] = useState(LANGUAGES.find((l) => l.code === lang)?.name || "English");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    if (mode === "caption") return `Write 3 short, catchy social media post captions (with a few relevant emojis) about: "${input}". Number them 1-3. Keep each under 25 words.`;
    if (mode === "improve") return `Improve the grammar, clarity, and tone of this social media post text, keeping the same language and meaning. Return only the improved text, no explanation:\n\n"${input}"`;
    if (mode === "translate") return `Translate the following text into ${targetLang}. Return only the translation, nothing else:\n\n"${input}"`;
    if (mode === "video") return `Suggest 5 creative short-video (Reels/TikTok style) content ideas about: "${input}". Number them 1-5, one short sentence each.`;
    return input;
  };

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true); setResult(""); setCopied(false);
    try {
      const out = await callClaude(buildPrompt());
      setResult(out);
    } catch (e) {
      setResult("...");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard?.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onClose}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold" style={{ backgroundImage: NEON_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "'Fraunces', serif" }}>
            {t("aiCreator")}
          </h2>
        </div>

        <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {MODES.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => { setMode(key); setResult(""); }} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundImage: mode === key ? NEON_GRADIENT : "none",
                backgroundColor: mode === key ? "transparent" : colors.surface,
                color: mode === key ? colors.ink : colors.muted,
              }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {mode === "translate" && (
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-3" style={{ backgroundColor: colors.surface, color: colors.charcoal }}>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.name} style={{ color: "#1a1a1a" }}>{l.flag} {l.name}</option>
              ))}
            </select>
          )}
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("aiInputPh")} rows={4}
            className="w-full rounded-xl p-3 text-sm outline-none resize-none border mb-3" style={{ borderColor: colors.line, backgroundColor: colors.surface, color: colors.charcoal }} />
          <button onClick={generate} disabled={loading || !input.trim()}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mb-4"
            style={{ backgroundImage: NEON_GRADIENT, color: colors.ink, opacity: (loading || !input.trim()) ? 0.6 : 1 }}>
            <Sparkles size={16} /> {loading ? t("aiGenerating") : t("aiGenerate")}
          </button>

          {result && (
            <div className="rounded-xl p-4 border" style={{ borderColor: colors.line, backgroundColor: colors.surface }}>
              <p className="text-sm whitespace-pre-wrap mb-3" style={{ color: colors.charcoal }}>{result}</p>
              <button onClick={copyResult} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: colors.gold }}>
                {copied ? <CheckIcon size={14} /> : <Copy size={14} />} {copied ? t("aiCopied") : t("aiCopy")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExploreScreen({ uid, token, t, onToggleLike, onOpenComments }) {
  const CATEGORIES = [
    { key: "trending", label: t("trending") },
    { key: "forYou", label: t("forYou") },
    { key: "general", label: t("catGeneral") },
    { key: "music", label: t("catMusic") },
    { key: "sports", label: t("catSports") },
    { key: "gaming", label: t("catGaming") },
    { key: "business", label: t("catBusiness") },
    { key: "technology", label: t("catTechnology") },
    { key: "education", label: t("catEducation") },
  ];
  const [active, setActive] = useState("trending");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const withCounts = async (rows) => {
    const likes = await apiGet(`likes?user_id=eq.${uid}&select=post_id`, token);
    const likedIds = new Set(likes.map((l) => l.post_id));
    return Promise.all(
      rows.map(async (p) => {
        const [likeRows, commentRows] = await Promise.all([
          apiGet(`likes?post_id=eq.${p.id}&select=post_id`, token),
          apiGet(`comments?post_id=eq.${p.id}&select=id`, token),
        ]);
        return { ...p, likeCount: likeRows.length, commentCount: commentRows.length, liked: likedIds.has(p.id) };
      })
    );
  };

  const load = async () => {
    setLoading(true);
    try {
      if (active === "trending") {
        const rows = await apiGet("posts?select=*,users!posts_user_id_fkey(name,handle,avatar_url)&order=created_at.desc&limit=50", token);
        const counted = await withCounts(rows);
        counted.sort((a, b) => b.likeCount - a.likeCount);
        setPosts(counted.slice(0, 30));
      } else if (active === "forYou") {
        const myLikes = await apiGet(`likes?user_id=eq.${uid}&select=posts(category)`, token);
        const freq = {};
        myLikes.forEach((l) => { const c = l.posts?.category || "general"; freq[c] = (freq[c] || 0) + 1; });
        const topCats = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 3);
        const catsToUse = topCats.length > 0 ? topCats : ["general"];
        const filter = catsToUse.map((c) => `category.eq.${c}`).join(",");
        const rows = await apiGet(`posts?select=*,users!posts_user_id_fkey(name,handle,avatar_url)&or=(${filter})&order=created_at.desc&limit=30`, token);
        setPosts(await withCounts(rows));
      } else {
        const rows = await apiGet(`posts?select=*,users!posts_user_id_fkey(name,handle,avatar_url)&category=eq.${active}&order=created_at.desc&limit=30`, token);
        setPosts(await withCounts(rows));
      }
    } catch (e) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [active]);

  return (
    <div className="px-4 pb-24 pt-4">
      <h2 className="text-xl font-bold mb-3" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("explore")}</h2>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c) => (
          <button key={c.key} onClick={() => setActive(c.key)} className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              backgroundImage: active === c.key ? NEON_GRADIENT : "none",
              backgroundColor: active === c.key ? "transparent" : colors.surface,
              color: active === c.key ? colors.ink : colors.muted,
              border: active === c.key ? "none" : `1px solid ${colors.line}`,
            }}>
            {c.label}
          </button>
        ))}
      </div>
      {loading && <p className="text-sm text-center py-8" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
      {!loading && posts.length === 0 && <p className="text-sm text-center py-8" style={{ color: colors.muted }}>{t("noExplorePosts")}</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onToggleLike={onToggleLike} onOpenComments={onOpenComments} />
      ))}
    </div>
  );
}

function CirclesScreen({ uid, token, t, onClose }) {
  const [circles, setCircles] = useState([]);
  const [activeCircle, setActiveCircle] = useState(null);
  const [members, setMembers] = useState([]);
  const [newName, setNewName] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const loadCircles = async () => {
    try {
      const rows = await apiGet(`circles?owner_id=eq.${uid}&select=*&order=created_at.desc`, token);
      setCircles(rows);
    } catch (e) {}
  };
  useEffect(() => { loadCircles(); }, []);

  const createCircle = async () => {
    if (!newName.trim()) return;
    try {
      const created = await apiPost("circles", { owner_id: uid, name: newName }, token);
      setCircles((prev) => [created[0], ...prev]);
      setNewName("");
    } catch (e) {}
  };

  const openCircle = async (circle) => {
    setActiveCircle(circle);
    try {
      const rows = await apiGet(`circle_members?circle_id=eq.${circle.id}&select=users(id,name,handle,avatar_url)`, token);
      setMembers(rows.map((r) => r.users));
    } catch (e) { setMembers([]); }
  };

  const searchUsers = async (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    try {
      const rows = await apiGet(`users?or=(name.ilike.*${q}*,handle.ilike.*${q}*)&id=neq.${uid}&select=*&limit=15`, token);
      setResults(rows);
    } catch (e) { setResults([]); }
  };

  const addMember = async (user) => {
    try {
      await apiPost("circle_members", { circle_id: activeCircle.id, user_id: user.id }, token);
      setMembers((prev) => [...prev, user]);
      setQuery(""); setResults([]);
    } catch (e) {}
  };

  const removeMember = async (userId) => {
    try {
      await apiDelete(`circle_members?circle_id=eq.${activeCircle.id}&user_id=eq.${userId}`, token);
      setMembers((prev) => prev.filter((m) => m.id !== userId));
    } catch (e) {}
  };

  const deleteCircle = async (circleId) => {
    try {
      await apiDelete(`circles?id=eq.${circleId}`, token);
      setCircles((prev) => prev.filter((c) => c.id !== circleId));
      if (activeCircle?.id === circleId) setActiveCircle(null);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => (activeCircle ? setActiveCircle(null) : onClose())}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {activeCircle ? activeCircle.name : t("circles")}
          </h2>
        </div>

        {!activeCircle && (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="flex gap-2 mb-4">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t("circleName")}
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
              <button onClick={createCircle} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
                {t("createCircle")}
              </button>
            </div>
            {circles.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noCircles")}</p>}
            {circles.map((c) => (
              <div key={c.id} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: colors.line }}>
                <button onClick={() => openCircle(c)} className="flex-1 flex items-center gap-3 text-left">
                  <Users size={18} color={colors.gold} />
                  <span className="text-sm font-semibold" style={{ color: colors.cream }}>{c.name}</span>
                </button>
                <button onClick={() => deleteCircle(c.id)}><Trash2 size={16} color={colors.muted} /></button>
              </div>
            ))}
          </div>
        )}

        {activeCircle && (
          <div className="flex-1 overflow-y-auto px-4">
            <input value={query} onChange={(e) => searchUsers(e.target.value)} placeholder={t("addMember")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none mb-3" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            {results.map((u) => (
              <button key={u.id} onClick={() => addMember(u)} className="w-full flex items-center gap-3 py-2 text-left">
                <img src={u.avatar_url || `https://i.pravatar.cc/150?u=${u.id}`} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: colors.cream }}>{u.name}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{u.handle}</p>
                </div>
                <Plus size={16} color={colors.gold} className="ml-auto" />
              </button>
            ))}
            <div className="h-px my-3" style={{ backgroundColor: colors.line }} />
            {members.length === 0 && <p className="text-sm text-center mt-4" style={{ color: colors.muted }}>{t("noMembers")}</p>}
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-2">
                <img src={m.avatar_url || `https://i.pravatar.cc/150?u=${m.id}`} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: colors.cream }}>{m.name}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{m.handle}</p>
                </div>
                <button onClick={() => removeMember(m.id)}><X size={16} color={colors.muted} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Live Streaming ----------
function LivesListScreen({ uid, token, profile, t, onClose, onHost, onWatch }) {
  const [lives, setLives] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const rows = await apiGet("lives?status=eq.active&select=*,users(name,handle,avatar_url)&order=created_at.desc", token);
      setLives(rows);
    } catch (e) { setLives([]); }
    setLoading(false);
  };
  useEffect(() => { load(); const iv = setInterval(load, 5000); return () => clearInterval(iv); }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onClose}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("live")}</h2>
          <button onClick={onHost} className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
            <Radio size={14} /> {t("goLive")}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {loading && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
          {!loading && lives.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noLives")}</p>}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {lives.map((l) => (
              <button key={l.id} onClick={() => onWatch(l)} className="rounded-xl overflow-hidden relative aspect-[3/4]" style={{ backgroundColor: colors.surface }}>
                <img src={l.users?.avatar_url || `https://i.pravatar.cc/150?u=${l.host_id}`} alt="" className="w-full h-full object-cover opacity-60" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#E23B3B", color: "#FFF" }}>LIVE</span>
                <span className="absolute bottom-2 left-2 right-2 text-xs font-semibold truncate" style={{ color: "#FFF" }}>{l.users?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveHostScreen({ uid, token, profile, t, onEnd }) {
  const [live, setLive] = useState(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const localVideoRef = React.useRef(null);
  const localStreamRef = React.useRef(null);
  const peersRef = React.useRef({}); // viewerId -> RTCPeerConnection
  const seenSignals = React.useRef(new Set());

  useEffect(() => {
    let stopped = false;
    (async () => {
      try {
        const created = await apiPost("lives", { host_id: uid, title: "" }, token);
        if (stopped) return;
        setLive(created[0]);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch (e) {}
    })();
    return () => {
      stopped = true;
      localStreamRef.current?.getTracks().forEach((tr) => tr.stop());
      Object.values(peersRef.current).forEach((pc) => pc.close());
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const iv = setInterval(async () => {
      try {
        const signals = await apiGet(`live_signals?live_id=eq.${live.id}&target_id=eq.${uid}&order=created_at.asc`, token);
        for (const s of signals) {
          if (seenSignals.current.has(s.id)) continue;
          seenSignals.current.add(s.id);
          const viewerId = s.sender_id;
          if (s.kind === "join") {
            const pc = new RTCPeerConnection(ICE_SERVERS);
            peersRef.current[viewerId] = pc;
            localStreamRef.current?.getTracks().forEach((tr) => pc.addTrack(tr, localStreamRef.current));
            pc.onicecandidate = (e) => {
              if (e.candidate) apiPost("live_signals", { live_id: live.id, sender_id: uid, target_id: viewerId, kind: "candidate", payload: JSON.stringify(e.candidate) }, token).catch(() => {});
            };
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            await apiPost("live_signals", { live_id: live.id, sender_id: uid, target_id: viewerId, kind: "offer", payload: JSON.stringify(offer) }, token);
          } else if (s.kind === "answer") {
            const pc = peersRef.current[viewerId];
            if (pc) await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(s.payload)));
          } else if (s.kind === "candidate") {
            const pc = peersRef.current[viewerId];
            if (pc) { try { await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(s.payload))); } catch (e) {} }
          }
        }
        const chatRows = await apiGet(`live_chat?live_id=eq.${live.id}&select=*,users(name)&order=created_at.asc&limit=50`, token);
        setChat(chatRows);
      } catch (e) {}
    }, 2000);
    return () => clearInterval(iv);
  }, [live]);

  const sendChat = async () => {
    if (!msg.trim() || !live) return;
    const body = msg; setMsg("");
    try {
      const created = await apiPost("live_chat", { live_id: live.id, user_id: uid, text: body }, token);
      setChat((prev) => [...prev, { ...created[0], users: profile }]);
    } catch (e) {}
  };

  const endLive = async () => {
    if (live) { try { await apiPatch(`lives?id=eq.${live.id}`, { status: "ended" }, token); } catch (e) {} }
    onEnd();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#000" }}>
      <video ref={localVideoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#E23B3B", color: "#FFF" }}>LIVE</span>
        <button onClick={endLive} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#FFF" }}>{t("endLive")}</button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 max-h-56 overflow-y-auto px-4 py-2 space-y-1">
        {chat.map((c) => (
          <p key={c.id} className="text-xs" style={{ color: "#FFF", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            <span className="font-bold">{c.users?.name}: </span>{c.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function LiveViewerScreen({ uid, token, profile, t, live, onLeave }) {
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const remoteVideoRef = React.useRef(null);
  const pcRef = React.useRef(null);
  const seenSignals = React.useRef(new Set());

  useEffect(() => {
    let stopped = false;
    (async () => {
      try {
        await apiPost("live_viewers", { live_id: live.id, viewer_id: uid }, token).catch(() => {});
        const pc = new RTCPeerConnection(ICE_SERVERS);
        pcRef.current = pc;
        pc.ontrack = (e) => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0]; };
        pc.onicecandidate = (e) => {
          if (e.candidate) apiPost("live_signals", { live_id: live.id, sender_id: uid, target_id: live.host_id, kind: "candidate", payload: JSON.stringify(e.candidate) }, token).catch(() => {});
        };
        await apiPost("live_signals", { live_id: live.id, sender_id: uid, target_id: live.host_id, kind: "join", payload: "{}" }, token);
      } catch (e) {}
    })();
    return () => { stopped = true; pcRef.current?.close(); };
  }, []);

  useEffect(() => {
    const iv = setInterval(async () => {
      const pc = pcRef.current;
      try {
        if (pc) {
          const signals = await apiGet(`live_signals?live_id=eq.${live.id}&target_id=eq.${uid}&order=created_at.asc`, token);
          for (const s of signals) {
            if (seenSignals.current.has(s.id)) continue;
            seenSignals.current.add(s.id);
            if (s.kind === "offer") {
              await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(s.payload)));
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              await apiPost("live_signals", { live_id: live.id, sender_id: uid, target_id: live.host_id, kind: "answer", payload: JSON.stringify(answer) }, token);
            } else if (s.kind === "candidate") {
              try { await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(s.payload))); } catch (e) {}
            }
          }
        }
        const chatRows = await apiGet(`live_chat?live_id=eq.${live.id}&select=*,users(name)&order=created_at.asc&limit=50`, token);
        setChat(chatRows);
      } catch (e) {}
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const sendChat = async () => {
    if (!msg.trim()) return;
    const body = msg; setMsg("");
    try {
      const created = await apiPost("live_chat", { live_id: live.id, user_id: uid, text: body }, token);
      setChat((prev) => [...prev, { ...created[0], users: profile }]);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "#000" }}>
      <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#E23B3B", color: "#FFF" }}>LIVE</span>
        <button onClick={onLeave} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#FFF" }}>
          <X size={14} />
        </button>
      </div>
      <div className="absolute bottom-16 left-0 right-0 max-h-48 overflow-y-auto px-4 py-2 space-y-1">
        {chat.map((c) => (
          <p key={c.id} className="text-xs" style={{ color: "#FFF", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            <span className="font-bold">{c.users?.name}: </span>{c.text}
          </p>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
        <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()}
          placeholder={t("liveChatPh")} className="flex-1 text-sm px-3 py-2 rounded-full outline-none" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FFF" }} />
        <button onClick={sendChat} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.sunset }}>
          <Send size={15} color={colors.ink} />
        </button>
      </div>
    </div>
  );
}

function MarketplaceScreen({ uid, token, t, onClose, onMessageSeller }) {
  const CATS = ["general", "electronics", "fashion", "home", "vehicles", "other"];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | sell | detail
  const [activeProduct, setActiveProduct] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", price: "", condition: "new", category: "general" });

  const load = async () => {
    setLoading(true);
    try {
      const rows = await apiGet("products?status=eq.available&select=*,users(id,name,handle,avatar_url)&order=created_at.desc&limit=50", token);
      setProducts(rows);
    } catch (e) { setProducts([]); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submitProduct = async () => {
    if (!form.title.trim()) return;
    try {
      await apiPost("products", {
        seller_id: uid, title: form.title, description: form.description,
        price: form.price ? Number(form.price) : null, condition: form.condition, category: form.category,
      }, token);
      setForm({ title: "", description: "", price: "", condition: "new", category: "general" });
      setView("browse");
      load();
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => (view === "browse" ? onClose() : setView("browse"))}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {view === "detail" ? activeProduct?.title : t("marketplace")}
          </h2>
          {view === "browse" && (
            <button onClick={() => setView("sell")} className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              <Plus size={13} /> {t("sell")}
            </button>
          )}
        </div>

        {view === "browse" && (
          <div className="flex-1 overflow-y-auto px-4">
            {loading && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
            {!loading && products.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noProducts")}</p>}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {products.map((p) => (
                <button key={p.id} onClick={() => { setActiveProduct(p); setView("detail"); }} className="rounded-xl overflow-hidden text-left" style={{ backgroundColor: colors.surface }}>
                  <div className="w-full aspect-square flex items-center justify-center" style={{ backgroundColor: colors.line }}>
                    {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-cover" /> : <ShoppingBag size={28} color={colors.muted} />}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold truncate" style={{ color: colors.cream }}>{p.title}</p>
                    <p className="text-xs font-bold" style={{ color: colors.gold }}>{p.price ? `${p.price} ${p.currency}` : "—"}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "sell" && (
          <div className="flex-1 overflow-y-auto px-4 space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t("productTitle")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t("productDesc")} rows={3}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9.]/g, "") })} placeholder={t("productPrice")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <div className="flex gap-2">
              <button onClick={() => setForm({ ...form, condition: "new" })} className="flex-1 py-2 rounded-xl text-xs font-semibold"
                style={{ backgroundColor: form.condition === "new" ? colors.sunset : colors.surface, color: form.condition === "new" ? colors.ink : colors.muted }}>
                {t("productNew")}
              </button>
              <button onClick={() => setForm({ ...form, condition: "used" })} className="flex-1 py-2 rounded-xl text-xs font-semibold"
                style={{ backgroundColor: form.condition === "used" ? colors.sunset : colors.surface, color: form.condition === "used" ? colors.ink : colors.muted }}>
                {t("productUsed")}
              </button>
            </div>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }}>
              {CATS.map((c) => <option key={c} value={c} style={{ color: "#1a1a1a" }}>{c}</option>)}
            </select>
            <button onClick={submitProduct} disabled={!form.title.trim()} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("listProduct")}
            </button>
          </div>
        )}

        {view === "detail" && activeProduct && (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 flex items-center justify-center" style={{ backgroundColor: colors.surface }}>
              {activeProduct.image_url ? <img src={activeProduct.image_url} alt="" className="w-full h-full object-cover" /> : <ShoppingBag size={48} color={colors.muted} />}
            </div>
            <p className="text-lg font-bold mb-1" style={{ color: colors.gold, fontFamily: "'Fraunces', serif" }}>
              {activeProduct.price ? `${activeProduct.price} ${activeProduct.currency}` : "—"}
            </p>
            <p className="text-sm mb-4" style={{ color: colors.charcoal }}>{activeProduct.description}</p>
            <div className="flex items-center gap-3 mb-4 py-3 border-t border-b" style={{ borderColor: colors.line }}>
              <img src={activeProduct.users?.avatar_url || `https://i.pravatar.cc/150?u=${activeProduct.seller_id}`} alt="" className="w-9 h-9 rounded-full object-cover" />
              <span className="text-sm font-semibold" style={{ color: colors.cream }}>{activeProduct.users?.name}</span>
            </div>
            <button onClick={() => onMessageSeller(activeProduct.users)} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("messageSeller")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function JobsScreen({ uid, token, t, onClose }) {
  const JOB_TYPES = [
    { key: "full_time", label: t("fullTime") }, { key: "part_time", label: t("partTime") },
    { key: "remote", label: t("remote") }, { key: "contract", label: t("contract") },
  ];
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | post | detail
  const [activeJob, setActiveJob] = useState(null);
  const [applyMsg, setApplyMsg] = useState("");
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ title: "", company: "", description: "", location: "", job_type: "full_time", salary: "" });

  const load = async () => {
    setLoading(true);
    try {
      const rows = await apiGet("jobs?status=eq.open&select=*,users(name,handle,avatar_url)&order=created_at.desc&limit=50", token);
      setJobs(rows);
    } catch (e) { setJobs([]); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submitJob = async () => {
    if (!form.title.trim()) return;
    try {
      await apiPost("jobs", { poster_id: uid, ...form }, token);
      setForm({ title: "", company: "", description: "", location: "", job_type: "full_time", salary: "" });
      setView("browse");
      load();
    } catch (e) {}
  };

  const openJob = (job) => { setActiveJob(job); setView("detail"); setApplied(false); setApplyMsg(""); };

  const submitApplication = async () => {
    try {
      await apiPost("job_applications", { job_id: activeJob.id, applicant_id: uid, message: applyMsg }, token);
      setApplied(true);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => (view === "browse" ? onClose() : setView("browse"))}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {view === "detail" ? activeJob?.title : t("jobs")}
          </h2>
          {view === "browse" && (
            <button onClick={() => setView("post")} className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              <Plus size={13} /> {t("postJob")}
            </button>
          )}
        </div>

        {view === "browse" && (
          <div className="flex-1 overflow-y-auto px-4">
            {loading && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
            {!loading && jobs.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noJobs")}</p>}
            {jobs.map((j) => (
              <button key={j.id} onClick={() => openJob(j)} className="w-full text-left rounded-xl p-4 mb-3" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={14} color={colors.gold} />
                  <p className="text-sm font-bold" style={{ color: colors.cream }}>{j.title}</p>
                </div>
                <p className="text-xs mb-1" style={{ color: colors.muted }}>{j.company}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color: colors.muted }}>
                  {j.location && <span className="flex items-center gap-1"><MapPin size={11} />{j.location}</span>}
                  <span>{JOB_TYPES.find((jt) => jt.key === j.job_type)?.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "post" && (
          <div className="flex-1 overflow-y-auto px-4 space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t("jobTitle")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t("company")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t("jobDescription")} rows={3}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder={t("location")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder={t("salary")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <select value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }}>
              {JOB_TYPES.map((jt) => <option key={jt.key} value={jt.key} style={{ color: "#1a1a1a" }}>{jt.label}</option>)}
            </select>
            <button onClick={submitJob} disabled={!form.title.trim()} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("postJob")}
            </button>
          </div>
        )}

        {view === "detail" && activeJob && (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={activeJob.users?.avatar_url || `https://i.pravatar.cc/150?u=${activeJob.poster_id}`} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold" style={{ color: colors.cream }}>{activeJob.company}</p>
                <p className="text-xs" style={{ color: colors.muted }}>{activeJob.users?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs mb-3" style={{ color: colors.gold }}>
              {activeJob.location && <span className="flex items-center gap-1"><MapPin size={12} />{activeJob.location}</span>}
              <span>{JOB_TYPES.find((jt) => jt.key === activeJob.job_type)?.label}</span>
              {activeJob.salary && <span>{activeJob.salary}</span>}
            </div>
            <p className="text-sm mb-5" style={{ color: colors.charcoal }}>{activeJob.description}</p>

            {applied ? (
              <p className="text-sm text-center font-semibold" style={{ color: colors.gold }}>{t("applied")}</p>
            ) : (
              <>
                <textarea value={applyMsg} onChange={(e) => setApplyMsg(e.target.value)} placeholder={t("applicationMessage")} rows={3}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none mb-3" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
                <button onClick={submitApplication} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
                  {t("submitApplication")}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LearningHubScreen({ uid, token, t, onClose }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | create | detail
  const [activeCourse, setActiveCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [lessonForm, setLessonForm] = useState({ title: "", content: "" });
  const [showAddLesson, setShowAddLesson] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await apiGet("courses?select=*,users(name,handle,avatar_url)&order=created_at.desc&limit=50", token);
      setCourses(rows);
    } catch (e) { setCourses([]); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submitCourse = async () => {
    if (!form.title.trim()) return;
    try {
      await apiPost("courses", { creator_id: uid, title: form.title, description: form.description }, token);
      setForm({ title: "", description: "" });
      setView("browse");
      load();
    } catch (e) {}
  };

  const openCourse = async (course) => {
    setActiveCourse(course);
    setView("detail");
    try {
      const rows = await apiGet(`lessons?course_id=eq.${course.id}&select=*&order=order_index.asc`, token);
      setLessons(rows);
      const enr = await apiGet(`enrollments?course_id=eq.${course.id}&user_id=eq.${uid}&select=*`, token);
      setEnrolled(enr.length > 0);
    } catch (e) { setLessons([]); }
  };

  const enrollCourse = async () => {
    try {
      await apiPost("enrollments", { course_id: activeCourse.id, user_id: uid }, token);
      setEnrolled(true);
    } catch (e) {}
  };

  const addLesson = async () => {
    if (!lessonForm.title.trim()) return;
    try {
      const created = await apiPost("lessons", { course_id: activeCourse.id, title: lessonForm.title, content: lessonForm.content, order_index: lessons.length }, token);
      setLessons((prev) => [...prev, created[0]]);
      setLessonForm({ title: "", content: "" });
      setShowAddLesson(false);
    } catch (e) {}
  };

  const isCreator = activeCourse?.creator_id === uid;

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => (view === "browse" ? onClose() : setView("browse"))}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {view === "detail" ? activeCourse?.title : t("learningHub")}
          </h2>
          {view === "browse" && (
            <button onClick={() => setView("create")} className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              <Plus size={13} /> {t("createCourse")}
            </button>
          )}
        </div>

        {view === "browse" && (
          <div className="flex-1 overflow-y-auto px-4">
            {loading && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
            {!loading && courses.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noCourses")}</p>}
            {courses.map((c) => (
              <button key={c.id} onClick={() => openCourse(c)} className="w-full text-left rounded-xl p-4 mb-3" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={16} color={colors.gold} />
                  <p className="text-sm font-bold" style={{ color: colors.cream }}>{c.title}</p>
                </div>
                <p className="text-xs" style={{ color: colors.muted }}>{c.description}</p>
              </button>
            ))}
          </div>
        )}

        {view === "create" && (
          <div className="flex-1 overflow-y-auto px-4 space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t("courseTitle")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t("courseDesc")} rows={4}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <button onClick={submitCourse} disabled={!form.title.trim()} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("createCourse")}
            </button>
          </div>
        )}

        {view === "detail" && activeCourse && (
          <div className="flex-1 overflow-y-auto px-4">
            <p className="text-sm mb-4" style={{ color: colors.charcoal }}>{activeCourse.description}</p>
            {!isCreator && (
              <button onClick={enrollCourse} disabled={enrolled} className="w-full py-3 rounded-xl font-semibold text-sm mb-4"
                style={{ backgroundImage: enrolled ? "none" : NEON_GRADIENT, backgroundColor: enrolled ? colors.surface : "transparent", color: enrolled ? colors.gold : colors.ink }}>
                {enrolled ? t("enrolled") : t("enroll")}
              </button>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: colors.cream }}>{t("lessons")}</span>
              {isCreator && (
                <button onClick={() => setShowAddLesson(!showAddLesson)} className="text-xs font-semibold" style={{ color: colors.gold }}>
                  + {t("addLesson")}
                </button>
              )}
            </div>
            {showAddLesson && (
              <div className="rounded-xl p-3 mb-3 space-y-2" style={{ backgroundColor: colors.surface }}>
                <input value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} placeholder={t("lessonTitle")}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ backgroundColor: colors.ink, color: colors.cream }} />
                <textarea value={lessonForm.content} onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })} placeholder={t("lessonContent")} rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ backgroundColor: colors.ink, color: colors.cream }} />
                <button onClick={addLesson} className="w-full py-2 rounded-lg text-xs font-bold" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>{t("addLesson")}</button>
              </div>
            )}
            {lessons.length === 0 && <p className="text-sm text-center mt-4" style={{ color: colors.muted }}>{t("noLessons")}</p>}
            {lessons.map((l, i) => (
              <div key={l.id} className="rounded-xl p-3 mb-2 flex items-start gap-3" style={{ backgroundColor: colors.surface }}>
                <BookOpen size={16} color={colors.gold} className="mt-0.5" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: colors.cream }}>{i + 1}. {l.title}</p>
                  <p className="text-xs mt-1" style={{ color: colors.charcoal }}>{l.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GamingHubScreen({ uid, token, profile, t, onClose }) {
  const [view, setView] = useState("menu"); // menu | playing | result
  const [leaderboard, setLeaderboard] = useState([]);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = React.useRef(null);

  const loadLeaderboard = async () => {
    try {
      const rows = await apiGet("game_scores?game_key=eq.quick_math&select=score,users(name,avatar_url)&order=score.desc&limit=10", token);
      setLeaderboard(rows);
    } catch (e) { setLeaderboard([]); }
  };
  useEffect(() => { loadLeaderboard(); }, []);

  const newProblem = () => {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let result;
    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else result = a * b;
    setProblem({ a, b, op, result });
    setAnswer("");
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    newProblem();
    setView("playing");
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const finishGame = async () => {
    setView("result");
    try {
      await apiPost("game_scores", { user_id: uid, game_key: "quick_math", score }, token);
      loadLeaderboard();
    } catch (e) {}
  };

  const submitAnswer = () => {
    if (Number(answer) === problem.result) setScore((s) => s + 1);
    newProblem();
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => { clearInterval(timerRef.current); onClose(); }}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("gamingHub")}</h2>
        </div>

        {view === "menu" && (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="rounded-2xl p-5 mb-5 text-center" style={{ backgroundColor: colors.surface }}>
              <Gamepad2 size={36} color={colors.gold} className="mx-auto mb-2" />
              <p className="text-base font-bold mb-3" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("quickMath")}</p>
              <button onClick={startGame} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
                {t("startGame")}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} color={colors.gold} />
              <span className="text-sm font-semibold" style={{ color: colors.cream }}>{t("leaderboard")}</span>
            </div>
            {leaderboard.length === 0 && <p className="text-sm text-center" style={{ color: colors.muted }}>{t("noScores")}</p>}
            {leaderboard.map((row, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <span className="text-sm font-bold w-5" style={{ color: colors.gold }}>{i + 1}</span>
                <img src={row.users?.avatar_url || "https://i.pravatar.cc/150"} alt="" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm flex-1" style={{ color: colors.cream }}>{row.users?.name}</span>
                <span className="text-sm font-bold" style={{ color: colors.gold }}>{row.score}</span>
              </div>
            ))}
          </div>
        )}

        {view === "playing" && problem && (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full flex items-center justify-between mb-8">
              <span className="text-sm" style={{ color: colors.muted }}>{t("timeLeft")}: {timeLeft}s</span>
              <span className="text-sm font-bold" style={{ color: colors.gold }}>{t("yourScore")}: {score}</span>
            </div>
            <p className="text-4xl font-bold mb-8" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
              {problem.a} {problem.op} {problem.b} = ?
            </p>
            <input value={answer} onChange={(e) => setAnswer(e.target.value.replace(/[^-0-9]/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && submitAnswer()} autoFocus
              className="w-32 text-center text-2xl font-bold px-4 py-3 rounded-xl outline-none mb-4" style={{ backgroundColor: colors.surface, color: colors.gold }} />
            <button onClick={submitAnswer} className="px-8 py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>OK</button>
          </div>
        )}

        {view === "result" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <Trophy size={48} color={colors.gold} className="mb-4" />
            <p className="text-lg mb-1" style={{ color: colors.muted }}>{t("yourScore")}</p>
            <p className="text-5xl font-bold mb-8" style={{ backgroundImage: NEON_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "'Fraunces', serif" }}>
              {score}
            </p>
            <button onClick={startGame} className="w-full py-3 rounded-xl font-semibold text-sm mb-3" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("playAgain")}
            </button>
            <button onClick={() => setView("menu")} className="text-sm" style={{ color: colors.muted }}>{t("gamingHub")}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessPagesScreen({ uid, token, t, onClose }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | create | detail
  const [activePage, setActivePage] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const load = async () => {
    setLoading(true);
    try {
      const rows = await apiGet("business_pages?select=*&order=created_at.desc&limit=50", token);
      setPages(rows);
    } catch (e) { setPages([]); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const submitPage = async () => {
    if (!form.name.trim()) return;
    try {
      await apiPost("business_pages", { owner_id: uid, name: form.name, description: form.description }, token);
      setForm({ name: "", description: "" });
      setView("browse");
      load();
    } catch (e) {}
  };

  const openPage = async (page) => {
    setActivePage(page);
    setView("detail");
    try {
      const followers = await apiGet(`business_followers?business_id=eq.${page.id}&select=user_id`, token);
      setFollowerCount(followers.length);
      setIsFollowing(followers.some((f) => f.user_id === uid));
    } catch (e) {}
  };

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await apiDelete(`business_followers?business_id=eq.${activePage.id}&user_id=eq.${uid}`, token);
        setFollowerCount((c) => c - 1);
      } else {
        await apiPost("business_followers", { business_id: activePage.id, user_id: uid }, token);
        setFollowerCount((c) => c + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => (view === "browse" ? onClose() : setView("browse"))}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold flex-1" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>
            {view === "detail" ? activePage?.name : t("businessPages")}
          </h2>
          {view === "browse" && (
            <button onClick={() => setView("create")} className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              <Plus size={13} /> {t("createPage")}
            </button>
          )}
        </div>

        {view === "browse" && (
          <div className="flex-1 overflow-y-auto px-4">
            {loading && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
            {!loading && pages.length === 0 && <p className="text-sm text-center mt-6" style={{ color: colors.muted }}>{t("noPages")}</p>}
            {pages.map((p) => (
              <button key={p.id} onClick={() => openPage(p)} className="w-full text-left rounded-xl p-4 mb-3 flex items-center gap-3" style={{ backgroundColor: colors.surface }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.line }}>
                  {p.logo_url ? <img src={p.logo_url} alt="" className="w-full h-full object-cover rounded-xl" /> : <Building2 size={20} color={colors.gold} />}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: colors.cream }}>{p.name}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{p.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "create" && (
          <div className="flex-1 overflow-y-auto px-4 space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("pageName")}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t("pageDesc")} rows={4}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: colors.surface, color: colors.charcoal }} />
            <button onClick={submitPage} disabled={!form.name.trim()} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ backgroundImage: NEON_GRADIENT, color: colors.ink }}>
              {t("createPage")}
            </button>
          </div>
        )}

        {view === "detail" && activePage && (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: colors.surface }}>
              {activePage.logo_url ? <img src={activePage.logo_url} alt="" className="w-full h-full object-cover rounded-2xl" /> : <Building2 size={32} color={colors.gold} />}
            </div>
            <p className="text-sm mb-1" style={{ color: colors.gold }}>{followerCount} {t("followers")}</p>
            <p className="text-sm mb-5" style={{ color: colors.charcoal }}>{activePage.description}</p>
            <button onClick={toggleFollow} className="w-full py-3 rounded-xl font-semibold text-sm"
              style={{
                backgroundImage: isFollowing ? "none" : NEON_GRADIENT,
                backgroundColor: isFollowing ? colors.surface : "transparent",
                color: isFollowing ? colors.gold : colors.ink,
              }}>
              {isFollowing ? t("following") : t("follow")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MoreMenuScreen({ t, onClose, onOpen }) {
  const ITEMS = [
    { key: "business", label: t("businessPages"), Icon: Building2 },
    { key: "gaming", label: t("gamingHub"), Icon: Gamepad2 },
    { key: "learning", label: t("learningHub"), Icon: GraduationCap },
    { key: "jobs", label: t("jobs"), Icon: Briefcase },
    { key: "marketplace", label: t("marketplace"), Icon: ShoppingBag },
    { key: "live", label: t("live"), Icon: Radio },
    { key: "ai", label: t("aiCreator"), Icon: Sparkles },
    { key: "reels", label: t("reels"), Icon: Play },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5" style={{ backgroundColor: colors.surface }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("more")}</h2>
          <button onClick={onClose}><X size={20} color={colors.cream} /></button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {ITEMS.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => { onOpen(key); onClose(); }} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.ink }}>
                <Icon size={22} color={colors.gold} />
              </div>
              <span className="text-[11px] text-center leading-tight" style={{ color: colors.charcoal }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ lang, setLang, theme, onThemeChange, t, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ backgroundColor: colors.ink }}>
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={onClose}><ArrowLeft size={20} color={colors.cream} /></button>
          <h2 className="text-lg font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("settings")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <p className="text-xs font-semibold mb-2 mt-2" style={{ color: colors.muted }}>{t("language")}</p>
          <select value={lang} onChange={(e) => setLang(e.target.value)}
            className="w-full px-3 py-3 rounded-xl text-sm outline-none mb-6" style={{ backgroundColor: colors.surface, color: colors.charcoal }}>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} style={{ color: "#1a1a1a" }}>{l.flag} {l.name}</option>
            ))}
          </select>

          <p className="text-xs font-semibold mb-2" style={{ color: colors.muted }}>{t("chooseTheme")}</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(THEMES).map(([key, val]) => (
              <button key={key} onClick={() => onThemeChange(key)} className="rounded-xl p-3 flex items-center gap-3 border-2"
                style={{ backgroundColor: val.surface, borderColor: theme === key ? val.sunset : "transparent" }}>
                <div className="flex -space-x-1">
                  <span className="w-5 h-5 rounded-full" style={{ backgroundColor: val.sunset }} />
                  <span className="w-5 h-5 rounded-full" style={{ backgroundColor: val.gold }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: val.cream }}>{val.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ profile, myPosts, onSignOut, t, onOpenCircles, onOpenSettings }) {
  return (
    <div className="px-4 pb-24 pt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.cream, fontFamily: "'Fraunces', serif" }}>{t("profile")}</h2>
        <div className="flex items-center gap-3">
          <button onClick={onOpenSettings}><SettingsIcon size={19} color={colors.cream} /></button>
          <button onClick={onSignOut} className="flex items-center gap-1 text-sm" style={{ color: colors.sunset }}>
            <LogOut size={16} /> {t("signOut")}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <img src={profile?.avatar_url || "https://i.pravatar.cc/150"} alt="" className="w-20 h-20 rounded-full object-cover" style={{ boxShadow: `0 0 0 3px ${colors.gold}` }} />
        <div>
          <p className="font-semibold text-base" style={{ color: colors.cream }}>{profile?.name}</p>
          <p className="text-sm" style={{ color: colors.muted, fontFamily: "'IBM Plex Mono', monospace" }}>{profile?.handle}</p>
        </div>
      </div>
      <button onClick={onOpenCircles} className="w-full flex items-center gap-2 py-3 px-3 rounded-xl mb-3" style={{ backgroundColor: colors.surface }}>
        <Users size={16} color={colors.gold} />
        <span className="text-sm font-semibold" style={{ color: colors.cream }}>{t("circles")}</span>
      </button>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: colors.line }}>
        <Grid3x3 size={16} color={colors.cream} />
        <span className="text-sm font-semibold" style={{ color: colors.cream }}>{t("myPosts")} ({myPosts.length})</span>
      </div>
      <div className="space-y-3">
        {myPosts.map((p) => (
          <div key={p.id} className="p-3 rounded-xl border" style={{ borderColor: colors.line }}>
            <p className="text-sm" style={{ color: colors.charcoal }}>{p.content}</p>
          </div>
        ))}
        {myPosts.length === 0 && <p className="text-sm" style={{ color: colors.muted }}>{t("noPosts")}</p>}
      </div>
    </div>
  );
}

// ---------- Main App ----------
export default function ImMeApp() {
  const [lang, setLang] = useState(detectDefaultLang());
  const [theme, setTheme] = useState("daylight");
  const handleThemeChange = (key) => { applyThemeColors(key); setTheme(key); };
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
  const isRtl = LANGUAGES.find((l) => l.code === lang)?.rtl;
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("home");
  const [showCompose, setShowCompose] = useState(false);
  const [showDM, setShowDM] = useState(false);
  const [showReels, setShowReels] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showGaming, setShowGaming] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatWithUser, setChatWithUser] = useState(null);
  const [liveMode, setLiveMode] = useState(null); // null | 'list' | 'host' | { watching: liveObj }
  const [activeCall, setActiveCall] = useState(null); // { call, otherUser, isCaller, callType }
  const [incomingCall, setIncomingCall] = useState(null); // { call, otherUser }
  const [activeComments, setActiveComments] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const uid = session?.user?.id;
  const token = session?.access_token;

  // Baada ya kuingia: hakikisha profile ipo kwenye jedwali la users
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const existing = await apiGet(`users?id=eq.${uid}&select=*`, token);
        if (existing.length === 0) {
          const emailOrPhone = session.user.email || session.user.phone || "mtumiaji";
          const handle = "@" + emailOrPhone.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
          const name = emailOrPhone.split("@")[0];
          const created = await apiPost("users", {
            id: uid, handle, name, avatar_url: `https://i.pravatar.cc/150?u=${uid}`,
          }, token);
          setProfile(created[0]);
        } else {
          setProfile(existing[0]);
        }
      } catch (e) {
        setGlobalError("Imeshindwa kupakia wasifu: " + e.message);
      }
    })();
  }, [session]);

  const loadFeed = async () => {
    if (!token) return;
    setLoadingFeed(true);
    try {
      const data = await apiGet(
        "posts?select=*,users!posts_user_id_fkey(name,handle,avatar_url)&order=created_at.desc&limit=50", token
      );
      const likes = await apiGet(`likes?user_id=eq.${uid}&select=post_id`, token);
      const likedIds = new Set(likes.map((l) => l.post_id));
      const withCounts = await Promise.all(
        data.map(async (p) => {
          const [likeRows, commentRows] = await Promise.all([
            apiGet(`likes?post_id=eq.${p.id}&select=post_id`, token),
            apiGet(`comments?post_id=eq.${p.id}&select=id`, token),
          ]);
          return { ...p, likeCount: likeRows.length, commentCount: commentRows.length, liked: likedIds.has(p.id) };
        })
      );
      setPosts(withCounts);
    } catch (e) {
      setGlobalError("Imeshindwa kupakia feed: " + e.message);
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => { if (profile) loadFeed(); }, [profile]);

  // Kusikiliza simu zinazoingia
  useEffect(() => {
    if (!token || activeCall || incomingCall) return;
    const iv = setInterval(async () => {
      try {
        const rows = await apiGet(`calls?callee_id=eq.${uid}&status=eq.ringing&select=*&order=created_at.desc&limit=1`, token);
        if (rows.length > 0) {
          const callerRows = await apiGet(`users?id=eq.${rows[0].caller_id}&select=*`, token);
          setIncomingCall({ call: rows[0], otherUser: callerRows[0] || { name: "..." } });
        }
      } catch (e) {}
    }, 3000);
    return () => clearInterval(iv);
  }, [token, activeCall, incomingCall]);

  const handleStartCall = async (otherUser, callType, conversationId) => {
    try {
      const created = await apiPost("calls", { conversation_id: conversationId, caller_id: uid, callee_id: otherUser.id, type: callType }, token);
      setActiveCall({ call: created[0], otherUser, isCaller: true, callType });
    } catch (e) {
      setGlobalError("Imeshindwa kupiga simu: " + e.message);
    }
  };
  const handleAcceptCall = async () => {
    if (!incomingCall) return;
    try { await apiPatch(`calls?id=eq.${incomingCall.call.id}`, { status: "accepted" }, token); } catch (e) {}
    setActiveCall({ call: incomingCall.call, otherUser: incomingCall.otherUser, isCaller: false, callType: incomingCall.call.type });
    setIncomingCall(null);
  };
  const handleDeclineCall = async () => {
    if (!incomingCall) return;
    try { await apiPatch(`calls?id=eq.${incomingCall.call.id}`, { status: "rejected" }, token); } catch (e) {}
    setIncomingCall(null);
  };

  const handleAuthed = (data) => setSession(data);
  const handleSignOut = () => { setSession(null); setProfile(null); setPosts([]); };

  const handleSubmitPost = async (type, content, category) => {
    try {
      const created = await apiPost("posts", { user_id: uid, type, content, category: category || "general" }, token);
      setShowCompose(false);
      setPosts((prev) => [{ ...created[0], users: profile, likeCount: 0, commentCount: 0, liked: false }, ...prev]);
    } catch (e) {
      setGlobalError("Imeshindwa kuchapisha: " + e.message);
    }
  };

  const toggleLike = async (post) => {
    try {
      if (post.liked) {
        await apiDelete(`likes?post_id=eq.${post.id}&user_id=eq.${uid}`, token);
      } else {
        await apiPost("likes", { post_id: post.id, user_id: uid }, token);
      }
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, liked: !p.liked, likeCount: p.likeCount + (p.liked ? -1 : 1) } : p));
    } catch (e) {
      setGlobalError("Imeshindwa: " + e.message);
    }
  };

  const openComments = async (post) => {
    setActiveComments(post);
    try {
      const data = await apiGet(`comments?post_id=eq.${post.id}&select=*,users(name,avatar_url)&order=created_at.asc`, token);
      setComments(data);
    } catch (e) {
      setGlobalError("Imeshindwa kupakia maoni: " + e.message);
    }
  };

  const addComment = async (text) => {
    try {
      const created = await apiPost("comments", { post_id: activeComments.id, user_id: uid, text }, token);
      setComments((prev) => [...prev, { ...created[0], users: profile }]);
      setPosts((prev) => prev.map((p) => p.id === activeComments.id ? { ...p, commentCount: p.commentCount + 1 } : p));
    } catch (e) {
      setGlobalError("Imeshindwa kuweka maoni: " + e.message);
    }
  };

  if (!session) return <AuthScreen onAuthed={handleAuthed} lang={lang} setLang={setLang} />;

  const navItems = [
    { key: "home", label: t("home"), Icon: Home },
    { key: "search", label: t("explore"), Icon: Search },
    { key: "add", label: t("add"), Icon: PlusCircle },
    { key: "alerts", label: t("alerts"), Icon: Bell },
    { key: "profile", label: t("profile"), Icon: User },
  ];
  const myPosts = posts.filter((p) => p.user_id === uid);

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: colors.bg, fontFamily: "'Inter', sans-serif" }} dir={isRtl ? "rtl" : "ltr"}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');`}</style>
      <div className="w-full max-w-md min-h-screen relative flex flex-col" style={{ backgroundColor: colors.surface }}>
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4" style={{ backgroundColor: colors.ink }}>
          <h1 className="text-2xl font-bold" style={{ backgroundImage: NEON_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "'Fraunces', serif" }}>{t("appName")}</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowDM(true)}><MessageSquare size={20} color={colors.cream} /></button>
            <button onClick={() => setShowMore(true)}><LayoutGrid size={20} color={colors.cream} /></button>
          </div>
        </div>
        <div className="h-[2px] w-full sticky top-[60px] z-20" style={{ backgroundImage: NEON_GRADIENT, boxShadow: `0 0 8px 1px ${colors.sunset}99` }} />

        {globalError && (
          <div className="px-4 py-2 text-xs" style={{ backgroundColor: "#2A1420", color: "#FF8FA3" }}>
            {globalError}
            <button onClick={() => setGlobalError("")} className="ml-2 font-bold">×</button>
          </div>
        )}

        {tab === "home" && (
          <div className="px-4 pb-24 pt-4 flex-1">
            {loadingFeed && <p className="text-sm text-center py-8" style={{ color: colors.muted }}>{t("loadingFeed")}</p>}
            {!loadingFeed && posts.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: colors.muted }}>{t("noPostsFeed")}</p>
            )}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onToggleLike={toggleLike} onOpenComments={openComments} />
            ))}
          </div>
        )}

        {tab === "profile" && <ProfileScreen profile={profile} myPosts={myPosts} onSignOut={handleSignOut} t={t} onOpenCircles={() => setShowCircles(true)} onOpenSettings={() => setShowSettings(true)} />}

        {tab === "search" && (
          <ExploreScreen uid={uid} token={token} t={t} onToggleLike={toggleLike} onOpenComments={openComments} />
        )}

        {tab === "alerts" && (
          <div className="px-4 pb-24 pt-10 text-center">
            <p className="text-sm" style={{ color: colors.muted }}>{t("demoNotice")}</p>
          </div>
        )}

        <div className="fixed bottom-0 w-full max-w-md flex items-center justify-around py-3 border-t" style={{ backgroundColor: colors.surface, borderColor: colors.line }}>
          {navItems.map(({ key, label, Icon }) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => (key === "add" ? setShowCompose(true) : setTab(key))} className="flex flex-col items-center gap-0.5">
                <Icon size={key === "add" ? 26 : 20} color={active ? colors.sunset : colors.muted} fill={key === "add" ? colors.sunset : "none"} />
                <span className="text-[10px] font-medium" style={{ color: active ? colors.sunset : colors.muted }}>{label}</span>
              </button>
            );
          })}
        </div>

        {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onSubmit={handleSubmitPost} t={t} />}
        {showDM && (
          <DMScreen uid={uid} token={token} profile={profile} t={t}
            onClose={() => { setShowDM(false); setChatWithUser(null); }}
            onStartCall={handleStartCall} initialUser={chatWithUser} />
        )}
        {showReels && (
          <ReelsScreen uid={uid} token={token} t={t} onToggleLike={toggleLike} onOpenComments={openComments} onClose={() => setShowReels(false)} />
        )}
        {showAI && <AICreatorScreen t={t} lang={lang} onClose={() => setShowAI(false)} />}
        {showMarketplace && (
          <MarketplaceScreen uid={uid} token={token} t={t} onClose={() => setShowMarketplace(false)}
            onMessageSeller={(seller) => { setShowMarketplace(false); setChatWithUser(seller); setShowDM(true); }} />
        )}
        {showJobs && <JobsScreen uid={uid} token={token} t={t} onClose={() => setShowJobs(false)} />}
        {showLearning && <LearningHubScreen uid={uid} token={token} t={t} onClose={() => setShowLearning(false)} />}
        {showGaming && <GamingHubScreen uid={uid} token={token} profile={profile} t={t} onClose={() => setShowGaming(false)} />}
        {showBusiness && <BusinessPagesScreen uid={uid} token={token} t={t} onClose={() => setShowBusiness(false)} />}
        {showMore && (
          <MoreMenuScreen t={t} onClose={() => setShowMore(false)} onOpen={(key) => {
            if (key === "business") setShowBusiness(true);
            else if (key === "gaming") setShowGaming(true);
            else if (key === "learning") setShowLearning(true);
            else if (key === "jobs") setShowJobs(true);
            else if (key === "marketplace") setShowMarketplace(true);
            else if (key === "live") setLiveMode("list");
            else if (key === "ai") setShowAI(true);
            else if (key === "reels") setShowReels(true);
          }} />
        )}
        {showSettings && (
          <SettingsScreen lang={lang} setLang={setLang} theme={theme} onThemeChange={handleThemeChange} t={t} onClose={() => setShowSettings(false)} />
        )}
        {showCircles && <CirclesScreen uid={uid} token={token} t={t} onClose={() => setShowCircles(false)} />}
        {liveMode === "list" && (
          <LivesListScreen uid={uid} token={token} profile={profile} t={t} onClose={() => setLiveMode(null)}
            onHost={() => setLiveMode("host")} onWatch={(l) => setLiveMode({ watching: l })} />
        )}
        {liveMode === "host" && (
          <LiveHostScreen uid={uid} token={token} profile={profile} t={t} onEnd={() => setLiveMode("list")} />
        )}
        {liveMode && typeof liveMode === "object" && liveMode.watching && (
          <LiveViewerScreen uid={uid} token={token} profile={profile} t={t} live={liveMode.watching} onLeave={() => setLiveMode("list")} />
        )}
        {incomingCall && (
          <IncomingCallBanner call={incomingCall.call} otherUser={incomingCall.otherUser} t={t} onAccept={handleAcceptCall} onDecline={handleDeclineCall} />
        )}
        {activeCall && (
          <CallScreen call={activeCall.call} uid={uid} token={token} otherUser={activeCall.otherUser}
            isCaller={activeCall.isCaller} callType={activeCall.callType} t={t} onEnd={() => setActiveCall(null)} />
        )}
        {activeComments && (
          <CommentsModal post={activeComments} comments={comments} onClose={() => setActiveComments(null)} onAddComment={addComment} t={t} />
        )}
      </div>
    </div>
  );
}
