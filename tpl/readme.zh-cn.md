## {% if pkg.logo %}![logo]({{pkg.logo}}) {% endif %}{{ pkg.name }} ![npm](https://badge.fury.io/js/{{ pkg.name }}.png)

{{ pkg.description }}{% if pkg.author %} by [{{pkg.author}}](https://npmjs.org/~{{pkg.author}}) {% endif %}

### 如何安装
````
$ npm install {{pkg.name}}
// 安装到全局
$ sudo npm install {{pkg.name}} -g
````
{% if pkg.bin %}
### 使用命令行
{% for cmd,url in pkg.bin %}
````
$ {{cmd}}
````{% endfor %}
{% endif %}
### 范例代码
````javascript
var {{pkg.name}} = require('{{pkg.name}}');
````

### API
{% if apis %}{% for name,code in apis %}
- {{pkg.name}}.{{name}}(){% endfor %}{% else %}详细API接口函数请查看文件： `{{pkg.main}}`{% endif %}

### 欢迎贡献代码
- Fork 这个项目
- Clone 你的新项目到本地
- 使用 `npm install` 安装依赖
- Checkout 一个特性分支
- 在特性分支上开发你想要的功能
- 确保功能被完善测试，最好能提供相应的单元测试代码
- 向我提交一个 pull request，非常感谢 <3
{% if pkg.license %}
### {{ pkg.license }} license
Copyright (c) {{ year }} {% if pkg.author %}{{pkg.author}}{% endif %}

{% if license %}{{license}}{% endif %}
{% endif %}

---
![{{sys.name}}]({{sys.logo}})
generated using [{{sys.name}}]({{sys.repository.url}}) @ {{sys.version}}. brought to you by [{{sys.author}}](https://npmjs.org/~{{sys.author}})