// ========== LANDING PAGE FUNCTIONS ==========

function startTrial() {
    console.log("🟢 Start Trial clicked");
    showSignupModal();
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showDemoModal() {
    showNotification('Demo video would play here!', false, 'info');
}

function showContactModal() {
    showNotification('Contact form would appear here!', false, 'info');
}

function showPrivacyModal() {
    showNotification('Privacy: We protect your data. Contact support@financecore.com for details.', false, 'info');
}

function showTermsModal() {
    showNotification('Terms: By using FinanceCore ERP, you agree to our service terms.', false, 'info');
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

function showLoginModal() {
    console.log("Showing login modal");
    closeModal('signupModal');
    showModal('loginModal');
}

function showSignupModal() {
    console.log("Showing signup modal");
    closeModal('loginModal');
    showModal('signupModal');
}

// ========== LANDING PAGE EVENT LISTENERS ==========
function setupLandingPageListeners() {
    console.log("Setting up landing page listeners...");
    
    // Test: Add direct onclick handler to start trial button
    const startTrialBtns = document.querySelectorAll('.btn-primary, .btn-lg');
    startTrialBtns.forEach(btn => {
        if (btn.textContent.includes('Free Trial') || btn.textContent.includes('Start 15-Day')) {
            console.log("Found trial button:", btn.textContent);
            btn.onclick = function(e) {
                e.preventDefault();
                console.log("Direct onclick handler fired!");
                startTrial();
            };
        }
    });
    
    // Add click handler for Sign In button
    const signInBtn = document.querySelector('.btn-login');
    if (signInBtn) {
        signInBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Login button clicked");
            showLoginModal();
        };
    }
    
    // Add click handlers for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
    });
    
    console.log("✅ Landing page listeners setup complete");
}

// Initialize landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("🟢 Landing page DOM loaded");
    setupLandingPageListeners();
});

// Make functions available globally
window.startTrial = startTrial;
window.scrollToFeatures = scrollToFeatures;
window.showDemoModal = showDemoModal;
window.showContactModal = showContactModal;
window.showPrivacyModal = showPrivacyModal;
window.showTermsModal = showTermsModal;
window.toggleMobileMenu = toggleMobileMenu;
window.showLoginModal = showLoginModal;
window.showSignupModal = showSignupModal;