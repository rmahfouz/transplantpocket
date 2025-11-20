# Adding Landmark Studies Section

Follow these steps to add the Landmark Studies section to your app:

## Step 1: Add Icons to Imports (Line 2-14)

Find the import statement from 'lucide-react' and add `BookOpen` and `ExternalLink`:

```javascript
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
Scissors,
BookOpen,      // ADD THIS
ExternalLink   // ADD THIS
} from 'lucide-react';
```

## Step 2: Add Landmark Studies Data (After line 24, after EPIDEMIOLOGY_DATA)

Add this data array after the `EPIDEMIOLOGY_DATA` constant:

```javascript
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
```

## Step 3: Add LandmarkStudies Component (After Infections component, before line 761)

Add this complete component after the `Infections` component closes (after line 759):

```javascript
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
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
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
```

## Step 4: Add Navigation Item (Around line 820)

In the sidebar navigation, add this line after the Infections NavItem:

```javascript
<NavItem id="studies" label="Studies" icon={BookOpen} />
```

So it looks like:
```javascript
<nav className="flex-1 overflow-y-auto p-4 space-y-2">
    <NavItem id="epidemiology" label="Epidemiology" icon={Activity} />
    <NavItem id="surgical" label="Surgical" icon={Scissors} />
    <NavItem id="immunology" label="Immunology" icon={Shield} />
    <NavItem id="pharma" label="Pharmacology" icon={Pill} />
    <NavItem id="rejection" label="Rejection" icon={AlertTriangle} />
    <NavItem id="infections" label="Infections" icon={Thermometer} />
    <NavItem id="studies" label="Studies" icon={BookOpen} />  {/* ADD THIS */}
</nav>
```

## Step 5: Add Content Rendering (Around line 856)

In the main content area, add this after the infections section:

```javascript
{activeSection === 'studies' &&
    <LandmarkStudies />}
```

So it looks like:
```javascript
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
    <LandmarkStudies />}  {/* ADD THIS */}
```

## Done!

After making these changes:
1. Save the file
2. The dev server should auto-reload
3. You'll see a new "Studies" tab in the sidebar
4. Click it to view the 12 landmark studies with category filtering

The studies are organized by category and include PICO format with direct PubMed links!
