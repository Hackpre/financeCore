// ========== TAX MANAGEMENT SYSTEM ==========
let taxRates = {
    'VAT': { rate: 16.5, description: 'Value Added Tax', type: 'percentage', code: 'VAT16.5' },
    'WITHHOLDING': { rate: 10, description: 'Withholding Tax', type: 'percentage', code: 'WHT10' },
    'SERVICE': { rate: 18, description: 'Service Tax', type: 'percentage', code: 'SERVICE18' },
    'EXPORT': { rate: 0, description: 'Export (Zero Rated)', type: 'percentage', code: 'EXPORT0' },
    'EXEMPT': { rate: 0, description: 'Exempt from Tax', type: 'percentage', code: 'EXEMPT' }
};

// ========== ACCOUNTING SETTINGS ==========
function addAccountingSettings() {
    const settingsBar = document.querySelector('.settings-bar');
    
    // Add after industry selector
    const accountingSetting = `
        <div class="setting-row" style="flex-direction: column; align-items: stretch; gap: 8px;">
            <span>📊 Accounting Method</span>
            <div class="industry-selector" style="margin-top: 5px;">
                <button class="accounting-option active" data-method="accrual">Accrual</button>
                <button class="accounting-option" data-method="cash">Cash Basis</button>
            </div>
        </div>
        
        <div class="setting-row" style="flex-direction: column; align-items: stretch; gap: 8px;">
            <span>🏷️ Tax Settings</span>
            <button class="btn btn-sm" style="width: 100%; margin-top: 5px;" onclick="showTaxSettingsModal()">
                Manage Tax Rates
            </button>
        </div>
    `;
    
    // Insert after industry selector
    const industrySelector = document.querySelector('.industry-selector');
    if (industrySelector && industrySelector.parentNode) {
        industrySelector.parentNode.insertAdjacentHTML('afterend', accountingSetting);
    }
}

// Initialize accounting settings when app loads
function initializeAccountingSettings() {
    addAccountingSettings();
    
    // Add event listeners for accounting method buttons
    document.querySelectorAll('.accounting-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            switchAccountingMethod(method);
        });
    });
}

// Switch accounting method
function switchAccountingMethod(method) {
    appData.accountingMethod = method;
    localStorage.setItem('accountingMethod', method);
    
    document.querySelectorAll('.accounting-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-method') === method);
    });
    
    showNotification(`Accounting method switched to ${method === 'accrual' ? 'Accrual' : 'Cash Basis'}`, false, 'info');
}

// ========== TAX SETTINGS MODAL ==========
function showTaxSettingsModal() {
    const modalHtml = `
        <div class="modal" id="taxSettingsModal" style="display: flex;">
            <div class="modal-content" style="max-width: 800px;">
                <button class="modal-close" onclick="closeModal('taxSettingsModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Tax Rate Management</h2>
                    <p class="page-subtitle">Configure tax rates for quotes, invoices, and sales</p>
                </div>
                
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">Current Tax Rates</h3>
                        <button class="btn btn-primary btn-sm" onclick="addNewTaxRate()">+ Add Tax Rate</button>
                    </div>
                    <div class="table-container">
                        <table id="taxRatesTable">
                            <thead>
                                <tr>
                                    <th>Tax Code</th>
                                    <th>Description</th>
                                    <th>Rate (%)</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="taxRatesTableBody">
                                <!-- Tax rates will be populated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Tax Configuration</h3>
                    </div>
                    <form id="taxConfigForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Default Tax for Sales</label>
                                <select class="form-select" id="defaultSalesTax">
                                    <option value="VAT">VAT (16.5%)</option>
                                    <option value="EXEMPT">Exempt</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Default Tax for Services</label>
                                <select class="form-select" id="defaultServiceTax">
                                    <option value="SERVICE">Service Tax (18%)</option>
                                    <option value="VAT">VAT (16.5%)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tax Inclusive Pricing</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="taxInclusive" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Auto-calculate Tax</label>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="autoCalculateTax" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline" onclick="closeModal('taxSettingsModal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Tax Settings</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Populate tax rates table
    populateTaxRatesTable();
    
    // Load saved settings
    loadTaxSettings();
    
    // Add form submit handler
    document.getElementById('taxConfigForm').onsubmit = function(e) {
        e.preventDefault();
        saveTaxSettings();
    };
}

function populateTaxRatesTable() {
    const tbody = document.getElementById('taxRatesTableBody');
    if (!tbody) return;
    
    let html = '';
    Object.keys(taxRates).forEach(key => {
        const tax = taxRates[key];
        html += `
            <tr>
                <td><strong>${tax.code}</strong></td>
                <td>${tax.description}</td>
                <td>${tax.rate}%</td>
                <td>${tax.type}</td>
                <td>
                    <span class="status-badge ${key === 'VAT' ? 'status-paid' : 'status-pending'}">
                        ${key === 'VAT' ? 'Default' : 'No'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm action-btn btn-primary" onclick="editTaxRate('${key}')">Edit</button>
                    <button class="btn btn-sm action-btn btn-danger" onclick="deleteTaxRate('${key}')" ${key === 'VAT' ? 'disabled' : ''}>Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function addNewTaxRate() {
    const taxCode = prompt('Enter tax code (e.g., VAT, WHT):', 'NEWTAX');
    if (!taxCode) return;
    
    const taxRate = parseFloat(prompt('Enter tax rate (%):', '10'));
    if (isNaN(taxRate)) return;
    
    const description = prompt('Enter tax description:', 'New Tax Rate');
    
    taxRates[taxCode] = {
        rate: taxRate,
        description: description,
        type: 'percentage',
        code: taxCode
    };
    
    saveTaxData();
    populateTaxRatesTable();
    showNotification(`Tax rate ${taxCode} added successfully!`, false, 'success');
}

function editTaxRate(taxCode) {
    const tax = taxRates[taxCode];
    if (!tax) return;
    
    const newRate = parseFloat(prompt(`Enter new rate for ${taxCode} (current: ${tax.rate}%):`, tax.rate));
    if (isNaN(newRate)) return;
    
    tax.rate = newRate;
    tax.description = prompt('Enter new description:', tax.description) || tax.description;
    
    saveTaxData();
    populateTaxRatesTable();
    showNotification(`Tax rate ${taxCode} updated to ${newRate}%`, false, 'success');
}

function deleteTaxRate(taxCode) {
    if (taxCode === 'VAT' || taxCode === 'EXEMPT') {
        showNotification('Cannot delete default tax rates', true, 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete tax rate ${taxCode}?`)) {
        delete taxRates[taxCode];
        saveTaxData();
        populateTaxRatesTable();
        showNotification(`Tax rate ${taxCode} deleted`, false, 'success');
    }
}

function saveTaxSettings() {
    const settings = {
        defaultSalesTax: document.getElementById('defaultSalesTax').value,
        defaultServiceTax: document.getElementById('defaultServiceTax').value,
        taxInclusive: document.getElementById('taxInclusive').checked,
        autoCalculateTax: document.getElementById('autoCalculateTax').checked
    };
    
    localStorage.setItem('taxSettings', JSON.stringify(settings));
    showNotification('Tax settings saved successfully!', false, 'success');
    setTimeout(() => closeModal('taxSettingsModal'), 1000);
}

function loadTaxSettings() {
    const saved = localStorage.getItem('taxSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        document.getElementById('defaultSalesTax').value = settings.defaultSalesTax || 'VAT';
        document.getElementById('defaultServiceTax').value = settings.defaultServiceTax || 'SERVICE';
        document.getElementById('taxInclusive').checked = settings.taxInclusive !== false;
        document.getElementById('autoCalculateTax').checked = settings.autoCalculateTax !== false;
    }
}

function saveTaxData() {
    localStorage.setItem('taxRates', JSON.stringify(taxRates));
}

function loadTaxData() {
    const saved = localStorage.getItem('taxRates');
    if (saved) {
        taxRates = JSON.parse(saved);
    }
}

// Initialize tax system
if (typeof appData !== 'undefined') {
    // Load tax data when app loads
    document.addEventListener('DOMContentLoaded', function() {
        loadTaxData();
        if (document.getElementById('mainApp') && document.getElementById('mainApp').style.display !== 'none') {
            initializeAccountingSettings();
        }
    });
}