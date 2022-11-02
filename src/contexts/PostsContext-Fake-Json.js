import React, { createContext, useReducer, useEffect, useState } from 'react';
import { PostsReducer } from '../reducers/PostsReducer';

export const PostsContext = createContext();

function PostsContextProvider(props) {
  const initialState = {
    posts: [],
    isPending: true,
  };
  const [url] = useState(
    'https://jsonplaceholder.typicode.com/posts/?_limit=10'
  );
  const [state, dispatch] = useReducer(PostsReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const json = await res.json();

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          posts: json,
          isPending: false,
        },
      });
    };

    fetchData();
  }, [url]);

  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
