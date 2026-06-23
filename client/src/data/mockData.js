// Mock data for GlowSpot Hyderabad - Marketplace platform

export const HYDERABAD_AREAS = [
  "Banjara Hills",
  "Jubilee Hills",
  "Hitech City",
  "Gachibowli",
  "Madhapur",
  "Begumpet",
  "Kondapur",
  "Kukatpally",
  "Secunderabad",
  "Somajiguda",
  "Ameerpet",
  "Tolichowki",
  "Film Nagar",
  "Kompally"
];

export const CATEGORIES = [
  { id: 'hair', name: 'Haircut & Styling', icon: 'Scissors', tagline: 'Crafting styles that turn heads' },
  { id: 'bridal', name: 'Bridal & Makeup', icon: 'Sparkles', tagline: 'Unveiling your inner radiance' },
  { id: 'spa', name: 'Spa & Wellness', icon: 'Compass', tagline: 'Rejuvenate your body and mind' },
  { id: 'grooming', name: 'Men\'s Grooming', icon: 'UserCheck', tagline: 'Dashing looks, precision styling' },
  { id: 'home', name: 'Home Services', icon: 'Home', tagline: 'Luxury styling at your doorstep' }
];

export const SALONS = [
  {
    id: 1,
    name: "Aura Luxe Grooming & Salon",
    area: "Jubilee Hills",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    rating: 4.9,
    ratingCount: 142,
    priceTier: "₹₹₹",
    priceRange: "₹800 - ₹12,000",
    distance: "1.2 km",
    availabilityBadge: "Few slots left today",
    availabilityType: "limited", // limited, available, tomorrow
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
    about: "Aura Luxe is a premium grooming hub offering advanced hair aesthetics, custom bridal makeovers, and tranquil spa therapies. We pride ourselves on creating an outstanding, stress-free oasis using global beauty products and highly certified specialists.",
    services: [
      { id: "101", name: "Premium Designer Haircut & Wash", price: 950, duration: "45 mins", category: "hair" },
      { id: "102", name: "Global Hair Balayage / Highlights", price: 5499, duration: "180 mins", category: "hair" },
      { id: "103", name: "HydraFacial Skin Rejuvenation", price: 3499, duration: "60 mins", category: "skin" },
      { id: "104", name: "Signature Glow Bridal Makeup Package", price: 9999, duration: "150 mins", category: "bridal" },
      { id: "105", name: "Therapeutic Swedish Massage", price: 2499, duration: "60 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s1",
        name: "Priya Sen",
        role: "Senior Hair Designer",
        rating: 4.9,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specializing in contemporary cuts and creative coloring with 8+ years of experience."
      },
      {
        id: "s2",
        name: "Rahul Verma",
        role: "Master Colorist",
        rating: 4.8,
        reviews: 62,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Trained in London, Rahul is an expert at finding the perfect balayage tone for your skin."
      },
      {
        id: "s3",
        name: "Ayesha Khan",
        role: "Bridal Makeup Director",
        rating: 5.0,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specialist in HD and Airbrush bridal makeup. Creating unforgettable looks."
      }
    ],
    reviews: [
      { id: "r1", user: "Sneha Reddy", rating: 5, date: "21 June 2026", comment: "Priya did an incredible job with my layers! Highly recommend the tea they serve too." },
      { id: "r2", user: "Karthik P.", rating: 5, date: "15 June 2026", comment: "Outstanding service. The salon ambiance is very relaxing and clean." },
      { id: "r3", user: "Deepika M.", rating: 4, date: "02 June 2026", comment: "Beautiful bridal makeup trial! Ayesha is very understanding and professional." }
    ]
  },
  {
    id: 2,
    name: "The Golden Mane Grooming Studio",
    area: "Banjara Hills",
    address: "Road No. 2, Opposite KBR Park, Banjara Hills, Hyderabad",
    rating: 4.8,
    ratingCount: 118,
    priceTier: "₹₹",
    priceRange: "₹400 - ₹5,000",
    distance: "2.5 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80",
    about: "The Golden Mane is a classic yet contemporary grooming studio tailored for men's absolute styling and women's precision hair care. We offer beard spa rituals, hair therapies, and custom styling.",
    services: [
      { id: "201", name: "Premium Haircut & Beard Shaping", price: 799, duration: "50 mins", category: "grooming" },
      { id: "202", name: "Classic Charcoal Facial Mask & Detan", price: 1200, duration: "40 mins", category: "skin" },
      { id: "203", name: "Royal Beard Grooming & Hot Towel Shave", price: 499, duration: "30 mins", category: "grooming" },
      { id: "204", name: "Scalp Nourishing Keratin Therapy", price: 2999, duration: "90 mins", category: "hair" }
    ],
    stylists: [
      {
        id: "s4",
        name: "Vikram Rathore",
        role: "Men's Barber Specialist",
        rating: 4.7,
        reviews: 74,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Crafting custom beard styles and classic fades for over 6 years."
      },
      {
        id: "s5",
        name: "Divya N.",
        role: "Hair & Skin Therapist",
        rating: 4.9,
        reviews: 44,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Skilled in organic facials and scalp restoration massage techniques."
      }
    ],
    reviews: [
      { id: "r4", user: "Rohan J.", rating: 5, date: "22 June 2026", comment: "Vikram gives the absolute best skin fades in Hyderabad, hands down." },
      { id: "r5", user: "Harish Kumar", rating: 4, date: "18 June 2026", comment: "Very professional staff and good selection of hair care products." }
    ]
  },
  {
    id: 3,
    name: "Ziva Wellness & Spa",
    area: "Gachibowli",
    address: "ISB Road, Next to Sheraton, Gachibowli, Hyderabad",
    rating: 4.7,
    ratingCount: 96,
    priceTier: "₹₹",
    priceRange: "₹600 - ₹8,000",
    distance: "4.1 km",
    availabilityBadge: "Available tomorrow",
    availabilityType: "tomorrow",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80",
    about: "Ziva Wellness is a sanctuary of peace in the tech hub. Specializing in authentic Ayurvedic therapies, reflexology, and high-performance skin treatments to melt away stress.",
    services: [
      { id: "301", name: "Deep Tissue Muscle Melt Massage", price: 2799, duration: "75 mins", category: "spa" },
      { id: "302", name: "Ayurvedic Abhyangam Ritual", price: 3499, duration: "90 mins", category: "spa" },
      { id: "303", name: "Brightening Vit-C Facial & Polish", price: 2199, duration: "50 mins", category: "skin" },
      { id: "304", name: "Premium Gel Manicure & Pedicure Spa", price: 1599, duration: "80 mins", category: "skin" }
    ],
    stylists: [
      {
        id: "s6",
        name: "Kiran Dev",
        role: "Certified Massage Therapist",
        rating: 4.9,
        reviews: 58,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specialist in pressure point release, aromatherapy, and sports rehabilitation."
      },
      {
        id: "s7",
        name: "Meera Nair",
        role: "Senior Esthetician",
        rating: 4.6,
        reviews: 38,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Passionate about herbal remedies and advanced facial technologies."
      }
    ],
    reviews: [
      { id: "r6", user: "Ananya Rao", rating: 5, date: "20 June 2026", comment: "The deep tissue massage by Kiran was heavenly. Felt so relaxed." },
      { id: "r7", user: "Vivek T.", rating: 4, date: "11 June 2026", comment: "Very quiet ambiance, professional massage, clean beds." }
    ]
  },
  {
    id: 4,
    name: "Gloss & Glow Home Beauty Services",
    area: "Hitech City",
    address: "Deliverable to Hitech City, Madhapur, & Kondapur, Hyderabad",
    rating: 4.9,
    ratingCount: 165,
    priceTier: "₹₹",
    priceRange: "₹300 - ₹6,000",
    distance: "0.5 km (At Home)",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    about: "Bring the premium salon experience directly to your living room. We send certified artists complete with sanitized kits, disposable covers, and calming ambient tunes.",
    services: [
      { id: "401", name: "At-Home Classic Pedicure & Manicure", price: 899, duration: "60 mins", category: "home" },
      { id: "402", name: "Premium Waxing (Full Arms & Legs)", price: 1199, duration: "45 mins", category: "home" },
      { id: "403", name: "Party Glow Makeover & Blow Dry", price: 2999, duration: "75 mins", category: "bridal" },
      { id: "404", name: "Hydrating Facial & Head Massage", price: 1499, duration: "50 mins", category: "home" }
    ],
    stylists: [
      {
        id: "s8",
        name: "Sneha Reddy",
        role: "Beauty Aesthetics Pro",
        rating: 4.9,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specialist in threading, organic waxing, and custom home facials."
      },
      {
        id: "s9",
        name: "Rohan D'Souza",
        role: "Home Hair Specialist",
        rating: 4.8,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Skilled barber and hair stylist. Perfect trims in home comfort."
      }
    ],
    reviews: [
      { id: "r8", user: "Shalini G.", rating: 5, date: "23 June 2026", comment: "So convenient! Sneha brought everything and left the space spotless. Best waxing service." },
      { id: "r9", user: "Pranati L.", rating: 5, date: "16 June 2026", comment: "Rohan gave my kids and me great haircuts at home. Super clean and professional." }
    ]
  },
  {
    id: 5,
    name: "Urban Shave Co. & Barbershop",
    area: "Madhapur",
    address: "Near Image Gardens, Madhapur, Hyderabad",
    rating: 4.6,
    ratingCount: 78,
    priceTier: "₹",
    priceRange: "₹200 - ₹2,000",
    distance: "3.0 km",
    availabilityBadge: "Few slots today",
    availabilityType: "limited",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80",
    about: "Urban Shave Co. is the perfect destination for the modern professional. Fast, clean, and highly affordable precision grooming and stress-busting massage.",
    services: [
      { id: "501", name: "Classic Men's Haircut", price: 299, duration: "30 mins", category: "grooming" },
      { id: "502", name: "Premium Detan Pack & Face Cleanse", price: 499, duration: "30 mins", category: "skin" },
      { id: "503", name: "Luxury Charcoal Peel-off Mask", price: 399, duration: "25 mins", category: "skin" },
      { id: "504", name: "Relaxing Scalp & Head Massage", price: 349, duration: "20 mins", category: "grooming" }
    ],
    stylists: [
      {
        id: "s10",
        name: "Arjun Rao",
        role: "Stylist & Barber Head",
        rating: 4.7,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specialist in modern trims, beard sculpting, and charcoal skincare."
      }
    ],
    reviews: [
      { id: "r10", user: "Sunny Yadav", rating: 5, date: "22 June 2026", comment: "Great shave. Very quick and worth the money." },
      { id: "r11", user: "Aditya V.", rating: 4, date: "09 June 2026", comment: "Standard prices but highly skilled barbers. Arjun is very good." }
    ]
  },

  // ===================== NEW SALONS =====================

  {
    id: 6,
    name: "Naturals Salon & Spa",
    area: "Kondapur",
    address: "Botanical Garden Road, Near Jayabheri Enclave, Kondapur, Hyderabad",
    rating: 4.5,
    ratingCount: 312,
    priceTier: "₹₹",
    priceRange: "₹350 - ₹7,500",
    distance: "3.8 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80",
    about: "Naturals is one of South India's most trusted salon chains. Known for using natural and organic ingredients, this Kondapur outlet offers expert haircuts, luxury facials, bridal packages, and full-body spa rituals. Walk-ins welcome.",
    services: [
      { id: "601", name: "Herbal Haircut & Blow Dry", price: 499, duration: "40 mins", category: "hair" },
      { id: "602", name: "Organic Gold Facial Treatment", price: 1299, duration: "60 mins", category: "skin" },
      { id: "603", name: "Full Body Aromatherapy Massage", price: 2499, duration: "75 mins", category: "spa" },
      { id: "604", name: "Bridal HD Makeup & Draping", price: 7499, duration: "120 mins", category: "bridal" },
      { id: "605", name: "Hair Smoothening & Rebonding", price: 3999, duration: "150 mins", category: "hair" }
    ],
    stylists: [
      {
        id: "s11",
        name: "Lakshmi Devi",
        role: "Senior Stylist & Branch Lead",
        rating: 4.6,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "12 years of experience in South Indian bridal styling and advanced hair treatments."
      },
      {
        id: "s12",
        name: "Mahesh Kumar",
        role: "Men's Grooming Expert",
        rating: 4.5,
        reviews: 88,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Expert in textured crops, pompadour styles, and scalp treatments."
      }
    ],
    reviews: [
      { id: "r12", user: "Swathi K.", rating: 5, date: "22 June 2026", comment: "Best Naturals branch in Hyderabad! Lakshmi did my smoothening perfectly." },
      { id: "r13", user: "Rajesh P.", rating: 4, date: "18 June 2026", comment: "Good haircut and very reasonable prices. Staff is friendly and punctual." },
      { id: "r14", user: "Preethi M.", rating: 5, date: "12 June 2026", comment: "The gold facial is amazing. My skin was glowing for days after!" }
    ]
  },
  {
    id: 7,
    name: "Bubbles Salon & Day Spa",
    area: "Banjara Hills",
    address: "Road No. 12, Near GVK One Mall, Banjara Hills, Hyderabad",
    rating: 4.8,
    ratingCount: 224,
    priceTier: "₹₹₹",
    priceRange: "₹900 - ₹15,000",
    distance: "1.8 km",
    availabilityBadge: "Few slots left today",
    availabilityType: "limited",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1200&q=80",
    about: "Bubbles is Hyderabad's iconic luxury salon chain, loved by celebrities and top professionals. Known for international-grade hair transformations, exclusive skin clinics, and elaborate bridal studios with private suites.",
    services: [
      { id: "701", name: "Signature Bubbles Haircut & Style", price: 1199, duration: "50 mins", category: "hair" },
      { id: "702", name: "L'Oréal Hair Color & Gloss Treatment", price: 4999, duration: "120 mins", category: "hair" },
      { id: "703", name: "Diamond Radiance Facial", price: 3999, duration: "75 mins", category: "skin" },
      { id: "704", name: "Royal Bridal Makeover Suite", price: 14999, duration: "180 mins", category: "bridal" },
      { id: "705", name: "Balinese Relaxation Massage", price: 3499, duration: "90 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s13",
        name: "Neelima Sharma",
        role: "Creative Director",
        rating: 4.9,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Award-winning hairstylist featured in Vogue India. 15+ years of luxury salon experience."
      },
      {
        id: "s14",
        name: "Sameer Ali",
        role: "Hair Transformation Specialist",
        rating: 4.8,
        reviews: 79,
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Trained at Toni & Guy Academy London. Specializes in precision cuts and global coloring."
      }
    ],
    reviews: [
      { id: "r15", user: "Ananya Sharma", rating: 5, date: "21 June 2026", comment: "Neelima completely transformed my hair! The Bubbles experience is truly world-class." },
      { id: "r16", user: "Meghana R.", rating: 5, date: "14 June 2026", comment: "Best bridal makeup in Hyderabad. The private suite made it so special." },
      { id: "r17", user: "Rahul K.", rating: 4, date: "08 June 2026", comment: "Premium pricing but the quality justifies it. Sameer's color work is outstanding." }
    ]
  },
  {
    id: 8,
    name: "Lakmé Salon",
    area: "Somajiguda",
    address: "Raj Bhavan Road, Opposite Taj Krishna, Somajiguda, Hyderabad",
    rating: 4.6,
    ratingCount: 289,
    priceTier: "₹₹",
    priceRange: "₹500 - ₹10,000",
    distance: "2.2 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    about: "Lakmé Salon brings India's most iconic beauty brand to Somajiguda. Offering Lakmé Absolute professional-grade makeup, advanced skin science facials, and trending hairstyles crafted by trained experts using Lakmé's proprietary product line.",
    services: [
      { id: "801", name: "Lakmé Absolute Haircut & Finish", price: 699, duration: "45 mins", category: "hair" },
      { id: "802", name: "Lakmé Youth Infinity Facial", price: 2499, duration: "60 mins", category: "skin" },
      { id: "803", name: "Lakmé Bridal Luxe Makeover", price: 8999, duration: "150 mins", category: "bridal" },
      { id: "804", name: "Hair Botox & Deep Conditioning", price: 3499, duration: "90 mins", category: "hair" },
      { id: "805", name: "Full Body Waxing & Cleanup", price: 1999, duration: "75 mins", category: "skin" }
    ],
    stylists: [
      {
        id: "s15",
        name: "Fatima Begum",
        role: "Lakmé Certified Makeup Artist",
        rating: 4.7,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Certified by Lakmé Academy with expertise in HD bridal and editorial makeup."
      },
      {
        id: "s16",
        name: "Arun Krishnan",
        role: "Hair Science Expert",
        rating: 4.6,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specializes in hair restoration, botox treatments, and keratin applications."
      }
    ],
    reviews: [
      { id: "r18", user: "Divya Teja", rating: 5, date: "20 June 2026", comment: "Fatima's bridal makeup was flawless. Used Lakmé Absolute products and it lasted 12+ hours!" },
      { id: "r19", user: "Suresh M.", rating: 4, date: "15 June 2026", comment: "Hair botox treatment by Arun was excellent. My hair feels like silk now." },
      { id: "r20", user: "Kavitha N.", rating: 5, date: "10 June 2026", comment: "The Youth Infinity facial genuinely made my skin look 5 years younger. Worth it!" }
    ]
  },
  {
    id: 9,
    name: "YLG Salon & Spa",
    area: "Kukatpally",
    address: "KPHB Colony, Near Metro Station, Kukatpally, Hyderabad",
    rating: 4.4,
    ratingCount: 178,
    priceTier: "₹₹",
    priceRange: "₹300 - ₹6,000",
    distance: "5.2 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1200&q=80",
    about: "YLG (You Look Great) is a Bangalore-born chain that has captured Hyderabad hearts. Famous for their painless Rica waxing, YLG delivers consistent quality across haircuts, makeup, spa treatments, and advanced skin solutions at accessible prices.",
    services: [
      { id: "901", name: "YLG Signature Haircut", price: 449, duration: "35 mins", category: "hair" },
      { id: "902", name: "Rica Roll-On Painless Waxing", price: 899, duration: "40 mins", category: "skin" },
      { id: "903", name: "Hydra Boost Facial Cleanup", price: 999, duration: "45 mins", category: "skin" },
      { id: "904", name: "Party Makeup & Hair Styling", price: 3499, duration: "90 mins", category: "bridal" },
      { id: "905", name: "Stress Relief Back & Shoulder Massage", price: 1299, duration: "45 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s17",
        name: "Pallavi G.",
        role: "Waxing & Skincare Lead",
        rating: 4.5,
        reviews: 96,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "YLG certified specialist known for virtually painless waxing and advanced facials."
      },
      {
        id: "s18",
        name: "Naveen Reddy",
        role: "Styling Expert",
        rating: 4.4,
        reviews: 62,
        image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Creative hair stylist with 5 years experience in textured cuts and contemporary looks."
      }
    ],
    reviews: [
      { id: "r21", user: "Shravani K.", rating: 5, date: "21 June 2026", comment: "Best Rica waxing in Kukatpally! Pallavi is super gentle and quick. Zero irritation." },
      { id: "r22", user: "Bhavana R.", rating: 4, date: "16 June 2026", comment: "Good haircut at reasonable price. The salon is always clean and well-maintained." },
      { id: "r23", user: "Sunil D.", rating: 4, date: "09 June 2026", comment: "Naveen gave me a great textured crop. Will come back for sure." }
    ]
  },
  {
    id: 10,
    name: "O2 Spa & Wellness Lounge",
    area: "Begumpet",
    address: "Sardar Patel Road, Near Begumpet Airport, Begumpet, Hyderabad",
    rating: 4.7,
    ratingCount: 203,
    priceTier: "₹₹₹",
    priceRange: "₹1,500 - ₹12,000",
    distance: "3.5 km",
    availabilityBadge: "Few slots left today",
    availabilityType: "limited",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80",
    about: "O2 Spa is India's premier luxury spa chain. This Begumpet flagship offers therapeutic massages, jacuzzi sessions, steam rooms, and signature body wraps. Internationally trained therapists create a world-class relaxation experience in the heart of Hyderabad.",
    services: [
      { id: "1001", name: "Swedish Classic Relaxation Massage", price: 2499, duration: "60 mins", category: "spa" },
      { id: "1002", name: "Thai Yoga Stretch Massage", price: 2999, duration: "75 mins", category: "spa" },
      { id: "1003", name: "Hot Stone Therapy & Aromatherapy", price: 3999, duration: "90 mins", category: "spa" },
      { id: "1004", name: "Detox Body Wrap & Scrub", price: 3499, duration: "80 mins", category: "spa" },
      { id: "1005", name: "Couple's Romance Package", price: 5999, duration: "120 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s19",
        name: "Dr. Ravi Shankar",
        role: "Chief Wellness Therapist",
        rating: 4.9,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "IATA-certified therapist with expertise in deep tissue, Thai, and sports recovery massage."
      },
      {
        id: "s20",
        name: "Sunita Rao",
        role: "Aromatherapy Specialist",
        rating: 4.8,
        reviews: 69,
        image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Trained in Bali. Specialist in essential oils, hot stone therapy, and body detox wraps."
      }
    ],
    reviews: [
      { id: "r24", user: "Vikram S.", rating: 5, date: "22 June 2026", comment: "The couple's package at O2 was absolutely divine. Dr. Ravi is a miracle worker!" },
      { id: "r25", user: "Nandini G.", rating: 5, date: "17 June 2026", comment: "Best hot stone therapy I've ever had. The ambience is so calming, felt like Bali." },
      { id: "r26", user: "Aravind K.", rating: 4, date: "11 June 2026", comment: "Premium pricing but the experience is worth every rupee. Great steam room facilities." }
    ]
  },
  {
    id: 11,
    name: "Toni & Guy Essensuals",
    area: "Jubilee Hills",
    address: "Road No. 45, Near Jubilee Hills Checkpost, Jubilee Hills, Hyderabad",
    rating: 4.7,
    ratingCount: 195,
    priceTier: "₹₹₹",
    priceRange: "₹800 - ₹18,000",
    distance: "1.5 km",
    availabilityBadge: "Available tomorrow",
    availabilityType: "tomorrow",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
    about: "Toni & Guy brings London's most iconic hairdressing heritage to Jubilee Hills. Every stylist is trained at the Toni & Guy Academy, delivering precision cuts, avant-garde coloring, and editorial-worthy styling. A global salon experience with a Hyderabad touch.",
    services: [
      { id: "1101", name: "Essensuals Precision Haircut", price: 999, duration: "45 mins", category: "hair" },
      { id: "1102", name: "Global Color with TIGI Products", price: 6999, duration: "150 mins", category: "hair" },
      { id: "1103", name: "Olaplex Bond Repair Treatment", price: 4999, duration: "90 mins", category: "hair" },
      { id: "1104", name: "Men's Style & Texture Cut", price: 899, duration: "40 mins", category: "grooming" },
      { id: "1105", name: "Kerastase Luxury Hair Spa", price: 2999, duration: "60 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s21",
        name: "Siddharth Menon",
        role: "T&G Academy Certified Stylist",
        rating: 4.8,
        reviews: 108,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Trained at Toni & Guy London. Known for razor-sharp precision cuts and fashion-forward styling."
      },
      {
        id: "s22",
        name: "Anjali Desai",
        role: "Color Technician",
        rating: 4.7,
        reviews: 87,
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Specialist in dimensional coloring, babylights, and Olaplex bond restoration treatments."
      }
    ],
    reviews: [
      { id: "r27", user: "Pooja Reddy", rating: 5, date: "20 June 2026", comment: "Siddharth gave me the most precise bob cut I've ever had. True London-level skill!" },
      { id: "r28", user: "Tarun B.", rating: 5, date: "14 June 2026", comment: "Anjali's balayage work is art. My hair looks like a magazine cover. 10/10." },
      { id: "r29", user: "Deepa N.", rating: 4, date: "07 June 2026", comment: "Olaplex treatment saved my damaged hair. A bit pricey but the results speak for themselves." }
    ]
  },
  {
    id: 12,
    name: "Bodycraft Salon & Spa",
    area: "Secunderabad",
    address: "SD Road, Near Paradise Circle, Secunderabad, Hyderabad",
    rating: 4.5,
    ratingCount: 156,
    priceTier: "₹₹",
    priceRange: "₹400 - ₹8,000",
    distance: "6.0 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1200&q=80",
    about: "Bodycraft brings Bangalore's trusted beauty empire to Secunderabad. Known for clinical-grade skin treatments, laser services, and a full-spectrum salon experience that blends modern dermatology with traditional grooming artistry.",
    services: [
      { id: "1201", name: "Advanced Haircut & Styling", price: 599, duration: "40 mins", category: "hair" },
      { id: "1202", name: "Derma Bright Clinical Facial", price: 2999, duration: "60 mins", category: "skin" },
      { id: "1203", name: "Full Body Polishing & Scrub", price: 2499, duration: "75 mins", category: "spa" },
      { id: "1204", name: "Hair Color & Streak Design", price: 3499, duration: "120 mins", category: "hair" },
      { id: "1205", name: "Express Bridal Makeup", price: 5999, duration: "90 mins", category: "bridal" }
    ],
    stylists: [
      {
        id: "s23",
        name: "Dr. Prathima Rao",
        role: "Skin Science Consultant",
        rating: 4.7,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Dermatology-trained skin specialist focused on pigmentation correction and anti-aging facials."
      },
      {
        id: "s24",
        name: "Ravi Teja",
        role: "Senior Hair Stylist",
        rating: 4.5,
        reviews: 80,
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Expert in trendy color work, global streaks, and textured cuts for all hair types."
      }
    ],
    reviews: [
      { id: "r30", user: "Madhuri S.", rating: 5, date: "19 June 2026", comment: "Dr. Prathima's facial cleared my acne marks in just 2 sessions. Highly recommend Bodycraft!" },
      { id: "r31", user: "Venkat R.", rating: 4, date: "12 June 2026", comment: "Good salon near Paradise. Ravi gave me excellent global highlights that look very natural." },
      { id: "r32", user: "Keerthi P.", rating: 4, date: "05 June 2026", comment: "Clean setup, friendly staff, and good parking. The body polish treatment was luxurious." }
    ]
  },
  {
    id: 13,
    name: "Green Trends Unisex Salon",
    area: "Ameerpet",
    address: "Near Ameerpet Metro Station, SR Nagar Cross Road, Ameerpet, Hyderabad",
    rating: 4.3,
    ratingCount: 245,
    priceTier: "₹",
    priceRange: "₹150 - ₹3,000",
    distance: "4.5 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1200&q=80",
    about: "Green Trends is South India's largest unisex salon chain, trusted by millions for affordable yet quality grooming. This Ameerpet outlet offers everything from budget-friendly haircuts to premium spa treatments — perfect for students and young professionals.",
    services: [
      { id: "1301", name: "Basic Haircut & Wash", price: 199, duration: "25 mins", category: "hair" },
      { id: "1302", name: "Clean-Up & De-Tan Facial", price: 499, duration: "30 mins", category: "skin" },
      { id: "1303", name: "Full Arms & Legs Waxing", price: 599, duration: "35 mins", category: "skin" },
      { id: "1304", name: "Hair Colour (Ammonia-Free)", price: 999, duration: "60 mins", category: "hair" },
      { id: "1305", name: "Quick Head & Shoulder Massage", price: 299, duration: "20 mins", category: "spa" }
    ],
    stylists: [
      {
        id: "s25",
        name: "Suresh Babu",
        role: "Branch Stylist",
        rating: 4.3,
        reviews: 135,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Fast and reliable stylist specializing in classic men's cuts and quick grooming."
      },
      {
        id: "s26",
        name: "Rekha T.",
        role: "Beauty Consultant",
        rating: 4.4,
        reviews: 110,
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Expert in facials, waxing, and budget-friendly beauty solutions for everyday glow."
      }
    ],
    reviews: [
      { id: "r33", user: "Prasad V.", rating: 5, date: "22 June 2026", comment: "Best budget salon in Ameerpet! ₹199 haircut is a steal. Suresh is very quick and skilled." },
      { id: "r34", user: "Lavanya S.", rating: 4, date: "17 June 2026", comment: "Great facial at just ₹499. Rekha is very gentle and thorough. Value for money!" },
      { id: "r35", user: "Kiran M.", rating: 4, date: "10 June 2026", comment: "Affordable hair color that looks premium. Green Trends never disappoints." }
    ]
  },
  {
    id: 14,
    name: "Looks Salon Studio",
    area: "Film Nagar",
    address: "Near Ramanaidu Studios, Film Nagar, Jubilee Hills, Hyderabad",
    rating: 4.6,
    ratingCount: 134,
    priceTier: "₹₹₹",
    priceRange: "₹700 - ₹20,000",
    distance: "2.0 km",
    availabilityBadge: "Few slots left today",
    availabilityType: "limited",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
    about: "Looks Salon is the preferred grooming destination for Tollywood celebrities and film professionals. Located in the heart of Film Nagar, it offers red-carpet-ready styling, cinematic makeup, and exclusive hair treatments used by movie stars.",
    services: [
      { id: "1401", name: "Celebrity Style Haircut", price: 1499, duration: "50 mins", category: "hair" },
      { id: "1402", name: "Film-Grade HD Makeup", price: 5999, duration: "90 mins", category: "bridal" },
      { id: "1403", name: "Platinum Hair Highlights", price: 7999, duration: "150 mins", category: "hair" },
      { id: "1404", name: "Anti-Aging Collagen Facial", price: 4499, duration: "75 mins", category: "skin" },
      { id: "1405", name: "VIP Grooming & Styling Package", price: 2499, duration: "60 mins", category: "grooming" }
    ],
    stylists: [
      {
        id: "s27",
        name: "Chaitanya Reddy",
        role: "Celebrity Hair Architect",
        rating: 4.8,
        reviews: 72,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Personal stylist for Tollywood actors. Known for red carpet looks and editorial styling."
      },
      {
        id: "s28",
        name: "Sravya Nair",
        role: "Makeup & Beauty Director",
        rating: 4.7,
        reviews: 62,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Film industry makeup artist with 10+ years. Expert in cinematic and editorial looks."
      }
    ],
    reviews: [
      { id: "r36", user: "Navya P.", rating: 5, date: "21 June 2026", comment: "Chaitanya styled my hair for a film event and I got so many compliments. True celebrity treatment!" },
      { id: "r37", user: "Aditya Rao", rating: 5, date: "15 June 2026", comment: "The VIP grooming package is incredible. Felt like a movie star walking out." },
      { id: "r38", user: "Reshma D.", rating: 4, date: "08 June 2026", comment: "Sravya's HD makeup lasted the entire wedding day. Premium but absolutely worth it." }
    ]
  },
  {
    id: 15,
    name: "Streax Professional Studio",
    area: "Tolichowki",
    address: "Near Shadan College, Tolichowki Main Road, Tolichowki, Hyderabad",
    rating: 4.4,
    ratingCount: 98,
    priceTier: "₹",
    priceRange: "₹200 - ₹4,000",
    distance: "5.5 km",
    availabilityBadge: "Available today",
    availabilityType: "available",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80",
    about: "Streax Professional Studio brings trendy, affordable hair coloring and styling to Tolichowki. Popular among college students and young professionals, the studio specializes in vibrant global colors, creative streak designs, and express grooming at budget-friendly rates.",
    services: [
      { id: "1501", name: "Trendy Haircut & Style", price: 299, duration: "30 mins", category: "hair" },
      { id: "1502", name: "Streax Vibrant Hair Color", price: 1499, duration: "60 mins", category: "hair" },
      { id: "1503", name: "Creative Streak & Highlight Design", price: 999, duration: "45 mins", category: "hair" },
      { id: "1504", name: "Express Facial & Cleanup", price: 399, duration: "25 mins", category: "skin" },
      { id: "1505", name: "Beard Design & Grooming", price: 249, duration: "20 mins", category: "grooming" }
    ],
    stylists: [
      {
        id: "s29",
        name: "Imran Sheikh",
        role: "Color Specialist",
        rating: 4.5,
        reviews: 54,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Streax-certified colorist known for vibrant fashion colors and creative streak patterns."
      },
      {
        id: "s30",
        name: "Anjali K.",
        role: "Junior Stylist",
        rating: 4.3,
        reviews: 44,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Energetic young stylist passionate about trendy cuts, K-pop styles, and creative hair art."
      }
    ],
    reviews: [
      { id: "r39", user: "Farhan A.", rating: 5, date: "22 June 2026", comment: "Imran did an amazing ash grey color on my hair. Best color job at this price point!" },
      { id: "r40", user: "Manasa T.", rating: 4, date: "16 June 2026", comment: "Super affordable and Anjali is very creative. Got purple streaks and they look fire!" },
      { id: "r41", user: "Raju P.", rating: 4, date: "09 June 2026", comment: "Quick beard grooming and haircut in under 30 minutes. Great value near Shadan College." }
    ]
  }
];

export const MOCK_REVIEWS_DICT = {
  1: [
    "Aura Luxe is phenomenal. The staff treats you like royalty, and the balayage results are stunning.",
    "Very modern setup. Priya listened to exactly what I wanted. Best haircut in Jubilee Hills.",
    "Ayesha is a magician with bridal makeup. It looked fresh and dew-kissed all evening.",
    "Luxurious facial treatment! My skin has never glowed like this. Worth every single rupee.",
    "Premium quality products and exceptional attention to detail. Highly recommend Aura Luxe.",
    "Incredible styling by Priya! She explained how to maintain my layers at home.",
    "Loved the coffee and the cozy styling chairs. Absolute premium feels.",
    "Highly clean, super professional, and Ayesha's skills are absolute gold standard.",
    "Best salon experience in Hyderabad. They took extreme precautions and sanitized everything.",
    "The massage was extremely refreshing. Felt all the stress leave my shoulders."
  ],
  2: [
    "The Golden Mane is my weekly grooming spot. Vikram gives the sharpest fades in Banjara Hills.",
    "Great service! Clean tools, hot towel shave was amazing, and the rates are very reasonable.",
    "Very polite staff. Divya did a wonderful detan facial that felt incredibly refreshing.",
    "Vikram has high precision. Best beard grooming service in the city.",
    "Excellent value for money. The ambiance is masculine-leaning but welcoming to all.",
    "Nice, clean setup. Loved the hot tea and the warm hospitality.",
    "My hair feels incredibly soft after the keratin therapy by Divya.",
    "Quick and professional. Had a premium haircut without spending hours.",
    "Would recommend Vikram to anyone looking for a modern hair change."
  ],
  3: [
    "Ziva Spa is the perfect getaway after a long week of coding. The deep tissue massage was amazing.",
    "Quiet, serene, and absolutely clean. Kiran knows exactly how to release muscle tension.",
    "Loved the Ayurvedic massage. True stress buster near Gachibowli.",
    "The spa manicure was excellent. Meera did a neat job with the gel polish.",
    "Very professional therapist. Kiran is highly knowledgeable about reflexology.",
    "The herbal face polish left my skin feeling very hydrated and bright."
  ],
  4: [
    "Gloss & Glow saved my time. Sneha came fully prepared with sheets, kits, and relaxing tunes.",
    "Super clean home salon! Sneha was very gentle with the waxing and left no mess behind.",
    "Loved the blow-dry and party makeup Sneha did. Got so many compliments!",
    "Rohan gave a very neat trim in the comfort of my home. Excellent safety checks.",
    "Highly convenient for busy weekends. Definitely booking again next month.",
    "The head massage by Sneha was the highlight. Melts away all exhaustion."
  ],
  5: [
    "Urban Shave is highly affordable and efficient. Arjun did a classic fade in under 30 minutes.",
    "No-nonsense clean barbershop. Great face detan and head massage.",
    "Arjun is very friendly and skilled. Prices are unbeatable in Madhapur.",
    "Nice grooming package. Recommended for quick corporate trims."
  ],
  6: [
    "Naturals in Kondapur is my go-to salon. Lakshmi's smoothening treatment is the best in the area.",
    "Very consistent quality across all services. The organic gold facial left my skin radiant.",
    "Mahesh gave me a perfect pompadour. Great men's grooming section here.",
    "Love that they use natural and herbal products. My sensitive skin had zero reactions.",
    "Best value bridal makeup package. Lakshmi handled my engagement look beautifully.",
    "Walk-in friendly and never too crowded. The full body massage was deeply relaxing."
  ],
  7: [
    "Bubbles Banjara Hills is in a league of its own. Neelima's precision cuts are world-class.",
    "The royal bridal suite is an experience. Private room, makeup artist, and refreshments included!",
    "Sameer's L'Oréal color work is outstanding. My balayage looks absolutely natural.",
    "The diamond facial made my skin glow for my reception. Premium products, premium results.",
    "Love the chic, modern interiors. Every visit feels like a luxury retreat.",
    "Balinese massage at Bubbles is heavenly. The therapist knew exactly the right pressure.",
    "A bit expensive but you genuinely get what you pay for. Best salon in Banjara Hills."
  ],
  8: [
    "Lakmé Salon Somajiguda uses genuine Lakmé Absolute products. Fatima's bridal makeup lasted all day.",
    "Arun's hair botox treatment completely transformed my frizzy hair. Silky smooth now!",
    "The Youth Infinity facial is worth every rupee. My fine lines visibly reduced.",
    "Professional setup and well-trained staff. Everything felt very hygienic and organized.",
    "Great location near Raj Bhavan Road. Convenient parking and easy to find.",
    "My mother loved the full body waxing here. Gentle technique and no rashes."
  ],
  9: [
    "YLG's Rica waxing is genuinely painless. Pallavi is the best at it in Kukatpally!",
    "Affordable pricing and clean salon. The hydra boost facial left my skin feeling fresh.",
    "Naveen's textured crop cut was exactly what I showed him from Instagram. Perfect execution.",
    "Great party makeup for my friend's sangeet. Received tons of compliments.",
    "Convenient location near KPHB metro. Walk-in without waiting too long.",
    "The stress relief massage was exactly what I needed after a hectic work week."
  ],
  10: [
    "O2 Spa Begumpet is the ultimate luxury relaxation experience in Hyderabad.",
    "Dr. Ravi's deep tissue massage fixed my chronic back pain. Incredible therapist.",
    "The couple's romance package made our anniversary unforgettable. Steam room included!",
    "Sunita's hot stone therapy transported me to Bali. The essential oils were divine.",
    "Premium ambience with dim lighting, calming music, and heated beds. Pure bliss.",
    "The detox body wrap left my skin feeling silky and refreshed for days."
  ],
  11: [
    "Toni & Guy Jubilee Hills delivers London-quality styling right here in Hyderabad.",
    "Siddharth's precision bob cut is the best I've ever had. True craftsmanship.",
    "Anjali's dimensional coloring technique is art. My hair has beautiful depth and movement.",
    "The Olaplex treatment repaired 2 years of damage. Hair feels brand new.",
    "Kerastase hair spa is luxurious. The scalp massage alone is worth the visit.",
    "Higher prices but the quality gap compared to regular salons is massive."
  ],
  12: [
    "Bodycraft near Paradise is excellent for clinical facials. Dr. Prathima cleared my acne scars.",
    "Ravi Teja's global highlights look very natural. Professional color consultation included.",
    "The full body polishing treatment made my skin incredibly smooth before my wedding.",
    "Clean, well-organized salon with proper consultation before every treatment.",
    "Express bridal makeup was done perfectly in 90 minutes. Great for time-pressed brides."
  ],
  13: [
    "Green Trends Ameerpet is the best budget salon in Hyderabad. ₹199 haircut that looks ₹999!",
    "Suresh is lightning fast with the scissors but very precise. Great for regular trims.",
    "Rekha's de-tan facial at ₹499 is unbeatable value. My face looked visibly brighter.",
    "Perfect for college students. Affordable waxing and hair color without compromise on quality.",
    "Always clean, always professional, always affordable. Green Trends is reliable."
  ],
  14: [
    "Looks Salon in Film Nagar is where Tollywood magic happens. Chaitanya styled me like a star!",
    "The VIP grooming package includes everything — haircut, facial, massage, and styling.",
    "Sravya's HD makeup for my reception was absolutely flawless. She's a true artist.",
    "Platinum highlights by Chaitanya looked incredible under studio lighting. Perfect for events.",
    "Expensive but the celebrity-level service is unmatched. Private styling area available."
  ],
  15: [
    "Streax Studio in Tolichowki is perfect for trendy, affordable hair color experiments.",
    "Imran's ash grey color job was amazing. Got so many compliments at college!",
    "Anjali created the most creative purple streaks. Very artistic and budget-friendly.",
    "Quick beard design in 20 minutes. Imran is very precise with the trimmer.",
    "Best salon near Shadan College. Students get great service at student-friendly prices."
  ]
};
