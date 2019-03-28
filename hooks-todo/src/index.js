import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import TodosContext from "./context";
import TodosReducer from "./reducer";
import TodoList from "../src/components/TodoList";
import TodoForm from "../src/components/TodoForm";

// detail of custom hook
const useAPI = endpoint => {
  const [data, setData] = useState([]);

  // connect to API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);
  // custom hook
  const savedTodos = useAPI("https://todos-api-zkjdtcbkvp.now.sh/todos");

  // set into global state
  useEffect(() => {
    dispatch({ type: "GET_TODOS", payload: savedTodos });
  },[savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
if (module.hot) {
    module.hot.accept();
  }