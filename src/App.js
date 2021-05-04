import React from "react";
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { useFetch } from "./hooks/useFetch";
import { scaleLinear}  from "d3-scale";
import { extent, max, min, bin } from "d3-array";
// import { vl } from "@vega/vega-lite-api";
// import { vl } from "vega-lite-api";
import ClassExample from "./ClassExample";
import Assignment2 from "./Assignment2";

const App = () => {

  // vl.markBar().data('world-happiness-report-2021.json').encode(
  //   vl.x().fieldQ('Ladder score').bin(true),
  //   vl.y().count()
  // )

  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      
      <main>
          <div>
            <Switch>
              <Route exact path="/"> <ClassExample /> </Route>
              <Route path="/assignment2"> <Assignment2 /> </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </main>
      
    </div>
  );
};

function NavigationBar() {
  return (
    // <Navbar className="navbar" expand="md">
    //   {/* <NavLink className="navbar-brand" exact to="/">
    //     BakeTime
    //   </NavLink> */}
    //   {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <NavLink className="nav-link" exact to="/" >Class Example</NavLink>
    //       <NavLink className="nav-link" to="/assignment2" >Assignment 2</NavLink>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* <NavLink className="navbar-brand" to="/">
          BakeTime
        </NavLink> */}
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
          <div className="navbar-nav">
            <NavLink className="nav-link" exact to="/" >Class Example</NavLink>
            <p></p>
            <NavLink className="nav-link" to="/assignment2" >Assignment 2</NavLink>
          </div>
        {/* </div> */}
      </div>
    </nav>
  );
}

export default App;