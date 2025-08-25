// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('sindhiTipnoUsers')) || [];
        this.adminCredentials = {
            username: 'Raiden',
            password: 'Sindhi2025'
        };
        
        this.initializeAuth();
    }

    initializeAuth() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('sindhiTipnoCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        } else {
            this.showLoginModal();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            if (this.currentUser) {
                this.hideLoginModal();
            }
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Auth forms
        document.getElementById('loginBtn').addEventListener('click', () => this.handleLogin());
        document.getElementById('registerBtn').addEventListener('click', () => this.handleRegister());
        document.getElementById('guestBtn').addEventListener('click', () => this.handleGuest());
        document.getElementById('adminLoginBtn').addEventListener('click', () => this.handleAdminLogin());

        // Admin/User login switching
        document.getElementById('adminLoginLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showAdminLogin();
        });

        document.getElementById('backToUserLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('login');
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());

        // Admin panel tabs
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-admin-tab');
                this.switchAdminTab(tab);
            });
        });

        // Admin actions
        document.getElementById('uploadContentBtn').addEventListener('click', () => this.handleContentUpload());

        // Enter key support
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && document.getElementById('loginModal').style.display !== 'none') {
                const activeForm = document.querySelector('.auth-form.active');
                if (activeForm.id === 'login-form') this.handleLogin();
                else if (activeForm.id === 'register-form') this.handleRegister();
                else if (activeForm.id === 'admin-form') this.handleAdminLogin();
            }
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tabName}-form`).classList.add('active');
    }

    showAdminLogin() {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById('admin-form').classList.add('active');

        // Hide tabs for admin login
        document.querySelector('.auth-tabs').style.display = 'none';
    }

    switchAdminTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-admin-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        if (tabName === 'users') {
            this.updateUserManagement();
        }
    }

    handleLogin() {
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!identifier) {
            this.showMessage('Please enter your email or phone number', 'error');
            return;
        }

        // Find user
        const user = this.users.find(u => u.identifier === identifier);
        
        if (!user) {
            this.showMessage('User not found. Please register first.', 'error');
            return;
        }

        // Check password if user has one
        if (user.password && user.password !== password) {
            this.showMessage('Incorrect password', 'error');
            return;
        }

        this.loginUser(user);
    }

    handleRegister() {
        const identifier = document.getElementById('registerIdentifier').value.trim();
        const password = document.getElementById('registerPassword').value;

        if (!identifier) {
            this.showMessage('Please enter your email or phone number', 'error');
            return;
        }

        // Check if user already exists
        if (this.users.find(u => u.identifier === identifier)) {
            this.showMessage('User already exists. Please login instead.', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            identifier: identifier,
            password: password || null,
            type: 'registered',
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        this.loginUser(newUser);
    }

    handleGuest() {
        const guestUser = {
            id: 'guest_' + Date.now(),
            identifier: 'Guest User',
            type: 'guest',
            createdAt: new Date().toISOString()
        };

        this.loginUser(guestUser);
    }

    handleAdminLogin() {
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value;

        if (username !== this.adminCredentials.username || password !== this.adminCredentials.password) {
            this.showMessage('Invalid admin credentials', 'error');
            return;
        }

        const adminUser = {
            id: 'admin',
            identifier: 'Raiden',
            type: 'admin',
            createdAt: new Date().toISOString()
        };

        this.loginUser(adminUser);
    }

    loginUser(user) {
        this.currentUser = user;
        localStorage.setItem('sindhiTipnoCurrentUser', JSON.stringify(user));
        this.updateUI();
        this.hideLoginModal();
        this.showMessage(`Welcome ${user.type === 'guest' ? 'Guest' : user.identifier}!`, 'success');
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('sindhiTipnoCurrentUser');
        this.updateUI();
        this.showLoginModal();
        this.showMessage('Logged out successfully', 'success');
    }

    updateUI() {
        if (!this.currentUser) return;

        // Update user display
        const displayName = this.currentUser.type === 'guest' ? 'Guest' : 
                           this.currentUser.type === 'admin' ? 'Admin (Raiden)' : 
                           this.currentUser.identifier;
        
        document.getElementById('userDisplayName').textContent = displayName;
        document.getElementById('userType').textContent = 
            this.currentUser.type === 'guest' ? 'Guest User' :
            this.currentUser.type === 'admin' ? 'Administrator' : 'Registered User';

        // Show/hide logout button
        document.getElementById('logoutBtn').style.display = 'block';

        // Show/hide admin panel
        const adminNavItem = document.querySelector('[data-section="admin"]');
        if (this.currentUser.type === 'admin') {
            adminNavItem.style.display = 'flex';
        } else {
            adminNavItem.style.display = 'none';
        }
        
        // Show/hide admin-only elements
        const adminOnlyElements = document.querySelectorAll('.admin-only');
        adminOnlyElements.forEach(element => {
            if (this.currentUser.type === 'admin') {
                element.style.display = element.classList.contains('sync-btn') ? 'flex' : 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'flex';
        // Reset to login tab
        this.switchTab('login');
        document.querySelector('.auth-tabs').style.display = 'flex';
        this.clearForms();
    }

    hideLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    clearForms() {
        document.querySelectorAll('.auth-form input').forEach(input => {
            input.value = '';
        });
    }

    saveUsers() {
        localStorage.setItem('sindhiTipnoUsers', JSON.stringify(this.users));
    }

    handleContentUpload() {
        const title = document.getElementById('contentTitle').value.trim();
        const type = document.getElementById('contentType').value;
        const audioFile = document.getElementById('audioFile').files[0];
        const description = document.getElementById('contentDescription').value.trim();

        if (!title || !audioFile) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        // Read file as ArrayBuffer for better audio handling
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = {
                id: Date.now().toString(),
                title: title,
                type: type,
                fileName: audioFile.name,
                fileSize: audioFile.size,
                fileType: audioFile.type,
                description: description,
                uploadedAt: new Date().toISOString(),
                uploadedBy: this.currentUser.identifier,
                // Store file data for playback (in production, this would be a URL)
                fileData: e.target.result
            };

            // Save to localStorage (in real app, this would be saved to database)
            const existingContent = JSON.parse(localStorage.getItem('sindhiTipnoContent')) || [];
            existingContent.push(content);
            localStorage.setItem('sindhiTipnoContent', JSON.stringify(existingContent));

            this.showMessage('Content uploaded successfully!', 'success');
            this.clearUploadForm();
            this.updateContentLibrary();
            
            // Auto-sync with Bhajans section if it's currently active or has been initialized
            if (window.sindhiTipnoApp) {
                // Refresh Bhajans content if the section is currently active
                if (window.sindhiTipnoApp.currentSection === 'bhajans') {
                    window.sindhiTipnoApp.loadBhajansContent();
                }
                
                // Mark that content has been updated for future section loads
                window.sindhiTipnoApp.contentUpdated = true;
            }
        };
        
        reader.onerror = () => {
            this.showMessage('Error reading audio file', 'error');
        };
        
        // Read file as ArrayBuffer
        reader.readAsArrayBuffer(audioFile);
    }

    clearUploadForm() {
        document.getElementById('contentTitle').value = '';
        document.getElementById('contentType').value = 'aarti';
        document.getElementById('audioFile').value = '';
        document.getElementById('contentDescription').value = '';
    }

    updateContentLibrary() {
        const content = JSON.parse(localStorage.getItem('sindhiTipnoContent')) || [];
        const container = document.getElementById('contentLibrary');
        
        if (content.length === 0) {
            container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No content uploaded yet.</p>';
            return;
        }

        container.innerHTML = content.map(item => `
            <div class="content-item">
                <div class="content-info">
                    <h4>${item.title}</h4>
                    <span class="content-type">${item.type}</span>
                </div>
                <div class="content-actions">
                    <button class="edit-btn" onclick="authSystem.editContent('${item.id}')">Edit</button>
                    <button class="delete-btn" onclick="authSystem.deleteContent('${item.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    updateUserManagement() {
        const totalUsers = this.users.length;
        const registeredUsers = this.users.filter(u => u.type === 'registered').length;
        const guestUsers = this.users.filter(u => u.type === 'guest').length;

        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('registeredUsers').textContent = registeredUsers;
        document.getElementById('guestUsers').textContent = guestUsers;

        const container = document.getElementById('userListContainer');
        
        if (this.users.length === 0) {
            container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem; grid-column: 1 / -1;">No users registered yet.</p>';
            return;
        }

        container.innerHTML = this.users.map(user => `
            <div class="user-item">
                <span>${user.id}</span>
                <span>${user.identifier}</span>
                <span class="user-type-badge ${user.type}">${user.type}</span>
                <span class="password-status ${user.password ? 'has-password' : 'no-password'}">
                    ${user.password ? 'Set' : 'Not Set'}
                </span>
                <div class="user-actions">
                    ${!user.password ? `<button class="set-password-btn" onclick="authSystem.setUserPassword('${user.id}')">Set Password</button>` : ''}
                </div>
            </div>
        `).join('');
    }

    setUserPassword(userId) {
        const password = prompt('Enter new password for user:');
        if (password) {
            const user = this.users.find(u => u.id === userId);
            if (user) {
                user.password = password;
                this.saveUsers();
                this.updateUserManagement();
                this.showMessage('Password set successfully!', 'success');
            }
        }
    }

    editContent(contentId) {
        this.showMessage('Edit functionality would be implemented here', 'info');
    }

    deleteContent(contentId) {
        if (confirm('Are you sure you want to delete this content?')) {
            const content = JSON.parse(localStorage.getItem('sindhiTipnoContent')) || [];
            const updatedContent = content.filter(item => item.id !== contentId);
            localStorage.setItem('sindhiTipnoContent', JSON.stringify(updatedContent));
            this.updateContentLibrary();
            this.showMessage('Content deleted successfully!', 'success');
            
            // Auto-sync with Bhajans section after deletion
            if (window.sindhiTipnoApp) {
                if (window.sindhiTipnoApp.currentSection === 'bhajans') {
                    window.sindhiTipnoApp.loadBhajansContent();
                }
                window.sindhiTipnoApp.contentUpdated = true;
            }
        }
    }

    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        toast.style.background = colors[type] || colors.info;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Add toast animations to head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize auth system
let authSystem;
document.addEventListener('DOMContentLoaded', () => {
    authSystem = new AuthSystem();
});