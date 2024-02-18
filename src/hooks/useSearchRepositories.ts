import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { searchRepos, setLoading } from "../store/reposSlice";

const useSearchRepositories = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.repos.loading);
  const [searchResults] = useState(null);
  const [error, setError] = useState(null);
  const searchRepositories = async (searchQuery: string) => {
    dispatch(setLoading());
    setError(null);
    try {
      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query: `
              query {
                search(query: "${searchQuery}", type: REPOSITORY, first: 100) {
                  nodes {
                    ... on Repository {
                      id
                      name
                      pushedAt
                      stargazerCount
                      url
                    }
                  }
                }
              }
            `,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SOME_KEY}`,
          },
        }
      );

      /* setSearchResults(response.data.data.search.nodes); */
      dispatch(searchRepos(response.data.data.search.nodes));
    } catch (error: any) {
      setError(error.message);
    }
    dispatch(setLoading());
  };
  return { searchResults, loading, error, searchRepositories };
};

export default useSearchRepositories;
