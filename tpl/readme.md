## {% if pkg.logo %}![logo]({{pkg.logo}}) {% endif %}{{ pkg.name }} ![npm](https://badge.fury.io/js/{{ pkg.name }}.png)

{{ pkg.description }}{% if pkg.author %} by [{{pkg.author}}](https://npmjs.org/~{{pkg.author}}) {% endif %}

### Installation
````
$ npm install {{pkg.name}} // or install globally : sudo npm install {{pkg.name}} -g
````
{% if pkg.bin %}
### Use CLI
{% for cmd,url in pkg.bin %}
````
$ {{cmd}}
````{% endfor %}
{% endif %}
### Example
````javascript
var {{pkg.name}} = require('{{pkg.name}}');
````

### API
{% for name,code in apis %}
- {{pkg.name}}.{{name}}(){% endfor %}

### Pull Request Welcome
- fork this repo
- feel free to add your feature
- make sure your feature are fully tested.
- send me a PR, and enjoy!
{% if pkg.license %}
### {{ pkg.license }} license
Copyright (c) {{ year }} {% if pkg.author %}{{pkg.author}}{% endif %}

{% if license %}{{license}}{% endif %}
{% endif %}

---
![{{sys.name}}]({{sys.logo}})
generated using [{{sys.name}}]({{sys.repository.url}}) @ {{sys.version}}. brought to you by [{{sys.author}}](https://npmjs.org/~{{pkg.author}})