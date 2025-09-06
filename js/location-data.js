// Location data with timezone information for accurate festival timings
const LOCATION_DATA = {
    mumbai: {
        name: 'Mumbai, Maharashtra',
        timezone: 'Asia/Kolkata',
        latitude: 19.0760,
        longitude: 72.8777,
        utcOffset: '+05:30'
    },
    delhi: {
        name: 'Delhi, NCR',
        timezone: 'Asia/Kolkata',
        latitude: 28.7041,
        longitude: 77.1025,
        utcOffset: '+05:30'
    },
    bangalore: {
        name: 'Bangalore, Karnataka',
        timezone: 'Asia/Kolkata',
        latitude: 12.9716,
        longitude: 77.5946,
        utcOffset: '+05:30'
    },
    chennai: {
        name: 'Chennai, Tamil Nadu',
        timezone: 'Asia/Kolkata',
        latitude: 13.0827,
        longitude: 80.2707,
        utcOffset: '+05:30'
    },
    kolkata: {
        name: 'Kolkata, West Bengal',
        timezone: 'Asia/Kolkata',
        latitude: 22.5726,
        longitude: 88.3639,
        utcOffset: '+05:30'
    },
    hyderabad: {
        name: 'Hyderabad, Telangana',
        timezone: 'Asia/Kolkata',
        latitude: 17.3850,
        longitude: 78.4867,
        utcOffset: '+05:30'
    },
    pune: {
        name: 'Pune, Maharashtra',
        timezone: 'Asia/Kolkata',
        latitude: 18.5204,
        longitude: 73.8567,
        utcOffset: '+05:30'
    },
    ahmedabad: {
        name: 'Ahmedabad, Gujarat',
        timezone: 'Asia/Kolkata',
        latitude: 23.0225,
        longitude: 72.5714,
        utcOffset: '+05:30'
    },
    jaipur: {
        name: 'Jaipur, Rajasthan',
        timezone: 'Asia/Kolkata',
        latitude: 26.9124,
        longitude: 75.7873,
        utcOffset: '+05:30'
    },
    lucknow: {
        name: 'Lucknow, Uttar Pradesh',
        timezone: 'Asia/Kolkata',
        latitude: 26.8467,
        longitude: 80.9462,
        utcOffset: '+05:30'
    },
    bhopal: {
        name: 'Bhopal, Madhya Pradesh',
        timezone: 'Asia/Kolkata',
        latitude: 23.2599,
        longitude: 77.4126,
        utcOffset: '+05:30'
    },
    patna: {
        name: 'Patna, Bihar',
        timezone: 'Asia/Kolkata',
        latitude: 25.5941,
        longitude: 85.1376,
        utcOffset: '+05:30'
    },
    thiruvananthapuram: {
        name: 'Thiruvananthapuram, Kerala',
        timezone: 'Asia/Kolkata',
        latitude: 8.5241,
        longitude: 76.9366,
        utcOffset: '+05:30'
    },
    bhubaneswar: {
        name: 'Bhubaneswar, Odisha',
        timezone: 'Asia/Kolkata',
        latitude: 20.2961,
        longitude: 85.8245,
        utcOffset: '+05:30'
    },
    chandigarh: {
        name: 'Chandigarh',
        timezone: 'Asia/Kolkata',
        latitude: 30.7333,
        longitude: 76.7794,
        utcOffset: '+05:30'
    }
};

// Function to calculate sunrise and sunset times for a given location and date
function calculateSunTimes(latitude, longitude, date) {
    // Simplified sunrise/sunset calculation
    // In a real application, you would use a more accurate astronomical library
    
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const P = Math.asin(0.39795 * Math.cos(0.98563 * (dayOfYear - 173) * Math.PI / 180));
    
    const argument = -Math.tan(latitude * Math.PI / 180) * Math.tan(P);
    let hourAngle = Math.acos(Math.max(-1, Math.min(1, argument)));
    
    const decimalHours = 12 - (hourAngle * 180 / Math.PI) / 15;
    const sunrise = new Date(date);
    sunrise.setHours(Math.floor(decimalHours), Math.floor((decimalHours % 1) * 60), 0, 0);
    
    const sunset = new Date(date);
    const sunsetHours = 12 + (hourAngle * 180 / Math.PI) / 15;
    sunset.setHours(Math.floor(sunsetHours), Math.floor((sunsetHours % 1) * 60), 0, 0);
    
    return { sunrise, sunset };
}

// Function to calculate moon phase and moonrise time
function calculateMoonTimes(latitude, longitude, date) {
    // Simplified moon calculation
    // In a real application, you would use astronomical libraries for accurate calculations
    
    const daysSinceNewMoon = (date.getTime() - new Date(2025, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
    const moonPhase = (daysSinceNewMoon % 29.53) / 29.53;
    
    // Approximate moonrise time (varies by location and date)
    const moonrise = new Date(date);
    const moonriseHour = 18 + (moonPhase * 12); // Simplified calculation
    moonrise.setHours(Math.floor(moonriseHour % 24), Math.floor((moonriseHour % 1) * 60), 0, 0);
    
    return { moonrise, phase: moonPhase };
}

// Function to get location-specific timing for festivals
function getLocationSpecificTiming(locationKey, date, festivalType) {
    if (!LOCATION_DATA[locationKey]) {
        return null;
    }
    
    const location = LOCATION_DATA[locationKey];
    const sunTimes = calculateSunTimes(location.latitude, location.longitude, date);
    const moonTimes = calculateMoonTimes(location.latitude, location.longitude, date);
    
    const timings = {
        sunrise: sunTimes.sunrise.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: location.timezone 
        }),
        sunset: sunTimes.sunset.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: location.timezone 
        }),
        moonrise: moonTimes.moonrise.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: location.timezone 
        })
    };
    
    // Add specific timings based on festival type
    switch (festivalType) {
        case 'ekadashi':
        case 'vrat':
            timings.fastStart = timings.sunrise;
            timings.fastEnd = `${timings.sunrise} (next day)`;
            break;
        case 'festival':
            if (date.getDate() === 16 && date.getMonth() === 7) { // Krishna Janmashtami
                timings.birthTime = '00:00'; // Midnight
            }
            break;
    }
    
    return timings;
}