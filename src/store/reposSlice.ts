import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Repo, ReposState } from "../model";
const query = `
query {
            viewer {
              repositories(first: 100) {
                nodes {
                  id
                  name
                  pushedAt
                  stargazerCount
                  url
                }
              }
            }
          }
`;
export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async function () {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  }
);
const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};
const repos =
  localStorage.getItem("repos") !== null
    ? JSON.parse(localStorage.getItem("repos") || "")
    : [];
const page =
  localStorage.getItem("page") !== null
    ? JSON.parse(localStorage.getItem("page") || "")
    : 1;

const initialState: ReposState = {
  repos: [],
  searchedRepos: repos,
  status: null,
  error: null,
  value: "",
  currentRepo: null,
  loading: false,
  currentPage: page,
  reposPerPage: 10,
};
const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setRepos(state, action) {
      state.repos = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    searchRepos(state, action) {
      state.searchedRepos = action.payload;
      localStorage.setItem(
        "repos",
        JSON.stringify(state.searchedRepos.map((r: Repo) => r))
      );
    },
    setCurrentRepo(state, action) {
      state.currentRepo = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      localStorage.setItem("page", JSON.stringify(state.currentPage));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.repos = action.payload.data.viewer.repositories.nodes;
      })
      .addCase(fetchRepos.rejected, setError);
  },
});

export const {
  setRepos,
  setValue,
  searchRepos,
  setCurrentRepo,
  setLoading,
  setCurrentPage,
} = reposSlice.actions;

export default reposSlice.reducer;
