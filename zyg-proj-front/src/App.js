import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";

export default function App() {
  return (
    <Routes>
      <Route exact path = "/" element = {<HomePage/>} />
      <Route path = "/employees" element = {<ListPage/>}/>
      <Route path = "/add-employee" element = {<AddPage/>}/>
      <Route path = "/edit-employee/:id" element = {<EditPage/>}/>
    </Routes>
  );
}


