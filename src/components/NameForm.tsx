import { useState, useEffect } from 'react';
import Select from 'react-select';
import { nationalities } from '../utils/nameMapper';
import { allCountries } from '../utils/allCountries';

export interface FormData {
  firstName: string;
  lastName: string;
  nationality: string;
  gender: string;
}

interface NameFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  onNationalityChange?: (nationality: string) => void;
}

const NameForm = ({ onSubmit, isLoading, onNationalityChange }: NameFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('english');
  const [customNationality, setCustomNationality] = useState('');
  const [gender, setGender] = useState('any');

  useEffect(() => {
    if (onNationalityChange) {
      onNationalityChange(nationality === 'other' && customNationality ? customNationality : nationality);
    }
  }, [nationality, customNationality, onNationalityChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFirst = firstName.trim().replace(/[<>]/g, '').substring(0, 50);
    const cleanLast = lastName.trim().replace(/[<>]/g, '').substring(0, 50);

    if (!cleanFirst || !cleanLast) return;
    
    onSubmit({
      firstName: cleanFirst,
      lastName: cleanLast,
      nationality: nationality === 'other' && customNationality.trim() ? customNationality.trim() : nationality,
      gender
    });
  };

  return (
    <div className="glass-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nationality / Mother Tongue</label>
          <div className="nationality-pills">
            {nationalities.map((nat) => (
              <button
                type="button"
                key={nat.id}
                className={`pill ${nationality === nat.id ? 'active' : ''}`}
                onClick={() => setNationality(nat.id)}
              >
                <span className="flag">{nat.flag}</span>
                <span className="label">{nat.label}</span>
              </button>
            ))}
          </div>
          {nationality === 'other' && (
            <div style={{ marginTop: '0.5rem', animation: 'fadeIn 0.3s' }}>
              <Select
                options={allCountries}
                value={customNationality ? allCountries.find(c => c.value === customNationality) : null}
                onChange={(option) => setCustomNationality(option ? option.value : '')}
                placeholder="Search for your country..."
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    background: 'var(--surface-color)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '10px',
                    padding: '0.2rem'
                  }),
                  singleValue: (base) => ({ ...base, color: 'var(--text-primary)' }),
                  input: (base) => ({ ...base, color: 'var(--text-primary)' }),
                  menu: (base) => ({ 
                    ...base, 
                    background: 'var(--surface-color)', 
                    backdropFilter: 'blur(12px)',
                    zIndex: 100 
                  }),
                  option: (base, state) => ({
                    ...base,
                    background: state.isFocused ? 'var(--accent-color)' : 'transparent',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  })
                }}
              />
            </div>
          )}
        </div>

        <div className="names-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              className="form-input"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              className="form-input"
              placeholder="e.g. Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={50}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Gender Preference</label>
          <div className="gender-toggle">
            {['any', 'male', 'female'].map(g => (
              <button 
                key={g} 
                type="button" 
                className={`btn-toggle ${gender === g ? 'active' : ''}`}
                onClick={() => setGender(g)}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className={`btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '' : 'Generate Dutch Names'}
        </button>
      </form>
    </div>
  );
};

export default NameForm;
