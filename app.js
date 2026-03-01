// 1. MODEL CONFIGURATION
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/I2ZkBgnQ9/";
let model;

// 2. THE COMPREHENSIVE MULTI-LANGUAGE DATABASE
const languages = {
    "EN": {
        "ui": {
            "title": "🌿 AGRIGUARD",
            "awaiting": "AWAITING INPUT",
            "btn_scan": "INITIATE BIOSCAN",
            "edge": "Edge-Inference Active | Offline Encrypted",
            "reset": "← RESET TERMINAL",
            "complete": "ANALYSIS COMPLETE",
            "confidence": "MATCH CONFIDENCE",
            "manual_title": "SYSTEM GUIDE",
            "steps": ["Choose Language", "Upload Corn Leaf", "Analyze Patterns", "Get Treatment"],
            "labels": ["🚨 SYMPTOMS & DIAGNOSIS", "💊 TREATMENT PLAN", "🛡️ PREVENTION STRATEGY"]
        },
        "data": {
            "Corn_Cercospora_Leaf_Spot Gray_leaf_Spot": { 
                title: "Gray Leaf Spot (Cercospora)", 
                symptoms: "Distinctive rectangular, tan lesions (0.5-2 inches) running parallel to leaf veins. Leaves may blight and die as lesions merge.", 
                cure: "1. Apply Pyraclostrobin or Azoxystrobin (Headline/Quadris) at 0.5-1.0 L/ha.\n2. Ensure coverage during silking (R1).\n3. Re-spray after 14 days if infection exceeds 5%.", 
                prevent: "1. 2-year crop rotation with Soybeans.\n2. Deep-plowing to bury debris.\n3. Use GLS-resistant hybrids." 
            },
            "Corn_Common_Rust": { 
                title: "Common Rust (Puccinia sorghi)", 
                symptoms: "Cinnamon-brown, elongated powdery pustules on both leaf surfaces. Spores spread rapidly via wind.", 
                cure: "1. Spray Tebuconazole (500ml/ha) or Mancozeb (2.5kg/ha).\n2. Apply at first sign of pustules on lower leaves.\n3. Avoid excess Nitrogen during outbreaks.", 
                prevent: "1. Plant 'Rp-resistant' hybrids.\n2. Early planting to avoid peak spore season.\n3. Maintain spacing for airflow." 
            },
            "Corn_Northern_Leaf_Blight": { 
                title: "Northern Leaf Blight (Exserohilum)", 
                symptoms: "Large, cigar-shaped tan lesions (1-6 inches). Lesions have rounded ends and a water-soaked appearance.", 
                cure: "1. Use Strobilurin + Triazole premix (Trivapro) at 1 L/ha.\n2. Protect the 'Ear Leaf' specifically to save yield.\n3. Use high water volume (200L/ha) for coverage.", 
                prevent: "1. Eliminate volunteer corn.\n2. Select hybrids with 'Ht genes'.\n3. Avoid late-evening overhead irrigation." 
            },
            "Corn_Healthy": { 
                title: "Healthy Specimen (Maize)", 
                symptoms: "Optimal chlorophyll levels. Firm texture, smooth edges, no necrotic spotting or fungal growth detected.", 
                cure: "No chemical intervention required. Continue standard N-P-K fertilization based on soil health card.", 
                prevent: "1. Scout field every 4 days in high humidity.\n2. Ensure proper drainage.\n3. Keep field perimeters clear of host weeds." 
            }
        }
    },
    "HI": {
        "ui": {
            "title": "🌿 एग्री-गार्ड",
            "awaiting": "इनपुट की प्रतीक्षा है",
            "btn_scan": "बायोस्कैन शुरू करें",
            "edge": "एज-इन्फरेंस सक्रिय | ऑफलाइन एन्क्रिप्टेड",
            "reset": "← टर्मिनल रीसेट करें",
            "complete": "विश्लेषण पूर्ण",
            "confidence": "मैच का भरोसा",
            "manual_title": "उपयोग निर्देश",
            "steps": ["भाषा चुनें", "मक्के का पत्ता अपलोड करें", "जांच का इंतज़ार करें", "इलाज देखें"],
            "labels": ["🚨 लक्षण और निदान", "💊 उपचार योजना", "🛡️ रोकथाम रणनीति"]
        },
        "data": {
            "Corn_Cercospora_Leaf_Spot Gray_leaf_Spot": { 
                title: "ग्रे लीफ स्पॉट (धब्बे)", 
                symptoms: "नसों के समानांतर लंबे, आयताकार धब्बे। ये धब्बे अंततः पूरी पत्ती को सुखा देते हैं।", 
                cure: "1. हेडलाइन (Headline) कवकनाशी का 0.5-1.0 लीटर प्रति हेक्टेयर उपयोग करें।\n2. रेशम आने के दौरान छिड़काव करें।", 
                prevent: "1. सोयाबीन के साथ फसल चक्र अपनाएं।\n2. गहरी जुताई करके मलबे को मिट्टी में दबा दें।" 
            },
            "Corn_Common_Rust": { 
                title: "कॉमन रस्ट (मक्का जंग)", 
                symptoms: "पत्तियों पर भूरे रंग के पाउडर जैसे उभरे हुए दाने। हवा से यह तेजी से फैलता है।", 
                cure: "1. मैनकोज़ेब 2.5 किलो/हेक्टेयर या टेबुकोनाज़ोल का छिड़काव करें।\n2. निचली पत्तियों पर लक्षण दिखते ही स्प्रे करें।", 
                prevent: "1. प्रतिरोधी बीज का चुनाव करें।\n2. समय से पहले बुवाई करें।" 
            },
            "Corn_Northern_Leaf_Blight": { 
                title: "नार्दन लीफ ब्लाइट", 
                symptoms: "पत्तियों पर बड़े, सिगार के आकार के भूरे धब्बे (1-6 इंच)।", 
                cure: "1. ट्रिवाप्रो (Trivapro) का 1 लीटर/हेक्टेयर की दर से उपयोग करें।\n2. भुट्टे वाली पत्ती को बचाने पर ध्यान दें।", 
                prevent: "1. पिछली फसल के मलबे को हटा दें।\n2. 'Ht जीन' वाली किस्मों का उपयोग करें।" 
            },
            "Corn_Healthy": { 
                title: "स्वस्थ मक्का", 
                symptoms: "पत्तियाँ पूरी तरह स्वस्थ और गहरे हरे रंग की हैं। कोई फंगल विकास नहीं मिला।", 
                cure: "किसी दवा की जरूरत नहीं है। संतुलित खाद (NPK) देते रहें।", 
                prevent: "1. नमी वाले मौसम में हर 4 दिन में जांच करें।\n2. जल निकासी का अच्छा इंतजाम रखें।" 
            }
        }
    }
};

let currentLang = "EN";
let activeData = languages[currentLang].data;

// 3. LOGO ANIMATION REBUILDER
function updateAnimatedLogo(langCode) {
    const titleEl = document.getElementById('app-title');
    if (langCode === 'HI') {
        titleEl.innerText = languages["HI"].ui.title;
        titleEl.classList.remove('logo-animate');
    } else {
        titleEl.classList.add('logo-animate');
        const text = "AGRIGUARD";
        let html = '<span class="icon">🌿</span>';
        text.split('').forEach(char => {
            html += `<span class="letter">${char}</span>`;
        });
        titleEl.innerHTML = html;
    }
}

// 4. LANGUAGE SWITCHER
function changeLanguage(langCode) {
    currentLang = langCode;
    activeData = languages[langCode].data;
    const ui = languages[langCode].ui;

    // Update Logo (with animation preservation)
    updateAnimatedLogo(langCode);

    // Update UI Labels
    document.getElementById('txt-awaiting').innerText = ui.awaiting;
    document.getElementById('capture-btn').innerText = ui.btn_scan;
    document.getElementById('txt-edge').innerText = ui.edge;
    document.getElementById('btn-reset').innerText = ui.reset;
    document.getElementById('txt-complete').innerText = ui.complete;
    document.getElementById('txt-confidence').innerText = ui.confidence;
    document.getElementById('modal-title').innerText = ui.manual_title;

    // Update Modal Steps
    const stepTexts = document.querySelectorAll('.guide-step p');
    ui.steps.forEach((text, i) => { if(stepTexts[i]) stepTexts[i].innerText = text; });

    // Toggle Buttons
    document.getElementById('btn-en').classList.toggle('active-lang', langCode === 'EN');
    document.getElementById('btn-hi').classList.toggle('active-lang', langCode === 'HI');
}

// 5. AI INITIALIZATION
async function initAI() {
    const status = document.getElementById('status-badge');
    try {
        const base = MODEL_URL.endsWith('/') ? MODEL_URL : MODEL_URL + '/';
        model = await tmImage.load(base + "model.json", base + "metadata.json");
        status.innerText = "SYSTEM ONLINE";
        status.style.color = "#00ff88";
        status.style.borderColor = "#00ff88";
    } catch (e) {
        status.innerText = "LINK FAILURE";
        status.style.color = "#ff4444";
    }
}

// 6. PHOTO HANDLING
const input = document.getElementById('camera-input');
document.getElementById('capture-btn').addEventListener('click', () => {
    // Shutter Sound (Optional Hackathon Wow Factor)
    new Audio('https://www.soundjay.com/buttons/beep-01a.mp3').play().catch(()=>{});
    input.click();
});

input.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => processDiagnosis(img);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// 7. DIAGNOSIS PROCESSING
async function processDiagnosis(imgElement) {
    // UI Transition
    document.getElementById('main-ui').classList.add('hidden');
    document.getElementById('results-card').classList.remove('hidden');

    // AI Prediction
    const prediction = await model.predict(imgElement);
    prediction.sort((a, b) => b.probability - a.probability);
    
    const bestMatch = prediction[0];
    const confidence = Math.round(bestMatch.probability * 100);
    
    // Data Lookup
    const info = activeData[bestMatch.className] || activeData["Corn_Healthy"];
    const ui = languages[currentLang].ui;

    // Display Results
    document.getElementById('disease-name').innerText = info.title;
    document.getElementById('confidence-pct').innerText = confidence + "%";
    
    // Confidence Bar Animation
    setTimeout(() => {
        document.getElementById('severity-fill').style.width = confidence + "%";
    }, 100);

    // Detail Grid Injection
    document.getElementById('treatment-info').innerHTML = `
        <div class="info-segment" style="animation-delay: 0.1s">
            <h4>${ui.labels[0]}</h4>
            <p>${info.symptoms}</p>
        </div>
        <div class="info-segment" style="animation-delay: 0.2s">
            <h4>${ui.labels[1]}</h4>
            <p style="white-space: pre-line;">${info.cure}</p>
        </div>
        <div class="info-segment" style="animation-delay: 0.3s">
            <h4>${ui.labels[2]}</h4>
            <p style="white-space: pre-line;">${info.prevent}</p>
        </div>
    `;
}

// 8. UTILS
function toggleInstructions() { 
    document.getElementById('instruction-modal').classList.toggle('hidden'); 
}

function resetApp() { 
    window.location.reload(); 
}

// Start
initAI();