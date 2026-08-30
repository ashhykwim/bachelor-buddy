export type Category =
  | "Laundry"
  | "Tiffin"
  | "Househelp"
  | "Electrician"
  | "Plumber"
  | "Cleaning";

export type Vendor = {
  id: number;
  slug: string;
  name: string;
  category: Category;
  area: string;
  description: string;
  price: string;
  rating: number;
  responseTime: string;
  tags: string[];
};

export type ServiceRequest = {
  id: number;
  name: string;
  phone: string;
  category: string;
  area: string;
  message: string;
  createdAt: string;
};

export const categories: Category[] = [
  "Laundry",
  "Tiffin",
  "Househelp",
  "Electrician",
  "Plumber",
  "Cleaning"
];

export const heroStats = [
  { value: "6", label: "service categories" },
  { value: "Bengaluru", label: "local marketplace focus" },
  { value: "Same day", label: "typical enquiry response" }
];

export const categoryMeta: Record<
  Category,
  { descriptor: string; icon: string; image: string }
> = {
  Laundry: {
    descriptor: "Pickup, wash, fold",
    icon: "🧺",
    image: "/images/laundry.svg"
  },
  Tiffin: {
    descriptor: "Daily homestyle meals",
    icon: "🍱",
    image: "/images/tiffin.svg"
  },
  Househelp: {
    descriptor: "Household support",
    icon: "🧹",
    image: "/images/househelp.svg"
  },
  Electrician: {
    descriptor: "Electrical repairs",
    icon: "💡",
    image: "/images/electrician.svg"
  },
  Plumber: {
    descriptor: "Leak and pipe fixes",
    icon: "🔧",
    image: "/images/plumber.svg"
  },
  Cleaning: {
    descriptor: "Deep cleaning help",
    icon: "✨",
    image: "/images/cleaning.svg"
  }
};

export const features = [
  {
    title: "Find basics fast",
    description:
      "Laundry, tiffin, home cleaning, and repair services in one clean directory."
  },
  {
    title: "Built for new city movers",
    description:
      "No login friction, no clutter. Just the essentials a bachelor needs on day one."
  },
  {
    title: "Helps local vendors",
    description:
      "Small businesses get visibility from people actively looking for their service."
  }
];

export const howItWorks = [
  {
    title: "Search a need",
    description: "Start with a category, locality, or service keyword."
  },
  {
    title: "Compare options",
    description: "Review nearby vendors, prices, tags, and response times."
  },
  {
    title: "Send one enquiry",
    description: "Submit the form once and let the vendor follow up."
  }
];

export const serviceHighlights = [
  {
    title: "Laundry pickup",
    blurb: "Same-day wash and fold for busy weeknights.",
    category: "Laundry"
  },
  {
    title: "Homestyle tiffin",
    blurb: "Simple daily meals with flexible subscriptions.",
    category: "Tiffin"
  },
  {
    title: "Move-in cleaning",
    blurb: "Deep cleaning for fresh starts and room handovers.",
    category: "Cleaning"
  },
  {
    title: "Quick repairs",
    blurb: "Electrician and plumber help for small urgent fixes.",
    category: "Electrician"
  }
] as const;

export const popularSearches = [
  "Laundry in Koramangala",
  "Tiffin near Indiranagar",
  "Electrician in HSR Layout",
  "Deep cleaning in Bellandur"
];

export const seedVendors: Omit<Vendor, "id" | "slug">[] = [
  {
    name: "FreshFold Laundry",
    category: "Laundry",
    area: "Koramangala",
    description: "Pickup and delivery laundry with 24-hour turnaround.",
    price: "From ₹79/kg",
    rating: 4.8,
    responseTime: "30 min",
    tags: ["Pickup", "Ironing", "Delivery"]
  },
  {
    name: "SpinCycle Express",
    category: "Laundry",
    area: "HSR Layout",
    description: "Apartment pickup with fold-only and premium steam options.",
    price: "From ₹89/kg",
    rating: 4.7,
    responseTime: "25 min",
    tags: ["Pickup", "Steam", "Fold"]
  },
  {
    name: "HomePlate Tiffin",
    category: "Tiffin",
    area: "Indiranagar",
    description: "Homestyle meals with weekly subscription and rotating menu.",
    price: "From ₹99/day",
    rating: 4.7,
    responseTime: "20 min",
    tags: ["Lunch", "Dinner", "Veg"]
  },
  {
    name: "Dabba Route",
    category: "Tiffin",
    area: "Bellandur",
    description: "Budget tiffin for office-goers with weekday meal plans.",
    price: "From ₹89/day",
    rating: 4.6,
    responseTime: "35 min",
    tags: ["Weekly plan", "Veg", "Office"]
  },
  {
    name: "QuickFix Helper",
    category: "Househelp",
    area: "HSR Layout",
    description: "Part-time cleaning and household help for shared flats.",
    price: "From ₹300/visit",
    rating: 4.6,
    responseTime: "45 min",
    tags: ["Kitchen", "Room", "Bathroom"]
  },
  {
    name: "SharedNest Assist",
    category: "Househelp",
    area: "Marathahalli",
    description: "Trusted helpers for weekly maintenance and weekend reset.",
    price: "From ₹350/visit",
    rating: 4.5,
    responseTime: "50 min",
    tags: ["Weekly", "Kitchen", "Floors"]
  },
  {
    name: "SparkLine Services",
    category: "Electrician",
    area: "BTM Layout",
    description: "Fan, switch, wiring, and small electrical fixes on demand.",
    price: "From ₹149",
    rating: 4.9,
    responseTime: "25 min",
    tags: ["Emergency", "Home", "Office"]
  },
  {
    name: "VoltCare Crew",
    category: "Electrician",
    area: "Whitefield",
    description: "Small wiring jobs, fan fixes, and switch replacements.",
    price: "From ₹179",
    rating: 4.8,
    responseTime: "40 min",
    tags: ["Fan", "Switch", "Wiring"]
  },
  {
    name: "AquaCare Plumbing",
    category: "Plumber",
    area: "Marathahalli",
    description: "Tap leak, blockage, and bathroom repair for flats and PGs.",
    price: "From ₹129",
    rating: 4.7,
    responseTime: "35 min",
    tags: ["Leak fix", "Drain", "Bathroom"]
  },
  {
    name: "PipeLine Pro",
    category: "Plumber",
    area: "Koramangala",
    description: "Tap leaks, flush fixes, and quick bathroom repairs.",
    price: "From ₹149",
    rating: 4.6,
    responseTime: "30 min",
    tags: ["Tap", "Flush", "Bathroom"]
  },
  {
    name: "CityClean Crew",
    category: "Cleaning",
    area: "Bellandur",
    description: "Deep cleaning for move-in, move-out, and monthly maintenance.",
    price: "From ₹499",
    rating: 4.8,
    responseTime: "60 min",
    tags: ["Deep clean", "Move-in", "Move-out"]
  },
  {
    name: "NestReset Cleaning",
    category: "Cleaning",
    area: "JP Nagar",
    description: "Weekly apartment cleanups and post-party reset packages.",
    price: "From ₹449",
    rating: 4.7,
    responseTime: "55 min",
    tags: ["Weekly", "Apartment", "Deep clean"]
  }
];
