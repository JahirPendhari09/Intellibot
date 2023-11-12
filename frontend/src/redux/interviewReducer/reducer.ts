import {
  POST_STARTINTERVIEW_ERROR,
  POST_STARTINTERVIEW_LOADING,
  POST_STARTINTERVIEW_SUCCESS,
} from "./actionTypes";
interface Action {
  type: string;
  payload?: any;
}
interface Message {
  role: string;
  content: string;
}

interface State {
  isLoading: boolean;
  isError: boolean;
  interviewId: string;//id of the interview going on
  conversation: [];//to display on the screen
  latest:string;
}

const initState: State = {
  isLoading: false,
  isError: false,
  interviewId: "",
  conversation: [],
  latest:""
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};
