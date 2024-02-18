import { useAppSelector } from "../hooks";
import { PaginationProps } from "../model";

export default function Pagination({
  reposPerPage,
  totalRepos,
  paginate,
}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }
  const currentPage = useAppSelector((state) => state.repos.currentPage);
  return (
    <div className="pagination">
      <ul>
        {pageNumbers.map((number) => (
          <a
            style={{ cursor: "pointer" }}
            key={number}
            onClick={() => paginate(number)}
          >
            <li className={currentPage === number ? "active" : ""}>{number}</li>
          </a>
        ))}
      </ul>
    </div>
  );
}
