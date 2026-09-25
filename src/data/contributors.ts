export interface Contributor {
  id: number;
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
  githubUrl: string;
}

export const coreContributors: Contributor[] = [
  {
    id: 1,
    username: "jakmaz",
    name: "Jakub Mazur",
    role: "Creator & Maintainer",
    avatarUrl: "https://github.com/jakmaz.png",
    githubUrl: "https://github.com/jakmaz",
  },
];
