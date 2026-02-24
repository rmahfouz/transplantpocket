import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add CalculatorDrawer before Pharmacology
const pharmStart = `const Pharmacology = () => {
    const [tab, setTab] = useState('protocols');
    const [poDose, setPoDose] = useState('');`;

const drawerComponent = `const CalculatorDrawer = ({ isOpen, onClose }) => {
    const [poDose, setPoDose] = useState('');
    const [slDose, setSlDose] = useState(0);
    const [irTotalDose, setIrTotalDose] = useState('');
    const [envarsusDose, setEnvarsusDose] = useState(0);
    const [cellceptDose, setCellceptDose] = useState('');
    const [myforticDose, setMyforticDose] = useState(0);
    const [crcl, setCrcl] = useState('');
    const [valcyteDose, setValcyteDose] = useState({ induction: '-', prophylaxis: '-' });

    useEffect(() => {
        setSlDose(poDose ? parseFloat(poDose) / 2 : 0);
    }, [poDose]);

    useEffect(() => {
        setEnvarsusDose(irTotalDose ? (parseFloat(irTotalDose) * 0.8).toFixed(1) : 0);
    }, [irTotalDose]);

    useEffect(() => {
        setMyforticDose(cellceptDose ? (parseFloat(cellceptDose) * 0.72).toFixed(0) : 0);
    }, [cellceptDose]);

    useEffect(() => {
        const value = parseInt(crcl, 10);
        if (!crcl || isNaN(value)) {
            setValcyteDose({ induction: '-', prophylaxis: '-' });
        } else if (value >= 60) {
            setValcyteDose({ induction: '900mg BID', prophylaxis: '900mg Daily' });
        } else if (value >= 40) {
            setValcyteDose({ induction: '450mg BID', prophylaxis: '450mg Daily' });
        } else if (value >= 25) {
            setValcyteDose({ induction: '450mg Daily', prophylaxis: '450mg q2 Days' });
        } else if (value >= 10) {
            setValcyteDose({ induction: '450mg q2 Days', prophylaxis: '450mg 2x/Week' });
        } else {
            setValcyteDose({ induction: 'Not recommended', prophylaxis: 'Not recommended' });
        }
    }, [crcl]);

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
                    onClick={onClose}
                />
            )}
            
            <div className={\`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out \${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col\`}>
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-blue-50">
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                        <Calculator size={20} className="text-blue-700" />
                        Clinical Calculators
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <Card title="Valganciclovir (Valcyte) Dosing" className="border-l-4 border-l-green-500">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">CrCl (mL/min)</label>
                                <input type="number" value={crcl} onChange={(e) => setCrcl(e.target.value)}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="e.g. 45"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                    <div className="text-xs text-slate-500 font-semibold mb-1">Induction / Tx</div>
                                    <div className="font-bold text-slate-800">{valcyteDose.induction}</div>
                                </div>
                                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                    <div className="text-xs text-slate-500 font-semibold mb-1">Prophylaxis</div>
                                    <div className="font-bold text-slate-800">{valcyteDose.prophylaxis}</div>
                                </div>
                            </div>
                            {crcl && parseInt(crcl, 10) < 10 && (
                                <p className="text-[10px] text-red-600 mt-2 italic">
                                    *Not recommended; consider 100mg oral solution 3x/wk or 450mg tablet 2x/wk.
                                </p>
                            )}
                        </div>
                    </Card>

                    <Card title="Immunosuppression Converters">
                        <div className="space-y-6">
                            <div>
                                <div className="text-sm font-bold text-slate-700 mb-2">
                                    PO to Sublingual (SL)
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Ratio 2:1</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <input type="number" value={poDose} onChange={(e) => setPoDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            placeholder="PO mg"
                                        />
                                    </div>
                                    <div className="text-slate-300"><ArrowRight /></div>
                                    <div className="w-1/2">
                                        <div className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-blue-700 text-sm">
                                            {slDose} mg SL
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="text-sm font-bold text-slate-700 mb-2">
                                    Tacrolimus IR to Envarsus XR
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Factor: 0.8 (80% of TDD)</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <input type="number" value={irTotalDose} onChange={(e) => setIrTotalDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                            placeholder="IR TDD mg"
                                        />
                                    </div>
                                    <div className="text-slate-300"><ArrowRight /></div>
                                    <div className="w-1/2">
                                        <div className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-indigo-700 text-sm">
                                            {envarsusDose} mg
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="text-sm font-bold text-slate-700 mb-2">
                                    CellCept to Myfortic
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Factor: ~0.72</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-1/2">
                                        <input type="number" value={cellceptDose} onChange={(e) => setCellceptDose(e.target.value)}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                                            placeholder="CellCept mg"
                                        />
                                    </div>
                                    <div className="text-slate-300"><ArrowRight /></div>
                                    <div className="w-1/2">
                                        <div className="w-full p-2 bg-slate-100 border border-slate-200 rounded font-bold text-orange-700 text-sm">
                                            {myforticDose} mg
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

const Pharmacology = () => {
    const [tab, setTab] = useState('protocols');
    const [poDose, setPoDose] = useState('');`;

content = content.replace(pharmStart, drawerComponent);

// 2. Remove rest of Pharmacology state
const stateToRemove = `    const [poDose, setPoDose] = useState('');
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
    }, [cellceptDose]);`;

content = content.replace(stateToRemove, '');

// 3. Remove calc TabButton
content = content.replace(
    `<TabButton active={tab === 'calc'} onClick={() => setTab('calc')} label="Calculators" />`,
    ``
);

// 4. Remove {tab === 'calc' && (...)} block from Pharmacology
const calcBlock = `{tab === 'calc' && (
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
            )}`;

content = content.replace(calcBlock, '');

// 5. Remove CMV table from Infections
const cmvTable = `<div className="overflow-x-auto">
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
                </div>`;

content = content.replace(cmvTable, '');

// 6. Update App component with state and trigger
const appStartStr = `export default function TransplantGuideApp() {
    const [activeSection, setActiveSection] = useState('epidemiology');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [showAck, setShowAck] = useState(false);`;

const newAppStartStr = `export default function TransplantGuideApp() {
    const [activeSection, setActiveSection] = useState('epidemiology');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [showAck, setShowAck] = useState(false);
    const [calculatorOpen, setCalculatorOpen] = useState(false);`;

content = content.replace(appStartStr, newAppStartStr);

const renderTopStr = `return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
            {/* Acknowledgment Modal */}`;

const newRenderTopStr = `return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
            <CalculatorDrawer isOpen={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
            
            {/* Acknowledgment Modal */}`;

content = content.replace(renderTopStr, newRenderTopStr);

const mobileHeaderStr = `<header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 md:hidden shrink-0">
                    <button onClick={() => setSidebarOpen(true)} className="p-1 rounded hover:bg-slate-100">
                        <Menu size={24} className="text-slate-600" />
                    </button>
                    <span className="font-bold text-lg text-slate-800">Pocket Guide</span>
                </header>`;

const newMobileHeaderStr = `<header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between md:hidden shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="p-1 rounded hover:bg-slate-100">
                            <Menu size={24} className="text-slate-600" />
                        </button>
                        <span className="font-bold text-lg text-slate-800">Pocket Guide</span>
                    </div>
                    <button onClick={() => setCalculatorOpen(true)} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <Calculator size={20} />
                    </button>
                </header>`;

content = content.replace(mobileHeaderStr, newMobileHeaderStr);

// We need a drawer trigger on Desktop too. So let's add a button in the main layout top right (maybe floating or a header row for desktop).
// We don't have a desktop header right now, the sidebar acts as navigation and the content scrollpane is just empty space.
// I will place it floating on the bottom right for desktop, OR just top right of the main content area.
const contentScrollAreaStr = `{/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">`;

const newContentScrollAreaStr = `{/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full relative">
                    {/* Desktop Calculator Trigger */}
                    {!isMobile && (
                        <div className="absolute top-4 right-4 md:top-8 md:right-8">
                            <button onClick={() => setCalculatorOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full text-blue-600 hover:bg-blue-50 font-medium text-sm transition-all">
                                <Calculator size={18} />
                                Calculators
                            </button>
                        </div>
                    )}`;

content = content.replace(contentScrollAreaStr, newContentScrollAreaStr);

fs.writeFileSync('src/App.jsx', content);
console.log('done');
