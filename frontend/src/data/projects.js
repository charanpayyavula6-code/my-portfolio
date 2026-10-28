/**
 * Projects Data for Payyavula Sri Charan
 * Authenticated directly from verified Resume.
 */

export const projectCategories = [
  "All",
  "AI/ML",
  "Natural Language Processing",
  "Speech Recognition",
  "Full-Stack"
];

export const projectsData = [
  {
    id: "fake-news-detection-system",
    title: "Fake News Detection System",
    category: "Natural Language Processing",
    filterCategory: "Natural Language Processing",
    status: "Completed",
    shortDescription:
      "An AI-powered system utilizing Natural Language Processing (NLP), Sentence-BERT, and Gemini API to identify and classify potentially misleading news articles in real time.",
    problemStatement:
      "The rapid spread of online misinformation and fabricated headlines makes manual fact-checking insufficient, demanding automated semantic analysis of journalistic claims.",
    objective:
      "To build an intelligent text-classification pipeline that extracts semantic embeddings, detects deception patterns, and flags disinformation with high confidence.",
    proposedSolution:
      "Leverage Sentence-BERT for high-dimensional semantic text representation, integrated with Gemini API for deep contextual reasoning, served through a high-performance Python/Flask REST API layer backed by SQL persistence.",
    technologies: ["Python", "Flask", "REST API", "Sentence-BERT", "Gemini API", "SQL", "NLP"],
    charanContribution:
      "Engineered text preprocessing and tokenization pipelines, integrated Sentence-BERT semantic embeddings, orchestrated Gemini API analysis, and developed the Flask REST endpoints.",
    challengesAndLearnings:
      "Managing API latency during real-time inference, fine-tuning semantic similarity thresholds, handling noisy user inputs, and structuring normalized relational storage for articles.",
    features: {
      implemented: [
        "Text preprocessing and linguistic pattern extraction pipeline",
        "Sentence-BERT semantic embedding representation",
        "Gemini API contextual verification integration",
        "Flask-based RESTful API serving detection endpoints",
        "SQL relational schema for logging and analysis history"
      ],
      planned: [
        "Multilingual claim verification across regional languages",
        "Browser extension for instant on-page news verification",
        "Real-time source credibility scoring graph"
      ]
    },
    githubUrl: "https://github.com/charanpayyavula6-code",
    liveDemoUrl: null,
    icon: "ShieldAlert"
  },
  {
    id: "emotion-detection-system",
    title: "Speech Emotion Detection System",
    category: "Speech Recognition",
    filterCategory: "Speech Recognition",
    status: "Completed",
    shortDescription:
      "A Speech Emotion Recognition (SER) system that extracts acoustic features from audio feeds to identify and predict emotional states using machine learning models.",
    problemStatement:
      "Human-computer interfaces and customer intelligence platforms often lack emotional context, leading to robotic interactions during vocal communication.",
    objective:
      "To analyze speech audio signals, extract informative acoustic features (pitch, tone, MFCCs), and predict speaker emotional categories.",
    proposedSolution:
      "Python-driven acoustic preprocessing paired with supervised machine learning classifiers, wrapped in a Flask microservice connected to an interactive frontend interface.",
    technologies: ["Python", "Flask", "Machine Learning", "Audio Processing", "REST API", "HTML5", "CSS3", "JavaScript"],
    charanContribution:
      "Implemented model training and inference workflows in Python, built responsive web client for audio capture and playback, and decoupled inference into modular components.",
    challengesAndLearnings:
      "Filtering background acoustic noise, standardizing variable-length audio waveforms, balancing subtle emotional nuance (e.g. neutral vs calm), and minimizing inference delay.",
    features: {
      implemented: [
        "Audio feature extraction and acoustic representation workflows",
        "Speech emotion classification inference engine",
        "Interactive web dashboard with audio visualizer",
        "Decoupled Python server backend with REST API contracts",
        "Modular architecture separating training, inference, and UI"
      ],
      planned: [
        "Real-time streaming WebSocket microphone analysis",
        "Deep convolutional/recurrent neural network fine-tuning",
        "Multi-speaker conversational sentiment tracking"
      ]
    },
    githubUrl: "https://github.com/charanpayyavula6-code",
    liveDemoUrl: null,
    icon: "Activity"
  },
  {
    id: "student-erp-management",
    title: "Student ERP Management System",
    category: "Full-Stack",
    filterCategory: "Full-Stack",
    status: "In Progress",
    shortDescription:
      "A centralized enterprise resource planning (ERP) system to organize academic administration, student records, and departmental workflows via robust web APIs.",
    problemStatement:
      "Fragmented academic record keeping across disparate spreadsheets causes delays in attendance computation, grading reports, and student verification.",
    objective:
      "To build an integrated, role-based student management platform with responsive client views and normalized relational database persistence.",
    proposedSolution:
      "A decoupled architecture featuring a modern web interface communicating with backend services in Flask / Spring Boot, backed by normalized SQL relational databases.",
    technologies: ["Python", "Flask", "Spring Boot", "SQL", "MySQL Workbench", "REST APIs", "React"],
    charanContribution:
      "Actively developing database entity schemas, structuring student profile CRUD operations, and designing modular administrative dashboards.",
    challengesAndLearnings:
      "Designing 3NF relational schemas for complex student-course mappings, managing role-based access control, and handling transactional integrity.",
    features: {
      implemented: [
        "Student record schema formulation in MySQL Workbench",
        "REST API contract specification for academic CRUD operations",
        "Interactive profile management interface mockups"
      ],
      planned: [
        "Automated attendance and grade analytics module",
        "Export reports to PDF and spreadsheet utility",
        "Role-based authentication token workflow"
      ]
    },
    githubUrl: "https://github.com/charanpayyavula6-code",
    liveDemoUrl: null,
    icon: "GraduationCap"
  },
  {
    id: "disease-prediction-codealpha",
    title: "Clinical Disease Risk Prediction Engine",
    category: "AI/ML",
    filterCategory: "AI/ML",
    status: "Completed",
    shortDescription:
      "Developed during ML Internship at CodeAlpha: Multi-algorithm disease classification pipeline utilizing SVM, Logistic Regression, Random Forest, and XGBoost.",
    problemStatement:
      "Early clinical assessment requires consistent, high-precision evaluation of multifaceted patient biometric indicators without data leakage.",
    objective:
      "To construct a supervised learning benchmark comparing four distinct model families on disease diagnostic datasets to maximize ROC-AUC and recall.",
    proposedSolution:
      "Data preprocessing pipeline in Python comparing Support Vector Machines (SVM), Logistic Regression, Random Forest, and XGBoost with rigorous cross-validation.",
    technologies: ["Python", "Scikit-learn", "XGBoost", "SVM", "Random Forest", "Pandas", "NumPy"],
    charanContribution:
      "Conducted exploratory data analysis, handled feature scaling, engineered predictive models across 4 algorithmic families, and evaluated confusion matrices.",
    challengesAndLearnings:
      "Minimizing false negative rates in clinical context, handling high-dimensional feature collinearity, and tuning hyperparameter grids.",
    features: {
      implemented: [
        "End-to-end data preprocessing and missing value imputation",
        "Model training across SVM, Logistic Regression, Random Forest, and XGBoost",
        "Precision-recall, confusion matrix, and ROC-AUC benchmark comparison",
        "CodeAlpha Virtual Internship verified deliverables"
      ],
      planned: [
        "FastAPI microservice deployment with OpenAPI documentation",
        "SHAP model explainability visualizer for clinical transparency"
      ]
    },
    githubUrl: "https://github.com/charanpayyavula6-code",
    liveDemoUrl: null,
    icon: "Cpu"
  }
];
