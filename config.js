var config = {
  "development": {
    //服务器接口
    "server_port": 3001,
    //静态资源地址
    "static_port": 4001,
    "static_ip": '127.0.0.1',
    "relativePath": '/public/',
    "static_path": 'http://127.0.0.1'
  },
  "production": {
    "server_port": 3000,
    "static_port": 3000,
    "static_ip": '127.0.0.1',
    "relativePath": '/',
    "static_path": 'http://127.0.0.1'
  }
};
module.exports = config;

