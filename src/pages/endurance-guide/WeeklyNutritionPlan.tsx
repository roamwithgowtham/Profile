import { useState } from "react";
import { Check } from "lucide-react";
import { weeklyNutritionPlan } from "./data";
import { useChecklist } from "./useChecklist";

export function WeeklyNutritionPlan() {
  const [vegMode, setVegMode] = useState(false);
  const dayIds = weeklyNutritionPlan.map((plan) => plan.day);
  const { checked, toggle, completedCount, total } = useChecklist(
    "endurance-guide-meal-progress",
    dayIds,
  );

  return (
    <div className="meal-plan-wrap">
      <div className="meal-plan-toggle">
        <span>Show plan as</span>
        <div className="toggle-pair" role="group" aria-label="Diet preference">
          <button
            type="button"
            className={!vegMode ? "toggle-button selected" : "toggle-button"}
            aria-pressed={!vegMode}
            onClick={() => setVegMode(false)}
          >
            Non-Vegetarian
          </button>
          <button
            type="button"
            className={vegMode ? "toggle-button selected" : "toggle-button"}
            aria-pressed={vegMode}
            onClick={() => setVegMode(true)}
          >
            Vegetarian
          </button>
        </div>
        <div className="progress-indicator" aria-live="polite">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
          <span>
            {completedCount}/{total} days followed this week
          </span>
        </div>
      </div>

      <div className="meal-plan-grid">
        {weeklyNutritionPlan.map((plan) => {
          const isDone = checked.has(plan.day);
          return (
            <div
              className={isDone ? "meal-card is-done" : "meal-card"}
              key={plan.day}
            >
              <div className="meal-card-top">
                <h3>{plan.day}</h3>
                <button
                  type="button"
                  className={isDone ? "day-check is-checked" : "day-check"}
                  aria-pressed={isDone}
                  aria-label={`Mark ${plan.day}'s plan as ${
                    isDone ? "not followed" : "followed"
                  }`}
                  onClick={() => toggle(plan.day)}
                >
                  <Check size={14} />
                </button>
              </div>
              <dl>
                <div>
                  <dt>Breakfast</dt>
                  <dd>
                    {vegMode && plan.breakfastVeg
                      ? plan.breakfastVeg
                      : plan.breakfast}
                  </dd>
                </div>
                <div>
                  <dt>Lunch</dt>
                  <dd>
                    {vegMode && plan.lunchVeg ? plan.lunchVeg : plan.lunch}
                  </dd>
                </div>
                <div>
                  <dt>Evening</dt>
                  <dd>{plan.evening}</dd>
                </div>
                <div>
                  <dt>Dinner</dt>
                  <dd>
                    {vegMode && plan.dinnerVeg ? plan.dinnerVeg : plan.dinner}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
