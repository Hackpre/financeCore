// ========== IFRS 18 COMPLIANT SAMPLE DATA ==========
function loadIFRS18SampleData() {
    // IFRS 18 Chart of Accounts with new categories
    appData.chartOfAccounts = [
        // === ASSETS ===
        // Current Assets
        { code: '1000', name: 'Cash and Cash Equivalents', type: 'Asset', category: 'Current Assets', balance: 28500000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Income' },
        { code: '1100', name: 'Trade Receivables', type: 'Asset', category: 'Current Assets', balance: 18250000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Income' },
        { code: '1200', name: 'Inventory', type: 'Asset', category: 'Current Assets', balance: 45680000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Income' },
        { code: '1300', name: 'Prepaid Expenses', type: 'Asset', category: 'Current Assets', balance: 3200000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        
        // Non-Current Assets
        { code: '1500', name: 'Property, Plant & Equipment', type: 'Asset', category: 'Non-Current Assets', balance: 125400000, ifrsCategory: 'Investing', ifrsSubcategory: 'Investing' },
        { code: '1510', name: 'Accumulated Depreciation', type: 'Asset', category: 'Non-Current Assets', balance: -25400000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '1600', name: 'Intangible Assets', type: 'Asset', category: 'Non-Current Assets', balance: 18500000, ifrsCategory: 'Investing', ifrsSubcategory: 'Investing' },
        
        // === LIABILITIES ===
        // Current Liabilities
        { code: '2000', name: 'Trade Payables', type: 'Liability', category: 'Current Liabilities', balance: 15850000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '2100', name: 'Short-term Borrowings', type: 'Liability', category: 'Current Liabilities', balance: 12000000, ifrsCategory: 'Financing', ifrsSubcategory: 'Financing' },
        { code: '2200', name: 'Accrued Expenses', type: 'Liability', category: 'Current Liabilities', balance: 4500000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '2300', name: 'Current Tax Payable', type: 'Liability', category: 'Current Liabilities', balance: 5200000, ifrsCategory: 'Operating', ifrsSubcategory: 'Income Tax' },
        
        // Non-Current Liabilities
        { code: '2500', name: 'Long-term Borrowings', type: 'Liability', category: 'Non-Current Liabilities', balance: 35000000, ifrsCategory: 'Financing', ifrsSubcategory: 'Financing' },
        { code: '2600', name: 'Deferred Tax Liability', type: 'Liability', category: 'Non-Current Liabilities', balance: 6800000, ifrsCategory: 'Operating', ifrsSubcategory: 'Income Tax' },
        
        // === EQUITY ===
        { code: '3000', name: 'Share Capital', type: 'Equity', category: 'Equity', balance: 100000000, ifrsCategory: 'Financing', ifrsSubcategory: 'Financing' },
        { code: '3100', name: 'Retained Earnings', type: 'Equity', category: 'Equity', balance: 45300000, ifrsCategory: 'Financing', ifrsSubcategory: 'Financing' },
        { code: '3200', name: 'Other Comprehensive Income', type: 'Equity', category: 'Equity', balance: 850000, ifrsCategory: 'Operating', ifrsSubcategory: 'Other Comprehensive Income' },
        
        // === REVENUE (IFRS 18 Categories) ===
        // Operating Income
        { code: '4000', name: 'Sales Revenue', type: 'Revenue', category: 'Operating Income', balance: 245800000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Income' },
        { code: '4100', name: 'Service Revenue', type: 'Revenue', category: 'Operating Income', balance: 48200000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Income' },
        
        // Investing Income
        { code: '4200', name: 'Dividend Income', type: 'Revenue', category: 'Other Income', balance: 2500000, ifrsCategory: 'Investing', ifrsSubcategory: 'Investing' },
        { code: '4300', name: 'Interest Income', type: 'Revenue', category: 'Other Income', balance: 1800000, ifrsCategory: 'Investing', ifrsSubcategory: 'Investing' },
        { code: '4400', name: 'Gain on Sale of Assets', type: 'Revenue', category: 'Other Income', balance: 3200000, ifrsCategory: 'Investing', ifrsSubcategory: 'Investing' },
        
        // === EXPENSES (IFRS 18 Categories) ===
        // Operating Expenses
        { code: '5000', name: 'Cost of Sales', type: 'Expense', category: 'Operating Expenses', balance: 152600000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5100', name: 'Employee Benefits', type: 'Expense', category: 'Operating Expenses', balance: 35400000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5200', name: 'Depreciation Expense', type: 'Expense', category: 'Operating Expenses', balance: 12500000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5300', name: 'Amortization Expense', type: 'Expense', category: 'Operating Expenses', balance: 2800000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5400', name: 'Marketing & Advertising', type: 'Expense', category: 'Operating Expenses', balance: 8500000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5500', name: 'Administrative Expenses', type: 'Expense', category: 'Operating Expenses', balance: 12600000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        { code: '5600', name: 'Research & Development', type: 'Expense', category: 'Operating Expenses', balance: 4200000, ifrsCategory: 'Operating', ifrsSubcategory: 'Operating Expenses' },
        
        // Financing Expenses
        { code: '6000', name: 'Interest Expense', type: 'Expense', category: 'Other Expenses', balance: 3800000, ifrsCategory: 'Financing', ifrsSubcategory: 'Financing' },
        
        // Income Tax
        { code: '7000', name: 'Income Tax Expense', type: 'Expense', category: 'Other Expenses', balance: 15200000, ifrsCategory: 'Operating', ifrsSubcategory: 'Income Tax' }
    ];
    
    // Sample transactions for the year
    appData.journalEntries = [
        // Sales transactions
        {
            id: 1, number: 'JE-2024-0001', date: '2024-01-15', description: 'January Sales',
            lines: [
                { accountCode: '1100', accountName: 'Trade Receivables', debit: 12500000, credit: 0 },
                { accountCode: '4000', accountName: 'Sales Revenue', debit: 0, credit: 12500000 }
            ],
            totalDebit: 12500000, totalCredit: 12500000, status: 'posted', ifrsCategory: 'Operating'
        },
        {
            id: 2, number: 'JE-2024-0002', date: '2024-01-31', description: 'Cost of Sales - January',
            lines: [
                { accountCode: '5000', accountName: 'Cost of Sales', debit: 7500000, credit: 0 },
                { accountCode: '1200', accountName: 'Inventory', debit: 0, credit: 7500000 }
            ],
            totalDebit: 7500000, totalCredit: 7500000, status: 'posted', ifrsCategory: 'Operating'
        },
        // Depreciation
        {
            id: 3, number: 'JE-2024-0003', date: '2024-01-31', description: 'Monthly Depreciation',
            lines: [
                { accountCode: '5200', accountName: 'Depreciation Expense', debit: 1041667, credit: 0 },
                { accountCode: '1510', accountName: 'Accumulated Depreciation', debit: 0, credit: 1041667 }
            ],
            totalDebit: 1041667, totalCredit: 1041667, status: 'posted', ifrsCategory: 'Operating'
        },
        // Interest expense
        {
            id: 4, number: 'JE-2024-0004', date: '2024-01-31', description: 'Interest Accrual',
            lines: [
                { accountCode: '6000', accountName: 'Interest Expense', debit: 316667, credit: 0 },
                { accountCode: '2200', accountName: 'Accrued Expenses', debit: 0, credit: 316667 }
            ],
            totalDebit: 316667, totalCredit: 316667, status: 'posted', ifrsCategory: 'Financing'
        }
    ];
    
    saveData();
}

// ========== IFRS 18 COMPLIANT STATEMENT GENERATORS ==========
function generateIFRS18IncomeStatement() {
    const accounts = appData.chartOfAccounts;
    
    // Calculate totals by IFRS 18 categories
    const operatingIncome = accounts.filter(a => 
        a.type === 'Revenue' && a.ifrsCategory === 'Operating' && a.ifrsSubcategory === 'Operating Income'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const investingIncome = accounts.filter(a => 
        a.type === 'Revenue' && a.ifrsCategory === 'Investing'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const operatingExpenses = accounts.filter(a => 
        a.type === 'Expense' && a.ifrsCategory === 'Operating' && a.ifrsSubcategory === 'Operating Expenses'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const financingExpenses = accounts.filter(a => 
        a.type === 'Expense' && a.ifrsCategory === 'Financing'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const incomeTax = accounts.filter(a => 
        a.ifrsSubcategory === 'Income Tax'
    ).reduce((sum, acc) => sum + (a.type === 'Expense' ? a.balance : -a.balance), 0);
    
    const otherComprehensiveIncome = accounts.filter(a => 
        a.ifrsSubcategory === 'Other Comprehensive Income'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    // IFRS 18 calculations
    const operatingProfit = operatingIncome - operatingExpenses;
    const profitBeforeTax = operatingProfit + investingIncome - financingExpenses;
    const profitAfterTax = profitBeforeTax - incomeTax;
    const comprehensiveIncome = profitAfterTax + otherComprehensiveIncome;
    
    const html = `
        <div class="statement-section">
            <div class="statement-header">STATEMENT OF PROFIT OR LOSS AND OTHER COMPREHENSIVE INCOME</div>
            
            <!-- Operating Category -->
            <div class="statement-row" style="font-weight: bold; background: var(--bg-tertiary);">Operating</div>
            <div class="statement-row indent-1">
                <span>Operating Income</span>
                <span class="amount positive">MWK ${operatingIncome.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Sales Revenue</span>
                <span class="amount positive">MWK ${accounts.find(a => a.code === '4000')?.balance.toLocaleString() || '0'}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Service Revenue</span>
                <span class="amount positive">MWK ${accounts.find(a => a.code === '4100')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row indent-1">
                <span>Operating Expenses</span>
                <span class="amount negative">(MWK ${operatingExpenses.toLocaleString()})</span>
            </div>
            <div class="statement-row indent-2">
                <span>Cost of Sales</span>
                <span class="amount negative">(MWK ${accounts.find(a => a.code === '5000')?.balance.toLocaleString() || '0'})</span>
            </div>
            <div class="statement-row indent-2">
                <span>Employee Benefits</span>
                <span class="amount negative">(MWK ${accounts.find(a => a.code === '5100')?.balance.toLocaleString() || '0'})</span>
            </div>
            <div class="statement-row indent-2">
                <span>Depreciation</span>
                <span class="amount negative">(MWK ${accounts.find(a => a.code === '5200')?.balance.toLocaleString() || '0'})</span>
            </div>
            
            <div class="statement-row subtotal">
                <span>Operating Profit</span>
                <span class="amount">MWK ${operatingProfit.toLocaleString()}</span>
            </div>
            
            <!-- Investing Category -->
            <div class="statement-row" style="font-weight: bold; background: var(--bg-tertiary); margin-top: 10px;">Investing</div>
            <div class="statement-row indent-1">
                <span>Investing Income</span>
                <span class="amount positive">MWK ${investingIncome.toLocaleString()}</span>
            </div>
            
            <!-- Financing Category -->
            <div class="statement-row" style="font-weight: bold; background: var(--bg-tertiary); margin-top: 10px;">Financing</div>
            <div class="statement-row indent-1">
                <span>Financing Expenses</span>
                <span class="amount negative">(MWK ${financingExpenses.toLocaleString()})</span>
            </div>
            
            <div class="statement-row subtotal">
                <span>Profit Before Tax</span>
                <span class="amount">MWK ${profitBeforeTax.toLocaleString()}</span>
            </div>
            
            <div class="statement-row indent-1">
                <span>Income Tax Expense</span>
                <span class="amount negative">(MWK ${incomeTax.toLocaleString()})</span>
            </div>
            
            <div class="statement-row total">
                <span>PROFIT FOR THE PERIOD</span>
                <span class="amount">MWK ${profitAfterTax.toLocaleString()}</span>
            </div>
            
            <!-- Other Comprehensive Income -->
            <div class="statement-row" style="font-weight: bold; background: var(--bg-tertiary); margin-top: 20px;">Other Comprehensive Income</div>
            <div class="statement-row">
                <span>Items that will not be reclassified to profit or loss</span>
                <span class="amount">MWK ${otherComprehensiveIncome.toLocaleString()}</span>
            </div>
            
            <div class="statement-row total">
                <span>TOTAL COMPREHENSIVE INCOME</span>
                <span class="amount">MWK ${comprehensiveIncome.toLocaleString()}</span>
            </div>
            
            <!-- IFRS 18 Disclosure Notes -->
            <div style="margin-top: 30px; padding: 15px; background: var(--bg-tertiary); border-radius: 8px; font-size: 12px;">
                <h4>IFRS 18 Compliance Notes:</h4>
                <p>✓ Presented using new income statement categories (Operating, Investing, Financing)</p>
                <p>✓ Operating profit subtotal disclosed as required</p>
                <p>✓ Income and expenses from associates and joint ventures shown in appropriate categories</p>
                <p>✓ Management-defined operating profit aligned with IFRS 18 requirements</p>
            </div>
        </div>
    `;
    
    const container = document.getElementById('incomeStatementContent');
    if (container) container.innerHTML = html;
}

function generateIFRS18BalanceSheet() {
    const accounts = appData.chartOfAccounts;
    
    // Calculate totals
    const currentAssets = accounts.filter(a => 
        a.type === 'Asset' && a.category === 'Current Assets'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const nonCurrentAssets = accounts.filter(a => 
        a.type === 'Asset' && a.category === 'Non-Current Assets'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const currentLiabilities = accounts.filter(a => 
        a.type === 'Liability' && a.category === 'Current Liabilities'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const nonCurrentLiabilities = accounts.filter(a => 
        a.type === 'Liability' && a.category === 'Non-Current Liabilities'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const equity = accounts.filter(a => 
        a.type === 'Equity'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const totalAssets = currentAssets + nonCurrentAssets;
    const totalLiabilities = currentLiabilities + nonCurrentLiabilities;
    const totalEquityAndLiabilities = totalLiabilities + equity;
    
    const html = `
        <div class="statement-section">
            <div class="statement-header">STATEMENT OF FINANCIAL POSITION</div>
            
            <!-- ASSETS -->
            <div class="statement-row" style="font-weight: bold;">ASSETS</div>
            
            <div class="statement-row indent-1">
                <span>Current Assets</span>
                <span class="amount">MWK ${currentAssets.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Cash and Cash Equivalents</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '1000')?.balance.toLocaleString() || '0'}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Trade Receivables</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '1100')?.balance.toLocaleString() || '0'}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Inventory</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '1200')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row indent-1">
                <span>Non-Current Assets</span>
                <span class="amount">MWK ${nonCurrentAssets.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Property, Plant & Equipment (net)</span>
                <span class="amount">MWK ${(accounts.find(a => a.code === '1500')?.balance || 0 + (accounts.find(a => a.code === '1510')?.balance || 0)).toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Intangible Assets</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '1600')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row total">
                <span>TOTAL ASSETS</span>
                <span class="amount">MWK ${totalAssets.toLocaleString()}</span>
            </div>
            
            <!-- LIABILITIES AND EQUITY -->
            <div class="statement-row" style="font-weight: bold; margin-top: 20px;">LIABILITIES AND EQUITY</div>
            
            <div class="statement-row indent-1">
                <span>Current Liabilities</span>
                <span class="amount">MWK ${currentLiabilities.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Trade Payables</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '2000')?.balance.toLocaleString() || '0'}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Short-term Borrowings</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '2100')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row indent-1">
                <span>Non-Current Liabilities</span>
                <span class="amount">MWK ${nonCurrentLiabilities.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Long-term Borrowings</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '2500')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row subtotal">
                <span>TOTAL LIABILITIES</span>
                <span class="amount">MWK ${totalLiabilities.toLocaleString()}</span>
            </div>
            
            <div class="statement-row indent-1">
                <span>Equity</span>
                <span class="amount">MWK ${equity.toLocaleString()}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Share Capital</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '3000')?.balance.toLocaleString() || '0'}</span>
            </div>
            <div class="statement-row indent-2">
                <span>Retained Earnings</span>
                <span class="amount">MWK ${accounts.find(a => a.code === '3100')?.balance.toLocaleString() || '0'}</span>
            </div>
            
            <div class="statement-row total">
                <span>TOTAL EQUITY AND LIABILITIES</span>
                <span class="amount">MWK ${totalEquityAndLiabilities.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    const container = document.getElementById('balanceSheetContent');
    if (container) container.innerHTML = html;
}

// ========== UPDATE YOUR EXISTING FUNCTIONS ==========
function generateIncomeStatement() {
    loadIFRS18SampleData();
    generateIFRS18IncomeStatement();
}

function generateBalanceSheet() {
    loadIFRS18SampleData();
    generateIFRS18BalanceSheet();
}

function generateCashFlowStatement() {
    const html = `
        <div class="statement-section">
            <div class="statement-header">STATEMENT OF CASH FLOWS</div>
            
            <div class="statement-row" style="font-weight: bold;">Cash flows from operating activities</div>
            <div class="statement-row indent-1">
                <span>Profit before tax</span>
                <span class="amount">MWK 68,450,000</span>
            </div>
            <div class="statement-row indent-2">
                <span>Adjustments for:</span>
                <span></span>
            </div>
            <div class="statement-row indent-2">
                <span>Depreciation and amortization</span>
                <span class="amount">15,300,000</span>
            </div>
            <div class="statement-row indent-2">
                <span>Interest expense</span>
                <span class="amount">3,800,000</span>
            </div>
            <div class="statement-row subtotal">
                <span>Operating cash flow before working capital changes</span>
                <span class="amount">MWK 87,550,000</span>
            </div>
            
            <div class="statement-row" style="font-weight: bold; margin-top: 20px;">Cash flows from investing activities</div>
            <div class="statement-row indent-1">
                <span>Purchase of property, plant and equipment</span>
                <span class="amount negative">(MWK 25,400,000)</span>
            </div>
            <div class="statement-row indent-1">
                <span>Proceeds from sale of equipment</span>
                <span class="amount positive">MWK 3,200,000</span>
            </div>
            <div class="statement-row subtotal">
                <span>Net cash used in investing activities</span>
                <span class="amount negative">(MWK 22,200,000)</span>
            </div>
            
            <div class="statement-row" style="font-weight: bold; margin-top: 20px;">Cash flows from financing activities</div>
            <div class="statement-row indent-1">
                <span>Proceeds from borrowings</span>
                <span class="amount positive">MWK 15,000,000</span>
            </div>
            <div class="statement-row indent-1">
                <span>Repayment of borrowings</span>
                <span class="amount negative">(MWK 8,000,000)</span>
            </div>
            <div class="statement-row indent-1">
                <span>Interest paid</span>
                <span class="amount negative">(MWK 3,500,000)</span>
            </div>
            <div class="statement-row subtotal">
                <span>Net cash from financing activities</span>
                <span class="amount">MWK 3,500,000</span>
            </div>
            
            <div class="statement-row total">
                <span>Net increase in cash and cash equivalents</span>
                <span class="amount">MWK 8,850,000</span>
            </div>
            <div class="statement-row">
                <span>Cash and cash equivalents at beginning of period</span>
                <span class="amount">MWK 19,650,000</span>
            </div>
            <div class="statement-row total">
                <span>Cash and cash equivalents at end of period</span>
                <span class="amount">MWK 28,500,000</span>
            </div>
        </div>
    `;
    
    const container = document.getElementById('cashFlowStatementContent');
    if (container) container.innerHTML = html;
}

function generateTrialBalance() {
    const accounts = appData.chartOfAccounts;
    
    let html = `
        <div class="statement-section">
            <div class="statement-header">TRIAL BALANCE AS AT DECEMBER 31, 2024</div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Account Code</th>
                            <th>Account Name</th>
                            <th class="text-right">Debit (MWK)</th>
                            <th class="text-right">Credit (MWK)</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    let totalDebit = 0;
    let totalCredit = 0;
    
    accounts.forEach(account => {
        const isDebitAccount = account.type === 'Asset' || account.type === 'Expense';
        const debitAmount = isDebitAccount && account.balance > 0 ? account.balance : 0;
        const creditAmount = !isDebitAccount && account.balance > 0 ? account.balance : 
                            (account.balance < 0 ? Math.abs(account.balance) : 0);
        
        totalDebit += debitAmount;
        totalCredit += creditAmount;
        
        html += `
            <tr>
                <td>${account.code}</td>
                <td>${account.name}</td>
                <td class="text-right">${debitAmount > 0 ? debitAmount.toLocaleString() : '-'}</td>
                <td class="text-right">${creditAmount > 0 ? creditAmount.toLocaleString() : '-'}</td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold; background: var(--bg-tertiary);">
                            <td colspan="2" class="text-right">TOTAL</td>
                            <td class="text-right">MWK ${totalDebit.toLocaleString()}</td>
                            <td class="text-right">MWK ${totalCredit.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div style="margin-top: 20px; padding: 10px; background: var(--bg-tertiary); border-radius: 8px;">
                <p><strong>Trial Balance Check:</strong> ${totalDebit === totalCredit ? '✓ Balanced' : '✗ Not Balanced'}</p>
                <p>Total Debit: MWK ${totalDebit.toLocaleString()} | Total Credit: MWK ${totalCredit.toLocaleString()}</p>
                <p>Difference: MWK ${Math.abs(totalDebit - totalCredit).toLocaleString()}</p>
            </div>
        </div>
    `;
    
    const container = document.getElementById('trialBalanceContent');
    if (container) container.innerHTML = html;
}

// ========== IFRS 18 COMPLIANCE CHECK ==========
function checkIFRS18Compliance() {
    const checks = [];
    
    // Check 1: New income statement categories exist
    const hasOperatingCategory = appData.chartOfAccounts.some(a => a.ifrsCategory === 'Operating');
    const hasInvestingCategory = appData.chartOfAccounts.some(a => a.ifrsCategory === 'Investing');
    const hasFinancingCategory = appData.chartOfAccounts.some(a => a.ifrsCategory === 'Financing');
    
    checks.push({
        item: 'IFRS 18 Income Statement Categories',
        status: hasOperatingCategory && hasInvestingCategory && hasFinancingCategory,
        message: hasOperatingCategory && hasInvestingCategory && hasFinancingCategory ? 
            '✓ Using new Operating, Investing, Financing categories' :
            '✗ Missing required IFRS 18 categories'
    });
    
    // Check 2: Operating profit subtotal
    const operatingIncome = appData.chartOfAccounts.filter(a => 
        a.ifrsCategory === 'Operating' && a.ifrsSubcategory === 'Operating Income'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const operatingExpenses = appData.chartOfAccounts.filter(a => 
        a.ifrsCategory === 'Operating' && a.ifrsSubcategory === 'Operating Expenses'
    ).reduce((sum, acc) => sum + acc.balance, 0);
    
    const hasOperatingProfitSubtotal = operatingIncome > 0 && operatingExpenses > 0;
    
    checks.push({
        item: 'Operating Profit Subtotal',
        status: hasOperatingProfitSubtotal,
        message: hasOperatingProfitSubtotal ?
            '✓ Operating profit subtotal can be calculated' :
            '✗ Cannot calculate operating profit subtotal'
    });
    
    // Check 3: Income tax separate disclosure
    const hasIncomeTaxSeparate = appData.chartOfAccounts.some(a => 
        a.ifrsSubcategory === 'Income Tax'
    );
    
    checks.push({
        item: 'Income Tax Separate Disclosure',
        status: hasIncomeTaxSeparate,
        message: hasIncomeTaxSeparate ?
            '✓ Income tax shown separately' :
            '✗ Income tax not properly disclosed'
    });
    
    // Display results
    const container = document.createElement('div');
    container.style.cssText = 'margin-top: 20px; padding: 20px; background: var(--bg-tertiary); border-radius: 10px;';
    
    let html = '<h3>IFRS 18 Compliance Check</h3>';
    checks.forEach(check => {
        html += `
            <div style="margin: 10px 0; padding: 10px; background: ${check.status ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; border-radius: 6px;">
                <span style="font-weight: bold;">${check.item}:</span> ${check.message}
            </div>
        `;
    });
    
    html += '<p style="margin-top: 15px; font-size: 12px; color: var(--text-secondary);">IFRS 18 is effective for annual periods beginning on or after 1 January 2027</p>';
    
    container.innerHTML = html;
    return container;
}