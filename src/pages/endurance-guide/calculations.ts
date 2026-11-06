// Simplified, evidence-informed sports-nutrition estimates (ISSN/ACSM style ranges).
// These are general estimates only, not medical or individualised prescriptions.

export type TrainingLevel = "Beginner" | "Intermediate" | "Advanced";
export type TrainingType = "Running" | "Cycling" | "Both" | "Strength";
export type DietaryPreference = "Vegetarian" | "Non-Vegetarian";

export type NutritionInput = {
  weightKg: number;
  trainingLevel: TrainingLevel;
  trainingType: TrainingType;
  durationHours: number;
  dietaryPreference: DietaryPreference;
};

export type NutritionResult = {
  calories: number;
  carbsGrams: number;
  proteinGrams: number;
  fatGrams: number;
  hydrationLiters: number;
};

const ACTIVITY_FACTOR: Record<TrainingLevel, number> = {
  Beginner: 1.4,
  Intermediate: 1.6,
  Advanced: 1.8,
};

const CALORIES_PER_HOUR: Record<TrainingType, number> = {
  Running: 600,
  Cycling: 500,
  Both: 650,
  Strength: 400,
};

const CARBS_PER_KG: Record<TrainingLevel, number> = {
  Beginner: 5,
  Intermediate: 7,
  Advanced: 9,
};

const PROTEIN_PER_KG: Record<TrainingLevel, number> = {
  Beginner: 1.2,
  Intermediate: 1.4,
  Advanced: 1.6,
};

export function calculateNutrition({
  weightKg,
  trainingLevel,
  trainingType,
  durationHours,
}: NutritionInput): NutritionResult {
  const maintenanceCalories = weightKg * 24 * ACTIVITY_FACTOR[trainingLevel];
  const trainingCalories =
    durationHours * CALORIES_PER_HOUR[trainingType] * (weightKg / 70);
  const calories = Math.round(maintenanceCalories + trainingCalories);

  const carbsGrams = Math.round(
    weightKg * CARBS_PER_KG[trainingLevel] + durationHours * 10,
  );
  const proteinGrams = Math.round(weightKg * PROTEIN_PER_KG[trainingLevel]);

  const carbCalories = carbsGrams * 4;
  const proteinCalories = proteinGrams * 4;
  const minFatCalories = weightKg * 0.8 * 9;
  const fatCalories = Math.max(
    calories - carbCalories - proteinCalories,
    minFatCalories,
  );
  const fatGrams = Math.round(fatCalories / 9);

  const hydrationLiters =
    Math.round((weightKg * 0.035 + durationHours * 0.6) * 10) / 10;

  return { calories, carbsGrams, proteinGrams, fatGrams, hydrationLiters };
}
