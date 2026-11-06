import { Sparkles } from "lucide-react";
import { guideImages, motivationalMessages } from "./data";
import { GuidePhoto } from "./GuidePhoto";

export function MotivationSection() {
  return (
    <div className="motivation-wrap">
      <GuidePhoto {...guideImages.motivation} />
      <div className="motivation-grid">
        {motivationalMessages.map((message) => (
          <div className="motivation-card" key={message}>
            <Sparkles size={18} />
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
