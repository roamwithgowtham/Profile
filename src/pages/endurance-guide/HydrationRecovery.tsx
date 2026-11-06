import { Sun } from "lucide-react";
import { guideImages, hotWeatherHydration, hydrationRecovery } from "./data";
import { Accordion } from "./Accordion";
import { GuidePhoto } from "./GuidePhoto";

export function HydrationRecovery() {
  return (
    <div className="hydration-wrap">
      <GuidePhoto {...guideImages.hydration} />

      <Accordion
        items={hydrationRecovery.map((item) => ({
          id: item.title,
          title: item.title,
          content: <p>{item.description}</p>,
        }))}
      />

      <div className="hot-weather-note">
        <Sun size={22} />
        <div>
          <h3>Hot & humid weather hydration</h3>
          <ul>
            {hotWeatherHydration.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
