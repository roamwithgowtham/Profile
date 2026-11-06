import { useState } from "react";
import { Check } from "lucide-react";
import { guideImages, trainingSchedule, weeklyTotals } from "./data";
import { useChecklist } from "./useChecklist";
import { GuidePhoto } from "./GuidePhoto";

type ViewMode = "both" | "Intermediate" | "Beginner";
const viewModes: ViewMode[] = ["both", "Intermediate", "Beginner"];

export function TrainingSchedule() {
  const [view, setView] = useState<ViewMode>("both");
  const dayIds = trainingSchedule.map((row) => row.day);
  const { checked, toggle, completedCount, total } = useChecklist(
    "endurance-guide-training-progress",
    dayIds,
  );

  return (
    <div className="schedule-wrap">
      <GuidePhoto {...guideImages.training} />

      <div className="schedule-toolbar">
        <div className="toggle-pair" role="group" aria-label="Training view">
          {viewModes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={
                view === mode ? "toggle-button selected" : "toggle-button"
              }
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
            >
              {mode === "both" ? "Compare both" : mode}
            </button>
          ))}
        </div>
        <div className="progress-indicator" aria-live="polite">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
          <span>
            {completedCount}/{total} training days logged this week
          </span>
        </div>
      </div>

      <div className="schedule-table-scroll">
        <table className="schedule-table">
          <caption className="sr-only">
            Weekly training timetable for intermediate and beginner athletes
          </caption>
          <thead>
            <tr>
              <th scope="col" className="sr-only">
                Done
              </th>
              <th scope="col">Day</th>
              <th scope="col">Activity</th>
              {view !== "Beginner" && <th scope="col">Intermediate</th>}
              {view !== "Intermediate" && <th scope="col">Beginner</th>}
            </tr>
          </thead>
          <tbody>
            {trainingSchedule.map((row) => {
              const isDone = checked.has(row.day);
              return (
                <tr key={row.day} className={isDone ? "is-done" : undefined}>
                  <td>
                    <button
                      type="button"
                      className={isDone ? "day-check is-checked" : "day-check"}
                      aria-pressed={isDone}
                      aria-label={`Mark ${row.day} training as ${
                        isDone ? "not done" : "done"
                      }`}
                      onClick={() => toggle(row.day)}
                    >
                      <Check size={14} />
                    </button>
                  </td>
                  <th scope="row">{row.day}</th>
                  <td>{row.activity}</td>
                  {view !== "Beginner" && <td>{row.intermediate}</td>}
                  {view !== "Intermediate" && <td>{row.beginner}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="schedule-totals">
        <div className="totals-card">
          <span className="totals-label">Intermediate weekly total</span>
          <strong>
            {weeklyTotals.intermediate.running} running ·{" "}
            {weeklyTotals.intermediate.cycling} cycling
          </strong>
        </div>
        <div className="totals-card">
          <span className="totals-label">Beginner weekly total</span>
          <strong>
            {weeklyTotals.beginner.running} running ·{" "}
            {weeklyTotals.beginner.cycling} cycling
          </strong>
        </div>
      </div>

      <p className="schedule-note">
        Beginners: build endurance gradually. Treat these beginner numbers as
        a starting point and adjust distances to match your current fitness
        level — consistency matters more than hitting a number in week one.
      </p>
    </div>
  );
}
