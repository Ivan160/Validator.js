# Validator JavaScript Plugin
The Validation JavaScript Plugin provides drop-in validation for your forms

## Setup
### Validator-install
**Folder install**

First, download the file validator.js from the "install" folder. 
Import the validator into your project.
Next, call the validator function for those forms you wish to have validation.

```js
import validator from './validator';

addEventListener('DOMContentLoaded', function() {
   validator(document.querySelector('#form'));
   //or
   var forms = document.querySelectorAll('form');
   for (var i = 0; i < forms.length; i++) {
      validator(forms[i]);
   }
});
```


### Validator-connections
**Folder connections**

First, download the file validator.js from the "connections" folder. 
Include the validator.js to your project.
Next, call the validator function for those forms you wish to have validation.

```js
<script src="./validator.js"></script>
<script>
   addEventListener('DOMContentLoaded', function () {
      validator(document.querySelector('#form'));
   });
</script>
```


## Usage
Set the name attribute for the items you wish to have validation.
```html
      <input type="text" name="name">
      <input type="text" name="phone">
      <input type="text" name="email">
```
