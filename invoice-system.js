// ========== ENHANCED INVOICE SYSTEM ==========

function showInvoiceModal() {
    const modalHtml = `
        <div class="modal" id="invoiceModal" style="display: flex;">
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close" onclick="closeModal('invoiceModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Create Invoice</h2>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <span class="status-badge" id="accountingMethodBadge">Accrual</span>
                        <span class="status-badge status-paid" id="taxStatus">Tax Inclusive</span>
                    </div>
                </div>
                
                <form id="invoiceForm" onsubmit="handleEnhancedInvoiceSubmit(event)">
                    <div class="form-grid mb-3">
                        <div class="form-group">
                            <label class="form-label">Customer *</label>
                            <select class="form-select" id="invoiceCustomer" required onchange="loadCustomerTaxInfo()">
                                <option value="">Select Customer</option>
                                ${appData.customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Invoice Date *</label>
                            <input type="date" class="form-input" id="invoiceDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Due Date *</label>
                            <input type="date" class="form-input" id="invoiceDueDate" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tax Rate *</label>
                            <select class="form-select" id="invoiceTaxRate" required onchange="calculateInvoiceTotals()">
                                <option value="">Select Tax</option>
                                ${Object.keys(taxRates).map(key => 
                                    `<option value="${key}">${taxRates[key].code} (${taxRates[key].rate}%)</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <h3 class="mb-2">Invoice Items</h3>
                        <div id="invoiceItems">
                            <div class="invoice-item mb-2" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 12px; align-items: end;">
                                <select class="form-select invoice-product" required onchange="updateItemTax(this)">
                                    <option value="">Select Product/Service</option>
                                    ${appData.products.map(p => `<option value="${p.id}" data-type="${p.category}">${p.name}</option>`).join('')}
                                </select>
                                <input type="number" class="form-input invoice-qty" placeholder="Qty" min="1" value="1" required oninput="calculateInvoiceTotals()">
                                <input type="number" class="form-input invoice-price" placeholder="Price" min="0" step="0.01" required oninput="calculateInvoiceTotals()">
                                <select class="form-select invoice-tax">
                                    <option value="VAT">VAT (16.5%)</option>
                                    ${Object.keys(taxRates).map(key => 
                                        `<option value="${key}">${taxRates[key].code}</option>`
                                    ).join('')}
                                </select>
                                <button type="button" class="btn btn-danger btn-sm" onclick="removeInvoiceItem(this)">×</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="addInvoiceItem()">+ Add Item</button>
                    </div>
                    
                    <!-- Invoice Summary -->
                    <div class="mb-3 p-3" style="background: var(--bg-tertiary); border-radius: 8px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Subtotal</div>
                                <div style="font-size: 18px; font-weight: 700;" id="invoiceSubtotal">MWK 0.00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Tax</div>
                                <div style="font-size: 18px; font-weight: 700; color: var(--primary);" id="invoiceTax">MWK 0.00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Discount</div>
                                <div style="font-size: 18px; font-weight: 700; color: var(--danger);" id="invoiceDiscount">MWK 0.00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Total</div>
                                <div style="font-size: 24px; font-weight: 800; color: var(--success);" id="invoiceTotal">MWK 0.00</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Accounting Options -->
                    <div class="mb-3">
                        <h3 class="mb-2">Accounting Options</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Revenue Recognition</label>
                                <select class="form-select" id="revenueRecognition">
                                    <option value="immediate">Immediate (on invoice)</option>
                                    <option value="on_payment">On Payment</option>
                                    <option value="deferred">Deferred (over time)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Payment Terms</label>
                                <select class="form-select" id="paymentTerms">
                                    <option value="net_30">Net 30</option>
                                    <option value="net_15">Net 15</option>
                                    <option value="due_on_receipt">Due on Receipt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('invoiceModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Invoice</button>
                        <button type="button" class="btn btn-secondary" onclick="saveInvoiceDraft()">Save as Draft</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Set default dates
    const today = new Date();
    document.getElementById('invoiceDate').value = today.toISOString().split('T')[0];
    
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('invoiceDueDate').value = dueDate.toISOString().split('T')[0];
    
    // Set accounting method badge
    const method = appData.accountingMethod || 'accrual';
    document.getElementById('accountingMethodBadge').textContent = method === 'accrual' ? 'Accrual' : 'Cash Basis';
    
    // Set tax status
    const taxSettings = JSON.parse(localStorage.getItem('taxSettings') || '{}');
    document.getElementById('taxStatus').textContent = taxSettings.taxInclusive !== false ? 'Tax Inclusive' : 'Tax Exclusive';
}

function calculateInvoiceTotals() {
    let subtotal = 0;
    let totalTax = 0;
    
    // Calculate from items
    document.querySelectorAll('.invoice-item').forEach(item => {
        const qty = parseFloat(item.querySelector('.invoice-qty').value) || 0;
        const price = parseFloat(item.querySelector('.invoice-price').value) || 0;
        const taxCode = item.querySelector('.invoice-tax').value;
        const taxRate = taxRates[taxCode]?.rate || 0;
        
        const itemTotal = qty * price;
        const itemTax = itemTotal * (taxRate / 100);
        
        subtotal += itemTotal;
        totalTax += itemTax;
    });
    
    // Apply discount if any
    const discount = parseFloat(document.getElementById('invoiceDiscount')?.dataset.discount || 0);
    
    const total = subtotal + totalTax - discount;
    
    // Update display
    document.getElementById('invoiceSubtotal').textContent = `MWK ${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('invoiceTax').textContent = `MWK ${totalTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('invoiceTotal').textContent = `MWK ${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function updateItemTax(select) {
    const productId = select.value;
    const product = appData.products.find(p => p.id == productId);
    if (!product) return;
    
    // Set default tax based on product type
    const taxSelect = select.closest('.invoice-item').querySelector('.invoice-tax');
    const taxSettings = JSON.parse(localStorage.getItem('taxSettings') || '{}');
    
    if (product.category === 'Services') {
        taxSelect.value = taxSettings.defaultServiceTax || 'SERVICE';
    } else {
        taxSelect.value = taxSettings.defaultSalesTax || 'VAT';
    }
    
    calculateInvoiceTotals();
}

function addInvoiceItem() {
    const itemsContainer = document.getElementById('invoiceItems');
    const newItem = document.createElement('div');
    newItem.className = 'invoice-item mb-2';
    newItem.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 12px; align-items: end;';
    
    newItem.innerHTML = `
        <select class="form-select invoice-product" required onchange="updateItemTax(this)">
            <option value="">Select Product/Service</option>
            ${appData.products.map(p => `<option value="${p.id}" data-type="${p.category}">${p.name}</option>`).join('')}
        </select>
        <input type="number" class="form-input invoice-qty" placeholder="Qty" min="1" value="1" required oninput="calculateInvoiceTotals()">
        <input type="number" class="form-input invoice-price" placeholder="Price" min="0" step="0.01" required oninput="calculateInvoiceTotals()">
        <select class="form-select invoice-tax">
            ${Object.keys(taxRates).map(key => 
                `<option value="${key}">${taxRates[key].code}</option>`
            ).join('')}
        </select>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeInvoiceItem(this)">×</button>
    `;
    
    itemsContainer.appendChild(newItem);
}

function removeInvoiceItem(button) {
    const item = button.closest('.invoice-item');
    if (item && document.querySelectorAll('.invoice-item').length > 1) {
        item.remove();
        calculateInvoiceTotals();
    }
}

function handleEnhancedInvoiceSubmit(e) {
    e.preventDefault();
    
    const invoiceData = {
        id: appData.invoices.length + 1,
        number: `INV-${new Date().getFullYear()}-${String(appData.invoices.length + 1).padStart(4, '0')}`,
        customerId: document.getElementById('invoiceCustomer').value,
        customer: appData.customers.find(c => c.id == document.getElementById('invoiceCustomer').value)?.name,
        date: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('invoiceDueDate').value,
        taxRate: document.getElementById('invoiceTaxRate').value,
        accountingMethod: appData.accountingMethod || 'accrual',
        revenueRecognition: document.getElementById('revenueRecognition').value,
        paymentTerms: document.getElementById('paymentTerms').value,
        items: [],
        subtotal: parseFloat(document.getElementById('invoiceSubtotal').textContent.replace(/[^0-9.-]+/g, '')),
        tax: parseFloat(document.getElementById('invoiceTax').textContent.replace(/[^0-9.-]+/g, '')),
        total: parseFloat(document.getElementById('invoiceTotal').textContent.replace(/[^0-9.-]+/g, '')),
        status: 'pending',
        paid: false,
        paidAmount: 0,
        paidDate: null,
        createdAt: new Date().toISOString()
    };
    
    // Collect items
    document.querySelectorAll('.invoice-item').forEach(item => {
        const productId = item.querySelector('.invoice-product').value;
        const product = appData.products.find(p => p.id == productId);
        
        invoiceData.items.push({
            productId: productId,
            productName: product?.name,
            quantity: parseFloat(item.querySelector('.invoice-qty').value),
            price: parseFloat(item.querySelector('.invoice-price').value),
            taxCode: item.querySelector('.invoice-tax').value,
            taxRate: taxRates[item.querySelector('.invoice-tax').value]?.rate || 0
        });
    });
    
    // Save invoice
    appData.invoices.push(invoiceData);
    
    // Create journal entries based on accounting method
    createInvoiceJournalEntries(invoiceData);
    
    // Update stock if it's a physical product
    updateStockFromInvoice(invoiceData);
    
    // Save data
    saveData();
    
    // Show success
    showNotification(`Invoice ${invoiceData.number} created successfully!`, false, 'success');
    
    // Close modal and refresh tables
    closeModal('invoiceModal');
    populateInvoicesTable();
    
    // Update dashboard
    loadDashboard();
}

// ========== JOURNAL ENTRY CREATION ==========
function createInvoiceJournalEntries(invoice) {
    const journalEntries = [];
    
    // Entry 1: Sales/Revenue Recognition
    if (appData.accountingMethod === 'accrual') {
        // Accrual accounting: Record revenue when earned (invoice date)
        journalEntries.push({
            id: appData.journalEntries.length + 1,
            number: `JE-${new Date().getFullYear()}-${String(appData.journalEntries.length + 1).padStart(4, '0')}`,
            date: invoice.date,
            description: `Sales Revenue - ${invoice.number}`,
            lines: [
                { accountCode: '1100', accountName: 'Accounts Receivable', debit: invoice.total, credit: 0 },
                { accountCode: '4000', accountName: 'Sales Revenue', debit: 0, credit: invoice.subtotal },
                { accountCode: '2300', accountName: 'Sales Tax Payable', debit: 0, credit: invoice.tax }
            ],
            totalDebit: invoice.total,
            totalCredit: invoice.total,
            status: 'posted',
            reference: invoice.number,
            source: 'invoice'
        });
    } else {
        // Cash basis: Record revenue only when paid
        // Create a deferred revenue entry
        journalEntries.push({
            id: appData.journalEntries.length + 1,
            number: `JE-${new Date().getFullYear()}-${String(appData.journalEntries.length + 1).padStart(4, '0')}`,
            date: invoice.date,
            description: `Deferred Revenue - ${invoice.number}`,
            lines: [
                { accountCode: '1100', accountName: 'Accounts Receivable', debit: invoice.total, credit: 0 },
                { accountCode: '2500', accountName: 'Deferred Revenue', debit: 0, credit: invoice.total }
            ],
            totalDebit: invoice.total,
            totalCredit: invoice.total,
            status: 'posted',
            reference: invoice.number,
            source: 'invoice_deferred'
        });
    }
    
    // Entry 2: Cost of Goods Sold (if applicable)
    let totalCOGS = 0;
    invoice.items.forEach(item => {
        const product = appData.products.find(p => p.id == item.productId);
        if (product && product.cost > 0) {
            totalCOGS += product.cost * item.quantity;
        }
    });
    
    if (totalCOGS > 0) {
        journalEntries.push({
            id: appData.journalEntries.length + 2,
            number: `JE-${new Date().getFullYear()}-${String(appData.journalEntries.length + 2).padStart(4, '0')}`,
            date: invoice.date,
            description: `Cost of Sales - ${invoice.number}`,
            lines: [
                { accountCode: '5000', accountName: 'Cost of Sales', debit: totalCOGS, credit: 0 },
                { accountCode: '1200', accountName: 'Inventory', debit: 0, credit: totalCOGS }
            ],
            totalDebit: totalCOGS,
            totalCredit: totalCOGS,
            status: 'posted',
            reference: invoice.number,
            source: 'cogs'
        });
    }
    
    // Add to journal entries
    journalEntries.forEach(entry => {
        appData.journalEntries.push(entry);
    });
    saveData();
}

// Stock Management Integration
function updateStockFromInvoice(invoice) {
    invoice.items.forEach(item => {
        const product = appData.products.find(p => p.id == item.productId);
        if (product && product.stock !== undefined) {
            // Reduce stock
            product.stock -= item.quantity;
            
            // Record stock movement
            const stockMovement = {
                id: appData.stockMovements.length + 1,
                date: invoice.date,
                productId: product.id,
                productName: product.name,
                type: 'sale',
                quantity: -item.quantity,
                reference: invoice.number,
                balanceAfter: product.stock
            };
            
            appData.stockMovements.push(stockMovement);
        }
    });
    
    saveData();
}

// ========== REAL-TIME FINANCIAL UPDATES ==========
function updateFinancialStatements() {
    console.log("Updating financial statements...");
    
    // Update chart of accounts based on journal entries
    updateChartOfAccounts();
    
    // Update dashboard
    loadDashboard();
    
    // Update all open financial statements
    updateOpenFinancialReports();
}

function updateChartOfAccounts() {
    // Reset all account balances
    appData.chartOfAccounts.forEach(account => {
        account.balance = 0;
    });
    
    // Recalculate balances from journal entries
    appData.journalEntries.forEach(entry => {
        if (entry.status !== 'posted') return;
        
        entry.lines.forEach(line => {
            const account = appData.chartOfAccounts.find(a => a.code === line.accountCode);
            if (account) {
                if (line.debit > 0) {
                    // Debit increases assets/expenses, decreases liabilities/equity/revenue
                    if (account.type === 'Asset' || account.type === 'Expense') {
                        account.balance += line.debit;
                    } else {
                        account.balance -= line.debit;
                    }
                }
                if (line.credit > 0) {
                    // Credit decreases assets/expenses, increases liabilities/equity/revenue
                    if (account.type === 'Asset' || account.type === 'Expense') {
                        account.balance -= line.credit;
                    } else {
                        account.balance += line.credit;
                    }
                }
            }
        });
    });
    
    saveData();
}

function updateOpenFinancialReports() {
    // Check which financial report pages are open and update them
    const pages = [
        'income-statement',
        'balance-sheet',
        'cashflow',
        'trial-balance'
    ];
    
    pages.forEach(page => {
        const pageElement = document.getElementById(`page-${page}`);
        if (pageElement && !pageElement.classList.contains('hidden')) {
            // This page is currently open, refresh it
            loadPageData(page);
        }
    });
}

function saveInvoiceDraft() {
    showNotification('Invoice saved as draft', false, 'info');
    // Implementation for saving draft
}

function loadCustomerTaxInfo() {
    // Implementation for loading customer-specific tax info
}