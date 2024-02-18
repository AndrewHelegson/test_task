import { useAppDispatch, useAppSelector } from "../hooks";
import RepoItem from "../components/RepoItem";
import Pagination from "../components/Pagination";
import { setCurrentPage } from "../store/reposSlice";
import Loader from "../components/Loader";
import Empty from "../components/Empty";

export default function Results() {
  const dispatch = useAppDispatch();
  const repos = useAppSelector((state) => state.repos.searchedRepos);
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  const reposPerPage = useAppSelector((state) => state.repos.reposPerPage);
  const lastRepoIndex = currentPage * reposPerPage;
  const firstRepoIndex = lastRepoIndex - reposPerPage;
  const currentRepo = repos.slice(firstRepoIndex, lastRepoIndex);
  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const loading = useAppSelector((state) => state.repos.loading);
  if (loading) {
    return <Loader />;
  }
  if (repos.length === 0) {
    return <Empty />;
  }
  if (repos) {
    return (
      <div>
        <div>
          {repos.length > 0 &&
            currentRepo.map((repo: any) => (
              <RepoItem key={repo.url} repo={repo} />
            ))}
          <Pagination
            paginate={paginate}
            reposPerPage={reposPerPage}
            totalRepos={repos?.length}
          />
        </div>
      </div>
    );
  }
}
