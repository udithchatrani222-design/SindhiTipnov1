// Hindu Calendar Data with Community-specific observances
const HINDU_CALENDAR_DATA = {
    2025: {
        1: [ // January 2025
            {
                id: 'makar-sankranti-2025',
                name: 'Makar Sankranti',
                date: 14,
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
            {
                id: 'paush-purnima-2025',
                name: 'Paush Purnima',
                date: 13,
                type: 'vrat',
                description: 'Paush Purnima is the full moon day in the month of Paush. It is considered highly auspicious for spiritual practices and charity.',
                observances: [
                    'Take holy bath before sunrise',
                    'Perform Satyanarayan Puja',
                    'Donate food, clothes, and money to the poor',
                    'Visit temples and offer prayers',
                    'Chant Vishnu Sahasranama'
                ],
                fastingRules: [
                    'Fast from sunrise to moonrise',
                    'Consume only fruits and milk if needed',
                    'Avoid grains, salt, and spices',
                    'Break fast after sighting the moon'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Satyanarayan Puja with proper rituals. Study sacred texts.',
                    general: 'Observe simple fast and visit temples for prayers.'
                }
            },
            {
                id: 'vasant-panchami-2025',
                name: 'Vasant Panchami',
                date: 2,
                type: 'festival',
                description: 'Vasant Panchami marks the arrival of spring and is dedicated to Goddess Saraswati, the deity of knowledge, music, arts, and wisdom.',
                observances: [
                    'Worship Goddess Saraswati with yellow flowers',
                    'Wear yellow clothes and prepare yellow-colored food',
                    'Place books and musical instruments near the deity for blessing',
                    'Children start their education (Vidyarambh ceremony)',
                    'Fly kites and enjoy spring festivities'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform elaborate Saraswati Puja with Vedic hymns. Organize educational ceremonies.',
                    kshatriya: 'Focus on learning martial arts and strategic knowledge. Honor teachers and gurus.',
                    vaishya: 'Pray for business wisdom and prosperity. Start new ventures.',
                    general: 'Universal celebration of knowledge and arts with community participation.'
                }
            }
        ],
        2: [ // February 2025
            {
                id: 'maha-shivratri-2025',
                name: 'Maha Shivratri',
                date: 26,
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
                    start: 'Sunset on 25th February',
                    end: 'Sunrise on 27th February'
                }
            },
            {
                id: 'magha-purnima-2025',
                name: 'Magha Purnima',
                date: 12,
                type: 'vrat',
                description: 'Magha Purnima is the full moon day in the month of Magha, considered highly auspicious for spiritual practices and pilgrimage.',
                observances: [
                    'Take holy bath in sacred rivers, especially at Prayagraj',
                    'Perform charity and feed the poor',
                    'Worship Lord Vishnu and chant his names',
                    'Light lamps and offer prayers',
                    'Participate in religious discourses'
                ],
                fastingRules: [
                    'Fast from sunrise to moonrise',
                    'Consume only sattvic food if needed',
                    'Avoid non-vegetarian food and alcohol',
                    'Break fast after moon sighting and prayers'
                ],
                communitySpecific: {
                    brahmin: 'Perform Satyanarayan Puja and study scriptures. Guide others in spiritual practices.',
                    general: 'Observe simple fast and participate in community prayers and charity.'
                }
            }
        ],
        3: [ // March 2025
            {
                id: 'holi-2025',
                name: 'Holi',
                date: 14,
                type: 'festival',
                description: 'Holi, the festival of colors, celebrates the victory of good over evil, the arrival of spring, and the divine love of Radha and Krishna.',
                observances: [
                    'Light Holika bonfire on the eve (Holika Dahan)',
                    'Play with natural colors and water',
                    'Prepare and share traditional sweets like Gujiya',
                    'Sing Holi songs and dance',
                    'Forgive and forget past grievances'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform Holika Dahan with proper rituals. Focus on spiritual significance of the festival.',
                    kshatriya: 'Organize community celebrations and ensure safety during festivities.',
                    vaishya: 'Distribute sweets and gifts. Strengthen business relationships.',
                    general: 'Universal celebration of joy, unity, and the triumph of good over evil.'
                },
                timing: {
                    holikaDahan: 'Evening of 13th March',
                    rangwali: '14th March morning'
                }
            },
            {
                id: 'chaitra-navratri-2025',
                name: 'Chaitra Navratri Begins',
                date: 30,
                type: 'festival',
                description: 'Chaitra Navratri is the nine-day festival dedicated to the nine forms of Goddess Durga, marking the beginning of the Hindu New Year.',
                observances: [
                    'Worship different forms of Goddess Durga each day',
                    'Maintain cleanliness and purity',
                    'Recite Durga Saptashati',
                    'Perform Kanya Puja on Ashtami and Navami',
                    'Set up Kalash and maintain it for nine days'
                ],
                fastingRules: [
                    'Observe partial or complete fast for nine days',
                    'Consume only sattvic food',
                    'Avoid onion, garlic, meat, and alcohol',
                    'Eat only once a day if observing strict fast'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Durga Puja with Vedic mantras. Conduct Kanya Puja ceremony.',
                    kshatriya: 'Honor the warrior aspect of Goddess Durga. Seek blessings for strength and courage.',
                    vaishya: 'Pray for prosperity and business success. Organize community celebrations.',
                    general: 'Universal worship of Divine Mother with focus on spiritual purification.'
                }
            }
        ],
        4: [ // April 2025
            {
                id: 'ram-navami-2025',
                name: 'Ram Navami',
                date: 6,
                type: 'festival',
                description: 'Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu, symbolizing righteousness, virtue, and the ideal way of life.',
                observances: [
                    'Recite Ramayana and sing Ram bhajans',
                    'Organize processions with Ram, Sita, Lakshmana, and Hanuman',
                    'Perform Ram Puja with flowers and fruits',
                    'Distribute Prasad and organize community feasts',
                    'Visit Ram temples and participate in celebrations'
                ],
                fastingRules: [
                    'Observe fast until noon (Madhyahna)',
                    'Consume only fruits and milk if needed',
                    'Break fast after Ram Puja at noon',
                    'Avoid non-vegetarian food throughout the day'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Ram Puja with Vedic hymns. Recite complete Ramayana.',
                    kshatriya: 'Honor Lord Rama as the ideal king and warrior. Focus on dharmic leadership.',
                    vaishya: 'Pray for ethical business practices and prosperity. Organize community events.',
                    general: 'Universal celebration of Lord Rama\'s ideals of truth, righteousness, and devotion.'
                },
                timing: {
                    birth: 'Noon (Madhyahna)',
                    duration: 'Full day celebrations'
                }
            },
            {
                id: 'hanuman-jayanti-2025',
                name: 'Hanuman Jayanti',
                date: 15,
                type: 'festival',
                description: 'Hanuman Jayanti celebrates the birth of Lord Hanuman, the devoted follower of Lord Rama, symbolizing strength, courage, and devotion.',
                observances: [
                    'Visit Hanuman temples and offer prayers',
                    'Recite Hanuman Chalisa and Sundarkand',
                    'Offer red flowers, sindoor, and sweets',
                    'Organize community bhajan sessions',
                    'Distribute Prasad and help the needy'
                ],
                fastingRules: [
                    'Optional fasting until evening',
                    'Consume only sattvic food',
                    'Avoid non-vegetarian food and alcohol',
                    'Break fast after evening prayers'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Hanuman Puja with proper rituals. Lead community prayers.',
                    kshatriya: 'Honor Hanuman as the ideal devotee and warrior. Seek strength and courage.',
                    vaishya: 'Pray for protection in business and travels. Organize charitable activities.',
                    general: 'Universal worship of Hanuman for strength, devotion, and protection from evil.'
                }
            }
        ],
        5: [ // May 2025
            {
                id: 'akshaya-tritiya-2025',
                name: 'Akshaya Tritiya',
                date: 2,
                type: 'festival',
                description: 'Akshaya Tritiya is considered one of the most auspicious days in the Hindu calendar, believed to bring eternal prosperity and good fortune.',
                observances: [
                    'Purchase gold, silver, or other precious items',
                    'Perform charity and help the needy',
                    'Start new ventures or important work',
                    'Worship Lord Vishnu and Goddess Lakshmi',
                    'Donate food, clothes, and money'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform Lakshmi-Vishnu Puja and study sacred texts. Guide others in spiritual practices.',
                    kshatriya: 'Start new projects and seek blessings for success. Honor ancestors.',
                    vaishya: 'Ideal day for business investments and purchases. Pray for eternal prosperity.',
                    general: 'Universal day for new beginnings and charitable activities.'
                }
            },
            {
                id: 'buddha-purnima-2025',
                name: 'Buddha Purnima',
                date: 12,
                type: 'festival',
                description: 'Buddha Purnima commemorates the birth, enlightenment, and death of Gautama Buddha, emphasizing compassion, non-violence, and spiritual awakening.',
                observances: [
                    'Visit Buddhist temples and monasteries',
                    'Meditate and practice mindfulness',
                    'Offer flowers, incense, and light lamps',
                    'Practice charity and help the suffering',
                    'Study Buddhist teachings and philosophy'
                ],
                fastingRules: [
                    'Optional fasting with focus on spiritual purification',
                    'Consume only vegetarian food',
                    'Avoid alcohol and intoxicants',
                    'Practice moderation in eating'
                ],
                communitySpecific: {
                    buddhist: 'Observe with meditation, chanting, and acts of compassion. Visit Bodh Gaya if possible.',
                    brahmin: 'Honor Buddha as an avatar of Vishnu. Focus on non-violence and compassion.',
                    general: 'Universal observance emphasizing peace, compassion, and spiritual wisdom.'
                }
            }
        ],
        6: [ // June 2025
            {
                id: 'nirjala-ekadashi-2025',
                name: 'Nirjala Ekadashi',
                date: 8,
                type: 'ekadashi',
                description: 'Nirjala Ekadashi is the most austere of all Ekadashi fasts, observed without water. It is believed to give the benefits of all 24 Ekadashis.',
                observances: [
                    'Complete fast without food and water for 24 hours',
                    'Stay awake all night chanting Vishnu names',
                    'Visit Vishnu temples and offer prayers',
                    'Donate water, fans, and cooling items',
                    'Help provide water to travelers and animals'
                ],
                fastingRules: [
                    'Complete Nirjala (waterless) fast for 24 hours',
                    'No food or water from sunrise to sunrise next day',
                    'Break fast only after sunrise prayers next day',
                    'Elderly and sick can observe with water only'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Vishnu Puja and lead community prayers. Study Vishnu Sahasranama.',
                    general: 'Observe according to capacity. Focus on devotion and charity related to water.'
                },
                timing: {
                    start: 'Sunrise on 8th June',
                    end: 'Sunrise on 9th June'
                }
            },
            {
                id: 'ganga-dussehra-2025',
                name: 'Ganga Dussehra',
                date: 6,
                type: 'festival',
                description: 'Ganga Dussehra celebrates the descent of River Ganga from heaven to earth, believed to wash away sins and grant salvation.',
                observances: [
                    'Take holy bath in River Ganga or any sacred water body',
                    'Offer prayers and flowers to River Ganga',
                    'Donate water pots and help provide clean water',
                    'Perform Ganga Aarti in the evening',
                    'Chant Ganga Stotram and hymns'
                ],
                fastingRules: [
                    'Optional fasting until evening',
                    'Consume only sattvic food',
                    'Avoid non-vegetarian food',
                    'Break fast after Ganga Aarti'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Ganga Puja and lead community prayers at river banks.',
                    general: 'Universal reverence for River Ganga with focus on environmental protection.'
                }
            }
        ],
        7: [ // July 2025
            {
                id: 'guru-purnima-2025',
                name: 'Guru Purnima',
                date: 10,
                type: 'festival',
                description: 'Guru Purnima is dedicated to honoring spiritual and academic teachers, commemorating the first teaching given by Lord Shiva and honoring Sage Vyasa.',
                observances: [
                    'Honor and seek blessings from teachers and gurus',
                    'Offer flowers, fruits, and dakshina to gurus',
                    'Study sacred texts and spiritual literature',
                    'Organize satsangs and spiritual discourses',
                    'Practice meditation and self-reflection'
                ],
                fastingRules: [
                    'Optional fasting until evening',
                    'Consume only sattvic food',
                    'Focus on spiritual practices rather than food',
                    'Break fast after guru worship'
                ],
                communitySpecific: {
                    brahmin: 'Lead spiritual discourses and guide disciples. Perform elaborate guru worship.',
                    kshatriya: 'Honor military and strategic teachers. Focus on learning and discipline.',
                    vaishya: 'Honor business mentors and teachers. Seek guidance for ethical practices.',
                    general: 'Universal reverence for all teachers and guides in life.'
                }
            },
            {
                id: 'hariyali-teej-2025',
                name: 'Hariyali Teej',
                date: 31,
                type: 'vrat',
                description: 'Hariyali Teej is observed by married women for the well-being of their husbands and marital happiness, celebrating the monsoon season.',
                observances: [
                    'Married women observe fast for husband\'s long life',
                    'Wear green clothes and apply henna',
                    'Swing on decorated swings under trees',
                    'Worship Lord Shiva and Goddess Parvati',
                    'Sing traditional Teej songs and dance'
                ],
                fastingRules: [
                    'Married women observe Nirjala fast',
                    'Unmarried girls can observe with water',
                    'Break fast after moon sighting and prayers',
                    'Consume only sattvic food after breaking fast'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Shiva-Parvati Puja with proper rituals.',
                    general: 'Universal celebration by women with focus on marital harmony and monsoon joy.'
                }
            }
        ],
        8: [ // August 2025
            {
                id: 'krishna-janmashtami-2025',
                name: 'Krishna Janmashtami',
                date: 16,
                type: 'festival',
                description: 'Krishna Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Vishnu, emphasizing divine love, joy, and the victory of good over evil.',
                observances: [
                    'Fast until midnight (Krishna\'s birth time)',
                    'Decorate temples and homes with flowers and lights',
                    'Organize Dahi Handi celebrations',
                    'Sing Krishna bhajans and perform dances',
                    'Prepare and offer Krishna\'s favorite foods'
                ],
                fastingRules: [
                    'Fast from sunrise until midnight',
                    'Consume only fruits and milk if needed',
                    'Break fast after midnight prayers and Krishna Aarti',
                    'Avoid grains and regular meals during the day'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Krishna Puja with Vedic hymns. Organize community celebrations.',
                    kshatriya: 'Honor Krishna as the divine protector and guide. Focus on dharmic leadership.',
                    vaishya: 'Celebrate with community feasts and charitable giving. Pray for prosperity.',
                    general: 'Universal celebration of Krishna\'s divine love and teachings.'
                },
                timing: {
                    birth: 'Midnight',
                    celebrations: 'Full day and night'
                }
            },
            {
                id: 'raksha-bandhan-2025',
                name: 'Raksha Bandhan',
                date: 9,
                type: 'festival',
                description: 'Raksha Bandhan celebrates the bond between brothers and sisters, where sisters tie protective threads (rakhi) on brothers\' wrists.',
                observances: [
                    'Sisters tie rakhi on brothers\' wrists',
                    'Brothers give gifts and promise protection',
                    'Perform aarti and apply tilaka',
                    'Share sweets and celebrate family bonds',
                    'Extend the celebration to all protective relationships'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform proper rituals with mantras. Emphasize spiritual protection.',
                    kshatriya: 'Focus on the protective duty and honor. Strengthen family bonds.',
                    vaishya: 'Celebrate with gift-giving and family gatherings. Support extended family.',
                    general: 'Universal celebration of sibling love and protective relationships.'
                }
            }
        ],
        9: [ // September 2025
            {
                id: 'ganesh-chaturthi-2025',
                name: 'Ganesh Chaturthi',
                date: 27,
                type: 'festival',
                description: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha, the remover of obstacles and patron of arts and sciences.',
                observances: [
                    'Install Ganesha idols in homes and communities',
                    'Offer modaks, ladoos, and favorite sweets',
                    'Chant Ganesha mantras and perform aarti',
                    'Organize cultural programs and processions',
                    'Immerse idols in water bodies after the festival'
                ],
                fastingRules: [
                    'Optional fasting on the first day',
                    'Consume only vegetarian food during the festival',
                    'Avoid non-vegetarian food and alcohol',
                    'Focus on sattvic eating'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Ganesha Puja with proper Vedic rituals.',
                    kshatriya: 'Organize community celebrations and ensure festival security.',
                    vaishya: 'Sponsor community celebrations and pray for business success.',
                    general: 'Universal celebration with focus on removing obstacles and new beginnings.'
                }
            },
            {
                id: 'pitru-paksha-begins-2025',
                name: 'Pitru Paksha Begins',
                date: 18,
                type: 'special',
                description: 'Pitru Paksha is a 16-day period dedicated to honoring ancestors and performing rituals for their peace and blessings.',
                observances: [
                    'Perform Shraddha rituals for ancestors',
                    'Offer food and water to ancestors',
                    'Feed Brahmins and the poor',
                    'Visit ancestral places and temples',
                    'Avoid auspicious activities during this period'
                ],
                fastingRules: [
                    'Observe simple vegetarian diet',
                    'Avoid non-vegetarian food and alcohol',
                    'Fast on the specific tithi of ancestor\'s death',
                    'Consume only sattvic food'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Shraddha rituals and guide others in ancestral worship.',
                    general: 'Honor ancestors according to family traditions and capacity.'
                }
            }
        ],
        10: [ // October 2025
            {
                id: 'navratri-2025',
                name: 'Sharad Navratri Begins',
                date: 2,
                type: 'festival',
                description: 'Sharad Navratri is the most celebrated nine-day festival dedicated to Goddess Durga and her nine forms, culminating in Dussehra.',
                observances: [
                    'Worship nine forms of Goddess Durga',
                    'Maintain ritual purity and cleanliness',
                    'Perform Garba and Dandiya dances',
                    'Recite Durga Saptashati daily',
                    'Organize community celebrations and cultural programs'
                ],
                fastingRules: [
                    'Observe partial or complete fast for nine days',
                    'Consume only sattvic food without onion and garlic',
                    'Eat only once a day if observing strict fast',
                    'Avoid non-vegetarian food and alcohol completely'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Durga Puja with proper rituals. Lead community prayers.',
                    kshatriya: 'Honor the warrior goddess and seek strength. Organize cultural events.',
                    vaishya: 'Pray for prosperity and organize community celebrations.',
                    general: 'Universal worship of Divine Mother with regional variations.'
                }
            },
            {
                id: 'dussehra-2025',
                name: 'Dussehra (Vijayadashami)',
                date: 10,
                type: 'festival',
                description: 'Dussehra celebrates the victory of good over evil, commemorating Lord Rama\'s victory over Ravana and Goddess Durga\'s triumph over Mahishasura.',
                observances: [
                    'Burn effigies of Ravana, Meghnad, and Kumbhakarna',
                    'Organize Ram Lila performances',
                    'Worship weapons and tools (Ayudha Puja)',
                    'Start new learning or ventures',
                    'Participate in community celebrations'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform Saraswati Puja and bless students. Lead community prayers.',
                    kshatriya: 'Worship weapons and honor martial traditions. Organize victory celebrations.',
                    vaishya: 'Worship business tools and start new ventures. Pray for success.',
                    general: 'Universal celebration of the victory of righteousness over evil.'
                }
            },
            {
                id: 'karva-chauth-2025',
                name: 'Karva Chauth',
                date: 20,
                type: 'vrat',
                description: 'Karva Chauth is observed by married women for the long life and prosperity of their husbands, involving a day-long fast.',
                observances: [
                    'Married women observe Nirjala fast from sunrise to moonrise',
                    'Dress in bridal attire with henna and jewelry',
                    'Listen to Karva Chauth story (katha)',
                    'Perform evening prayers with decorated karva (pot)',
                    'Break fast after seeing moon through a sieve'
                ],
                fastingRules: [
                    'Complete Nirjala fast from sunrise to moonrise',
                    'No food or water during the day',
                    'Break fast only after moon sighting and husband\'s blessing',
                    'First sip of water and bite of food from husband\'s hands'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate rituals with proper mantras and ceremonies.',
                    general: 'Universal observance by married women with regional variations in customs.'
                },
                timing: {
                    fast: 'Sunrise to moonrise',
                    moonSighting: 'Evening after moonrise'
                }
            }
        ],
        11: [ // November 2025
            {
                id: 'dhanteras-2025',
                name: 'Dhanteras',
                date: 1,
                type: 'festival',
                description: 'Dhanteras marks the beginning of Diwali celebrations, dedicated to Goddess Lakshmi and Lord Dhanvantari, focusing on wealth and health.',
                observances: [
                    'Purchase gold, silver, or new utensils',
                    'Clean and decorate homes with rangoli',
                    'Light diyas and lamps in the evening',
                    'Worship Goddess Lakshmi and Lord Dhanvantari',
                    'Offer prayers for wealth and good health'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform Lakshmi Puja with proper rituals. Guide community in celebrations.',
                    kshatriya: 'Purchase weapons or protective items. Pray for family security.',
                    vaishya: 'Ideal day for business investments and purchases. Worship wealth deities.',
                    general: 'Universal celebration focusing on prosperity and well-being.'
                }
            },
            {
                id: 'diwali-2025',
                name: 'Diwali (Lakshmi Puja)',
                date: 3,
                type: 'festival',
                description: 'Diwali, the festival of lights, celebrates the return of Lord Rama to Ayodhya and the worship of Goddess Lakshmi for prosperity.',
                observances: [
                    'Light diyas, candles, and decorative lights',
                    'Perform Lakshmi Puja in the evening',
                    'Create beautiful rangoli designs',
                    'Exchange gifts and sweets with family and friends',
                    'Burst eco-friendly fireworks (where permitted)'
                ],
                fastingRules: [
                    'Optional fasting until Lakshmi Puja',
                    'Consume only sattvic food',
                    'Break fast after evening prayers',
                    'Focus on pure vegetarian meals'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate Lakshmi Puja with Vedic mantras. Lead community celebrations.',
                    kshatriya: 'Celebrate victory of light over darkness. Ensure community safety during celebrations.',
                    vaishya: 'Main festival for business community. Worship Lakshmi for prosperity.',
                    jain: 'Celebrate as the day of Lord Mahavira\'s nirvana. Focus on spiritual enlightenment.',
                    sikh: 'Celebrate as Bandi Chhor Divas. Visit gurdwaras and light up homes.',
                    general: 'Universal celebration of light, prosperity, and the victory of good over evil.'
                },
                timing: {
                    lakshmiPuja: 'Evening during Pradosh Kaal',
                    celebrations: 'Full day and night'
                }
            },
            {
                id: 'govardhan-puja-2025',
                name: 'Govardhan Puja',
                date: 4,
                type: 'festival',
                description: 'Govardhan Puja commemorates Lord Krishna lifting Mount Govardhan to protect the people of Vrindavan from Indra\'s wrath.',
                observances: [
                    'Create Govardhan mountain replica with cow dung and food',
                    'Offer 56 varieties of food (Chappan Bhog)',
                    'Worship cows and feed them special food',
                    'Perform parikrama (circumambulation) of the food mountain',
                    'Distribute prasad to everyone'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform elaborate Krishna Puja and organize community feasts.',
                    general: 'Universal celebration of Krishna\'s protection and environmental consciousness.'
                }
            },
            {
                id: 'bhai-dooj-2025',
                name: 'Bhai Dooj',
                date: 5,
                type: 'festival',
                description: 'Bhai Dooj celebrates the bond between brothers and sisters, similar to Raksha Bandhan, with sisters praying for brothers\' well-being.',
                observances: [
                    'Sisters apply tilaka on brothers\' foreheads',
                    'Perform aarti and pray for brothers\' long life',
                    'Brothers give gifts to sisters',
                    'Share special meals together',
                    'Strengthen family bonds and relationships'
                ],
                fastingRules: [],
                communitySpecific: {
                    brahmin: 'Perform proper rituals with mantras and blessings.',
                    general: 'Universal celebration of sibling love and family bonds.'
                }
            }
        ],
        12: [ // December 2025
            {
                id: 'vivah-panchami-2025',
                name: 'Vivah Panchami',
                date: 6,
                type: 'festival',
                description: 'Vivah Panchami commemorates the marriage of Lord Rama and Goddess Sita, celebrating ideal marital relationships.',
                observances: [
                    'Organize ceremonial marriage of Rama and Sita idols',
                    'Recite Ramayana and sing devotional songs',
                    'Decorate temples with flowers and lights',
                    'Distribute sweets and prasad',
                    'Pray for happy married life'
                ],
                fastingRules: [
                    'Optional fasting until evening',
                    'Consume only sattvic food',
                    'Break fast after evening prayers',
                    'Focus on pure vegetarian meals'
                ],
                communitySpecific: {
                    brahmin: 'Perform elaborate marriage ceremony of Rama-Sita with proper rituals.',
                    general: 'Universal celebration of ideal marriage and devotion.'
                }
            },
            {
                id: 'gita-jayanti-2025',
                name: 'Gita Jayanti',
                date: 11,
                type: 'festival',
                description: 'Gita Jayanti commemorates the day when Lord Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra.',
                observances: [
                    'Recite and study Bhagavad Gita',
                    'Organize Gita recitation competitions',
                    'Conduct spiritual discourses on Gita teachings',
                    'Distribute Gita books to devotees',
                    'Meditate on Krishna\'s teachings'
                ],
                fastingRules: [
                    'Optional fasting with focus on spiritual study',
                    'Consume only sattvic food',
                    'Avoid distractions and focus on learning',
                    'Break fast after Gita recitation'
                ],
                communitySpecific: {
                    brahmin: 'Lead Gita recitation and explain its philosophical meanings.',
                    general: 'Universal study and contemplation of Gita\'s timeless wisdom.'
                }
            }
        ]
    }
};

// Ekadashi dates for 2025 (occurs twice a month)
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

// Add Ekadashi to calendar data
EKADASHI_2025.forEach(monthData => {
    const month = monthData.month;
    const year = 2025;
    
    if (!HINDU_CALENDAR_DATA[year]) HINDU_CALENDAR_DATA[year] = {};
    if (!HINDU_CALENDAR_DATA[year][month]) HINDU_CALENDAR_DATA[year][month] = [];
    
    monthData.dates.forEach((date, index) => {
        const ekadashiName = monthData.names[index];
        HINDU_CALENDAR_DATA[year][month].push({
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
        });
    });
});