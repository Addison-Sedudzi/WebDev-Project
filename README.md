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
1. **Landing Page:** Interactive home with 3D tilt cards, staggered animations, and a live GPA preview card.
2. **CWA to GPA Converter:** Real-time conversion algorithm mapping KNUST CWA to GPA (4.0 & 5.0 scales), with PDF export.
3. **Course Grade Simulator:** Dynamic 'what-if' course entry form that instantly recalculates your CWA.
4. **GPA Improvement Planner:** Determines the required semester average to hit graduation targets.
5. **Scholarship Eligibility Checker:** Matches student GPA against a curated global scholarship dataset.
6. **GPA Literacy Hub:** Global grading comparison tool and AI academic advisor (Gradey, powered by Groq).
7. **Student Academic Profile:** Supabase-persisted history with Chart.js visualizing academic progression.
8. **University Readiness Score:** Visual probability indicator of admission to universities globally.
9. **Academic Goal Tracker:** Set milestones, track progress, and stay motivated through the semester.

## Technology Stack
*   **Framework:** ReactJS (Vite)
*   **Routing:** React Router v6
*   **Backend & Auth:** Supabase (PostgreSQL, Row Level Security, Auth)
*   **AI Chatbot:** Groq API (`llama-3.1-8b-instant`) via `src/components/GradeBot.jsx`
*   **Animations:** Framer Motion (3D tilt, floating hero card, staggered entries)
*   **Styling:** Custom CSS with Poppins font, Deep Green `#1B5E20` palette, dark mode support
*   **Data Visualization:** Chart.js (`react-chartjs-2`)
*   **PDF Generation:** `jsPDF` & `html2canvas`

## Environment Variables

Create a `.env` file at the project root with the following keys (never commit this file):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

## Supabase Setup

Run the following SQL in your Supabase project's SQL Editor before first use:

```sql
CREATE TABLE academic_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    cwa numeric NOT NULL,
    credits integer DEFAULT 0,
    gpa numeric NOT NULL,
    system text DEFAULT '4.0',
    source text DEFAULT 'converter',
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE academic_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON academic_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON academic_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON academic_history FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION delete_user()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
AS $$ BEGIN DELETE FROM auth.users WHERE id = auth.uid(); END; $$;
```

## Run Instructions

1.  Clone the repository: `git clone <repo-url>`
2.  Install dependencies: `npm install`
3.  Create your `.env` file with the keys listed above
4.  Start the development server: `npm run dev`
5.  Open `http://localhost:5173` in your browser

## Deploying to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the three environment variables in Vercel's project settings
4. Deploy — `vercel.json` handles SPA client-side routing automatically
