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


### 特性

在配置文件设置:

```
USER:
    foo: bar
```

可以的md中使用**ejs**语法,例如 
```
%<= USER.foo %>
```

### 下载文件的功能

支持的下载格式py,zip.txt

```markdown
[download 1](foo.txt)
[download 2](./foo/bar.txt)
```

## 单页面渲染

有的时间我们只想渲染一个页面,进行查看效果,可以使用下面的命令

```sh
single <md_file_path>
```

然后打开浏览器查看效果

## 模板生成的功能

在`md`写入下面的内容时,会被截取进入**模板**

```
<!-- template start -->
被截取的内容
<!-- template end -->
```

开启方法,在`config.yml`配置文件中设置

```
# 额外加载的route
extra_routes:
    - 
      name: codeTemplate # 代码模板生成
      url: code_template
      opts: {}  # 设置

# 插件的加载
plugins:
    - 
     name: generate_code_template
     opts: {}
```
