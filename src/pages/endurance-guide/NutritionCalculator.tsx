import { useState } from "react";
import { Calculator } from "lucide-react";
import {
  calculateNutrition,
  type DietaryPreference,
  type NutritionResult,
  type TrainingLevel,
  type TrainingType,
} from "./calculations";

export function NutritionCalculator() {
  const [weightKg, setWeightKg] = useState(65);
  const [trainingLevel, setTrainingLevel] =
    useState<TrainingLevel>("Intermediate");
  const [trainingType, setTrainingType] = useState<TrainingType>("Running");
  const [durationHours, setDurationHours] = useState(1.5);
  const [dietaryPreference, setDietaryPreference] =
    useState<DietaryPreference>("Non-Vegetarian");
  const [result, setResult] = useState<NutritionResult | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setResult(
      calculateNutrition({
        weightKg,
        trainingLevel,
        trainingType,
        durationHours,
        dietaryPreference,
      }),
    );
  };

  return (
    <div className="calculator-card">
      <form className="calculator-form" onSubmit={handleSubmit}>
        <div className="calculator-field">
          <label htmlFor="weight">Body Weight (KG)</label>
          <input
            id="weight"
            type="number"
            min={30}
            max={150}
            value={weightKg}
            onChange={(event) => setWeightKg(Number(event.target.value))}
            required
          />
        </div>

        <div className="calculator-field">
          <label htmlFor="level">Training Level</label>
          <select
            id="level"
            value={trainingLevel}
            onChange={(event) =>
              setTrainingLevel(event.target.value as TrainingLevel)
            }
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="calculator-field">
          <label htmlFor="type">Training Type</label>
          <select
            id="type"
            value={trainingType}
            onChange={(event) =>
              setTrainingType(event.target.value as TrainingType)
            }
          >
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Both">Running + Cycling</option>
            <option value="Strength">Strength Training</option>
          </select>
        </div>

        <div className="calculator-field">
          <label htmlFor="duration">Daily Training Duration (hours)</label>
          <input
            id="duration"
            type="number"
            min={0}
            max={10}
            step={0.5}
            value={durationHours}
            onChange={(event) => setDurationHours(Number(event.target.value))}
            required
          />
        </div>

        <div className="calculator-field">
          <label htmlFor="diet">Dietary Preference</label>
          <select
            id="diet"
            value={dietaryPreference}
            onChange={(event) =>
              setDietaryPreference(event.target.value as DietaryPreference)
            }
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <button
          type="submit"
          className="button button-primary calculator-submit"
        >
          <Calculator size={16} />
          Calculate my nutrition needs
        </button>
      </form>

      <div className="calculator-result" role="status" aria-live="polite">
        {result ? (
          <>
            <div className="result-grid">
              <div className="result-item">
                <span>Daily Calories</span>
                <strong>{result.calories} kcal</strong>
              </div>
              <div className="result-item">
                <span>Carbohydrates</span>
                <strong>{result.carbsGrams} g</strong>
              </div>
              <div className="result-item">
                <span>Protein</span>
                <strong>{result.proteinGrams} g</strong>
              </div>
              <div className="result-item">
                <span>Fat</span>
                <strong>{result.fatGrams} g</strong>
              </div>
              <div className="result-item">
                <span>Hydration</span>
                <strong>{result.hydrationLiters} L</strong>
              </div>
            </div>
            <p className="calculator-disclaimer">
              These are general sports-nutrition estimates based on your inputs
              — not a medical or dietetic prescription. Adjust with a sports
              nutritionist for race-specific plans.
            </p>
          </>
        ) : (
          <p className="calculator-placeholder">
            Fill in your details and calculate to see your estimated daily
            calories, macros and hydration target.
          </p>
        )}
      </div>
    </div>
  );
}
