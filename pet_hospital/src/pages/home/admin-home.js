import React,{Component} from 'react'
import './home.css'
import Linech from '../../components/charts/linech'
import Piech from '../../components/charts/piech'
import Columnch from '../../components/charts/columech'
import Rosech from '../../components/charts/rosech'
import DualAxesch from '../../components/charts/dualaxesch'
import Areach from '../../components/charts/areach'

export default class Home extends Component{
    render() {
        return(
            <div className="home">
                <h1>
                    欢迎使用虚拟宠物医院后台管理系统
                </h1>
                <div className="charts1">
                    <Linech/>
                    <Piech/>
                    <Columnch/>
                </div>
                <div className="charts2">
                    <Rosech/>
                    <DualAxesch/>
                    <Areach/>
                </div>
            </div>
        )
    }
}