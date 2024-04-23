import { Component } from 'react'
import imgmap from '../../assets/地图.png'
import ys from '../../assets/ys.svg'
import qt from '../../assets/qt.svg'
import zs from '../../assets/zs.svg'
import shoushu from '../../assets/quanjing/shoushu1.png'
import qiantai from '../../assets/quanjing/qiantai.png'
import chuzhi from '../../assets/quanjing/chuzhi1.jpg'
import yingxiang from '../../assets/quanjing/yingxiang1.jpg'
import zhenshi from '../../assets/quanjing/zhenshi1.png'
import sszbs from '../../assets/quanjing/sszbs1.jpg'
import yaofang from '../../assets/quanjing/yaofang1.jpg'
import dangan from '../../assets/quanjing/dangan1.jpeg'
import jiancha from '../../assets/quanjing/jiancha1.png'
import huayan from '../../assets/quanjing/huayan1.jpg'
import zhuyuan from '../../assets/quanjing/zhuyuan1.jpg'
import mianyi from '../../assets/quanjing/mianyi.jpg'
import zhushe from '../../assets/quanjing/zhushe1.jpg'
import "./index.css"


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as THREE from "three"
import { loadRoomDataAPI } from '../../services/caseManage'
import { Modal,Image } from 'antd'

interface MyComponentState {
  imgShow: boolean;
  openGL: boolean;
  openLC: boolean;
  openDH: boolean;
  openTip: boolean;
}

interface KeShi {
  can_view: number;
  department_info: string;
  id: number;
  name: string;
  picture: Array<string>
  video: Array<string>
}
export default class BasicTable extends Component<{}, MyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      imgShow: true,
      openGL: false,
      openLC: false,
      openDH: false,
      openTip: false,
    }
    this.animate()
  }
  src = ''
  target = '诊室'
  nowWhere = '诊室'
  targetNum = 0
  nowNum = 100
  forwardSelect = 'qt'
  sceneInitialized = false
  container: HTMLElement | null = null
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 2, 250);
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  geometry: THREE.SphereGeometry = new THREE.SphereGeometry(3, 32, 32);
  material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
  sphere: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  KeShiInfo: Array<KeShi> = []
  KeShiInfoItem: KeShi = {
    can_view: 0,
    department_info: "",
    id: 0,
    name: "",
    picture: [],
    video: [],
  }
  //1代表可以访问，0代表不可以访问
  RoleQt:Array<number> = [1, 0, 0, 0, 0, 0, 1, 0, 0,0,0,0]
  RoleYs:Array<number> = [0, 1, 1, 1, 1, 1, 0, 1, 1,1,0,1]
  RoleZs:Array<number> = [0, 0, 1, 0, 0, 1, 0, 1, 1,1,1,1]


  componentDidMount() {
    let selectElement: any = document.getElementById('characters');
    selectElement.addEventListener('change', () => {
      this.changeChar()
    }
    );

    this.handleParams()

    loadRoomDataAPI().then((res) => {
      this.KeShiInfo = res.departments
      console.log(this.KeShiInfo[0])
    }).catch((error) => {
      console.error("Error", error)
    })
  }

  changeChar() {
    let selectElement: any = document.getElementById('characters');
    // 获取当前选择的值
    let selectedValue: any = selectElement.value;
    // 获取图片元素
    let imgElement: any = document.querySelector('.icon');
    console.log(this.nowNum)
    // 根据不同的选择值，更新图片的src属性
    switch (selectedValue) {
      case 'qt':
        if (this.RoleQt[this.nowNum] == 0) {
          selectElement.value = this.forwardSelect
          this.setState({
            openTip: true
          })
          return
        }
        imgElement.src = qt
        this.forwardSelect = 'qt'
        break;
      case 'ys':
        if (this.RoleYs[this.nowNum] == 0) {
          selectElement.value = this.forwardSelect
          this.setState({
            openTip: true
          })
          return
        }
        imgElement.src = ys
        this.forwardSelect = 'ys'
        break;
      case 'zs':
        if (this.RoleZs[this.nowNum] == 0) {
          selectElement.value = this.forwardSelect
          this.setState({
            openTip: true
          })
          return
        }
        imgElement.src = zs
        this.forwardSelect = 'zs'
        break;
      default:
        imgElement.src = qt
        break;
    }
  }


  handleParams() {
    let url = new URL(window.location.href);
    // 定义查询参数的名称
    let paramName = 'params';
    let regex = new RegExp(`${paramName}=([^&#]*)`);
    let match = regex.exec(url.href);
    let paramsValue = match ? decodeURIComponent(match[1]) : null;

    if (paramsValue != null) {
      // this.sceneInitialized = false;
      this.handleClick(parseInt(paramsValue))
    } else {
      this.handleClick(20)
    }
  }

  componentDidUpdate() {
    if (!this.state.imgShow) {
      this.renderImg()
    }
  }

  clickModal(modelType: any, type: number) {
    console.log(this.KeShiInfo)
    // this.KeShiInfoItem = this.KeShiInfo[type+1]
    // console.log(this.KeShiInfoItem)
    switch (type) {
      case 0:
        //传入的type是this.nowNum,根据nowNum确定科室，然后从console.log(this.KeShiInfo)打印的找到对应的数组用[]来选择就行
        this.KeShiInfoItem = this.KeShiInfo[0]
        break
      case 1:
        this.KeShiInfoItem = this.KeShiInfo[2]

        break
      case 2:
        this.KeShiInfoItem = this.KeShiInfo[10]
        break
      case 3:
        this.KeShiInfoItem = this.KeShiInfo[11]
        break
      case 4:
        this.KeShiInfoItem = this.KeShiInfo[6]
        break
      case 5:
        this.KeShiInfoItem = this.KeShiInfo[12]
        break
      case 6:
        this.KeShiInfoItem = this.KeShiInfo[1]
        break
      case 7:
        this.KeShiInfoItem = this.KeShiInfo[9]
        break
      case 8:
        this.KeShiInfoItem = this.KeShiInfo[8]
        break
      case 9:
        this.KeShiInfoItem = this.KeShiInfo[4]
        break
      case 10:
        this.KeShiInfoItem = this.KeShiInfo[5]
        break
      case 11:
        this.KeShiInfoItem = this.KeShiInfo[7]
        break
      case 12:
        this.KeShiInfoItem = this.KeShiInfo[3]
        break


    }
    this.setState({
      openGL: modelType == 0 ? true : false,
      openLC: modelType == 1 ? true : false,
      openDH: modelType == 2 ? true : false
    });
  }

  handleClick(type: any) {
    switch (type) {
      case 0:
        //前台
        this.target = '诊室'; this.targetNum = 1; this.src = qiantai; this.nowNum = 0
        break
      case 1:
        //诊室
        this.target = '准备室'; this.targetNum = 2; this.src = zhenshi; this.nowNum = 1
        break
      case 2:
        this.target = '手术室'; this.targetNum = 3; this.src = sszbs; this.nowNum = 2
        break

      case 3:
        //手术室
        this.target = '检查室'; this.targetNum = 4; this.src = shoushu; this.nowNum = 3
        break
      case 4:
        //手术室
        this.target = '住院室'; this.targetNum = 5; this.src = jiancha; this.nowNum = 4
        break
      case 5:
        //手术室
        this.target = '档案室'; this.targetNum = 6; this.src = zhuyuan; this.nowNum = 5
        break
      case 6:
        //手术室
        this.target = '注射室'; this.targetNum = 7; this.src = dangan; this.nowNum = 6
        break
      case 7:
        //手术室
        this.target = '药房'; this.targetNum = 8; this.src = zhushe; this.nowNum = 7
        break
      case 8:
        //手术室
        this.target = '化验室'; this.targetNum = 9; this.src = yaofang; this.nowNum = 8
        break
      case 9:
        //手术室
        this.target = '影像室'; this.targetNum = 10; this.src = huayan; this.nowNum = 9
        break
      case 10:
        //影像室
        this.target = '前台'; this.targetNum = 0; this.src = yingxiang; this.nowNum = 10
        break
      case 11:
        //处置室
        this.target = '前台'; this.targetNum = 0; this.src = chuzhi; this.nowNum = 11
        break
      case 12:
        //处置室
        this.target = '前台'; this.targetNum = 0; this.src = mianyi; this.nowNum = 12
        break
      case 20:
        this.sceneInitialized = false
        break
    }
    this.setState({
      imgShow: type == 20 ? true : false
    });
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.geometry = new THREE.SphereGeometry(5, 32, 32);
    this.material = new THREE.MeshBasicMaterial({ side: THREE.FrontSide });
    this.sphere = new THREE.Mesh(this.geometry, this.material);

    this.camera.position.set(0, 0, 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = 'renderer';
    this.container = document.getElementById('quanjingtu');
    if (this.container) this.container.appendChild(this.renderer.domElement)

    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.sphere.geometry.scale(1, 1, -1)
    this.scene.add(this.sphere);
    this.sceneInitialized = true;
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate)
  }

  renderImg() {
    if (!this.sceneInitialized) {
      this.initScene();
    }
    this.material.map = new THREE.TextureLoader().load(this.src)
  }
  handleCancel() {
    this.setState({
      openGL: false,
      openDH: false,
      openLC: false,
      openTip: false,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className='photoImg'>
          {this.state.imgShow && <img src={imgmap} />}
        </div>
        <div className="selectDiv">
          <img src={qt} className="icon" />
          <select id="characters" name="characters" className='selectChar'>
            <option value="qt">前台</option>
            <option value="ys">兽医</option>
            <option value="zs">助手</option>
          </select><br /><br /><br /><br />
        </div>

        {this.state.imgShow &&
          <div className='entrys'>
            <div className='qiantai' onClick={() => this.handleClick(0)}></div>
            <div className='zhenshi' onClick={() => this.handleClick(1)}></div>
            <div className='sszbs' onClick={() => this.handleClick(2)}></div>
            <div className='shoushu' onClick={() => this.handleClick(3)}></div>
            <div className='jiancha' onClick={() => this.handleClick(4)}></div>
            <div className='zhuyuan' onClick={() => this.handleClick(5)}></div>
            <div className='dangan' onClick={() => this.handleClick(6)}></div>
            <div className='zhushe' onClick={() => this.handleClick(7)}></div>
            <div className='yaofang' onClick={() => this.handleClick(8)}></div>
            <div className='huayan' onClick={() => this.handleClick(9)}></div>
            <div className='yingxiang' onClick={() => this.handleClick(10)}></div>
            <div className='chuzhi' onClick={() => this.handleClick(11)}></div>
            <div className='mianyi' onClick={() => this.handleClick(12)}></div>
          </div>
        }


        {!this.state.imgShow &&
          <div id="quanjingtu" className='quanjingtu'></div>
        }


        {!this.state.imgShow &&
          <div className='buttons'>
            <div className='buttons-top'>
              <div className='buttonsItem' onClick={() => this.handleClick(20)}>返回</div>
              <div className='buttonsItem' onClick={() => this.handleClick(this.targetNum)}>去{this.target}</div>
            </div>
            <div className='czt'>
              <div className='labelCZT'>操作台</div>
              <div className='buttons-bottom'>
                <div className='buttonsItem' onClick={() => this.clickModal(0, this.nowNum)}>功能说明</div>
                <div className='buttonsItem' onClick={() => this.clickModal(1, this.nowNum)}>操作流程</div>
                <div className='buttonsItem' onClick={() => this.clickModal(2, this.nowNum)}>演示动画</div>
              </div>
            </div>
          </div>
        }

        <Modal title="功能说明" open={this.state.openGL} zIndex={9999} footer={null} onCancel={() => this.handleCancel()}>
          <div>{this.KeShiInfoItem.department_info}</div>
        </Modal>

        <Modal title="操作流程" open={this.state.openLC} zIndex={9999} footer={null} onCancel={() => this.handleCancel()} width={750}>
          <div className='imgContainer'>
            {this.KeShiInfoItem.picture.map(pic => (
              <Image src={pic} className='imgLC' />
            ))}
          </div>
        </Modal>

        <Modal title="演示动画" open={this.state.openDH} zIndex={9999} footer={null} onCancel={() => this.handleCancel()}>
          <div className='imgContainer'>
              {this.KeShiInfoItem.video.map((vid, index) => (
                <video key={vid} width="480" height="320" controls>
                  <source src={vid} type="video/mp4" />
                </video>
              ))}
          </div>
        </Modal>

        <Modal title="提示" open={this.state.openTip} zIndex={9999} footer={null} onCancel={() => this.handleCancel()}>
          <div>所选角色无权限访问</div>
        </Modal>


      </div>
    )

  }
}