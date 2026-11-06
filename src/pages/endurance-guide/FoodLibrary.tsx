import { Utensils } from "lucide-react";
import { foodLibrary } from "./data";

function parseGrams(value: string): number {
  return Number.parseFloat(value) || 0;
}

export function FoodLibrary() {
  return (
    <>
      <div className="food-grid">
        {foodLibrary.map((food) => {
          const carbs = parseGrams(food.carbs);
          const protein = parseGrams(food.protein);
          const fat = parseGrams(food.fat);
          const total = carbs + protein + fat || 1;
          return (
            <article className="food-card" key={food.name}>
              <div className="food-card-top">
                <span className="food-icon">
                  <Utensils size={18} />
                </span>
                <span className="food-category">{food.category}</span>
              </div>
              <h3>{food.name}</h3>
              <div
                className="macro-bar"
                role="img"
                aria-label={`${food.name} macro split: ${food.carbs} carbohydrates, ${food.protein} protein, ${food.fat} fat per 100 grams`}
              >
                <span
                  className="macro-carbs"
                  style={{ width: `${(carbs / total) * 100}%` }}
                />
                <span
                  className="macro-protein"
                  style={{ width: `${(protein / total) * 100}%` }}
                />
                <span
                  className="macro-fat"
                  style={{ width: `${(fat / total) * 100}%` }}
                />
              </div>
              <div className="macro-legend">
                <span>
                  <i className="dot dot-carbs" />
                  Carbs {food.carbs}
                </span>
                <span>
                  <i className="dot dot-protein" />
                  Protein {food.protein}
                </span>
                <span>
                  <i className="dot dot-fat" />
                  Fat {food.fat}
                </span>
              </div>
              <p className="food-nutrients">{food.keyNutrients}</p>
              <p className="food-benefit">{food.benefit}</p>
            </article>
          );
        })}
      </div>
      <p className="food-library-note">
        Values are approximate per 100 g, for general awareness only.
      </p>
    </>
  );
}
