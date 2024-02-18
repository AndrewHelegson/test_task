import { Link } from "react-router-dom";
import "../index.css";
import { RepoItemProps } from "../model";

export default function RepoItem({ repo }: RepoItemProps) {
  const date = new Date(repo.pushedAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    /* second: "2-digit", */
  });
  return (
    <div className="repoItem_container">
      <Link className="repoItem_link" to={`/${repo.id}`}>
        <div className="repoItem_stats">
          <h3 className="repoItem_header">{repo.name}</h3>
          <p>Дата последнего коммита: {formattedDate}</p>
          <p>Рейтинг: {repo.stargazerCount}</p>
        </div>
      </Link>
      <a className="repoItem_url" href={repo.url} target="_blank">
        Ссылка на репозиторий
      </a>
    </div>
  );
}
