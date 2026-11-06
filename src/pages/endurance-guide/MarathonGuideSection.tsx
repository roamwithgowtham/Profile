import { marathonGuide } from "./data";
import { Accordion } from "./Accordion";

export function MarathonGuideSection() {
  return (
    <div className="marathon-wrap">
      <div className="marathon-columns">
        <div className="marathon-column">
          <h3>A. Before the marathon</h3>
          <ul>
            {marathonGuide.before.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="marathon-column">
          <h3>C. After the marathon</h3>
          <ul>
            {marathonGuide.after.map((item) => (
              <li key={item.title}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="marathon-timeline">
        <h3>B. During the marathon — 42.2 KM fuelling timeline</h3>
        <Accordion
          items={marathonGuide.duringTimeline.map((point) => ({
            id: point.distance,
            title: point.distance,
            content: <p>{point.suggestion}</p>,
          }))}
        />
      </div>
    </div>
  );
}
