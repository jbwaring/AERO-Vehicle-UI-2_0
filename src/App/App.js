import "the-new-css-reset/css/reset.css";
import "./App.css";
import Loader from '../Loader/Loader'
import React from "react";

export default function App() {
    return (
        <div className="viewPort">
            <Loader />
        </div>
    );
}