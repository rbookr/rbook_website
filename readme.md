# Rbook

## featrues

 - 目录功能
 - 列表
 - 侧边栏

- 目录 支持
- 文章列表 支持

- 基于,`typescript`,`nedb`,`pug`,`koa`
- 需要服务器

页面布局设计

  对相应的route进行开关
  导航栏开关


  配置文件 指定

  是否使用 目录

## 安装

需要:`node >= 10`,`git`,`yarn`,`redis`

```
git clone https://github.com/rbookr/rbook
cd rbook && git submodule init && git submodule update
yarn add && cd markdown-r && yarn add
```

## 启动


### 使用 pm2

```
yarn global add pm2
pm2 start tools/pm2.demo.yml
```

