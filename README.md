# Factorial Growth Challenge - Metrics Dashboard

This full-stack application was developed for the Factorial technical challenge. The project focuses on the persistence and visualization of business metrics using a modern and scalable stack.

**Live Demo:** https://growth-metrics-app.vercel.app/

---

## Approach and Decision Making

1. **Tech Stack:** Built with **Next.js 15 (App Router)** and **TypeScript**. **Supabase** was chosen as the backend-as-a-service to provide a reliable PostgreSQL database with minimal configuration overhead.

2. **Architecture:** The code follows a feature-based modular structure. UI components are decoupled from business logic, and the application includes a custom **i18n implementation** via hooks, making it ready for multi-language support (currently supporting English and Spanish).

---

## Dashboard Insights & Analysis

The application is designed to transform raw data into actionable business perspectives:

1. **Growth Lens & Perspective Filtering:** Users can toggle between **Growth, Marketing, and Revenue** views for segmented department analysis.
2. **Trend Monitoring (Line Chart):** High-level overview of metric evolution to identify seasonality or anomalies.
3. **Composition & Distribution (Pie Chart):** Visualizes the weight of each category (e.g., Organic vs. Paid acquisition).
4. **Performance Deep-Dives (Bar Chart):** Focuses on volume analysis and period-over-period comparisons.
5. **Empty States:** Integrated professional "No Data" states with technical guidance to handle empty database scenarios gracefully.
6. **Data Portability (Export):** Built-in CSV support for external reporting.

---

## Showcase Feature: Interactive Drilldown

Beyond the basic requirements, I implemented an **Interactive Drilldown System** across the Bar and Pie charts. This allows users to navigate through data hierarchies (e.g., breaking down a **Month** into specific **Weeks**), demonstrating advanced state management and deep data exploration.

---

## Setup and Installation

### 1. Database Configuration
Create a project in Supabase and execute the following scripts in the SQL Editor to initialize the schema:

SQL
```sql
-- Create Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Metrics table
CREATE TABLE metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  value FLOAT8 NOT NULL,
  category_id UUID REFERENCES categories(id),
  category_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

2. Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

Important: For security reasons, do not commit this file to your repository. It is already included in .gitignore.

Bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Execution
Run the following commands to install dependencies and start the local development server:

Bash
# Install dependencies
npm install

# Run the development server
npm run dev
The application will be available at http://localhost:3000.

## Technical Stack

Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS.

Backend/Database: Supabase (PostgreSQL).

Visualization: Highcharts & Highcharts-React.

Internationalization: Custom i18n hook supporting EN/ES. (Current default is set via useTranslations hook config).
