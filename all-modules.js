// ========== COMPLETE MODULES SYSTEM ==========
// This file contains all missing CRUD functionality for FinanceCore ERP

// ========== DATA INITIALIZATION ==========
function initializeAllData() {
    // Initialize all data structures if they don't exist
    if (!appData.customers) appData.customers = [];
    if (!appData.products) appData.products = [];
    if (!appData.invoices) appData.invoices = [];
    if (!appData.quotations) appData.quotations = [];
    if (!appData.journalEntries) appData.journalEntries = [];
    if (!appData.accounts) appData.accounts = [];
    if (!appData.payrollRecords) appData.payrollRecords = [];
    if (!appData.employees) appData.employees = [];
    if (!appData.donors) appData.donors = [];
    if (!appData.grants) appData.grants = [];
    if (!appData.projects) appData.projects = [];
    if (!appData.teamMembers) appData.teamMembers = [];
    if (!appData.receipts) appData.receipts = [];
    if (!appData.stockMovements) appData.stockMovements = [];
    
    // Load from localStorage if available
    loadAllDataFromStorage();
    
    // Load sample data if empty
    if (appData.customers.length === 0) loadSampleCustomers();
    if (appData.products.length === 0) loadSampleProducts();
    if (appData.accounts.length === 0) loadChartOfAccounts();
}

function loadAllDataFromStorage() {
    const keys = [
        'customers', 'products', 'invoices', 'quotations', 'journalEntries',
        'accounts', 'payrollRecords', 'employees', 'donors', 'grants', 
        'projects', 'teamMembers', 'receipts', 'stockMovements'
    ];
    
    keys.forEach(key => {
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                appData[key] = JSON.parse(stored);
            } catch (e) {
                console.error(`Error loading ${key}:`, e);
            }
        }
    });
}

function saveToStorage(dataKey) {
    localStorage.setItem(dataKey, JSON.stringify(appData[dataKey]));
}

// ========== SAMPLE DATA LOADERS ==========
function loadSampleCustomers() {
    appData.customers = [
        { 
            id: 1, 
            name: 'Acme Corporation', 
            contact: 'John Smith', 
            email: 'john@acme.com', 
            phone: '+265 888 123 456', 
            address: '123 Business St, Blantyre',
            taxId: 'TAX-ACME-001',
            receivables: 1250000,
            creditLimit: 5000000
        },
        { 
            id: 2, 
            name: 'Global Trading Ltd', 
            contact: 'Jane Doe', 
            email: 'jane@global.com', 
            phone: '+265 999 654 321',
            address: '456 Commerce Ave, Lilongwe',
            taxId: 'TAX-GLOBAL-002', 
            receivables: 890000,
            creditLimit: 3000000
        },
        {
            id: 3,
            name: 'Tech Solutions MW',
            contact: 'David Banda',
            email: 'david@techsol.mw',
            phone: '+265 888 777 888',
            address: '789 Tech Park, Zomba',
            taxId: 'TAX-TECH-003',
            receivables: 0,
            creditLimit: 2000000
        }
    ];
    saveToStorage('customers');
}

function loadSampleProducts() {
    appData.products = [
        { 
            id: 1, 
            code: 'PROD-001', 
            name: 'Premium Widget', 
            category: 'Goods', 
            price: 15000, 
            stock: 100, 
            cost: 8000,
            unit: 'pcs',
            reorderLevel: 20,
            supplier: 'Widget Suppliers Ltd',
            description: 'High-quality widget for industrial use'
        },
        { 
            id: 2, 
            code: 'SERV-001', 
            name: 'Consulting Services', 
            category: 'Services', 
            price: 25000, 
            stock: null, 
            cost: 0,
            unit: 'hours',
            reorderLevel: null,
            supplier: null,
            description: 'Professional consulting services'
        },
        {
            id: 3,
            code: 'PROD-002',
            name: 'Office Supplies Package',
            category: 'Goods',
            price: 5500,
            stock: 50,
            cost: 3200,
            unit: 'package',
            reorderLevel: 10,
            supplier: 'Office Mart',
            description: 'Complete office supplies package'
        }
    ];
    saveToStorage('products');
}

function loadChartOfAccounts() {
    appData.accounts = [
        // Assets
        { code: '1000', name: 'Cash and Bank', type: 'Asset', category: 'Current Assets', balance: 15000000 },
        { code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets', balance: 2140000 },
        { code: '1200', name: 'Inventory', type: 'Asset', category: 'Current Assets', balance: 4560000 },
        { code: '1500', name: 'Fixed Assets', type: 'Asset', category: 'Non-Current Assets', balance: 25000000 },
        { code: '1600', name: 'Accumulated Depreciation', type: 'Asset', category: 'Non-Current Assets', balance: -5000000 },
        
        // Liabilities
        { code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities', balance: 1500000 },
        { code: '2100', name: 'Tax Payable', type: 'Liability', category: 'Current Liabilities', balance: 850000 },
        { code: '2500', name: 'Long-term Loan', type: 'Liability', category: 'Non-Current Liabilities', balance: 10000000 },
        
        // Equity
        { code: '3000', name: 'Share Capital', type: 'Equity', category: 'Equity', balance: 20000000 },
        { code: '3100', name: 'Retained Earnings', type: 'Equity', category: 'Equity', balance: 9350000 },
        
        // Revenue
        { code: '4000', name: 'Sales Revenue', type: 'Revenue', category: 'Operating Income', balance: 0 },
        { code: '4100', name: 'Service Revenue', type: 'Revenue', category: 'Operating Income', balance: 0 },
        { code: '4500', name: 'Other Income', type: 'Revenue', category: 'Other Income', balance: 0 },
        
        // Expenses
        { code: '5000', name: 'Cost of Goods Sold', type: 'Expense', category: 'Main Business', balance: 0 },
        { code: '6000', name: 'Salaries and Wages', type: 'Expense', category: 'Main Business', balance: 0 },
        { code: '6100', name: 'Rent Expense', type: 'Expense', category: 'Main Business', balance: 0 },
        { code: '6200', name: 'Utilities', type: 'Expense', category: 'Main Business', balance: 0 },
        { code: '6300', name: 'Marketing & Advertising', type: 'Expense', category: 'Main Business', balance: 0 },
        { code: '7000', name: 'Depreciation', type: 'Expense', category: 'Unusual Items', balance: 0 },
        { code: '8000', name: 'Interest Expense', type: 'Expense', category: 'Financing', balance: 0 }
    ];
    saveToStorage('accounts');
}

// ========== CUSTOMER MANAGEMENT ==========
function loadCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    
    let html = '';
    appData.customers.forEach(customer => {
        html += `
            <tr>
                <td><strong>${customer.name}</strong></td>
                <td>${customer.contact}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td class="text-right"><strong>MWK ${(customer.receivables || 0).toLocaleString()}</strong></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="6" class="text-center">No customers found. Click "+ New Customer" to add one.</td></tr>';
}

function showCustomerModal(customerId = null) {
    const customer = customerId ? appData.customers.find(c => c.id === customerId) : null;
    const isEdit = !!customer;
    
    const modalHtml = `
        <div class="modal active" id="customerModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('customerModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add New'} Customer</h2>
                </div>
                <form id="customerForm" onsubmit="saveCustomer(event, ${customerId})">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Company Name *</label>
                            <input type="text" class="form-input" id="customerName" value="${customer?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Person *</label>
                            <input type="text" class="form-input" id="customerContact" value="${customer?.contact || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="customerEmail" value="${customer?.email || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone *</label>
                            <input type="tel" class="form-input" id="customerPhone" value="${customer?.phone || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-input" id="customerAddress" value="${customer?.address || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tax ID</label>
                            <input type="text" class="form-input" id="customerTaxId" value="${customer?.taxId || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Credit Limit (MWK)</label>
                            <input type="number" class="form-input" id="customerCreditLimit" value="${customer?.creditLimit || 0}" min="0">
                        </div>
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

function saveCustomer(e, customerId) {
    e.preventDefault();
    
    const customerData = {
        name: document.getElementById('customerName').value,
        contact: document.getElementById('customerContact').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        taxId: document.getElementById('customerTaxId').value,
        creditLimit: parseFloat(document.getElementById('customerCreditLimit').value) || 0
    };
    
    if (customerId) {
        // Edit existing
        const index = appData.customers.findIndex(c => c.id === customerId);
        appData.customers[index] = { ...appData.customers[index], ...customerData };
        showNotification('Customer updated successfully!', false, 'success');
    } else {
        // Create new
        const newId = appData.customers.length > 0 ? Math.max(...appData.customers.map(c => c.id)) + 1 : 1;
        appData.customers.push({ id: newId, ...customerData, receivables: 0 });
        showNotification('Customer created successfully!', false, 'success');
    }
    
    saveToStorage('customers');
    closeModal('customerModal');
    loadCustomersTable();
}

function editCustomer(id) {
    showCustomerModal(id);
}

function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        appData.customers = appData.customers.filter(c => c.id !== id);
        saveToStorage('customers');
        loadCustomersTable();
        showNotification('Customer deleted successfully!', false, 'success');
    }
}

// ========== PRODUCT MANAGEMENT ==========
function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    let html = '';
    appData.products.forEach(product => {
        const stockStatus = product.category === 'Services' ? 'N/A' : 
                           product.stock <= (product.reorderLevel || 0) ? 'Low Stock' : 'In Stock';
        const statusClass = stockStatus === 'Low Stock' ? 'status-overdue' : 'status-paid';
        
        html += `
            <tr>
                <td><strong>${product.code}</strong></td>
                <td>${product.name}</td>
                <td><span class="status-badge status-pending">${product.category}</span></td>
                <td class="text-right">MWK ${product.price.toLocaleString()}</td>
                <td class="text-right">${product.stock !== null ? product.stock + ' ' + product.unit : 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${stockStatus}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No products found. Click "+ New Product" to add one.</td></tr>';
}

function showProductModal(productId = null) {
    const product = productId ? appData.products.find(p => p.id === productId) : null;
    const isEdit = !!product;
    
    const modalHtml = `
        <div class="modal active" id="productModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('productModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add New'} Product/Service</h2>
                </div>
                <form id="productForm" onsubmit="saveProduct(event, ${productId})">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Product Code *</label>
                            <input type="text" class="form-input" id="productCode" value="${product?.code || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Product Name *</label>
                            <input type="text" class="form-input" id="productName" value="${product?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category *</label>
                            <select class="form-select" id="productCategory" required onchange="toggleInventoryFields()">
                                <option value="Goods" ${product?.category === 'Goods' ? 'selected' : ''}>Goods</option>
                                <option value="Services" ${product?.category === 'Services' ? 'selected' : ''}>Services</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Unit Price (MWK) *</label>
                            <input type="number" class="form-input" id="productPrice" value="${product?.price || ''}" min="0" step="0.01" required>
                        </div>
                        <div class="form-group" id="productCostGroup">
                            <label class="form-label">Unit Cost (MWK)</label>
                            <input type="number" class="form-input" id="productCost" value="${product?.cost || 0}" min="0" step="0.01">
                        </div>
                        <div class="form-group" id="productUnitGroup">
                            <label class="form-label">Unit of Measure</label>
                            <input type="text" class="form-input" id="productUnit" value="${product?.unit || 'pcs'}" placeholder="e.g., pcs, kg, hours">
                        </div>
                        <div class="form-group" id="productStockGroup">
                            <label class="form-label">Current Stock</label>
                            <input type="number" class="form-input" id="productStock" value="${product?.stock || 0}" min="0">
                        </div>
                        <div class="form-group" id="productReorderGroup">
                            <label class="form-label">Reorder Level</label>
                            <input type="number" class="form-input" id="productReorder" value="${product?.reorderLevel || 0}" min="0">
                        </div>
                        <div class="form-group" id="productSupplierGroup">
                            <label class="form-label">Supplier</label>
                            <input type="text" class="form-input" id="productSupplier" value="${product?.supplier || ''}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" id="productDescription" rows="3">${product?.description || ''}</textarea>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('productModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Create'} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    toggleInventoryFields();
}

function toggleInventoryFields() {
    const category = document.getElementById('productCategory')?.value;
    const isService = category === 'Services';
    
    ['productStockGroup', 'productReorderGroup', 'productSupplierGroup', 'productCostGroup'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = isService ? 'none' : 'block';
    });
}

function saveProduct(e, productId) {
    e.preventDefault();
    
    const category = document.getElementById('productCategory').value;
    const productData = {
        code: document.getElementById('productCode').value,
        name: document.getElementById('productName').value,
        category: category,
        price: parseFloat(document.getElementById('productPrice').value),
        cost: category === 'Services' ? 0 : parseFloat(document.getElementById('productCost').value) || 0,
        unit: document.getElementById('productUnit').value,
        stock: category === 'Services' ? null : parseInt(document.getElementById('productStock').value) || 0,
        reorderLevel: category === 'Services' ? null : parseInt(document.getElementById('productReorder').value) || 0,
        supplier: category === 'Services' ? null : document.getElementById('productSupplier').value,
        description: document.getElementById('productDescription').value
    };
    
    if (productId) {
        const index = appData.products.findIndex(p => p.id === productId);
        appData.products[index] = { ...appData.products[index], ...productData };
        showNotification('Product updated successfully!', false, 'success');
    } else {
        const newId = appData.products.length > 0 ? Math.max(...appData.products.map(p => p.id)) + 1 : 1;
        appData.products.push({ id: newId, ...productData });
        showNotification('Product created successfully!', false, 'success');
    }
    
    saveToStorage('products');
    closeModal('productModal');
    loadProductsTable();
}

function editProduct(id) {
    showProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        appData.products = appData.products.filter(p => p.id !== id);
        saveToStorage('products');
        loadProductsTable();
        showNotification('Product deleted successfully!', false, 'success');
    }
}

// ========== INVOICE MANAGEMENT ==========
function loadInvoicesTable() {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;
    
    let html = '';
    appData.invoices.forEach(invoice => {
        const statusClass = invoice.status === 'paid' ? 'status-paid' : 
                           invoice.status === 'pending' ? 'status-pending' : 'status-overdue';
        
        html += `
            <tr>
                <td><strong>${invoice.number}</strong></td>
                <td>${invoice.customer}</td>
                <td>${invoice.date}</td>
                <td>${invoice.dueDate}</td>
                <td class="text-right"><strong>MWK ${invoice.total.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${invoice.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewInvoice(${invoice.id})">View</button>
                    <button class="btn btn-sm btn-success action-btn" onclick="markInvoicePaid(${invoice.id})">Mark Paid</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteInvoice(${invoice.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No invoices found. Click "+ New Invoice" to create one.</td></tr>';
}

function viewInvoice(id) {
    const invoice = appData.invoices.find(inv => inv.id === id);
    if (!invoice) return;
    
    showNotification(`Invoice ${invoice.number}: MWK ${invoice.total.toLocaleString()} - ${invoice.status}`, false, 'info');
}

function markInvoicePaid(id) {
    const invoice = appData.invoices.find(inv => inv.id === id);
    if (invoice) {
        invoice.status = 'paid';
        saveToStorage('invoices');
        loadInvoicesTable();
        showNotification(`Invoice ${invoice.number} marked as paid!`, false, 'success');
    }
}

function deleteInvoice(id) {
    if (confirm('Are you sure you want to delete this invoice?')) {
        appData.invoices = appData.invoices.filter(inv => inv.id !== id);
        saveToStorage('invoices');
        loadInvoicesTable();
        showNotification('Invoice deleted successfully!', false, 'success');
    }
}

// Continue in next part...
// ========== COMPLETE MODULES PART 2 ==========
// Quotations, Journal Entries, Payroll, Team, Company Profile, Donors & Grants

// ========== QUOTATION MANAGEMENT ==========
function loadQuotationsTable() {
    const tbody = document.getElementById('quotationsTableBody');
    if (!tbody) return;
    
    if (!appData.quotations) appData.quotations = [];
    
    let html = '';
    appData.quotations.forEach(quote => {
        const statusClass = quote.status === 'accepted' ? 'status-paid' : 
                           quote.status === 'pending' ? 'status-pending' : 'status-draft';
        
        html += `
            <tr>
                <td><strong>${quote.number}</strong></td>
                <td>${quote.customer}</td>
                <td>${quote.date}</td>
                <td>${quote.validUntil}</td>
                <td class="text-right"><strong>MWK ${quote.total.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${quote.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewQuotation(${quote.id})">View</button>
                    <button class="btn btn-sm btn-success action-btn" onclick="convertQuoteToInvoice(${quote.id})">Convert to Invoice</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteQuotation(${quote.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No quotations found. Click "+ New Quotation" to create one.</td></tr>';
}

function showQuotationModal() {
    const modalHtml = `
        <div class="modal active" id="quotationModal">
            <div class="modal-content" style="max-width: 800px;">
                <button class="modal-close" onclick="closeModal('quotationModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Create Quotation</h2>
                </div>
                <form id="quotationForm" onsubmit="saveQuotation(event)">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Customer *</label>
                            <select class="form-select" id="quoteCustomer" required>
                                <option value="">Select Customer</option>
                                ${appData.customers.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Date *</label>
                            <input type="date" class="form-input" id="quoteDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Valid Until *</label>
                            <input type="date" class="form-input" id="quoteValidUntil" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Amount (MWK) *</label>
                            <input type="number" class="form-input" id="quoteAmount" min="0" step="0.01" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" id="quoteDescription" rows="4"></textarea>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('quotationModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Quotation</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('quoteDate').value = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    document.getElementById('quoteValidUntil').value = nextMonth.toISOString().split('T')[0];
}

function saveQuotation(e) {
    e.preventDefault();
    
    const newId = appData.quotations.length > 0 ? Math.max(...appData.quotations.map(q => q.id)) + 1 : 1;
    const quoteNumber = `QT-${new Date().getFullYear()}-${String(newId).padStart(4, '0')}`;
    
    const quotation = {
        id: newId,
        number: quoteNumber,
        customer: document.getElementById('quoteCustomer').value,
        date: document.getElementById('quoteDate').value,
        validUntil: document.getElementById('quoteValidUntil').value,
        total: parseFloat(document.getElementById('quoteAmount').value),
        description: document.getElementById('quoteDescription').value,
        status: 'pending'
    };
    
    appData.quotations.push(quotation);
    saveToStorage('quotations');
    closeModal('quotationModal');
    loadQuotationsTable();
    showNotification('Quotation created successfully!', false, 'success');
}

function viewQuotation(id) {
    const quote = appData.quotations.find(q => q.id === id);
    if (quote) {
        showNotification(`Quotation ${quote.number}: MWK ${quote.total.toLocaleString()} - Valid until ${quote.validUntil}`, false, 'info');
    }
}

function convertQuoteToInvoice(id) {
    const quote = appData.quotations.find(q => q.id === id);
    if (quote && confirm('Convert this quotation to an invoice?')) {
        const newInvId = appData.invoices.length > 0 ? Math.max(...appData.invoices.map(i => i.id)) + 1 : 1;
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(newInvId).padStart(4, '0')}`;
        
        const invoice = {
            id: newInvId,
            number: invoiceNumber,
            customer: quote.customer,
            date: new Date().toISOString().split('T')[0],
            dueDate: quote.validUntil,
            total: quote.total,
            status: 'pending'
        };
        
        appData.invoices.push(invoice);
        quote.status = 'accepted';
        
        saveToStorage('invoices');
        saveToStorage('quotations');
        
        showNotification(`Quotation converted to invoice ${invoiceNumber}!`, false, 'success');
        loadQuotationsTable();
    }
}

function deleteQuotation(id) {
    if (confirm('Are you sure you want to delete this quotation?')) {
        appData.quotations = appData.quotations.filter(q => q.id !== id);
        saveToStorage('quotations');
        loadQuotationsTable();
        showNotification('Quotation deleted successfully!', false, 'success');
    }
}

// ========== JOURNAL ENTRY MANAGEMENT ==========
function loadJournalTable() {
    const tbody = document.getElementById('journalTableBody');
    if (!tbody) return;
    
    let html = '';
    appData.journalEntries.forEach(entry => {
        const statusClass = entry.status === 'posted' ? 'status-paid' : 'status-draft';
        
        html += `
            <tr>
                <td><strong>${entry.number}</strong></td>
                <td>${entry.date}</td>
                <td>${entry.description}</td>
                <td class="text-right">MWK ${entry.debit.toLocaleString()}</td>
                <td class="text-right">MWK ${entry.credit.toLocaleString()}</td>
                <td><span class="status-badge ${statusClass}">${entry.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewJournalEntry(${entry.id})">View</button>
                    ${entry.status !== 'posted' ? `<button class="btn btn-sm btn-success action-btn" onclick="postJournalEntry(${entry.id})">Post</button>` : ''}
                    ${entry.status !== 'posted' ? `<button class="btn btn-sm btn-danger action-btn" onclick="deleteJournalEntry(${entry.id})">Delete</button>` : ''}
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No journal entries found. Click "+ New Entry" to create one.</td></tr>';
}

function showJournalModal() {
    const modalHtml = `
        <div class="modal active" id="journalModal">
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close" onclick="closeModal('journalModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Create Journal Entry</h2>
                    <p class="page-subtitle">Record a manual accounting transaction</p>
                </div>
                <form id="journalForm" onsubmit="saveJournalEntry(event)">
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Date *</label>
                            <input type="date" class="form-input" id="journalDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reference</label>
                            <input type="text" class="form-input" id="journalReference" placeholder="e.g., INV-001, PAY-123">
                        </div>
                    </div>
                    
                    <div class="form-group mb-3">
                        <label class="form-label">Description *</label>
                        <textarea class="form-textarea" id="journalDescription" rows="2" required></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <h3 class="mb-2">Journal Lines</h3>
                        <div id="journalLines">
                            <div class="journal-line mb-2" style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px; align-items: end;">
                                <select class="form-select journal-account" required>
                                    <option value="">Select Account</option>
                                    ${appData.accounts.map(a => `<option value="${a.code}">${a.code} - ${a.name}</option>`).join('')}
                                </select>
                                <input type="number" class="form-input journal-debit" placeholder="Debit" min="0" step="0.01" oninput="calculateJournalTotals()">
                                <input type="number" class="form-input journal-credit" placeholder="Credit" min="0" step="0.01" oninput="calculateJournalTotals()">
                                <button type="button" class="btn btn-danger btn-sm" onclick="removeJournalLine(this)">×</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="addJournalLine()">+ Add Line</button>
                    </div>
                    
                    <div class="mb-3 p-3" style="background: var(--bg-tertiary); border-radius: 8px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Total Debit</div>
                                <div style="font-size: 18px; font-weight: 700;" id="journalTotalDebit">MWK 0.00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Total Credit</div>
                                <div style="font-size: 18px; font-weight: 700;" id="journalTotalCredit">MWK 0.00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Difference</div>
                                <div style="font-size: 18px; font-weight: 700;" id="journalDifference">MWK 0.00</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('journalModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save as Draft</button>
                        <button type="button" class="btn btn-success" onclick="saveAndPostJournal()">Save & Post</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('journalDate').value = new Date().toISOString().split('T')[0];
    addJournalLine(); // Add second line by default
}

function addJournalLine() {
    const container = document.getElementById('journalLines');
    const newLine = `
        <div class="journal-line mb-2" style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px; align-items: end;">
            <select class="form-select journal-account" required>
                <option value="">Select Account</option>
                ${appData.accounts.map(a => `<option value="${a.code}">${a.code} - ${a.name}</option>`).join('')}
            </select>
            <input type="number" class="form-input journal-debit" placeholder="Debit" min="0" step="0.01" oninput="calculateJournalTotals()">
            <input type="number" class="form-input journal-credit" placeholder="Credit" min="0" step="0.01" oninput="calculateJournalTotals()">
            <button type="button" class="btn btn-danger btn-sm" onclick="removeJournalLine(this)">×</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', newLine);
}

function removeJournalLine(button) {
    const lines = document.querySelectorAll('.journal-line');
    if (lines.length > 2) {
        button.closest('.journal-line').remove();
        calculateJournalTotals();
    } else {
        showNotification('You must have at least 2 journal lines', true, 'error');
    }
}

function calculateJournalTotals() {
    let totalDebit = 0;
    let totalCredit = 0;
    
    document.querySelectorAll('.journal-debit').forEach(input => {
        totalDebit += parseFloat(input.value) || 0;
    });
    
    document.querySelectorAll('.journal-credit').forEach(input => {
        totalCredit += parseFloat(input.value) || 0;
    });
    
    const difference = Math.abs(totalDebit - totalCredit);
    
    document.getElementById('journalTotalDebit').textContent = `MWK ${totalDebit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('journalTotalCredit').textContent = `MWK ${totalCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    const diffElement = document.getElementById('journalDifference');
    diffElement.textContent = `MWK ${difference.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    diffElement.style.color = difference === 0 ? 'var(--success)' : 'var(--danger)';
}

function saveJournalEntry(e, shouldPost = false) {
    e.preventDefault();
    
    // Validate balancing
    let totalDebit = 0;
    let totalCredit = 0;
    document.querySelectorAll('.journal-debit').forEach(input => totalDebit += parseFloat(input.value) || 0);
    document.querySelectorAll('.journal-credit').forEach(input => totalCredit += parseFloat(input.value) || 0);
    
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
        showNotification('Journal entry must balance! Debits must equal Credits.', true, 'error');
        return;
    }
    
    const newId = appData.journalEntries.length > 0 ? Math.max(...appData.journalEntries.map(j => j.id)) + 1 : 1;
    const entryNumber = `JE-${new Date().getFullYear()}-${String(newId).padStart(4, '0')}`;
    
    const entry = {
        id: newId,
        number: entryNumber,
        date: document.getElementById('journalDate').value,
        reference: document.getElementById('journalReference').value,
        description: document.getElementById('journalDescription').value,
        debit: totalDebit,
        credit: totalCredit,
        status: shouldPost ? 'posted' : 'draft',
        lines: []
    };
    
    // Collect all lines
    document.querySelectorAll('.journal-line').forEach(line => {
        const account = line.querySelector('.journal-account').value;
        const debit = parseFloat(line.querySelector('.journal-debit').value) || 0;
        const credit = parseFloat(line.querySelector('.journal-credit').value) || 0;
        
        if (account && (debit > 0 || credit > 0)) {
            entry.lines.push({ account, debit, credit });
        }
    });
    
    appData.journalEntries.push(entry);
    saveToStorage('journalEntries');
    closeModal('journalModal');
    loadJournalTable();
    showNotification(`Journal entry ${entryNumber} ${shouldPost ? 'posted' : 'saved'}!`, false, 'success');
}

function saveAndPostJournal() {
    const form = document.getElementById('journalForm');
    const event = new Event('submit', { cancelable: true });
    form.dispatchEvent(event);
    if (!event.defaultPrevented) {
        saveJournalEntry(event, true);
    }
}

function viewJournalEntry(id) {
    const entry = appData.journalEntries.find(e => e.id === id);
    if (entry) {
        showNotification(`Journal Entry ${entry.number}: ${entry.description}`, false, 'info');
    }
}

function postJournalEntry(id) {
    const entry = appData.journalEntries.find(e => e.id === id);
    if (entry && confirm('Post this journal entry? This action cannot be undone.')) {
        entry.status = 'posted';
        saveToStorage('journalEntries');
        loadJournalTable();
        showNotification(`Journal entry ${entry.number} posted!`, false, 'success');
    }
}

function deleteJournalEntry(id) {
    if (confirm('Are you sure you want to delete this journal entry?')) {
        appData.journalEntries = appData.journalEntries.filter(e => e.id !== id);
        saveToStorage('journalEntries');
        loadJournalTable();
        showNotification('Journal entry deleted successfully!', false, 'success');
    }
}

// ========== PAYROLL MANAGEMENT ==========
function loadPayrollTable() {
    const tbody = document.getElementById('payrollTableBody');
    if (!tbody) return;
    
    if (!appData.payrollRecords) appData.payrollRecords = [];
    
    let html = '';
    appData.payrollRecords.forEach(record => {
        const statusClass = record.status === 'paid' ? 'status-paid' : 'status-pending';
        
        html += `
            <tr>
                <td><strong>${record.period}</strong></td>
                <td>${record.employees} Employees</td>
                <td class="text-right">MWK ${record.grossPay.toLocaleString()}</td>
                <td class="text-right">MWK ${record.deductions.toLocaleString()}</td>
                <td class="text-right"><strong>MWK ${record.netPay.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${record.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewPayroll(${record.id})">View</button>
                    ${record.status !== 'paid' ? `<button class="btn btn-sm btn-success action-btn" onclick="processPayroll(${record.id})">Process</button>` : ''}
                    <button class="btn btn-sm btn-danger action-btn" onclick="deletePayroll(${record.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No payroll records found. Click "+ New Payroll" to create one.</td></tr>';
}

function showPayrollModal() {
    const modalHtml = `
        <div class="modal active" id="payrollModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('payrollModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Process Payroll</h2>
                </div>
                <form id="payrollForm" onsubmit="savePayroll(event)">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Payroll Period *</label>
                            <input type="month" class="form-input" id="payrollPeriod" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Number of Employees *</label>
                            <input type="number" class="form-input" id="payrollEmployees" min="1" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Gross Pay (MWK) *</label>
                            <input type="number" class="form-input" id="payrollGrossPay" min="0" step="0.01" required oninput="calculateNetPay()">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Deductions (MWK) *</label>
                            <input type="number" class="form-input" id="payrollDeductions" min="0" step="0.01" required oninput="calculateNetPay()">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Net Pay (MWK)</label>
                        <input type="number" class="form-input" id="payrollNetPay" readonly style="background: var(--bg-tertiary); font-weight: 700; font-size: 18px;">
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('payrollModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Payroll</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const currentMonth = new Date().toISOString().slice(0, 7);
    document.getElementById('payrollPeriod').value = currentMonth;
}

function calculateNetPay() {
    const gross = parseFloat(document.getElementById('payrollGrossPay').value) || 0;
    const deductions = parseFloat(document.getElementById('payrollDeductions').value) || 0;
    document.getElementById('payrollNetPay').value = (gross - deductions).toFixed(2);
}

function savePayroll(e) {
    e.preventDefault();
    
    const newId = appData.payrollRecords.length > 0 ? Math.max(...appData.payrollRecords.map(p => p.id)) + 1 : 1;
    
    const payroll = {
        id: newId,
        period: document.getElementById('payrollPeriod').value,
        employees: parseInt(document.getElementById('payrollEmployees').value),
        grossPay: parseFloat(document.getElementById('payrollGrossPay').value),
        deductions: parseFloat(document.getElementById('payrollDeductions').value),
        netPay: parseFloat(document.getElementById('payrollNetPay').value),
        status: 'pending'
    };
    
    appData.payrollRecords.push(payroll);
    saveToStorage('payrollRecords');
    closeModal('payrollModal');
    loadPayrollTable();
    showNotification('Payroll record created successfully!', false, 'success');
}

function viewPayroll(id) {
    const payroll = appData.payrollRecords.find(p => p.id === id);
    if (payroll) {
        showNotification(`Payroll ${payroll.period}: ${payroll.employees} employees, Net Pay MWK ${payroll.netPay.toLocaleString()}`, false, 'info');
    }
}

function processPayroll(id) {
    const payroll = appData.payrollRecords.find(p => p.id === id);
    if (payroll && confirm(`Process payroll for ${payroll.period}? This will mark it as paid.`)) {
        payroll.status = 'paid';
        saveToStorage('payrollRecords');
        loadPayrollTable();
        showNotification(`Payroll for ${payroll.period} processed!`, false, 'success');
    }
}

function deletePayroll(id) {
    if (confirm('Are you sure you want to delete this payroll record?')) {
        appData.payrollRecords = appData.payrollRecords.filter(p => p.id !== id);
        saveToStorage('payrollRecords');
        loadPayrollTable();
        showNotification('Payroll record deleted successfully!', false, 'success');
    }
}

// Continue in next message...
// ========== COMPLETE MODULES PART 3 ==========
// Team Management, Company Profile, Donors & Grants, Compliance

// ========== TEAM MANAGEMENT ==========
function loadTeamTable() {
    const tbody = document.getElementById('teamTableBody');
    if (!tbody) return;
    
    if (!appData.teamMembers) appData.teamMembers = [];
    
    let html = '';
    appData.teamMembers.forEach(member => {
        const statusClass = member.status === 'active' ? 'status-paid' : 'status-pending';
        
        html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="team-avatar" style="width: 40px; height: 40px; font-size: 14px;">
                            ${member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                            <strong>${member.name}</strong><br>
                            <span style="font-size: 12px; color: var(--text-secondary);">${member.email}</span>
                        </div>
                    </div>
                </td>
                <td>${member.role}</td>
                <td>${member.department}</td>
                <td>${member.phone || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${member.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="editTeamMember(${member.id})">Edit</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteTeamMember(${member.id})">Remove</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="6" class="text-center">No team members found. Click "+ Add Team Member" to add one.</td></tr>';
}

function showTeamMemberModal(memberId = null) {
    const member = memberId ? appData.teamMembers.find(m => m.id === memberId) : null;
    const isEdit = !!member;
    
    const modalHtml = `
        <div class="modal active" id="teamMemberModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('teamMemberModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add'} Team Member</h2>
                </div>
                <form id="teamMemberForm" onsubmit="saveTeamMember(event, ${memberId})">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-input" id="memberName" value="${member?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="memberEmail" value="${member?.email || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" id="memberPhone" value="${member?.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Role *</label>
                            <select class="form-select" id="memberRole" required>
                                <option value="">Select Role</option>
                                <option value="Admin" ${member?.role === 'Admin' ? 'selected' : ''}>Admin</option>
                                <option value="Accountant" ${member?.role === 'Accountant' ? 'selected' : ''}>Accountant</option>
                                <option value="Finance Manager" ${member?.role === 'Finance Manager' ? 'selected' : ''}>Finance Manager</option>
                                <option value="Auditor" ${member?.role === 'Auditor' ? 'selected' : ''}>Auditor</option>
                                <option value="Data Entry" ${member?.role === 'Data Entry' ? 'selected' : ''}>Data Entry</option>
                                <option value="Viewer" ${member?.role === 'Viewer' ? 'selected' : ''}>Viewer</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Department *</label>
                            <input type="text" class="form-input" id="memberDepartment" value="${member?.department || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status *</label>
                            <select class="form-select" id="memberStatus" required>
                                <option value="active" ${member?.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${member?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('teamMemberModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Add'} Member</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveTeamMember(e, memberId) {
    e.preventDefault();
    
    const memberData = {
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        role: document.getElementById('memberRole').value,
        department: document.getElementById('memberDepartment').value,
        status: document.getElementById('memberStatus').value
    };
    
    if (memberId) {
        const index = appData.teamMembers.findIndex(m => m.id === memberId);
        appData.teamMembers[index] = { ...appData.teamMembers[index], ...memberData };
        showNotification('Team member updated successfully!', false, 'success');
    } else {
        const newId = appData.teamMembers.length > 0 ? Math.max(...appData.teamMembers.map(m => m.id)) + 1 : 1;
        appData.teamMembers.push({ id: newId, ...memberData });
        showNotification('Team member added successfully!', false, 'success');
    }
    
    saveToStorage('teamMembers');
    closeModal('teamMemberModal');
    loadTeamTable();
}

function editTeamMember(id) {
    showTeamMemberModal(id);
}

function deleteTeamMember(id) {
    if (confirm('Are you sure you want to remove this team member?')) {
        appData.teamMembers = appData.teamMembers.filter(m => m.id !== id);
        saveToStorage('teamMembers');
        loadTeamTable();
        showNotification('Team member removed successfully!', false, 'success');
    }
}

// ========== COMPANY PROFILE ==========
function loadCompanyProfileForm() {
    const form = document.getElementById('companyProfileForm');
    if (!form) return;
    
    // Load current company data
    document.getElementById('companyName').value = appData.company.name || '';
    document.getElementById('companyAddress').value = appData.company.address || '';
    document.getElementById('companyEmail').value = appData.company.email || '';
    document.getElementById('companyPhone').value = appData.company.phone || '';
    document.getElementById('companyTaxId').value = appData.company.taxId || '';
    document.getElementById('companyWebsite').value = appData.company.website || '';
    
    if (appData.company.logo) {
        document.getElementById('currentLogo').src = appData.company.logo;
        document.getElementById('currentLogoPreview').style.display = 'block';
    }
}

function saveCompanyProfile(e) {
    e.preventDefault();
    
    appData.company.name = document.getElementById('companyName').value;
    appData.company.address = document.getElementById('companyAddress').value;
    appData.company.email = document.getElementById('companyEmail').value;
    appData.company.phone = document.getElementById('companyPhone').value;
    appData.company.taxId = document.getElementById('companyTaxId').value;
    appData.company.website = document.getElementById('companyWebsite').value;
    
    // Handle logo upload
    const logoInput = document.getElementById('companyLogo');
    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.company.logo = e.target.result;
            localStorage.setItem('companyProfile', JSON.stringify(appData.company));
            showNotification('Company profile updated successfully!', false, 'success');
            loadCompanyProfileForm();
        };
        reader.readAsDataURL(logoInput.files[0]);
    } else {
        localStorage.setItem('companyProfile', JSON.stringify(appData.company));
        showNotification('Company profile updated successfully!', false, 'success');
    }
}

// ========== DONORS & GRANTS (NGO MODE) ==========
function loadDonorsTable() {
    const tbody = document.getElementById('donorsTableBody');
    if (!tbody) return;
    
    if (!appData.donors) appData.donors = [];
    
    let html = '';
    appData.donors.forEach(donor => {
        const statusClass = donor.status === 'active' ? 'status-paid' : 'status-pending';
        
        html += `
            <tr>
                <td><strong>${donor.name}</strong></td>
                <td>${donor.type}</td>
                <td>${donor.contact}</td>
                <td>${donor.email}</td>
                <td class="text-right"><strong>MWK ${donor.totalFunding.toLocaleString()}</strong></td>
                <td><span class="status-badge ${statusClass}">${donor.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewDonor(${donor.id})">View</button>
                    <button class="btn btn-sm btn-success action-btn" onclick="addGrant(${donor.id})">Add Grant</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteDonor(${donor.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7" class="text-center">No donors found. Click "+ New Donor" to add one.</td></tr>';
}

function showDonorModal(donorId = null) {
    const donor = donorId ? appData.donors.find(d => d.id === donorId) : null;
    const isEdit = !!donor;
    
    const modalHtml = `
        <div class="modal active" id="donorModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('donorModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add New'} Donor</h2>
                </div>
                <form id="donorForm" onsubmit="saveDonor(event, ${donorId})">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Donor Name *</label>
                            <input type="text" class="form-input" id="donorName" value="${donor?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Donor Type *</label>
                            <select class="form-select" id="donorType" required>
                                <option value="">Select Type</option>
                                <option value="Government" ${donor?.type === 'Government' ? 'selected' : ''}>Government</option>
                                <option value="Foundation" ${donor?.type === 'Foundation' ? 'selected' : ''}>Foundation</option>
                                <option value="Corporate" ${donor?.type === 'Corporate' ? 'selected' : ''}>Corporate</option>
                                <option value="Individual" ${donor?.type === 'Individual' ? 'selected' : ''}>Individual</option>
                                <option value="Multilateral" ${donor?.type === 'Multilateral' ? 'selected' : ''}>Multilateral (UN, etc)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Person *</label>
                            <input type="text" class="form-input" id="donorContact" value="${donor?.contact || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="donorEmail" value="${donor?.email || ''}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" id="donorPhone" value="${donor?.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Country</label>
                            <input type="text" class="form-input" id="donorCountry" value="${donor?.country || ''}">
                        </div>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('donorModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Add'} Donor</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveDonor(e, donorId) {
    e.preventDefault();
    
    const donorData = {
        name: document.getElementById('donorName').value,
        type: document.getElementById('donorType').value,
        contact: document.getElementById('donorContact').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value,
        country: document.getElementById('donorCountry').value,
        status: 'active'
    };
    
    if (donorId) {
        const index = appData.donors.findIndex(d => d.id === donorId);
        appData.donors[index] = { ...appData.donors[index], ...donorData };
        showNotification('Donor updated successfully!', false, 'success');
    } else {
        const newId = appData.donors.length > 0 ? Math.max(...appData.donors.map(d => d.id)) + 1 : 1;
        appData.donors.push({ id: newId, ...donorData, totalFunding: 0 });
        showNotification('Donor added successfully!', false, 'success');
    }
    
    saveToStorage('donors');
    closeModal('donorModal');
    loadDonorsTable();
}

function viewDonor(id) {
    const donor = appData.donors.find(d => d.id === id);
    if (donor) {
        showNotification(`Donor: ${donor.name} (${donor.type}) - Total Funding: MWK ${donor.totalFunding.toLocaleString()}`, false, 'info');
    }
}

function addGrant(donorId) {
    showGrantModal(donorId);
}

function deleteDonor(id) {
    if (confirm('Are you sure you want to delete this donor?')) {
        appData.donors = appData.donors.filter(d => d.id !== id);
        saveToStorage('donors');
        loadDonorsTable();
        showNotification('Donor deleted successfully!', false, 'success');
    }
}

function loadGrantsTable() {
    const tbody = document.getElementById('grantsTableBody');
    if (!tbody) return;
    
    if (!appData.grants) appData.grants = [];
    
    let html = '';
    appData.grants.forEach(grant => {
        const statusClass = grant.status === 'active' ? 'status-paid' : 
                           grant.status === 'completed' ? 'status-pending' : 'status-draft';
        
        html += `
            <tr>
                <td><strong>${grant.name}</strong></td>
                <td>${grant.donorName}</td>
                <td>${grant.startDate}</td>
                <td>${grant.endDate}</td>
                <td class="text-right"><strong>MWK ${grant.amount.toLocaleString()}</strong></td>
                <td class="text-right">MWK ${grant.spent.toLocaleString()}</td>
                <td><span class="status-badge ${statusClass}">${grant.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="viewGrant(${grant.id})">View</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteGrant(${grant.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="8" class="text-center">No grants found. Click "+ New Grant" to add one.</td></tr>';
}

function showGrantModal(donorId = null) {
    const modalHtml = `
        <div class="modal active" id="grantModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('grantModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Add New Grant</h2>
                </div>
                <form id="grantForm" onsubmit="saveGrant(event)">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Grant Name *</label>
                            <input type="text" class="form-input" id="grantName" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Donor *</label>
                            <select class="form-select" id="grantDonor" required ${donorId ? `disabled` : ''}>
                                <option value="">Select Donor</option>
                                ${appData.donors.map(d => `<option value="${d.id}" ${donorId == d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
                            </select>
                            ${donorId ? `<input type="hidden" id="grantDonorId" value="${donorId}">` : ''}
                        </div>
                        <div class="form-group">
                            <label class="form-label">Start Date *</label>
                            <input type="date" class="form-input" id="grantStartDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Date *</label>
                            <input type="date" class="form-input" id="grantEndDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Grant Amount (MWK) *</label>
                            <input type="number" class="form-input" id="grantAmount" min="0" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reference Number</label>
                            <input type="text" class="form-input" id="grantReference">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Purpose/Description</label>
                        <textarea class="form-textarea" id="grantPurpose" rows="3"></textarea>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('grantModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Grant</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveGrant(e) {
    e.preventDefault();
    
    const donorId = document.getElementById('grantDonorId')?.value || document.getElementById('grantDonor').value;
    const donor = appData.donors.find(d => d.id == donorId);
    
    const newId = appData.grants.length > 0 ? Math.max(...appData.grants.map(g => g.id)) + 1 : 1;
    
    const grant = {
        id: newId,
        name: document.getElementById('grantName').value,
        donorId: parseInt(donorId),
        donorName: donor.name,
        startDate: document.getElementById('grantStartDate').value,
        endDate: document.getElementById('grantEndDate').value,
        amount: parseFloat(document.getElementById('grantAmount').value),
        spent: 0,
        reference: document.getElementById('grantReference').value,
        purpose: document.getElementById('grantPurpose').value,
        status: 'active'
    };
    
    appData.grants.push(grant);
    
    // Update donor total funding
    donor.totalFunding = (donor.totalFunding || 0) + grant.amount;
    
    saveToStorage('grants');
    saveToStorage('donors');
    closeModal('grantModal');
    loadGrantsTable();
    loadDonorsTable();
    showNotification('Grant added successfully!', false, 'success');
}

function viewGrant(id) {
    const grant = appData.grants.find(g => g.id === id);
    if (grant) {
        const remaining = grant.amount - grant.spent;
        showNotification(`Grant: ${grant.name} - Remaining: MWK ${remaining.toLocaleString()}`, false, 'info');
    }
}

function deleteGrant(id) {
    if (confirm('Are you sure you want to delete this grant?')) {
        const grant = appData.grants.find(g => g.id === id);
        if (grant) {
            // Update donor total funding
            const donor = appData.donors.find(d => d.id === grant.donorId);
            if (donor) {
                donor.totalFunding -= grant.amount;
            }
        }
        
        appData.grants = appData.grants.filter(g => g.id !== id);
        saveToStorage('grants');
        saveToStorage('donors');
        loadGrantsTable();
        loadDonorsTable();
        showNotification('Grant deleted successfully!', false, 'success');
    }
}

// ========== MODULE INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', function() {
    // Initialize data structures
    initializeAllData();
    
    // Load table data based on current page
    if (document.getElementById('customersTableBody')) loadCustomersTable();
    if (document.getElementById('productsTableBody')) loadProductsTable();
    if (document.getElementById('invoicesTableBody')) loadInvoicesTable();
    if (document.getElementById('quotationsTableBody')) loadQuotationsTable();
    if (document.getElementById('journalTableBody')) loadJournalTable();
    if (document.getElementById('payrollTableBody')) loadPayrollTable();
    if (document.getElementById('teamTableBody')) loadTeamTable();
    if (document.getElementById('donorsTableBody')) loadDonorsTable();
    if (document.getElementById('grantsTableBody')) loadGrantsTable();
    if (document.getElementById('companyProfileForm')) loadCompanyProfileForm();
});

// Make functions globally available
window.showCustomerModal = showCustomerModal;
window.showProductModal = showProductModal;
window.showQuotationModal = showQuotationModal;
window.showJournalModal = showJournalModal;
window.showPayrollModal = showPayrollModal;
window.showTeamMemberModal = showTeamMemberModal;
window.showDonorModal = showDonorModal;
window.showGrantModal = showGrantModal;
window.saveCompanyProfile = saveCompanyProfile;
window.loadCustomersTable = loadCustomersTable;
window.loadProductsTable = loadProductsTable;
window.loadInvoicesTable = loadInvoicesTable;
window.loadQuotationsTable = loadQuotationsTable;
window.loadJournalTable = loadJournalTable;
window.loadPayrollTable = loadPayrollTable;
window.loadTeamTable = loadTeamTable;
window.loadDonorsTable = loadDonorsTable;
window.loadGrantsTable = loadGrantsTable;
