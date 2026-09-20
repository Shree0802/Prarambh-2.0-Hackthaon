# EDUTECH | AI-Powered Evidence-Based Competency & Industry Readiness Ecosystem

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-EDUTECH_Vercel_App-0c8de9?style=for-the-badge&logo=vercel)](https://edutech-axvercel.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Prarambh--2.0--Hackathon-181717?style=for-the-badge&logo=github)](https://github.com/Shree0802/Prarambh-2.0-Hackthaon)

🌐 **Live Deployed Prototype**: https://edutech-axvercel.vercel.app/

> **From Self-Declared Skills to Verified Competency.**
> *Learn. Practice. Demonstrate. Verify. Analyze. Improve. Connect.*

---

## 1. Product Vision & Ecosystem Architecture
EDUTECH is an **AI-powered evidence-based skill intelligence and industry readiness platform**. Instead of relying solely on self-declared resumes or CGPAs, EDUTECH verifies practical competency, identifies industry skill gaps against target roles, generates personalized multi-phase learning paths, and provides evidence-backed candidate evaluation for employers and institutional analytics for colleges.

```text
LEARN → PRACTICE → DEMONSTRATE → VERIFY → MEASURE → ANALYZE → IDENTIFY GAPS → PERSONALIZE LEARNING → RE-ASSESS → BUILD VERIFIED PORTFOLIO → CONNECT WITH INDUSTRY
```

---

## 2. Comprehensive Feature Breakdown

### A. Academic Profile & Learning Record (`AcademicProfilePage.jsx`)
* **CGPA vs Practical Competency Separation**: Academic CGPA (8.6/10.0) is tracked separately from demonstrated practical competency (78%) so coursework grades do not artificially skew industry readiness.
* **Subject-to-Skill Mapping**: Connects academic subjects to industry skills (e.g. `DBMS` → `SQL`, `Database Design`, `PostgreSQL`; `Machine Learning` → `Python`, `Statistics`, `ML Algorithms`).

### B. Personalized Skill Graph & Evidence Strength (`SkillGraphPage.jsx`)
* **Dynamic Connected Graph**: Connected nodes linking `Student → Skills → Evidence → Projects → Assessments → Target Roles`.
* **Evidence Strength Indicators**: Displays `HIGH`, `MEDIUM`, or `LOW` evidence strength badges accompanied by hover explanations detailing why.

### C. Standardized Competency Level System (0 to 5) (`CompetencyLevelBadge.jsx`)
* **Level 0 (0-20%)**: No Evidence
* **Level 1 (21-40%)**: Beginner
* **Level 2 (41-60%)**: Developing
* **Level 3 (61-75%)**: Intermediate
* **Level 4 (76-90%)**: Advanced
* **Level 5 (91-100%)**: Industry Ready

### D. Skill Evidence 5-Source Weighting (`competencyEngine.js`)
* **5-Source Formula**: Technical Assessment (30%), Practical Coding Runner (25%), Verified GitHub Projects (25%), Portfolio Evidence (10%), and Certification Verification (10%).

### E. Re-Assessment Loop & Competency Growth (`StudentDashboard.jsx`)
* **Closed Feedback Loop**: `Initial Assessment (51%) → Gap Identified → Learning Module Completed → Re-assessment → Score Improved (68%) → Gap Reduced`.
* **Growth History Chart**: Recharts line visualization illustrating month-over-month competency growth (Sept 51% → Oct 64% → Nov 73%).

### F. Learning Management Hub & 30-Day AI Roadmap (`LearningHubPage.jsx`)
* **Time Commitment Selector**: Toggle daily learning commitment (`1 Hour / Day` vs `2 Hours / Day`).
* **30-Day Intensive ML Roadmap**: Paced 4-week daily task sequence with status toggles (`Start Learning`, `Mark Complete`).

### G. AI Mock Interview Module (`MockInterviewPage.jsx`)
* **Real-time AI Interview**: Interactive question generator and response evaluator across Technical, HR, and Mixed interview formats.
* **Structured Evaluation**: Feedback breakdown assessing Technical Relevance, Completeness, and Structure with concrete improvement suggestions.

### H. Career Role Explorer & Multi-Role Comparison (`CareerRoleExplorerPage.jsx`)
* **11+ Role Library**: Machine Learning Engineer, AI & LLM Engineer, Data Analyst, Data Scientist, Full Stack Developer, Cloud & MLOps Engineer, Frontend Developer, Backend Developer, DevOps Engineer, Cybersecurity Analyst, Software Engineer.
* **Multi-Role Matrix Comparison**: Simultaneously compares student profile against multiple roles with interactive `View Gap` drawers.

### I. Public Verified Digital Portfolio & QR Code (`PublicPortfolioPage.jsx`)
* **Public/Private Toggle**: Student-controlled portfolio privacy settings.
* **Shareable URL**: `/portfolio/:userId` showing student bio, verified skills, code repos, and trust badges.
* **Portfolio QR Code**: SVG QR code generator for instant mobile scanning by recruiters.

### J. Anti-Fraud & Evidence Integrity Layer (`AdminVerificationCenter.jsx`)
* **System Audit Log**: Real-time logging of all verification, submission, and role changes.
* **Neutral Integrity Flags**: Assigns `Clean`, `Requires Review`, `Potential Inconsistency`, or `Insufficient Evidence` to trigger faculty/admin reviews.

### K. Readiness Command Center & Next Best Action (`StudentDashboard.jsx`)
* **AI Next Best Action**: Highlights the single highest leverage action to close current role gaps.
* **Placement Readiness Report**: Printable/downloadable official skill intelligence dossier.

---

## 3. Technology Stack

* **Frontend**: React.js, Vite, Tailwind CSS, Lucide React icons, Recharts, Framer Motion, Monaco Editor.
* **Backend**: Node.js, Express.js REST API.
* **Database**: MongoDB & Mongoose schemas with an automatic in-memory fallback store for offline/demo environments.
* **AI Engine**: Google Gemini API (`@google/generative-ai`) with deterministic fallback engines.
* **Auth**: JWT, bcryptjs, Role-Based Access Control (`student`, `faculty`, `employer`, `admin`).

---

## 4. Requirements Traceability Matrix

| Problem Statement Requirement | EDUTECH Ecosystem Feature | Implementation Component | Verification Proof |
| :--- | :--- | :--- | :--- |
| **Academic Profile & Course Mapping** | Subject-to-Skill Mapper | `AcademicProfilePage.jsx` + `/api/academic` | CGPA 8.6 kept separate from Practical 78%; DBMS mapped to SQL |
| **Personalized Skill Graph** | Connected Tree & Evidence Strength | `SkillGraphPage.jsx` + `/api/skill-graph` | Student → Skill → Evidence tree with `HIGH` evidence strength badge |
| **Competency Level System (0-5)** | Standardized Levels | `CompetencyLevelBadge.jsx` + `competencyEngine.js` | Level 4 (76-90% Advanced) vs Level 5 (91-100% Industry Ready) |
| **5-Source Score Weighting** | 30/25/25/10/10 Formula | `SkillGraphPage.jsx` + `competencyEngine.js` | Transparent 5-source breakdown for every skill score |
| **Re-assessment Loop & Growth** | Closed Loop & Growth History | `StudentDashboard.jsx` + `/api/students/reassessment` | Re-assessment button increases Stats score 51% → 68%; line chart rises |
| **Learning Management Hub** | Courses & 30-Day Roadmap | `LearningHubPage.jsx` + `/api/learning-modules` | 1 hr/day vs 2 hrs/day selector with daily task roadmaps |
| **AI Mock Interview** | Interactive Mock Interview | `MockInterviewPage.jsx` + `/api/mock-interviews/start` | Real-time question evaluation scoring technical relevance & structure |
| **Multi-Role Comparison** | Career Role Explorer (11+ Roles) | `CareerRoleExplorerPage.jsx` + `/api/roles/compare` | Multi-role readiness fit matrix comparing ML Eng, Data Analyst, Cloud Eng |
| **Public Portfolio & QR Code** | Shareable Profile & SVG QR | `PublicPortfolioPage.jsx` + `QRCodeGenerator.jsx` | Portfolio at `/portfolio/:userId` with QR payload |
| **Anti-Fraud Integrity Layer** | Audit Log & Neutral Flags | `AdminVerificationCenter.jsx` + `/api/integrity/flags` | Neutral flags (`Requires Review`, `Potential Inconsistency`) & Audit trail |

---

## 5. Quick Start & Execution

### Backend
```bash
cd C:\Users\Prathamesh\.gemini\antigravity\scratch\edutech\server
node index.js
```

### Frontend
```bash
cd C:\Users\Prathamesh\.gemini\antigravity\scratch\edutech\client
npm run dev
```
*App launches on `http://localhost:5173`*

---

## 6. Demo Accounts (1-Click Switcher in Navbar)

| Role | Email | Password | Pre-seeded Context |
| :--- | :--- | :--- | :--- |
| **Student** | `student@edutech.demo` | `password123` | **Prathamesh Patil**, ML Engineer Target, 78% Readiness |
| **Faculty** | `faculty@edutech.demo` | `password123` | **Dr. Ramesh Kulkarni**, NIT HOD, Institutional Heatmap |
| **Employer** | `employer@edutech.demo` | `password123` | **TechNova Labs**, Requisitions, Candidate Dossiers |
| **Admin** | `admin@edutech.demo` | `password123` | System Administrator, Audit Trail & Anti-Fraud Queue |
