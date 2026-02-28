

🌿 AgriGuard: Offline AI Crop Diagnostic Tool
"Bringing expert agricultural advice to the edge—no internet required."

📌 Project in One Sentence
An offline-first Progressive Web App (PWA) that uses on-device Machine Learning to identify crop diseases from leaf photos and provide instant treatment plans.

🚩 The Problem
Farmers in rural areas face 40% crop loss due to diseases. Existing AI solutions fail because:

No Signal: Most AI requires high-speed internet (Cloud AI).

High Costs: Sending images to servers costs data money.

Delayed Action: Waiting for an expert can take days, while a fungus spreads in hours.

💡 Our Solution
AgriGuard is a "Lab in your Pocket." It downloads a "Brain" (AI Model) to the phone once, and then works 100% Offline.

🚀 Key Features
Zero-Data Diagnosis: Works in Airplane Mode.

Instant Results: Diagnosis in less than 1 second.

Actionable Advice: Provides organic and chemical cures locally.

Installable: Save it to your home screen like a real app (PWA).

⚙️ How It Works (The "Tech")
The Brain (TensorFlow.js): We use a shrunk-down version of MobileNetV2. The model "lives" in the browser's memory.

The Cache (Service Workers): A background script saves the app files so they open without Wi-Fi.

The Library (Local JSON): A built-in database of diseases (Corn Rust, Tomato Blight, etc.) and their specific cures.

The Logic:

Input: User takes a photo.

Process: AI analyzes pixels on the phone's CPU.

Output: Matches the pattern to a disease + shows the cure.

🛠️ Technology Stack
Language: HTML5, CSS3 (Tailwind), JavaScript.

AI Engine: TensorFlow.js.

Deployment: GitHub Pages (Serverless).

Strategy: Edge Computing (On-device inference).

🗺️ Roadmap (Future Scope)
Short Term: Add voice-to-text for farmers who cannot type.

Medium Term: Support for local languages (Hindi, Swahili, Spanish).

Long Term: Connect to low-cost soil sensors via Bluetooth.

👥 The Team
Team LFL 
Team members :-
1) Vedant Singh Kirar
2) Vineet Bhati
3) Apoorv Mishra

📥 How to Test
Open the [Live Demo Link].

Wait 10 seconds for the "AI Brain" to download.

Turn off your Wi-Fi/Data.

Take a photo of a leaf and see the magic!