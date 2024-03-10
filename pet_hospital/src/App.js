import React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import './App.css'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Examination from './components/Examination'
import LeftNavigateBar from './components/LeftNavigateBar'

export default class App extends Component{
    render() {
        return (
            // <div className='app'>
            //     <label></label>
            //     <LeftNavigateBar/>
            //     <Examination/>
            // </div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path = '/login' Component={Login}></Route>
                        <Route path = '/Admin' Component={Admin}></Route>
                    </Routes>
                    系统首页
                    <a href='/login'>
                        登录页面
                    </a>
                    <a href = '/admin'>
                        后台管理页面
                    </a>

                </div>
            </BrowserRouter>
        )
    }


}
