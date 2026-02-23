import React, { useState, useEffect } from 'react';
import LandmarkStudies from './components/LandmarkStudies';
import { BookOpen } from 'lucide-react';  // Add BookOpen to existing imports
import {
    Activity,
    Shield,
    Pill,
    AlertTriangle,
    Menu,
    X,
    Thermometer,
    Calculator,
    ArrowRight,
    Info,
    Scissors // Replaced Scalpel with Scissors

} from 'lucide-react';

// --- Data & Content Constants ---

const EPIDEMIOLOGY_DATA = [
    { label: "Waitlist Candidates", value: "~90,000", sub: "Active (≈94k Total)" },
    { label: "Transplants/Year", value: "~28,000", sub: "2023 SRTR Data" },
    { label: "Dialysis Mortality", value: "15-20%", sub: "Annual Risk" },
    { label: "Tx Survival (Living)", value: "~15-20 yrs", sub: "Half-Life" },
    { label: "Tx Survival (Deceased)", value: "~8-12 yrs", sub: "Half-Life" },
];

// --- Helper Components ---

const SourceTip = ({ source }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="inline-block ml-2 relative">
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
            }}
                className="text-blue-400 hover:text-blue-600 transition-colors focus:outline-none"
            >
                <Info size={18} />
            </button>
            {show && (
                <>
                    {/* Backdrop to close on click outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setShow(false)}></div>
                    {/* Tooltip Container */}
                    <div
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-800 text-white text-xs rounded-lg shadow-xl border border-slate-700 leading-relaxed">
                        <div className="font-bold mb-1 text-blue-300 uppercase tracking-wide">Source</div>
                        {source}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-slate-800">
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const SectionHeader = ({ title, icon: Icon, subtitle }) => (
    <div className="mb-6 border-b border-blue-100 pb-4">
        <div className="flex items-center gap-3 text-blue-900">
            <div className="p-2 bg-blue-100 rounded-lg">
                <Icon size={24} className="text-blue-700" />
            </div>
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
            </div>
        </div>
    </div>
);

const Card = ({ children, title, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
        {title && (
            <div
                className="bg-slate-50 px-4 py-3 border-b border-slate-100 font-semibold text-slate-700 flex justify-between items-center rounded-t-xl">
                {title}
            </div>
        )}
        <div className="p-4 rounded-b-xl">{children}</div>
    </div>
);

const TabButton = ({ active, onClick, label }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${active ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
        {label}
    </button>
);

// --- Page Content Components ---

const Epidemiology = () => (
    <div className="space-y-6">
        <SectionHeader title="Epidemiology & Basics" icon={Activity} subtitle="The Burden of Disease & Allocation" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EPIDEMIOLOGY_DATA.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600">{item.value}</div>
                    <div className="text-sm font-medium text-slate-700">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">{item.sub}</div>
                </div>
            ))}
        </div>

        <Card title={<div className="flex items-center">
            Survival Advantage
            <SourceTip source="SRTR 2022 Annual Data Report; USRDS Annual Data Report" />
        </div>
        }>
            <div className="space-y-4">
                <p className="text-slate-600 text-sm">
                    Transplantation offers a significant survival advantage over dialysis.
                    Preemptive transplantation (before dialysis) provides the best long-term outcomes.
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="font-bold text-green-800 mb-2">Living Donor Survival</div>
                        <div className="flex justify-between mb-1">
                            <span className="text-slate-600">1-Year Graft:</span>
                            <span className="font-bold text-green-700">~97–98%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">5-Year Graft:</span>
                            <span className="font-bold text-green-700">~88–92%</span>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="font-bold text-blue-800 mb-2">Deceased Donor Survival</div>
                        <div className="flex justify-between mb-1">
                            <span className="text-slate-600">1-Year Graft:</span>
                            <span className="font-bold text-blue-700">~93–95%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">5-Year Graft:</span>
                            <span className="font-bold text-blue-700">~78–83%</span>
                        </div>
                    </div>
                </div>

                <div className="relative h-64 bg-slate-50 rounded-lg border border-slate-100 p-4 pt-8 pb-8 ml-4 mt-2">
                    {/* Y Axis Label */}
                    <div
                        className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-400 tracking-wider">
                        Survival Probability (%)
                    </div>

                    <div className="flex items-end justify-around h-full w-full pl-4 border-l-2 border-b-2 border-slate-300">
                        {/* Chart Bars */}
                        <div
                            className="w-16 bg-red-400 rounded-t-lg h-[30%] relative group mx-1 shadow-sm transition-all hover:h-[32%]">
                            <div className="absolute -top-6 left-0 right-0 text-center text-xs font-bold text-red-600">Dialysis
                            </div>
                            <div className="absolute inset-0 flex items-end justify-center pb-2 text-white text-xs font-bold">~30%
                            </div>
                        </div>
                        <div
                            className="w-16 bg-blue-400 rounded-t-lg h-[75%] relative group mx-1 shadow-sm transition-all hover:h-[77%]">
                            <div className="absolute -top-6 left-0 right-0 text-center text-xs font-bold text-blue-600">Deceased
                            </div>
                            <div className="absolute inset-0 flex items-end justify-center pb-2 text-white text-xs font-bold">~75%
                            </div>
                        </div>
                        <div
                            className="w-16 bg-green-500 rounded-t-lg h-[85%] relative group mx-1 shadow-sm transition-all hover:h-[87%]">
                            <div className="absolute -top-6 left-0 right-0 text-center text-xs font-bold text-green-600">Living
                            </div>
                            <div className="absolute inset-0 flex items-end justify-center pb-2 text-white text-xs font-bold">~85%
                            </div>
                        </div>
                    </div>

                    {/* X Axis Label */}
                    <div className="absolute -bottom-6 left-0 right-0 text-center text-xs font-bold text-slate-400 tracking-wider">
                        5-Year Outcomes Horizon
                    </div>
                </div>
            </div>
        </Card>

        <Card title="Donor Types & Risk">
            <div className="space-y-4 text-sm">
                <div className="flex gap-3 items-start">
                    <div className="font-bold text-blue-700 w-16 shrink-0 bg-blue-50 px-2 py-1 rounded text-center">DBDKT</div>
                    <div>
                        <strong>Donor after Brain Death.</strong> Heart beating until procurement.
                        <br /><span className="text-slate-500 text-xs">Standard risk profile.</span>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="font-bold text-red-700 w-16 shrink-0 bg-red-50 px-2 py-1 rounded text-center">DCDKT</div>
                    <div>
                        <strong>Donor after Circulatory Death.</strong> Cardiac arrest prior to organ recovery.
                        <br /><span className="text-red-600 font-semibold text-xs">Key Risk: Higher DGF rates due to warm
                            ischemia.</span>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="font-bold text-green-700 w-16 shrink-0 bg-green-50 px-2 py-1 rounded text-center">LRKT</div>
                    <div>
                        <strong>Living Related.</strong> Best outcomes due to genetic similarity and elective timing (minimal
                        ischemia).
                    </div>
                </div>
            </div>
        </Card>
    </div>
);

const Surgical = () => (
    <div className="space-y-6">
        <SectionHeader title="Surgical & Ischemia" icon={Scissors} subtitle="The Clock & Intra-op Factors" />

        <div className="grid md:grid-cols-2 gap-4">
            <Card title={<div className="flex items-center">Cold Ischemia Time (CIT)
                <SourceTip source="CCF Notes; OPTN" />
            </div>} className="h-full border-l-4 border-l-blue-400">
                <div className="space-y-3 text-sm">
                    <div className="bg-blue-50 p-2 rounded text-blue-900 text-xs font-semibold">
                        Definition: Time from aortic cross-clamp (donor) to removal from ice (recipient).
                    </div>
                    <ul className="list-disc list-inside text-slate-700 space-y-2">
                        <li><strong>The Clock:</strong> Every hour counts.</li>
                        <li><strong>Impact:</strong> Prolonged CIT (&gt;18-24 hours) is a major independent risk factor for Delayed
                            Graft Function (DGF).</li>
                        <li><strong>Logistics:</strong> Includes transport time (flying/driving) and time on pump/ice.</li>
                    </ul>
                </div>
            </Card>

            <Card title={<div className="flex items-center">Warm Ischemia Time (WIT)
                <SourceTip source="CCF Notes" />
            </div>} className="h-full border-l-4 border-l-red-400">
                <div className="space-y-3 text-sm">
                    <div className="bg-red-50 p-2 rounded text-red-900 text-xs font-semibold">
                        Definition: Time where organ is metabolically active but not perfused.
                    </div>

                    <div className="space-y-2">
                        <div>
                            <span className="block font-bold text-slate-800">1. Donor Warm Ischemia (First Warm)</span>
                            <span className="text-xs text-slate-600">
                                <strong>Specific to DCD.</strong> Time from withdrawal of life support/cardiac arrest until cold
                                perfusion starts.
                                <br /><em>High risk for ATN/DGF.</em>
                            </span>
                        </div>
                        <div className="border-t pt-2">
                            <span className="block font-bold text-slate-800">2. Recipient Warm Ischemia (Second Warm)</span>
                            <span className="text-xs text-slate-600">
                                Time from removing kidney from ice to reperfusion.
                                <br /><strong>Target:</strong> &lt; 45 mins (Anastomosis time).
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        <Card title="Surgical Complications Differential">
            <div className="space-y-3 text-sm">
                <p className="text-xs text-slate-500 mb-2">Differential for oliguria/anuria immediately post-op (Rule of U's):
                </p>
                <div className="flex gap-3 items-start border-b border-slate-100 pb-2">
                    <div className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-xs w-20 text-center shrink-0">
                        Urine</div>
                    <div>
                        <strong>Urine Leak.</strong> High drain output. Drain creatinine &gt;&gt; Serum creatinine.
                    </div>
                </div>
                <div className="flex gap-3 items-start border-b border-slate-100 pb-2">
                    <div className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-xs w-20 text-center shrink-0">
                        Ureter</div>
                    <div>
                        <strong>Obstruction/Stenosis.</strong> Hydronephrosis on Ultrasound.
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-xs w-20 text-center shrink-0">
                        Vascular</div>
                    <div>
                        <strong>Thrombosis.</strong> Renal Artery or Vein thrombosis. <span
                            className="text-red-600 font-bold">Surgical Emergency.</span> No flow on Doppler.
                    </div>
                </div>
            </div>
        </Card>
    </div>
);

const Immunology = () => (
    <div className="space-y-6">
        <SectionHeader title="Immunology & Allocation" icon={Shield} subtitle="HLA, Sensitization & Crossmatching" />

        <div className="grid md:grid-cols-2 gap-4">
            <Card title={<div className="flex items-center">The Crossmatch (XM)
                <SourceTip source="STAR 2017 Working Group Report; CCF Care Path" />
            </div>} className="h-full">
                <div className="space-y-4 text-sm">
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded shadow-sm">
                        <div className="font-bold text-green-800 mb-1 flex justify-between">
                            1. Virtual XM
                            <span className="text-[10px] bg-white px-2 rounded border border-green-200">Pre-Op</span>
                        </div>
                        <p className="text-slate-700 mb-1"><strong>Method:</strong> Computer comparison of Recipient Anti-HLA
                            Antibody profile (Luminex) vs. Donor HLA typing.</p>
                        <p className="text-xs text-green-700 italic">Predicts compatibility before blood is even mixed.</p>
                    </div>

                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded shadow-sm">
                        <div className="font-bold text-yellow-800 mb-1 flex justify-between">
                            2. Flow Cytometry XM
                            <span className="text-[10px] bg-white px-2 rounded border border-yellow-200">Sensitive</span>
                        </div>
                        <p className="text-slate-700 mb-1"><strong>Method:</strong> Recipient Serum + Donor Lymphocytes +
                            Fluorescent Anti-IgG tag. Run through a flow cytometer.</p>
                        <p className="text-xs text-yellow-700 italic">Detects low-level binding (Channel Shift). Positive Flow +
                            Negative CDC = Low risk (monitor closely).</p>
                    </div>

                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded shadow-sm">
                        <div className="font-bold text-red-800 mb-1 flex justify-between">
                            3. Cytotoxic (CDC) XM
                            <span className="text-[10px] bg-white px-2 rounded border border-red-200">Specific</span>
                        </div>
                        <p className="text-slate-700 mb-1"><strong>Method:</strong> Recipient Serum + Live Donor Lymphocytes +
                            Rabbit Complement. If antibodies bind, complement lyses the cells.</p>
                        <p className="text-xs text-red-700 italic font-bold">Positive CDC = Cell Death = Hyperacute Rejection Risk
                            (Contraindication).</p>
                    </div>
                </div>
            </Card>

            <Card title={<div className="flex items-center">Risk Scores
                <SourceTip source="OPTN/UNOS Policy 8; Kidney Allocation System (KAS)" />
            </div>} className="h-full">
                <ul className="space-y-4 text-sm">
                    <li className="flex justify-between items-start border-b border-slate-100 pb-2">
                        <div>
                            <span className="font-bold text-slate-700 block">KDPI (Donor Quality)</span>
                            <span className="text-xs text-slate-500">Kidney Donor Profile Index</span>
                        </div>
                        <div className="text-right w-1/2 text-slate-600 text-xs">
                            0-100%. <strong>Lower is better.</strong> <br />
                            KDPI &gt;85% is "Marginal" (Formerly ECD).
                        </div>
                    </li>
                    <li className="flex justify-between items-start border-b border-slate-100 pb-2">
                        <div>
                            <span className="font-bold text-slate-700 block">cPRA (Sensitization)</span>
                            <span className="text-xs text-slate-500">Calculated Panel Reactive Antibody</span>
                        </div>
                        <div className="text-right w-1/2 text-slate-600 text-xs">
                            % of US donors incompatible with recipient. <br />
                            <strong>High Score = Priority Points.</strong>
                        </div>
                    </li>
                    <li className="flex justify-between items-start">
                        <div>
                            <span className="font-bold text-slate-700 block">EPTS (Recipient)</span>
                            <span className="text-xs text-slate-500">Est. Post-Tx Survival</span>
                        </div>
                        <div className="text-right w-1/2 text-slate-600 text-xs">
                            Top 20% EPTS candidates receive Top 20% KDPI kidneys to maximize graft life years.
                        </div>
                    </li>
                </ul>
            </Card>
        </div>
    </div>
);

const Pharmacology = () => {
    const [tab, setTab] = useState('protocols');
    const [poDose, setPoDose] = useState('');
    const [slDose, setSlDose] = useState(0);

    // Envarsus calc
    const [irTotalDose, setIrTotalDose] = useState('');
    const [envarsusDose, setEnvarsusDose] = useState(0);

    // MMF Converter
    const [cellceptDose, setCellceptDose] = useState('');
    const [myforticDose, setMyforticDose] = useState(0);

    useEffect(() => {
        setSlDose(poDose ? parseFloat(poDose) / 2 : 0);
    }, [poDose]);

    useEffect(() => {
        setSlDose(poDose ? parseFloat(poDose) / 2 : 0);
    }, [poDose]);

    useEffect(() => {
        // Envarsus conversion is typically 80% of Total Daily Dose of IR
        setEnvarsusDose(irTotalDose ? (parseFloat(irTotalDose) * 0.8).toFixed(1) : 0);
    }, [irTotalDose]);

    useEffect(() => {
        // CellCept 1000 ~= Myfortic 720
        // Factor approx 0.72
        // PDF says: 1000~720, 750~540, 500~360, 250~180
        // It's exactly 0.72 conversion
        setMyforticDose(cellceptDose ? (parseFloat(cellceptDose) * 0.72).toFixed(0) : 0);
    }, [cellceptDose]);

    return (
        <div className="space-y-6">
            <SectionHeader title="Pharmacology" icon={Pill} subtitle="Protocols, Dosing & Side Effects" />

            <div className="flex gap-2 justify-start mb-4 overflow-x-auto pb-2 no-scrollbar">
                <TabButton active={tab === 'protocols'} onClick={() => setTab('protocols')} label="Clinical Protocols" />
                <TabButton active={tab === 'induction'} onClick={() => setTab('induction')} label="Induction Agents" />
                <TabButton active={tab === 'maintenance'} onClick={() => setTab('maintenance')} label="Maintenance" />
                <TabButton active={tab === 'calc'} onClick={() => setTab('calc')} label="Calculators" />
            </div>

            {tab === 'protocols' && (
                <div className="space-y-4">
                    <Card title={<div className="flex items-center">Low Immunological Risk
                        <SourceTip source="CCF Care Path: Low Risk Protocol" />
                    </div>}>
                        <div className="text-sm space-y-2">
                            <div className="bg-green-50 p-2 rounded border border-green-100 text-green-800 text-xs mb-2">
                                <strong>Criteria:</strong> Primary Tx, Living Donor, cPRA &lt; 20%, Neg Crossmatch.
                            </div>
                            <ul className="list-disc list-inside text-slate-700 space-y-1">
                                <li><strong>Induction:</strong> Basiliximab (20mg IV POD 0, 4) OR Thymoglobulin (3 mg/kg total).</li>
                                <li><strong>Tacrolimus:</strong> Start POD 1. Target 8-12 (0-90d), 7-10 (3-6m), 5-8 (&gt;6m).</li>
                                <li><strong>MMF:</strong> 750 mg PO BID.</li>
                                <li><strong>Steroids:</strong> Rapid taper to 5mg daily by ~2 months.</li>
                            </ul>
                        </div>
                    </Card>

                    <Card title={<div className="flex items-center">Moderate-to-High Risk
                        <SourceTip source="CCF Care Path: High Risk Protocol" />
                    </div>}>
                        <div className="text-sm space-y-2">
                            <div className="bg-red-50 p-2 rounded border border-red-100 text-red-800 text-xs mb-2">
                                <strong>Criteria:</strong> cPRA &gt; 20%, Re-transplant, DSA+, DGF anticipated, African American.
                            </div>
                            <ul className="list-disc list-inside text-slate-700 space-y-1">
                                <li><strong>Induction:</strong> Thymoglobulin (3.0 - 4.5 mg/kg total).</li>
                                <li><strong>Tacrolimus:</strong> Start POD 1 or when renal function allows.</li>
                                <li><strong>MMF:</strong> 500-750 mg PO BID (Higher in AA recipients).</li>
                                <li><strong>Steroids:</strong> Standard slow taper.</li>
                            </ul>
                        </div>
                    </Card>

                    <Card title={<div className="flex items-center">Steroid Avoidance
                        <SourceTip source="CCF Care Path: Steroid Avoidance" />
                    </div>}>
                        <div className="text-sm space-y-2">
                            <ul className="list-disc list-inside text-slate-700 space-y-1">
                                <li><strong>Induction:</strong> Thymoglobulin (3.0 - 4.5 mg/kg total).</li>
                                <li><strong>MMF:</strong> Higher dose (1,000 mg PO BID).</li>
                                <li><strong>Steroids:</strong> Rapid withdrawal. Solumedrol POD 0-3, then OFF by Day 4.</li>
                            </ul>
                        </div>
                    </Card>
                </div>
            )}

            {tab === 'induction' && (
                <div className="space-y-4">
                    <Card title={<div className="flex items-center">Induction Agents
                        <SourceTip source="KDIGO & CCF Guidelines" />
                    </div>}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border-l-4 border-purple-500 pl-4 py-2">
                                <h3 className="font-bold text-lg text-purple-700">Thymoglobulin (ATG)</h3>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Lymphocyte Depleting</div>
                                <p className="text-xs text-slate-600 mb-2">Polyclonal antibody (Rabbit). Profound T-cell depletion.</p>
                                <div className="bg-purple-50 p-2 rounded text-xs text-purple-800">
                                    <strong>Side Effects:</strong> Cytokine Release Syndrome (Fever/Chills/Rigors), Serum Sickness, Leukopenia,
                                    Thrombocytopenia.
                                </div>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4 py-2">
                                <h3 className="font-bold text-lg text-blue-700">Basiliximab (Simulect)</h3>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Non-Depleting</div>
                                <p className="text-xs text-slate-600 mb-2">IL-2 Receptor Antagonist (CD25). Blocks activation.</p>
                                <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                                    <strong>Side Effects:</strong> Very well tolerated. Rare hypersensitivity. No Cytokine release.
                                </div>
                            </div>
                            <div className="border-l-4 border-slate-500 pl-4 py-2 md:col-span-2">
                                <h3 className="font-bold text-lg text-slate-700">Alemtuzumab (Campath)</h3>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Lymphocyte Depleting (Humanized Monoclonal)</div>
                                <p className="text-xs text-slate-600 mb-2">Anti-CD52. Profound and prolonged depletion of T-cells, B-cells, and monocytes. Not routinely used in CCF.</p>
                                <div className="bg-slate-100 p-2 rounded text-xs text-slate-800">
                                    <strong>Side Effects:</strong> Infusion reactions, prolonged neutropenia/anemia/thrombocytopenia, secondary autoimmune conditions (ITP, thyroid), high risk for opportunistic infections.
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === 'maintenance' && (
                <div className="space-y-4">
                    <Card title="Calcineurin Inhibitors (CNI)">
                        <div className="text-sm space-y-4">
                            <div>
                                <h4 className="font-bold text-blue-800 text-base mb-1">Tacrolimus (Prograf) - IR</h4>
                                <div className="bg-red-50 p-2 rounded text-xs text-red-800 border border-red-100 mb-2">
                                    <strong>Side Effects:</strong> Tremor, Nephrotoxicity (afferent constriction), Hyperkalemia,
                                    Hypomagnesemia, HTN, NODAT (Diabetes), Hair loss.
                                </div>
                                <p className="text-xs text-slate-500"><strong>Monitor:</strong> Trough 12hr post-dose.</p>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-bold text-indigo-800 text-base mb-1">Envarsus XR</h4>
                                <p className="mb-2 text-xs">Extended release. MeltDose technology. Once daily.</p>
                                <ul className="list-disc list-inside text-slate-600 text-xs mb-2">
                                    <li>Lower Cmax (peak) = <strong>Less Tremor</strong>.</li>
                                    <li>Requires 80% of IR dose (increased bioavailability).</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card title="mTOR Inhibitors">
                        <div className="text-sm space-y-2">
                            <h4 className="font-bold text-teal-800 text-base mb-1">Everolimus (Zortress)</h4>
                            <p className="text-xs text-slate-600 mb-2">Inhibits mTOR; blocks IL-2-mediated T-cell proliferation.</p>

                            <div className="grid grid-cols-1 gap-2">
                                <div className="bg-teal-50 p-2 rounded text-xs text-teal-800 border border-teal-100">
                                    <strong>Side Effects:</strong> Hyperlipidemia, proteinuria, cytopenias, impaired wound healing, edema.
                                </div>
                                <ul className="list-disc list-inside text-slate-600 text-xs">
                                    <li>Often combined with reduced-dose tacrolimus.</li>
                                    <li>May lower risk of post-transplant malignancy (esp. SCC).</li>
                                    <li>Monitoring: Trough level.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card title="Antimetabolites & Steroids">
                        <div className="space-y-4 text-sm">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-1">Mycophenolate (CellCept / Myfortic)</h4>
                                <p className="text-xs mb-1">Inhibits purine synthesis (IMPDH).</p>
                                <div className="bg-orange-50 p-2 rounded text-xs text-orange-800 border border-orange-100 mb-2">
                                    <strong>Side Effects:</strong> GI Toxicity (Diarrhea/Nausea), Leukopenia, Anemia. <span
                                        className="font-bold">Teratogenic.</span>
                                </div>
                                <p className="text-xs text-slate-500 italic">Myfortic preferred in patients with significant GI toxicity.</p>
                            </div>
                            <div className="border-t pt-2">
                                <h4 className="font-bold text-slate-800 mb-1">Prednisone</h4>
                                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 border border-yellow-100">
                                    <strong>Side Effects:</strong> Hyperglycemia, Weight Gain, Mood changes, Osteoporosis, HTN,
                                    Cataracts, Skin fragility.
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {tab === 'calc' && (
                <div className="space-y-4">
                    <Card title="Tacrolimus Converters">
                        <div className="space-y-6">
                            {/* PO to SL */}
                            <div>
                                <div className="flex items-center gap-2 font-bold text-slate-700 mb-2">
                                    <Calculator size={16} /> PO to Sublingual (SL)
                                </div>
                                <p className="text-xs text-slate-500 mb-2">For NPO patients. Ratio 2:1.</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">PO Dose (mg)</label>
                                        <input type="number" value={poDose} onChange={(e) => setPoDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. 4"
                                        />
                                    </div>
                                    <div className="text-slate-300">
                                        <ArrowRight />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">SL Dose (mg)</label>
                                        <div
                                            className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-blue-700">
                                            {slDose} mg
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* IR to Envarsus */}
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 font-bold text-slate-700 mb-2">
                                    <Calculator size={16} /> Tacrolimus IR to Envarsus XR
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Conversion factor: <strong>0.8</strong> (80% of TDD).</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">IR TDD (mg/day)</label>
                                        <input type="number" value={irTotalDose} onChange={(e) => setIrTotalDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. 6"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">(e.g. 3mg BID = 6mg Total)</p>
                                    </div>
                                    <div className="text-slate-300">
                                        <ArrowRight />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">Envarsus Dose (mg)</label>
                                        <div
                                            className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-indigo-700">
                                            {envarsusDose} mg
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1">Once Daily (AM)</p>
                                    </div>
                                </div>
                            </div>

                            {/* CellCept to Myfortic */}
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 font-bold text-slate-700 mb-2">
                                    <Calculator size={16} /> CellCept to Myfortic
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Approximation (Factor ~0.72). 1000mg ≈ 720mg.</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">CellCept (mg)</label>
                                        <input type="number" value={cellceptDose} onChange={(e) => setCellceptDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="e.g. 1000"
                                        />
                                    </div>
                                    <div className="text-slate-300">
                                        <ArrowRight />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-slate-500 block mb-1">Myfortic (mg)</label>
                                        <div
                                            className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-orange-700">
                                            {myforticDose} mg
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

const Rejection = () => (
    <div className="space-y-6">
        <SectionHeader title="Graft Dysfunction" icon={AlertTriangle} subtitle="Focus on DGF & Rejection" />

        <Card title={<div className="flex items-center text-red-700">Delayed Graft Function (DGF)
            <SourceTip source="Rao PS et al.; CCF Care Path" />
        </div>}>
            <div className="space-y-4 text-sm">
                <div className="bg-red-50 p-3 rounded border border-red-100">
                    <span className="font-bold text-red-800 block mb-1">Definition:</span>
                    Requirement for dialysis within the first 7 days post-transplant.
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-1">Risk Factors</h4>
                        <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                            <li>DCD Donor (Warm Ischemia)</li>
                            <li>Cold Ischemia Time &gt; 24h</li>
                            <li>High KDPI</li>
                            <li>High BMI</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-700 mb-1">Management</h4>
                        <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                            <li>Avoid Hypotension</li>
                            <li>Adjust meds (Hold ACEi)</li>
                            <li><strong>Biopsy</strong> if no recovery by Day 7-14 to rule out rejection.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
            <Card title={<div className="flex items-center">TCMR (T-Cell)
                <SourceTip source="CCF Protocol: Rejection" />
            </div>} className="border-l-4 border-l-orange-400">
                <div className="space-y-4 text-sm">
                    <p className="text-xs text-slate-500">Tubulitis (t), Interstitial Inflammation (i)</p>

                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">Categories</h4>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li><strong>Borderline:</strong> i1 (10-25%) + mild tubulitis (t1-t3).</li>
                            <li><strong>Grade IA:</strong> i2/i3 (&gt;25%) + t2 (moderate).</li>
                            <li><strong>Grade IB:</strong> i2/i3 (&gt;25%) + t3 (severe).</li>
                            <li><strong>Grade IIA/B:</strong> Vascular (v1/v2). Intimal arteritis.</li>
                            <li><strong>Grade III:</strong> Transmural arteritis / necrosis (v3).</li>
                            <li><strong>Chronic Active:</strong> Inflammation in fibrosis areas (i-IFTA).</li>
                        </ul>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-2">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">Treatment</h4>
                        <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                            <li><strong>Borderline/IA:</strong> Pulse Solumedrol 500mg x 3.</li>
                            <li><strong>IB/II/III:</strong> Thymoglobulin 1.5 mg/kg/day (Target 4-7 mg/kg total).</li>
                            <li>Followed by Oral Steroid Taper.</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Card title={<div className="flex items-center">ABMR (Antibody)
                <SourceTip source="CCF Protocol: Rejection" />
            </div>} className="border-l-4 border-l-red-400">
                <div className="space-y-4 text-sm">
                    <p className="text-xs text-slate-500">DSA, C4d+, Microvascular Inflammation (MVI)</p>

                    <div className="space-y-2">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">3 Diagnostic Pillars</h4>
                        <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                            <li><strong>Morphologic:</strong> MVI (g&gt;0, ptc&gt;0), Arteritis, TMA, ATI.</li>
                            <li><strong>Antibody Interaction:</strong> C4d+, MVI score &ge;2, Molecular transcripts.</li>
                            <li><strong>Serologic:</strong> DSA Positive.</li>
                        </ol>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-2">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">Banff 2022 Updates</h4>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li><strong>MVI, DSA-neg, C4d-neg:</strong> Non-HLA/NK cell activation.</li>
                            <li><strong>Probable ABMR:</strong> DSA+ with some histology but below threshold.</li>
                            <li><strong>Chronic Active (caABMR):</strong> Double contours (cg&gt;0).</li>
                        </ul>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-2">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">Treatment</h4>
                        <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                            <li><strong>Plasmapheresis:</strong> x 6 sessions (3/week x 2 weeks).</li>
                            <li><strong>IVIG:</strong> 0.5 g/kg after each Plex (Total 2 g/kg).</li>
                            <li><strong>+/- Rituximab:</strong> Anti-CD20.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

const Infections = () => (
    <div className="space-y-6">
        <SectionHeader title="Infectious Disease" icon={Thermometer} subtitle="CMV, PJP, BK & Prophylaxis" />

        <Card title={<div className="flex items-center">CMV Prophylaxis & Treatment
            <SourceTip source="CCF Care Path: Viral Infections" />
        </div>}>
            <div className="space-y-4 text-sm">

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-blue-800">High Risk (D+/R-)</h4>
                        <span className="text-[10px] bg-white border border-blue-200 px-2 rounded">Primary</span>
                    </div>
                    <p className="text-slate-700 text-xs"><strong>Protocol:</strong> Valganciclovir 900mg daily x <strong>6
                        months</strong>.</p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-yellow-800">Intermediate (R+, D- or D+)</h4>
                        <span className="text-[10px] bg-white border border-yellow-200 px-2 rounded">Reactivation</span>
                    </div>
                    <p className="text-slate-700 text-xs"><strong>Protocol:</strong> Valganciclovir 900mg daily x <strong>3
                        months</strong>.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th className="p-2 border border-slate-200">CrCl</th>
                                <th className="p-2 border border-slate-200">Induction/Tx</th>
                                <th className="p-2 border border-slate-200">Prophylaxis</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600">
                            <tr>
                                <td className="p-2 border border-slate-200">&ge;60</td>
                                <td className="p-2 border border-slate-200">900mg BID</td>
                                <td className="p-2 border border-slate-200">900mg Daily</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-200">40-&lt;60</td>
                                <td className="p-2 border border-slate-200">450mg BID</td>
                                <td className="p-2 border border-slate-200">450mg Daily</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-200">25-&lt;40</td>
                                <td className="p-2 border border-slate-200">450mg Daily</td>
                                <td className="p-2 border border-slate-200">450mg q2 Days</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-200">10-&lt;25</td>
                                <td className="p-2 border border-slate-200">450mg q2 Days</td>
                                <td className="p-2 border border-slate-200">450mg 2x/Week</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-200">&lt;10</td>
                                <td className="p-2 border border-slate-200 text-[10px]" colSpan="2">
                                    Not recommended; consider 100mg oral solution 3x/wk or 450mg tablet 2x/wk.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-1">Treatment of CMV Disease</h4>
                    <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                        <li><strong>Valganciclovir:</strong> 900 mg BID (Treatment dose) until negative PCR x 2 weeks.</li>
                        <li><strong>IV Ganciclovir:</strong> 5 mg/kg q12h. Use for severe disease/malabsorption.</li>
                        <li>Reduce Immunosuppression (Stop MMF).</li>
                    </ul>
                </div>
            </div>
        </Card>

        {/* PTLD CARD ADDED */}
        <Card title={<div className="flex items-center">PTLD
            <SourceTip source="CCF Notes; AST Guidelines" />
        </div>} className="border-l-4 border-l-purple-400">
            <div className="space-y-3 text-sm">
                <div>
                    <span className="font-bold text-purple-900 block">Post-Transplant Lymphoproliferative Disorder</span>
                    <span className="text-xs text-slate-500">Malignancy driven by EBV proliferation of B-cells.</span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-purple-50 p-2 rounded text-xs">
                    <div>
                        <span className="font-bold block text-purple-800">Risk Factors</span>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>EBV D+/R- (Highest)</li>
                            <li>Heavy T-cell depletion (Thymo)</li>
                        </ul>
                    </div>
                    <div>
                        <span className="font-bold block text-purple-800">Presentation</span>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>Fever, Weight Loss</li>
                            <li>Lymphadenopathy</li>
                            <li>Rise in Creatinine</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-700 text-xs block mb-1">Management Strategy</span>
                    <ol className="list-decimal list-inside text-slate-600 text-xs space-y-1">
                        <li><strong>Reduce Immunosuppression:</strong> 1st line (Regression possible).</li>
                        <li><strong>Rituximab:</strong> Anti-CD20 monoclonal antibody.</li>
                        <li><strong>Chemotherapy:</strong> (CHOP) for non-responders.</li>
                    </ol>
                </div>
            </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
            <Card title={<div className="flex items-center">PJP Prophylaxis
                <SourceTip source="CCF Care Path: PJP" />
            </div>}>
                <div className="space-y-2 text-sm">
                    <p><strong>Drug:</strong> Bactrim (TMP-SMX)</p>
                    <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                        <li>1 SS Daily OR 1 DS 3x/week.</li>
                        <li><strong>Duration:</strong> Life of allograft (or min 18 months).</li>
                        <li><strong>Sulfa Allergy:</strong> Dapsone 100mg daily or Atovaquone or Pentamidine.</li>
                        <li className="italic text-slate-500">Note: For Pentamidine, order "Pentamidine + Albuterol".</li>
                    </ul>
                </div>
            </Card>

            <Card title={<div className="flex items-center">Fungal / HSV
                <SourceTip source="CCF Care Path" />
            </div>}>
                <div className="space-y-2 text-sm">
                    <div>
                        <span className="font-bold block text-slate-700 text-xs">Fungal (Thrush)</span>
                        <p className="text-slate-600 text-xs">Nystatin or Clotrimazole x 1 month.</p>
                    </div>
                    <div className="border-t pt-2">
                        <span className="font-bold block text-slate-700 text-xs">HSV / VZV</span>
                        <p className="text-slate-600 text-xs">Acyclovir 400mg BID x 3 months (if not on Valcyte).</p>
                    </div>
                </div>
            </Card>
        </div>

        <Card title={<div className="flex items-center">BK Virus (Polyomavirus)
            <SourceTip source="CCF Care Path: BKV" />
        </div>}>
            <div className="text-sm space-y-2">
                <div className="bg-slate-100 p-2 rounded text-xs">
                    <strong>Screening:</strong> Monthly PCR up to 6 months, then q3 months.
                </div>
                <h4 className="font-bold text-slate-700 mt-2">Management (Stepwise):</h4>
                <ol className="list-decimal list-inside text-slate-600 text-xs space-y-1">
                    <li>Reduce Immunosuppression (30-50%).</li>
                    <li>Reduce Tacrolimus target to <strong>4-7 ng/mL</strong>.</li>
                    <li>Decrease MMF dose by 50%.</li>
                    <li>Consider Leflunomide or IVIG (Second line).</li>
                </ol>
            </div>
        </Card>
    </div>
);

// --- Main App Component ---

export default function TransplantGuideApp() {
    const [activeSection, setActiveSection] = useState('epidemiology');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [showAck, setShowAck] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); if (window.innerWidth >= 768) setSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const NavItem = ({ id, label, icon: Icon }) => (
        <button onClick={() => {
            setActiveSection(id);
            if (isMobile) setSidebarOpen(false);
        }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === id
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
        >
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
            {/* Acknowledgment Modal */}
            {showAck && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAck(false)}>
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative border border-slate-100" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowAck(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={20} />
                        </button>
                        <h3 className="font-bold text-lg text-blue-800 mb-4 border-b pb-2">Acknowledgments</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Special thanks to the following contributors for their invaluable input and review:
                        </p>
                        <ul className="text-sm text-slate-700 font-medium space-y-3 mb-6">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Ratib Mahfouz, M.D.</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Itunu Owoyemi, MBBS</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Mathew Duck, RN, BSN</li>
                        </ul>
                        <button onClick={() => setShowAck(false)} className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Sidebar Backdrop for Mobile */}
            {isMobile && sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={` fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform
                transition-transform duration-200 ease-in-out flex flex-col ${sidebarOpen ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"} `}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/logo.svg" alt="Tx Nephrology Fellow's Pocket Guide" className="h-10 w-auto" />
                    </div>
                    {isMobile && <button onClick={() => setSidebarOpen(false)}>
                        <X size={24} className="text-slate-400" />
                    </button>}
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <NavItem id="epidemiology" label="Epidemiology" icon={Activity} />
                    <NavItem id="surgical" label="Surgical" icon={Scissors} />
                    <NavItem id="immunology" label="Immunology" icon={Shield} />
                    <NavItem id="pharma" label="Pharmacology" icon={Pill} />
                    <NavItem id="rejection" label="Rejection" icon={AlertTriangle} />
                    <NavItem id="infections" label="Infections" icon={Thermometer} />
                    <NavItem id="studies" label="Studies" icon={BookOpen} />
                    {/* Removed Checklist and Acronyms */}
                </nav>

                <div className="p-4 border-t border-slate-100 space-y-2">
                    <div className="bg-blue-50 p-3 rounded-lg text-xs text-slate-600 flex gap-2">
                        <Info size={16} className="shrink-0 text-blue-500" />
                        <span>Data sourced from OPTN/SRTR & Standard Clinical Guidelines.</span>
                    </div>
                    <div className="text-center text-xs text-slate-500 mt-2 mb-1">
                        <button onClick={() => setShowAck(true)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                            Acknowledgments
                        </button>
                    </div>
                    <div className="text-center text-[10px] text-slate-400">
                        Programmed by <span className="font-semibold text-slate-600">Ratib Mahfouz</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden w-full">
                {/* Mobile Header */}
                <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 md:hidden shrink-0">
                    <button onClick={() => setSidebarOpen(true)} className="p-1 rounded hover:bg-slate-100">
                        <Menu size={24} className="text-slate-600" />
                    </button>
                    <span className="font-bold text-lg text-slate-800">Pocket Guide</span>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">
                    {activeSection === 'epidemiology' &&
                        <Epidemiology />}
                    {activeSection === 'surgical' &&
                        <Surgical />}
                    {activeSection === 'immunology' &&
                        <Immunology />}
                    {activeSection === 'pharma' &&
                        <Pharmacology />}
                    {activeSection === 'rejection' &&
                        <Rejection />}
                    {activeSection === 'infections' &&
                        <Infections />}
                    {activeSection === 'studies' &&
                        <LandmarkStudies />}

                    <div className="h-12" /> {/* Spacer */}
                </div>
            </main>
        </div>
    );
}