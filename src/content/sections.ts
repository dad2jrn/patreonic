export type LandingSection = {
    id: string;
    navLabel: string;
    backgroundTheme: string;
};

export const landingSections = [
    { id: 'hero', navLabel: 'Home', backgroundTheme: 'theme-ember' },
    { id: 'audiences', navLabel: 'Audiences', backgroundTheme: 'theme-plum' },
    { id: 'flow', navLabel: 'Flow', backgroundTheme: 'theme-indigo' },
    { id: 'features', navLabel: 'Features', backgroundTheme: 'theme-moss' },
    { id: 'tiers', navLabel: 'Tiers', backgroundTheme: 'theme-copper' },
    { id: 'community', navLabel: 'Community', backgroundTheme: 'theme-teal' },
    { id: 'faq', navLabel: 'FAQ', backgroundTheme: 'theme-ink' },
    { id: 'final-cta', navLabel: 'Start', backgroundTheme: 'theme-sunrise' },
] satisfies LandingSection[];