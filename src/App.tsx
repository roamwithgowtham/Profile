import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  Camera,
  CircleDot,
  Compass,
  Dumbbell,
  Flag,
  Footprints,
  Heart,
  MapPin,
  Menu,
  Mountain,
  MoveUpRight,
  Navigation,
  Play,
  Route,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  adventures,
  interests,
  ironmanRoadmap,
  milestones,
  nextChallenge,
  profile,
  rideStats,
} from "./data";
import type { Adventure, Category } from "./data";
import { ContactForm } from "./ContactForm";
import "./App.css";

const categoryIcons: Record<string, LucideIcon> = {
  Fitness: Dumbbell,
  Football: CircleDot,
  Cycling: Bike,
  Travel: Mountain,
  Rides: Route,
  "With friends": Users,
};

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="#home"
      aria-label="Roam with Gowthaman — home"
    >
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
  );
}

function AdventureCard({
  adventure,
  onOpen,
}: {
  adventure: Adventure;
  onOpen: (adventure: Adventure) => void;
}) {
  const Icon = categoryIcons[adventure.category];
  return (
    <article className="adventure-card">
      <button
        className="card-image-button"
        onClick={() => onOpen(adventure)}
        aria-label={`Read ${adventure.title}`}
      >
        <img
          src={adventure.image}
          alt={adventure.imageAlt}
          loading="lazy"
          style={{ objectFit: adventure.imageFit }}
        />
        <span className="card-category">
          <Icon size={13} />
          {adventure.category}
        </span>
        <span className="card-open">
          <ArrowUpRight size={22} />
        </span>
        <span className="image-location">
          <MapPin size={13} />
          {adventure.location}
        </span>
      </button>
      <div className="card-meta">
        <span>{adventure.tagline}</span>
        <span>{adventure.mediaLabel}</span>
      </div>
      <h3>
        <button onClick={() => onOpen(adventure)}>{adventure.title}</button>
      </h3>
      <p>{adventure.excerpt}</p>
    </article>
  );
}

function StoryDialog({
  adventure,
  onClose,
}: {
  adventure: Adventure | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!adventure || !dialog) return;
    const focusedElement = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      focusedElement?.focus();
    };
  }, [adventure]);

  return (
    <dialog
      ref={dialogRef}
      className="story-dialog"
      aria-labelledby="story-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {adventure && (
        <div className="story-content">
          <button
            className="dialog-close"
            onClick={onClose}
            aria-label="Close story"
            autoFocus
          >
            <X size={22} />
          </button>
          <img
            className="story-cover"
            src={adventure.image}
            alt={adventure.imageAlt}
            style={{ objectFit: adventure.imageFit }}
          />
          <div className="story-body">
            <div className="eyebrow">
              <span />
              {adventure.category} · {adventure.location}
            </div>
            <h2 id="story-title">{adventure.title}</h2>
            <p className="story-intro">{adventure.excerpt}</p>
            <div>
              <a
                className="button button-primary story-video-link"
                href={adventure.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {adventure.videoUrl ? <Play size={16} /> : <Camera size={16} />}
                {adventure.videoUrl ? "Watch the vlog" : "View Instagram post"}
                <ArrowUpRight size={16} />
              </a>
            </div>
            {adventure.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="story-takeaway">
              <Compass size={22} />
              <div>
                <strong>A little nudge to get outside</strong>
                <p>{adventure.takeaway}</p>
              </div>
            </div>
            <p className="preview-note">{adventure.sourceNote}</p>
          </div>
        </div>
      )}
    </dialog>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All adventures");
  const [showAll, setShowAll] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(
    null,
  );
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const filteredAdventures = adventures.filter(
    (adventure) =>
      category === "All adventures" || adventure.category === category,
  );
  const visibleAdventures =
    category === "All adventures" && !showAll
      ? filteredAdventures.slice(0, 3)
      : filteredAdventures;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Brand />
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="main-navigation"
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {[
              ["home", "Home"],
              ["about", "My story"],
              ["adventures", "Adventures"],
              ["journey", "The long run"],
              ["life", "Beyond the camera"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s connect <ArrowUpRight size={17} />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero-section container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              ROOTED IN INDIA. MADE FOR THE OUTDOORS.
            </div>
            <h1>
              A LITTLE SWEAT.
              <br />A LITTLE DUST.
              <br />
              <span>A LOT OF LIFE.</span>
              <svg
                className="title-underline"
                viewBox="0 0 430 15"
                aria-hidden="true"
              >
                <path d="M4 9 Q160 -3 424 5 M50 13 Q236 6 397 11" />
              </svg>
            </h1>
            <p className="hero-intro">
              Hey, I’m Gowthaman{" "}
              <span className="wave" role="img" aria-label="waving hand">
                👋
              </span>
            </p>
            <p className="hero-description">
              Athlete at heart. Explorer by instinct. Vlogger along the way.
              From the football pitch to the road less travelled — this is life,
              one adventure at a time.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#adventures">
                Explore my world <ArrowUpRight size={19} />
              </a>
              <a
                className="text-button"
                href={profile.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="small-circle">
                  <Play size={14} />
                </span>
                Watch on YouTube
              </a>
            </div>
            <div className="hero-footnote">
              <span className="india-flag" aria-label="Indian flag">
                <i />
                <i />
                <i />
              </span>
              <span>
                Made in India. <strong>Going everywhere.</strong>
              </span>
              <span className="footnote-line" />
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-grid" aria-hidden="true" />
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src={profile.heroImage}
                alt="Gowtham with his green Kawasaki Ninja 300, from his personal Instagram post"
                fetchPriority="high"
              />
              <div className="hero-photo-shade" />
              <a
                className="photo-caption"
                href={profile.heroPostUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="live-dot" />
                FROM @GOWTHAM__VASU <ArrowUpRight size={11} />
              </a>
            </div>
            <div
              className="outside-stamp"
              aria-label="Less scrolling, more living"
            >
              <span>LESS SCROLLING</span>
              <Mountain size={34} strokeWidth={1.4} />
              <span>MORE LIVING</span>
              <i>✦</i>
              <i>✦</i>
            </div>
            <svg
              className="adventure-trail"
              viewBox="0 0 130 140"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 8c-11 31 66 19 65 46s-62-6-47 24 49 34 84 37"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeDasharray="5 6"
              />
              <path
                d="m103 104 13 12-16 6"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
            <div className="polaroid">
              <img
                src={profile.aboutImage}
                alt="Gowtham receiving his Kawasaki motorcycle, shared on Instagram"
              />
              <span>A dream. Two wheels.</span>
              <span className="photo-tape" />
            </div>
            <div className="where-next">
              <span className="where-icon">
                <Navigation size={21} />
              </span>
              <div>
                <span>ON THE ITINERARY</span>
                <strong>More moments. Fewer plans.</strong>
              </div>
              <ArrowUpRight size={19} />
            </div>
            <span className="hero-side-note">EST. WITH A RESTLESS SOUL</span>
          </div>
        </section>

        <div className="interest-strip" aria-label="Things I love">
          <div className="container interest-inner">
            <span className="strip-label">
              A FEW THINGS
              <br />
              <strong>THAT KEEP ME GOING</strong>
            </span>
            {interests.map((interest) => {
              const Icon = categoryIcons[interest.category];
              return (
                <a
                  href="#adventures"
                  key={interest.category}
                  onClick={() => {
                    setCategory(interest.category);
                    setShowAll(false);
                  }}
                >
                  <Icon size={21} strokeWidth={1.5} />
                  <span>{interest.label}</span>
                  <span className="strip-star" aria-hidden="true">
                    ✦
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <section
          id="adventures"
          className="adventures-section container section-space"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                THE ADVENTURE JOURNAL
              </div>
              <h2>
                Good days make{" "}
                <span className="serif-word">great stories.</span>
              </h2>
              <p>
                Real vlogs, sporting moments, and memories from my YouTube and
                Instagram.
              </p>
            </div>
            <span className="handwritten heading-note">
              Collect moments,
              <br />
              not things.{" "}
              <svg viewBox="0 0 66 28" aria-hidden="true">
                <path d="M3 3q17 32 57 9m-13-3 15 3-7 12" />
              </svg>
            </span>
          </div>
          <div className="journal-toolbar">
            <div className="category-filters" aria-label="Filter adventures">
              {(
                [
                  "All adventures",
                  ...interests.map((interest) => interest.category),
                ] as Category[]
              ).map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "filter-button selected"
                      : "filter-button"
                  }
                  aria-pressed={category === item}
                  onClick={() => {
                    setCategory(item);
                    setShowAll(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="journal-count" role="status">
              {String(visibleAdventures.length).padStart(2, "0")} stories to
              explore
            </span>
          </div>
          <div className="adventure-grid">
            {visibleAdventures.map((adventure) => (
              <AdventureCard
                key={adventure.id}
                adventure={adventure}
                onOpen={setSelectedAdventure}
              />
            ))}
          </div>
          {category === "All adventures" && (
            <div className="journal-bottom">
              <span>There’s always another story around the bend.</span>
              <button
                className="button button-outline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show fewer stories" : "More adventures, this way"}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>

        <section
          id="journey"
          className="journey-section container section-space"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                FROM FIRST MARATHON TO BACKYARD ULTRA
              </div>
              <h2>
                Every finish line led to{" "}
                <span className="serif-word">a new start line.</span>
              </h2>
              <p>
                Started running in 2023 with one rule: at least one event a
                month. Here’s where that rule has taken me so far.
              </p>
            </div>
            <span className="life-heading-icon">
              <Timer size={32} strokeWidth={1.2} />
            </span>
          </div>

          <div className="life-grid">
            {milestones.map((milestone, index) => {
              const Icon = [Footprints, TrendingUp, Bike, CircleDot][index];
              return (
                <div className="life-card milestone-card" key={milestone.title}>
                  <div className="life-card-top">
                    <Icon size={26} strokeWidth={1.3} />
                    <span>{milestone.year}</span>
                  </div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              );
            })}
          </div>

          <div className="challenge-banner">
            <div className="eyebrow">
              <span />
              {nextChallenge.eyebrow}
            </div>
            <h3>{nextChallenge.title}</h3>
            <p className="challenge-flagoff">
              <Flag size={14} />
              {nextChallenge.flagOffLabel}: {nextChallenge.flagOffDate}
            </p>
            <p className="challenge-concept">{nextChallenge.concept}</p>
            {nextChallenge.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div
              className="challenge-focus"
              aria-label="Current training focus"
            >
              {nextChallenge.focusAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>

          <div className="roadmap">
            <div className="roadmap-heading">
              <div className="eyebrow">
                <span />
                THE ROAD TO IRONMAN 2028
              </div>
              <p>
                Half Marathon → Full Marathon → 222 KM Cycling → 444 KM Cycling
                → Backyard Ultra → Ironman.
              </p>
            </div>
            <div className="roadmap-grid">
              {ironmanRoadmap.map((step) => (
                <div className="roadmap-step" key={step.year}>
                  <span className="roadmap-year">{step.year}</span>
                  <strong>{step.phase}</strong>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-image-frame">
                <img
                  src={profile.aboutImage}
                  alt="Gowtham at his Kawasaki motorcycle handover, from his Instagram account"
                  loading="lazy"
                />
                <a
                  className="about-image-label"
                  href={profile.aboutPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Camera size={14} />
                  Where the next chapter began. <ArrowUpRight size={13} />
                </a>
              </div>
              <div className="about-scribble handwritten">
                A curious mind.
                <br />A restless pair of feet.
                <Heart size={22} />
              </div>
              <span className="about-spark" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="about-copy">
              <div className="eyebrow">
                <span />
                THE GUY BEHIND THE CAMERA
              </div>
              <h2>
                Not a perfect life.
                <br />
                Just a <span className="serif-word">fully lived one.</span>
              </h2>
              <p className="about-lead">
                I’m Gowthaman. And sitting still has never really been my thing.
              </p>
              <p>
                Football right-back. Endurance runner with a 1:52 half-marathon
                PR and a finished full marathon. Long-distance cyclist behind
                222 KM and 444 KM rides. And the creator behind RoamwithGowtham
                — currently training for the Chennai Backyard Ultra 2026, with
                Ironman 2028 on the horizon.
              </p>
              <p>
                From Chennai-to-Kerala vlogs and the Velliangiri hills to
                cycling to work and Sunday cooking with friends, this is my
                corner of the internet for a life that keeps moving.
              </p>
              <p>
                Since bringing home a Kawasaki Ninja 300 in September 2024,
                those rides have covered Tamil Nadu, Kerala and Karnataka — from
                Kolli Hills and Yercaud to Munnar and Kolukkumalai, with a lot
                more road still to explore.
              </p>
              <p>
                No filters on the effort. No script for the adventure.
                <br />
                <strong>
                  Just showing up, getting out, and taking you along.
                </strong>
              </p>
              <div className="about-signoff">
                <span className="handwritten">Gowthaman</span>
                <span>ATHLETE · EXPLORER · YOUR NEXT ADVENTURE BUDDY</span>
              </div>
              <div className="ride-stats" aria-label="Motorcycle travel stats">
                <div>
                  <strong>{rideStats.bike}</strong>
                  <span>Since {rideStats.ownedSince}</span>
                </div>
                <div>
                  <strong>First ride</strong>
                  <span>{rideStats.firstRide}</span>
                </div>
                <div>
                  <strong>States explored</strong>
                  <span>{rideStats.statesExplored}</span>
                </div>
              </div>
              <div className="profile-handles" aria-label="Instagram profiles">
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Camera size={15} />
                  @roamwithgowtham <span>Professional</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={profile.personalInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users size={15} />
                  @gowtham__vasu <span>Personal</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="life" className="life-section container section-space">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span />
                MORE THAN A HIGHLIGHT REEL
              </div>
              <h2>
                Different passions.{" "}
                <span className="serif-word">Same heartbeat.</span>
              </h2>
              <p>
                Not every day needs a destination. Sometimes, it just needs a
                little movement.
              </p>
            </div>
            <span className="life-heading-icon">
              <Sparkles size={32} strokeWidth={1.2} />
            </span>
          </div>
          <div className="life-grid">
            {[
              {
                number: "01",
                title: "Chase your stronger.",
                description:
                  "Early starts. One more rep. Small wins that add up. Fitness is a way of showing up for yourself.",
                icon: Dumbbell,
                category: "Fitness",
              },
              {
                number: "02",
                title: "Play for the feeling.",
                description:
                  "The first touch. The last-minute goal. A muddy kit and a good game — some things never get old.",
                icon: CircleDot,
                category: "Football",
              },
              {
                number: "03",
                title: "Find your kind of free.",
                description:
                  "Two wheels, open roads, and a little wind in your face. The best route isn’t always the fastest.",
                icon: Bike,
                category: "Cycling",
              },
              {
                number: "04",
                title: "Bring your people.",
                description:
                  "Unplanned outings. Shared snacks. The jokes that make no sense. Good company makes any place a good place.",
                icon: Users,
                category: "With friends",
              },
            ].map(
              ({ number, title, description, icon: Icon, category: item }) => (
                <a
                  className="life-card"
                  href="#adventures"
                  key={number}
                  onClick={() => {
                    setCategory(item as Category);
                    setShowAll(false);
                  }}
                >
                  <div className="life-card-top">
                    <Icon size={29} strokeWidth={1.3} />
                    <span>{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="life-card-link">
                    Come along <ArrowUpRight size={17} />
                  </span>
                </a>
              ),
            )}
          </div>
          <a
            className="photo-moment"
            href="https://www.youtube.com/watch?v=mOPDhwvaJZM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Sunday Special Chicken Biryani with friends on YouTube"
          >
            <img
              src="/social/friends-cooking.jpg"
              alt="Thumbnail from Gowthaman’s Sunday Special Chicken Biryani vlog with friends"
              loading="lazy"
            />
            <div className="photo-moment-shade" />
            <div className="moment-copy">
              <span className="eyebrow">THE BEST PART ISN’T THE PLACE.</span>
              <h2>
                It’s the people
                <br />
                you <span>get lost with.</span>
              </h2>
              <span className="handwritten">
                Here’s to the “remember when” moments.
              </span>
            </div>
            <span className="moment-label">
              <Users size={16} />
              WATCH THE SUNDAY VLOG <ArrowUpRight size={14} />
            </span>
          </a>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow">
                <span />
                GOOD THINGS START WITH A HELLO
              </div>
              <h2>
                Got a plan?
                <br />
                <span className="serif-word">Count me in.</span>
                <MoveUpRight className="contact-arrow" strokeWidth={1} />
              </h2>
              <p>
                A collaboration, a weekend ride, a friendly match, or just a
                story to share — I’d love to hear it.
              </p>
              <div className="contact-topics">
                <span>
                  <Check size={14} />
                  Brand collaborations
                </span>
                <span>
                  <Check size={14} />
                  Adventure ideas
                </span>
                <span>
                  <Check size={14} />
                  Good conversations
                </span>
              </div>
              <span className="handwritten contact-note">
                Let’s make something worth remembering.
              </span>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>Stay curious. Keep moving. Take the scenic route.</p>
              {(profile.youtubeUrl || profile.instagramUrl) && (
                <div className="social-links">
                  {profile.youtubeUrl && (
                    <a
                      href={profile.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video size={18} />
                      YouTube
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {profile.instagramUrl && (
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Camera size={18} />
                      Instagram · Professional
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  <a
                    href={profile.personalInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Users size={18} />
                    Instagram · Personal
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </div>
            <a href="#home" className="back-top">
              Back to the top <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Roam with Gowthaman.</span>
            <span>
              Made with a little <Heart size={12} /> & a lot of wanderlust in
              India.
            </span>
            <span className="footer-coordinate">
              <Compass size={14} />
              ALWAYS EXPLORING
            </span>
          </div>
          <p className="site-preview-note">
            Photos & vlogs from @roamwithgowtham and @gowtham__vasu. Original
            posts linked throughout.
          </p>
        </div>
      </footer>
      <StoryDialog
        adventure={selectedAdventure}
        onClose={() => setSelectedAdventure(null)}
      />
    </>
  );
}

export default App;
