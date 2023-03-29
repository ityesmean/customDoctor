import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';

// const root = document.getElementById('root');
// render(
//   <RecoilRoot>
//     <App />
//   </RecoilRoot>,
//   root,
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
