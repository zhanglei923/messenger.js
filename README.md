# Messenger.js

A new generation postMessage based browser side Event-Bus.

# License
MIT: [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

# Install
```html
<script src="./messenger.dist.js" ></script>
```

# API

```javascript
//In pageA, emit one request event.
//e.g. ask for sum numbers, let's name this event as "ask_for_sum":
messenger.request('ask_for_sum', 2, 3).then((result)=>{
     console.log('sum:', result)
})

```

```javascript
//In pageB, subscribe particular event. In this case, the event name will be "ask_for_sum":
messenger.listen('ask_for_sum', (num1, num2)=>{
   return num1+num2;//sent result back
});

//or, it is also ok to return a promise instance for async scenarios
messenger.listen('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//async process
            resolve(num1+num2);//sent result back
        }, 2000)
    })
    return promise;
})

```

```javascript
//Finally, in pageA you will get a console output below:
'sum:' 5

```
