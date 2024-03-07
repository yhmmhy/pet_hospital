import React from 'react'
import './index.css'
export default function LeftNavigateBar() {
    return (
        <ul>
            <li>
                <img src="./1.ico" alt=""></img>
                <span>欢迎您</span>
            </li>
            <li>
                <a href='javascript:void(0)'>
                    <i class="fa-solid fa-user"></i>
                    <span>用户管理</span>
                </a>
            </li>
            <li>
                <a href='javascript:void(0)'>
                    <i class="fa-solid fa-briefcase-medical"></i>
                    <span>病例管理</span>
                </a>
            </li>
            <li>
                <a href='javascript:void(0)'>
                    <i class="fa-regular fa-file-lines"></i>
                    <span>题库管理</span>
                </a>
            </li>
            <li>
                <a href='javascript:void(0)'>
                    <i class="fa-solid fa-scroll"></i>
                    <span>试卷管理</span>
                </a>
            </li>
        </ul>
    )
}
