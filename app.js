// ========== APPLICATION STATE ==========
const appData = {
    company: {
        name: 'Your Company',
        logo: '',
        address: '123 Business Street, Zomba, Malawi',
        email: 'info@company.com',
        phone: '+265 888 879 052',
        taxId: 'TAX-12345',
        website: 'www.company.com'
    },
    currentUser: {
        name: 'Austin Phiri',
        email: 'austin.precious@outlook.com',
        role: 'admin',
        avatar: 'AP'
    },
    theme: 'light',
    industryMode: 'corporate',
    accountingMethod: 'accrual'
};

// ========== MODAL FUNCTIONS ==========
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log("Modal opened:", modalId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, isError = false, type = 'success') {
    console.log("Notification:", message);
    
    // Create notification if it doesn't exist
    let notification = document.getElementById('notification');
    let notificationText = document.getElementById('notificationText');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        notificationText = document.createElement('span');
        notificationText.id = 'notificationText';
        notification.appendChild(notificationText);
        document.body.appendChild(notification);
    }
    
    notificationText.textContent = message;
    notification.className = 'notification';
    notification.classList.add('show', type);
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== PAGE SWITCHING FUNCTIONS ==========
function showLandingPage() {
    console.log("🟢 Showing landing page");
    
    const mainApp = document.getElementById('mainApp');
    const landingPage = document.getElementById('landingPage');
    
    if (mainApp) mainApp.style.display = 'none';
    if (landingPage) landingPage.style.display = 'block';
    
    document.body.classList.remove('app-mode');
}

function showMainApp() {
    console.log("🟢 Showing main app");
    
    const landingPage = document.getElementById('landingPage');
    const mainApp = document.getElementById('mainApp');
    
    if (landingPage) landingPage.style.display = 'none';
    if (mainApp) {
        mainApp.style.display = 'flex';
        mainApp.classList.remove('hidden');
    }
    
    document.body.classList.add('app-mode');
    
    // Initialize app if not already initialized
    if (typeof initializeApp === 'function') {
        initializeApp();
    }
}

// ========== LOGIN/SIGNUP FUNCTIONS ==========
function handleLogin(e) {
    e.preventDefault();
    console.log("🟢 Handling login");
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please enter email and password', true, 'error');
        return;
    }
    
    // Set user data
    appData.currentUser.email = email;
    appData.currentUser.name = email.split('@')[0];
    appData.currentUser.avatar = email.split('@')[0].substring(0, 2).toUpperCase();
    
    // Save to localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', appData.currentUser.name);
    
    // Close modal
    closeModal('loginModal');
    
    // Show main app
    showMainApp();
    
    // Initialize the app
    initializeApp();
    
    showNotification(`Welcome ${appData.currentUser.name}!`, false, 'success');
}

function handleSignup(e) {
    e.preventDefault();
    console.log("🟢 Handling signup");
    
    const name = document.getElementById('signupName').value;
    const company = document.getElementById('signupCompany').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !company || !email || !password) {
        showNotification('Please fill all required fields', true, 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', true, 'error');
        return;
    }
    
    // Set user data
    appData.currentUser.name = name;
    appData.currentUser.email = email;
    appData.currentUser.avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();
    appData.company.name = company;
    
    // Save to localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    localStorage.setItem('companyName', company);
    
    // Close modal
    closeModal('signupModal');
    
    // Show main app
    showMainApp();
    
    // Initialize the app
    initializeApp();
    
    showNotification(`Welcome ${name}! Your account has been created.`, false, 'success');
}

// ========== CORE APP FUNCTIONS ==========
function initializeApp() {
    console.log("🟢 Initializing app...");
    
    // Set today's date in date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = today;
    });
    
    // Apply theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Set industry mode
    const savedIndustry = localStorage.getItem('industryMode') || 'corporate';
    switchIndustryMode(savedIndustry);
    
    // Load company profile
    loadCompanyProfile();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load sample data
    loadSampleData();
    
    // Navigate to dashboard
    navigateTo('dashboard');
    
    console.log("✅ App initialized");
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    appData.theme = theme;
    
    // Update toggle if exists
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.checked = theme === 'dark';
    }
}

function switchIndustryMode(mode) {
    appData.industryMode = mode;
    localStorage.setItem('industryMode', mode);
    
    document.querySelectorAll('.industry-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-industry') === mode);
    });
    
    if (mode === 'ngo') {
        document.getElementById('ngoSection').style.display = 'block';
        document.getElementById('corporateSection').style.display = 'none';
    } else {
        document.getElementById('ngoSection').style.display = 'none';
        document.getElementById('corporateSection').style.display = 'block';
    }
}

function setupEventListeners() {
    console.log("🟢 Setting up event listeners");
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.onchange = function() {
            const theme = this.checked ? 'dark' : 'light';
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        };
    }
    
    // Industry mode buttons
    document.querySelectorAll('.industry-option').forEach(btn => {
        btn.onclick = function() {
            const industry = this.getAttribute('data-industry');
            switchIndustryMode(industry);
        };
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = toggleMobileMenu;
    }
    
    const mobileOverlay = document.getElementById('mobileOverlay');
    if (mobileOverlay) {
        mobileOverlay.onclick = toggleMobileMenu;
    }
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = function() {
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
            }
        };
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.onclick = function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        };
    });
    
    // Login form
    const loginForm = document.querySelector('#loginModal form');
    if (loginForm) {
        loginForm.onsubmit = handleLogin;
    }
    
    // Signup form
    const signupForm = document.querySelector('#signupModal form');
    if (signupForm) {
        signupForm.onsubmit = handleSignup;
    }
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

function navigateTo(page) {
    console.log("Navigating to:", page);
    
    // Hide all pages
    document.querySelectorAll('[id^="page-"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show requested page
    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
        pageElement.classList.remove('hidden');
    }
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
    });
    
    const navItem = document.querySelector(`[data-page="${page}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Close mobile menu on small screens
    if (window.innerWidth <= 1024) {
        toggleMobileMenu();
    }
}

function loadCompanyProfile() {
    const stored = localStorage.getItem('companyName');
    if (stored) {
        appData.company.name = stored;
    }
    
    // Update UI
    const companyNameEl = document.getElementById('companyName');
    if (companyNameEl) {
        companyNameEl.textContent = appData.company.name;
    }
    
    const userName = localStorage.getItem('userName') || appData.currentUser.name;
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = userName;
    }
    
    const userAvatarEl = document.getElementById('userAvatar');
    if (userAvatarEl) {
        userAvatarEl.textContent = appData.currentUser.avatar || 
            userName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}

function loadSampleData() {
    console.log("Loading sample data...");
    
    // Sample customers
    if (!appData.customers) appData.customers = [];
    if (appData.customers.length === 0) {
        appData.customers = [
            { id: 1, name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '+265 888 123 456', receivables: 1250000 },
            { id: 2, name: 'Global Trading Ltd', contact: 'Jane Doe', email: 'jane@global.com', phone: '+265 999 654 321', receivables: 890000 }
        ];
    }
    
    // Sample products
    if (!appData.products) appData.products = [];
    if (appData.products.length === 0) {
        appData.products = [
            { id: 1, code: 'PROD-001', name: 'Premium Widget', category: 'Goods', price: 15000, stock: 100, cost: 8000 },
            { id: 2, code: 'SERV-001', name: 'Consulting Services', category: 'Services', price: 25000, stock: null, cost: 0 }
        ];
    }
    
    // Sample invoices
    if (!appData.invoices) appData.invoices = [];
    if (appData.invoices.length === 0) {
        appData.invoices = [
            { 
                id: 1, 
                number: 'INV-2024-0001', 
                customer: 'Acme Corporation',
                date: '2024-01-15',
                dueDate: '2024-02-15',
                total: 150000,
                status: 'pending'
            }
        ];
    }
    
    console.log("✅ Sample data loaded");
}

// ========== DASHBOARD FUNCTIONS ==========
function loadDashboard() {
    console.log("Loading dashboard...");
    
    // Update stats with sample data
    const totalRevenue = 125400000;
    const netProfit = 32800000;
    const receivables = 18200000;
    const inventoryValue = 45600000;
    
    // Update stat cards if they exist
    const statCards = document.querySelectorAll('.stat-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = `MWK ${(totalRevenue/1000000).toFixed(1)}M`;
        statCards[1].textContent = `MWK ${(netProfit/1000000).toFixed(1)}M`;
        statCards[2].textContent = `MWK ${(receivables/1000000).toFixed(1)}M`;
        statCards[3].textContent = `MWK ${(inventoryValue/1000000).toFixed(1)}M`;
    }
}

// ========== LOGOUT FUNCTION ==========
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Show landing page
        showLandingPage();
        showNotification('You have been logged out successfully.', false, 'info');
    }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("🟢 FinanceCore ERP loaded");
    
    // Check if user is already logged in
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
        console.log("🟢 Auto-login with saved user");
        showMainApp();
    } else {
        console.log("🟢 Showing landing page for new user");
        showLandingPage();
    }
});

// Make functions available globally
window.showModal = showModal;
window.closeModal = closeModal;
window.showNotification = showNotification;
window.showMainApp = showMainApp;
window.showLandingPage = showLandingPage;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.logout = logout;
window.navigateTo = navigateTo;
window.loadDashboard = loadDashboard;