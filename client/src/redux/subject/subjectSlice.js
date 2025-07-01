import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [
    "General",
    "English",
    "Bio",
    "Chemistry",
    "Physics",
    "Science",
    "Math",
    "Social Studies",
    "World History",
    "Land-Based Learning",
  ],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      state.subjects.push(action.payload); // Add the custom subject
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter(subject => subject !== action.payload);
    }
  }
});

export const { addSubject, removeSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
