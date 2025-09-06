// Hindu Calendar Data with Community-specific observances
const HINDU_CALENDAR_DATA = {
    2025: {
        1: [], // January 2025 - empty
        2: [], // February 2025 - empty
        3: [], // March 2025 - empty
        4: [], // April 2025 - empty
        5: [], // May 2025 - empty
        6: [], // June 2025 - empty
        7: [], // July 2025 - empty
        8: [], // August 2025 - empty
        9: [], // September 2025 - empty
        10: [], // October 2025 - empty
        11: [], // November 2025 - empty
        12: [] // December 2025 - empty
    }
};

// Ekadashi dates for 2025 (occurs twice a month) - keeping structure but not adding to calendar
const EKADASHI_2025 = [
    { month: 1, dates: [10, 25], names: ['Saphala Ekadashi', 'Pausha Putrada Ekadashi'] },
    { month: 2, dates: [8, 23], names: ['Shattila Ekadashi', 'Jaya Ekadashi'] },
    { month: 3, dates: [10, 25], names: ['Vijaya Ekadashi', 'Amalaki Ekadashi'] },
    { month: 4, dates: [8, 24], names: ['Papmochani Ekadashi', 'Kamada Ekadashi'] },
    { month: 5, dates: [8, 23], names: ['Varuthini Ekadashi', 'Mohini Ekadashi'] },
    { month: 6, dates: [6, 22], names: ['Apara Ekadashi', 'Nirjala Ekadashi'] },
    { month: 7, dates: [6, 21], names: ['Yogini Ekadashi', 'Devshayani Ekadashi'] },
    { month: 8, dates: [5, 19], names: ['Kamika Ekadashi', 'Shravana Putrada Ekadashi'] },
    { month: 9, dates: [3, 18], names: ['Aja Ekadashi', 'Parsva Ekadashi'] },
    { month: 10, dates: [3, 17], names: ['Indira Ekadashi', 'Papankusha Ekadashi'] },
    { month: 11, dates: [1, 16], names: ['Rama Ekadashi', 'Devutthana Ekadashi'] },
    { month: 12, dates: [1, 15, 31], names: ['Utpanna Ekadashi', 'Mokshada Ekadashi', 'Saphala Ekadashi'] }
];

// Festival data structure for reference (not added to calendar by default)
const FESTIVAL_TEMPLATES = {
    'makar-sankranti': {
        name: 'Makar Sankranti',
        type: 'festival',
        description: 'Makar Sankranti marks the transition of the Sun into the zodiacal sign of Capricorn (Makara) on its celestial path. It is one of the few Hindu festivals that follows the solar calendar and is celebrated on the same date every year.',
        observances: [
            'Take holy bath in sacred rivers like Ganga, Yamuna, or local water bodies',
            'Donate sesame seeds, jaggery, warm clothes, and food to the needy',
            'Fly kites as a traditional celebration',
            'Prepare and share sweets made of sesame and jaggery',
            'Perform Surya Puja (Sun worship) at sunrise'
        ],
        fastingRules: [],
        communitySpecific: {
            brahmin: 'Perform elaborate Surya Puja with Vedic mantras. Donate to Brahmins and feed cows.',
            kshatriya: 'Organize community kite flying events. Donate weapons or protective gear to security forces.',
            vaishya: 'Focus on charitable giving and business prosperity prayers. Donate grains and money.',
            shudra: 'Participate in community celebrations. Offer service to temples and help in organizing events.',
            jain: 'Observe as Makar Sankranti with emphasis on charity and non-violence. Avoid any harm to birds during kite flying.',
            sikh: 'Celebrate as Maghi festival. Visit gurdwaras and participate in community service.',
            general: 'Universal celebration with focus on gratitude to Sun God and sharing joy with community.'
        },
        timing: {
            sunrise: true,
            duration: 'Full day'
        }
    },
    'maha-shivratri': {
        name: 'Maha Shivratri',
        type: 'festival',
        description: 'Maha Shivratri is the great night of Lord Shiva, observed with fasting, night-long vigil, and worship. It commemorates the cosmic dance of creation, preservation, and destruction.',
        observances: [
            'Observe night-long vigil (jagran) with prayers and bhajans',
            'Offer Bel leaves, milk, honey, and water to Shiva Linga',
            'Chant "Om Namah Shivaya" throughout the night',
            'Visit Shiva temples and participate in community prayers',
            'Perform Rudra Abhishek if possible'
        ],
        fastingRules: [
            'Complete fast for 24 hours (Nirjala vrat preferred)',
            'If unable to do Nirjala, consume only fruits and milk',
            'Avoid grains, vegetables, salt, and spices',
            'Break fast the next morning after sunrise prayers'
        ],
        communitySpecific: {
            brahmin: 'Perform elaborate Rudra Abhishek with Vedic mantras. Lead community prayers.',
            kshatriya: 'Focus on strength and protection aspects of Shiva. Organize security for temple events.',
            vaishya: 'Pray for business prosperity and ethical conduct. Donate generously to temples.',
            shudra: 'Participate in community service and temple cleaning. Offer sincere devotion.',
            jain: 'Observe as a day of meditation and non-violence, focusing on spiritual purification.',
            general: 'Universal observance with focus on spiritual awakening and devotion to Shiva.'
        },
        timing: {
            start: 'Sunset on previous day',
            end: 'Sunrise on next day'
        }
    }
    // Additional festival templates can be added here for future use
};

// Function to add festivals manually (for future use)
function addFestivalToCalendar(year, month, date, festivalTemplate, customizations = {}) {
    if (!HINDU_CALENDAR_DATA[year]) HINDU_CALENDAR_DATA[year] = {};
    if (!HINDU_CALENDAR_DATA[year][month]) HINDU_CALENDAR_DATA[year][month] = [];
    
    const festival = {
        id: `${festivalTemplate.name.toLowerCase().replace(/\s+/g, '-')}-${year}`,
        date: date,
        ...festivalTemplate,
        ...customizations
    };
    
    HINDU_CALENDAR_DATA[year][month].push(festival);
}

// Function to add Ekadashi dates (for future use)
function addEkadashiToCalendar(year) {
    EKADASHI_2025.forEach(monthData => {
        const month = monthData.month;
        
        if (!HINDU_CALENDAR_DATA[year]) HINDU_CALENDAR_DATA[year] = {};
        if (!HINDU_CALENDAR_DATA[year][month]) HINDU_CALENDAR_DATA[year][month] = [];
        
        monthData.dates.forEach((date, index) => {
            const ekadashiName = monthData.names[index];
            const ekadashi = {
                id: `${ekadashiName.toLowerCase().replace(/\s+/g, '-')}-${year}`,
                name: ekadashiName,
                date: date,
                type: 'ekadashi',
                description: `${ekadashiName} is one of the 24 Ekadashis observed during the year. Ekadashi fasting is considered highly beneficial for spiritual purification and devotion to Lord Vishnu.`,
                observances: [
                    'Fast from sunrise to sunrise next day',
                    'Chant Vishnu mantras and names',
                    'Visit Vishnu temples and offer prayers',
                    'Stay awake at night in devotion (if possible)',
                    'Read Vishnu Sahasranama or other sacred texts'
                ],
                fastingRules: [
                    'Complete fast from grains, beans, and cereals',
                    'Consume only fruits, milk, and water if needed',
                    'Avoid onion, garlic, and non-vegetarian food',
                    'Break fast on Dwadashi after sunrise and prayers'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Vishnu Puja with proper rituals. Guide others in Ekadashi observance.',
                    general: 'Observe according to capacity with focus on devotion and spiritual purification.'
                },
                timing: {
                    start: `Sunrise on ${date}th`,
                    end: `Sunrise on ${date + 1}th`
                }
            };
            
            HINDU_CALENDAR_DATA[year][month].push(ekadashi);
        });
    });
}