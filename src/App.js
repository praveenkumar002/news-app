import Login from './components/Login';
import Register from './components/Register';
import NewsPage from "./components/NewsPage";

import { HashRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/news" element={<NewsPage />}></Route>
      </Routes>
    </HashRouter>
    
  );
}

export default App;
