export const membershipFeatures = [
    "Up to 50 members per group",
    "Customised challenge templates",
    "Up to 5 single games at a time",
    "Earn ting coins (Enjoy our coupon reward system)",
    "18 free certificates per game",
    "Technical and Pedagogic support",
    "Free participation in the Challenge 18 global events",
    "Free courses lesson plans",
    "Join a think tank",
    'Free e-book: "The New Global Citizens"',
    "Mentorship",
    "Unlimited games alone & with other clubs"
];

export const planOptions = [
    {
        type: "18-days",
        label: "18 Days",
        features: membershipFeatures.slice(0, 6)
    },
    {
        type: "18-weeks",
        label: "18 Weeks",
        features: membershipFeatures.slice(0, 10)
    },
    {
        type: "18-months",
        label: "18 Months",
        features: membershipFeatures.slice(0, 11)
    },
    {
        type: "18-years",
        label: "18 Years",
        features: membershipFeatures
    }
];

export const labels = {
    individual: {
        username: "Username",
        phone: "Phone number",
        fullName: "Full name",
        email: "Email",
    },
    organization: {
        username: "Username",
        memberName: "Lead staff member's name",
        memberRole: "Lead staff member's role",
        organization: "Organization/school name",
        city: "City/town",
        country: "Country",
        email: "Lead contact email",
        phone: "Lead contact phone number",
    },
    admin: {},
};

export const rtlLanguages = [
    "Hebrew",
    "Arabic",
    "Persian",
    "Urdu"
];

export const dayTranslations = {
    "English": "Day",
    "Hebrew": "יום",
    "Russian": "День",
    "Arabic": "يوم"
};

export const taskTranslations = {
    "English": "Task",
    "Hebrew": "משימה",
    "Russian": "Задание",
    "Arabic": "مهمة"
};
