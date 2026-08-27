'use client';

import React, { useState, useEffect, useCallback } from 'react';

export default function RoadCalculator() {
    // Slurry State
    const [length, setLength] = useState(900);
    const [width, setWidth] = useState(3.3);
    const [slurryYield, setSlurryYield] = useState(200);
    const [dustQty, setDustQty] = useState(1);
    const [dustPrice, setDustPrice] = useState(930);
    const [cementQty, setCementQty] = useState(20);
    const [cementPrice, setCementPrice] = useState(90);
    const [emulsionQty, setEmulsionQty] = useState(260);
    const [emulsionPrice, setEmulsionPrice] = useState(3521.85);
    const [emulsionDrumSize, setEmulsionDrumSize] = useState(210);
    const [waterQty, setWaterQty] = useState(200);
    const [waterPrice, setWaterPrice] = useState(0);
    const [labourCapacity, setLabourCapacity] = useState(50);
    const [labourersCount, setLabourersCount] = useState(7);
    const [labourersRate, setLabourersRate] = useState(250);
    const [supervisorsCount, setSupervisorsCount] = useState(1);
    const [supervisorsRate, setSupervisorsRate] = useState(500);

    // Drains State
    const [drainUnitCost, setDrainUnitCost] = useState(800);
    const [drainLengthUnit, setDrainLengthUnit] = useState(5);
    const [drainCham, setDrainCham] = useState(2);
    const [drainEland, setDrainEland] = useState(1);
    const [drainArum, setDrainArum] = useState(1);
    const [drainWhydah, setDrainWhydah] = useState(1);
    const [drainGovender, setDrainGovender] = useState(1);
    const [drainCathkin, setDrainCathkin] = useState(1);

    // Paving State
    const [pavingLength, setPavingLength] = useState(700);
    const [pavingWidth, setPavingWidth] = useState(3.3);
    const [pavingRate, setPavingRate] = useState(700);

    // UI Tab State
    const [activeTab, setActiveTab] = useState('summary');

    // Calculated Totals State
    const [area, setArea] = useState(0);
    const [currentSlurryCost, setCurrentSlurryCost] = useState(0);
    const [totalDustM3, setTotalDustM3] = useState(0);
    const [totalCementKg, setTotalCementKg] = useState(0);
    const [cementPackets, setCementPackets] = useState(0);
    const [totalEmulsionL, setTotalEmulsionL] = useState(0);
    const [emulsionDrums, setEmulsionDrums] = useState(0);
    const [totalWaterL, setTotalWaterL] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [labourersTotalCost, setLabourersTotalCost] = useState(0);
    const [supervisorTotalCost, setSupervisorTotalCost] = useState(0);

    const [drainTotalSegments, setDrainTotalSegments] = useState(0);
    const [drainTotalLengthMeters, setDrainTotalLengthMeters] = useState(0);
    const [currentDrainCost, setCurrentDrainCost] = useState(0);

    const [pavingArea, setPavingArea] = useState(0);
    const [currentPavingCost, setCurrentPavingCost] = useState(0);

    const grandTotal = currentSlurryCost + currentDrainCost + currentPavingCost;

    // Calculation functions wrapped in useCallback to safely trigger dependencies
    const calculateRoadCosts = useCallback(() => {
        const calculatedArea = (Number(length) || 0) * (Number(width) || 0);
        setArea(calculatedArea);

        const batches = (Number(slurryYield) || 200) > 0 ? (calculatedArea / Number(slurryYield)) : 0;

        const dM3 = batches * (Number(dustQty) || 0);
        setTotalDustM3(dM3);
        const dCost = dM3 * (Number(dustPrice) || 0);

        const cKg = batches * (Number(cementQty) || 0);
        setTotalCementKg(cKg);
        const pkts = cKg / 50;
        setCementPackets(pkts);
        const cCost = pkts * (Number(cementPrice) || 0);

        const eL = batches * (Number(emulsionQty) || 0);
        setTotalEmulsionL(eL);
        const drums = (Number(emulsionDrumSize) || 210) > 0 ? (eL / Number(emulsionDrumSize)) : 0;
        setEmulsionDrums(drums);
        const eCost = drums * (Number(emulsionPrice) || 0);

        const wL = batches * (Number(waterQty) || 0);
        setTotalWaterL(wL);
        const wCost = wL * (Number(waterPrice) || 0);

        const materialTotal = dCost + cCost + eCost + wCost;

        const days = (Number(labourCapacity) || 50) > 0 ? ((Number(length) || 0) / Number(labourCapacity)) : 0;
        setTotalDays(days);

        const lCost = days * (Number(labourersCount) || 0) * (Number(labourersRate) || 0);
        setLabourersTotalCost(lCost);

        const sCost = days * (Number(supervisorsCount) || 0) * (Number(supervisorsRate) || 0);
        setSupervisorTotalCost(sCost);

        const labourTotal = lCost + sCost;
        setCurrentSlurryCost(materialTotal + labourTotal);
    }, [length, width, slurryYield, dustQty, dustPrice, cementQty, cementPrice, emulsionQty, emulsionPrice, emulsionDrumSize, waterQty, waterPrice, labourCapacity, labourersCount, labourersRate, supervisorsCount, supervisorsRate]);

    const calculateDrainCosts = useCallback(() => {
        const totalSegments = (Number(drainCham) || 0) + (Number(drainEland) || 0) + (Number(drainArum) || 0) + (Number(drainWhydah) || 0) + (Number(drainGovender) || 0) + (Number(drainCathkin) || 0);
        setDrainTotalSegments(totalSegments);

        const totalLen = totalSegments * (Number(drainLengthUnit) || 0);
        setDrainTotalLengthMeters(totalLen);

        setCurrentDrainCost(totalLen * (Number(drainUnitCost) || 0));
    }, [drainCham, drainEland, drainArum, drainWhydah, drainGovender, drainCathkin, drainLengthUnit, drainUnitCost]);

    const calculatePavingCosts = useCallback(() => {
        const pArea = (Number(pavingLength) || 0) * (Number(pavingWidth) || 0);
        setPavingArea(pArea);
        setCurrentPavingCost(pArea * (Number(pavingRate) || 0));
    }, [pavingLength, pavingWidth, pavingRate]);

    // Load configuration on mount
    useEffect(() => {
        async function loadConfiguration() {
            try {
                const response = await fetch('/api/config');
                const result = await response.json();
                if (result.success && result.data) {
                    const d = result.data;
                    if (d.slurry) {
                        setLength(d.slurry.length ?? 900);
                        setWidth(d.slurry.width ?? 3.3);
                        setSlurryYield(d.slurry.yieldM2 ?? 200);
                        setDustQty(d.slurry.dustQty ?? 1);
                        setDustPrice(d.slurry.dustPrice ?? 930);
                        setCementQty(d.slurry.cementQty ?? 20);
                        setCementPrice(d.slurry.cementPrice ?? 90);
                        setEmulsionQty(d.slurry.emulsionQty ?? 260);
                        setEmulsionPrice(d.slurry.emulsionPrice ?? 3521.85);
                        setEmulsionDrumSize(d.slurry.emulsionDrumSize ?? 210);
                        setWaterQty(d.slurry.waterQty ?? 200);
                        setWaterPrice(d.slurry.waterPrice ?? 0);
                        setLabourCapacity(d.slurry.capacity ?? 50);
                        setLabourersCount(d.slurry.labourersCount ?? 7);
                        setLabourersRate(d.slurry.labourersRate ?? 250);
                        setSupervisorsCount(d.slurry.supervisorsCount ?? 1);
                        setSupervisorsRate(d.slurry.supervisorsRate ?? 500);
                    }
                    if (d.drains) {
                        setDrainUnitCost(d.drains.unitCost ?? 800);
                        setDrainLengthUnit(d.drains.segmentLength ?? 5);
                        setDrainCham(d.drains.cham ?? 2);
                        setDrainEland(d.drains.eland ?? 1);
                        setDrainArum(d.drains.arum ?? 1);
                        setDrainWhydah(d.drains.whydah ?? 1);
                        setDrainGovender(d.drains.govender ?? 1);
                        setDrainCathkin(d.drains.cathkin ?? 1);
                    }
                    if (d.paving) {
                        setPavingLength(d.paving.length ?? 700);
                        setPavingWidth(d.paving.width ?? 3.3);
                        setPavingRate(d.paving.rate ?? 700);
                    }
                }
            } catch (err) {
                console.error('Could not load saved configuration, using defaults.', err);
            }
        }
        loadConfiguration();
    }, []);

    // Trigger calculations whenever inputs change
    useEffect(() => {
        calculateRoadCosts();
        calculateDrainCosts();
        calculatePavingCosts();
    }, [calculateRoadCosts, calculateDrainCosts, calculatePavingCosts]);

    const resetDefaults = () => {
        setLength(900); setWidth(3.3); setSlurryYield(200);
        setDustQty(1); setDustPrice(930); setCementQty(20); setCementPrice(90);
        setEmulsionQty(260); setEmulsionPrice(3521.85); setEmulsionDrumSize(210);
        setWaterQty(200); setWaterPrice(0); setLabourCapacity(50);
        setLabourersCount(7); setLabourersRate(250); setSupervisorsCount(1); setSupervisorsRate(500);
        setDrainUnitCost(800); setDrainLengthUnit(5);
        setDrainCham(2); setDrainEland(1); setDrainArum(1); setDrainWhydah(1); setDrainGovender(1); setDrainCathkin(1);
        setPavingLength(700); setPavingWidth(3.3); setPavingRate(700);
    };

    const saveConfiguration = async () => {
        const configData = {
            slurry: { length, width, yieldM2: slurryYield, dustQty, dustPrice, cementQty, cementPrice, emulsionQty, emulsionPrice, emulsionDrumSize, waterQty, waterPrice, capacity: labourCapacity, labourersCount, labourersRate, supervisorsCount, supervisorsRate },
            drains: { unitCost: drainUnitCost, segmentLength: drainLengthUnit, cham: drainCham, eland: drainEland, arum: drainArum, whydah: drainWhydah, govender: drainGovender, cathkin: drainCathkin },
            paving: { length: pavingLength, width: pavingWidth, rate: pavingRate }
        };

        try {
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(configData)
            });
            const result = await response.json();
            if (result.success) {
                alert('Edits successfully saved to the database!');
            } else {
                alert('Error saving configuration: ' + result.error);
            }
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to connect to the server.');
        }
    };

    return (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#334155', backgroundColor: '#faf8f5', margin: 0, padding: '30px', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '780px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0284c7', paddingBottom: '10px', marginBottom: '15px' }}>
                    <h2 style={{ margin: 0, border: 'none', padding: 0, color: '#1e293b', fontSize: '1.3rem' }}>Road & Infrastructure Cost Estimator</h2>
                    <button onClick={resetDefaults} style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Reset Default Specs</button>
                    <button onClick={saveConfiguration} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save Changes to Database</button>
                </div>

                {/* Navigation Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px', flexWrap: 'wrap' }}>
                    <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')} style={{ background: activeTab === 'summary' ? '#0284c7' : '#f1f5f9', color: activeTab === 'summary' ? 'white' : '#475569', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Summary</button>
                    <button className={`tab-btn ${activeTab === 'slurry' ? 'active' : ''}`} onClick={() => setActiveTab('slurry')} style={{ background: activeTab === 'slurry' ? '#0284c7' : '#f1f5f9', color: activeTab === 'slurry' ? 'white' : '#475569', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Slurry Seal Estimator</button>
                    <button className={`tab-btn ${activeTab === 'drains' ? 'active' : ''}`} onClick={() => setActiveTab('drains')} style={{ background: activeTab === 'drains' ? '#0284c7' : '#f1f5f9', color: activeTab === 'drains' ? 'white' : '#475569', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>U-Drain Estimator</button>
                    <button className={`tab-btn ${activeTab === 'paving' ? 'active' : ''}`} onClick={() => setActiveTab('paving')} style={{ background: activeTab === 'paving' ? '#0284c7' : '#f1f5f9', color: activeTab === 'paving' ? 'white' : '#475569', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Paving Estimator - Updated</button>
                </div>
                
                {/* TAB 0: SUMMARY */}
                {activeTab === 'summary' && (
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>Consolidated master estimate of all estate infrastructure line items. Click any section link to review or edit underlying configurations.</p>
                        
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Master Project Cost Summary</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Infrastructure Module</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Key Scope / Metric</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Estimated Cost (ZAR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><span onClick={() => setActiveTab('slurry')} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Slurry Seal Estimator</span></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>{area.toLocaleString(undefined, {maximumFractionDigits:2})} m² ({length}m × {width}m)</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#15803d' }}>R{currentSlurryCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><span onClick={() => setActiveTab('drains')} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>U-Drain Estimator</span></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>{drainTotalSegments} Segments ({drainTotalLengthMeters} m)</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#15803d' }}>R{currentDrainCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><span onClick={() => setActiveTab('paving')} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Paving Estimator</span></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>{pavingArea.toLocaleString(undefined, {maximumFractionDigits:2})} m² ({pavingLength}m × {pavingWidth}m)</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#15803d' }}>R{currentPavingCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ background: '#f0fdf4', borderColor: '#bbf7d0', border: '1px solid', borderRadius: '8px', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase' }}>Combined Master Project Estimate</div>
                                <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '2px' }}>Total across Slurry Seal, U-Drains, and Paving modules</div>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>R{grandTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                        </div>
                    </div>
                )}

                {/* TAB 1: SLURRY SEAL */}
                {activeTab === 'slurry' && (
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>Slurry seal specification model (Minimum thickness: <strong>5 mm</strong>). Modify dimensions, mix proportions, unit prices, or labour parameters to recalculate totals in real time.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Road Length (meters)</label>
                                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Road Width (meters)</label>
                                <input type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Calculated Area</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e293b', marginTop: '5px' }}>{area.toLocaleString(undefined, {maximumFractionDigits:2})} m²</div>
                            </div>
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase' }}>Total Estimated Project Cost</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#15803d', marginTop: '5px' }}>R{currentSlurryCost.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                            </div>
                        </div>

                        {/* Slurry Config Section */}
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Slurry Seal Mix & Pricing Parameters (Min Thickness: 5 mm)</h3>
                            
                            <div style={{ margin: '12px 0 15px 0', background: '#f1f5f9', padding: '10px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', margin: 0 }}>Mix Proportion Yield Coverage per Batch:</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="number" value={slurryYield} onChange={(e) => setSlurryYield(e.target.value)} style={{ width: '100px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> <strong>m²</strong>
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Material Component</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Mix Proportion Quantity</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Calculated Output</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Unit Price (ZAR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>Crusher Dust</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" step="0.1" value={dustQty} onChange={(e) => setDustQty(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> m³</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>{totalDustM3.toFixed(2)} m³</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" value={dustPrice} onChange={(e) => setDustPrice(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / m³</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>Cement</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={cementQty} onChange={(e) => setCementQty(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> kg</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>{totalCementKg.toFixed(1)} kg ({Math.ceil(cementPackets)} pkts)</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" value={cementPrice} onChange={(e) => setCementPrice(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / pkt (50kg)</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>60% Emulsion</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={emulsionQty} onChange={(e) => setEmulsionQty(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> Litres</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>{totalEmulsionL.toFixed(1)} Litres</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" step="0.01" value={emulsionPrice} onChange={(e) => setEmulsionPrice(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / drum (<input type="number" value={emulsionDrumSize} onChange={(e) => setEmulsionDrumSize(e.target.value)} style={{ width: '50px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />L)</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>Water</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={waterQty} onChange={(e) => setWaterQty(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> Litres</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>{totalWaterL.toLocaleString(undefined, {maximumFractionDigits:0})} Litres</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" step="0.01" value={waterPrice} onChange={(e) => setWaterPrice(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / Litre</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Labour Config Section */}
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Labour & Execution Parameters</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Role / Resource</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Quantity / Capacity</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Calculated Duration / Total</th>
                                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#475569', background: '#f1f5f9' }}>Daily Rate (ZAR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>Labour Capacity Rate</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={labourCapacity} onChange={(e) => setLabourCapacity(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> m/day</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>{totalDays.toFixed(1)} Days</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>-</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>General Labourers</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={labourersCount} onChange={(e) => setLabourersCount(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> workers</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>R{labourersTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" value={labourersRate} onChange={(e) => setLabourersRate(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / day</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>Supervisor</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><input type="number" value={supervisorsCount} onChange={(e) => setSupervisorsCount(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> supervisor</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong style={{ color: '#0284c7' }}>R{supervisorTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>R <input type="number" value={supervisorsRate} onChange={(e) => setSupervisorsRate(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} /> / day</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Calculated Cost Breakdown</h3>
                            <div style={{ color: '#334155' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Materials Subtotal</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px', fontSize: '0.85rem' }}>
                                    <span>Crusher Dust ({totalDustM3.toFixed(2)} m³) @ R{dustPrice}/m³</span>
                                    <strong>R{(totalDustM3 * dustPrice).toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px', fontSize: '0.85rem' }}>
                                    <span>Cement Pockets ({Math.ceil(cementPackets)} pkts / {totalCementKg.toFixed(1)}kg) @ R{cementPrice}/pkt</span>
                                    <strong>R{(cementPackets * cementPrice).toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px', fontSize: '0.85rem' }}>
                                    <span>60% Emulsion ({emulsionDrums.toFixed(2)} drums of {emulsionDrumSize}L / {totalEmulsionL.toFixed(1)}L) @ R{Number(emulsionPrice).toFixed(2)}/drum</span>
                                    <strong>R{(emulsionDrums * emulsionPrice).toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px', fontSize: '0.85rem' }}>
                                    <span>Water ({totalWaterL.toLocaleString(undefined, {maximumFractionDigits:0})} Litres) @ R{waterPrice}/L</span>
                                    <strong>R{(totalWaterL * waterPrice).toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                                
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: '12px 0 6px 0' }}>Labour Subtotal ({totalDays.toFixed(1)} Days @ {labourCapacity}m/day)</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '6px', fontSize: '0.85rem' }}>
                                    <span>General Labourers ({labourersCount} workers) @ R{labourersRate}/day</span>
                                    <strong>R{labourersTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0, paddingBottom: 0, fontSize: '0.85rem' }}>
                                    <span>Supervisor ({supervisorsCount} supervisor) @ R{supervisorsRate}/day</span>
                                    <strong>R{supervisorTotalCost.toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                                </div>
                            </div>
                            <div style={{ borderTop: '2px solid #cbd5e1', marginTop: '15px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>Final Total Estimated Project Cost</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#15803d' }}>R{currentSlurryCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: U-DRAINS */}
                {activeTab === 'drains' && (
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>U-Drain infrastructure calculator based on steep hill placements (Rate: <strong>R800 per 1m</strong>). Utilizes <strong>Welded Mesh</strong> reinforcement and specifications from LG Green.</p>

                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Drain Pricing & Specifications</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: 0 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Cost per Meter (ZAR)</label>
                                    <input type="number" value={drainUnitCost} onChange={(e) => setDrainUnitCost(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Length per Drain Segment (meters)</label>
                                    <input type="number" value={drainLengthUnit} onChange={(e) => setDrainLengthUnit(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                                </div>
                            </div>
                            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#475569' }}>
                                <strong>Project Lead / Supervisor:</strong> <span style={{ color: '#1e293b', fontWeight: 600 }}>Mangoba</span><br />
                                <strong>Reinforcement Standard:</strong> Welded Mesh (substituted for rebar)
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Steep Hill Drain Counts (Segments)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>Cham Ridge</span>
                                    <input type="number" value={drainCham} onChange={(e) => setDrainCham(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>Eland</span>
                                    <input type="number" value={drainEland} onChange={(e) => setDrainEland(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>Arum</span>
                                    <input type="number" value={drainArum} onChange={(e) => setDrainArum(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>Whydah</span>
                                    <input type="number" value={drainWhydah} onChange={(e) => setDrainWhydah(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>House Govender</span>
                                    <input type="number" value={drainGovender} onChange={(e) => setDrainGovender(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    <span>Cathkin Drive (After Bridge - Critical)</span>
                                    <input type="number" value={drainCathkin} onChange={(e) => setDrainCathkin(e.target.value)} style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'right', fontSize: '0.85rem', background: 'white' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Segments & Length</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginTop: '5px' }}>{drainTotalSegments} Segments ({drainTotalLengthMeters} m)</div>
                            </div>
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase' }}>Total U-Drain Estimate</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#15803d', marginTop: '5px' }}>R{currentDrainCost.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: PAVING */}
                {activeTab === 'paving' && (
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>Interlocking paver installation and surfacing calculator (Default rate: <strong>R700 per m²</strong>).</p>

                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <h3 style={{ marginTop: 0, color: '#1e293b', fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Paving Dimensions & Pricing</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Paving Length (meters)</label>
                                    <input type="number" value={pavingLength} onChange={(e) => setPavingLength(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Paving Width (meters)</label>
                                    <input type="number" step="0.1" value={pavingWidth} onChange={(e) => setPavingWidth(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 0 }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Cost per m² (ZAR)</label>
                                <input type="number" value={pavingRate} onChange={(e) => setPavingRate(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', background: 'white' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Paving Area</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginTop: '5px' }}>{pavingArea.toLocaleString(undefined, {maximumFractionDigits:2})} m²</div>
                            </div>
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '15px', marginBottom: 0 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase' }}>Total Paving Estimate</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#15803d', marginTop: '5px' }}>R{currentPavingCost.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}