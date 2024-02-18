import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRepos, setCurrentPage } from "../store/reposSlice";
import Pagination from "../components/Pagination";
import RepoItem from "../components/RepoItem";
import Loader from "../components/Loader";
import { Repo } from "../model";

export default function HomePage() {
  const repos = useAppSelector((state) => state.repos.repos);
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  const reposPerPage = useAppSelector((state) => state.repos.reposPerPage);

  const dispatch = useAppDispatch();
  const lastRepoIndex = currentPage * reposPerPage;
  const firstRepoIndex = lastRepoIndex - reposPerPage;
  const currentRepo = repos.slice(firstRepoIndex, lastRepoIndex);
  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const loading = useAppSelector((state) => state.repos.status);
  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);
  if (loading === "loading") return <Loader />;
  if (repos)
    return (
      <div>
        {currentRepo.map((repo: Repo) => {
          //описать, что это тип репозитория
          return <RepoItem key={repo.id} repo={repo} />;
        })}
        <Pagination
          paginate={paginate}
          reposPerPage={reposPerPage}
          totalRepos={repos?.length}
        />
      </div>
    );
}
