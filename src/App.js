import React from 'react';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppFooter from "./components/footer";
import AppHeader from "./components/header";
import PageContent from "./components/pageContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}
export default App;
