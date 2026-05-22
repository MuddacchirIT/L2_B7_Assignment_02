export const USER_ROLE = {
  user: "user",
  contributor: "contributor",
  maintainer: "maintainer",
} as const;
export type ROLES = "contributor" | "maintainer" | "user";
