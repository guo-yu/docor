## {% if pkg.logo %}![{{pkg.name}}]({{pkg.logo}}) {% endif %}{{ pkg.name }} ![NPM version](https://img.shields.io/npm/v/{{ pkg.name }}.svg?style=flat)

{{ pkg.description }}{% if pkg.author %}{% endif %}

### Installation
```bash
$ npm install {{pkg.name}}
```

### Example
```js
var {{pkg.parsedName}} = require('{{pkg.name}}');
```

### API
{% if apis %}{% for name,code in apis %}
- {{pkg.name}}.{{name}}(){% endfor %}{% else %}check this file: `{{pkg.main}}`{% endif %}

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3
{% if pkg.license %}
### {{ pkg.license }} license
Copyright (c) {{ year }} {% if pkg.author %}{{pkg.author}}{% endif %}

{% if license %}{{license}}{% endif %}
{% endif %}
---
![{{sys.name}}]({{sys.logo}})
built upon love by [{{sys.name}}]({{sys.repository.url}}) v{{sys.version}}
