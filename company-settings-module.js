// ========== COMPANY SETTINGS & LOGO MANAGEMENT SYSTEM ==========
// Centralized company information and logo for all exports

// Initialize company settings
if (!appData.companySettings) {
    appData.companySettings = {
        companyName: 'Your Company Name',
        companyLogo: null, // Base64 image data
        address: '',
        city: '',
        region: '',
        country: 'Malawi',
        phone: '',
        email: '',
        website: '',
        taxId: '',
        registrationNumber: '',
        bankName: '',
        bankAccountNumber: '',
        bankAccountName: '',
        currency: 'MWK',
        fiscalYearStart: '01-01',
        financialStatementHeader: '',
        invoiceFooter: 'Thank you for your business!',
        quotationFooter: 'We look forward to working with you!',
        receiptFooter: 'Payment received with thanks.',
        reportFooter: 'Confidential - For Internal Use Only'
    };
}

// ========== SHOW COMPANY SETTINGS MODAL ==========
function showCompanySettings() {
    const settings = appData.companySettings;
    
    const modalHtml = `
        <div class="modal active" id="companySettingsModal">
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close" onclick="closeModal('companySettingsModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Company Settings</h2>
                    <p class="page-subtitle">Configure company information for documents and reports</p>
                </div>
                
                <form id="companySettingsForm" onsubmit="saveCompanySettings(event)">
                    <!-- Company Logo -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <h3 class="card-title">🎨 Company Logo</h3>
                        </div>
                        <div style="padding: 20px;">
                            <div style="display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: start;">
                                <div>
                                    <div id="logoPreview" style="width: 200px; height: 120px; border: 2px dashed var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: center; background: var(--bg-tertiary); overflow: hidden;">
                                        ${settings.companyLogo ? 
                                            `<img src="${settings.companyLogo}" style="max-width: 100%; max-height: 100%; object-fit: contain;">` :
                                            `<span style="color: var(--text-secondary); text-align: center; padding: 20px;">No logo uploaded<br><small>Click below to upload</small></span>`
                                        }
                                    </div>
                                </div>
                                <div>
                                    <input type="file" id="companyLogoInput" accept="image/png,image/jpeg,image/jpg" 
                                           onchange="handleLogoUpload(event)" 
                                           style="margin-bottom: 12px;">
                                    <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
                                        • Recommended size: 400x200 pixels<br>
                                        • Formats: PNG, JPG (PNG with transparency recommended)<br>
                                        • Max file size: 2MB<br>
                                        • Logo appears on: Invoices, Quotations, Receipts, Financial Statements, Reports
                                    </p>
                                    ${settings.companyLogo ? `
                                        <button type="button" class="btn btn-danger btn-sm" onclick="removeCompanyLogo()">
                                            🗑️ Remove Logo
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Basic Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        🏢 Company Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Company Name *</label>
                            <input type="text" class="form-input" id="companyName" 
                                   value="${settings.companyName}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Registration Number</label>
                            <input type="text" class="form-input" id="registrationNumber" 
                                   value="${settings.registrationNumber || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tax ID / TIN</label>
                            <input type="text" class="form-input" id="companyTaxId" 
                                   value="${settings.taxId || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Default Currency</label>
                            <select class="form-select" id="companyCurrency">
                                <option value="MWK" ${settings.currency === 'MWK' ? 'selected' : ''}>MWK - Malawi Kwacha</option>
                                <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>USD - US Dollar</option>
                                <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>EUR - Euro</option>
                                <option value="GBP" ${settings.currency === 'GBP' ? 'selected' : ''}>GBP - British Pound</option>
                                <option value="ZAR" ${settings.currency === 'ZAR' ? 'selected' : ''}>ZAR - South African Rand</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📞 Contact Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" id="companyEmail" 
                                   value="${settings.email || ''}" 
                                   placeholder="info@company.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" id="companyPhone" 
                                   value="${settings.phone || ''}" 
                                   placeholder="+265 1 234 567">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Website</label>
                            <input type="url" class="form-input" id="companyWebsite" 
                                   value="${settings.website || ''}" 
                                   placeholder="https://www.company.com">
                        </div>
                    </div>
                    
                    <!-- Address -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        🏠 Address
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Street Address</label>
                            <input type="text" class="form-input" id="companyAddress" 
                                   value="${settings.address || ''}" 
                                   placeholder="123 Main Street">
                        </div>
                        <div class="form-group">
                            <label class="form-label">City</label>
                            <input type="text" class="form-input" id="companyCity" 
                                   value="${settings.city || ''}" 
                                   placeholder="Blantyre">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Region/State</label>
                            <input type="text" class="form-input" id="companyRegion" 
                                   value="${settings.region || ''}" 
                                   placeholder="Southern Region">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Country</label>
                            <input type="text" class="form-input" id="companyCountry" 
                                   value="${settings.country || 'Malawi'}">
                        </div>
                    </div>
                    
                    <!-- Banking Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        🏦 Banking Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Bank Name</label>
                            <input type="text" class="form-input" id="bankName" 
                                   value="${settings.bankName || ''}" 
                                   placeholder="Standard Bank">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Account Name</label>
                            <input type="text" class="form-input" id="bankAccountName" 
                                   value="${settings.bankAccountName || ''}" 
                                   placeholder="Company Name Ltd">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Account Number</label>
                            <input type="text" class="form-input" id="bankAccountNumber" 
                                   value="${settings.bankAccountNumber || ''}" 
                                   placeholder="1234567890">
                        </div>
                    </div>
                    
                    <!-- Document Footers -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📄 Document Footers
                    </h3>
                    <div class="form-group mb-3">
                        <label class="form-label">Invoice Footer</label>
                        <textarea class="form-textarea" id="invoiceFooter" rows="2" 
                                  placeholder="Thank you for your business!">${settings.invoiceFooter || ''}</textarea>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Quotation Footer</label>
                        <textarea class="form-textarea" id="quotationFooter" rows="2" 
                                  placeholder="We look forward to working with you!">${settings.quotationFooter || ''}</textarea>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Receipt Footer</label>
                        <textarea class="form-textarea" id="receiptFooter" rows="2" 
                                  placeholder="Payment received with thanks.">${settings.receiptFooter || ''}</textarea>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Report Footer</label>
                        <textarea class="form-textarea" id="reportFooter" rows="2" 
                                  placeholder="Confidential - For Internal Use Only">${settings.reportFooter || ''}</textarea>
                    </div>
                    
                    <!-- Fiscal Year -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📅 Fiscal Year
                    </h3>
                    <div class="form-group mb-3">
                        <label class="form-label">Fiscal Year Start (MM-DD)</label>
                        <input type="text" class="form-input" id="fiscalYearStart" 
                               value="${settings.fiscalYearStart || '01-01'}" 
                               placeholder="01-01"
                               pattern="[0-9]{2}-[0-9]{2}">
                        <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                            Format: MM-DD (e.g., 01-01 for January 1st, 07-01 for July 1st)
                        </small>
                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('companySettingsModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ========== HANDLE LOGO UPLOAD ==========
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image/png') && !file.type.match('image/jpeg') && !file.type.match('image/jpg')) {
        showNotification('Please upload a PNG or JPG image', true, 'error');
        return;
    }
    
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
        showNotification('File size must be less than 2MB', true, 'error');
        return;
    }
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoBase64 = e.target.result;
        
        // Update preview
        const preview = document.getElementById('logoPreview');
        if (preview) {
            preview.innerHTML = `<img src="${logoBase64}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
        }
        
        // Store temporarily (will be saved when form is submitted)
        window.tempCompanyLogo = logoBase64;
        
        showNotification('Logo uploaded! Click "Save Settings" to apply.', false, 'success');
    };
    reader.readAsDataURL(file);
}

// ========== REMOVE LOGO ==========
function removeCompanyLogo() {
    if (!confirm('Remove company logo? This will affect all documents and reports.')) {
        return;
    }
    
    appData.companySettings.companyLogo = null;
    window.tempCompanyLogo = null;
    saveToStorage('companySettings');
    
    const preview = document.getElementById('logoPreview');
    if (preview) {
        preview.innerHTML = `<span style="color: var(--text-secondary); text-align: center; padding: 20px;">No logo uploaded<br><small>Click below to upload</small></span>`;
    }
    
    showNotification('Logo removed successfully!', false, 'success');
    
    // Reload modal to show remove button gone
    setTimeout(() => {
        closeModal('companySettingsModal');
        showCompanySettings();
    }, 500);
}

// ========== SAVE COMPANY SETTINGS ==========
function saveCompanySettings(e) {
    e.preventDefault();
    
    // Update logo if new one was uploaded
    if (window.tempCompanyLogo) {
        appData.companySettings.companyLogo = window.tempCompanyLogo;
        window.tempCompanyLogo = null;
    }
    
    // Update all settings
    appData.companySettings.companyName = document.getElementById('companyName').value.trim();
    appData.companySettings.registrationNumber = document.getElementById('registrationNumber').value.trim();
    appData.companySettings.taxId = document.getElementById('companyTaxId').value.trim();
    appData.companySettings.currency = document.getElementById('companyCurrency').value;
    appData.companySettings.email = document.getElementById('companyEmail').value.trim();
    appData.companySettings.phone = document.getElementById('companyPhone').value.trim();
    appData.companySettings.website = document.getElementById('companyWebsite').value.trim();
    appData.companySettings.address = document.getElementById('companyAddress').value.trim();
    appData.companySettings.city = document.getElementById('companyCity').value.trim();
    appData.companySettings.region = document.getElementById('companyRegion').value.trim();
    appData.companySettings.country = document.getElementById('companyCountry').value.trim();
    appData.companySettings.bankName = document.getElementById('bankName').value.trim();
    appData.companySettings.bankAccountName = document.getElementById('bankAccountName').value.trim();
    appData.companySettings.bankAccountNumber = document.getElementById('bankAccountNumber').value.trim();
    appData.companySettings.invoiceFooter = document.getElementById('invoiceFooter').value.trim();
    appData.companySettings.quotationFooter = document.getElementById('quotationFooter').value.trim();
    appData.companySettings.receiptFooter = document.getElementById('receiptFooter').value.trim();
    appData.companySettings.reportFooter = document.getElementById('reportFooter').value.trim();
    appData.companySettings.fiscalYearStart = document.getElementById('fiscalYearStart').value.trim();
    
    saveToStorage('companySettings');
    closeModal('companySettingsModal');
    showNotification('Company settings saved successfully!', false, 'success');
    
    // Update company name in header if displayed
    updateCompanyNameDisplay();
}

// ========== UPDATE COMPANY NAME DISPLAY ==========
function updateCompanyNameDisplay() {
    const companyNameElements = document.querySelectorAll('.company-name-display');
    companyNameElements.forEach(el => {
        el.textContent = appData.companySettings.companyName;
    });
}

// ========== GET COMPANY HEADER HTML (for exports) ==========
function getCompanyHeaderHTML(documentTitle = '') {
    const settings = appData.companySettings;
    
    return `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
            <div style="flex: 1;">
                ${settings.companyLogo ? `
                    <img src="${settings.companyLogo}" style="max-width: 200px; max-height: 80px; margin-bottom: 12px;">
                ` : `
                    <h2 style="margin: 0 0 8px 0; color: #1f2937; font-size: 24px;">${settings.companyName}</h2>
                `}
                <div style="font-size: 13px; line-height: 1.6; color: #6b7280;">
                    ${settings.address ? `${settings.address}<br>` : ''}
                    ${settings.city ? `${settings.city}, ` : ''}${settings.region || ''}<br>
                    ${settings.country || 'Malawi'}<br>
                    ${settings.phone ? `<strong>Tel:</strong> ${settings.phone}<br>` : ''}
                    ${settings.email ? `<strong>Email:</strong> ${settings.email}<br>` : ''}
                    ${settings.website ? `<strong>Web:</strong> ${settings.website}<br>` : ''}
                    ${settings.taxId ? `<strong>TIN:</strong> ${settings.taxId}` : ''}
                </div>
            </div>
            <div style="text-align: right;">
                ${documentTitle ? `<h1 style="margin: 0 0 8px 0; color: #1f2937; font-size: 28px;">${documentTitle}</h1>` : ''}
            </div>
        </div>
    `;
}

// ========== GET COMPANY FOOTER HTML (for exports) ==========
function getCompanyFooterHTML(footerType = 'report') {
    const settings = appData.companySettings;
    let footerText = '';
    
    switch(footerType) {
        case 'invoice':
            footerText = settings.invoiceFooter || 'Thank you for your business!';
            break;
        case 'quotation':
            footerText = settings.quotationFooter || 'We look forward to working with you!';
            break;
        case 'receipt':
            footerText = settings.receiptFooter || 'Payment received with thanks.';
            break;
        case 'report':
        default:
            footerText = settings.reportFooter || 'Confidential - For Internal Use Only';
    }
    
    return `
        <div style="margin-top: 48px; padding-top: 16px; border-top: 2px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
            <p style="margin: 0 0 8px 0;">${footerText}</p>
            ${settings.bankName ? `
                <p style="margin: 8px 0 0 0;">
                    <strong>Banking Details:</strong> ${settings.bankName} • 
                    ${settings.bankAccountName || settings.companyName} • 
                    Acc: ${settings.bankAccountNumber || 'N/A'}
                </p>
            ` : ''}
        </div>
    `;
}

// ========== MAKE FUNCTIONS GLOBALLY AVAILABLE ==========
window.showCompanySettings = showCompanySettings;
window.handleLogoUpload = handleLogoUpload;
window.removeCompanyLogo = removeCompanyLogo;
window.saveCompanySettings = saveCompanySettings;
window.updateCompanyNameDisplay = updateCompanyNameDisplay;
window.getCompanyHeaderHTML = getCompanyHeaderHTML;
window.getCompanyFooterHTML = getCompanyFooterHTML;

// Initialize company name display on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCompanyNameDisplay);
} else {
    updateCompanyNameDisplay();
}
