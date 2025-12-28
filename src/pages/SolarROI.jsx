import React, { useState } from 'react';
import { Sun, Calculator, TrendingUp, IndianRupee, Zap, Calendar } from 'lucide-react';
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

        // Calculations - Using 335 days to account for rainy/winter periods with low/no production
        const netInvestment = totalCost - subsidy;
        const annualUnits = plantSize * 335 * avgUnitsPerDay;
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
            maximumFractionDigits: 1
        }).format(value);
    };

    return (
        <div className="solar-roi-container">
            {/* Intro Section */}
            <div className="roi-intro-section">
                <div className="roi-intro-content">
                    <h1 className="roi-main-title">Solar ROI Calculator</h1>
                    <p className="roi-subtitle">Estimate Your Solar ROI in Minutes</p>
                    <p className="roi-description">
                        Use our Solar ROI Calculator to get a quick estimate of your investment, savings, and payback period for a solar rooftop or ground-mounted system. Enter a few basic details to understand how solar can reduce your energy costs over time.
                    </p>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="roi-explanation-section">
                <div className="roi-explanation-content">
                    <h2>How the Calculation Works</h2>
                    <div className="explanation-grid">
                        <div className="explanation-item">
                            <div className="explanation-number">1</div>
                            <div>
                                <h4>Energy Generation</h4>
                                <p>We estimate how much electricity your solar system can produce in a year based on the size of your solar plant, average sunlight available, and typical operating days (335 days, accounting for rainy/winter periods).</p>
                            </div>
                        </div>
                        <div className="explanation-item">
                            <div className="explanation-number">2</div>
                            <div>
                                <h4>Yearly Savings</h4>
                                <p>We calculate how much money you save by using your own solar power instead of buying electricity from the grid, based on estimated yearly energy generation and your current electricity tariff.</p>
                            </div>
                        </div>
                        <div className="explanation-item">
                            <div className="explanation-number">3</div>
                            <div>
                                <h4>Your Actual Investment</h4>
                                <p>If any subsidy is applicable, it is deducted from the total system cost to arrive at your net investment.</p>
                            </div>
                        </div>
                        <div className="explanation-item">
                            <div className="explanation-number">4</div>
                            <div>
                                <h4>Payback Period</h4>
                                <p>The payback period tells you how many years it takes to recover your investment through electricity savings. After this period, the energy generated is essentially free.</p>
                            </div>
                        </div>
                        <div className="explanation-item">
                            <div className="explanation-number">5</div>
                            <div>
                                <h4>Long-Term Benefits</h4>
                                <p>Solar systems are designed to work for 25 years or more, allowing you to save on electricity costs for many years after the initial investment is recovered.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roi-content">
                <div className="calculator-section">
                    <div className="section-header">
                        <Sun size={32} />
                        <h1>Calculate Your Returns</h1>
                    </div>

                    <form onSubmit={calculateROI} className="roi-form">
                        <div className="form-group">
                            <label>
                                <Zap size={16} />
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
                                <IndianRupee size={16} />
                                Total Cost (₹)
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
                                <TrendingUp size={16} />
                                Subsidy (₹)
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
                                <Sun size={16} />
                                Avg Units/Day (kWh/kW)
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
                        </div>

                        <div className="form-group">
                            <label>
                                <Zap size={16} />
                                Tariff (₹/unit)
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
                            <Calculator size={18} />
                            Calculate ROI
                        </button>
                    </form>
                </div>

                {results && (
                    <div className="results-section simple-view">
                        <div className="results-header">
                            <h2>Estimated Returns</h2>
                        </div>

                        <div className="primary-metrics">
                            <div className="metric-hero">
                                <span className="label">Annual Savings</span>
                                <span className="value highlight">{formatCurrency(results.annualSavings)}</span>
                            </div>
                            <div className="metric-hero">
                                <span className="label">Payback Period</span>
                                <span className="value">{formatNumber(results.paybackPeriod)} Years</span>
                            </div>
                        </div>

                        <div className="metrics-divider"></div>

                        <div className="secondary-metrics">
                            <div className="metric-row">
                                <span className="metric-label">Net Investment</span>
                                <span className="metric-value">{formatCurrency(results.netInvestment)}</span>
                            </div>
                            <div className="metric-row">
                                <span className="metric-label">25-Year Total Profit</span>
                                <span className="metric-value profit">{formatCurrency(results.lifetimeProfit)}</span>
                            </div>
                            <div className="metric-row">
                                <span className="metric-label">Return on Investment (ROI)</span>
                                <span className="metric-value">{formatNumber(results.roiPercentage)}%</span>
                            </div>
                        </div>

                        <div className={`profit-summary-simple ${results.isProfitable ? 'profitable' : ''}`}>
                            {results.isProfitable ? (
                                <p>🎉 <strong>Great Choice!</strong> You recover your cost in just {formatNumber(results.paybackPeriod)} years.</p>
                            ) : (
                                <p>⚠️ Consider adjusting your inputs for better returns.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="note">* Calculation based on 335 productive days/year (accounting for rainy/winter periods)</div>
        </div>
    );
};

export default SolarROI;
