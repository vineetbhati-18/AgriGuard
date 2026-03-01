const MODEL_URL = "https://teachablemachine.withgoogle.com/models/I2ZkBgnQ9/";
let model, maxPredictions;

const languages = {
    "EN": {
        "ui": {
            "title": "🌿 AGRIGUARD", "awaiting": "AWAITING INPUT", "btn_scan": "INITIATE BIOSCAN",
            "edge": "Edge-Inference Active", "reset": "← RESET", "complete": "ANALYSIS COMPLETE",
            "confidence": "CONFIDENCE", "manual_title": "SYSTEM GUIDE",
            "steps": ["Choose Language", "Upload Corn Leaf", "Analyze Patterns", "Get Treatment"],
            "labels": ["🚨 SYMPTOMS", "💊 CURE", "🛡️ PREVENTION"]
        },
        "data": {
    "Corn_Cercospora_Leaf_Spot Gray_leaf_Spot": { 
        title: "Gray Leaf Spot (Cercospora)", 
        symptoms: "Distinctive rectangular, tan lesions (0.5 to 2 inches) running parallel to leaf veins. As it progresses, lesions merge, causing entire leaves to blight and die.", 
        cure: "1. Apply Pyraclostrobin (Headline) or Azoxystrobin (Quadris) at 0.5 - 1.0 liters per hectare.\n2. Ensure coverage during the silking stage (R1).\n3. If infection is over 5%, a second spray after 14 days is required.", 
        prevent: "1. Rotate crops with Soybeans or Wheat for at least 2 years.\n2. Use deep-plowing to bury infected debris 6 inches underground.\n3. Plant hybrids with high 'GLS resistance' ratings." 
    },
    "Corn_Common_Rust": { 
        title: "Common Rust (Puccinia sorghi)", 
        symptoms: "Cinnamon-brown, elongated pustules (blisters) appearing on both upper and lower leaf surfaces. These pustules rupture to release powdery spores that spread via wind.", 
        cure: "1. Spray Tebuconazole (Folicur) at 500ml/ha or Mancozeb at 2.5kg/ha.\n2. Fungicides are most effective if applied when pustules first appear on the lower leaves.\n3. Avoid nitrogen over-fertilization during outbreaks.", 
        prevent: "1. Plant 'Rp-resistant' hybrids.\n2. Plant early in the season to avoid the peak spore-travel period.\n3. Maintain optimal plant spacing to reduce leaf wetness duration." 
    },
    "Corn_Northern_Leaf_Blight": { 
        title: "Northern Corn Leaf Blight (Exserohilum)", 
        symptoms: "Large, cigar-shaped, grayish-green or tan lesions (1 to 6 inches long). Unlike Gray Leaf Spot, these lesions have rounded ends and look like water-soaked streaks.", 
        cure: "1. Apply Strobilurin + Triazole premix fungicides (like Trivapro) at 1 liter/ha.\n2. Focus spraying on the 'Ear Leaf' and the leaves above it to protect yield.\n3. Use 200 liters of water per hectare for complete coverage.", 
        prevent: "1. Eliminate 'Volunteer Corn' from the previous season.\n2. Choose hybrids with the 'Ht gene' for specific resistance.\n3. Manage irrigation to avoid evening leaf wetness." 
    },
    "Corn_Healthy": { 
        title: "Healthy Specimen (Maize)", 
        symptoms: "Optimal chlorophyll levels detected. Leaf texture is firm, edges are smooth, and veins are clear of any necrotic spotting or fungal growth.", 
        cure: "No chemical intervention required. Continue standard N-P-K (Nitrogen, Phosphorus, Potassium) fertilization schedule according to soil health card.", 
        prevent: "1. Scout the field every 4 days during high humidity.\n2. Ensure proper drainage to prevent root-zone stress.\n3. Keep the field perimeter clear of weeds that host pests." 
    }
}
    },
    "HI": {
        "ui": {
            "title": "🌿 एग्री-गार्ड", "awaiting": "फोटो चुनें", "btn_scan": "बायोस्कैन शुरू करें",
            "edge": "एज-इन्फरेंस सक्रिय", "reset": "← रीसेट", "complete": "जांच पूरी हुई",
            "confidence": "भरोसा", "manual_title": "उपयोग निर्देश",
            "steps": ["भाषा चुनें", "मक्के का पत्ता अपलोड करें", "जांच का इंतज़ार करें", "इलाज देखें"],
            "labels": ["🚨 लक्षण", "💊 इलाज", "🛡️ रोकथाम"]
        },
       "data": {
    "Corn_Cercospora_Leaf_Spot Gray_leaf_Spot": { 
        title: "ग्रे लीफ स्पॉट (Cercospora)", 
        symptoms: "पत्तियों की नसों के समानांतर लंबे, आयताकार, भूरे रंग के धब्बे। धीरे-धीरे ये धब्बे पूरी पत्ती को सुखा देते हैं।", 
        cure: "1. हेडलाइन (Headline) या क्वाड्रिस (Quadris) कवकनाशी का 0.5 - 1.0 लीटर प्रति हेक्टेयर उपयोग करें।\n2. जब मक्के में रेशम (Silking) आने लगे, तब छिड़काव करना सबसे अच्छा है।", 
        prevent: "1. मक्के के बाद सोयाबीन या गेहूं की फसल लगाएं।\n2. पुरानी फसल के अवशेषों को गहरी जुताई करके मिट्टी में दबा दें।" 
    },
    "Corn_Common_Rust": { 
        title: "कॉमन रस्ट (मक्का जंग)", 
        symptoms: "पत्तियों के दोनों तरफ दालचीनी जैसे भूरे रंग के उभरे हुए दाने। हवा चलने पर ये पाउडर की तरह उड़ते हैं।", 
        cure: "1. मैनकोज़ेब (Mancozeb) 2.5 किलो/हेक्टेयर या टेबुकोनाज़ोल 500ml/हेक्टेयर का छिड़काव करें।\n2. जब निचली पत्तियों पर पहली बार दाने दिखें, तभी स्प्रे करें।", 
        prevent: "1. प्रतिरोधी बीज (Resistant Hybrids) का चुनाव करें।\n2. फसल जल्दी बोएं ताकि बीमारी के मौसम से बचा जा सके।" 
    },
    "Corn_Northern_Leaf_Blight": { 
        title: "नार्दन लीफ ब्लाइट", 
        symptoms: "पत्तियों पर बड़े, सिगार के आकार के भूरे या धूसर रंग के धब्बे (1 से 6 इंच लंबे)।", 
        cure: "1. ट्रिवाप्रो (Trivapro) जैसे मिश्रित कवकनाशी का 1 लीटर/हेक्टेयर की दर से उपयोग करें।\n2. 'ईयर लीफ' (भुट्टे वाली पत्ती) पर छिड़काव सुनिश्चित करें।", 
        prevent: "1. पिछली फसल के मलबे को खेत से पूरी तरह हटा दें।\n2. 'Ht जीन' वाली प्रतिरोधी किस्मों का उपयोग करें।" 
    },
    "Corn_Healthy": { 
        title: "स्वस्थ मक्का", 
        symptoms: "पत्तियाँ पूरी तरह स्वस्थ, गहरे हरे रंग की और धब्बा मुक्त हैं। फोटोसिंथेसिस प्रक्रिया सामान्य है।", 
        cure: "किसी दवा की जरूरत नहीं है। मिट्टी की जांच के अनुसार खाद (NPK) देते रहें।", 
        prevent: "1. नमी वाले मौसम में हर 4 दिन में खेत की जांच करें।\n2. जल निकासी (Drainage) का अच्छा इंतजाम रखें।" 
    }
}
    }
};

let currentLang = "EN";
let activeData = languages[currentLang].data;

function changeLanguage(langCode) {
    currentLang = langCode;
    activeData = languages[langCode].data;
    const ui = languages[langCode].ui;
    document.getElementById('app-title').innerText = ui.title;
    document.getElementById('txt-awaiting').innerText = ui.awaiting;
    document.getElementById('capture-btn').innerText = ui.btn_scan;
    document.getElementById('txt-edge').innerText = ui.edge;
    document.getElementById('btn-reset').innerText = ui.reset;
    document.getElementById('txt-complete').innerText = ui.complete;
    document.getElementById('txt-confidence').innerText = ui.confidence;
    document.getElementById('modal-title').innerText = ui.manual_title;
    const steps = document.querySelectorAll('.guide-step p');
    ui.steps.forEach((text, i) => steps[i].innerText = text);
    document.getElementById('btn-en').classList.toggle('active-lang', langCode === 'EN');
    document.getElementById('btn-hi').classList.toggle('active-lang', langCode === 'HI');
}

async function initAI() {
    try {
        const base = MODEL_URL.endsWith('/') ? MODEL_URL : MODEL_URL + '/';
        model = await tmImage.load(base + "model.json", base + "metadata.json");
        document.getElementById('status-badge').innerText = "SYSTEM ONLINE";
        document.getElementById('status-badge').style.color = "#00ff88";
    } catch (e) { document.getElementById('status-badge').innerText = "FAILURE"; }
}

const input = document.getElementById('camera-input');
document.getElementById('capture-btn').addEventListener('click', () => input.click());
input.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => processDiagnosis(img);
    };
    reader.readAsDataURL(e.target.files[0]);
});

async function processDiagnosis(imgElement) {
    document.getElementById('main-ui').classList.add('hidden');
    document.getElementById('results-card').classList.remove('hidden');
    const prediction = await model.predict(imgElement);
    prediction.sort((a, b) => b.probability - a.probability);
    const best = prediction[0];
    const info = activeData[best.className] || activeData["Corn_Healthy"];
    const confidence = Math.round(best.probability * 100);
    const ui = languages[currentLang].ui;
    document.getElementById('disease-name').innerText = info.title;
    document.getElementById('confidence-pct').innerText = confidence + "%";
    setTimeout(() => document.getElementById('severity-fill').style.width = confidence + "%", 100);
    document.getElementById('treatment-info').innerHTML = `
        <div class="info-segment" style="animation-delay:0.1s"><h4>${ui.labels[0]}</h4><p>${info.symptoms}</p></div>
        <div class="info-segment" style="animation-delay:0.2s"><h4>${ui.labels[1]}</h4><p>${info.cure}</p></div>
        <div class="info-segment" style="animation-delay:0.3s"><h4>${ui.labels[2]}</h4><p>${info.prevent}</p></div>`;
}

function toggleInstructions() { document.getElementById('instruction-modal').classList.toggle('hidden'); }
function resetApp() { window.location.reload(); }
initAI();