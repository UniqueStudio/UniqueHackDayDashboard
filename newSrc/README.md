## 主体结构

src 下的 components, actions, reducers 全局共有

pages 包含各个路由下的页面,由 index.tsx 导出所有页面

modules 下面为各个模块，每个 module 下面分为以下文件

* \_\_tests\_\_
* components
* containers
* reducers
* actions
* index.tsx

固有 module:

* services(处理前后端交互的, 任何前后端交互的问题都从这里来找)
* store

对于整体结构有任何的疑问或者建议可以提 [issue](https://github.com/UniqueStudio/UniqueHackDayDashboard/issues)^\_^
