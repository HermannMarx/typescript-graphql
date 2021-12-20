import { createSlice } from "@reduxjs/toolkit";

type State = {
  issues: any;
};

const initialState = {
  issues: [],
};

const Slice = createSlice({
  name: "Issues",
  initialState: initialState,
  reducers: {
    updateIssues(state: State, action) {
      let newIssues = state.issues;
      newIssues.push(action.payload);
      state.issues = newIssues;
    },
  },
});

export const Actions = Slice.actions;

export default Slice.reducer;
