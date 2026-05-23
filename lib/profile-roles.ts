export const PROFILE_ROLES = {
  primary: "Technical Product Manager",
  secondary: [
    "AI Integration Leader",
    "Web Engineer Specialist",
    "Data Analytics",
  ],
  constellation: {
    engineering: "Web Engineer Specialist",
    product: "Technical Product Manager",
  },
  orbitShort: {
    engineering: "Web Eng.",
    product: "Tech PM",
  },
} as const;

export type RoleTag = "tpm" | "ai" | "web" | "data";
