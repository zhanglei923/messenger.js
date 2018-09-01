# Messenger.js

A New Generation Browser Side Event-Bus.

# License
MIT: [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

# Install
```html
<script src="./messenger.dist.js" ></script>
```

# API

```javascript
//In pageA, sent a request event, e.g: ask for sum numbers
messenger.request('ask_for_sum', 2, 3).then((result)=>{
     console.warn('sum:', result)
})

```

```javascript
//In pageB, subscribe this event and sent response back:
messenger.listen('ask_for_sum', (num1, num2)=>{
   return num1+num2;
});

//or, it is also ok to return a promise instance for async scenarios
messenger.listen('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//simulate async
            resolve(num1+num2);
        }, 2000)
    })
    return promise;
})

```

```javascript
//Finally, in pageA you will get console print below:
'sum:' 5

```
