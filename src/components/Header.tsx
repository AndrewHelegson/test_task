import { useAppDispatch, useAppSelector } from "../hooks";
import useSearchRepositories from "../hooks/useSearchRepositories";
import { setCurrentPage, setValue } from "../store/reposSlice";
import "../index.css";
import { HeaderProps } from "../model";

export default function Header({ navigate }: HeaderProps) {
  const value = useAppSelector((state) => state.repos.value);
  const dispatch = useAppDispatch();
  const { searchRepositories } = useSearchRepositories();
  const handleClick = () => {
    navigate("/test_task/results");
    dispatch(setCurrentPage(1));
    if (value.trim() === "") navigate("/test_task/");
    searchRepositories(value);
    dispatch(setValue(""));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate("/test_task/results");
      dispatch(setCurrentPage(1));
      if (value === "") navigate("/test_task/");

      searchRepositories(value);

      dispatch(setValue(""));
    }
  };

  return (
    <div className="header_background">
      <div className="header_container">
        <input
          className="header_input"
          type="text"
          placeholder="Введите запрос"
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            dispatch(setValue(e.target.value));
          }}
        />
        <button className="header_button" onClick={() => handleClick()}>
          искать
        </button>
      </div>
    </div>
  );
}
