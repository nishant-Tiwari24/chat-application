import React from 'react';
import Chat from './component/Chat';
import Join from './component/Join';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Join/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
