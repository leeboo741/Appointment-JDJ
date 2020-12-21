# Appointment-JDJ
 
|-- /components 组件
    |-- imageUpload 图片上传组件
|-- /global 全局数据处理
    |-- http 数据请求
    |-- notification 数据通知
    |-- route 页面跳转
|-- /pages 页面
    |-- index 起始页面/欢迎页（处理进入程序时的页面跳转）
    |-- login 登录 （不强制登录，只有在操作需要具体登录人身份时才跳转登录）
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
        |-- journal-my 我的随拍
        |-- journal-create 发布随拍
|-- /resources 资源文件
    |-- images
    |-- files
|-- /utils 工具包
    |-- util
|-- app.js
|-- app.json
|-- app.wxss