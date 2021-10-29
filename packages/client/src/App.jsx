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
import { ProjectsProvider } from './providers/ProjectProvider';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
class App extends Component {
  render() {
    return (
      <UserProvider>
        <ProjectsProvider>
          <Router>
            <Switch>
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-grow">
                  <Route path="/" component={Home} exact />
                  <PrivateRoute path="/projects/:id" component={ProjectDetail} exact />
                  <PrivateRoute path="/create-project" component={CreateProject} exact />
                </div>
                <Footer />
              </div>
            </Switch>
          </Router>
        </ProjectsProvider>
      </UserProvider>
    );
  }
}

export default App;
