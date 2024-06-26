# React + TypeScript + Vite 前端项目部署过程

## 1. 准备环境
在要部署的机器上配置好 Node.js 环境，具体操作在此不赘述。

## 2. 打包代码
- 在命令行下进入代码目录。
- 运行以下命令进行打包：、
```bash
npm run build
```
注意：打包前要保证 TypeScript 编译不报错。开发环境下代码能运行并不一定代表没有报错，一些警告和小的错误并不会使得代码无法运行。常见报错的处理方法：
- 隐式具有 `any` 类型：可以根据该常量具体数据自定义类型或直接赋予 `any` 类型。
- 定义但未使用：直接删去即可（这个属于警告，但是也会导致无法打包）。
- 遇到无法解决或解决起来比较复杂但不影响正常运行的报错，可以使用 `//@ts-ignore` 和 `//@ts-nocheck` 注释屏蔽报错（前者是屏蔽下一行的报错，后者加在文件开头可以屏蔽此文件所有报错）。这个方法是最后没有办法的办法，一般开发中不建议使用。

## 3. 生成打包后的项目
打包完成后会生成一个 `dist` 文件夹，这个就是打包好的项目了。

## 4. 运行项目
- 运行项目需要当前环境安装有 `http-server` 服务器来运行。
- 首先在全局环境下安装好 `http-server`，在命令行输入：
```bash
npm install http-server -g
```
- 命令行下进入 `dist` 文件夹，输入以下命令启动服务器：
```bash
http-server -p 3000
```
- 然后即可在本地 3000 端口访问，在浏览器中输入 `localhost:3000` 即可。如果部署在服务器上，则需要保证服务器的 3000 端口处于开放状态，然后可以通过服务器绑定的域名或对应的公网 IP 进行访问。
- 如果遇到跨域访问问题，在运行项目时加上 `--cors` 即可，即：
```bash
http-server --cors -p 3000
```
## 5. 解决问题
访问页面时一开始遇到一个问题，进入后台管理系统时无法加载出来，但是在开发环境下是可以正常运行的。按 F12 查看控制台发现报错显示 `#130` 报错。搜索以后发现传入空值时就会出现这样的报错，于是在本地运行开发环境的代码后，经过不断排查，最后发现是后台首页的图表的组件库里出现了传空值的情况。更换了图表以后再打包运行就恢复正常了。


