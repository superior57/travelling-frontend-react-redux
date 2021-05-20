import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "font-awesome/css/font-awesome.min.css";
import ReduxToastr from "react-redux-toastr";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      getState={state => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
