import React, { Component,useState } from 'react'

import imgmap from '../../assets/地图.png'
import imgw1 from "../../assets/w2.png"
import imgw2 from "../../assets/w3.png"
import dangan from "../../assets/dangan.png"
import shoushu from "../../assets/shoushu.png"
import "./index.css"
import zhuyuan from "../../assets/zhuyuan.png"
import jiancha from "../../assets/jiancha.png"
import sszbs from "../../assets/sszbs.png"
import yaofang from "../../assets/yaofang.png"
import zhushe from "../../assets/zhushe.png"
import huayan from "../../assets/huayan.png"
import chuzhi from "../../assets/chuzhi.png"
import yingxiang from "../../assets/yingxiang.png"
import mianyi from "../../assets/mianyi.png"
import ic from '../../assets/1.ico'
import qt from '../../assets/qt.svg'
import { useLocation } from 'react-router-dom'



interface MyComponentState {
  isContentVisible:boolean;
  isContentVisible1: boolean;
  isContentVisible2: boolean;
  isContentVisible3: boolean;
  isContentVisible4: boolean;
  isContentVisible5: boolean;
  isContentVisible6: boolean;
  isContentVisible7: boolean;
  isContentVisible8: boolean;
  isContentVisible9: boolean;
  isContentVisible10: boolean;
  isContentVisible11: boolean;
  isContentVisible12: boolean;
  isContentVisible13: boolean;
}

export default class BasicTable extends Component<{},MyComponentState> {
  
  constructor(props:any) {  
    super(props);  
    this.state = {  
      isContentVisible: false, // 初始状态为隐藏内容
      isContentVisible1:true,
      isContentVisible2:false,
      isContentVisible3:false,
      isContentVisible4:false,
      isContentVisible5:false,
      isContentVisible6:false,
      isContentVisible7:false,
      isContentVisible8:false,
      isContentVisible9:false,
      isContentVisible10:false,
      isContentVisible11:false,
      isContentVisible12:false,
      isContentVisible13:false
      
    };  
  }  
  
  componentDidMount() {
   
  
    // let queryString = window.location.search;
    // let params = new URLSearchParams(queryString);
    // let text = params.get('params'); 
     // Get the full URL including hash fragment
     let urlWithHash = window.location.href;

     // Extract the query string from the URL
     let queryStringIndex = urlWithHash.indexOf('?');
     let queryString = queryStringIndex !== -1 ? urlWithHash.substring(queryStringIndex + 1) : '';
 
     // Parse the query string
     let params = new URLSearchParams(queryString);
 
     // Retrieve the value of the 'params' parameter
     let text = params.get('params'); 
    console.log(text); 
    switch(text){
      case '0':
        this.setState({
          isContentVisible1:false,
          isContentVisible2:true,
          isContentVisible4:false
        })
        break;
      case '1':
        this.setState({  
          isContentVisible: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible5:false
        });
      break;
      case '2':
        this.setState({  
          isContentVisible3: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible6:false
        });
      break
      case '3':
        this.setState({  
          isContentVisible4: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible7:false
        });
      break
      case '4':
        this.setState({  
          isContentVisible5: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible8:false
        });
      break
      case '5':
        this.setState({  
          isContentVisible6: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible9:false
        });
      break
      case '6':
        this.setState({  
          isContentVisible7: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible10:false
        });
      break
      case '7':
        this.setState({  
          isContentVisible8: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible11:false
        });
      break
      case '8':
        this.setState({  
          isContentVisible9: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible12:false
        });
      break
      case '9':
        this.setState({  
          isContentVisible10: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible13:false
        });
      break
      case '10':
        this.setState({  
          isContentVisible11: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible:false
        });
      break
      case '11':
        this.setState({  
          isContentVisible12: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible2:false
        });
      break
      case '12':
        this.setState({  
          isContentVisible13: true, // 切换内容的可见性  
          isContentVisible1:false,
          isContentVisible3:false
        });
      break
      case '13':
        this.setState({  
          isContentVisible: false, // 初始状态为隐藏内容
          isContentVisible1:true,
          isContentVisible2:false,
          isContentVisible3:false,
          isContentVisible4:false,
          isContentVisible5:false,
          isContentVisible6:false,
          isContentVisible7:false,
          isContentVisible8:false,
          isContentVisible9:false,
          isContentVisible10:false,
          isContentVisible11:false,
          isContentVisible12:false,
          isContentVisible13:false
        });
      break
    }
  }  

  render() {
    const handleClick = () => {  
      //  alert('按钮被点击了！');
       this.setState({
         isContentVisible1:false,
         isContentVisible2:true,
         isContentVisible4:false
       })
     }
    const handleClick1 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible5:false
      });
     }
     const handleClick2 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible3: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible6:false
      });
     }
     const handleClick3 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible4: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible7:false
      });
     }
     const handleClick4 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible5: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible8:false
      });
     }
     const handleClick5 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible6: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible9:false
      });
     }
     const handleClick6 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible7: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible10:false
      });
     }
     const handleClick7 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible8: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible11:false
      });
     }
     const handleClick8 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible9: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible12:false
      });
     }
     const handleClick9 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible10: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible13:false
      });
     }
     const handleClick10 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible11: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible:false
      });
     }
     const handleClick11 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible12: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible2:false
      });
     }
     const handleClick12 = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible13: true, // 切换内容的可见性  
        isContentVisible1:false,
        isContentVisible3:false
      });
     }
     const handleBack = () => {  
      //  alert('按钮被点击了！');
       this.setState({  
        isContentVisible: false, // 初始状态为隐藏内容
        isContentVisible1:true,
        isContentVisible2:false,
        isContentVisible3:false,
        isContentVisible4:false,
        isContentVisible5:false,
        isContentVisible6:false,
        isContentVisible7:false,
        isContentVisible8:false,
        isContentVisible9:false,
        isContentVisible10:false,
        isContentVisible11:false,
        isContentVisible12:false,
        isContentVisible13:false
      });
     }

    return (
      <div className="App">  
      <header className="App-header">  
        {/* <h1>返回</h1>     */}
      </header>
    

      <div className='photoImg'>
        {this.state.isContentVisible1 && (  
            <img src={imgmap} />
          )} 
          <div className="selectDiv">
            <img src={qt} className="icon" />
            <div></div>
            <select id="skills" name="skills" className='selectChar'>
              <option value="qt">前台</option>
              <option value="ys">兽医</option>
              <option value="zs">助手</option>
            </select><br/><br/><br/><br/>
            <div></div>
          </div>
          {this.state.isContentVisible2 && (  
           <div>
              
           <h1  className='one1'onClick={handleBack}>返回</h1>
            <div className='two' onClick={handleClick11}>去处置室</div>
            <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
        
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three'src={imgw1}/>
          </div>
            
        )}
          {this.state.isContentVisible && ( 
       <div>
              
       <h1  className='one1'onClick={handleBack}>返回</h1>
               <div className='two' onClick={handleClick10}>去影像室</div>
               <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three'src={imgw2}/>
            </div> 
            
        )}
         {this.state.isContentVisible3 && ( 
              <div>
              
              <h1  className='one1'onClick={handleBack}>返回</h1>
               <div className='two' onClick={handleClick12}>去免疫室</div>
               <div className='four'>操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three'  src={dangan} />
            </div> 
            
        )}
          {this.state.isContentVisible4 && ( 
            
             
            <div>
              
              <h1  className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick}>去前台</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three'src={shoushu}  />
            </div> 
                
        )}
          {this.state.isContentVisible5 && ( 
            <div >
              <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick1}>去诊室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={jiancha} />
            </div> 
            
        )}
        {this.state.isContentVisible6 && ( 
            <div >
               <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick2}>去档案室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={zhuyuan} />
            </div> 
            
        )}
          {this.state.isContentVisible7 && ( 
            <div>
              <h1 className='one1' onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick3}>去手术室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={sszbs} />
            </div> 
            
        )}
         {this.state.isContentVisible8 && ( 
            <div >
              <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick4}>去检查室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={zhushe} />
            </div> 
            
        )}
        {this.state.isContentVisible9 && ( 
            <div >
              <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick5}>去住院部</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={yaofang} />
            </div> 
            
        )}
        {this.state.isContentVisible10 && ( 
            <div>
              <h1  className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick6}>去准备室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={huayan} />
            </div> 
            
        )}
         {this.state.isContentVisible11 && ( 
            <div>
              <h1  className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick7}>去注射室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={yingxiang} />
            </div> 
            
        )}
         {this.state.isContentVisible12 && ( 
            <div >
              <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick8}>去药房</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={chuzhi} />
            </div> 
            
        )}
        {this.state.isContentVisible13 && ( 
            <div >
              <h1 className='one1'onClick={handleBack}>返回</h1>
              <div className='two' onClick={handleClick9}>去化验室</div>
              <div className='four' >操作台</div>
            <div className='b1' onClick={()=>{}}>功能说明</div>
            <div className='b2' onClick={()=>{}}>操作流程</div>
            <div className='b3' onClick={()=>{}}>演示动画</div>
              <img  className='three' src={mianyi} />
            </div> 
            
        )}
          {/* <img src={imgw2}/> */}
          <div className='qiantai' onClick={handleClick}></div>
          <div className='zhenshi' onClick={handleClick1}></div>
          <div className='dangan' onClick={handleClick2}></div>
          <div className='shoushu' onClick={handleClick3}></div>
          <div className='jiancha' onClick={handleClick4}></div>
          <div className='zhuyuan' onClick={handleClick5}></div>
          <div className='sszbs' onClick={handleClick6}></div>
          <div className='zhushe' onClick={handleClick7}></div>
          <div className='yaofang' onClick={handleClick8}></div>
          <div className='huayan' onClick={handleClick9}></div>
          <div className='yingxiang' onClick={handleClick10}></div>
          <div className='chuzhi' onClick={handleClick11}></div>
          <div className='mianyi' onClick={handleClick12}></div>
         
          </div>
  </div>
   )
    
  }
}