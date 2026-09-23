// ---------------------------------------------------------------------------
// All landing-page copy lives here so it's a single, easy-to-edit source.
// Copy is lifted verbatim from "Holiday Campaign Landing Page Copy v2.pdf".
// ---------------------------------------------------------------------------

export const LINKS = {
  googleForm: "https://forms.gle/rAXpVnCta4iVyYSd6",
  // TODO: replace with the terms document URL when available.
  terms: "#",
  portfolio: "https://theghifted.my.canva.site/portfolio-and-media-kit/",
  instagram: "https://www.instagram.com/theghifted",
  tiktok: "https://www.tiktok.com/@theghifted",
}

export const BRAND = {
  wordmark: "The Ghifted",
  tagline: "Special Holiday Collaboration 2026",
}

export const NAV_LINKS = [
  { label: "Brand fit", href: "#fit" },
  { label: "What's included", href: "#included" },
  { label: "Past work", href: "#past-collaborations" },
  { label: "How it works", href: "#booking" },
  { label: "FAQ", href: "#faq" },
]

export const HERO = {
  eyebrow: "Special Holiday Collaboration",
  title: "The Ghifted",
  subtitle:
    "A limited-slot creator collaboration for beauty, fashion, and lifestyle brands.",
  cta: "Join the waitlist",
}

export type FitCategory = {
  name: "Beauty" | "Fashion" | "Lifestyle"
  items: string[]
}

export const FIT = {
  eyebrow: "Is your brand a fit?",
  title: "This campaign is open to brands in",
  categories: [
    {
      name: "Beauty",
      items: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Lipcare",
        "Wigs",
        "Hair extensions",
        "Beauty tools & accessories",
        "Salon",
        "Feminine care",
        "Lashes and lash products",
      ],
    },
    {
      name: "Fashion",
      items: [
        "Clothing",
        "Shoes and footwear",
        "Bags",
        "Jewelry",
        "Watches",
        "Eyewear",
        "Fashion retailers & boutiques",
      ],
    },
    {
      name: "Lifestyle",
      items: [
        "Restaurants",
        "Hotels and resorts",
        "Events and experiences",
        "Bakeries",
        "Food brands",
        "Non-alcoholic beverages",
        "Payment platforms",
        "Productivity apps",
        "Stationery & lifestyle accessories",
      ],
    },
  ] as FitCategory[],
  linkLabel: "Check full campaign eligibility and terms",
}

export const INCLUDED = {
  eyebrow: "What's included",
  title: "One collaboration. More visibility. More value.",
  items: [
    {
      number: "01",
      title: "Creator Collaboration Video",
      body: "Created around your brand, product, or service in my authentic creator style.",
    },
    {
      number: "02",
      title: "Instagram + TikTok Posting",
      body: "Your video goes live on my Instagram and TikTok, with your brand tagged/collaborated where applicable.",
    },
    {
      number: "03",
      title: "3 Months Paid Ad Usage",
      body: "Use the final video for paid advertising for 3 months at no additional cost.",
    },
    {
      number: "04",
      title: "Special Holiday Rate",
      body: "The entire package is available at a discounted rate created exclusively for this holiday campaign, revealed at launch.",
      highlight: true,
    },
  ],
  cta: "Join the waitlist",
}

export const PAST_COLLABORATIONS = {
  eyebrow: "See past collaborations",
  title: "Real videos. Real brands.",
  cta: "View my full portfolio & media kit",
  videos: [
    {
      src: "/assets/videos/lip-routine.mp4",
      brand: "Lip Routine",
      category: "Beauty & Lipcare",
    },
    {
      src: "/assets/videos/darling-nigeria-x-the-ghifted.mp4",
      brand: "Darling Nigeria",
      category: "Haircare & Wigs",
    },
    {
      src: "/assets/videos/biocos-nigeria-x-the-ghifted.mp4",
      brand: "Biocos Nigeria",
      category: "Skincare",
    },
    {
      src: "/assets/videos/tees-and-co-x-the-ghifted.mp4",
      brand: "tees&co",
      category: "Fashion & Apparel",
    },
    {
      src: "/assets/videos/softcollections-x-the-ghifted.mp4",
      brand: "Soft Collections",
      category: "Boutique & Fashion",
    },
  ],
}

// Partner logos live in public/assets/logos/. File names are URL-encoded at render.
export const LOGOS = [
  { name: "Teena Wellness", file: "Teena Wellness.png" },
  { name: "BEHS", file: "BEHS.png" },
  { name: "Hyperbeauty Cosmetics", file: "Hyperbeauty Cosmetics.png" },
  { name: "The Peach Flora", file: "The Peach Flora.png" },
  { name: "Sewa Organics", file: "Sewa Organics.png" },
  { name: "Biocos Nigeria", file: "Biocos Nigeria.png" },
  { name: "Soft Collections", file: "Soft Collections.png" },
  { name: "Harbyskin", file: "Harbyskin.png" },
  { name: "Darling Nigeria", file: "Darling Nigeria.png" },
  { name: "Truecaller Nigeria", file: "Truecaller Nigeria.png" },
  { name: "Nanarics Beauty", file: "Nanarics Beauty.png" },
  { name: "Dekina Beauty", file: "Dekina Beauty.png" },
  { name: "Folayemi Joshua Fashion", file: "Folayemi Joshua Fashion.png" },
  { name: "Wise Studios", file: "Wise Studios.png" },
  { name: "tees&co", file: "tees-and-co.png" },
  { name: "Serena Braide", file: "Serena Braide.png" },
  { name: "Shopdeelux", file: "Shopdeelux.png" },
  { name: "Mitchell Brands", file: "Mitchell Brands.png" },
]

export const BOOKING = {
  eyebrow: "How booking works",
  steps: [
    {
      title: "Join the waitlist",
      body: "Add your brand's details. It takes two minutes and gets you on the list for early access.",
    },
    {
      title: "Confirm eligibility",
      body: "Not sure your brand fits? We confirm this together before you book, so there are no surprises.",
    },
    {
      title: "Book your slot",
      body: "Slots are first-booked, first-served. 100% payment secures your slot at the ₦100,000 rate.",
    },
    {
      title: "Brief, create, delivered, post",
      body: "You share the brief and product where applicable, I create the video, you approve it, I deliver the approved video to you, then it goes live on Instagram and TikTok.",
    },
  ],
}

export const KEY_DETAILS = {
  eyebrow: "A few things to know",
  items: [
    "Slots are limited and first-booked, first-served. Joining the waitlist doesn't guarantee a slot, but it does guarantee early access before public booking opens.",
    "Full payment is required to secure your slot.",
    "Brand eligibility should be confirmed before booking as all payments are non-refundable.",
    "Each video gets up to two reasonable rounds of revision, not a new concept or a different video.",
    "You'll review and approve the final video before it's posted.",
    "Product delivery and any on-location shoot costs are covered by the brand.",
    "The turnaround timeline is 5-7 working days after product delivery/brief approval where applicable.",
  ],
}

export const FAQ = {
  eyebrow: "Questions you may have",
  items: [
    {
      q: "When will my video be posted?",
      a: "Your video will be posted after all necessary approvals have been completed and a posting date has been mutually agreed upon.",
    },
    {
      q: "What if I want changes to the video?",
      a: "The campaign includes up to 2 reasonable rounds of revisions. Revisions should be based on the original agreed brief and concept. Requests for a completely new concept, significant changes to the agreed direction, or a reshoot may attract an additional fee.",
    },
    {
      q: "Whose ad account is used for the 3 months of paid usage?",
      a: "The brand will run the paid advertising through its own advertising account using the final approved video provided as part of the collaboration. If the brand requires a specific setup, such as Meta Partnership Ad or other platform-specific ad format, this should be discussed and agreed upon.",
    },
    {
      q: "What happens if my brand isn't a fit?",
      a: "If your brand, product or service isn't a fit for the campaign, I'll let you know and your booking will not proceed. If you're unsure about your eligibility, please reach out to me before booking so we can confirm that your brand is a suitable fit. Because payments are non-refundable, please confirm your eligibility before making payment.",
    },
    {
      q: "Can I book more than one video?",
      a: "Yes! You can book more than one collaboration video, subject to slot availability. If you'd like multiple videos, simply secure multiple available slots when bookings open.",
    },
  ],
}

export const WHY_JOIN = {
  eyebrow: "Why join the waitlist?",
  items: [
    {
      title: "Know before anyone else",
      body: "Campaign updates and booking info land in your inbox before this opens to the public.",
    },
    {
      title: "Lock in the rate while it lasts",
      body: "Once the limited slots are gone, so is the ₦100,000 rate. Waitlist members get first access to book.",
    },
  ],
  cta: "Be the first in line",
}

export const FINAL_CTA = {
  title: "Ready to collaborate?",
  body: "Let's create something special this holiday season.",
  note: "Limited slots are available at the special holiday rate.",
  cta: "Join the waitlist",
}
