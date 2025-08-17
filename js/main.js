// Main application functionality
class SindhiTipnoApp {
    constructor() {
        this.currentSection = 'today';
        this.currentDate = new Date(2025, 0); // January 2025
        this.today = new Date(2025, 7, 15); // Today is August 15, 2025
        this.festivals = {};
        this.currentMonthEvents = [];
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupNavigation();
        this.setupCalendar();
        this.updateCurrentDate();
        this.loadMonthEvents(this.currentDate.getMonth(), this.currentDate.getFullYear());
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const actionCards = document.querySelectorAll('.action-card');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section === 'admin' && (!authSystem.currentUser || authSystem.currentUser.type !== 'admin')) {
                    authSystem.showMessage('Admin access required', 'error');
                    return;
                }
                this.switchSection(section);
            });
        });

        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const section = card.getAttribute('data-section');
                if (section) {
                    this.switchSection(section);
                }
            });
        });
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;

        // Initialize calendar if switching to calendar section
        if (sectionName === 'calendar') {
            this.renderCalendar();
        }
        
        // Initialize admin panel if switching to admin section
        if (sectionName === 'admin' && authSystem.currentUser && authSystem.currentUser.type === 'admin') {
            authSystem.updateContentLibrary();
            authSystem.updateUserManagement();
        }
    }

    setupCalendar() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.loadMonthEvents(this.currentDate.getMonth(), this.currentDate.getFullYear());
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.loadMonthEvents(this.currentDate.getMonth(), this.currentDate.getFullYear());
                this.renderCalendar();
            });
        }
    }

    loadMonthEvents(month, year) {
        // Clear current events
        this.currentMonthEvents = [];
        
        // Load events for the specific month
        const monthKey = `${year}-${month}`;
        
        if (month === 0 && year === 2025) { // January 2025
            this.currentMonthEvents = [
                { date: 1, name: 'Satguru Swami Devprakashji Maharaj\'s 87th Birthday', type: 'sindhi', major: true },
                { date: 1, name: 'Chand', type: 'hindu', major: false },
                { date: 3, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                { date: 6, name: 'Guru Gobind Singh Jayanti', type: 'sindhi', major: true },
                { date: 10, name: 'Ekadashi', type: 'hindu', major: false },
                { date: 12, name: 'Swami Vivekanand Birthday', type: 'sindhi', major: true },
                { date: 13, name: 'Lohri (Lal Loi)', type: 'sindhi', major: true },
                { date: 13, name: 'Satya Narayan', type: 'hindu', major: false },
                { date: 14, name: 'Makarsankranti (Utran)', type: 'hindu', major: true },
                { date: 16, name: 'Sadhu T.L. Vaswani 59th Anniversary', type: 'sindhi', major: true },
                { date: 17, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                { date: 20, name: 'Martin Luther King Day', type: 'other', major: false },
                { date: 25, name: 'Ekadashi', type: 'hindu', major: false },
                { date: 26, name: 'India\'s Republic Day', type: 'other', major: true },
                { date: 29, name: 'Amavasya', type: 'hindu', major: false },
                { date: 30, name: 'Chand', type: 'hindu', major: false }
            ];
        } else if (month === 7 && year === 2025) { // August 2025 (existing data)
            this.currentMonthEvents = [
                { date: 2, name: 'Dada J.P. Vaswani\'s 107th Birthday', type: 'sindhi', major: true },
                { date: 9, name: 'Raksha Bandhan', type: 'hindu', major: true },
                { date: 12, name: 'Teejri', type: 'sindhi', major: true },
                { date: 15, name: 'Thadri Big (Vadi Satai)', type: 'sindhi', major: true },
                { date: 15, name: 'Thadri', type: 'sindhi', major: false },
                { date: 16, name: 'Krishna Janmashtami', type: 'hindu', major: true },
                { date: 18, name: 'Pavitropana Ekadashi', type: 'hindu', major: false },
                { date: 21, name: 'Amavasya (Bhadrapada)', type: 'hindu', major: false },
                { date: 27, name: 'Rishi Panchami', type: 'hindu', major: true },
                { date: 31, name: 'Radha Ashtami', type: 'hindu', major: true }
            ];
        } else if (month === 1 && year === 2025) { // February 2025
            this.currentMonthEvents = [
                { date: 1, name: 'Bhagwanti Navani Birthday', type: 'sindhi', major: true },
                { date: 2, name: 'Vasant Panchami', type: 'hindu', major: true },
                { date: 2, name: 'Sarswati Puja', type: 'hindu', major: true },
                { date: 8, name: 'Ekadashi', type: 'hindu', major: false },
                { date: 12, name: 'Satya Narayan', type: 'hindu', major: false },
                { date: 12, name: 'Guru Ravidas Jayanti', type: 'sindhi', major: true },
                { date: 14, name: 'Valentine\'s Day', type: 'other', major: false },
                { date: 18, name: 'Dada J.P. Vaswani Thanksgiving Week Feb 18 to 24', type: 'sindhi', major: true },
                { date: 19, name: 'Chatrapati Shivaji Jayanti', type: 'hindu', major: true },
                { date: 24, name: 'Ekadashi', type: 'hindu', major: false },
                { date: 26, name: 'Maha Shivaratri', type: 'hindu', major: true },
                { date: 27, name: 'Amavasya', type: 'hindu', major: false }
            ];
        }
        // Future months will be added here as data becomes available
    }
    updateCurrentDate() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = this.today.toLocaleDateString('en-US', options);
        
        const dateElements = document.querySelectorAll('.page-header p');
        dateElements.forEach(element => {
            if (element.textContent.includes('2025')) {
                element.textContent = dateString;
            }
        });
    }


    renderCalendar() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Update month header
        const monthHeader = document.getElementById('currentMonth');
        if (monthHeader) {
            monthHeader.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        }

        // Update navigation button states
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        if (prevBtn && nextBtn) {
            // Enable/disable based on available date range
            const currentYear = this.currentDate.getFullYear();
            const currentMonth = this.currentDate.getMonth();
            
            // Disable previous if we're at January 2025
            if (currentYear === 2025 && currentMonth === 0) {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }
            
            // Disable next if we're at December 2025
            if (currentYear === 2025 && currentMonth === 11) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        }

        // Render calendar grid
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        calendarGrid.innerHTML = '';

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Generate 42 days (6 weeks)
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(date, month);
            calendarGrid.appendChild(dayElement);
        }
    }

    createDayElement(date, currentMonth) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        
        const isCurrentMonth = date.getMonth() === currentMonth;
        const isToday = this.isSameDay(date, this.today);
        
        if (!isCurrentMonth) {
            dayDiv.classList.add('other-month');
        }
        
        if (isToday) {
            dayDiv.classList.add('today');
        }

        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayDiv.appendChild(dayNumber);

        // Events for this day (only for current month)
        const dayEvents = isCurrentMonth ? 
            this.currentMonthEvents.filter(event => event.date === date.getDate()) : [];
        
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';
            
            // Show up to 3 events, then "+X more"
            const visibleEvents = dayEvents.slice(0, 3);
            const remainingCount = dayEvents.length - visibleEvents.length;
            
            visibleEvents.forEach(event => {
                const eventPill = document.createElement('div');
                eventPill.className = `event-pill ${event.type}`;
                eventPill.textContent = event.name;
                eventPill.title = event.name; // Tooltip for full name
                
                // Add click handler for event details
                eventPill.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showEventDetails(event, date);
                });
                
                eventsContainer.appendChild(eventPill);
            });
            
            if (remainingCount > 0) {
                const morePill = document.createElement('div');
                morePill.className = 'event-pill';
                morePill.textContent = `+${remainingCount} more`;
                morePill.style.background = '#6b7280';
                morePill.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showAllDayEvents(dayEvents, date);
                });
                eventsContainer.appendChild(morePill);
            }
            
            dayDiv.appendChild(eventsContainer);
            
            // Add star for major festivals
            const hasMajorFestival = dayEvents.some(event => event.major);
            if (hasMajorFestival) {
                const star = document.createElement('i');
                star.className = 'fas fa-star major-festival-star';
                dayDiv.appendChild(star);
            }
        }

        return dayDiv;
    }

    showEventDetails(event, date) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>${event.name}</h3>
                    <span class="event-modal-close">&times;</span>
                </div>
                <div class="event-modal-body">
                    <p><strong>Date:</strong> ${date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</p>
                    <p><strong>Type:</strong> ${event.type.charAt(0).toUpperCase() + event.type.slice(1)} ${event.major ? '(Major Festival)' : ''}</p>
                    ${event.description ? `<p><strong>Description:</strong> ${event.description}</p>` : ''}
                    ${event.url ? `<p><a href="${event.url}" target="_blank" rel="noopener">Learn More</a></p>` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.event-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showAllDayEvents(events, date) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        
        const eventsList = events.map(event => `
            <div class="event-item-modal">
                <span class="event-pill ${event.type}">${event.name}</span>
                ${event.major ? '<i class="fas fa-star"></i>' : ''}
            </div>
        `).join('');
        
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>Events on ${date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</h3>
                    <span class="event-modal-close">&times;</span>
                </div>
                <div class="event-modal-body">
                    ${eventsList}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.event-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SindhiTipnoApp();
});