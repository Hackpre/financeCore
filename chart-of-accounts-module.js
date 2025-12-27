// ========== CHART OF ACCOUNTS MODULE ==========
// Full CRUD operations with financial statement integration

// ========== LOAD ACCOUNTS TABLE ==========
function loadAccountsTable() {
    const tbody = document.getElementById('accountsTableBody');
    if (!tbody) return;
    
    if (!appData.accounts) {
        loadChartOfAccounts();
    }
    
    // Sort accounts by code
    const sortedAccounts = [...appData.accounts].sort((a, b) => a.code.localeCompare(b.code));
    
    let html = '';
    sortedAccounts.forEach(account => {
        const balanceClass = account.balance < 0 ? 'amount negative' : 
                            account.balance > 0 ? 'amount positive' : 'amount';
        
        html += `
            <tr>
                <td><strong>${account.code}</strong></td>
                <td>${account.name}</td>
                <td><span class="status-badge status-pending">${account.type}</span></td>
                <td>${account.category}</td>
                <td class="text-right ${balanceClass}">
                    <strong>MWK ${Math.abs(account.balance).toLocaleString()}</strong>
                    ${account.balance < 0 ? ' (Cr)' : ''}
                </td>
                <td>
                    <button class="btn btn-sm btn-primary action-btn" onclick="editAccount('${account.code}')">Edit</button>
                    <button class="btn btn-sm btn-danger action-btn" onclick="deleteAccount('${account.code}')">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html || '<tr><td colspan="6" class="text-center">No accounts found. Click "+ New Account" to add one.</td></tr>';
}

// ========== SHOW ACCOUNT MODAL ==========
function showAccountModal(accountCode = null) {
    const account = accountCode ? appData.accounts.find(a => a.code === accountCode) : null;
    const isEdit = !!account;
    
    const modalHtml = `
        <div class="modal active" id="accountModal">
            <div class="modal-content" style="max-width: 800px;">
                <button class="modal-close" onclick="closeModal('accountModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Edit' : 'Add New'} Account</h2>
                    <p class="page-subtitle">IFRS 18 Compliant Chart of Accounts</p>
                </div>
                <form id="accountForm" onsubmit="saveAccount(event, '${accountCode || ''}')">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Account Code *</label>
                            <input type="text" class="form-input" id="accountCode" 
                                   value="${account?.code || ''}" 
                                   ${isEdit ? 'readonly style="background: var(--bg-tertiary);"' : ''} 
                                   required 
                                   placeholder="e.g., 1000, 2000, 4000">
                            <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                                1xxx=Assets, 2xxx=Liabilities, 3xxx=Equity, 4xxx=Revenue, 5xxx+=Expenses
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Account Name *</label>
                            <input type="text" class="form-input" id="accountName" 
                                   value="${account?.name || ''}" 
                                   required 
                                   placeholder="e.g., Cash and Bank">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Account Type *</label>
                            <select class="form-select" id="accountType" required onchange="updateAccountCategories()">
                                <option value="">Select Type</option>
                                <option value="Asset" ${account?.type === 'Asset' ? 'selected' : ''}>Asset</option>
                                <option value="Liability" ${account?.type === 'Liability' ? 'selected' : ''}>Liability</option>
                                <option value="Equity" ${account?.type === 'Equity' ? 'selected' : ''}>Equity</option>
                                <option value="Revenue" ${account?.type === 'Revenue' ? 'selected' : ''}>Revenue</option>
                                <option value="Expense" ${account?.type === 'Expense' ? 'selected' : ''}>Expense</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category (IFRS 18) *</label>
                            <select class="form-select" id="accountCategory" required>
                                <option value="">Select Category</option>
                            </select>
                            <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                                Category determines placement in financial statements
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Opening Balance (MWK)</label>
                            <input type="number" class="form-input" id="accountBalance" 
                                   value="${account?.balance || 0}" 
                                   step="0.01" 
                                   placeholder="0.00">
                            <small style="display: block; margin-top: 4px; color: var(--text-secondary);">
                                Use negative for credit balances (e.g., Liabilities, Revenue)
                            </small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-select" id="accountStatus">
                                <option value="active" ${account?.status !== 'inactive' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${account?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" id="accountDescription" rows="3" 
                                  placeholder="Optional description of this account">${account?.description || ''}</textarea>
                    </div>
                    
                    <div class="card mb-3" style="background: var(--bg-tertiary); padding: 16px;">
                        <h4 style="margin-bottom: 12px;">💡 IFRS 18 Guidelines</h4>
                        <ul style="margin-left: 20px; font-size: 13px; line-height: 1.8;">
                            <li><strong>Assets:</strong> Current Assets, Non-Current Assets</li>
                            <li><strong>Liabilities:</strong> Current Liabilities, Non-Current Liabilities</li>
                            <li><strong>Equity:</strong> Share Capital, Retained Earnings, Reserves</li>
                            <li><strong>Revenue:</strong> Operating Income, Other Income</li>
                            <li><strong>Expenses:</strong> Main Business, Unusual Items, Financing</li>
                        </ul>
                    </div>
                    
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline" onclick="closeModal('accountModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Create'} Account</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize categories based on current type
    updateAccountCategories();
    
    // Set the current category if editing
    if (account && account.category) {
        setTimeout(() => {
            document.getElementById('accountCategory').value = account.category;
        }, 10);
    }
}

// ========== UPDATE ACCOUNT CATEGORIES ==========
function updateAccountCategories() {
    const typeSelect = document.getElementById('accountType');
    const categorySelect = document.getElementById('accountCategory');
    
    if (!typeSelect || !categorySelect) return;
    
    const type = typeSelect.value;
    const currentValue = categorySelect.value;
    
    const categories = {
        'Asset': [
            'Current Assets',
            'Non-Current Assets',
            'Fixed Assets',
            'Intangible Assets',
            'Investments'
        ],
        'Liability': [
            'Current Liabilities',
            'Non-Current Liabilities',
            'Long-term Debt'
        ],
        'Equity': [
            'Share Capital',
            'Retained Earnings',
            'Reserves',
            'Treasury Stock'
        ],
        'Revenue': [
            'Operating Income',
            'Service Revenue',
            'Other Income',
            'Investment Income'
        ],
        'Expense': [
            'Main Business',
            'Cost of Sales',
            'Operating Expenses',
            'Unusual Items',
            'Financing',
            'Other Expenses'
        ]
    };
    
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    
    if (type && categories[type]) {
        categories[type].forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            if (cat === currentValue) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
    }
}

// ========== SAVE ACCOUNT ==========
function saveAccount(e, oldCode) {
    e.preventDefault();
    
    const code = document.getElementById('accountCode').value.trim();
    const name = document.getElementById('accountName').value.trim();
    const type = document.getElementById('accountType').value;
    const category = document.getElementById('accountCategory').value;
    const balance = parseFloat(document.getElementById('accountBalance').value) || 0;
    const status = document.getElementById('accountStatus').value;
    const description = document.getElementById('accountDescription').value.trim();
    
    // Validation
    if (!code || !name || !type || !category) {
        showNotification('Please fill all required fields', true, 'error');
        return;
    }
    
    // Check for duplicate code (only when creating new or changing code)
    if (!oldCode || oldCode !== code) {
        const exists = appData.accounts.find(a => a.code === code);
        if (exists) {
            showNotification(`Account code ${code} already exists!`, true, 'error');
            return;
        }
    }
    
    const accountData = {
        code: code,
        name: name,
        type: type,
        category: category,
        balance: balance,
        status: status || 'active',
        description: description,
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    
    if (oldCode) {
        // Edit existing account
        const index = appData.accounts.findIndex(a => a.code === oldCode);
        if (index !== -1) {
            // Keep the created date from old account
            const oldAccount = appData.accounts[index];
            accountData.createdDate = oldAccount.createdDate;
            appData.accounts[index] = accountData;
            showNotification(`Account ${code} updated successfully!`, false, 'success');
        }
    } else {
        // Create new account
        appData.accounts.push(accountData);
        showNotification(`Account ${code} - ${name} created successfully!`, false, 'success');
    }
    
    saveToStorage('accounts');
    closeModal('accountModal');
    loadAccountsTable();
    
    // Refresh financial statements if they're open
    refreshFinancialStatements();
}

// ========== EDIT ACCOUNT ==========
function editAccount(code) {
    showAccountModal(code);
}

// ========== DELETE ACCOUNT ==========
function deleteAccount(code) {
    const account = appData.accounts.find(a => a.code === code);
    
    if (!account) return;
    
    // Check if account is used in journal entries
    const usedInJournal = appData.journalEntries && appData.journalEntries.some(entry => 
        entry.lines && entry.lines.some(line => line.account === code)
    );
    
    if (usedInJournal) {
        if (!confirm(`⚠️ WARNING: Account ${code} - ${account.name} is used in journal entries!\n\nDeleting it may cause issues in reports. Instead, you can mark it as Inactive.\n\nAre you sure you want to DELETE this account?`)) {
            return;
        }
    } else {
        if (!confirm(`Delete account ${code} - ${account.name}?`)) {
            return;
        }
    }
    
    appData.accounts = appData.accounts.filter(a => a.code !== code);
    saveToStorage('accounts');
    loadAccountsTable();
    showNotification(`Account ${code} deleted successfully!`, false, 'success');
    
    // Refresh financial statements
    refreshFinancialStatements();
}

// ========== ACCOUNT SUMMARY ==========
function showAccountSummary() {
    const summary = {
        totalAssets: 0,
        totalLiabilities: 0,
        totalEquity: 0,
        totalRevenue: 0,
        totalExpenses: 0
    };
    
    appData.accounts.forEach(account => {
        switch(account.type) {
            case 'Asset':
                summary.totalAssets += account.balance;
                break;
            case 'Liability':
                summary.totalLiabilities += Math.abs(account.balance);
                break;
            case 'Equity':
                summary.totalEquity += Math.abs(account.balance);
                break;
            case 'Revenue':
                summary.totalRevenue += Math.abs(account.balance);
                break;
            case 'Expense':
                summary.totalExpenses += account.balance;
                break;
        }
    });
    
    const modalHtml = `
        <div class="modal active" id="summaryModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('summaryModal')">×</button>
                <div class="modal-header">
                    <h2 class="modal-title">Chart of Accounts Summary</h2>
                </div>
                
                <div class="stats-grid mb-3">
                    <div class="stat-card">
                        <div class="stat-label">Total Assets</div>
                        <div class="stat-value">MWK ${summary.totalAssets.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Total Liabilities</div>
                        <div class="stat-value">MWK ${summary.totalLiabilities.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Total Equity</div>
                        <div class="stat-value">MWK ${summary.totalEquity.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="mb-2">Balance Check</h3>
                    <div style="padding: 16px; background: var(--bg-tertiary); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Assets:</span>
                            <strong>MWK ${summary.totalAssets.toLocaleString()}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Liabilities + Equity:</span>
                            <strong>MWK ${(summary.totalLiabilities + summary.totalEquity).toLocaleString()}</strong>
                        </div>
                        <hr style="margin: 12px 0;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>Difference:</strong>
                            <strong style="color: ${Math.abs(summary.totalAssets - (summary.totalLiabilities + summary.totalEquity)) < 1 ? 'var(--success)' : 'var(--danger)'}">
                                MWK ${Math.abs(summary.totalAssets - (summary.totalLiabilities + summary.totalEquity)).toLocaleString()}
                            </strong>
                        </div>
                        <div style="margin-top: 12px; text-align: center;">
                            ${Math.abs(summary.totalAssets - (summary.totalLiabilities + summary.totalEquity)) < 1 ? 
                                '<span style="color: var(--success);">✅ Balance Sheet is balanced!</span>' : 
                                '<span style="color: var(--warning);">⚠️ Balance Sheet needs adjustment</span>'}
                        </div>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <h3 class="mb-2">Income Statement Summary</h3>
                    <div style="padding: 16px; background: var(--bg-tertiary); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Total Revenue:</span>
                            <strong style="color: var(--success);">MWK ${summary.totalRevenue.toLocaleString()}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Total Expenses:</span>
                            <strong style="color: var(--danger);">MWK ${summary.totalExpenses.toLocaleString()}</strong>
                        </div>
                        <hr style="margin: 12px 0;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>Net Profit/Loss:</strong>
                            <strong style="color: ${(summary.totalRevenue - summary.totalExpenses) >= 0 ? 'var(--success)' : 'var(--danger)'}">
                                MWK ${(summary.totalRevenue - summary.totalExpenses).toLocaleString()}
                            </strong>
                        </div>
                    </div>
                </div>
                
                <div class="btn-group mt-3">
                    <button class="btn btn-outline" onclick="closeModal('summaryModal')">Close</button>
                    <button class="btn btn-primary" onclick="closeModal('summaryModal'); navigateTo('balance-sheet');">View Balance Sheet</button>
                    <button class="btn btn-success" onclick="closeModal('summaryModal'); navigateTo('income-statement');">View Income Statement</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ========== REFRESH FINANCIAL STATEMENTS ==========
function refreshFinancialStatements() {
    // This function will be called to regenerate financial statements
    // when chart of accounts changes
    if (typeof generateBalanceSheet === 'function') {
        generateBalanceSheet();
    }
    if (typeof generateIncomeStatement === 'function') {
        generateIncomeStatement();
    }
}

// ========== EXPORT CHART OF ACCOUNTS ==========
function exportChartOfAccounts() {
    const csv = generateAccountsCSV();
    downloadCSV(csv, 'chart-of-accounts.csv');
    showNotification('Chart of Accounts exported successfully!', false, 'success');
}

function generateAccountsCSV() {
    let csv = 'Account Code,Account Name,Type,Category,Balance,Status\n';
    
    appData.accounts.sort((a, b) => a.code.localeCompare(b.code)).forEach(account => {
        csv += `"${account.code}","${account.name}","${account.type}","${account.category}",${account.balance},"${account.status || 'active'}"\n`;
    });
    
    return csv;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Make functions globally available
window.loadAccountsTable = loadAccountsTable;
window.showAccountModal = showAccountModal;
window.updateAccountCategories = updateAccountCategories;
window.saveAccount = saveAccount;
window.editAccount = editAccount;
window.deleteAccount = deleteAccount;
window.showAccountSummary = showAccountSummary;
window.exportChartOfAccounts = exportChartOfAccounts;
