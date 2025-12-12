# Stochron

## Overview

Stochron is a modern web application for financial market intelligence, scenario simulation, and macroeconomic analysis. It provides interactive dashboards, scenario panels, forecasting, sentiment analysis, and supply chain/geopolitical modules. The app is built with React, TypeScript, and Tailwind CSS, and uses a modular UI with dialogs and charts for rich data visualization.

## Features

- **Authentication:** Secure login system with CSRF protection.
- **Scenario Analysis:** Switch between baseline and geopolitical scenarios (e.g., Russia-Ukraine, US-China, Red Sea, custom).
- **Interactive Dashboard:** Visualize stock data, macro factors, and scenario impacts.
- **Modular UI:** Expandable modules for forecasting, sentiment, policy, volatility, macro, simulator, and more.
- **Customizable Charts:** Theming and tooltips for financial data visualization.
- **Responsive Design:** Tailwind CSS for modern, adaptive layouts.
- **Accessibility:** Keyboard navigation and screen reader support in dialogs and forms.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-org/financial-market-intelligence.git
   cd financial-market-intelligence/Stochron
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**

   Set up your backend API and ensure it exposes the required endpoints (`/api/login/`, `/api/me/`, `/api/csrf/`, etc.).

   Create a `.env` file if needed to specify `API_BASE` or other environment variables.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app:**

   Visit [http://localhost:3000](vscode-file://vscode-app/c:/Users/prane/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) in your browser.
