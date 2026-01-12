import React, { useState } from 'react';
import { BookOpen, ExternalLink, Info } from 'lucide-react';

// Landmark Studies Data
const LANDMARK_STUDIES = [
    {
        id: "elite-symphony-2007",
        shortTitle: "ELITE-Symphony",
        citation: "Ekberg et al., NEJM 2007",
        year: 2007,
        category: "Immunosuppression Maintenance",
        pico: {
            population: "1,645 de novo kidney transplant recipients",
            intervention: "Low-dose Tacrolimus + MMF + Steroids + Daclizumab",
            comparison: "Standard-dose Cyclosporine, Low-dose Cyclosporine, or Low-dose Sirolimus regimens",
            outcome: "Low-dose Tacrolimus had the best eGFR, lowest acute rejection rate, and highest graft survival."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/18094377/"
    },
    {
        id: "benefit-2010",
        shortTitle: "BENEFIT Trial",
        citation: "Vincenti et al., Am J Transplant 2010",
        year: 2010,
        category: "CNI-Sparing",
        pico: {
            population: "666 kidney transplant recipients (standard criteria/living donors)",
            intervention: "Belatacept (More Intensive or Less Intensive)",
            comparison: "Cyclosporine (Standard Care)",
            outcome: "Belatacept showed superior renal function and metabolic profiles but higher rates/grades of early acute rejection."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/20415897/"
    },
    {
        id: "brennan-2006",
        shortTitle: "Brennan Induction",
        citation: "Brennan et al., NEJM 2006",
        year: 2006,
        category: "Induction",
        pico: {
            population: "278 high-risk kidney transplant recipients",
            intervention: "Rabbit Anti-Thymocyte Globulin (rATG) induction",
            comparison: "Basiliximab (IL-2 RA) induction",
            outcome: "rATG significantly reduced acute rejection (15.6% vs 25.5%) but increased infection risk; survival was similar."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/17093248/"
    },
    {
        id: "woodle-2008",
        shortTitle: "Woodle Steroid Withdrawal",
        citation: "Woodle et al., Ann Surg 2008",
        year: 2008,
        category: "Steroid Withdrawal",
        pico: {
            population: "386 low-to-moderate risk recipients",
            intervention: "Early Steroid Withdrawal (stopped by day 7)",
            comparison: "Chronic Corticosteroid Maintenance",
            outcome: "No difference in patient/graft survival at 5 years. Withdrawal group had slightly higher rejection but better metabolic outcomes."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/18936577/"
    },
    {
        id: "hope-2019",
        shortTitle: "HOPE Study",
        citation: "Durand et al., NEJM 2019",
        year: 2019,
        category: "Special Populations",
        pico: {
            population: "75 HIV-positive kidney transplant candidates",
            intervention: "Kidneys from HIV-positive deceased donors",
            comparison: "Kidneys from HIV-negative deceased donors",
            outcome: "No significant difference in graft survival or rejection, validating the safety of HIV-to-HIV transplantation."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/30893539/"
    },
    {
        id: "thinker-2017",
        shortTitle: "THINKER Trial",
        citation: "Goldberg et al., NEJM 2017",
        year: 2017,
        category: "Special Populations",
        pico: {
            population: "10 HCV-negative kidney transplant candidates",
            intervention: "Kidneys from HCV-viremic (genotype 1) deceased donors + elbasvir–grazoprevir",
            comparison: "Standard of care (avoiding HCV-positive donors)",
            outcome: "100% cure rate (SVR12), excellent early graft function, proving feasibility of HCV-viremic organs."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/28398835/"
    },
    {
        id: "transform-2018",
        shortTitle: "TRANSFORM Study",
        citation: "Pascual et al., J Am Soc Nephrol 2018",
        year: 2018,
        category: "mTOR Inhibitors",
        pico: {
            population: "2,037 de novo recipients",
            intervention: "Everolimus + Reduced-exposure CNI",
            comparison: "Mycophenolic Acid (MPA) + Standard-exposure CNI",
            outcome: "Everolimus regimen was non-inferior for composite endpoint (rejection/graft dysfunction) with different side-effect profile (wound issues vs viral)."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/29875199/"
    },
    {
        id: "tricontinental-1996",
        shortTitle: "Tricontinental MMF",
        citation: "The Tricontinental Study Group, Lancet 1996",
        year: 1996,
        category: "Historical/Antimetabolites",
        pico: {
            population: "503 cadaveric kidney recipients",
            intervention: "Mycophenolate Mofetil (MMF)",
            comparison: "Azathioprine + Cyclosporine + Steroids",
            outcome: "MMF significantly reduced biopsy-proven acute rejection compared to Azathioprine."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/8623181/"
    },
    {
        id: "montgomery-2011",
        shortTitle: "Montgomery Desensitization",
        citation: "Montgomery et al., NEJM 2011",
        year: 2011,
        category: "Desensitization",
        pico: {
            population: "211 HLA-sensitized patients with incompatible living donor",
            intervention: "Desensitization + Live Donor Transplant",
            comparison: "Waitlist (Dialysis or eventual compatible transplant)",
            outcome: "Significant survival benefit for desensitized patients compared to those remaining on dialysis/waitlist."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/21793744/"
    },
    {
        id: "impact-2010",
        shortTitle: "IMPACT Study",
        citation: "Humar et al., Am J Transplant 2010",
        year: 2010,
        category: "Infectious Disease",
        pico: {
            population: "318 high-risk (CMV D+/R-) recipients",
            intervention: "Valganciclovir prophylaxis for 200 days",
            comparison: "Valganciclovir prophylaxis for 100 days",
            outcome: "200-day prophylaxis significantly reduced CMV disease at 12 months without increased toxicity."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/20420626/"
    },
    {
        id: "caesar-2007",
        shortTitle: "CAESAR Study",
        citation: "Ekberg et al., Am J Transplant 2007",
        year: 2007,
        category: "CNI Minimization",
        pico: {
            population: "536 de novo recipients",
            intervention: "Cyclosporine Withdrawal (stopped by month 6)",
            comparison: "Low-dose or Standard-dose Cyclosporine maintenance",
            outcome: "Complete Cyclosporine withdrawal led to significantly higher acute rejection rates."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/17229079/"
    },
    {
        id: "twist-2010",
        shortTitle: "TWIST Study",
        citation: "Grenda et al., Am J Transplant 2010",
        year: 2010,
        category: "Pediatrics",
        pico: {
            population: "Pediatric recipients (low risk)",
            intervention: "Steroid-free regimen (Tac + MMF + Daclizumab)",
            comparison: "Standard Steroid Maintenance",
            outcome: "Steroid-free group had better linear growth with no increased risk of rejection or graft loss."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/20420639/"
    },
    {
        id: "zeus-2011",
        shortTitle: "ZEUS Study",
        citation: "Budde et al., Lancet 2011",
        year: 2011,
        category: "Conversion Strategies",
        pico: {
            population: "300 de novo recipients",
            intervention: "Early conversion to Everolimus (4.5 months) + CNI elimination",
            comparison: "Continue Cyclosporine",
            outcome: "Conversion improved renal function (GFR) but was associated with a higher rate of mild acute rejection."
        },
        link: "https://pubmed.ncbi.nlm.nih.gov/21658448/"
    }
];

// Helper Components (reused from App.jsx)
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
                    <div className="fixed inset-0 z-40" onClick={() => setShow(false)}></div>
                    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-800 text-white text-xs rounded-lg shadow-xl border border-slate-700 leading-relaxed">
                        <div className="font-bold mb-1 text-blue-300 uppercase tracking-wide">Source</div>
                        {source}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-slate-800"></div>
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
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 font-semibold text-slate-700 flex justify-between items-center rounded-t-xl">
                {title}
            </div>
        )}
        <div className="p-4 rounded-b-xl">{children}</div>
    </div>
);

// Main Component
const LandmarkStudies = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(LANDMARK_STUDIES.map(s => s.category))];

    const filteredStudies = selectedCategory === 'All'
        ? LANDMARK_STUDIES
        : LANDMARK_STUDIES.filter(s => s.category === selectedCategory);

    return (
        <div className="space-y-6">
            <SectionHeader title="Landmark Studies" icon={BookOpen} subtitle="Key Trials in Transplant Nephrology" />

            <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredStudies.map(study => (
                    <Card key={study.id} className="border-l-4 border-l-blue-400">
                        <div className="space-y-3">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-lg text-blue-800">{study.shortTitle}</h3>
                                    <p className="text-xs text-slate-500">{study.citation}</p>
                                </div>
                                <a
                                    href={study.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium shrink-0"
                                >
                                    PubMed <ExternalLink size={12} />
                                </a>
                            </div>

                            <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">
                                {study.category}
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                                    <div className="font-bold text-green-800 text-xs mb-1">Population</div>
                                    <div className="text-slate-700 text-xs">{study.pico.population}</div>
                                </div>

                                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                                    <div className="font-bold text-blue-800 text-xs mb-1">Intervention</div>
                                    <div className="text-slate-700 text-xs">{study.pico.intervention}</div>
                                </div>

                                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                                    <div className="font-bold text-yellow-800 text-xs mb-1">Comparison</div>
                                    <div className="text-slate-700 text-xs">{study.pico.comparison}</div>
                                </div>

                                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                                    <div className="font-bold text-purple-800 text-xs mb-1">Outcome</div>
                                    <div className="text-slate-700 text-xs">{study.pico.outcome}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LandmarkStudies;
