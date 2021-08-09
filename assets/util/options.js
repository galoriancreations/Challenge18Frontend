import languages from "../data/languages";

export const languageOptions = languages;

export const membershipFeatures = [
    "18 free certificates per game",
    "Free courses lesson plans",
    "Join a think tank",
    'Free e-book: "The New Global Citizens"',
    "Free participation in the Challenge 18 global events",
    "Mentorship",
    "Customised challenge templates",
    "Unlimited games alone & with other clubs"
];

export const planOptions = [
    {
        type: "1-month",
        price: 249,
        label: "1 Month",
        features: membershipFeatures.slice(0, 5)
    },
    {
        type: "2-months",
        price: 438,
        label: "2 Months",
        features: membershipFeatures.slice(0, 5)
    },
    {
        type: "4-months",
        price: 588,
        label: "4 Months",
        features: membershipFeatures.slice(0, 7)
    },
    {
        type: "1-year",
        price: 684,
        label: "1 Year",
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
