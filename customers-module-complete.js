// ========== COMPREHENSIVE CUSTOMERS MODULE ==========
// Full customer management with statements, aging, credit tracking, and analytics

// ========== LOAD CUSTOMERS TABLE WITH FILTERS ==========
function loadCustomersTable(filters = {}) {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    
    if (!appData.customers) appData.customers = [];
    
    // Apply filters
    let customers = [...appData.customers];
    
    if (filters.status && filters.status !== 'all') {
        customers = customers.filter(c => c.status === filters.status);
    }
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        customers = customers.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.contact.toLowerCase().includes(searchTerm) ||
            c.email.toLowerCase().includes(searchTerm) ||
            (c.phone && c.phone.includes(searchTerm)) ||
            (c.customerCode && c.customerCode.toLowerCase().includes(searchTerm))
        );
    }
    
    if (filters.category && filters.category !== 'all') {
        customers = customers.filter(c => c.category === filters.category);
    }
    
    // Sort by name
    customers.sort((a, b) => a.name.localeCompare(b.name));
    
    let html = '';
    customers.forEach(customer => {
        const statusClass = customer.status === 'active' ? 'status-paid' : 'status-overdue';
        const receivables = customer.receivables || 0;
        const creditLimit = customer.creditLimit || 0;
        const creditUsed = creditLimit > 0 ? ((receivables / creditLimit) * 100).toFixed(0) : 0;
        const creditWarning = creditUsed > 80 ? '⚠️' : '';
        
        html += `
            <tr>
                <td>
                    <strong>${customer.customerCode || 'N/A'}</strong><br>
                    <small style="color: var(--text-secondary);">${customer.name}</small>
                </td>
                <td>${customer.contact}</td>
                <td>
                    ${customer.email}<br>
                    <small style="color: var(--text-secondary);">${customer.phone || 'N/A'}</small>
                </td>
                <td>${customer.category || 'General'}</td>
                <td class="text-right">
                    <strong style="color: ${receivables > 0 ? 'var(--danger)' : 'var(--success)'};">
                        MWK ${receivables.toLocaleString()}
                    </strong>
                </td>
                <td class="text-right">
                    MWK ${creditLimit.toLocaleString()}
                    ${creditWarning ? `<br><small style="color: var(--warning);">${creditWarning} ${creditUsed}% used</small>` : ''}
                </td>
                <td><span class="status-badge ${statusClass}">${customer.status?.toUpperCase() || 'ACTIVE'}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewCustomer(${customer.id})" title="View Details">👁️</button>
                    <button class="btn btn-sm btn-success action-btn" onclick="editCustomer(${customer.id})" title="Edit">✏️</button>
                    <button class="btn btn-sm btn-secondary action-btn" onclick="showCustomerStatement(${customer.id})" title="Statement">📄</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteCustomer(${customer.id})" title="Delete">🗑️</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="8" class="text-center" style="padding: 40px;">No customers found. Click "+ New Customer" to add one.</td></tr>';
    
    // Update stats
    updateCustomerStats(customers);
}

// ========== UPDATE CUSTOMER STATS ==========
function updateCustomerStats(customers = null) {
    if (!customers) customers = appData.customers || [];
    
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalReceivables = customers.reduce((sum, c) => sum + (c.receivables || 0), 0);
    const overdueCustomers = customers.filter(c => (c.receivables || 0) > 0).length;
    
    // Update stat cards if they exist
    const totalCustomersStat = document.getElementById('totalCustomersStat');
    const activeCustomersStat = document.getElementById('activeCustomersStat');
    const totalReceivablesStat = document.getElementById('totalReceivablesStat');
    const overdueCustomersStat = document.getElementById('overdueCustomersStat');
    
    if (totalCustomersStat) totalCustomersStat.textContent = totalCustomers;
    if (activeCustomersStat) activeCustomersStat.textContent = activeCustomers;
    if (totalReceivablesStat) totalReceivablesStat.textContent = `MWK ${totalReceivables.toLocaleString()}`;
    if (overdueCustomersStat) overdueCustomersStat.textContent = overdueCustomers;
}

// ========== SHOW CUSTOMER MODAL (CREATE OR EDIT) ==========
function showCustomerModal(customerId = null) {
    const customer = customerId ? appData.customers.find(c => c.id === customerId) : null;
    const isEdit = !!customer;
    
    const modalHtml = `
        <div class="modal active" id="customerModal">
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close" onclick="closeModal('customerModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add New'} Customer</h2>
                    <p class="page-subtitle">Complete customer information and credit settings</p>
                </div>
                <form id="customerForm" onsubmit="saveCustomer(event, ${customerId || 'null'})">
                    <!-- Basic Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📋 Basic Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Customer Code</label>
                            <input type="text" class="form-input" id="customerCode" 
                                   value="${customer?.customerCode || ''}" 
                                   placeholder="Auto-generated if empty"
                                   ${isEdit ? 'readonly style="background: var(--bg-tertiary);"' : ''}>
                            <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                                Unique identifier (e.g., CUST-001)
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Customer Category</label>
                            <select class="form-select" id="customerCategory">
                                <option value="General" ${customer?.category === 'General' ? 'selected' : ''}>General</option>
                                <option value="Corporate" ${customer?.category === 'Corporate' ? 'selected' : ''}>Corporate</option>
                                <option value="Government" ${customer?.category === 'Government' ? 'selected' : ''}>Government</option>
                                <option value="NGO" ${customer?.category === 'NGO' ? 'selected' : ''}>NGO</option>
                                <option value="SME" ${customer?.category === 'SME' ? 'selected' : ''}>SME</option>
                                <option value="Individual" ${customer?.category === 'Individual' ? 'selected' : ''}>Individual</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Company/Full Name *</label>
                            <input type="text" class="form-input" id="customerName" 
                                   value="${customer?.name || ''}" required 
                                   placeholder="e.g., Acme Corporation">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Person *</label>
                            <input type="text" class="form-input" id="customerContact" 
                                   value="${customer?.contact || ''}" required 
                                   placeholder="e.g., John Doe">
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📞 Contact Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="customerEmail" 
                                   value="${customer?.email || ''}" required 
                                   placeholder="customer@example.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone *</label>
                            <input type="tel" class="form-input" id="customerPhone" 
                                   value="${customer?.phone || ''}" required 
                                   placeholder="+265 888 123 456">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Mobile/Alternative Phone</label>
                            <input type="tel" class="form-input" id="customerMobile" 
                                   value="${customer?.mobile || ''}" 
                                   placeholder="+265 999 123 456">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Website</label>
                            <input type="url" class="form-input" id="customerWebsite" 
                                   value="${customer?.website || ''}" 
                                   placeholder="https://www.example.com">
                        </div>
                    </div>
                    
                    <!-- Address Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        🏢 Address Information
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Street Address</label>
                            <input type="text" class="form-input" id="customerAddress" 
                                   value="${customer?.address || ''}" 
                                   placeholder="123 Main Street">
                        </div>
                        <div class="form-group">
                            <label class="form-label">City</label>
                            <input type="text" class="form-input" id="customerCity" 
                                   value="${customer?.city || ''}" 
                                   placeholder="Blantyre">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Region/State</label>
                            <input type="text" class="form-input" id="customerRegion" 
                                   value="${customer?.region || ''}" 
                                   placeholder="Southern Region">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Country</label>
                            <input type="text" class="form-input" id="customerCountry" 
                                   value="${customer?.country || 'Malawi'}" 
                                   placeholder="Malawi">
                        </div>
                    </div>
                    
                    <!-- Financial Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        💰 Financial Settings
                    </h3>
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Tax ID / TIN</label>
                            <input type="text" class="form-input" id="customerTaxId" 
                                   value="${customer?.taxId || ''}" 
                                   placeholder="e.g., TIN123456">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Credit Limit (MWK)</label>
                            <input type="number" class="form-input" id="customerCreditLimit" 
                                   value="${customer?.creditLimit || 0}" min="0" step="1000"
                                   placeholder="0 = No limit">
                            <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                                Maximum amount customer can owe
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Payment Terms (Days)</label>
                            <select class="form-select" id="customerPaymentTerms">
                                <option value="0" ${customer?.paymentTerms === 0 ? 'selected' : ''}>Due on Receipt</option>
                                <option value="7" ${customer?.paymentTerms === 7 ? 'selected' : ''}>Net 7</option>
                                <option value="15" ${customer?.paymentTerms === 15 ? 'selected' : ''}>Net 15</option>
                                <option value="30" ${customer?.paymentTerms === 30 || !customer ? 'selected' : ''}>Net 30</option>
                                <option value="60" ${customer?.paymentTerms === 60 ? 'selected' : ''}>Net 60</option>
                                <option value="90" ${customer?.paymentTerms === 90 ? 'selected' : ''}>Net 90</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Currency</label>
                            <select class="form-select" id="customerCurrency">
                                <option value="MWK" ${customer?.currency === 'MWK' || !customer ? 'selected' : ''}>MWK - Malawi Kwacha</option>
                                <option value="USD" ${customer?.currency === 'USD' ? 'selected' : ''}>USD - US Dollar</option>
                                <option value="EUR" ${customer?.currency === 'EUR' ? 'selected' : ''}>EUR - Euro</option>
                                <option value="GBP" ${customer?.currency === 'GBP' ? 'selected' : ''}>GBP - British Pound</option>
                                <option value="ZAR" ${customer?.currency === 'ZAR' ? 'selected' : ''}>ZAR - South African Rand</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Additional Information -->
                    <h3 style="margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
                        📝 Additional Information
                    </h3>
                    <div class="form-group mb-3">
                        <label class="form-label">Notes / Comments</label>
                        <textarea class="form-textarea" id="customerNotes" rows="3" 
                                  placeholder="Any special notes about this customer...">${customer?.notes || ''}</textarea>
                    </div>
                    
                    <div class="form-group mb-3">
                        <label class="form-label">Status</label>
                        <select class="form-select" id="customerStatus">
                            <option value="active" ${customer?.status !== 'inactive' ? 'selected' : ''}>Active</option>
                            <option value="inactive" ${customer?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('customerModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Create'} Customer</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Continue in next part...
// ========== CUSTOMERS MODULE PART 2 ==========
// Save, View, Edit, Delete, Statements, and Reports

// ========== SAVE CUSTOMER ==========
function saveCustomer(e, customerId) {
    e.preventDefault();
    
    const customerCode = document.getElementById('customerCode').value.trim() || null;
    const name = document.getElementById('customerName').value.trim();
    const contact = document.getElementById('customerContact').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    
    // Check for duplicate email (except own when editing)
    const duplicateEmail = appData.customers.find(c => 
        c.email.toLowerCase() === email.toLowerCase() && c.id !== customerId
    );
    
    if (duplicateEmail) {
        showNotification(`Email ${email} is already used by another customer!`, true, 'error');
        return;
    }
    
    // Check for duplicate customer code (except own when editing)
    if (customerCode) {
        const duplicateCode = appData.customers.find(c => 
            c.customerCode === customerCode && c.id !== customerId
        );
        
        if (duplicateCode) {
            showNotification(`Customer code ${customerCode} is already in use!`, true, 'error');
            return;
        }
    }
    
    const customerData = {
        customerCode: customerCode || generateCustomerCode(),
        name: name,
        contact: contact,
        email: email,
        phone: phone,
        mobile: document.getElementById('customerMobile').value.trim(),
        website: document.getElementById('customerWebsite').value.trim(),
        address: document.getElementById('customerAddress').value.trim(),
        city: document.getElementById('customerCity').value.trim(),
        region: document.getElementById('customerRegion').value.trim(),
        country: document.getElementById('customerCountry').value.trim() || 'Malawi',
        taxId: document.getElementById('customerTaxId').value.trim(),
        creditLimit: parseFloat(document.getElementById('customerCreditLimit').value) || 0,
        paymentTerms: parseInt(document.getElementById('customerPaymentTerms').value) || 30,
        currency: document.getElementById('customerCurrency').value || 'MWK',
        category: document.getElementById('customerCategory').value,
        notes: document.getElementById('customerNotes').value.trim(),
        status: document.getElementById('customerStatus').value,
        lastModified: new Date().toISOString()
    };
    
    if (customerId) {
        // Edit existing customer
        const index = appData.customers.findIndex(c => c.id === customerId);
        if (index !== -1) {
            const existingCustomer = appData.customers[index];
            appData.customers[index] = {
                ...existingCustomer,
                ...customerData
            };
            showNotification(`Customer ${name} updated successfully!`, false, 'success');
        }
    } else {
        // Create new customer
        const newId = appData.customers.length > 0 ? Math.max(...appData.customers.map(c => c.id)) + 1 : 1;
        appData.customers.push({
            id: newId,
            ...customerData,
            receivables: 0,
            totalSales: 0,
            totalInvoices: 0,
            createdDate: new Date().toISOString()
        });
        showNotification(`Customer ${name} created successfully!`, false, 'success');
    }
    
    saveToStorage('customers');
    closeModal('customerModal');
    loadCustomersTable();
}

// ========== GENERATE CUSTOMER CODE ==========
function generateCustomerCode() {
    const existingCodes = appData.customers.map(c => c.customerCode).filter(Boolean);
    let newNumber = 1;
    
    if (existingCodes.length > 0) {
        // Extract numbers from existing codes
        const numbers = existingCodes
            .map(code => parseInt(code.replace(/\D/g, '')))
            .filter(n => !isNaN(n));
        
        if (numbers.length > 0) {
            newNumber = Math.max(...numbers) + 1;
        }
    }
    
    return `CUST-${String(newNumber).padStart(4, '0')}`;
}

// ========== VIEW CUSTOMER DETAILS ==========
function viewCustomer(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    // Get customer transactions
    const invoices = (appData.invoices || []).filter(inv => inv.customerId === id);
    const totalSales = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
    
    const creditUsedPercent = customer.creditLimit > 0 ? 
        ((customer.receivables / customer.creditLimit) * 100).toFixed(1) : 0;
    
    const modalHtml = `
        <div class="modal active" id="viewCustomerModal">
            <div class="modal-content" style="max-width: 1000px;">
                <button class="modal-close" onclick="closeModal('viewCustomerModal')">×</button>
                <div class="modal-header">
                    <div>
                        <h2 class="modal-title">${customer.name}</h2>
                        <p class="page-subtitle">${customer.customerCode} • ${customer.category || 'General'}</p>
                    </div>
                    <span class="status-badge ${customer.status === 'active' ? 'status-paid' : 'status-overdue'}">
                        ${customer.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                </div>
                
                <!-- Quick Stats -->
                <div class="stats-grid mb-3">
                    <div class="stat-card">
                        <div class="stat-label">Total Sales</div>
                        <div class="stat-value">MWK ${totalSales.toLocaleString()}</div>
                        <div class="stat-change">${invoices.length} invoices</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Outstanding</div>
                        <div class="stat-value" style="color: ${customer.receivables > 0 ? 'var(--danger)' : 'var(--success)'};">
                            MWK ${(customer.receivables || 0).toLocaleString()}
                        </div>
                        <div class="stat-change ${overdueInvoices > 0 ? 'negative' : ''}">${overdueInvoices} overdue</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Credit Limit</div>
                        <div class="stat-value">MWK ${customer.creditLimit.toLocaleString()}</div>
                        <div class="stat-change ${creditUsedPercent > 80 ? 'negative' : ''}">
                            ${creditUsedPercent}% used
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Payment Terms</div>
                        <div class="stat-value">${customer.paymentTerms} days</div>
                        <div class="stat-change">${paidInvoices} paid on time</div>
                    </div>
                </div>
                
                <!-- Contact Information -->
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">Contact Information</h3>
                    </div>
                    <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Contact Person</div>
                            <strong>${customer.contact}</strong>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Email</div>
                            <strong><a href="mailto:${customer.email}" style="color: var(--primary);">${customer.email}</a></strong>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Phone</div>
                            <strong><a href="tel:${customer.phone}" style="color: var(--primary);">${customer.phone}</a></strong>
                        </div>
                        ${customer.mobile ? `
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Mobile</div>
                            <strong><a href="tel:${customer.mobile}" style="color: var(--primary);">${customer.mobile}</a></strong>
                        </div>
                        ` : ''}
                        ${customer.website ? `
                        <div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Website</div>
                            <strong><a href="${customer.website}" target="_blank" style="color: var(--primary);">${customer.website}</a></strong>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Address & Financial -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Address</h3>
                        </div>
                        <div style="padding: 20px;">
                            ${customer.address ? `${customer.address}<br>` : ''}
                            ${customer.city ? `${customer.city}, ` : ''}${customer.region || ''}<br>
                            ${customer.country || 'Malawi'}
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Financial Details</h3>
                        </div>
                        <div style="padding: 20px;">
                            <strong>Tax ID:</strong> ${customer.taxId || 'N/A'}<br>
                            <strong>Currency:</strong> ${customer.currency || 'MWK'}<br>
                            <strong>Payment Terms:</strong> Net ${customer.paymentTerms} days
                        </div>
                    </div>
                </div>
                
                <!-- Recent Invoices -->
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">Recent Invoices</h3>
                        <button class="btn btn-sm btn-primary" onclick="closeModal('viewCustomerModal'); createInvoiceForCustomer(${id})">
                            + New Invoice
                        </button>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice #</th>
                                    <th>Date</th>
                                    <th>Due Date</th>
                                    <th class="text-right">Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoices.length > 0 ? invoices.slice(0, 5).map(inv => `
                                    <tr>
                                        <td><strong>${inv.number || inv.id}</strong></td>
                                        <td>${inv.date || 'N/A'}</td>
                                        <td>${inv.dueDate || 'N/A'}</td>
                                        <td class="text-right"><strong>MWK ${(inv.total || 0).toLocaleString()}</strong></td>
                                        <td><span class="status-badge status-${inv.status}">${inv.status?.toUpperCase()}</span></td>
                                    </tr>
                                `).join('') : '<tr><td colspan="5" class="text-center">No invoices yet</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                ${customer.notes ? `
                <div class="card mb-3">
                    <div class="card-header">
                        <h3 class="card-title">Notes</h3>
                    </div>
                    <div style="padding: 20px;">
                        ${customer.notes}
                    </div>
                </div>
                ` : ''}
                
                <!-- Metadata -->
                <div style="padding: 12px; background: var(--bg-tertiary); border-radius: 8px; font-size: 12px; color: var(--text-secondary);">
                    <strong>Created:</strong> ${formatDateTime(customer.createdDate)} • 
                    <strong>Last Modified:</strong> ${formatDateTime(customer.lastModified)}
                </div>
                
                <div class="btn-group mt-3">
                    <button class="btn btn-outline" onclick="closeModal('viewCustomerModal')">Close</button>
                    <button class="btn btn-success" onclick="closeModal('viewCustomerModal'); editCustomer(${id})">Edit Customer</button>
                    <button class="btn btn-primary" onclick="showCustomerStatement(${id})">View Statement</button>
                    <button class="btn btn-secondary" onclick="exportCustomerData(${id})">📥 Export</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ========== EDIT CUSTOMER ==========
function editCustomer(id) {
    showCustomerModal(id);
}

// ========== DELETE CUSTOMER ==========
function deleteCustomer(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    // Check if customer has invoices
    const hasInvoices = (appData.invoices || []).some(inv => inv.customerId === id);
    
    if (hasInvoices) {
        if (!confirm(`⚠️ WARNING: ${customer.name} has invoices!\n\nDeleting this customer may cause issues. Instead, you can mark them as Inactive.\n\nAre you sure you want to DELETE this customer?`)) {
            return;
        }
    } else {
        if (!confirm(`Delete customer ${customer.name}?`)) {
            return;
        }
    }
    
    appData.customers = appData.customers.filter(c => c.id !== id);
    saveToStorage('customers');
    loadCustomersTable();
    showNotification(`Customer ${customer.name} deleted successfully!`, false, 'success');
}

// Continue in next part...
// ========== CUSTOMERS MODULE PART 3 ==========
// Statements, Aging Reports, Analytics, and Export Functions

// ========== SHOW CUSTOMER STATEMENT ==========
function showCustomerStatement(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    // Get all transactions for this customer
    const invoices = (appData.invoices || []).filter(inv => inv.customerId === id);
    const receipts = (appData.receipts || []).filter(rec => rec.customerId === id);
    
    // Combine and sort by date
    const transactions = [
        ...invoices.map(inv => ({
            date: inv.date,
            type: 'Invoice',
            reference: inv.number || `INV-${inv.id}`,
            description: inv.description || 'Sales Invoice',
            debit: inv.total || 0,
            credit: 0,
            balance: 0
        })),
        ...receipts.map(rec => ({
            date: rec.date,
            type: 'Payment',
            reference: rec.number || `REC-${rec.id}`,
            description: rec.description || 'Payment Received',
            debit: 0,
            credit: rec.amount || 0,
            balance: 0
        }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate running balance
    let runningBalance = 0;
    transactions.forEach(txn => {
        runningBalance += (txn.debit - txn.credit);
        txn.balance = runningBalance;
    });
    
    const modalHtml = `
        <div class="modal active" id="statementModal">
            <div class="modal-content" style="max-width: 1100px;">
                <button class="modal-close" onclick="closeModal('statementModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Customer Statement</h2>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary btn-sm" onclick="printStatement()">🖨️ Print</button>
                        <button class="btn btn-success btn-sm" onclick="exportStatementPDF(${id})">📄 PDF</button>
                        <button class="btn btn-primary btn-sm" onclick="exportStatementExcel(${id})">📗 Excel</button>
                    </div>
                </div>
                
                <div id="statementContent" style="padding: 20px;">
                    <!-- Statement Header -->
                    <div style="display: flex; justify-content: space-between; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid var(--border);">
                        <div>
                            <h3 style="margin-bottom: 8px;">STATEMENT OF ACCOUNT</h3>
                            <strong>${customer.name}</strong><br>
                            ${customer.address ? `${customer.address}<br>` : ''}
                            ${customer.city ? `${customer.city}, ${customer.region || ''}<br>` : ''}
                            ${customer.country || 'Malawi'}<br>
                            <br>
                            <strong>Contact:</strong> ${customer.contact}<br>
                            <strong>Email:</strong> ${customer.email}<br>
                            <strong>Phone:</strong> ${customer.phone}
                        </div>
                        <div style="text-align: right;">
                            <strong>Statement Date:</strong> ${new Date().toLocaleDateString('en-GB')}<br>
                            <strong>Customer Code:</strong> ${customer.customerCode}<br>
                            <strong>Payment Terms:</strong> Net ${customer.paymentTerms} days<br>
                            <br>
                            <div style="padding: 12px; background: var(--bg-tertiary); border-radius: 8px; margin-top: 16px;">
                                <strong>Current Balance</strong><br>
                                <span style="font-size: 24px; font-weight: 700; color: ${customer.receivables > 0 ? 'var(--danger)' : 'var(--success)'};">
                                    MWK ${(customer.receivables || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Transaction Table -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <thead>
                            <tr style="background: var(--bg-tertiary); border-bottom: 2px solid var(--border);">
                                <th style="padding: 12px; text-align: left;">Date</th>
                                <th style="padding: 12px; text-align: left;">Type</th>
                                <th style="padding: 12px; text-align: left;">Reference</th>
                                <th style="padding: 12px; text-align: left;">Description</th>
                                <th style="padding: 12px; text-align: right;">Charges</th>
                                <th style="padding: 12px; text-align: right;">Payments</th>
                                <th style="padding: 12px; text-align: right;">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.length > 0 ? transactions.map(txn => `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 8px;">${formatDate(txn.date)}</td>
                                    <td style="padding: 8px;">${txn.type}</td>
                                    <td style="padding: 8px;"><strong>${txn.reference}</strong></td>
                                    <td style="padding: 8px;">${txn.description}</td>
                                    <td style="padding: 8px; text-align: right;">${txn.debit > 0 ? 'MWK ' + txn.debit.toLocaleString() : '-'}</td>
                                    <td style="padding: 8px; text-align: right;">${txn.credit > 0 ? 'MWK ' + txn.credit.toLocaleString() : '-'}</td>
                                    <td style="padding: 8px; text-align: right;"><strong>MWK ${txn.balance.toLocaleString()}</strong></td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="7" style="padding: 40px; text-align: center; color: var(--text-secondary);">
                                        No transactions found
                                    </td>
                                </tr>
                            `}
                        </tbody>
                        <tfoot>
                            <tr style="background: var(--bg-tertiary); border-top: 2px solid var(--border); font-weight: 700;">
                                <td colspan="4" style="padding: 12px;">TOTAL</td>
                                <td style="padding: 12px; text-align: right;">
                                    MWK ${transactions.reduce((sum, t) => sum + t.debit, 0).toLocaleString()}
                                </td>
                                <td style="padding: 12px; text-align: right;">
                                    MWK ${transactions.reduce((sum, t) => sum + t.credit, 0).toLocaleString()}
                                </td>
                                <td style="padding: 12px; text-align: right; color: ${customer.receivables > 0 ? 'var(--danger)' : 'var(--success)'};">
                                    MWK ${(customer.receivables || 0).toLocaleString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    ${customer.receivables > 0 ? `
                    <div style="padding: 16px; background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--danger); border-radius: 4px;">
                        <strong>Payment Due:</strong> MWK ${customer.receivables.toLocaleString()}<br>
                        <small>Please remit payment within ${customer.paymentTerms} days</small>
                    </div>
                    ` : `
                    <div style="padding: 16px; background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--success); border-radius: 4px;">
                        <strong>✓ Account is up to date</strong><br>
                        <small>No outstanding balance</small>
                    </div>
                    `}
                </div>
                
                <div class="btn-group">
                    <button class="btn btn-outline" onclick="closeModal('statementModal')">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ========== SHOW AGING REPORT ==========
function showAgingReport() {
    const customers = appData.customers || [];
    const invoices = appData.invoices || [];
    
    // Calculate aging for each customer
    const agingData = customers.map(customer => {
        const customerInvoices = invoices.filter(inv => 
            inv.customerId === customer.id && inv.status !== 'paid'
        );
        
        const aging = {
            customerId: customer.id,
            customerName: customer.name,
            current: 0,
            days30: 0,
            days60: 0,
            days90: 0,
            days90plus: 0,
            total: 0
        };
        
        const today = new Date();
        
        customerInvoices.forEach(inv => {
            const dueDate = new Date(inv.dueDate);
            const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
            const amount = inv.total || 0;
            
            if (daysOverdue <= 0) {
                aging.current += amount;
            } else if (daysOverdue <= 30) {
                aging.days30 += amount;
            } else if (daysOverdue <= 60) {
                aging.days60 += amount;
            } else if (daysOverdue <= 90) {
                aging.days90 += amount;
            } else {
                aging.days90plus += amount;
            }
            
            aging.total += amount;
        });
        
        return aging;
    }).filter(a => a.total > 0); // Only show customers with outstanding balances
    
    // Calculate totals
    const totals = {
        current: agingData.reduce((sum, a) => sum + a.current, 0),
        days30: agingData.reduce((sum, a) => sum + a.days30, 0),
        days60: agingData.reduce((sum, a) => sum + a.days60, 0),
        days90: agingData.reduce((sum, a) => sum + a.days90, 0),
        days90plus: agingData.reduce((sum, a) => sum + a.days90plus, 0),
        total: agingData.reduce((sum, a) => sum + a.total, 0)
    };
    
    const modalHtml = `
        <div class="modal active" id="agingReportModal">
            <div class="modal-content" style="max-width: 1200px;">
                <button class="modal-close" onclick="closeModal('agingReportModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Accounts Receivable Aging Report</h2>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print</button>
                        <button class="btn btn-success btn-sm" onclick="exportAgingReportExcel()">📗 Excel</button>
                    </div>
                </div>
                
                <div style="padding: 20px;">
                    <p style="margin-bottom: 24px; color: var(--text-secondary);">
                        Report Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    
                    <!-- Summary Cards -->
                    <div class="stats-grid mb-3">
                        <div class="stat-card">
                            <div class="stat-label">Current</div>
                            <div class="stat-value" style="color: var(--success);">MWK ${totals.current.toLocaleString()}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">1-30 Days</div>
                            <div class="stat-value" style="color: var(--warning);">MWK ${totals.days30.toLocaleString()}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">31-60 Days</div>
                            <div class="stat-value" style="color: var(--danger);">MWK ${totals.days60.toLocaleString()}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">61-90 Days</div>
                            <div class="stat-value" style="color: var(--danger);">MWK ${totals.days90.toLocaleString()}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">90+ Days</div>
                            <div class="stat-value" style="color: var(--danger);">MWK ${totals.days90plus.toLocaleString()}</div>
                        </div>
                        <div class="stat-card" style="border: 2px solid var(--primary);">
                            <div class="stat-label">Total Outstanding</div>
                            <div class="stat-value">MWK ${totals.total.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <!-- Aging Table -->
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th class="text-right">Current</th>
                                    <th class="text-right">1-30 Days</th>
                                    <th class="text-right">31-60 Days</th>
                                    <th class="text-right">61-90 Days</th>
                                    <th class="text-right">90+ Days</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${agingData.length > 0 ? agingData.map(a => `
                                    <tr>
                                        <td><strong>${a.customerName}</strong></td>
                                        <td class="text-right">${a.current > 0 ? 'MWK ' + a.current.toLocaleString() : '-'}</td>
                                        <td class="text-right" style="color: ${a.days30 > 0 ? 'var(--warning)' : ''};">
                                            ${a.days30 > 0 ? 'MWK ' + a.days30.toLocaleString() : '-'}
                                        </td>
                                        <td class="text-right" style="color: ${a.days60 > 0 ? 'var(--danger)' : ''};">
                                            ${a.days60 > 0 ? 'MWK ' + a.days60.toLocaleString() : '-'}
                                        </td>
                                        <td class="text-right" style="color: ${a.days90 > 0 ? 'var(--danger)' : ''};">
                                            ${a.days90 > 0 ? 'MWK ' + a.days90.toLocaleString() : '-'}
                                        </td>
                                        <td class="text-right" style="color: ${a.days90plus > 0 ? 'var(--danger)' : ''}; font-weight: bold;">
                                            ${a.days90plus > 0 ? 'MWK ' + a.days90plus.toLocaleString() : '-'}
                                        </td>
                                        <td class="text-right"><strong>MWK ${a.total.toLocaleString()}</strong></td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="7" class="text-center" style="padding: 40px;">
                                            No outstanding receivables! 🎉
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                            <tfoot>
                                <tr style="background: var(--bg-tertiary); font-weight: 700; border-top: 2px solid var(--border);">
                                    <td>TOTAL</td>
                                    <td class="text-right">MWK ${totals.current.toLocaleString()}</td>
                                    <td class="text-right">MWK ${totals.days30.toLocaleString()}</td>
                                    <td class="text-right">MWK ${totals.days60.toLocaleString()}</td>
                                    <td class="text-right">MWK ${totals.days90.toLocaleString()}</td>
                                    <td class="text-right">MWK ${totals.days90plus.toLocaleString()}</td>
                                    <td class="text-right">MWK ${totals.total.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                
                <div class="btn-group">
                    <button class="btn btn-outline" onclick="closeModal('agingReportModal')">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Continue in next part with export functions...
// ========== CUSTOMERS MODULE PART 4 ==========
// Export Functions, Filters, and Utilities

// ========== FILTER FUNCTIONS ==========
function applyCustomerFilters() {
    const filters = {
        status: document.getElementById('customerStatusFilter')?.value || 'all',
        category: document.getElementById('customerCategoryFilter')?.value || 'all',
        search: document.getElementById('customerSearchInput')?.value || ''
    };
    
    loadCustomersTable(filters);
}

function clearCustomerFilters() {
    if (document.getElementById('customerStatusFilter')) document.getElementById('customerStatusFilter').value = 'all';
    if (document.getElementById('customerCategoryFilter')) document.getElementById('customerCategoryFilter').value = 'all';
    if (document.getElementById('customerSearchInput')) document.getElementById('customerSearchInput').value = '';
    
    loadCustomersTable();
}

// ========== EXPORT ALL CUSTOMERS TO CSV ==========
function exportCustomersToCSV() {
    const customers = appData.customers || [];
    
    let csv = 'Customer Code,Name,Contact Person,Email,Phone,Mobile,Address,City,Region,Country,Tax ID,Credit Limit,Payment Terms,Currency,Category,Receivables,Status\n';
    
    customers.forEach(c => {
        csv += `"${c.customerCode || ''}","${c.name}","${c.contact}","${c.email}","${c.phone || ''}","${c.mobile || ''}","${c.address || ''}","${c.city || ''}","${c.region || ''}","${c.country || ''}","${c.taxId || ''}",${c.creditLimit || 0},${c.paymentTerms || 30},"${c.currency || 'MWK'}","${c.category || 'General'}",${c.receivables || 0},"${c.status || 'active'}"\n`;
    });
    
    downloadFile(csv, `customers-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    showNotification('Customers exported to CSV successfully!', false, 'success');
}

// ========== EXPORT ALL CUSTOMERS TO EXCEL ==========
function exportCustomersToExcel() {
    const customers = appData.customers || [];
    
    const excelData = [];
    
    // Header
    excelData.push([
        'Customer Code',
        'Name',
        'Contact Person',
        'Email',
        'Phone',
        'Mobile',
        'Address',
        'City',
        'Region',
        'Country',
        'Tax ID',
        'Credit Limit',
        'Payment Terms',
        'Currency',
        'Category',
        'Receivables',
        'Status'
    ]);
    
    // Data
    customers.forEach(c => {
        excelData.push([
            c.customerCode || '',
            c.name,
            c.contact,
            c.email,
            c.phone || '',
            c.mobile || '',
            c.address || '',
            c.city || '',
            c.region || '',
            c.country || '',
            c.taxId || '',
            c.creditLimit || 0,
            c.paymentTerms || 30,
            c.currency || 'MWK',
            c.category || 'General',
            c.receivables || 0,
            c.status || 'active'
        ]);
    });
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 25 }, { wch: 15 },
        { wch: 15 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
        { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 12 },
        { wch: 15 }, { wch: 10 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, `customers-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    showNotification('Customers exported to Excel successfully!', false, 'success');
}

// ========== EXPORT SINGLE CUSTOMER DATA ==========
function exportCustomerData(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    const options = `
        <div class="modal active" id="exportCustomerModal">
            <div class="modal-content" style="max-width: 400px;">
                <button class="modal-close" onclick="closeModal('exportCustomerModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Export Customer</h2>
                    <p class="page-subtitle">Choose export format</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; padding: 20px;">
                    <button class="btn btn-primary" onclick="closeModal('exportCustomerModal'); exportSingleCustomerCSV(${id})">
                        📊 Export as CSV
                    </button>
                    <button class="btn btn-success" onclick="closeModal('exportCustomerModal'); exportSingleCustomerExcel(${id})">
                        📗 Export as Excel
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal('exportCustomerModal'); closeModal('viewCustomerModal'); showCustomerStatement(${id})">
                        📄 Export Statement
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', options);
}

function exportSingleCustomerCSV(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    let csv = 'Field,Value\n';
    csv += `"Customer Code","${customer.customerCode || ''}"\n`;
    csv += `"Name","${customer.name}"\n`;
    csv += `"Contact Person","${customer.contact}"\n`;
    csv += `"Email","${customer.email}"\n`;
    csv += `"Phone","${customer.phone || ''}"\n`;
    csv += `"Mobile","${customer.mobile || ''}"\n`;
    csv += `"Address","${customer.address || ''}"\n`;
    csv += `"City","${customer.city || ''}"\n`;
    csv += `"Region","${customer.region || ''}"\n`;
    csv += `"Country","${customer.country || ''}"\n`;
    csv += `"Tax ID","${customer.taxId || ''}"\n`;
    csv += `"Credit Limit",${customer.creditLimit || 0}\n`;
    csv += `"Payment Terms",${customer.paymentTerms || 30}\n`;
    csv += `"Currency","${customer.currency || 'MWK'}"\n`;
    csv += `"Category","${customer.category || 'General'}"\n`;
    csv += `"Receivables",${customer.receivables || 0}\n`;
    csv += `"Status","${customer.status || 'active'}"\n`;
    
    downloadFile(csv, `customer-${customer.customerCode || customer.id}.csv`, 'text/csv');
    showNotification('Customer data exported to CSV!', false, 'success');
}

function exportSingleCustomerExcel(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    const excelData = [
        ['Customer Information', ''],
        ['Field', 'Value'],
        ['Customer Code', customer.customerCode || ''],
        ['Name', customer.name],
        ['Contact Person', customer.contact],
        ['Email', customer.email],
        ['Phone', customer.phone || ''],
        ['Mobile', customer.mobile || ''],
        ['Website', customer.website || ''],
        ['', ''],
        ['Address', ''],
        ['Street', customer.address || ''],
        ['City', customer.city || ''],
        ['Region', customer.region || ''],
        ['Country', customer.country || ''],
        ['', ''],
        ['Financial', ''],
        ['Tax ID', customer.taxId || ''],
        ['Credit Limit', customer.creditLimit || 0],
        ['Payment Terms (days)', customer.paymentTerms || 30],
        ['Currency', customer.currency || 'MWK'],
        ['Category', customer.category || 'General'],
        ['Current Receivables', customer.receivables || 0],
        ['Status', customer.status || 'active']
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    ws['!cols'] = [{ wch: 25 }, { wch: 30 }];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Info');
    XLSX.writeFile(wb, `customer-${customer.customerCode || customer.id}.xlsx`);
    
    showNotification('Customer data exported to Excel!', false, 'success');
}

// ========== EXPORT STATEMENT TO PDF ==========
function exportStatementPDF(id) {
    // Use browser print
    window.print();
}

// ========== EXPORT STATEMENT TO EXCEL ==========
function exportStatementExcel(id) {
    const customer = appData.customers.find(c => c.id === id);
    if (!customer) return;
    
    const invoices = (appData.invoices || []).filter(inv => inv.customerId === id);
    const receipts = (appData.receipts || []).filter(rec => rec.customerId === id);
    
    const transactions = [
        ...invoices.map(inv => ({
            date: inv.date,
            type: 'Invoice',
            reference: inv.number || `INV-${inv.id}`,
            description: inv.description || 'Sales Invoice',
            debit: inv.total || 0,
            credit: 0
        })),
        ...receipts.map(rec => ({
            date: rec.date,
            type: 'Payment',
            reference: rec.number || `REC-${rec.id}`,
            description: rec.description || 'Payment Received',
            debit: 0,
            credit: rec.amount || 0
        }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate running balance
    let runningBalance = 0;
    const excelData = [
        ['STATEMENT OF ACCOUNT'],
        [''],
        ['Customer:', customer.name],
        ['Customer Code:', customer.customerCode || ''],
        ['Statement Date:', new Date().toLocaleDateString()],
        [''],
        ['Date', 'Type', 'Reference', 'Description', 'Charges', 'Payments', 'Balance']
    ];
    
    transactions.forEach(txn => {
        runningBalance += (txn.debit - txn.credit);
        excelData.push([
            txn.date,
            txn.type,
            txn.reference,
            txn.description,
            txn.debit || 0,
            txn.credit || 0,
            runningBalance
        ]);
    });
    
    excelData.push(['']);
    excelData.push(['TOTAL', '', '', '', 
        transactions.reduce((sum, t) => sum + t.debit, 0),
        transactions.reduce((sum, t) => sum + t.credit, 0),
        customer.receivables || 0
    ]);
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    ws['!cols'] = [
        { wch: 12 }, { wch: 10 }, { wch: 15 }, { wch: 30 },
        { wch: 15 }, { wch: 15 }, { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Statement');
    XLSX.writeFile(wb, `statement-${customer.customerCode || customer.id}-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    showNotification('Statement exported to Excel!', false, 'success');
}

// ========== EXPORT AGING REPORT TO EXCEL ==========
function exportAgingReportExcel() {
    const customers = appData.customers || [];
    const invoices = appData.invoices || [];
    
    const excelData = [
        ['ACCOUNTS RECEIVABLE AGING REPORT'],
        ['Report Date:', new Date().toLocaleDateString()],
        [''],
        ['Customer', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days', 'Total']
    ];
    
    const today = new Date();
    let totals = { current: 0, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 0 };
    
    customers.forEach(customer => {
        const customerInvoices = invoices.filter(inv => 
            inv.customerId === customer.id && inv.status !== 'paid'
        );
        
        const aging = { current: 0, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 0 };
        
        customerInvoices.forEach(inv => {
            const dueDate = new Date(inv.dueDate);
            const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
            const amount = inv.total || 0;
            
            if (daysOverdue <= 0) aging.current += amount;
            else if (daysOverdue <= 30) aging.days30 += amount;
            else if (daysOverdue <= 60) aging.days60 += amount;
            else if (daysOverdue <= 90) aging.days90 += amount;
            else aging.days90plus += amount;
            
            aging.total += amount;
        });
        
        if (aging.total > 0) {
            excelData.push([
                customer.name,
                aging.current,
                aging.days30,
                aging.days60,
                aging.days90,
                aging.days90plus,
                aging.total
            ]);
            
            totals.current += aging.current;
            totals.days30 += aging.days30;
            totals.days60 += aging.days60;
            totals.days90 += aging.days90;
            totals.days90plus += aging.days90plus;
            totals.total += aging.total;
        }
    });
    
    excelData.push(['']);
    excelData.push([
        'TOTAL',
        totals.current,
        totals.days30,
        totals.days60,
        totals.days90,
        totals.days90plus,
        totals.total
    ]);
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    ws['!cols'] = [
        { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
        { wch: 15 }, { wch: 15 }, { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Aging Report');
    XLSX.writeFile(wb, `aging-report-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    showNotification('Aging report exported to Excel!', false, 'success');
}

// ========== PRINT STATEMENT ==========
function printStatement() {
    window.print();
}

// ========== IMPORT CUSTOMERS FROM CSV ==========
function showImportCustomersModal() {
    const modalHtml = `
        <div class="modal active" id="importCustomersModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('importCustomersModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Import Customers</h2>
                    <p class="page-subtitle">Upload CSV or Excel file to import customers</p>
                </div>
                
                <div style="padding: 20px;">
                    <div class="form-group mb-3">
                        <label class="form-label">Select File *</label>
                        <input type="file" class="form-input" id="importCustomersFile" accept=".csv,.xlsx,.xls">
                        <small style="display: block; margin-top: 8px; color: var(--text-secondary);">
                            Supported formats: CSV, Excel (.xlsx, .xls)
                        </small>
                    </div>
                    
                    <div class="card mb-3" style="background: var(--bg-tertiary);">
                        <h4 style="margin-bottom: 12px;">📋 CSV Format Requirements:</h4>
                        <p style="margin-bottom: 12px;">First row must be headers. Required columns:</p>
                        <ul style="margin-left: 20px; line-height: 1.8;">
                            <li><strong>Name</strong> (required)</li>
                            <li><strong>Contact</strong> (required)</li>
                            <li><strong>Email</strong> (required)</li>
                            <li><strong>Phone</strong> (required)</li>
                            <li>Address, City, Region, Country (optional)</li>
                            <li>Tax ID, Credit Limit, Payment Terms (optional)</li>
                        </ul>
                    </div>
                    
                    <div class="btn-group">
                        <button class="btn btn-outline" onclick="downloadCustomerTemplate()">📥 Download Template</button>
                        <button class="btn btn-primary" onclick="processCustomerImport()">Import Customers</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ========== DOWNLOAD IMPORT TEMPLATE ==========
function downloadCustomerTemplate() {
    const csv = 'Customer Code,Name,Contact Person,Email,Phone,Mobile,Address,City,Region,Country,Tax ID,Credit Limit,Payment Terms,Currency,Category\n';
    downloadFile(csv, 'customer-import-template.csv', 'text/csv');
    showNotification('Template downloaded!', false, 'success');
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function createInvoiceForCustomer(customerId) {
    // Navigate to invoices and pre-fill customer
    navigateTo('invoices');
    setTimeout(() => {
        if (typeof showInvoiceModal === 'function') {
            showInvoiceModal();
            // Pre-select customer if possible
            const customerSelect = document.getElementById('invoiceCustomer');
            if (customerSelect) {
                customerSelect.value = customerId;
            }
        }
    }, 100);
}

// ========== MAKE FUNCTIONS GLOBALLY AVAILABLE ==========
window.loadCustomersTable = loadCustomersTable;
window.updateCustomerStats = updateCustomerStats;
window.showCustomerModal = showCustomerModal;
window.saveCustomer = saveCustomer;
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;
window.showCustomerStatement = showCustomerStatement;
window.showAgingReport = showAgingReport;
window.applyCustomerFilters = applyCustomerFilters;
window.clearCustomerFilters = clearCustomerFilters;
window.exportCustomersToCSV = exportCustomersToCSV;
window.exportCustomersToExcel = exportCustomersToExcel;
window.exportCustomerData = exportCustomerData;
window.exportSingleCustomerCSV = exportSingleCustomerCSV;
window.exportSingleCustomerExcel = exportSingleCustomerExcel;
window.exportStatementPDF = exportStatementPDF;
window.exportStatementExcel = exportStatementExcel;
window.exportAgingReportExcel = exportAgingReportExcel;
window.printStatement = printStatement;
window.showImportCustomersModal = showImportCustomersModal;
window.downloadCustomerTemplate = downloadCustomerTemplate;
window.createInvoiceForCustomer = createInvoiceForCustomer;
