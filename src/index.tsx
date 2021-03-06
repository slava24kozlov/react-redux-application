import React from "react";
import "./index.css";
import {Provider} from "react-redux";
import store from "./redux/store";
import AppContainer from "./AppContainer";
import {createRoot} from "react-dom/client";

const container = document.getElementById("root") as HTMLElement ;
const root = createRoot(container);
root.render(<Provider store={store}><AppContainer/></Provider>);
