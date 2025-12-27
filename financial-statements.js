// ========== FINANCIAL STATEMENTS GENERATOR ==========
// Automatically generates statements from Chart of Accounts

// ========== GENERATE BALANCE SHEET ==========
function generateBalanceSheet() {
    const container = document.getElementById('balanceSheetContent');
    if (!container) return;
    
    if (!appData.accounts || appData.accounts.length === 0) {
        container.innerHTML = '<p class="text-center" style="padding: 40px;">No accounts found. Please add accounts in Chart of Accounts.</p>';
        return;
    }
    
    // Get active accounts only
    const activeAccounts = appData.accounts.filter(a => a.status !== 'inactive');
    
    // Categorize accounts
    const assets = {
        current: activeAccounts.filter(a => a.type === 'Asset' && a.category === 'Current Assets'),
        nonCurrent: activeAccounts.filter(a => a.type === 'Asset' && (a.category === 'Non-Current Assets' || a.category === 'Fixed Assets' || a.category === 'Intangible Assets' || a.category === 'Investments'))
    };
    
    const liabilities = {
        current: activeAccounts.filter(a => a.type === 'Liability' && a.category === 'Current Liabilities'),
        nonCurrent: activeAccounts.filter(a => a.type === 'Liability' && (a.category === 'Non-Current Liabilities' || a.category === 'Long-term Debt'))
    };
    
    const equity = activeAccounts.filter(a => a.type === 'Equity');
    
    // Calculate totals
    const totalCurrentAssets = assets.current.reduce((sum, a) => sum + a.balance, 0);
    const totalNonCurrentAssets = assets.nonCurrent.reduce((sum, a) => sum + a.balance, 0);
    const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
    
    const totalCurrentLiabilities = liabilities.current.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const totalNonCurrentLiabilities = liabilities.nonCurrent.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
    
    const totalEquity = equity.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    
    const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
    
    // Generate HTML
    let html = `
        <div class="statement-section">
            <div class="statement-header">ASSETS</div>
            
            <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600;">
                <span>Current Assets</span>
                <span></span>
            </div>
            ${assets.current.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount">MWK ${a.balance.toLocaleString()}</span>
                </div>
            `).join('')}
            ${assets.current.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No current assets</span><span></span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Current Assets</span>
                <span class="amount">MWK ${totalCurrentAssets.toLocaleString()}</span>
            </div>
            
            <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600; margin-top: 16px;">
                <span>Non-Current Assets</span>
                <span></span>
            </div>
            ${assets.nonCurrent.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount ${a.balance < 0 ? 'negative' : ''}">MWK ${Math.abs(a.balance).toLocaleString()}${a.balance < 0 ? ' (Cr)' : ''}</span>
                </div>
            `).join('')}
            ${assets.nonCurrent.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No non-current assets</span><span></span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Non-Current Assets</span>
                <span class="amount">MWK ${totalNonCurrentAssets.toLocaleString()}</span>
            </div>
            
            <div class="statement-row total" style="margin-top: 16px;">
                <span>TOTAL ASSETS</span>
                <span class="amount">MWK ${totalAssets.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="statement-section" style="margin-top: 32px;">
            <div class="statement-header">LIABILITIES</div>
            
            <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600;">
                <span>Current Liabilities</span>
                <span></span>
            </div>
            ${liabilities.current.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount">MWK ${Math.abs(a.balance).toLocaleString()}</span>
                </div>
            `).join('')}
            ${liabilities.current.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No current liabilities</span><span></span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Current Liabilities</span>
                <span class="amount">MWK ${totalCurrentLiabilities.toLocaleString()}</span>
            </div>
            
            <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600; margin-top: 16px;">
                <span>Non-Current Liabilities</span>
                <span></span>
            </div>
            ${liabilities.nonCurrent.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount">MWK ${Math.abs(a.balance).toLocaleString()}</span>
                </div>
            `).join('')}
            ${liabilities.nonCurrent.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No non-current liabilities</span><span></span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Non-Current Liabilities</span>
                <span class="amount">MWK ${totalNonCurrentLiabilities.toLocaleString()}</span>
            </div>
            
            <div class="statement-row total" style="margin-top: 16px;">
                <span>TOTAL LIABILITIES</span>
                <span class="amount">MWK ${totalLiabilities.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="statement-section" style="margin-top: 32px;">
            <div class="statement-header">EQUITY</div>
            ${equity.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount">MWK ${Math.abs(a.balance).toLocaleString()}</span>
                </div>
            `).join('')}
            ${equity.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No equity accounts</span><span></span></div>' : ''}
            <div class="statement-row total" style="margin-top: 16px;">
                <span>TOTAL EQUITY</span>
                <span class="amount">MWK ${totalEquity.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="statement-section" style="margin-top: 32px;">
            <div class="statement-row total">
                <span>TOTAL LIABILITIES AND EQUITY</span>
                <span class="amount">MWK ${totalLiabilitiesAndEquity.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="card mt-3" style="background: ${Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; border-left: 4px solid ${Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? 'var(--success)' : 'var(--warning)'};">
            <div style="padding: 16px;">
                <strong>Balance Check:</strong><br>
                Assets: MWK ${totalAssets.toLocaleString()}<br>
                Liabilities + Equity: MWK ${totalLiabilitiesAndEquity.toLocaleString()}<br>
                Difference: MWK ${Math.abs(totalAssets - totalLiabilitiesAndEquity).toLocaleString()}
                <br><br>
                ${Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1 ? 
                    '<span style="color: var(--success);">✅ Balance Sheet is balanced!</span>' : 
                    '<span style="color: var(--warning);">⚠️ Balance Sheet needs adjustment. Check your Chart of Accounts.</span>'}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ========== GENERATE INCOME STATEMENT ==========
function generateIncomeStatement() {
    const container = document.getElementById('incomeStatementContent');
    if (!container) return;
    
    if (!appData.accounts || appData.accounts.length === 0) {
        container.innerHTML = '<p class="text-center" style="padding: 40px;">No accounts found. Please add accounts in Chart of Accounts.</p>';
        return;
    }
    
    // Get active accounts only
    const activeAccounts = appData.accounts.filter(a => a.status !== 'inactive');
    
    // Categorize revenue and expenses (IFRS 18 format)
    const revenue = {
        operating: activeAccounts.filter(a => a.type === 'Revenue' && (a.category === 'Operating Income' || a.category === 'Service Revenue')),
        other: activeAccounts.filter(a => a.type === 'Revenue' && (a.category === 'Other Income' || a.category === 'Investment Income'))
    };
    
    const expenses = {
        mainBusiness: activeAccounts.filter(a => a.type === 'Expense' && (a.category === 'Main Business' || a.category === 'Cost of Sales' || a.category === 'Operating Expenses')),
        unusual: activeAccounts.filter(a => a.type === 'Expense' && a.category === 'Unusual Items'),
        financing: activeAccounts.filter(a => a.type === 'Expense' && a.category === 'Financing'),
        other: activeAccounts.filter(a => a.type === 'Expense' && a.category === 'Other Expenses')
    };
    
    // Calculate totals
    const totalOperatingRevenue = revenue.operating.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const totalOtherRevenue = revenue.other.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const totalRevenue = totalOperatingRevenue + totalOtherRevenue;
    
    const totalMainBusinessExpenses = expenses.mainBusiness.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const operatingProfit = totalOperatingRevenue - totalMainBusinessExpenses;
    
    const totalUnusualExpenses = expenses.unusual.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const profitBeforeFinancing = operatingProfit + totalOtherRevenue - totalUnusualExpenses;
    
    const totalFinancingExpenses = expenses.financing.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const profitBeforeTax = profitBeforeFinancing - totalFinancingExpenses;
    
    const totalOtherExpenses = expenses.other.reduce((sum, a) => sum + Math.abs(a.balance), 0);
    const netProfit = profitBeforeTax - totalOtherExpenses;
    
    // Generate HTML (IFRS 18 Format)
    let html = `
        <div class="statement-section">
            <div class="statement-header">REVENUE</div>
            
            <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600;">
                <span>Operating Revenue</span>
                <span></span>
            </div>
            ${revenue.operating.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount positive">MWK ${Math.abs(a.balance).toLocaleString()}</span>
                </div>
            `).join('')}
            ${revenue.operating.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No operating revenue</span><span class="amount">MWK 0</span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Operating Revenue</span>
                <span class="amount">MWK ${totalOperatingRevenue.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="statement-section" style="margin-top: 24px;">
            <div class="statement-header">EXPENSES - MAIN BUSINESS</div>
            ${expenses.mainBusiness.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount negative">MWK (${Math.abs(a.balance).toLocaleString()})</span>
                </div>
            `).join('')}
            ${expenses.mainBusiness.length === 0 ? '<div class="statement-row indent-1"><span style="color: var(--text-secondary);">No main business expenses</span><span class="amount">MWK 0</span></div>' : ''}
            <div class="statement-row subtotal">
                <span>Total Main Business Expenses</span>
                <span class="amount negative">MWK (${totalMainBusinessExpenses.toLocaleString()})</span>
            </div>
            
            <div class="statement-row total" style="margin-top: 16px; background: var(--primary-dark);">
                <span>OPERATING PROFIT</span>
                <span class="amount">MWK ${operatingProfit.toLocaleString()}</span>
            </div>
        </div>
        
        ${revenue.other.length > 0 || expenses.unusual.length > 0 ? `
        <div class="statement-section" style="margin-top: 24px;">
            <div class="statement-header">OTHER INCOME & UNUSUAL ITEMS</div>
            
            ${revenue.other.length > 0 ? `
                <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600;">
                    <span>Other Income</span>
                    <span></span>
                </div>
                ${revenue.other.map(a => `
                    <div class="statement-row indent-1">
                        <span>${a.name}</span>
                        <span class="amount positive">MWK ${Math.abs(a.balance).toLocaleString()}</span>
                    </div>
                `).join('')}
                <div class="statement-row subtotal">
                    <span>Total Other Income</span>
                    <span class="amount">MWK ${totalOtherRevenue.toLocaleString()}</span>
                </div>
            ` : ''}
            
            ${expenses.unusual.length > 0 ? `
                <div class="statement-row" style="background: var(--bg-tertiary); font-weight: 600; margin-top: 12px;">
                    <span>Unusual Items</span>
                    <span></span>
                </div>
                ${expenses.unusual.map(a => `
                    <div class="statement-row indent-1">
                        <span>${a.name}</span>
                        <span class="amount negative">MWK (${Math.abs(a.balance).toLocaleString()})</span>
                    </div>
                `).join('')}
                <div class="statement-row subtotal">
                    <span>Total Unusual Items</span>
                    <span class="amount negative">MWK (${totalUnusualExpenses.toLocaleString()})</span>
                </div>
            ` : ''}
            
            <div class="statement-row total" style="margin-top: 16px;">
                <span>PROFIT BEFORE FINANCING</span>
                <span class="amount">MWK ${profitBeforeFinancing.toLocaleString()}</span>
            </div>
        </div>
        ` : ''}
        
        ${expenses.financing.length > 0 ? `
        <div class="statement-section" style="margin-top: 24px;">
            <div class="statement-header">FINANCING EXPENSES</div>
            ${expenses.financing.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount negative">MWK (${Math.abs(a.balance).toLocaleString()})</span>
                </div>
            `).join('')}
            <div class="statement-row subtotal">
                <span>Total Financing Expenses</span>
                <span class="amount negative">MWK (${totalFinancingExpenses.toLocaleString()})</span>
            </div>
            
            <div class="statement-row total" style="margin-top: 16px;">
                <span>PROFIT BEFORE TAX</span>
                <span class="amount">MWK ${profitBeforeTax.toLocaleString()}</span>
            </div>
        </div>
        ` : ''}
        
        ${expenses.other.length > 0 ? `
        <div class="statement-section" style="margin-top: 24px;">
            <div class="statement-header">OTHER EXPENSES</div>
            ${expenses.other.map(a => `
                <div class="statement-row indent-1">
                    <span>${a.name}</span>
                    <span class="amount negative">MWK (${Math.abs(a.balance).toLocaleString()})</span>
                </div>
            `).join('')}
            <div class="statement-row subtotal">
                <span>Total Other Expenses</span>
                <span class="amount negative">MWK (${totalOtherExpenses.toLocaleString()})</span>
            </div>
        </div>
        ` : ''}
        
        <div class="statement-section" style="margin-top: 32px;">
            <div class="statement-row total" style="font-size: 18px;">
                <span>NET PROFIT / (LOSS)</span>
                <span class="amount ${netProfit >= 0 ? 'positive' : 'negative'}">MWK ${netProfit.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="card mt-3" style="background: ${netProfit >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; border-left: 4px solid ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'};">
            <div style="padding: 16px;">
                <strong>Profitability Summary:</strong><br>
                Operating Profit: MWK ${operatingProfit.toLocaleString()}<br>
                ${profitBeforeFinancing !== operatingProfit ? `Profit Before Financing: MWK ${profitBeforeFinancing.toLocaleString()}<br>` : ''}
                ${profitBeforeTax !== profitBeforeFinancing ? `Profit Before Tax: MWK ${profitBeforeTax.toLocaleString()}<br>` : ''}
                Net Profit: MWK ${netProfit.toLocaleString()}
                <br><br>
                ${netProfit >= 0 ? 
                    '<span style="color: var(--success);">✅ Profitable Period</span>' : 
                    '<span style="color: var(--danger);">⚠️ Loss Period</span>'}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Initialize financial statements when pages are loaded
window.addEventListener('DOMContentLoaded', function() {
    // Generate balance sheet if the container exists
    if (document.getElementById('balanceSheetContent')) {
        generateBalanceSheet();
    }
    
    // Generate income statement if the container exists
    if (document.getElementById('incomeStatementContent')) {
        generateIncomeStatement();
    }
});

// Make functions globally available
window.generateBalanceSheet = generateBalanceSheet;
window.generateIncomeStatement = generateIncomeStatement;
window.refreshFinancialStatements = refreshFinancialStatements;
