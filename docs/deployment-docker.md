# Docker 部署

本小节，讲解如何将前端 + 后端项目，**使用 Docker 容器**，部署到 dev 开发环境下的一台 Linux 服务器上。如下图所示：
![Docker 部署](/images/01.png) 注意：服务器的 IP 地址。
- 外网 IP：139.9.196.247 或 8.154.33.209
- 内网 IP：192.168.0.213 或 172.26.126.182
下属所有涉及到 IP 的配置，需要替换成你自己的。
## # 1. 环境准备
需要安装如下环境：
- Docker：容器
- MySQL：数据库
- Redis：缓存
- Nginx：负载均衡
### # 1.1 安装 Docker
执行如下命令，进行 Docker 的安装。参考自 [https://help.aliyun.com/zh/ecs/use-cases/install-and-use-docker-on-a-linux-ecs-instance (opens new window)](https://help.aliyun.com/zh/ecs/use-cases/install-and-use-docker-on-a-linux-ecs-instance) 文档。
# ① 运行以下命令，安装 Docker 存储驱动的依赖包
dnf install -y device-mapper-persistent-data lvm2
# ② 添加稳定的 Docker 软件源
dnf config-manager --add-repo=https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# ③ 检查 Docker 软件源是否已添加
dnf list docker-ce
# ④ 安装 Docker
dnf install -y docker-ce --nobest
# ⑤ 查看 docker 版本信息：返回 Docker version 27.3.1, build ce12230
docker -v
# ⑥ 启动 Docker 守护进程，并设置开机自启动
systemctl start docker
systemctl enable docker
补充说明：由于访问 Docker 镜像不稳定，一般建议加速访问！！！
问题反馈：
- [https://t.zsxq.com/sfdMJ (opens new window)](https://t.zsxq.com/sfdMJ)
可参考加速方式：
- [DaoCloud / public-image-mirror (opens new window)](https://github.com/DaoCloud/public-image-mirror)
- [kubesre / docker-registry-mirrors (opens new window)](https://github.com/kubesre/docker-registry-mirrors)
### # 1.2 安装 MySQL
#### # 第一步，安装 MySQL（可选）
友情提示：使用 Docker 安装 MySQL 是可选步骤，也可以直接安装 MySQL，或者购买 MySQL 云服务。
① 执行如下命令，使用 Docker 启动 MySQL 容器。
docker run -v /work/mysql/:/var/lib/mysql \
-p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 \
--restart=always --name mysql -d m.daocloud.io/docker.io/mysql
- 数据库文件，挂载到服务器的的 `/work/mysql/` 目录下
- 端口是 3306，密码是 123456
② 执行 `ls /work/mysql` 命令，查看 `/work/mysql/` 目录的数据库文件。
![数据库文件](/images/03.png) 
#### # 第二步，导入 SQL 脚本
创建一个名字为 `ruoyi-vue-pro` 数据库，执行数据库对应的 [`sql` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/sql) 目录下的 SQL 文件，进行初始化。
![使用 Navicat 导入 SQL 脚本](/images/02.png) 
### # 1.3 安装 Redis
友情提示：使用 Docker 安装 Redis 是可选步骤，也可以直接安装 Redis，或者购买 Redis 云服务。
执行如下命令，使用 Docker 启动 Redis 容器。
docker run -d --name redis --restart=always -p 6379:6379 m.daocloud.io/docker.io/redis
- 端口是 6379，密码未设置
### # 1.4 安装 Nginx
#### # 第一步，创建挂载目录
Nginx 挂载到服务器的目录：
- `/work/nginx/conf.d` 用于存放配置文件
- `/work/nginx/html` 用于存放网页文件
- `/work/nginx/logs` 用于存放日志
- `/work/nginx/cert` 用于存放 HTTPS 证书
创建 `/work/nginx` 目录，并在该目录下新建 `nginx.conf` 文件，避免稍后安装 Nginx 报错。内容如下：
user  nginx;
worker_processes  1;
events {
worker_connections  1024;
}
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
http {
include       /etc/nginx/mime.types;
default_type  application/octet-stream;
sendfile        on;
keepalive_timeout  65;
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
#    access_log  /var/log/nginx/access.log  main;
gzip on;
gzip_min_length 1k;     # 设置允许压缩的页面最小字节数
gzip_buffers 4 16k;     # 用来存储 gzip 的压缩结果
gzip_http_version 1.1;  # 识别 HTTP 协议版本
gzip_comp_level 2;      # 设置 gzip 的压缩比 1-9。1 压缩比最小但最快，而 9 相反
gzip_types text/plain application/x-javascript text/css application/xml application/javascript; # 指定压缩类型
gzip_proxied any;       # 无论后端服务器的 headers 头返回什么信息，都无条件启用压缩
include /etc/nginx/conf.d/*.conf; ## 加载该目录下的其它 Nginx 配置文件
}
#### # 启动 Nginx
① 执行如下命令，使用 Docker 启动 Nginx 容器。
docker run -d \
--name nginx --restart always \
-p 80:80 -p 443:443 \
-e "TZ=Asia/Shanghai" \
-v /work/nginx/nginx.conf:/etc/nginx/nginx.conf \
-v /work/nginx/conf.d:/etc/nginx/conf.d \
-v /work/nginx/logs:/var/log/nginx \
-v /work/nginx/cert:/etc/nginx/cert \
-v /work/nginx/html:/usr/share/nginx/html \
m.daocloud.io/docker.io/nginx
② 执行 `docker ps` 命令，查看到 Nginx 容器的状态是 `UP` 的。
## # 2. 部署后端服务
#### # 第一步，修改配置
后端 dev 开发环境对应的是 [`application-dev.yaml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/resources/application-dev.yaml) 配置文件，主要是修改 MySQL 和 Redis 为你的地址。如下图所示：
![ 配置文件](/images/03.png) 
#### # 第二步，编译后端
在项目的根目录下，执行 `mvn clean package -Dmaven.test.skip=true` 命令，编译后端项目，构建出它的 Jar 包。如下图所示：
![编译后端](/images/02.png) 疑问：-Dmaven.test.skip=true 是什么意思？
跳过单元测试的执行。如果你项目的单元测试写的不错，建议使用 `mvn clean package` 命令，执行单元测试，保证交付的质量。
#### # 第三步，上传 Jar 包
在 Linux 服务器上创建 `/work/projects/yudao-server` 目录，使用 `scp` 命令或者 FTP 工具，将 `yudao-server.jar` 上传到该目录下。如下图所示：
![上传 Jar 包](/images/04.png) 
#### # 第四步，构建镜像
① 在 `/work/projects/yudao-server` 目录下，新建 Dockerfile 文件，用于制作后端项目的 Docker 镜像。编写内容如下：
## AdoptOpenJDK 停止发布 OpenJDK 二进制，而 Eclipse Temurin 是它的延伸，提供更好的稳定性
## 感谢复旦核博士的建议！灰子哥，牛皮！
FROM m.daocloud.io/docker.io/eclipse-temurin:8-jre
## 创建目录，并使用它作为工作目录
RUN mkdir -p /yudao-server
WORKDIR /yudao-server
## 将后端项目的 Jar 文件，复制到镜像中
COPY yudao-server.jar app.jar
## 设置 TZ 时区
## 设置 JAVA_OPTS 环境变量，可通过 docker run -e "JAVA_OPTS=" 进行覆盖
ENV TZ=Asia/Shanghai JAVA_OPTS="-Xms512m -Xmx512m"
## 暴露后端项目的 48080 端口
EXPOSE 48080
## 启动后端项目
ENTRYPOINT java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.jar
② 执行如下命令，构建名字为 `yudao-server` 的 Docker 镜像。
cd /work/projects/yudao-server
docker build -t yudao-server .
③ 在 `/work/projects/yudao-server` 目录下，新建 Shell 脚本 `deploy.sh`，使用 Docker 启动后端项目。编写内容如下：
#!/bin/bash
set -e
## 第一步：删除可能启动的老 yudao-server 容器
echo "开始删除 yudao-server 容器"
docker stop yudao-server || true
docker rm yudao-server || true
echo "完成删除 yudao-server 容器"
## 第二步：启动新的 yudao-server 容器 \
echo "开始启动 yudao-server 容器"
docker run -d \
--name yudao-server \
-p 48080:48080 \
-e "SPRING_PROFILES_ACTIVE=dev" \
-v /work/projects/yudao-server:/root/logs/ \
yudao-server
echo "正在启动 yudao-server 容器中，需要等待 60 秒左右"
- 应用日志文件，挂载到服务器的的 `/work/projects/yudao-server` 目录下
- 通过 `SPRING_PROFILES_ACTIVE` 设置为 `dev` 开发环境
#### # 第五步，启动后端
① 执行 `sh deploy.sh` 命令，使用 Docker 启动后端项目。日志如下：
开始删除 yudao-server 容器
yudao-server
yudao-server
完成删除 yudao-server 容器
开始启动 yudao-server 容器
0dfd3dc409a53ae6b5e7c5662602cf5dcb52fd4d7f673bd74af7d21da8ead9d5
正在启动 yudao-server 容器中，需要等待 60 秒左右
② 执行 `docker logs yudao-server` 命令，查看启动日志。看到如下内容，说明启动完成：
友情提示：如果日志比较多，可以使用 grep 进行过滤。
例如说：使用 `docker logs yudao-server | grep 48080`
2022-04-15 00:34:19.647  INFO 8 --- [main] [TID: N/A] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 48080 (http)
## # 3. 部署前端
项目的管理后台有 3 个版本（只需要看你的版本即可）：
- `yudao-ui-admin-vue3`：基于 Vue3 + element-plus
- `yudao-ui-admin-vben`：基于 Vue3 + vben5(ant-design-vue、element-plus)
- `yudao-ui-admin-vue2`：基于 Vue2 + element-ui
注意，前端无法直接启动，而是需要通过 Nginx 转发读取前端构建出来的静态文件，最终都放在服务器上的 `/work/projects/yudao-ui-admin` 目录下。
### # 3.1 yudao-ui-admin-vue3
基于 Vue3 + element-plus
#### # 第一步，修改配置
前端 dev 开发环境对应的是 [`.env.dev` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/.env.dev#L6-L7) 配置文件，主要是修改 `VITE_BASE_URL` 为你的后端项目的访问地址。如下图所示：
![ 配置文件](/images/ep-env.png) 
#### # 第二步，编译前端
在前端项目的根目录下，执行 `npm run build:dev` 命令，编译前端项目，构建出它的 `dist` 文件，里面是 HTML、CSS、JavaScript 等静态文件。如下图所示：
![编译前端](/images/img_eed1139b.png) 如下想要打包其它环境，可使用如下命令：
npm run build:prod ## 打包 prod 生产环境
npm run build:stage ## 打包 stage 预发布环境
如果是在服务器上构建，并且出现卡死的情况，可以参考 [https://t.zsxq.com/Quq1U (opens new window)](https://t.zsxq.com/Quq1U) 或 [https://gitee.com/yudaocode/yudao-ui-admin-vue3/issues/IAU0T3 (opens new window)](https://gitee.com/yudaocode/yudao-ui-admin-vue3/issues/IAU0T3) 解决
其它高级参数说明【可暂时不看】：
① `VITE_PUBLIC_PATH`：前端打包的路径（静态资源的基础路径），一般默认为 `/` 即可。目前有两种用法：
第一种，可用于二级目录部署。例如说，`VITE_PUBLIC_PATH` 设置为 `/demo` 。然后 Nginx 配置时，需要特殊注意，如下所示：
location /demo { # 注意点 1：不需要 / 结尾
# 注意点 2：二级路由时需要使用别名 alias，不用 root
alias   /work/projects/yudao-ui-admin/; # 注意点 3：需要 / 结尾
index  index.html index.htm;
try_files $uri $uri/ /index.html;
}
第二种，可用于七牛等 CDN 服务，读取前端的静态文件，提升访问速度，建议 prod 生产环境使用。例如说，我们演示环境的 `VITE_PUBLIC_PATH` 是 `http://static-vue3.yudao.iocoder.cn/` 。
具体操作，可参考文章的 [《Vue 项目使用七牛云 CDN 存放静态资源》 (opens new window)](https://blog.csdn.net/weixin_71403100/article/details/132037721) 的「二、实现方式 」部分，只是最终的“修改 index.html 中静态资源引用”，变成 `PUBLIC_PATH` 修改即可。
#### # 第三步，上传 `dist` 文件
在 Linux 服务器上创建 `/work/projects/yudao-ui-admin` 目录，使用 `scp` 命令或者 FTP 工具，将 `dist` 上传到该目录下。如下图所示：
![上传  文件](/images/ep-dist.png) 
### # 3.2 yudao-ui-admin-vben
基于 Vue3 + vben5(ant-design-vue、element-plus)。
下面主要以 ant-design-vue 为例，element-plus 类似。
#### # 第一步，修改配置
前端 production 开发环境对应的是 [`.env.production` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/.env.production#L3-L8) 配置文件，主要是修改 `VITE_BASE_URL`、`VITE_GLOB_API_URL` 为你的后端项目的访问地址。如下图所示：
![ 配置文件](/images/vben-env.png) 其它高级参数说明【可暂时不看】：
① `VITE_BASE`：前端打包的路径（静态资源的基础路径），一般默认为 `/` 即可。目前有两种用法：
第一种，可用于二级目录部署。例如说，`VITE_BASE` 设置为 `/demo` 。然后 Nginx 配置时，需要特殊注意，如下所示：
location /demo { # 注意点 1：不需要 / 结尾
# 注意点 2：二级路由时需要使用别名 alias，不用 root
alias   /work/projects/yudao-ui-admin/; # 注意点 3：需要 / 结尾
index  index.html index.htm;
try_files $uri $uri/ /index.html;
}
第二种，可用于七牛等 CDN 服务，读取前端的静态文件，提升访问速度，建议 prod 生产环境使用。例如说，我们演示环境的 `VITE_BASE` 是 `http://static-vue3.yudao.iocoder.cn/` 。
具体操作，可参考文章的 [《Vue 项目使用七牛云 CDN 存放静态资源》 (opens new window)](https://blog.csdn.net/weixin_71403100/article/details/132037721) 的「二、实现方式 」部分，只是最终的“修改 index.html 中静态资源引用”，变成 `PUBLIC_PATH` 修改即可。
#### # 第二步，编译前端
在前端项目的根目录下，执行 `npm run build:antd` 或 `npm run build:ele` 命令，编译前端项目，构建出它的 `dist.zip` 压缩包，里面是 HTML、CSS、JavaScript 等静态文件。如下图所示：
![编译前端](/images/img_51d573ff.png) 
#### # 第三步，上传 `dist` 文件
在 Linux 服务器上创建 `/work/projects/yudao-ui-admin` 目录，使用 `scp` 命令或者 FTP 工具，将 `dist` 上传到该目录下。如下图所示：
![上传  文件](/images/vben-dist.png) 
### # 4.3 yudao-ui-admin-vue2
基于 Vue2 + element-ui
#### # 第一步，修改配置
前端 dev 开发环境对应的是 [`.env.dev` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/.env.dev) 配置文件，主要是修改 `VUE_APP_BASE_API` 为你的后端项目的访问地址。如下图所示：
![ 配置文件](/images/eu-env.png) 
#### # 第二步，编译前端
在前端项目的根目录下，执行 `npm run build:dev` 命令，编译前端项目，构建出它的 `dist` 文件，里面是 HTML、CSS、JavaScript 等静态文件。如下图所示：
![编译前端](/images/img_561a3950.png) 如下想要打包其它环境，可使用如下命令：
npm run build:prod ## 打包 prod 生产环境
npm run build:stage ## 打包 stage 预发布环境
其它高级参数说明【可暂时不看】：
① `PUBLIC_PATH`：可用于七牛等 CDN 服务，读取前端的静态文件，提升访问速度，建议 prod 生产环境使用。示例如下：
可参考文章的 [《Vue 项目使用七牛云 CDN 存放静态资源》 (opens new window)](https://blog.csdn.net/weixin_71403100/article/details/132037721) 的「二、实现方式 」部分，只是最终的“修改 index.html 中静态资源引用”，变成 `PUBLIC_PATH` 修改即可。
② `VUE_APP_APP_NAME`：二级部署路径，默认为 `/` 根目录，一般不用修改。
③ `mode`：前端路由的模式，默认采用 `history` 路由，一般不用修改。可以通过修改 [`router/index.js` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/router/index.js#L173-L178) 来设置为 `hash` 路由，示例如下：
![ 参数](/images/eu-mode.png) 
#### # 第三步，上传 `dist` 文件
在 Linux 服务器上创建 `/work/projects/yudao-ui-admin` 目录，使用 `scp` 命令或者 FTP 工具，将 `dist` 上传到该目录下。如下图所示：
![上传 文件](/images/eu-dist.png) （图中的目录不太对，以文字为准！！！）
## # 4. 配置 Nginx 转发
两种 Nginx 的配置，分别满足服务器 IP、独立域名的不同场景。
### # 4.1 方式一：服务器 IP 访问
① 在 `/work/nginx/conf.d` 目录下，创建 `ruoyi-vue-pro.conf`，内容如下：
server {
listen       80;
server_name  139.9.196.247; ## 重要！！！修改成你的外网 IP/域名
location / { ## 前端项目
root   /usr/share/nginx/html/yudao-ui-admin;
index  index.html index.htm;
try_files $uri $uri/ /index.html;
}
location /admin-api/ { ## 后端项目 - 管理后台
proxy_pass http://192.168.0.213:48080/admin-api/; ## 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header REMOTE-HOST $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
location /app-api/ { ## 后端项目 - 用户 App
proxy_pass http://192.168.0.213:48080/app-api/; ## 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header REMOTE-HOST $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
}
友情提示：
`[root]` 指令在本地文件时，要使用 Nginx Docker 容器内的路径，即 `/usr/share/nginx/html/yudao-ui-admin`，否则会报 404 的错误。
② 执行 `docker exec nginx nginx -s reload` 命令，重新加载 Nginx 配置。
友情提示：如果你担心 Nginx 配置不正确，可以执行 docker exec nginx nginx -t 命令。
③ 执行 `curl http://192.168.0.213/admin-api/` 命令，成功访问后端项目的内网地址，返回结果如下：
{"code":401,"data":null,"msg":"账号未登录"}
执行 `curl http://139.9.196.247:48080/admin-api/` 命令（“需要换成你的外网 IP”），成功访问后端项目的外网地址，返回结果一致。
④ 请求 [http://139.9.196.247:48080 (opens new window)](http://139.9.196.247:48080) 地址（“需要换成你的外网 IP”），成功访问前端项目的外网地址，，返回前端界面如下：
![前端界面](/images/06.png) ⑤ 如果你使用到 WebSocket 的话，需要额外对 `/infra/ws` 路径进行配置，具体可见 [https://t.zsxq.com/LQEfC (opens new window)](https://t.zsxq.com/LQEfC) 链接。
### # 4.2 方式二：独立域名访问
友情提示：在前端项目的编译时，需要把 `VUE_APP_BASE_API` 修改为后端项目对应的域名。
例如说，这里使用的是 `http://api.iocoder.cn`
① 在 `/work/nginx/conf.d` 目录下，创建 `ruoyi-vue-pro2.conf`，内容如下：
server { ## 前端项目
listen       80;
server_name  admin.iocoder.cn; ## 重要！！！修改成你的前端域名
location / { ## 前端项目
root   /usr/share/nginx/html/yudao-ui-admin;
index  index.html index.htm;
try_files $uri $uri/ /index.html;
}
}
server { ## 后端项目
listen       80;
server_name  api.iocoder.cn; ## 重要！！！修改成你的外网 IP/域名
## 不要使用 location / 转发到后端项目，因为 druid、admin 等监控，不需要外网可访问。或者增加 Nginx IP 白名单限制也可以。
location /admin-api/ { ## 后端项目 - 管理后台
proxy_pass http://192.168.0.213:48080/admin-api/; ## 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header REMOTE-HOST $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
location /app-api/ { ## 后端项目 - 用户 App
proxy_pass http://192.168.0.213:48080/app-api/; ## 重要！！！proxy_pass 需要设置为后端项目所在服务器的 IP
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header REMOTE-HOST $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
}
② 执行 `docker exec nginx nginx -s reload` 命令，重新加载 Nginx 配置。
③ 请求 [http://api.iocoder.cn/admin-api/ (opens new window)](http://api.iocoder.cn/admin-api/) 地址，成功访问后端项目，返回结果如下：
{"code":401,"data":null,"msg":"账号未登录"}
④ 请求 [http://admin.iocoder.cn (opens new window)](http://admin.iocoder.cn) 地址，成功访问前端项目，返回前端界面如下：
![前端界面](/images/15.png) 
## # 666. 更多说明
① 积木报表菜单，无法访问。参考 [https://t.zsxq.com/vBkup (opens new window)](https://t.zsxq.com/vBkup) 解决。
② 如果希望分离 Maven 依赖 lib 打包，可参考 [https://gitee.com/zhijiantianya/ruoyi-vue-pro/pulls/1259/ (opens new window)](https://gitee.com/zhijiantianya/ruoyi-vue-pro/pulls/1259/) 贡献。
③ Swagger 接口的转发，参考 [https://t.zsxq.com/IpALd (opens new window)](https://t.zsxq.com/IpALd) 和 [https://t.zsxq.com/9p9Xu (opens new window)](https://t.zsxq.com/9p9Xu) 解决。
④ 关于 Nginx，如何部署的一点分享，来自球友 [https://t.zsxq.com/H5KKy (opens new window)](https://t.zsxq.com/H5KKy) 投稿。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[Linux 部署](/deployment-linux/) [Jenkins 部署](/deployment-jenkins/) 
←
[Linux 部署](/deployment-linux/) [Jenkins 部署](/deployment-jenkins/)→
[](mailto:7685413@qq.com)[](https://github.com/YunaiV)[](https://www.iocoder.cn/?yudao) 
Theme by
[Vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing) 
| Copyright © 2019-2026
芋道源码 | MIT License   
- 跟随系统
- 浅色模式
- 深色模式
- 阅读模式
× 
.windowRB{ padding: 0;}
.windowRB .wwads-img{margin-top: 10px;}
.windowRB .wwads-content{margin: 0 10px 10px 10px;}
.custom-html-window-rb .close-but{
display: none;
}