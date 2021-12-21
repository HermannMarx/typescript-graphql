import { createSlice } from "@reduxjs/toolkit";

type State = {
  issues: any;
  filteredIssues: Object[];
};

type SingleIssue = { node: { title: string; body: string } };

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
      state.issues.map((issue: SingleIssue[]) =>
        issue.map((singleIssue: SingleIssue) => {
          if (
            action.payload.length > 3 &&
            (singleIssue.node.title.indexOf(action.payload) !== -1 ||
              singleIssue.node.body.indexOf(action.payload) !== -1)
          )
            filterArray.push(singleIssue.node);
        })
      );
      state.filteredIssues = filterArray;
      console.log("This is filter: ", filterArray);
    },
  },
});

export const Actions = Slice.actions;

export default Slice.reducer;
