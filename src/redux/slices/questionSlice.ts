import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rootstate } from "../store";

type Question = {
  questionNumber: number;
  answer: number;
};

type QuestionState = {
  values: Question[];
};

const initialState: QuestionState = {
  values: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    answerOrEditQuestion: (state, action: PayloadAction<Question>) => {
      const copy = [...state.values];
      const index = copy.findIndex(
        (value) => value.questionNumber === action.payload.questionNumber
      );

      if (index === -1) {
        state.values = [...state.values, action.payload];
      } else {
        copy[index] = action.payload;
        state.values = copy;
      }
    },
  },
});

export const selectQuestion = (state: Rootstate) => state.question.values;
export const { answerOrEditQuestion } = questionSlice.actions;
export default questionSlice.reducer;
