export interface RepoItemProps {
  repo: Repo;
}
export interface HeaderProps {
  navigate: any;
}
export interface PaginationProps {
  reposPerPage: number;
  totalRepos: number;
  paginate: (n: number) => void;
}
export interface Repo {
  description: string;
  id: string;
  languages: {
    nodes: { name: string }[];
  };
  name: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  pushedAt: string;
  stargazerCount: number;
  url: string;
}
export type ReposState = {
  repos: Repo[];
  searchedRepos: Repo[];
  status: null | "rejected" | "loading" | "resolved";
  error: null | string;
  value: string;
  currentRepo: Repo | null;
  loading: boolean;
  currentPage: number;
  reposPerPage: number;
};
