import React from "react";
import { Carousel, Slider } from 'antd';
import img1 from '../assets/i8EEHJBYzr.jpg'
import img2 from '../assets/FrEDX2cVJB.jpg'
import img3 from '../assets/PI46xkbvuU.jpg'
import img4 from '../assets/rBivN0dYA6.jpg'

const Home: React.FC = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center"}}>
                欢迎使用虚拟宠物医院学习系统！
            </h1>
            <hr></hr>
            <Carousel autoplay autoplaySpeed={1500} effect="fade" >
                <div>
                    <h3 style={{display:"flex", alignItems: "center" ,justifyContent:"center"}}>
                        <img src={img1}></img>
                    </h3>
                </div>
                <div>
                    <h3 style={{display:"flex", alignItems: "center" ,justifyContent:"center"}}>
                        <img src={img2}></img>
                    </h3>
                </div>
                <div>
                    <h3 style={{display:"flex", alignItems: "center" ,justifyContent:"center"}}>
                        <img src={img3}></img>
                    </h3>
                </div>
                <div>
                    <h3 style={{display:"flex", alignItems: "center" ,justifyContent:"center"}}>
                        <img src={img4}></img>
                    </h3>
                </div>
            </Carousel>
        </div>

    )
}
export default Home