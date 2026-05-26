import { useState } from "react";
import { Apple, Beef, Fish, Leaf, Plus, BarChart3, AlertCircle, CheckCircle, Info } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockPets } from "@/lib/mockData";
import toast from "react-hot-toast";

const nutritionProfiles = {
  Max: {
    breed: "Golden Retriever", age: "3 years", weight: "28 kg", targetCalories: 1600, currentCalories: 1580,
    meals: [
      { time: "Morning", food: "Royal Canin Adult", amount: "200g", calories: 720, protein: 26, fat: 14 },
      { time: "Evening", food: "Home-cooked rice + chicken", amount: "150g", calories: 320, protein: 28, fat: 6 },
      { time: "Treats", food: "Pedigree DentaStix", amount: "1 stick", calories: 57, protein: 4, fat: 2 },
    ],
    radarData: [
      { nutrient: "Protein", value: 85 },
      { nutrient: "Fat", value: 72 },
      { nutrient: "Fiber", value: 60 },
      { nutrient: "Calcium", value: 90 },
      { nutrient: "Vitamins", value: 78 },
      { nutrient: "Minerals", value: 65 },
    ],
    weeklyIntake: [
      { day: "Mon", calories: 1580 },
      { day: "Tue", calories: 1620 },
      { day: "Wed", calories: 1550 },
      { day: "Thu", calories: 1600 },
      { day: "Fri", calories: 1590 },
      { day: "Sat", calories: 1640 },
      { day: "Sun", calories: 1560 },
    ],
    recommendations: [
      { type: "info", text: "Increase fiber intake — add pumpkin or green beans as a topper." },
      { type: "warning", text: "Max has a wheat allergy — avoid all wheat-based treats." },
      { type: "success", text: "Protein intake is within ideal range for his breed and age." },
    ]
  }
};

const recType = {
  info: { icon: Info, color: "text-sky-500", bg: "bg-sky-100 dark:bg-sky-900/20" },
  warning: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20" },
};

export default function Nutrition() {
  const [selectedPet, setSelectedPet] = useState("Max");
  const profile = nutritionProfiles[selectedPet as keyof typeof nutritionProfiles] || nutritionProfiles.Max;
  const caloriesPct = Math.round((profile.currentCalories / profile.targetCalories) * 100);

  return (
    <DashboardLayout title="Nutrition Tracker">
      {/* Pet Selector */}
      <div className="flex gap-2 mb-8">
        {mockPets.map(p => (
          <button key={p.name} onClick={() => setSelectedPet(p.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedPet === p.name ? "bg-brand-orange text-white shadow-orange" : "card-base text-light-text dark:text-dark-body hover:border-brand-orange"}`}>
            <img src={p.image} alt={p.name} className="w-6 h-6 rounded-lg object-cover" />
            {p.name}
          </button>
        ))}
      </div>

      {/* Overview */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Daily Calories", value: `${profile.currentCalories} kcal`, sub: `Target: ${profile.targetCalories} kcal`, color: caloriesPct <= 110 ? "text-green-500" : "text-red-500" },
          { label: "Calorie Balance", value: `${profile.currentCalories < profile.targetCalories ? "-" : "+"}${Math.abs(profile.currentCalories - profile.targetCalories)} kcal`, sub: caloriesPct <= 110 ? "On track" : "Over target", color: caloriesPct <= 110 ? "text-green-500" : "text-amber-500" },
          { label: "Meals Today", value: profile.meals.length, sub: "Logged meals", color: "text-brand-orange" },
          { label: "Compliance", value: `${caloriesPct}%`, sub: "of daily target", color: "text-brand-blue" },
        ].map(s => (
          <div key={s.label} className="card-base p-4 text-center">
            <p className={`font-poppins font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-light-text dark:text-dark-body mt-0.5">{s.label}</p>
            <p className="text-xs text-light-muted dark:text-dark-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Nutrient Radar */}
        <div className="card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Nutrient Balance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={profile.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="nutrient" tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Calories */}
        <div className="lg:col-span-2 card-base p-5">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">Weekly Calorie Intake</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profile.weeklyIntake}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[1400, 1700]} />
              <Tooltip formatter={(v: number) => [`${v} kcal`, "Calories"]} />
              <Bar dataKey="calories" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="card-base overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
          <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading">Today's Meals — {selectedPet}</h3>
          <button onClick={() => toast.success("Meal logged!")} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-semibold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> Log Meal
          </button>
        </div>
        <div className="divide-y divide-light-border dark:divide-dark-border">
          {profile.meals.map((meal, i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {i === 0 ? <Apple className="w-5 h-5 text-brand-orange" /> : i === 1 ? <Beef className="w-5 h-5 text-brand-orange" /> : <Leaf className="w-5 h-5 text-brand-orange" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-light-text dark:text-dark-heading">{meal.food}</p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{meal.time} · {meal.amount}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm hidden sm:grid">
                <div><p className="font-semibold text-light-text dark:text-dark-heading">{meal.calories}</p><p className="text-xs text-light-muted dark:text-dark-muted">kcal</p></div>
                <div><p className="font-semibold text-light-text dark:text-dark-heading">{meal.protein}g</p><p className="text-xs text-light-muted dark:text-dark-muted">protein</p></div>
                <div><p className="font-semibold text-light-text dark:text-dark-heading">{meal.fat}g</p><p className="text-xs text-light-muted dark:text-dark-muted">fat</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-base p-5">
        <h3 className="font-poppins font-semibold text-light-text dark:text-dark-heading mb-4">AI Nutrition Recommendations</h3>
        <div className="space-y-3">
          {profile.recommendations.map((rec, i) => {
            const cfg = recType[rec.type as keyof typeof recType];
            const Icon = cfg.icon;
            return (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${cfg.bg}`}>
                <Icon className={`w-4 h-4 ${cfg.color} flex-shrink-0 mt-0.5`} />
                <p className="text-sm text-light-text dark:text-dark-body">{rec.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
