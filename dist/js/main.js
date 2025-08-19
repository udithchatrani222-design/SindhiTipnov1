// Main application functionality
class SindhiTipnoApp {
    constructor() {
        this.currentSection = 'today';
        this.currentDate = new Date(2025, 7, 1); // Start with August 2025
        this.today = null; // Will be set by calculateTodayIST()
        this.festivals = {};
        this.currentMonthEvents = [];
        this.istUpdateTimer = null;
        
        // Calculate today in IST first
        this.calculateTodayIST();
        this.initializeApp();
        this.setupISTTimer(); // Setup automatic IST updates
    }

    // Calculate current date strictly in IST (UTC+5:30)
    calculateTodayIST() {
        const previousToday = this.today;
        
        // Get current UTC time
        const nowUTC = new Date();
        
        // Offset in minutes for IST (UTC+5:30)
        const ISTOffsetMinutes = 5.5 * 60;
        
        // Calculate IST by adding offset to UTC time
        const nowIST = new Date(nowUTC.getTime() + (ISTOffsetMinutes * 60 * 1000));
        
        // Set today to the IST date
        this.today = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
        
        // Format the display string with IST timezone
        try {
            this.todayFormatted = nowIST.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata'
            }) + ' (IST)';
        } catch (error) {
            // Fallback formatting if timezone API fails
            this.todayFormatted = this.today.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) + ' (IST)';
        }
        
        // Check if date has changed
        const dateChanged = !previousToday || !this.isSameDay(previousToday, this.today);
        
        if (dateChanged) {
            this.updateCurrentDate();
            
            // Re-render calendar if it's currently visible and date changed
            if (this.currentSection === 'calendar') {
                this.renderCalendar();
            }
            
            // Show notification about date update (only after initial load)
            if (authSystem && authSystem.showMessage && previousToday) {
                authSystem.showMessage(`Date updated to ${this.todayFormatted}`, 'info');
            }
        }
        
        return dateChanged;
    }

    // Fallback IST calculation if timezone API fails
    calculateTodayISTFallback() {
        // Get current UTC time
        const nowUTC = new Date();
        
        // Add 5.5 hours (IST offset) to UTC
        const nowIST = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000));
        
        // Set today to the IST date
        this.today = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
        
        // Format display string
        this.todayFormatted = this.today.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) + ' (IST)';
    }

    // Get current IST time for display purposes
    getCurrentISTTime() {
        try {
            const nowUTC = new Date();
            const ISTOffsetMinutes = 5.5 * 60;
            const nowIST = new Date(nowUTC.getTime() + (ISTOffsetMinutes * 60 * 1000));
            
            return nowIST.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true
            });
        } catch (error) {
            // Fallback time calculation
            const nowUTC = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const nowIST = new Date(nowUTC.getTime() + istOffset);
            return nowIST.toLocaleTimeString('en-IN', { hour12: true });
        }
    }

    // Setup automatic IST updates
    setupISTTimer() {
        // Clear any existing timer
        if (this.istUpdateTimer) {
            clearInterval(this.istUpdateTimer);
        }
        
        // Update every 2 minutes to catch date changes quickly
        this.istUpdateTimer = setInterval(() => {
            this.calculateTodayIST();
        }, 2 * 60 * 1000); // Every 2 minutes
        
        // Also setup a more precise midnight IST update
        this.setupMidnightISTUpdate();
    }

    // Setup precise midnight IST update
    setupMidnightISTUpdate() {
        const scheduleNextMidnightUpdate = () => {
            try {
                const nowUTC = new Date();
                const ISTOffsetMinutes = 5.5 * 60;
                const nowIST = new Date(nowUTC.getTime() + (ISTOffsetMinutes * 60 * 1000));
                
                // Calculate next midnight IST
                const nextMidnightIST = new Date(nowIST);
                nextMidnightIST.setHours(24, 0, 0, 0); // Next day at 00:00:00 IST
                
                // Convert back to UTC for setTimeout
                const nextMidnightUTC = new Date(nextMidnightIST.getTime() - (ISTOffsetMinutes * 60 * 1000));
                const msUntilMidnight = nextMidnightUTC.getTime() - nowUTC.getTime();
                
                // Schedule update at IST midnight (with small delay to ensure date change)
                setTimeout(() => {
                    this.calculateTodayIST();
                    scheduleNextMidnightUpdate(); // Schedule next midnight update
                }, msUntilMidnight + 2000); // Add 2 second delay
                
            } catch (error) {
                console.warn('Midnight IST scheduling failed, using fallback:', error);
                // Fallback: just check every hour
                setTimeout(() => {
                    this.calculateTodayIST();
                    scheduleNextMidnightUpdate();
                }, 60 * 60 * 1000); // Every hour
            }
        };
        
        scheduleNextMidnightUpdate();
    }

    // Legacy method for backward compatibility
    setupISTUpdates() {
        // Clear any existing timer
        if (this.istUpdateTimer) {
            clearInterval(this.istUpdateTimer);
        }
        
        // Update every 2 minutes to catch date changes
        this.istUpdateTimer = setInterval(() => {
            this.calculateTodayIST();
        }, 2 * 60 * 1000); // Every 2 minutes
    }

    // Legacy method for backward compatibility
    updateISTToday() {
        return this.calculateTodayIST();
    }

    initializeApp() {
        this.setupNavigation();
        this.setupCalendar();
        this.updateCurrentDate();
        // Load events for August 2025 (current month)
        this.currentDate = new Date(2025, 7, 1); // Set to August 2025
        this.loadMonthEvents(7, 2025); // Load August 2025 events
        
        // Show current IST date on app load
        if (authSystem && authSystem.showMessage) {
            authSystem.showMessage(`Today: ${this.todayFormatted}`, 'info');
        }
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
                this.navigateMonth(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.navigateMonth(1);
            });
        }
    }

    navigateMonth(direction) {
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        
        let newMonth = currentMonth + direction;
        let newYear = currentYear;
        
        // Handle year boundaries
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        
        // Only allow navigation within 2025
        if (newYear === 2025) {
            this.currentDate = new Date(newYear, newMonth, 1);
            this.loadMonthEvents(newMonth, newYear);
            this.renderCalendar();
            
            // Show success message
            if (authSystem && authSystem.showMessage) {
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                authSystem.showMessage(`Navigated to ${monthNames[newMonth]} 2025`, 'success');
            }
        } else {
            // Show message if trying to navigate outside 2025
            if (authSystem && authSystem.showMessage) {
                authSystem.showMessage('Navigation limited to year 2025', 'info');
            }
        }
        
        // Force re-render to ensure proper layout
        setTimeout(() => {
            this.renderCalendar();
        }, 100);
    }

    loadMonthEvents(month, year) {
        // Clear current events
        this.currentMonthEvents = [];
        
        if (year !== 2025) return;
        
        switch (month) {
            case 0: // January 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Swami Devprakashji 87th Bdy', type: 'sindhi', major: true },
                    { date: 1, name: 'Chand', type: 'hindu', major: false },
                    { date: 3, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 6, name: 'Guru Gobind Singh Jayanti', type: 'sindhi', major: true },
                    { date: 10, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 12, name: 'Swami Vivekanand Birthday', type: 'sindhi', major: true },
                    { date: 13, name: 'Lohri (Lal Loi)', type: 'sindhi', major: true },
                    { date: 13, name: 'Satya Narayan', type: 'hindu', major: false },
                    { date: 14, name: 'Makarsankranti (Utran)', type: 'hindu', major: true },
                    { date: 16, name: 'Sadhu T.L. Vaswani 59th Ann.', type: 'sindhi', major: true },
                    { date: 17, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 20, name: 'Martin Luther King Day', type: 'other', major: false },
                    { date: 25, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 26, name: 'India\'s Republic Day', type: 'other', major: true },
                    { date: 29, name: 'Amavasya', type: 'hindu', major: false },
                    { date: 30, name: 'Chand', type: 'hindu', major: false }
                ];
                break;
                
            case 1: // February 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Bhagwanti Navani Birthday', type: 'sindhi', major: true },
                    { date: 1, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 2, name: 'Vasant Panchami, Sarswati Puja', type: 'hindu', major: true },
                    { date: 8, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 12, name: 'Satya Narayan', type: 'hindu', major: false },
                    { date: 14, name: 'Saint Valentine\'s Day', type: 'other', major: false },
                    { date: 18, name: 'Dada J.P. Vaswani Thanksgiving Wk', type: 'sindhi', major: true },
                    { date: 24, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 26, name: 'Maha Shivaratri', type: 'hindu', major: true },
                    { date: 27, name: 'Amavasya', type: 'hindu', major: false }
                ];
                break;
                
            case 2: // March 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Chand', type: 'hindu', major: false },
                    { date: 1, name: 'Kamakrishna Parmhansa Jayanti', type: 'sindhi', major: true },
                    { date: 10, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 13, name: 'Holika Dahan', type: 'hindu', major: true },
                    { date: 14, name: 'Holi, Satya Narayan', type: 'hindu', major: true },
                    { date: 17, name: 'Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 25, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 30, name: 'Chet Chand', type: 'sindhi', major: true }
                ];
                break;
                
            case 3: // April 2025
                this.currentMonthEvents = [
                    { date: 5, name: 'Durga Ashtami (Kamya Puja)', type: 'hindu', major: true },
                    { date: 6, name: 'Ramnavami', type: 'hindu', major: true },
                    { date: 8, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 11, name: 'Hanuman Jayanti', type: 'hindu', major: true },
                    { date: 12, name: 'Satya Narayan, Hanuman Jayanti', type: 'hindu', major: true },
                    { date: 13, name: 'Baisakhi Kanwar Ram Birthday', type: 'sindhi', major: true },
                    { date: 14, name: 'Vaisakhi', type: 'hindu', major: true },
                    { date: 20, name: 'Guru Amaidas Jayanti', type: 'sindhi', major: true },
                    { date: 24, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 29, name: 'Chand', type: 'hindu', major: false },
                    { date: 30, name: 'Akhar Teej (Akshaya Tritiya)', type: 'hindu', major: true }
                ];
                break;
                
            case 4: // May 2025
                this.currentMonthEvents = [
                    { date: 3, name: 'Ganga Saptami', type: 'hindu', major: false },
                    { date: 8, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 11, name: 'Buddha Day, Narasimh Jayanti', type: 'hindu', major: true },
                    { date: 12, name: 'Satya Narayan', type: 'hindu', major: false },
                    { date: 14, name: 'Narad Jayanti', type: 'hindu', major: true },
                    { date: 23, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 24, name: 'Vat Savitri Vrat', type: 'hindu', major: true },
                    { date: 27, name: 'Shani Jayanti, Amavasya', type: 'hindu', major: true },
                    { date: 28, name: 'Chand', type: 'hindu', major: false }
                ];
                break;
                
            case 5: // June 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Swami Teooramji\'s 83rd Aniv.', type: 'sindhi', major: true },
                    { date: 5, name: 'Ganga Dashmi', type: 'hindu', major: false },
                    { date: 6, name: 'Ekadashi (Nirjala)', type: 'hindu', major: false },
                    { date: 11, name: 'Satya Narayan, Kabir Jayanti', type: 'hindu', major: true },
                    { date: 21, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 26, name: 'Chand', type: 'hindu', major: false },
                    { date: 30, name: 'Swami Teooramji\'s 139th Bdy', type: 'sindhi', major: true }
                ];
                break;
                
            case 6: // July 2025
                this.currentMonthEvents = [
                    { date: 6, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 10, name: 'Satya Narayan, Guru Purnima', type: 'hindu', major: true },
                    { date: 12, name: 'Dada J.P. Vaswani\'s 107th Anniversary', type: 'sindhi', major: true },
                    { date: 14, name: 'Hariyali Somvar Vrat Starts', type: 'hindu', major: false },
                    { date: 21, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 25, name: 'Chand', type: 'hindu', major: false },
                    { date: 29, name: 'Nag Panchami', type: 'hindu', major: true },
                    { date: 29, name: 'Swami Saraswatiji\'s 48th Aniv.', type: 'sindhi', major: true },
                    { date: 31, name: 'Thadri Small (Nandi Satahi)', type: 'sindhi', major: false },
                    { date: 31, name: 'Tulsi Divas Jayanti', type: 'hindu', major: false }
                ];
                break;
                
            case 7: // August 2025
                this.currentMonthEvents = [
                    { date: 2, name: 'Dada J.P. Vaswani 107th Bdy', type: 'sindhi', major: true },
                    { date: 4, name: 'Swami Somvar Vrat Ends', type: 'hindu', major: false },
                    { date: 5, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 9, name: 'Raksha Bandhan, Satya Narayan', type: 'hindu', major: true },
                    { date: 9, name: 'Swami Shanti Prakashji\'s 120th Bdy', type: 'sindhi', major: true },
                    { date: 12, name: 'Teejri, Ganesh Chaturthi', type: 'sindhi', major: true },
                    { date: 15, name: 'Thadri Shanti Prakashji\'s 33rd Aniv.', type: 'sindhi', major: true },
                    { date: 15, name: 'Thadri (Vadi Satai)', type: 'sindhi', major: true },
                    { date: 16, name: 'Krishna Janmashtami', type: 'hindu', major: true },
                    { date: 19, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 24, name: 'Rishi Panchami', type: 'hindu', major: true },
                    { date: 25, name: 'Mahalaxmi Sagra Begins, Radhashimi', type: 'hindu', major: true }
                ];
                break;
                
            case 8: // September 2025
                this.currentMonthEvents = [
                    { date: 3, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 4, name: 'Vaman Jayanti', type: 'hindu', major: true },
                    { date: 7, name: 'Ganesh Chaturthi, Ganpati Visarjan', type: 'hindu', major: true },
                    { date: 7, name: 'Satya Narayan', type: 'hindu', major: false },
                    { date: 8, name: 'Ganesh Ends', type: 'hindu', major: false },
                    { date: 14, name: 'Mahalaxmi Sagra Ends', type: 'hindu', major: true },
                    { date: 17, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 21, name: 'Shradh Ends, Amavasya', type: 'hindu', major: false },
                    { date: 22, name: 'Navratri Starts', type: 'hindu', major: true },
                    { date: 23, name: 'Chand', type: 'hindu', major: false },
                    { date: 30, name: 'Durgashtami', type: 'hindu', major: true },
                    { date: 30, name: 'Swami Teooramji\'s 128th Bdy', type: 'sindhi', major: true }
                ];
                break;
                
            case 9: // October 2025
                this.currentMonthEvents = [
                    { date: 2, name: 'Vijay Dashmi/Dushera', type: 'hindu', major: true },
                    { date: 3, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 6, name: 'Karva Chauth', type: 'hindu', major: true },
                    { date: 9, name: 'Valmiki Jayanti', type: 'hindu', major: false },
                    { date: 10, name: 'Ganesh Chaturthi, Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 12, name: 'Pandit Mohanal 80th Bdy', type: 'sindhi', major: true },
                    { date: 17, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 18, name: 'Dhanteras', type: 'hindu', major: true },
                    { date: 19, name: 'Goop Chandas, Ganesh Chaturthi', type: 'hindu', major: true },
                    { date: 20, name: 'Diwali, Amavasya', type: 'hindu', major: true },
                    { date: 22, name: 'Annakut Goverdhan Puja', type: 'hindu', major: true },
                    { date: 23, name: 'Bhai Dooj, Chand', type: 'hindu', major: true },
                    { date: 25, name: 'Bhagat Kanwar Ram Aniv.', type: 'sindhi', major: true },
                    { date: 30, name: 'Gopashtami', type: 'hindu', major: false }
                ];
                break;
                
            case 10: // November 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Satya Viyah, Ekadashi', type: 'hindu', major: false },
                    { date: 3, name: 'Tulsi Vivah, Satya Narayan', type: 'hindu', major: true },
                    { date: 5, name: 'Guru Nanak Jayanti', type: 'sindhi', major: true },
                    { date: 22, name: 'Chand', type: 'hindu', major: false },
                    { date: 25, name: 'Sadhu T.L. Vaswani 146th Bdy', type: 'sindhi', major: true },
                    { date: 25, name: 'Ram Sita Wedding', type: 'hindu', major: true }
                ];
                break;
                
            case 11: // December 2025
                this.currentMonthEvents = [
                    { date: 1, name: 'Gita Jayanti, Ekadashi', type: 'hindu', major: true },
                    { date: 4, name: 'Satya Narayan', type: 'hindu', major: false },
                    { date: 7, name: 'Master Chander Bday', type: 'sindhi', major: true },
                    { date: 15, name: 'Ekadashi', type: 'hindu', major: false },
                    { date: 21, name: 'Chand', type: 'hindu', major: false },
                    { date: 27, name: 'Pandit Mohanal 7th Aniv.', type: 'sindhi', major: true },
                    { date: 30, name: 'Ekadashi', type: 'hindu', major: false }
                ];
                break;
        }
    }

    updateCurrentDate() {
        if (!this.today) return;
        
        // Use the pre-formatted IST date string
        const dateString = this.todayFormatted;
        
        // Update all page headers with the IST date
        const dateElements = document.querySelectorAll('.page-header p');
        dateElements.forEach(element => {
            // Update the today section date display (first page header)
            const parentSection = element.closest('.content-section');
            if (parentSection && parentSection.id === 'today-section') {
                element.textContent = dateString;
            }
        });
        
        // Also update any other date displays that should show today's date
        const todayHeaders = document.querySelectorAll('#today-section .page-header p');
        todayHeaders.forEach(element => {
            element.textContent = dateString;
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
            const currentYear = this.currentDate.getFullYear();
            const currentMonth = this.currentDate.getMonth();
            
            // Update button states
            if (currentYear === 2025 && currentMonth === 0) {
                prevBtn.disabled = true;
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.disabled = false;
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            
            if (currentYear === 2025 && currentMonth === 11) {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
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
        
        // Show success message when calendar is loaded
        if (authSystem && authSystem.showMessage) {
            authSystem.showMessage(`Calendar loaded for ${monthNames[month]} 2025 with ${this.currentMonthEvents.length} events`, 'success');
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
            
            // Calculate how many events can fit based on screen size
            const maxVisibleEvents = this.getMaxVisibleEvents();
            const visibleEvents = dayEvents.slice(0, maxVisibleEvents);
            const remainingCount = dayEvents.length - visibleEvents.length;
            
            visibleEvents.forEach(event => {
                const eventPill = document.createElement('div');
                eventPill.className = `event-pill ${event.type}`;
                eventPill.textContent = this.truncateEventName(event.name);
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
                morePill.className = 'event-pill more-events';
                morePill.textContent = `+${remainingCount} more`;
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

    getMaxVisibleEvents() {
        // Determine max events based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) {
            return 1; // Very small screens - show only 1 event
        } else if (screenWidth < 768) {
            return 2; // Mobile screens - show 2 events
        } else {
            return 3; // Desktop screens - show 3 events
        }
    }

    truncateEventName(name) {
        // Truncate event names based on screen size
        const screenWidth = window.innerWidth;
        let maxLength;
        
        if (screenWidth < 480) {
            maxLength = 8; // Very short on small screens
        } else if (screenWidth < 768) {
            maxLength = 12; // Medium length on mobile
        } else {
            maxLength = 20; // Full length on desktop
        }
        
        if (name.length > maxLength) {
            return name.substring(0, maxLength - 3) + '...';
        }
        return name;
    }

    showEventDetails(event, date) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        
        // Format date in IST using manual calculation
        let dateString;
        try {
            dateString = new Intl.DateTimeFormat('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata'
            }).format(date);
        } catch (error) {
            // Fallback formatting
            dateString = date.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>${event.name}</h3>
                    <span class="event-modal-close">&times;</span>
                </div>
                <div class="event-modal-body">
                    <p><strong>Date:</strong> ${dateString} (IST)</p>
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
        
        // Format date in IST using manual calculation
        let dateString;
        try {
            dateString = new Intl.DateTimeFormat('en-IN', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata'
            }).format(date);
        } catch (error) {
            // Fallback formatting
            dateString = date.toLocaleDateString('en-IN', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
        }
        
        const eventsList = events.map(event => `
            <div class="event-item-modal">
                <span class="event-pill ${event.type}">${event.name}</span>
                ${event.major ? '<i class="fas fa-star"></i>' : ''}
            </div>
        `).join('');
        
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>Events on ${dateString}</h3>
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
        if (!date1 || !date2) return false;
        
        // Simple date comparison (assuming dates are already in correct timezone)
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
    
    // Cleanup method
    destroy() {
        if (this.istUpdateTimer) {
            clearInterval(this.istUpdateTimer);
            this.istUpdateTimer = null;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sindhiTipnoApp = new SindhiTipnoApp();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.sindhiTipnoApp && window.sindhiTipnoApp.destroy) {
        window.sindhiTipnoApp.destroy();
    }
});

// Handle window resize to update calendar layout
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Re-render calendar if it's currently visible
        const calendarSection = document.getElementById('calendar-section');
        if (calendarSection && calendarSection.classList.contains('active')) {
            const app = window.sindhiTipnoApp;
            if (app && app.renderCalendar) {
                app.renderCalendar();
            }
        }
    }, 250);
});