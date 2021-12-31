import { ADD_COMMENT } from "constants/global";

const initialState = {
  comment: "",
  list: [],
};

// const nextTodoId = (todos) => {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
//   return maxId + 1;
// };

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      const newList = [...state.list];
      newList.push(action.payload);
      return {
        ...state,
        comment: action.payload.comment,
        list: newList,
      };
    }

    default:
      return state;
  }
};

export default commentReducer;
