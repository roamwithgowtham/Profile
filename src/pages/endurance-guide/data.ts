// Content for the Endurance Sports – Training, Nutrition & Performance Guide page.

export const heroStats = [
  { label: "Half Marathon PR", value: "1:52:00" },
  { label: "Full Marathon Finished", value: "42.2 KM" },
  { label: "Longest Ride", value: "444 KM" },
  { label: "Backyard Ultra Loop", value: "6.706 KM/hr" },
];

// Licensed Unsplash stock photos already bundled in public/images — see PHOTO_CREDITS.md.
export const guideImages = {
  hero: {
    src: "/images/fitness.jpg",
    alt: "Runners training together at dawn",
  },
  training: {
    src: "/images/cycling.jpg",
    alt: "Cyclist riding a quiet hill road at sunset",
  },
  backyardUltra: {
    src: "/images/about-mountain.jpg",
    alt: "A lone hiker standing on a rocky outcrop overlooking a misty valley",
  },
  hydration: {
    src: "/images/nilgiris.jpg",
    alt: "Rolling green hills in soft morning light",
  },
  motivation: {
    src: "/images/hero-hike.jpg",
    alt: "Two hikers walking a trail toward snow-capped mountains",
  },
};

export type TrainingRow = {
  day: string;
  activity: string;
  intermediate: string;
  beginner: string;
};

export const trainingSchedule: TrainingRow[] = [
  {
    day: "Monday",
    activity: "Rest & Recovery",
    intermediate: "Complete Rest",
    beginner: "Complete Rest",
  },
  {
    day: "Tuesday",
    activity: "Running",
    intermediate: "10 KM",
    beginner: "5 KM",
  },
  {
    day: "Wednesday",
    activity: "Strength Training",
    intermediate: "Core Muscle Exercises",
    beginner: "Basic Strength Exercises",
  },
  {
    day: "Thursday",
    activity: "Running + Cycling",
    intermediate: "10 KM Run + 50 KM Cycling",
    beginner: "5 KM Run",
  },
  {
    day: "Friday",
    activity: "Running",
    intermediate: "15 KM",
    beginner: "6 KM",
  },
  {
    day: "Saturday",
    activity: "Cycling",
    intermediate: "100 KM",
    beginner: "30–50 KM",
  },
  {
    day: "Sunday",
    activity: "Long Run",
    intermediate: "25 KM",
    beginner: "6 KM",
  },
];

export const weeklyTotals = {
  intermediate: { running: "50 KM", cycling: "150 KM" },
  beginner: { running: "17–22 KM", cycling: "30–50 KM" },
};

export type MealPlanDay = {
  day: string;
  breakfast: string;
  breakfastVeg?: string;
  lunch: string;
  lunchVeg?: string;
  evening: string;
  dinner: string;
  dinnerVeg?: string;
};

export const weeklyNutritionPlan: MealPlanDay[] = [
  {
    day: "Monday",
    breakfast: "Idli, Sambar, Eggs",
    breakfastVeg: "Idli, Sambar, Sprouts",
    lunch: "Rice, Sambar, Vegetables, Curd",
    evening: "Banana and Almonds",
    dinner: "Chapati and Paneer",
  },
  {
    day: "Tuesday",
    breakfast: "Oats, Banana and Eggs",
    breakfastVeg: "Oats, Banana and Peanut Butter",
    lunch: "Rice, Chicken/Fish and Vegetables",
    lunchVeg: "Rice, Paneer/Soya Chunks and Vegetables",
    evening: "Peanut Butter Bread",
    dinner: "Dosa and Sambar",
  },
  {
    day: "Wednesday",
    breakfast: "Dosa, Sambar and Eggs",
    breakfastVeg: "Dosa, Sambar and Sprouts",
    lunch: "Rice, Dal, Chicken/Paneer",
    lunchVeg: "Rice, Dal, Paneer",
    evening: "Sprouts and Fruits",
    dinner: "Chapati and Vegetable Curry",
  },
  {
    day: "Thursday",
    breakfast: "Oats, Banana and Peanut Butter",
    lunch: "Rice, Chicken and Curd",
    lunchVeg: "Rice, Rajma/Chana and Curd",
    evening: "Banana and Electrolytes",
    dinner: "Idli, Sambar and Eggs",
    dinnerVeg: "Idli, Sambar and Sprouts",
  },
  {
    day: "Friday",
    breakfast: "Idli, Banana and Eggs",
    breakfastVeg: "Idli, Banana and Sprouts",
    lunch: "Rice, Chicken/Fish and Vegetables",
    lunchVeg: "Rice, Soya Chunks/Paneer and Vegetables",
    evening: "Dates and Nuts",
    dinner: "Dosa and Paneer",
  },
  {
    day: "Saturday",
    breakfast: "Oats, Banana, Honey and Eggs",
    breakfastVeg: "Oats, Banana, Honey and Peanut Butter",
    lunch: "Rice, Chicken and Vegetables",
    lunchVeg: "Rice, Chana/Rajma and Vegetables",
    evening: "Banana and Peanut Butter Sandwich",
    dinner: "Rice, Dal and Curd",
  },
  {
    day: "Sunday",
    breakfast: "Idli, Banana, Honey and Eggs",
    breakfastVeg: "Idli, Banana, Honey and Sprouts",
    lunch: "Rice, Chicken/Fish and Vegetables",
    lunchVeg: "Rice, Paneer/Soya Chunks and Vegetables",
    evening: "Watermelon and Dates",
    dinner: "Chapati and Paneer",
  },
];

export type DailySlot = {
  time: string;
  label: string;
  meal: string;
  why: string;
};

export const dailyTimetable: DailySlot[] = [
  {
    time: "5:00 AM",
    label: "Pre-workout",
    meal: "Banana and water",
    why: "Quick-digesting carbs and hydration to fuel training without upsetting the stomach.",
  },
  {
    time: "6:00 AM",
    label: "Training",
    meal: "Running or cycling",
    why: "Prime energy window — the main training session of the day.",
  },
  {
    time: "8:00 AM",
    label: "Breakfast",
    meal: "Oats/Idli, Eggs and Fruits",
    why: "Replenishes glycogen and supplies protein for muscle repair after training.",
  },
  {
    time: "11:00 AM",
    label: "Mid-morning",
    meal: "Seasonal Fruits and Almonds",
    why: "Steady energy and healthy fats to bridge the gap to lunch.",
  },
  {
    time: "1:00 PM",
    label: "Lunch",
    meal: "Rice, Protein, Vegetables and Curd",
    why: "The day's main balanced meal — carbs, protein and micronutrients together.",
  },
  {
    time: "4:00 PM",
    label: "Evening Snack",
    meal: "Peanut Butter Bread or Sundal",
    why: "Protein + carb combo to prepare for an evening session or recovery.",
  },
  {
    time: "6:00 PM",
    label: "Hydration",
    meal: "Buttermilk or Fruit",
    why: "Replaces electrolytes lost through the day in a gut-friendly way.",
  },
  {
    time: "8:00 PM",
    label: "Dinner",
    meal: "Dosa/Chapati with Protein",
    why: "A lighter carb + protein meal that supports overnight recovery.",
  },
  {
    time: "9:30 PM",
    label: "Sleep and Recovery",
    meal: "Wind down and sleep",
    why: "Deep sleep is when most muscle repair and growth hormone release happens.",
  },
];

export const backyardUltra = {
  loopDistance: "6.706 KM",
  loopTimeLimit: "60 minutes",
  concept: [
    "One loop is 6.706 KM.",
    "Participants must complete each loop within one hour.",
    "Runners start another loop every hour.",
    "The event continues until only one finisher remains.",
  ],
  recommendedFoods: [
    "Bananas",
    "Dates",
    "Boiled Potatoes",
    "Idli",
    "Rice",
    "Peanut Butter Sandwich",
    "Curd Rice",
    "Energy Gels",
    "Electrolyte Drinks",
  ],
  hourlyStrategy: [
    {
      phase: "Loops 1–4",
      focus: "Settle in, eat light",
      food: "Banana, dates or an energy gel with electrolyte drink between loops.",
    },
    {
      phase: "Loops 5–8",
      focus: "Add solid, savoury food",
      food: "Boiled potatoes, idli or rice to keep energy steady without stomach upset.",
    },
    {
      phase: "Loops 9–12",
      focus: "Protect the gut",
      food: "Curd rice or a peanut butter sandwich — easy to digest, still calorie-dense.",
    },
    {
      phase: "Loops 13+ (overnight)",
      focus: "Stay alert, keep fuelling",
      food: "Small, familiar portions every loop, electrolyte drinks, and caffeine gels if tolerated.",
    },
  ],
  carbGuidance: [
    "Start with 30–60 grams of carbohydrates per hour.",
    "Experienced athletes may gradually train towards 60–90 grams per hour.",
    "Practise your nutrition during training, not on race day.",
    "Avoid experimenting with new food during race day.",
  ],
};

export const marathonGuide = {
  before: [
    "Carbohydrate-rich meals in the 2–3 days leading up to race day.",
    "Proper hydration — pale yellow urine is a simple daily check.",
    "Stick to familiar food; this is not the day to try something new.",
    "Adequate sleep in the nights before the race.",
  ],
  duringTimeline: [
    {
      distance: "5 KM",
      suggestion: "Water as needed — no fuelling necessary yet.",
    },
    {
      distance: "10 KM",
      suggestion: "First energy gel or a banana with water.",
    },
    {
      distance: "15 KM",
      suggestion: "Sports drink to start replacing electrolytes.",
    },
    { distance: "20 KM", suggestion: "Energy gel with water." },
    { distance: "25 KM", suggestion: "Banana or dates with a sports drink." },
    {
      distance: "30 KM",
      suggestion:
        "Energy gel and water — the toughest fuelling stretch ('the wall').",
    },
    {
      distance: "35 KM",
      suggestion: "Sports drink, gel if needed, and a mental-focus reset.",
    },
    {
      distance: "40 KM",
      suggestion:
        "Water and a small carb top-up (gel or banana) to finish strong.",
    },
  ],
  after: [
    {
      title: "Carbohydrates",
      description: "Replenish depleted glycogen stores within the first hour.",
    },
    {
      title: "Protein",
      description: "Supports muscle repair after 42.2 KM of effort.",
    },
    {
      title: "Electrolytes",
      description: "Replaces sodium and potassium lost through sweat.",
    },
    {
      title: "Hydration",
      description: "Rehydrate steadily rather than all at once.",
    },
    {
      title: "Recovery meal",
      description: "A balanced plate within 1–2 hours of finishing.",
    },
  ],
};

export type FoodItem = {
  name: string;
  category: string;
  carbs: string;
  protein: string;
  fat: string;
  keyNutrients: string;
  benefit: string;
};

// Approximate macros per 100g — for general awareness, not lab-tested values.
export const foodLibrary: FoodItem[] = [
  {
    name: "Banana",
    category: "Carbohydrate",
    carbs: "23g",
    protein: "1.1g",
    fat: "0.3g",
    keyNutrients: "Potassium, Vitamin B6",
    benefit: "Quick energy and cramp prevention",
  },
  {
    name: "Oats",
    category: "Complex Carb",
    carbs: "66g",
    protein: "17g",
    fat: "7g",
    keyNutrients: "Fibre, Iron",
    benefit: "Sustained energy release",
  },
  {
    name: "Eggs",
    category: "Protein",
    carbs: "1.1g",
    protein: "13g",
    fat: "11g",
    keyNutrients: "Vitamin B12, Choline",
    benefit: "Muscle repair and recovery",
  },
  {
    name: "Rice",
    category: "Carbohydrate",
    carbs: "28g",
    protein: "2.7g",
    fat: "0.3g",
    keyNutrients: "Easily digestible carbs",
    benefit: "Glycogen replenishment",
  },
  {
    name: "Chicken",
    category: "Lean Protein",
    carbs: "0g",
    protein: "31g",
    fat: "3.6g",
    keyNutrients: "Vitamin B6, Niacin",
    benefit: "Muscle recovery",
  },
  {
    name: "Fish",
    category: "Protein & Healthy Fat",
    carbs: "0g",
    protein: "22g",
    fat: "13g",
    keyNutrients: "Omega-3",
    benefit: "Reduces exercise-induced inflammation",
  },
  {
    name: "Almonds",
    category: "Healthy Fat",
    carbs: "22g",
    protein: "21g",
    fat: "50g",
    keyNutrients: "Vitamin E, Magnesium",
    benefit: "Recovery and anti-inflammatory support",
  },
  {
    name: "Dates",
    category: "Natural Sugar",
    carbs: "75g",
    protein: "2.5g",
    fat: "0.4g",
    keyNutrients: "Potassium, Fibre",
    benefit: "Fast-digesting race-day fuel",
  },
  {
    name: "Sweet Potato",
    category: "Complex Carb",
    carbs: "20g",
    protein: "1.6g",
    fat: "0.1g",
    keyNutrients: "Beta-carotene, Potassium",
    benefit: "Sustained fuel plus antioxidants",
  },
  {
    name: "Curd",
    category: "Protein & Probiotic",
    carbs: "4.7g",
    protein: "3.5g",
    fat: "3.3g",
    keyNutrients: "Probiotics, Calcium",
    benefit: "Gut health and recovery",
  },
  {
    name: "Spinach",
    category: "Micronutrient-dense",
    carbs: "3.6g",
    protein: "2.9g",
    fat: "0.4g",
    keyNutrients: "Iron, Folate",
    benefit: "Supports oxygen transport",
  },
  {
    name: "Beetroot",
    category: "Performance Vegetable",
    carbs: "10g",
    protein: "1.6g",
    fat: "0.2g",
    keyNutrients: "Dietary Nitrates",
    benefit: "Improves blood flow and stamina",
  },
  {
    name: "Paneer",
    category: "Vegetarian Protein",
    carbs: "1.2g",
    protein: "18g",
    fat: "20g",
    keyNutrients: "Calcium",
    benefit: "Veg-friendly muscle repair",
  },
  {
    name: "Peanut Butter",
    category: "Healthy Fat",
    carbs: "20g",
    protein: "25g",
    fat: "50g",
    keyNutrients: "Healthy fats, Magnesium",
    benefit: "Dense, portable energy source",
  },
];

export const hydrationRecovery = [
  {
    title: "Water intake",
    description:
      "Sip steadily through the day rather than large amounts at once; increase on training days.",
  },
  {
    title: "Electrolyte replacement",
    description:
      "Replace sodium and potassium lost in sweat, especially on long runs and rides.",
  },
  {
    title: "Sleep and recovery",
    description:
      "7–9 hours of sleep supports hormone balance and muscle repair.",
  },
  {
    title: "Muscle recovery",
    description:
      "Light movement, foam rolling, and a post-session protein meal speed recovery.",
  },
  {
    title: "Stretching",
    description:
      "Dynamic stretches before training, static stretches after, to protect range of motion.",
  },
  {
    title: "Core strengthening",
    description:
      "A strong core supports running and cycling form over long distances.",
  },
  {
    title: "Rest days",
    description:
      "Complete rest allows adaptation — progress happens during recovery, not just training.",
  },
];

export const hotWeatherHydration = [
  "Increase fluid intake before, during and after sessions in heat and humidity.",
  "Add electrolytes to water on any session longer than 60 minutes.",
  "Watch for early signs of heat stress: dizziness, excessive fatigue, or stopping sweating.",
  "Train in cooler hours (early morning or evening) where possible.",
];

export const motivationalMessages = [
  "Start Small. Dream Big.",
  "Every Kilometre Makes You Stronger.",
  "Train Smart. Recover Better.",
  "Your Limits Are Meant to Be Challenged.",
  "Discipline Today. Achievement Tomorrow.",
];
