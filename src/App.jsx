import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "./store";

import Header from "./components/header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserPage from "./components/userpage/UserPage";
import MainPage from "./components/mainpage/MainPage";
import SelectedAdvert from "./components/selectedadvert/SelectedAdvert";
import EditAdvert from "./components/selectedadvert/EditAdvert";
import FavoriteAdverts from "./components/userpage/FavoriteAdverts";
import MyAdverts from "./components/userpage/MyAdverts";
import MyAppointments from "./components/appointment/MyAppointments";
import SearchedBy from "./components/mainpage/SearchedBy";

import "bootstrap/dist/css/bootstrap.css";


// toast handler
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListNow from "./components/addnewadvert/ListNow";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <Switch>
          <Route path="/myadverts" component={MyAdverts} />
          <Route path="/favorites" component={FavoriteAdverts} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserPage} />
          <Route path="/post" component={ListNow} />
          <Route path="/advert/:id" component={SelectedAdvert} />
          <Route path="/x-for-sale/:id" component={SelectedAdvert} />
          <Route path="/edit/x-for-sale/:id" component={EditAdvert} />
          <Route path="/appointment" exact component={MyAppointments} />
          <Route path="/search/:keyword/:value" component={SearchedBy} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Provider>
    );
  }
}

export { App };