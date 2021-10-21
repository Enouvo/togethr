import React, { Component } from "react";
import { Button } from "antd";
import Home from "./pages/home";
import ProjectDetail from "./pages/project-detail";
import CreateProject from "./pages/create-project";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/top-navigation";
import "./components/page-loader";
import "./pages/dapp";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="flex flex-col h-screen">
        {/* <top-navigation collapse="true" /> */}
        {/* <page-loader id="page-loader" /> */}
        <Header />
        <div className="flex-grow">
          {/* <Home /> */}
          {/* <ProjectDetail /> */}
          <CreateProject />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
