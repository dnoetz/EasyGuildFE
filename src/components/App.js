import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import store from './slices/store';
import Layout from './Layout';
import Home from './Home';
import Roster from './Roster';
import GuildLogs from './GuildLogs';
import NoPage from './NoPage';
import Signup from './Signup';
import Login from './Login';
import { loadAuthenticationFromCookies } from './slices/authSlice';



function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      {React.useEffect(() => {
          store.dispatch(loadAuthenticationFromCookies());
        }, [])}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="roster" element={<Roster />} />
            <Route path="guild-logs" element={<GuildLogs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
