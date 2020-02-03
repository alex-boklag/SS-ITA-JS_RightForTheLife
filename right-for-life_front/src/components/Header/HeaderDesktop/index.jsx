import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { HeaderItem } from "./HeaderItem";
import React from "react";
import './style.css';

export const HeaderDesktop = () => (
  <nav className="hidden lg:block">
    <ul
      className="fixed flex justify-center items-center w-full bg-white shadow-md font-bold text-xl text-gray-600 z-40 h-16">
      <NavLink className="mx-2 cursor-pointer" exact to="/" activeClassName="text-gray-700">
        <img width="40px" src={logo} alt="logo"/>
      </NavLink>

      <HeaderItem to="/help" title="Помощь" color="green"/>
      <HeaderItem to="/animals" title="Питомцы"/>
      <HeaderItem to="/stories" title="Счастливые истории"/>

      <HeaderItem to="/emergency" title="Срочники" color="red"/>
      <HeaderItem to="/news" title="Новости"/>
      <HeaderItem to="/about" title="О нас"/>
    </ul>
  </nav>
);