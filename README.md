# Appointment-JDJ
 
### 代码文件结构

|-- /components 公共组件
    |-- image-box 图片显示组件
    |-- input-bar 输入框组件
    |-- panel 面板组件
    |-- push-box 弹出页面盒子 组件
    |-- push-comment 评论弹出页面 组件
        |-- comment-item 评论item 组件
    |-- push-login 登录页面 组件
    |-- search-bar 搜索输入框组件
|-- /global 全局数据处理
    |-- /http 数据请求
        |-- request 数据请求
    |-- /manager 数据处理中心
        |-- userDataManager 用户数据
    |-- notificationCenter 数据通知中心
    |-- config 系统相关信息
|-- miniprogram_npm npm构建包
    |-- @vant vant-UI 组件库
|-- node_modules npm包
    |-- @vant vant-UI 组件库
|-- /pages 页面
    |-- index 起始页面/欢迎页（处理进入程序时的页面跳转）
    |-- register 注册
    |-- home 首页
    |-- my 我的页面
    |-- user-info 用户信息
    |-- convener 申请成为召集人
    |-- /activities 活动
        |-- activities-list 活动列表
        |-- activity-detail 活动详情
        |-- activity-my-joined 我参加的活动
    |-- /venues 场馆
        |-- venues-list 场馆列表
        |-- venue-detail 场馆详情
        |-- venue-appointment 场馆预约
        |-- venue-appointment-rule 预约规则
        |-- venue-my-appointmented 我预约的场馆
    |-- /groups 团队
        |-- groups-list 团队列表
        |-- group-detail 团队详情
        |-- group-create 团队创建
        |-- group-join 团队加入
        |-- group-my-created 我创建的团队
        |-- group-my-joined 我加入的团队
    |-- /journal 随拍
        |-- journal-list 随拍列表
            |-- journal-item 随拍列表item组件
            |-- journal-item-operate 随拍列表item操作组件
        |-- journal-my 我的随拍
        |-- journal-create 发布随拍
|-- /resources 资源文件
    |-- /images 图片资源
    |-- /strings 文本资源
        |-- notificationName 通知名称
|-- /utils 工具包
    |-- util 工具
|-- app.js
|-- app.json
|-- app.wxss