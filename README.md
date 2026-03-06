# GradeSync

**CWA to GPA Converter & Academic Intelligence Platform**

GradeSync is a fully functional, responsive React web application built as a Capstone Project to solve a real, documented problem faced by KNUST students: the accurate conversion of their Cumulative Weighted Average (CWA) to an internationally recognized Grade Point Average (GPA) using the 4.0 scale.

Beyond simple conversion, GradeSync serves as an Academic Intelligence Platform to help students plan their futures, discover scholarships, and understand global academic standards.

## Team Members
*   **Project Manager:** Bastimi Salima
*   **Front-End Developers:** Nartey Addison, Emmanuel Abaidoo, Kwaku Gyimah Kye, Benjamin Nartey, Frank Ofori
*   **UI/UX Designers:** Otu Obed, Kalibor Brian
*   **Quality Assurance:** Hanaan Duah Ahmed, Appiah Sonia

## Features
1. **Landing Page:** Interactive Home with staggered entry animations.
2. **CWA to GPA Converter:** Real-time conversion algorithm mapping KNUST CWA to GPA, featuring PDF export (`jsPDF`).
3. **Course Grade Simulator:** Dynamic React form modeling 'what-if' semester scenarios.
4. **GPA Improvement Planner:** Progress bars determining the required average per semester to hit graduation targets.
5. **Scholarship Eligibility Checker:** Hardcoded global scholarship dataset tracking eligibility against student profiles.
6. **GPA Literacy Hub:** Educational content and global grading system comparison tool.
7. **Student Academic Profile:** `LocalStorage` driven history with `Chart.js` visualizing academic progression.
8. **University Readiness Score:** Visual probability indicator of admission to universities globally.

## Technology Stack
*   **Framework:** ReactJS (bootstrapped with Vite)
*   **Routing:** React Router v6
*   **Styling:** Custom CSS Grid/Flexbox matching the exact rubric rules (Poppins, Deep Green `#1B5E20`)
*   **Data Visualization:** Chart.js (`react-chartjs-2`)
*   **PDF Generation:** `jsPDF` & `html2canvas`
*   **State Management:** React Hooks (`useState`, `useEffect`) and LocalStorage persistence.

## Run Instructions

1.  **Clone the repository** (or extract the zip):
2.  Install all dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Open `http://localhost:5173` in your browser.

## Built To Full Marks Checklist
*   [x] 8-12px border matching, 24px padding on all cards.
*   [x] Responsive CSS Grid Layout.
*   [x] `useNavigate` auto-redirects after conversion to the Scholarship page.
*   [x] Accessibility `aria-labels` tested on the Converter forms.
*   [x] Chart tooltips added via `react-chartjs-2`.
*   [x] Every major algorithm commented logic in `src/utils/conversionAlgorithm.js`.
