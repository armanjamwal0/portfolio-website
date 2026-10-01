export const profile = {
  name: 'Arman Jamwal',
  role: 'AI / ML Engineer',
  location: 'Shimla, India',
  email: 'armanjamwal129@gmail.com',
  phone: '+91 62305 61461',
  github: 'https://github.com/armanjamwal0',
  linkedin: 'https://linkedin.com/in/armanjamwal',
  summary:
    'Aspiring AI/ML engineer with hands-on experience building predictive machine learning models across classification, recommendation, and fraud detection — including one deployed as a live web application. Comfortable across the full ML lifecycle: data preprocessing, feature engineering, model training, evaluation, and deployment.',
}

export const marqueeItems = [
  'Python',
  'TensorFlow',
  'Scikit-Learn',
  'Pandas',
  'NumPy',
  'NLP',
  'XGBoost',
  'CatBoost',
  'React.js',
  'FastAPI',
  'Flask',
  'PostgreSQL',
  'Docker',
  'Streamlit',
  'SQL',
  'C++',
]

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'SQL', 'C++'] },
  {
    label: 'Frameworks & Libraries',
    items: ['TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'React.js', 'Flask', 'FastAPI'],
  },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL'] },
  { label: 'Tools & Platforms', items: ['Git', 'GitHub', 'Docker', 'Linux', 'Streamlit'] },
  {
    label: 'ML / DL',
    items: [
      'Neural Networks',
      'NLP',
      'Feature Engineering',
      'Model Evaluation',
      'Hyperparameter Tuning',
      'Cross-Validation',
      'Supervised / Unsupervised Learning',
    ],
  },
]

export const projects = [
  {
    id: '01',
    title: 'Email Spam Prediction',
    tagline: 'Text classification that hates false positives',
    stack: ['Python', 'NLTK', 'Scikit-Learn', 'CatBoost', 'TF-IDF'],
    date: 'Jul 2026',
    metrics: [
      { value: '98%', label: 'accuracy' },
      { value: '0.99', label: 'precision' },
      { value: '0.99', label: 'ROC-AUC' },
    ],
    points: [
      'Text classification pipeline on an imbalanced dataset of 5,728 emails (75% ham / 25% spam), tuned to flag spam while minimizing false positives.',
      'Engineered character, word and sentence-count features; used correlation analysis to drop multicollinear features (~98% correlated).',
      'Compared Stemming vs. Lemmatization and Bag-of-Words vs. TF-IDF — Lemmatization + TF-IDF won on precision.',
      'Benchmarked SVC, Multinomial Naive Bayes and CatBoost, prioritizing precision and ROC-AUC over raw accuracy.',
    ],
    link: { label: 'GitHub', href: 'https://github.com/armanjamwal0?tab=repositories' },
  },
  {
    id: '02',
    title: 'Product Recommendation System',
    tagline: 'Content-based engine, live on the web',
    stack: ['Python', 'NLP', 'Cosine Similarity', 'Streamlit'],
    date: 'Jul 2026',
    metrics: [
      { value: 'Live', label: 'web app' },
      { value: 'NLP', label: 'vectorization' },
      { value: 'cos', label: 'similarity' },
    ],
    points: [
      'Content-based recommendation engine applying NLP preprocessing and end-to-end data processing — cleaning, text normalization, vectorization.',
      'Ranks similar items with cosine similarity over vectorized product text.',
      'Deployed as an interactive Streamlit web app: users search and get live product recommendations.',
    ],
    link: { label: 'GitHub', href: 'https://github.com/armanjamwal0?tab=repositories' },
    badge: 'Deployed on Streamlit',
  },
  {
    id: '03',
    title: 'Fraud Detection Model',
    tagline: 'Catching fraud in 10M+ transactions',
    stack: ['Python', 'Scikit-Learn', 'XGBoost', 'Imbalanced-Learn'],
    date: 'Jul 2026',
    metrics: [
      { value: '10M+', label: 'rows' },
      { value: '0.69', label: 'recall ↑ from 0.11' },
      { value: '0.81', label: 'F1 ↑ from 0.35' },
    ],
    points: [
      'Fraud pipeline on a large-scale transactional dataset (10M+ rows, 23 features), downsampled to 200K rows via stratified sampling, preserving the 96% / 4% class ratio.',
      'Tackled severe class imbalance with cost-sensitive class weighting after evaluating SMOTE and Balanced Random Forest.',
      'Full preprocessing pipeline: missing-value imputation, feature scaling, categorical encoding; trained and compared Random Forest and XGBoost.',
      'Prioritized recall over accuracy — missing fraud costs more than false alarms — lifting fraud recall from 0.11 to 0.69.',
    ],
    link: { label: 'GitHub', href: 'https://github.com/armanjamwal0?tab=repositories' },
  },
]

export const education = {
  school: 'Himachal Pradesh University',
  place: 'Shimla, India',
  degree: 'Bachelor of Computer Applications',
  cgpa: '6.72',
  period: 'Aug 2023 — May 2026 (expected)',
}
