import {
  ArrowUpRight,
  Bike,
  Camera,
  Compass,
  Dumbbell,
  Footprints,
  Heart,
  TrendingUp,
  Video,
} from "lucide-react";
import { profile } from "../../data";
import { guideImages, heroStats } from "./data";
import { TrainingSchedule } from "./TrainingSchedule";
import { WeeklyNutritionPlan } from "./WeeklyNutritionPlan";
import { DailyTimetable } from "./DailyTimetable";
import { BackyardUltraSection } from "./BackyardUltraSection";
import { MarathonGuideSection } from "./MarathonGuideSection";
import { FoodLibrary } from "./FoodLibrary";
import { NutritionCalculator } from "./NutritionCalculator";
import { HydrationRecovery } from "./HydrationRecovery";
import { MotivationSection } from "./MotivationSection";
import { GuidePhoto } from "./GuidePhoto";
import { Reveal } from "./Reveal";
import "../../App.css";
import "./EnduranceGuide.css";

const navLinks = [
  ["training", "Training"],
  ["nutrition", "Nutrition"],
  ["backyard-ultra", "Backyard Ultra"],
  ["marathon", "Marathon"],
  ["calculator", "Calculator"],
  ["hydration", "Hydration"],
];

function EnduranceGuidePage() {
  return (
    <>
      <a className="skip-link" href="#guide-main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="/" aria-label="Roam with Gowthaman — home">
            <span className="brand-mark">
              <Compass size={30} strokeWidth={1.6} />
            </span>
            <span className="brand-type">
              ROAM
              <span>
                with Gowthaman<span className="brand-dot">.</span>
              </span>
            </span>
          </a>
          <nav className="main-nav" aria-label="Guide navigation">
            {navLinks.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
            <a className="nav-contact" href="/#contact">
              Back to site <ArrowUpRight size={17} />
            </a>
          </nav>
        </div>
      </header>

      <main id="guide-main">
        <section className="guide-hero container section-space">
          <div className="guide-hero-copy">
            <div className="eyebrow">
              <span />
              ENDURANCE SPORTS GUIDE
            </div>
            <h1 className="guide-hero-title">
              Fuel Your Body. Build Your Endurance.
              <br />
              <span className="serif-word">Achieve Your Goals.</span>
            </h1>
            <p className="guide-hero-subtitle">
              A complete training and nutrition guide for runners, cyclists,
              Full Marathon athletes and Backyard Ultra participants — built
              from real marathon, cycling and ultra-endurance training.
            </p>
            <div className="guide-hero-stats">
              {heroStats.map((stat) => (
                <div className="guide-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="handwritten guide-hero-note">
              Consistency beats motivation, one kilometre at a time.
            </p>
          </div>
          <GuidePhoto priority {...guideImages.hero} />
        </section>

        <section id="training" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                WEEKLY TRAINING TIMETABLE
              </div>
              <h2>
                A week built for{" "}
                <span className="serif-word">every fitness level.</span>
              </h2>
              <p>
                Separate columns for intermediate and beginner athletes — adjust
                the distances to your own starting point.
              </p>
            </div>
            <span className="life-heading-icon">
              <Footprints size={32} strokeWidth={1.2} />
            </span>
          </div>
          <Reveal>
            <TrainingSchedule />
          </Reveal>
        </section>

        <section id="nutrition" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                WEEKLY NUTRITION PLAN
              </div>
              <h2>
                Seven days of{" "}
                <span className="serif-word">familiar, fuelling food.</span>
              </h2>
              <p>
                A South Indian–friendly meal timetable, with a vegetarian swap
                for every non-vegetarian meal.
              </p>
            </div>
            <span className="life-heading-icon">
              <Dumbbell size={32} strokeWidth={1.2} />
            </span>
          </div>
          <Reveal>
            <WeeklyNutritionPlan />
          </Reveal>
        </section>

        <section id="daily-timetable" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                DAILY NUTRITION TIMETABLE
              </div>
              <h2>
                A day in the life of{" "}
                <span className="serif-word">an endurance athlete.</span>
              </h2>
              <p>Every meal has a job to do — here's why each one matters.</p>
            </div>
          </div>
          <Reveal>
            <DailyTimetable />
          </Reveal>
        </section>

        <section id="backyard-ultra" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                PREPARE YOUR BODY FOR BACKYARD ULTRA
              </div>
              <h2>
                One loop. One hour.{" "}
                <span className="serif-word">Again and again.</span>
              </h2>
              <p>
                A fuelling strategy for the Backyard Ultra format — run,
                recover, repeat until one runner remains.
              </p>
            </div>
            <span className="life-heading-icon">
              <TrendingUp size={32} strokeWidth={1.2} />
            </span>
          </div>
          <Reveal>
            <BackyardUltraSection />
          </Reveal>
        </section>

        <section id="marathon" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                FULL MARATHON NUTRITION GUIDE — 42.2 KM
              </div>
              <h2>
                Before, during{" "}
                <span className="serif-word">and after the finish line.</span>
              </h2>
              <p>A nutrition plan for every stretch of race day.</p>
            </div>
          </div>
          <Reveal>
            <MarathonGuideSection />
          </Reveal>
        </section>

        <section id="food-library" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                ENDURANCE ATHLETE FOOD LIBRARY
              </div>
              <h2>
                Know what's on <span className="serif-word">your plate.</span>
              </h2>
              <p>Carbohydrates, protein, fat and key nutrients at a glance.</p>
            </div>
          </div>
          <Reveal>
            <FoodLibrary />
          </Reveal>
        </section>

        <section id="calculator" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                NUTRITION CALCULATOR
              </div>
              <h2>
                Estimate your{" "}
                <span className="serif-word">daily fuelling needs.</span>
              </h2>
              <p>
                A quick estimate of calories, macros and hydration based on your
                training — not a substitute for personalised advice.
              </p>
            </div>
          </div>
          <Reveal>
            <NutritionCalculator />
          </Reveal>
        </section>

        <section id="hydration" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                HYDRATION & RECOVERY
              </div>
              <h2>
                Recovery is where{" "}
                <span className="serif-word">the real gains happen.</span>
              </h2>
              <p>
                Training breaks the body down. Hydration and recovery build it
                back up stronger.
              </p>
            </div>
            <span className="life-heading-icon">
              <Bike size={32} strokeWidth={1.2} />
            </span>
          </div>
          <Reveal>
            <HydrationRecovery />
          </Reveal>
        </section>

        <section id="motivation" className="container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                CONSISTENCY BEATS MOTIVATION
              </div>
              <h2>
                Small steps, <span className="serif-word">repeated daily.</span>
              </h2>
            </div>
          </div>
          <Reveal>
            <MotivationSection />
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="brand brand-light" href="/">
                <span className="brand-mark">
                  <Compass size={30} strokeWidth={1.6} />
                </span>
                <span className="brand-type">
                  ROAM
                  <span>
                    with Gowthaman<span className="brand-dot">.</span>
                  </span>
                </span>
              </a>
              <p>Stay curious. Keep moving. Take the scenic route.</p>
              <div className="social-links">
                <a
                  href={profile.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video size={18} />
                  YouTube
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Camera size={18} />
                  Instagram
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <a href="/" className="back-top">
              Back to the main site <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Roam with Gowthaman.</span>
            <span>
              Made with a little <Heart size={12} /> & a lot of endurance.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default EnduranceGuidePage;
