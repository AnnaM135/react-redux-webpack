import React from 'react';
import "./app.less";
import {useDispatch, useSelector} from "react-redux"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './main/Main.jsx';

function App() {


    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path = "/" element = {<Main/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
