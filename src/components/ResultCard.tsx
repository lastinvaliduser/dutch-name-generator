import { NameOption } from '../utils/nameMapper';

interface ResultCardProps {
  results: NameOption[] | null;
  originalName: string | null;
  onReset: () => void;
}

const ResultCard = ({ results, originalName, onReset }: ResultCardProps) => {
  if (!results || !results.length) return null;

  return (
    <div className="results-container">
      <div className="results-header glass-card">
        <h2>{originalName}</h2>
        <p>Here are your Dutch equivalents:</p>
      </div>

      <div className="options-grid">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="glass-card option-card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className={`badge ${result.isMapped ? 'mapped' : 'fallback'}`}>
              {result.type}
            </div>
            <div className="result-name-small">
              {result.fullName}
            </div>
            <div className="result-meaning">
              {result.meaning}
            </div>
          </div>
        ))}
      </div>

      <div className="share-section">
        <p className="share-title">Share your Dutch identity!</p>
        <div className="share-buttons">
          <button 
            className="btn-share btn-twitter"
            onClick={() => {
              const text = `I just found out my Dutch name is ${results[0].fullName}! Find out yours:`;
              window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer');
            }}
          >
            𝕏 Post
          </button>
          <button 
            className="btn-share btn-whatsapp"
            onClick={() => {
              const text = `I just found out my Dutch name is ${results[0].fullName}! Find out yours at ${window.location.href}`;
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
            }}
          >
            WhatsApp
          </button>
          <button 
            className="btn-share btn-copy"
            onClick={() => {
              const text = `My Dutch name is ${results[0].fullName}! Find out yours at ${window.location.href}`;
              navigator.clipboard.writeText(text);
              alert('Copied to clipboard!');
            }}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="action-row">
        <button className="btn-secondary" onClick={onReset}>
          Try Another Name
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
