import { dailyTimetable } from "./data";

export function DailyTimetable() {
  return (
    <ol className="timetable-list">
      {dailyTimetable.map((slot) => (
        <li className="timetable-row" key={slot.time}>
          <span className="timetable-time">{slot.time}</span>
          <div className="timetable-body">
            <div className="timetable-heading">
              <span className="timetable-label">{slot.label}</span>
              <strong>{slot.meal}</strong>
            </div>
            <p>{slot.why}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
