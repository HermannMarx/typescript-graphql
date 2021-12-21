import { createSlice } from "@reduxjs/toolkit";

type State = {
  issues: any;
  filteredIssues: Object[];
};

type SingleIssue = { node: { title: string; body: string; state: string } };

const initialState = {
  issues: [],
  filteredIssues: [],
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
    filterIssues(state: State, action) {
      let filterArray: Object[] = [];
      state.filteredIssues = filterArray;
      state.issues.map((issue: SingleIssue[]) =>
        issue.map((singleIssue: SingleIssue) => {
          if (
            action.payload.term.length > 3 &&
            (singleIssue.node.title.indexOf(action.payload.term) !== -1 ||
              singleIssue.node.body.indexOf(action.payload.term) !== -1) &&
            singleIssue.node.state === action.payload.status
          ) {
            filterArray.push(singleIssue.node);
          } else if (action.payload.term.length <= 3) filterArray = [];
        })
      );
      state.filteredIssues = filterArray;
    },
  },
});

export const Actions = Slice.actions;

export default Slice.reducer;
