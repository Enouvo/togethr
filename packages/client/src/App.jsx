import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import './components/page-loader';
import './components/top-navigation';
import CreateProject from './pages/create-project';
import './pages/dapp';
import Home from './pages/home';
import ProjectDetail from './pages/project-detail';
import { UserProvider } from './providers/UserProvider';

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <Switch>
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex-grow">
                <Route path="/" component={Home} exact />
                <Route path="/project-detail" component={ProjectDetail} exact />
                <Route path="/create-project" component={CreateProject} exact />
              </div>
              <Footer />
            </div>
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
