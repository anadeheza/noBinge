import { useState } from 'react';
import '../styles/tracker.css';
import { Link } from 'react-router-dom'

interface MealData {
  food: string;
  feeling: string;
  saved: boolean;
}

interface TrackerState {
  breakfast: MealData;
  lunch: MealData;
  dinner: MealData;
  snacks: MealData;
}

type MealKey = keyof TrackerState;

export default function MealsPage() {
  const [waterGlasses, setWaterGlasses] = useState<number>(3);
  const maxGlasses = 8;

  const [activeMeal, setActiveMeal] = useState<MealKey>('breakfast');

  const [meals, setMeals] = useState<TrackerState>({
    breakfast: { food: 'oatmeal with berries, green tea', feeling: '', saved: true },
    lunch: { food: '', feeling: '', saved: false },
    dinner: { food: '', feeling: '', saved: false },
    snacks: { food: '', feeling: '', saved: false },
  });

  const mealConfig: Record<MealKey, { label: string; icon: string }> = {
    breakfast: { label: 'Breakfast', icon: '🌅' },
    lunch: { label: 'Lunch', icon: '☀️' },
    dinner: { label: 'Dinner', icon: '🌙' },
    snacks: { label: 'Snacks', icon: '🍎' },
  };

  const handleInputChange = (field: 'food' | 'feeling', value: string) => {
    setMeals((prev) => ({
      ...prev,
      [activeMeal]: {
        ...prev[activeMeal],
        [field]: value,
        saved: false,
      },
    }));
  };

  const handleSaveMeal = () => {
    
    if (!meals[activeMeal].food.trim()) {
      alert(`Please enter what you ate for ${mealConfig[activeMeal].label} before saving.`);
      return; 
    }

    setMeals((prev) => ({
      ...prev,
      [activeMeal]: {
        ...prev[activeMeal],
        saved: true,
      },
    }));
    alert(`${mealConfig[activeMeal].label} saved successfully!`);
  };

  const handleWaterClick = (index: number) => {
    if (index === waterGlasses) {
      setWaterGlasses(index - 1);
    } else {
      setWaterGlasses(index);
    }
  };

  return (
    <div className="mp">
      <h2 className="mp-title">Meals 🍽️</h2>
      <Link to="/dashboard" className="home-btn" aria-label="Home">
        🏠︎
      </Link>
      <div className="mp-layout">
        
        <div className="mp-left">
          <div className="mp-date">Monday, June 22</div>
          <div className="mp-section-label">Today's meals</div>
          
          {(Object.keys(mealConfig) as MealKey[]).map((key) => {
            const isSelected = activeMeal === key;
            return (
              <div 
                key={key} 
                className={`summary-row ${isSelected ? 'active-meal-row' : ''}`}
                onClick={() => setActiveMeal(key)}
                style={{ cursor: 'pointer' }}
              >
                <span className="summary-dot">{mealConfig[key].icon}</span>
                <span style={{ fontWeight: isSelected ? '700' : 'normal', flex: 1, marginLeft: '8px' }}>
                  {mealConfig[key].label}
                </span>
                <span>{meals[key].saved ? '✓' : '—'}</span>
              </div>
            );
          })}

          <div style={{ marginTop: '24px' }}>
            <div className="mp-section-label">Water intake</div>
            <div className="water-row">
              {Array.from({ length: maxGlasses }).map((_, i) => {
                const glassNumber = i + 1;
                return (
                  <span
                    key={i}
                    className={`glass ${glassNumber <= waterGlasses ? 'filled' : ''}`}
                    onClick={() => handleWaterClick(glassNumber)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    💧
                  </span>
                );
              })}
            </div>
            <div className="water-count">{waterGlasses} of {maxGlasses} glasses</div>
          </div>
        </div>

        <div className="mp-right">
          <div className="mp-date">
            {mealConfig[activeMeal].icon} {mealConfig[activeMeal].label}
          </div>
          
          <div className="meal-slot">
            <div className="mp-section-label">What did you eat?</div>
            <textarea
              className="meal-input"
              placeholder="e.g. oatmeal with berries, coffee..."
              value={meals[activeMeal].food}
              onChange={(e) => handleInputChange('food', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="meal-slot">
            <div className="mp-section-label">How did it feel? (optional)</div>
            <textarea
              className="meal-input"
              placeholder="Satisfied, guilty, neutral..."
              value={meals[activeMeal].feeling}
              onChange={(e) => handleInputChange('feeling', e.target.value)}
              rows={2}
            />
          </div>
          
          <button className="save-btn" onClick={handleSaveMeal}>
            {meals[activeMeal].saved ? 'Saved ✓' : 'Save meal'}
          </button>
        </div>

      </div>
    </div>
  );
}