import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className=" bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-bottom h-screen pt-5 flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link
            to="/login"
            className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
