# 🇳🇱 Dutch Name Generator

Ever wondered who you'd be if you were born in the Netherlands? Whether you’re a "Jan," a "Sanne," or something entirely unique, this application finds your linguistic Dutch doppelgänger. 

This project was built to explore the speed and capabilities of modern AI-assisted web development.

![UI Preview](https://via.placeholder.com/800x400.png?text=Dutch+Name+Generator+UI)

## ✨ Features

- **Blazing Fast Client-Side Logic:** No databases, no loading screens, no server latency.
- **GDPR & Privacy by Design:** As a 100% stateless client-side application, this site is inherently compliant with GDPR and other strict EU privacy laws. There are no databases, no cookies, no cookie banners, and zero tracking. Your name is never transmitted over the network.
- **Global Support:** Searchable dropdown supporting all ~250 countries and territories with their respective flags.
- **Dynamic Theme System:** Choose from Dark Mode (default), Light Mode, and a specialized **Fun Mode** that dynamically generates a UI color palette based on your selected nationality.
- **Social Sharing:** Easily share your generated Dutch identity to 𝕏 (Twitter), WhatsApp, or copy it to your clipboard.

## 🛡 Security Measures

Even as a frontend-only application, proactive security measures have been implemented:
- **Content Security Policy (CSP):** A robust CSP meta tag is included in `index.html` to prevent malicious cross-site scripting (XSS) and unauthorized resource loading.
- **Input Sanitization & Constraints:** All user inputs (names) are strictly capped at 50 characters and scrubbed of angle brackets (`<`, `>`) before being processed, preventing injection artifacts or hash-function abuse.
- **Safe External Links:** `window.open` calls for social sharing strictly utilize the `noopener,noreferrer` flags to protect against reverse tabnabbing attacks.

---

## 🛠 Technical Details

### Tech Stack
- **Framework:** [React 18](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Glassmorphism)
- **Dependencies:** `react-select` (for the filterable country dropdown)
- **Data Source:** Country lists statically generated via [REST Countries API](https://restcountries.com/).

### How the Name Algorithm Works

The core logic resides in `src/utils/nameMapper.js`. It utilizes a hybrid approach to ensure accurate and engaging results:

1. **Direct Translation Dictionary:** 
   If an input name has a direct, historically accurate Dutch equivalent (e.g., *William -> Willem*, *John -> Jan*, *Mary -> Maria*), the algorithm immediately maps it and presents it as a "Direct Translation".
2. **Deterministic Fallback Algorithm:**
   For names without a direct historical translation, we use a custom deterministic string-hashing function. 
   - We generate an integer hash from a combination of the user's normalized `firstName`, `lastName`, and `nationality`.
   - This hash is used as an index to select names from predefined arrays of highly authentic, popular Dutch names (`maleNames`, `femaleNames`, `modernNames`, `commonDutchLastNames`).
   - *Why deterministic?* Because if you type the exact same name and country tomorrow, you should get the exact same Dutch doppelgänger. 

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/dutch-name-generator.git
   cd dutch-name-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
dutch-name-generator/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── NameForm.jsx   # Handles user input and nationality selection
│   │   └── ResultCard.jsx # Renders generated names and share buttons
│   ├── utils/             # Core logic and data
│   │   ├── nameMapper.js  # Translation dictionary and hash algorithm
│   │   └── allCountries.js# Statically compiled list of 250+ countries
│   ├── App.jsx            # Main layout, theme management, and state
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styling and CSS variables
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/dutch-name-generator/issues). If you have a great idea for expanding the translation dictionary, please open a PR!

## 📝 License

This project is open-source and available under the MIT License.
