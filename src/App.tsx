import { useState, useEffect } from 'react';
import NameForm from './components/NameForm';
import ResultCard from './components/ResultCard';
import { generateDutchName, NameOption } from './utils/nameMapper';
import { FormData } from './components/NameForm';

const applyFunTheme = (countryStr: string | undefined) => {
  if (!countryStr) return;
  const c = countryStr.toLowerCase();
  let bg, accent;

  if (c === 'english') { bg = '#1e1b4b'; accent = '#ef4444'; }
  else if (c === 'french') { bg = '#172554'; accent = '#dc2626'; }
  else if (c === 'spanish') { bg = '#451a03'; accent = '#eab308'; }
  else if (c === 'german') { bg = '#171717'; accent = '#eab308'; }
  else if (c === 'italian') { bg = '#064e3b'; accent = '#ef4444'; }
  else {
    let hash = 0;
    for (let i = 0; i < c.length; i++) hash = c.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash % 360);
    bg = `hsl(${hue}, 80%, 15%)`;
    accent = `hsl(${(hue + 180) % 360}, 80%, 60%)`;
  }

  document.documentElement.style.setProperty('--bg-color', bg);
  document.documentElement.style.setProperty('--accent-color', accent);
  document.documentElement.style.setProperty('--accent-hover', accent);
  document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accent} 0%, ${bg} 100%)`);
};

function App() {
  const [results, setResults] = useState<NameOption[] | null>(null);
  const [originalName, setOriginalName] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [currentCountry, setCurrentCountry] = useState('english');
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'fun') {
      applyFunTheme(currentCountry);
    } else {
      document.documentElement.style = '';
    }
  }, [theme, currentCountry]);

  const handleGenerate = (data: FormData) => {
    setIsGenerating(true);

    setTimeout(() => {
      const dutchNames = generateDutchName(data.firstName, data.lastName, data.nationality, data.gender);
      setOriginalName(`${data.firstName} ${data.lastName}`);
      setResults(dutchNames);
      setIsGenerating(false);
    }, 800);
  };

  const handleReset = () => {
    setResults(null);
    setOriginalName(null);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Dutch Name Generator</h1>
            <p>Discover your equivalent Dutch identities.</p>
          </div>
          <div className="header-controls">
            <div className="theme-toggle">
              <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} title="Dark Mode">🌙</button>
              <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')} title="Light Mode">☀️</button>
              <button className={`theme-btn ${theme === 'fun' ? 'active' : ''}`} onClick={() => setTheme('fun')} title="Fun Mode">🎉</button>
              <div style={{ width: '1px', background: 'var(--border-color)', margin: '0.2rem 0' }}></div>
              <button className="theme-btn" onClick={() => setShowAbout(true)} title="About">ℹ️</button>
            </div>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <div className="form-section">
          <NameForm
            onSubmit={handleGenerate}
            isLoading={isGenerating}
            onNationalityChange={setCurrentCountry}
          />
        </div>

        {results && (
          <div className="results-section">
            <ResultCard
              results={results}
              originalName={originalName}
              onReset={handleReset}
            />
          </div>
        )}
      </div>

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content about-modal glass-card" style={{ height: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h2>About Dutch Name Generator</h2>
            <p>Ever wondered who you'd be if you were born in the Netherlands? Whether you're a "Jan," a "Sanne," or something entirely unique, this app finds your linguistic Dutch doppelgänger.</p>

            <h3>How it works</h3>
            <ul>
              <li><strong>Direct Mapping:</strong> If your name has a classic Dutch equivalent (like William to Willem), we start there.</li>
              <li><strong>Deterministic Algorithm:</strong> For everything else, we use a specialized algorithm to ensure your Dutch name is consistently "yours" every time you visit.</li>
              <li><strong>Privacy First:</strong> This site does not collect, store, or transmit any personal data. All processing happens entirely in your browser — no cookies, no databases, no analytics.</li>
            </ul>

            <h3>Open Source & Links</h3>
            <p>This project was built to explore the speed of AI-assisted development. The source code is publicly available on <a href="https://github.com/lastinvaliduser/dutch-name-generator" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
            <p>Try it out live at <a href="https://dutch-name-generator.vercel.app/" target="_blank" rel="noopener noreferrer">dutch-name-generator.vercel.app</a>.</p>

            <h3>Terms & Conditions</h3>
            <p>This application is provided "as is" for entertainment purposes only. The generated names are created algorithmically and are not official or legally binding translations. By using this site, you agree that the developers are not liable for any issues arising from its use.</p>

            <p className="copyright">&copy; {new Date().getFullYear()} Dutch Name Generator</p>
            <button className="btn-primary" onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
