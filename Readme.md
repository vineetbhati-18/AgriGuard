 Live Demo Link: https://agriguard-newton.netlify.app/

Demo Video Link: https://drive.google.com/drive/folders/12wYxtWk8xEKAbqffhtAgfeXTjifuvcSt?usp=drive_link

Presentation Link: https://drive.google.com/drive/folders/1FMCyGAgUMBZTmYtDPyXOJGOexURPc-Qe?usp=sharing PROJECT REPORT: AGRIGUARD AI

Project Title: AgriGuard AI
One-line Description: An AI-driven biological scanner for real-time crop disease detection and professional treatment planning.

PROBLEM STATEMENT

Problem Title: Crop Yield Attrition due to Delayed Fungal Diagnosis

Problem Description:
Farmers struggle to identify crop diseases early. By the time symptoms are visible, the infection has often spread, leading to yield loss and ineffective chemical use.

Target Users:

Small-scale and commercial farmers.

Agricultural extension officers.

Home gardeners and agronomists.

Existing Gaps:

Accessibility: Professional agronomists are expensive and rare in rural areas.

Connectivity: Most AI solutions require high-speed internet.

Language: Tools are rarely available in local languages like Hindi.

PROBLEM UNDERSTANDING & APPROACH

Root Cause Analysis:
Agricultural losses are driven by the "Time-to-Diagnosis" gap. Manual inspection is slow and subjective.

Solution Strategy:
We use Edge AI (TensorFlow.js) to run deep learning models directly in the user's browser, ensuring instant results even without internet.

PROPOSED SOLUTION

Solution Overview:
AgriGuard AI is a Progressive Web App (PWA) that transforms a smartphone camera into a diagnostic tool.

Core Idea:
Using a Convolutional Neural Network (CNN) to analyze leaf patterns and provide localized, professional prescriptions.

Key Features:

Instant Bio-Scan: Real-time analysis of leaf health.

Bilingual Support: Full English and Hindi localization.

Offline-First: Works without active internet via Service Workers.

Detailed Prescriptions: Specific dosage and prevention advice.

SYSTEM ARCHITECTURE

High-Level Flow:
User -> Frontend (HTML/CSS) -> Browser Memory (TF.js) -> Model (CNN) -> Local Data -> Response

Architecture Description:
A Client-Side Heavy Architecture. The model is cached in the browser; all processing happens on-device for maximum privacy and speed.

DATABASE DESIGN

ER Diagram Description:
The system uses a structured JSON manifest containing:

UI Mapping: Key-value pairs for localization.

Disease Metadata: Symptoms, Cures, and Prevention linked to model labels.

DATASET SELECTED

Dataset Name: Corn/Maize PlantVillage Dataset
Source: Kaggle / PlantVillage Open Research
Data Type: RGB Images of Corn Leaves (256x256)
Selection Reason: High variance in lighting/background for field robustness.
Preprocessing: Resizing to 224x224, Normalization, and Data Augmentation.

MODEL SELECTED

Model Name: Custom CNN (MobileNetV2 Backbone)
Selection Reasoning: MobileNet is optimized for mobile browsers (low latency).
Alternatives Considered: ResNet50 (Too heavy), Random Forest (No spatial recognition).
Evaluation Metrics: 94% Accuracy on test data; <200ms inference time.

TECHNOLOGY STACK

Frontend: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)

ML/AI: TensorFlow.js, Teachable Machine

PWA: Service Workers, Web Manifest API

Deployment: Netlify

API DOCUMENTATION & TESTING

Note: This project uses an "Embedded Model" architecture. No external API calls are made to ensure offline functionality.

MODULE-WISE DEVELOPMENT

Checkpoint 1: Research & Planning (Disease selection & Wireframes)

Checkpoint 2: Model Training (Training .json and .bin files)

Checkpoint 3: Frontend Development (Cyber-Agri UI & Staggered Animations)

Checkpoint 4: Integration (TF.js & Image processing pipeline)

Checkpoint 5: Localization (Hindi-English toggle & Treatment database)

Checkpoint 6: Deployment (Netlify & PWA configuration)

END-TO-END WORKFLOW

User opens app and selects language.

User clicks "Initiate Bioscan" and captures/uploads leaf photo.

Local model processes image in under 1 second.

App displays disease name, confidence, and treatment plan.

DEMO & VIDEO

Live Demo Link: https://agriguard-newton.netlify.app/

Demo Video Link: https://drive.google.com/drive/folders/12wYxtWk8xEKAbqffhtAgfeXTjifuvcSt?usp=drive_link

Presentation Link: [INSERT LINK HERE]

GitHub Repository: [INSERT REPO LINK HERE]

HACKATHON DELIVERABLES SUMMARY

Functional PWA (Mobile Installable)

Trained CNN Model for Corn

Bilingual (English/Hindi) Logic

Detailed Agronomic Prescriptions

TEAM :-

Member1 Name: Vedant Singh Kirar
Member2 NAme: Vineet Bhati
Member3 Name: Apoorv Mishra

FUTURE SCOPE & SCALABILITY

Short-Term:

Add more Corn diseases (Smut, Downy Mildew).

Add audio-guidance for illiterate users.

Long-Term:

Multi-Crop Expansion: The current prototype focuses on Corn (4 classes), but the architecture can scale to Wheat, Rice, or Tomato by updating model weights.

Supply Chain: Link cures to local pesticide marketplaces.

KNOWN LIMITATIONS

Accuracy depends on lighting conditions.

Limited to Corn species in the current version.

IMPACT

AgriGuard AI empowers millions of farmers with agronomist knowledge, reducing crop waste and promoting sustainable chemical use.
