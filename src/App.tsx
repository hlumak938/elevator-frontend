import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import pages from './constants';
import { SnackbarProvider } from './pages/SnackbarContext';

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Routes>
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={<page.component />} />
          ))}
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
