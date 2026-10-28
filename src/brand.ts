export const brand = {
  name: "Marlow",
  legal: "Marlow Distribution",
  publishing: "Marlow Publishing",
  mark: "MARLOW",
  line: "DISTRIBUTION",
  email: "hello@marlow.studio",
  site: "marlow.studio",
  password: "ChangeMe123!",
} as const;

export const demoAccounts = [
  {
    role: "Artist",
    email: "artist@marlow.studio",
    password: brand.password,
  },
  {
    role: "Distributor",
    email: "distributor@marlow.studio",
    password: brand.password,
  },
  {
    role: "Admin",
    email: "admin@marlow.studio",
    password: brand.password,
  },
  {
    role: "Accountant",
    email: "accountant@marlow.studio",
    password: brand.password,
  },
] as const;
