import React, { useState } from 'react';
import { Sun, Calculator, TrendingUp, DollarSign, Zap, Calendar } from 'lucide-react';
import './SolarROI.css';

const SolarROI = () => {
    const [inputs, setInputs] = useState({
        plantSize: '',
        totalCost: '',
        subsidy: '',
        avgUnitsPerDay: '',
        electricityTariff: ''
    });

    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateROI = (e) => {
        e.preventDefault();

        const plantSize = parseFloat(inputs.plantSize);
        const totalCost = parseFloat(inputs.totalCost);
        const subsidy = parseFloat(inputs.subsidy);
        const avgUnitsPerDay = parseFloat(inputs.avgUnitsPerDay);
        const electricityTariff = parseFloat(inputs.electricityTariff);

        // Calculations
        const netInvestment = totalCost - subsidy;
        const annualUnits = plantSize * 365 * avgUnitsPerDay;
        const annualSavings = annualUnits * electricityTariff;
        const paybackPeriod = netInvestment / annualSavings;
        const roiPercentage = (annualSavings / netInvestment) * 100;
        const lifetimeSavings = annualSavings * 25;
        const lifetimeProfit = lifetimeSavings - netInvestment;

        setResults({
            netInvestment,
            annualUnits,
            annualSavings,
            paybackPeriod,
            roiPercentage,
            lifetimeSavings,
            lifetimeProfit,
            isProfitable: lifetimeSavings > netInvestment
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="solar-roi-container">
            <div className="solar-roi-header">
                <div className="header-icon">
                    <Sun size={48} />
                </div>
                <h1>Solar ROI Calculator</h1>
                <p>Calculate your solar investment returns and payback period</p>
            </div>

            <div className="roi-content">
                <div className="calculator-section">
                    <div className="section-header">
                        <Calculator size={24} />
                        <h2>Enter Your Details</h2>
                    </div>

                    <form onSubmit={calculateROI} className="roi-form">
                        <div className="form-group">
                            <label>
                                <Zap size={18} />
                                Plant Size (kW)
                            </label>
                            <input
                                type="number"
                                name="plantSize"
                                value={inputs.plantSize}
                                onChange={handleInputChange}
                                placeholder="e.g., 5"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <DollarSign size={18} />
                                Total Installation Cost (₹)
                            </label>
                            <input
                                type="number"
                                name="totalCost"
                                value={inputs.totalCost}
                                onChange={handleInputChange}
                                placeholder="e.g., 300000"
                                step="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <TrendingUp size={18} />
                                Subsidy Amount (₹)
                            </label>
                            <input
                                type="number"
                                name="subsidy"
                                value={inputs.subsidy}
                                onChange={handleInputChange}
                                placeholder="e.g., 78000"
                                step="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Sun size={18} />
                                Average Units Per Day (kWh per kW)
                            </label>
                            <input
                                type="number"
                                name="avgUnitsPerDay"
                                value={inputs.avgUnitsPerDay}
                                onChange={handleInputChange}
                                placeholder="e.g., 4"
                                step="0.1"
                                required
                            />
                            <small>Typical range: 3.5 - 5 units per kW per day</small>
                        </div>

                        <div className="form-group">
                            <label>
                                <Zap size={18} />
                                Electricity Tariff (₹ per unit)
                            </label>
                            <input
                                type="number"
                                name="electricityTariff"
                                value={inputs.electricityTariff}
                                onChange={handleInputChange}
                                placeholder="e.g., 8"
                                step="0.01"
                                required
                            />
                        </div>

                        <button type="submit" className="calculate-btn">
                            <Calculator size={20} />
                            Calculate ROI
                        </button>
                    </form>
                </div>

                {results && (
                    <div className="results-section">
                        <div className="section-header">
                            <TrendingUp size={24} />
                            <h2>Your Investment Analysis</h2>
                        </div>

                        <div className="results-grid">
                            <div className="result-card primary">
                                <div className="result-icon">
                                    <DollarSign size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>Net Investment</h3>
                                    <p className="result-value">{formatCurrency(results.netInvestment)}</p>
                                    <small>After subsidy deduction</small>
                                </div>
                            </div>

                            <div className="result-card success">
                                <div className="result-icon">
                                    <Zap size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>Annual Energy Generation</h3>
                                    <p className="result-value">{formatNumber(results.annualUnits)} kWh</p>
                                    <small>Units generated per year</small>
                                </div>
                            </div>

                            <div className="result-card success">
                                <div className="result-icon">
                                    <TrendingUp size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>Annual Savings</h3>
                                    <p className="result-value">{formatCurrency(results.annualSavings)}</p>
                                    <small>Savings per year</small>
                                </div>
                            </div>

                            <div className="result-card info">
                                <div className="result-icon">
                                    <Calendar size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>Payback Period</h3>
                                    <p className="result-value">{formatNumber(results.paybackPeriod)} years</p>
                                    <small>Time to recover investment</small>
                                </div>
                            </div>

                            <div className="result-card warning">
                                <div className="result-icon">
                                    <TrendingUp size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>ROI Percentage</h3>
                                    <p className="result-value">{formatNumber(results.roiPercentage)}%</p>
                                    <small>Annual return on investment</small>
                                </div>
                            </div>

                            <div className={`result-card ${results.isProfitable ? 'profit' : 'loss'}`}>
                                <div className="result-icon">
                                    <Sun size={32} />
                                </div>
                                <div className="result-content">
                                    <h3>25-Year Lifetime</h3>
                                    <p className="result-value">{formatCurrency(results.lifetimeSavings)}</p>
                                    <small>Total savings over 25 years</small>
                                </div>
                            </div>
                        </div>

                        <div className={`profit-summary ${results.isProfitable ? 'profitable' : 'not-profitable'}`}>
                            {results.isProfitable ? (
                                <>
                                    <h3>🎉 Excellent Investment!</h3>
                                    <p>
                                        Your solar investment will generate a <strong>profit of {formatCurrency(results.lifetimeProfit)}</strong> over 25 years.
                                    </p>
                                    <p>
                                        You'll recover your investment in just <strong>{formatNumber(results.paybackPeriod)} years</strong> and enjoy free electricity for the remaining years!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3>⚠️ Review Your Investment</h3>
                                    <p>
                                        Based on current inputs, your lifetime savings of {formatCurrency(results.lifetimeSavings)} are less than your net investment.
                                    </p>
                                    <p>
                                        Consider reviewing the plant size, subsidy options, or electricity tariff to improve returns.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="breakdown-section">
                            <h3>Detailed Breakdown</h3>
                            <div className="breakdown-table">
                                <div className="breakdown-row">
                                    <span>Total Installation Cost:</span>
                                    <strong>{formatCurrency(parseFloat(inputs.totalCost))}</strong>
                                </div>
                                <div className="breakdown-row">
                                    <span>Less: Subsidy:</span>
                                    <strong className="subsidy">- {formatCurrency(parseFloat(inputs.subsidy))}</strong>
                                </div>
                                <div className="breakdown-row highlight">
                                    <span>Net Investment:</span>
                                    <strong>{formatCurrency(results.netInvestment)}</strong>
                                </div>
                                <div className="breakdown-row">
                                    <span>Annual Savings:</span>
                                    <strong className="savings">+ {formatCurrency(results.annualSavings)}</strong>
                                </div>
                                <div className="breakdown-row">
                                    <span>Lifetime Savings (25 years):</span>
                                    <strong className="savings">+ {formatCurrency(results.lifetimeSavings)}</strong>
                                </div>
                                <div className="breakdown-row total">
                                    <span>Net Profit/Savings:</span>
                                    <strong className={results.isProfitable ? 'profit' : 'loss'}>
                                        {formatCurrency(results.lifetimeProfit)}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolarROI;
