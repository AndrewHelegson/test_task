import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetRepo from "../hooks/useGetRepo";
import { useAppSelector } from "../hooks";
import Loader from "../components/Loader";

export default function Repo() {
  const { id } = useParams();
  const { loading, searchRepository } = useGetRepo();
  const repo = useAppSelector((state) => state.repos.currentRepo);
  useEffect(() => {
    searchRepository(id);
  }, []);
  let formattedDate = "";
  if (repo) {
    const date = new Date(repo?.pushedAt);
    formattedDate = date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      /* second: "2-digit", */
    });
  }

  if (loading) return <Loader />;
  if (repo) {
    return (
      <div className="repo">
        <img src={repo.owner.avatarUrl} alt="" />
        <h3>{repo.name}</h3>
        <p>
          Автор:
          <a href={repo.owner.url} target="_blank">
            <b> {repo.owner.login}</b>
          </a>
        </p>

        <p>
          Рейтинг: &ensp; <span>{repo.stargazerCount}</span>
        </p>
        <p>
          Последний комит:&ensp; <span>{formattedDate}</span>
        </p>
        <p>
          Языки:&emsp;
          {repo.languages.nodes.length === 0 ? (
            <span>не указано</span>
          ) : (
            repo.languages.nodes.map((lang: { name: string }) => (
              <span key={lang.name}>{lang.name} </span>
            ))
          )}
        </p>
        <p>
          <b>Описание:</b>
          <br />
          {repo.description}
        </p>
      </div>
    );
  }
}
