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
  { value: "12+", label: "local vendors listed" },
  { value: "Same day", label: "typical enquiry response" }
];

export type CategoryMeta = {
  descriptor: string;
  icon: string;
  image: string;
  imageAlt: string;
};

export const categoryMeta: Record<Category, CategoryMeta> = {
  Laundry: {
    descriptor: "Pickup, wash, fold",
    icon: "\u{1F9FA}",
    image: "/images/laundry.png",
    imageAlt: "Folded laundry in a basket beside a washing machine"
  },
  Tiffin: {
    descriptor: "Daily homestyle meals",
    icon: "\u{1F371}",
    image: "/images/tiffin.png",
    imageAlt: "Stacked steel tiffin carrier with rice, curry, and rotis"
  },
  Househelp: {
    descriptor: "Household support",
    icon: "\u{1F9F9}",
    image: "/images/househelp.png",
    imageAlt: "Tidy living room with a cleaning caddy and folded towels"
  },
  Electrician: {
    descriptor: "Electrical repairs",
    icon: "\u{1F4A1}",
    image: "/images/electrician.png",
    imageAlt: "Multimeter, switchboard, and electrical hand tools"
  },
  Plumber: {
    descriptor: "Leak and pipe fixes",
    icon: "\u{1F527}",
    image: "/images/plumber.png",
    imageAlt: "Pipe wrench, tap fittings, and plumbing hardware"
  },
  Cleaning: {
    descriptor: "Deep cleaning help",
    icon: "\u2728",
    image: "/images/cleaning.png",
    imageAlt: "Cleaning sprays, brushes, and a bucket of supplies"
  }
};

/** Every category image is exported at this size, so cards can reserve space. */
export const categoryImageSize = { width: 496, height: 372 } as const;

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
