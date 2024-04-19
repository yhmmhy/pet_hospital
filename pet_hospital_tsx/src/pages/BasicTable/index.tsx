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


import "./index.css"


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as THREE from "three"
import { loadRoomDataAPI } from '../../services/caseManage'
import { Modal } from 'antd'

interface MyComponentState {
  imgShow: boolean;
  openGL: boolean;
  openLC: boolean;
  openDH: boolean;
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
    }
    this.animate()
  }
  src = ''
  target = '诊室'
  nowWhere = '诊室'
  targetNum = 0
  sceneInitialized = false
  container: HTMLElement | null = null
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
  geometry: THREE.SphereGeometry = new THREE.SphereGeometry(5, 32, 32);
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

  componentDidMount() {
    let selectElement: any = document.getElementById('characters');
    selectElement.addEventListener('change', function () {
      // 获取当前选择的值
      let selectedValue: any = selectElement.value;
      // 获取图片元素
      let imgElement: any = document.querySelector('.icon');

      // 根据不同的选择值，更新图片的src属性
      switch (selectedValue) {
        case 'qt':
          imgElement.src = qt
          break;
        case 'ys':
          imgElement.src = ys
          break;
        case 'zs':
          imgElement.src = zs
          break;
        default:
          imgElement.src = qt
          break;
      }
    });

    this.handleParams()

    loadRoomDataAPI().then((res) => {
      this.KeShiInfo = res.departments
      console.log(this.KeShiInfo[0])
    }).catch((error) => {
      console.error("Error", error)
    })
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

  clickModal(modelType: any, type: any) {
    this.KeShiInfoItem = this.KeShiInfo[type + 1]
    console.log(this.KeShiInfoItem)
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
        this.target = '诊室'; this.targetNum = 1; this.src = qiantai
        break
      case 1:
        //诊室
        this.target = '前台'; this.targetNum = 0; this.src = zhenshi
        break
      case 2:
        //地方
        // this.target = ''
        // this.src = "/"
        break
      case 3:
        //手术室
        this.target = '诊室'; this.targetNum = 1; this.src = shoushu
        break
      case 10:
        //影像室
        this.target = '诊室'; this.targetNum = 1; this.src = yingxiang
        break
      case 11:
        //处置室
        this.target = '诊室'; this.targetNum = 1; this.src = chuzhi
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
            <div className='qiantai' onClick={() => this.handleClick(0)}>前台</div>
            <div className='zhenshi' onClick={() => this.handleClick(1)}>诊室</div>
            <div className='dangan' onClick={() => this.handleClick(2)}></div>
            <div className='shoushu' onClick={() => this.handleClick(3)}>手术</div>
            <div className='jiancha' onClick={() => this.handleClick(4)}></div>
            <div className='zhuyuan' onClick={() => this.handleClick(5)}></div>
            <div className='sszbs' onClick={() => this.handleClick(6)}></div>
            <div className='zhushe' onClick={() => this.handleClick(7)}></div>
            <div className='yaofang' onClick={() => this.handleClick(8)}></div>
            <div className='huayan' onClick={() => this.handleClick(9)}></div>
            <div className='yingxiang' onClick={() => this.handleClick(10)}>影像室</div>
            <div className='chuzhi' onClick={() => this.handleClick(11)}>处置室</div>
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
                <div className='buttonsItem' onClick={() => this.clickModal(0, this.targetNum)}>功能说明</div>
                <div className='buttonsItem' onClick={() => this.clickModal(1, this.targetNum)}>操作流程</div>
                <div className='buttonsItem' onClick={() => this.clickModal(2, this.targetNum)}>演示动画</div>
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
              <img src={pic} className='imgLC' />
            ))}
          </div>
        </Modal>

        <Modal title="演示动画" open={this.state.openDH} zIndex={9999} footer={null} onCancel={() => this.handleCancel()}>
          <div className='imgContainer'>
            {this.KeShiInfoItem.video.map(vid => (
              <video width="320" height="240" controls>
                <source src={vid} type="video/mp4" />
              </video>
            ))}
          </div>
        </Modal>


      </div>
    )

  }
}