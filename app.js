// 1. YOUR SPECIALIZED CORN MODEL LINK
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/I2ZkBgnQ9/";

let model, maxPredictions;

// 2. THE CORN EXPERT DATABASE
// MUST MATCH YOUR TEACHABLE MACHINE NAMES EXACTLY
const diseaseDatabase = {
    "Corn_Cercospora_Leaf_Spot Gray_leaf_Spot": {
        title: "Gray Leaf Spot (Cercospora)",
        symptoms: "Long, rectangular, tan to gray lesions running parallel to leaf veins.",
        cure: "Apply fungicides containing Pyraclostrobin or Azoxystrobin (e.g., Headline or Quadris).",
        prevent: "Practice crop rotation and manage surface residue through tillage."
    },
    "Corn_Common_Rust": {
        title: "Common Rust (Puccinia sorghi)",
        symptoms: "Small, cinnamon-brown, powdery pustules on both upper and lower leaf surfaces.",
        cure: "Foliar fungicides like Mancozeb or Propiconazole are effective if applied early.",
        prevent: "Plant resistant hybrids; avoid high-density planting to improve airflow."
    },
    "Corn_Northern_Leaf_Blight": {
        title: "Northern Corn Leaf Blight",
        symptoms: "Large, cigar-shaped tan lesions (1-6 inches long) with rounded ends.",
        cure: "Apply Triazole or Strobilurin fungicides at the 'tassel' stage.",
        prevent: "Use resistant varieties and eliminate infected crop debris from the previous year."
    },
    "Corn_Healthy": {
        title: "Healthy Corn Specimen",
        symptoms: "Leaves are deep green with no visible lesions, spots, or pustules.",
        cure: "No treatment needed. Maintain current nitrogen and irrigation levels.",
        prevent: "Continue bi-weekly scouting for early signs of pest or fungal pressure."
    }
};

// 3. INITIALIZE THE AI "BRAIN"
async function initAI() {
    const status = document.getElementById('status-badge');
    try {
        const base = MODEL_URL.endsWith('/') ? MODEL_URL : MODEL_URL + '/';
        
        // Load the model and metadata from your link
        model = await tmImage.load(base + "model.json", base + "metadata.json");
        maxPredictions = model.getTotalClasses();
        
        console.log("✅ Corn-AI Online. Classes detected: " + maxPredictions);
        status.innerText = "CORN-AI READY";
        status.style.backgroundColor = "#2e7d32";
    } catch (e) {
        console.error("AI Load Failed:", e);
        status.innerText = "OFFLINE ERROR";
        status.style.backgroundColor = "#d32f2f";
    }
}

// 4. PHOTO CAPTURE HANDLER
const input = document.getElementById('camera-input');
const captureBtn = document.getElementById('capture-btn');

captureBtn.addEventListener('click', () => input.click());

input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => processCornImage(img);
        };
        reader.readAsDataURL(file);
    }
});

// 5. DIAGNOSIS LOGIC
async function processCornImage(imgElement) {
    // Show results section
    document.getElementById('main-ui').classList.add('hidden');
    document.getElementById('results-card').classList.remove('hidden');
    
    // AI PREDICTION
    const prediction = await model.predict(imgElement);
    
    // Sort to find the most likely match
    prediction.sort((a, b) => b.probability - a.probability);
    
    const bestMatch = prediction[0];
    const className = bestMatch.className;
    const confidence = Math.round(bestMatch.probability * 100);

    // Get info from our database
    const info = diseaseDatabase[className] || {
        title: "Unknown Anomaly",
        symptoms: "The AI detected an unusual pattern not in the core corn database.",
        cure: "Consult a local agricultural extension officer.",
        prevent: "Isolate the affected plant and monitor the rest of the field."
    };

    // Update the UI
    document.getElementById('disease-name').innerText = info.title;
    document.getElementById('confidence-pct').innerText = confidence + "%";
    document.getElementById('severity-fill').style.width = confidence + "%";
    
    // Create the detailed report
    document.getElementById('treatment-info').innerHTML = `
        <div style="margin-bottom: 15px;">
            <h4 style="color: #2e7d32; margin-bottom: 5px;">🚨 SYMPTOMS</h4>
            <p style="font-size: 0.95rem; line-height: 1.4;">${info.symptoms}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4 style="color: #2e7d32; margin-bottom: 5px;">💊 RECOMMENDED CURE</h4>
            <p style="font-size: 0.95rem; line-height: 1.4;">${info.cure}</p>
        </div>
        <div>
            <h4 style="color: #2e7d32; margin-bottom: 5px;">🛡️ PREVENTION</h4>
            <p style="font-size: 0.95rem; line-height: 1.4;">${info.prevent}</p>
        </div>
    `;
}

// Start the process
initAI();