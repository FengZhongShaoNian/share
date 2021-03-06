# share
## 描述
share (IShare的升级版)是一个基于http的局域网文件分享插件（还可以搭配utools的内网穿透功能进行临时性的外网访问）。 插件用到的配置信息默认存储在用户目录下的.share文件夹下，清理里面的数据会清空分享列表。

用法
有如下几种用法：

直接在uTools中输入fx即可进入本插件。
复制文件，然后在uTools的输入框中粘贴，可以把文件添加到分享列表中，同时进入到本插件的界面。


## 功能
- 局域网文件分享功能
- 扫描二维码下载分享文件
- 支持文件上传
- 支持手工选择网卡，避免了获取IP地址错误的问题

## 编译说明

编译方法： 直接在linux或者macOS下运行`build`模块下的`build_plgin.sh`.
对于windows系统，可以在WSL中进行编译。
```shell
git clone https://gitee.com/fengzhongshaonian/share.git
# 或者: git clone https://github.com/FengZhongShaoNian/share.git
cd share
git checkout nowebpack
cd build
chmod +x build_plugin.sh
./build_plugin.sh
```

## 截图

![](https://gitee.com/fengzhongshaonian/share/raw/master/screenshots/1.png)


![2](https://gitee.com/fengzhongshaonian/share/raw/master/screenshots/2.png)


![3](https://gitee.com/fengzhongshaonian/share/raw/master/screenshots/3.png)


![4](https://gitee.com/fengzhongshaonian/share/raw/master/screenshots/4.png)

