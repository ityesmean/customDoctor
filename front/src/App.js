import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {
  return (
    <>
      <div>Hello</div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
