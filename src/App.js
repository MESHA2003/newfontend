import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import DiaryList from "./Page/DiaryList";
import Home from "./Page/Home";
import Register from "./Page/Register";
import "toastr/build/toastr.min.css";
import PrivateRoute from "./component/PrivateRoutes";
import Searchbar from  "./Page/Searchbar";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
      
          <Route path="/diary" element={<DiaryList />} />
          <Route path="/Searchbar" element={<Searchbar />} />
          

        </Route>
      </Routes>
    </div>
  );
}

export default App;
