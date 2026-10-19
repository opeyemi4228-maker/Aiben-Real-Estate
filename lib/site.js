// Everything the concept build says about AIBEN in one place. Facts come from
// aibenproperties.com (reviewed October 2026). Anything not public is marked
// `sample` and is rendered with a visible "sample" tag.

export const studio = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME || "BitLayerX Technologies",
  url: "https://www.bitlayerx.com",
  // When set, WhatsApp buttons open a chat with this number (digits only, with
  // country code). When empty, they show the pre-filled message as a demo.
  whatsapp: process.env.NEXT_PUBLIC_DEMO_WHATSAPP || "",
};

export const company = {
  name: "AIBEN Properties",
  legal: "AIBEN Properties Ltd",
  group: "AIBEN Group",
  founded: 2011,
  offices: 4,
  staff: 204,
  chairman: "Chief Andy Elerewe",
  tagline: "Own your ground.",
  promise:
    "AIBEN builds communities you can own with confidence: clear prices, flexible payment, verified titles and a team that answers.",
  phones: ["090 4444 4411", "+234 705 555 5181", "+234 705 555 5191"],
  email: "info@aibenproperties.com",
  address: "No 99, 43 Crescent, 4th Avenue, Gwarinpa Estate, Abuja",
  hours: "Monday to Friday, 8am – 6pm",
  mission:
    "To be a dominant provider of exceptional real estate solutions that improve lives, create sustainable communities, and transform the future through innovation, integrity, and excellence.",
  vision:
    "To become Africa's leading real estate development company, recognised for delivering world-class communities, creating wealth through property ownership, and exceeding customer expectations at every stage of the investment journey.",
  story:
    "AIBEN Group began in 2011 with small support services in the built sector and, through perseverance and strategic partnerships, has grown into a prominent conglomerate. Within ten years its flagship, AIBEN Properties Ltd, became a leading real estate firm with multiple residential and commercial projects.",
  values: [
    "Client-centric approach",
    "Transparency and integrity",
    "Diverse property portfolio",
    "Expertise and local knowledge",
    "Innovation and technology",
    "Commitment to community development",
    "Dedicated customer support",
  ],
};

// HUTU Abuja, from the joint-venture marketing site (gorbenn.com, October 2026).
export const hutu = {
  claim: "Africa's first polo & golf resort estate",
  location: "Lugbe South District, Airport Road, Abuja",
  meaning: "Hutu means \u201cto rest\u201d: a place where every moment restores body, mind and soul.",
  facts: [
    ["500", "hectares"],
    ["$3bn", "development"],
    ["10 min", "to the airport"],
    ["25 min", "to the city"],
    ["20,000", "jobs projected"],
  ],
  developers: [
    ["AIBEN Properties", "Developer of 18+ estates, including Mar-a-Lago Lake City Resort and luxury hotels."],
    ["Mshel Homes", "Developer of 40+ estates across Lagos, Abuja and Adamawa."],
  ],
  features: [
    ["Polo & golf", "Immaculately kept grounds for players and spectators."],
    ["Artificial lake & horse ranch", "Elegance meets adventure."],
    ["Amusement park & 5-star hotel", "Fun and rest for the whole family."],
    ["Upscale residences", "Homes designed for lasting comfort."],
    ["Commercial spaces", "Room for business in a growing destination."],
  ],
};

const team = (slug) => `/images/team/${slug}.jpg`;

// Management, in the order aibenproperties.com lists them.
export const leadership = [
  { name: "Chief Andy Elerewe", role: "Chairman / CEO", photo: team("andy-elerewe"), board: true },
  { name: "Engr. Benedicta Elerewe", role: "Executive Director", photo: team("benedicta-elerewe"), board: true },
  { name: "QS Charles Agwam", role: "General Manager", photo: team("charles-agwam"), board: true },
  { name: "Ezenwa Augustine Udoka", role: "Head, Admin", photo: team("augustine-ezenwa"), board: true },
  { name: "Mrs Julient Aliyu", role: "Human Resource Manager", photo: team("julient-aliyu") },
  { name: "Engr. Richard Ibi Efem", role: "Project Manager", photo: team("richard-efem") },
  { name: "Alabi Michael Dada", role: "Chief Financial Officer, AIBEN Group", photo: team("michael-alabi") },
  { name: "Joseph Izonofe Osoria", role: "Unit Head, Building & Corporate Service, AIBEN Group", photo: team("joseph-osoria") },
  { name: "Nkiruka Peace Onyeugo", role: "Unit Head, Site & Service, AIBEN Group", photo: team("nkiruka-onyeugo") },
  { name: "Hope Bege Yari", role: "PR, Branding & OOH, AIBEN Group", photo: team("hope-yari") },
  { name: "Vincent Danjuma", role: "Head, Digital Media & ICT, AIBEN Group", photo: team("vincent-danjuma") },
];

// "Our trusted partners" on aibenproperties.com.
export const partners = [
  { name: "NNPC", logo: "/images/partners/nnpc.png" },
  { name: "MicMidas Investment", logo: "/images/partners/micmidas.png" },
  { name: "Reezbay Realty Solutions", logo: "/images/partners/reezbay.png" },
  { name: "Airz Realty", logo: "/images/partners/airz-realty.png" },
  { name: "MS Hel Homes", logo: "/images/partners/mshel-homes.png" },
  { name: "Global Touch", logo: "/images/partners/global-touch.png" },
  { name: "Asogba", logo: "/images/partners/asogba.png" },
  { name: "Fhemfel Homes", logo: "/images/partners/fhemfel-homes.png" },
  { name: "Winford Properties", logo: "/images/partners/winford.png" },
];

export const brands = [
  { name: "AIBEN Properties", line: "Land, homes and communities", kind: "estate", src: "/images/estates/victory-park-1.jpg" },
  { name: "AIBEN Facility Managers", line: "Your home, managed", kind: "park", src: "/images/site/construction-team.jpg" },
  { name: "CitiMall", line: "Retail and commercial space", kind: "mall", src: "/images/estates/citimall-phase3-1.jpg" },
  { name: "Bourdillon Hotels & Resort", line: "Hospitality", kind: "lake", src: "/images/estates/bourdillon-1.jpg" },
  { name: "Shanaji Nig Ltd", line: "Group company", kind: "tower", src: "/images/estates/tower-2.jpg" },
  { name: "11.05 Café", line: "Food and hospitality", kind: "interior" },
];

export const nav = [
  { href: "/estates", label: "Estates" },
  { href: "/hutu-prestige", label: "HUTU Prestige" },
  { href: "/ground-finder", label: "Ground Finder" },
  { href: "/diaspora", label: "Diaspora Desk" },
  { href: "/how-to-buy", label: "How to buy" },
  { href: "/verify", label: "Verify" },
];

export const pathways = [
  { href: "/ground-finder?purpose=home", title: "I want a home", line: "House types, prices and plans near schools and roads." },
  { href: "/ground-finder?purpose=land", title: "I want to invest", line: "Land with title, appreciation and resale support." },
  { href: "/diaspora", title: "I live abroad", line: "Video inspections, your currency, your time zone." },
  { href: "/estates?type=commercial", title: "I need commercial space", line: "Shops and offices with footfall and yield." },
  { href: "/my-aiben", title: "I'm already a client", line: "Payments, documents and construction in one place." },
];

export const experiences = [
  { key: "resort", label: "Resort living", kind: "lake" },
  { key: "golf", label: "Golf & polo", kind: "park" },
  { key: "lakeside", label: "Lakeside", kind: "lake" },
  { key: "mountain", label: "Mountain", kind: "mountain" },
  { key: "city", label: "City centre", kind: "tower" },
  { key: "income", label: "Commercial income", kind: "mall" },
];

export function whatsappMessage(context) {
  return context
    ? `Hello AIBEN, I'm interested in ${context}. Please send me the current price list and payment plans.`
    : "Hello AIBEN, I'd like to talk to an adviser about your estates.";
}
