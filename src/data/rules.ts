export type ContributionRules = {
  main: number;
  token: number;
  deadline: string;
};

export const contributionRules: ContributionRules = {
  main: 5000,
  token: 1000,
  deadline: "2026-05-30",
};