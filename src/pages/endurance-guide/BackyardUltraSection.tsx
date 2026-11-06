import { Flag, Timer } from "lucide-react";
import { backyardUltra, guideImages } from "./data";
import { Accordion } from "./Accordion";
import { GuidePhoto } from "./GuidePhoto";

export function BackyardUltraSection() {
  return (
    <div className="ultra-wrap">
      <GuidePhoto {...guideImages.backyardUltra} />

      <div className="ultra-concept">
        <div className="ultra-stat">
          <Timer size={22} />
          <div>
            <strong>{backyardUltra.loopDistance}</strong>
            <span>per loop, every hour</span>
          </div>
        </div>
        <div className="ultra-stat">
          <Flag size={22} />
          <div>
            <strong>{backyardUltra.loopTimeLimit}</strong>
            <span>time limit per loop</span>
          </div>
        </div>
        <ul className="ultra-rules">
          {backyardUltra.concept.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="ultra-foods">
        <h3>Recommended race-day foods</h3>
        <div className="chip-row">
          {backyardUltra.recommendedFoods.map((food) => (
            <span className="food-chip" key={food}>
              {food}
            </span>
          ))}
        </div>
      </div>

      <div className="ultra-strategy">
        <h3>Hourly nutrition strategy</h3>
        <Accordion
          defaultOpenId={backyardUltra.hourlyStrategy[0]?.phase}
          items={backyardUltra.hourlyStrategy.map((step) => ({
            id: step.phase,
            title: step.phase,
            subtitle: step.focus,
            content: <p>{step.food}</p>,
          }))}
        />
      </div>

      <div className="ultra-carbs">
        <h3>Carbohydrate intake guidance</h3>
        <ul>
          {backyardUltra.carbGuidance.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
