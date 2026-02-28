let model;

const knowledgeBase = {
    "corn": "Common Rust detected. Use fungicides containing mancozeb. Space plants 30cm apart.",
    "tomato": "Early Blight found. Remove infected lower leaves. Avoid overhead watering.",
    "potato": "Late Blight alert! This spreads fast. Apply copper-based spray immediately.",
    "leaf": "General plant leaf identified. Ensure balanced N-P-K fertilizer application.",
    "healthy": "The crop appears healthy. Continue regular soil moisture monitoring."
};

async function loadAI() {
    const status = document.getElementById('status-badge');
    try {
        model = await mobilenet.load();
        status.innerText = "OFFLINE READY";
        status.style.background = "#2e7d32";
    } catch (e) {
        status.innerText = "CONNECTION ERROR";
    }
}

const btn = document.getElementById('capture-btn');
const input = document.getElementById('camera-input');

btn.addEventListener('click', () => input.click());

input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = document.getElementById('preview-img');
        img.src = event.target.result;
        img.classList.remove('hidden');
        document.getElementById('upload-placeholder').classList.add('hidden');
        
        analyzeLeaf(img);
    };
    reader.readAsDataURL(file);
});

async function analyzeLeaf(imgElement) {
    document.getElementById('results-card').classList.remove('hidden');
    document.getElementById('disease-name').innerText = "Analyzing Pixels...";
    
    const predictions = await model.classify(imgElement);
    const topResult = predictions[0];
    const name = topResult.className.toLowerCase();
    const probability = Math.round(topResult.probability * 100);

    document.getElementById('disease-name').innerText = topResult.className.split(',')[0];
    document.getElementById('severity-fill').style.width = probability + "%";

    let treatment = "Unknown species. Please consult an agricultural officer locally.";
    for (let key in knowledgeBase) {
        if (name.includes(key)) {
            treatment = knowledgeBase[key];
            break;
        }
    }
    document.getElementById('treatment-info').innerText = treatment;
}

loadAI();