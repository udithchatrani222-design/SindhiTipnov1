// Main application logic
class HinduCalendarApp {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedLocation = '';
        this.selectedCommunity = '';
        this.currentFilter = 'all';
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.setupEventListeners();
        this.renderCalendar();
        this.renderFestivalList();
        this.updateLocationDisplay();
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.navigateMonth(-1);
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.navigateMonth(1);
        });
        
        // Location selector
        document.getElementById('locationSelect').addEventListener('change', (e) => {
            this.selectedLocation = e.target.value;
            this.updateLocationDisplay();
            this.renderCalendar();
            this.renderFestivalList();
        });
        
        // Community selector
        document.getElementById('communitySelect').addEventListener('change', (e) => {
            this.selectedCommunity = e.target.value;
            this.renderCalendar();
            this.renderFestivalList();
        });
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal when clicking outside
        document.getElementById('festivalModal').addEventListener('click', (e) => {
            if (e.target.id === 'festivalModal') {
                this.closeModal();
            }
        });
    }
    
    navigateMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        this.renderCalendar();
        this.renderFestivalList();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderFestivalList();
    }
    
    updateLocationDisplay() {
        const locationDisplay = document.getElementById('currentLocation');
        if (this.selectedLocation && LOCATION_DATA[this.selectedLocation]) {
            locationDisplay.textContent = `📍 ${LOCATION_DATA[this.selectedLocation].name}`;
        } else {
            locationDisplay.textContent = 'Select location for accurate timings';
        }
    }
    
    renderCalendar() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        // Update month display
        document.getElementById('currentMonthYear').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Get previous month's last days
        const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        // Add previous month's trailing days
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(
                daysInPrevMonth - i, 
                true, 
                this.currentMonth === 0 ? 11 : this.currentMonth - 1,
                this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear
            );
            calendarGrid.appendChild(dayElement);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, false, this.currentMonth, this.currentYear);
            calendarGrid.appendChild(dayElement);
        }
        
        // Add next month's leading days
        const totalCells = calendarGrid.children.length;
        const remainingCells = 42 - totalCells; // 6 rows × 7 days
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(
                day, 
                true, 
                this.currentMonth === 11 ? 0 : this.currentMonth + 1,
                this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear
            );
            calendarGrid.appendChild(dayElement);
        }
    }
    
    createDayElement(day, isOtherMonth, month, year) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        // Check if it's today
        const today = new Date();
        if (!isOtherMonth && 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Events container
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'day-events';
        
        // Get festivals for this day
        if (!isOtherMonth) {
            const festivals = this.getFestivalsForDay(day, month + 1, year);
            festivals.forEach(festival => {
                const eventDot = document.createElement('div');
                eventDot.className = `event-dot ${festival.type}`;
                eventDot.textContent = festival.name;
                eventDot.title = festival.name;
                eventDot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showFestivalDetails(festival);
                });
                eventsContainer.appendChild(eventDot);
            });
        }
        
        dayElement.appendChild(eventsContainer);
        return dayElement;
    }
    
    getFestivalsForDay(day, month, year) {
        if (!HINDU_CALENDAR_DATA[year] || !HINDU_CALENDAR_DATA[year][month]) {
            return [];
        }
        
        return HINDU_CALENDAR_DATA[year][month].filter(festival => festival.date === day);
    }
    
    renderFestivalList() {
        const festivalList = document.getElementById('festivalList');
        const festivals = this.getCurrentMonthFestivals();
        
        if (festivals.length === 0) {
            festivalList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No festivals found</h3>
                    <p>No festivals or observances found for the selected criteria.</p>
                </div>
            `;
            return;
        }
        
        festivalList.innerHTML = festivals.map(festival => {
            const date = new Date(this.currentYear, this.currentMonth, festival.date);
            const dateStr = date.toLocaleDateString('en-IN', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short' 
            });
            
            return `
                <div class="festival-item ${festival.type}" onclick="app.showFestivalDetails(${JSON.stringify(festival).replace(/"/g, '&quot;')})">
                    <div class="festival-header">
                        <h4 class="festival-name">${festival.name}</h4>
                        <div>
                            <span class="festival-date">${dateStr}</span>
                            <span class="festival-type ${festival.type}">${festival.type}</span>
                        </div>
                    </div>
                    <p class="festival-description">${festival.description.substring(0, 150)}...</p>
                    ${this.getFestivalTags(festival)}
                </div>
            `;
        }).join('');
    }
    
    getCurrentMonthFestivals() {
        const month = this.currentMonth + 1;
        const year = this.currentYear;
        
        if (!HINDU_CALENDAR_DATA[year] || !HINDU_CALENDAR_DATA[year][month]) {
            return [];
        }
        
        let festivals = HINDU_CALENDAR_DATA[year][month];
        
        // Apply filter
        if (this.currentFilter !== 'all') {
            festivals = festivals.filter(festival => festival.type === this.currentFilter);
        }
        
        // Sort by date
        festivals.sort((a, b) => a.date - b.date);
        
        return festivals;
    }
    
    getFestivalTags(festival) {
        const tags = [];
        
        if (festival.fastingRules && festival.fastingRules.length > 0) {
            tags.push('Fasting');
        }
        
        if (festival.timing) {
            tags.push('Specific Timing');
        }
        
        if (this.selectedCommunity && festival.communitySpecific && festival.communitySpecific[this.selectedCommunity]) {
            tags.push('Community Specific');
        }
        
        if (tags.length === 0) return '';
        
        return `
            <div class="festival-tags">
                ${tags.map(tag => `<span class="festival-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    showFestivalDetails(festival) {
        const modal = document.getElementById('festivalModal');
        const date = new Date(this.currentYear, this.currentMonth, festival.date);
        
        // Update modal content
        document.getElementById('modalTitle').textContent = festival.name;
        document.getElementById('modalDate').textContent = date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('modalType').textContent = festival.type.charAt(0).toUpperCase() + festival.type.slice(1);
        document.getElementById('modalDescription').textContent = festival.description;
        
        // Update observances
        const observancesList = document.getElementById('modalObservances');
        observancesList.innerHTML = festival.observances.map(obs => `<li>${obs}</li>`).join('');
        
        // Update fasting rules
        const fastingSection = document.getElementById('modalFasting');
        if (festival.fastingRules && festival.fastingRules.length > 0) {
            fastingSection.style.display = 'block';
            const fastingList = document.getElementById('modalFastingRules');
            fastingList.innerHTML = festival.fastingRules.map(rule => `<li>${rule}</li>`).join('');
        } else {
            fastingSection.style.display = 'none';
        }
        
        // Update community specific practices
        const communitySection = document.getElementById('modalCommunitySpecific');
        if (this.selectedCommunity && festival.communitySpecific && festival.communitySpecific[this.selectedCommunity]) {
            communitySection.style.display = 'block';
            document.getElementById('modalCommunityPractices').textContent = 
                festival.communitySpecific[this.selectedCommunity];
        } else {
            communitySection.style.display = 'none';
        }
        
        // Update timing information
        const timingSection = document.getElementById('modalTime');
        if (this.selectedLocation && festival.timing) {
            const locationTiming = getLocationSpecificTiming(this.selectedLocation, date, festival.type);
            if (locationTiming) {
                timingSection.style.display = 'block';
                let timingText = '';
                
                if (festival.type === 'ekadashi' || festival.type === 'vrat') {
                    timingText = `Fast: ${locationTiming.fastStart} to ${locationTiming.fastEnd}`;
                } else if (festival.timing.sunrise) {
                    timingText = `Sunrise: ${locationTiming.sunrise}`;
                } else if (festival.timing.birth === 'Midnight') {
                    timingText = `Birth Time: Midnight | Sunrise: ${locationTiming.sunrise}`;
                }
                
                timingSection.querySelector('span').textContent = timingText;
            } else {
                timingSection.style.display = 'none';
            }
        } else {
            timingSection.style.display = 'none';
        }
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        document.getElementById('festivalModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new HinduCalendarApp();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (app) {
        app.renderCalendar();
    }
});