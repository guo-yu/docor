## {% if pkg.logo %}![logo]({{pkg.logo}}) {% endif %}{{ pkg.name }} ![NPM version](https://img.shields.io/npm/v/{{ pkg.name }}.svg?style=flat)

{{ pkg.description }}{% if pkg.author %}{% endif %}

### 如何安装
```bash
$ npm install {{pkg.name}}
```

### 范例代码
```js
var {{pkg.parsedName}} = require('{{pkg.name}}');
```

### API
{% if apis %}{% for name,code in apis %}
- {{pkg.name}}.{{name}}(){% endfor %}{% else %}详细API接口函数请查看文件： `{{pkg.main}}`{% endif %}

### 欢迎贡献代码
- 请先 Fork 此项目到自己的代码仓库
- 再 Clone 你的新项目到本地电脑
- 使用 `$ npm install` 安装依赖
- 在本地 Checkout 一个特性分支
- 在特性分支上开发你想要的功能
- 确保功能被完善测试，最好能提供相应的单元测试代码
- Publish 到远程分支，向我提交一个 Pull Request
- 非常感谢 <3
{% if pkg.license %}
### {{ pkg.license }} license
Copyright (c) {{ year }} {% if pkg.author %}{{pkg.author}}{% endif %}

{% if license %}{{license}}{% endif %}
{% endif %}
---
![{{sys.name}}]({{sys.logo}})
built upon love by [{{sys.name}}]({{sys.repository.url}}) v{{sys.version}}
