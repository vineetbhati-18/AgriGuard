🌿00 AgriGuard: Offline-First Crop Disease Diagnostic Tool
One-line project description
A lightweight Progressive Web App (PWA) using on-device Computer Vision to identify crop diseases and provide treatment protocols without requiring an internet connection.

1. Problem Statement
Problem Title: AgriGuard: Breaking the Connectivity Barrier in Agriculture.

Problem Description: Small-scale farmers in rural areas lose up to 40% of their yield to treatable diseases due to a lack of expert access and unreliable internet.

Target Users: Rural farmers, agricultural extension workers, and NGOs.

Existing Gaps: Most AI tools require cloud processing (high data costs/low signal) and lack immediate, actionable offline advice.

2. Problem Understanding & Approach
Root Cause Analysis: The "Digital Divide"—high-performance AI usually lives on servers, but the problem (crop disease) lives in disconnected fields.

Solution Strategy: We utilize Edge AI (TensorFlow.js) to bring the diagnostic model directly to the user's browser storage.

3. Proposed Solution
Solution Overview: A zero-install web application that functions as a portable diagnostic lab.

Core Idea: Using the phone's hardware (Camera + GPU) to run inference locally.

Key Features:

Instant Offline Classification: Identifies diseases in <500ms.

PWA Integration: Can be "Installed" to the home screen for offline launch.

Severity Estimation: Uses model confidence scores to indicate infection levels.

Actionable Knowledge Base: Locally stored treatment database.

4. System Architecture
High-Level Flow: User → Smartphone Camera → Browser (TF.js) → Local Knowledge Base (JSON) → Treatment Result

Architecture Description: A decentralized, client-side architecture. We eliminate the backend entirely to ensure 100% uptime in "No-Signal" zones.

5. Database Design
Structure: Flat-file JSON (optimized for rapid offline lookup).

Fields: Crop_Type, Common_Disease_Name, Visual_Symptoms, Cure_Protocol.

6. Dataset & Model
Dataset: Based on the PlantVillage Dataset (54,000+ images of healthy/diseased leaves).

Model Selected: MobileNetV2.

Reasoning: Optimized for mobile browser performance, balancing high accuracy with low memory footprint.

7. Technology Stack
Frontend: HTML5, Tailwind CSS.

ML Engine: TensorFlow.js (MobileNet).

Offline Support: Service Workers & Web App Manifest.

Deployment: GitHub Pages / Vercel.

8. End-to-End Workflow
Capture: User takes a photo of a distressed leaf.

Process: The browser-based AI analyzes pixel patterns locally.

Diagnose: The app identifies the crop and matching disease.

Act: A treatment plan is retrieved from the local database and displayed instantly.

9. Future Scope
Short-Term: Multilingual support for non-English speaking regions.

Long-Term: Integrating satellite weather data (when online) to predict fungal outbreaks before they appear.