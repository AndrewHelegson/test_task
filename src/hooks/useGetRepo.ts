import { useState } from "react";
import axios from "axios";
import { setCurrentRepo } from "../store/reposSlice";
import { useAppDispatch } from "../hooks";

const useGetRepo = () => {
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const searchRepository = async (id: string | number | undefined) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query: `
          query repository($id:  ID! ){ 
            node(id: $id){
            ... on Repository {
              id
              name
              pushedAt
              url
              languages(first:10){
                nodes{
                  name
                }
              }
              stargazerCount
              owner{
                avatarUrl
                login
                url
              }
              description
              
            }
          }
        }
        `,
          variables: {
            id: id,
          },
        },
        {
          headers: {
            Authorization: "Bearer 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",
          },
        }
      );
      setRepository(response.data.data.node);
      dispatch(setCurrentRepo(response.data.data.node));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  return { repository, loading, error, searchRepository };
};

export default useGetRepo;
