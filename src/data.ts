export type Category =
  | "All adventures"
  | "Fitness"
  | "Football"
  | "Cycling"
  | "Travel"
  | "Rides"
  | "With friends";

// Public profiles supplied by the owner and checked on September 16, 2026.
export const profile = {
  email: "roamwithgowtham@gmail.com",
  youtubeUrl: "https://www.youtube.com/@Roamwithgowtham",
  instagramUrl: "https://www.instagram.com/roamwithgowtham/",
  personalInstagramUrl: "https://www.instagram.com/gowtham__vasu/",
  heroImage: "/social/gowtham-outdoors.jpg",
  heroPostUrl: "https://www.instagram.com/gowtham__vasu/p/Dc8WiZvEunM/",
  aboutImage: "/social/gowtham-bike.jpg",
  aboutPostUrl: "https://www.instagram.com/gowtham__vasu/p/DAJWUuBzXEY/",
};

// Running & endurance journey, shared by the owner on September 22, 2026.
export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Where it started",
    description:
      "Took up running with one rule: at least one event every month. Finished the MEPZ Half Marathon (2:35:00) and Hexaware Half Marathon (2:28:00), collecting a medal from every race that year.",
  },
  {
    year: "2024",
    title: "The breakthrough",
    description:
      "Returned to the MEPZ and Hexaware Half Marathons with sharper training and set a personal best — a 1:52:00 half marathon, down from 2:35:00.",
  },
  {
    year: "2024–2026",
    title: "Beyond the half",
    description:
      "Completed the Chennai Freshworks Full Marathon (42.195 KM) and moved into long-distance cycling with 222 KM and 444 KM endurance rides.",
  },
  {
    year: "Always",
    title: "On the pitch",
    description:
      "A football right-back at heart. Discipline, teamwork and never giving up — lessons from the game that carry straight into every endurance start line.",
  },
];

export const nextChallenge = {
  eyebrow: "THE NEXT CHALLENGE",
  title: "Chennai Backyard Ultra 2026",
  flagOffLabel: "Flag-off",
  flagOffDate: "Friday, 13 November 2026 · 4:00 PM",
  concept:
    "Run 6.706 KM every hour, on the hour, until only one runner remains.",
  description: [
    "Each loop has to be finished inside 60 minutes. Whatever time is left over is for rest, food, hydration and getting ready for the next one — then the clock starts again.",
    "There is no fixed distance and no traditional finish line. The race simply continues, loop after loop, hour after hour, until one runner is the last one standing.",
  ],
  focusAreas: [
    "Running endurance",
    "Cycling endurance",
    "Strength & core",
    "Hydration & nutrition",
    "Recovery & sleep",
    "Mental toughness",
    "Pace management",
  ],
};

export type RoadmapStep = {
  year: string;
  phase: string;
  description: string;
};

// Long-term training roadmap toward Ironman 2028.
export const ironmanRoadmap: RoadmapStep[] = [
  {
    year: "2026",
    phase: "Build",
    description: "Build the endurance foundation across running and cycling.",
  },
  {
    year: "2027",
    phase: "Develop",
    description:
      "Develop strength, endurance and triathlon skills — swim, bike and run together.",
  },
  {
    year: "2028",
    phase: "Execute",
    description: "Race-specific preparation and execution for Ironman 2028.",
  },
];

export const rideStats = {
  bike: "Kawasaki Ninja 300",
  ownedSince: "September 2024",
  firstRide: "Kolli Hills, November 2024",
  statesExplored: "Tamil Nadu · Kerala · Karnataka",
};

export const interests: {
  category: Exclude<Category, "All adventures">;
  label: string;
}[] = [
  { category: "Travel", label: "Travelling" },
  { category: "Fitness", label: "Athletics & fitness" },
  { category: "Football", label: "Football" },
  { category: "Cycling", label: "Cycling" },
  { category: "Rides", label: "Riding" },
  { category: "With friends", label: "Good company" },
];

export type Adventure = {
  id: string;
  title: string;
  category: Exclude<Category, "All adventures">;
  location: string;
  tagline: string;
  mediaLabel: string;
  image: string;
  imageAlt: string;
  imageFit?: "contain";
  excerpt: string;
  story: string[];
  takeaway: string;
  sourceUrl: string;
  sourceNote: string;
  videoUrl?: string;
};

// Concise editorial summaries of public titles/posts, not invented trip diaries.
// Original photos and thumbnails are bundled locally; see PHOTO_CREDITS.md.
export const adventures: Adventure[] = [
  {
    id: "vagamon-stay",
    title: "Chennai to Vagamon. A greener escape.",
    category: "Travel",
    location: "Vagamon, Kerala",
    tagline: "PEACE, NATURE & GOOD VIBES",
    mediaLabel: "26:49 vlog",
    image: "/social/vagamon.jpg",
    imageAlt:
      "Original thumbnail of Gowthaman’s Chennai to Vagamon room-stay vlog",
    excerpt:
      "The Vagamon journey begins: a room stay, a change of scenery, and a little time with nature.",
    story: [
      "VAGAMON Room Stay is Part 1 of the Chennai-to-Vagamon series on RoamwithGowtham. The published video introduces a Kerala getaway centred on a stay, nature, and good vibes.",
      "Watch the original 26-minute vlog for the actual journey and room-stay experience. The image here is the thumbnail published on the channel, not a stock photograph.",
    ],
    takeaway:
      "Follow the full journey on YouTube, and check current travel and accommodation details before planning your own trip.",
    sourceUrl: "https://www.youtube.com/watch?v=bDfLdKO6PD4",
    videoUrl: "https://www.youtube.com/watch?v=bDfLdKO6PD4",
    sourceNote:
      "Summary based on the public video title. Watch the original vlog for the complete story.",
  },
  {
    id: "cycling-to-office",
    title: "Two wheels. One everyday journey.",
    category: "Cycling",
    location: "Cycling to office, India",
    tagline: "SAVE MONEY. KEEP MOVING.",
    mediaLabel: "6:17 vlog",
    image: "/social/cycling-office.jpg",
    imageAlt: "Original thumbnail of Gowthaman’s cycling-to-office video",
    excerpt:
      "Making the daily commute part of the adventure — cycling to work to save money and stay fit.",
    story: [
      "Cycling to Office brings an everyday routine onto the channel. The video’s title connects rising petrol prices with choosing a bicycle, saving money, and staying active.",
      "It is part of the cycling side of RoamwithGowtham, alongside the channel’s 25-day cycling challenge. Open the original video for Gowthaman’s own account of the ride.",
    ],
    takeaway:
      "If you are considering a cycle commute, start with a safe route, a helmet, working lights, and a distance that suits you.",
    sourceUrl: "https://www.youtube.com/watch?v=3dv5RWCr6OE",
    videoUrl: "https://www.youtube.com/watch?v=3dv5RWCr6OE",
    sourceNote:
      "Summary based on the public video title. The thumbnail comes from the linked YouTube upload.",
  },
  {
    id: "football-mvp",
    title: "For the team. For the beautiful game.",
    category: "Football",
    location: "BDT League · Pirates FC",
    tagline: "MVP OF THE MATCH",
    mediaLabel: "Instagram post",
    image: "/social/football-award.jpg",
    imageAlt:
      "Gowtham’s published MVP of the Match artwork for F.U.G versus Pirates FC in BDT League Season 2",
    imageFit: "contain",
    excerpt:
      "A football memory from the personal account: Gowtham’s MVP recognition with Pirates FC.",
    story: [
      "Football is part of the identity behind RoamwithGowtham. The professional Instagram bio describes Gowtham as a football right-back, while the personal account shares moments from the game.",
      "This posted artwork names Gowtham of Pirates FC as MVP of the Match for F.U.G versus Pirates FC in BDT League Season 2. The original post is linked below.",
    ],
    takeaway:
      "Beyond the travel camera, there is a footballer. Follow the personal account for sporting moments and everyday life.",
    sourceUrl: "https://www.instagram.com/gowtham__vasu/p/Cn9aXm2PUoq/",
    sourceNote:
      "Details are taken from the artwork shared in the linked public Instagram post.",
  },
  {
    id: "athletic-highlights",
    title: "One athlete. More than one finish line.",
    category: "Fitness",
    location: "2022 sporting highlights",
    tagline: "FOOTBALL, CYCLING & FITNESS",
    mediaLabel: "Instagram post",
    image: "/social/football-match.jpg",
    imageAlt:
      "Gowtham’s 2022 all-rounder collage showing cycling, cricket, football, and fitness-challenge achievements",
    imageFit: "contain",
    excerpt:
      "A personal sporting scrapbook: cycling, cricket, football, and a fitness challenge in one frame.",
    story: [
      "The 2022 Allrounder collage on @gowtham__vasu brings together four sporting moments. Its captions describe a cycling-marathon third-place finish, a cricket second-place finish, a football win, and completion of a fitness challenge.",
      "The personal profile also describes an interest in endurance cycling, running, and a future triathlon goal. These are the sporting interests behind the travel-and-lifestyle creator.",
    ],
    takeaway:
      "Progress can take more than one form. Find movement you enjoy, build gradually, and leave room for recovery.",
    sourceUrl: "https://www.instagram.com/gowtham__vasu/p/Cj0AVYSvPvp/",
    sourceNote:
      "Achievements are described as captioned in the creator’s published collage; this is not an independent results verification.",
  },
  {
    id: "munnar-ride",
    title: "Chennai to Munnar. Take the long way.",
    category: "Rides",
    location: "Munnar, Kerala",
    tagline: "BEAUTIFUL KERALA · PART 2",
    mediaLabel: "10:03 vlog",
    image: "/social/munnar.jpg",
    imageAlt:
      "Original thumbnail of RoamwithGowtham’s Chennai to Munnar Part 2 resort-stay vlog",
    excerpt:
      "The Chennai-to-Munnar series continues with beautiful Kerala and a resort stay.",
    story: [
      "Part 2 of Chennai to Munnar is published on RoamwithGowtham as a Kerala travel and resort-stay vlog. It follows the channel’s Chennai-to-Munnar trip video.",
      "The channel also features rides to Thanjavur, Pondicherry, and Ramanagar. Open the original Munnar upload to experience this chapter in Gowthaman’s own words.",
    ],
    takeaway:
      "Enjoy the road responsibly: wear protective gear, check conditions, and stop somewhere safe before filming or taking photographs.",
    sourceUrl: "https://www.youtube.com/watch?v=ozxBr4yeFO4",
    videoUrl: "https://www.youtube.com/watch?v=ozxBr4yeFO4",
    sourceNote:
      "Summary based on the public video title. The original upload contains the complete trip details.",
  },
  {
    id: "sunday-with-friends",
    title: "Sunday biryani. The usual gang.",
    category: "With friends",
    location: "A Sunday with friends",
    tagline: "GOOD FOOD. EVEN BETTER COMPANY.",
    mediaLabel: "25:10 vlog",
    image: "/social/friends-cooking.jpg",
    imageAlt:
      "Original thumbnail of Gowthaman’s Sunday Special Chicken Biryani cooking-with-friends video",
    excerpt:
      "A Sunday-special chicken biryani video, shared with friends and a generous helping of everyday fun.",
    story: [
      "Not every adventure needs a long-distance ride. Sunday Special Chicken Biryani is a cooking-with-friends video from RoamwithGowtham.",
      "The published Tamil title celebrates cooking together with friends. Watch the original upload for the food, conversation, and the full Sunday story.",
    ],
    takeaway:
      "Some of the best plans are simple: good food, familiar faces, and time together.",
    sourceUrl: "https://www.youtube.com/watch?v=mOPDhwvaJZM",
    videoUrl: "https://www.youtube.com/watch?v=mOPDhwvaJZM",
    sourceNote:
      "Summary based on the public video title. Photography is the creator’s original video thumbnail.",
  },
];
