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
//In pageA, we need to ask summation for two given numbers.
//Let's name this event as "ask_for_sum", and emit this event and two inputs.
//if any page is listening this event and sent result back, you will receive it in method then():
messenger.request('ask_for_sum', 2, 3).then((result)=>{
     console.log('sum:', result)
})

```

```javascript
//In pageB, listen this particular event, do calculate and return result:
messenger.listen('ask_for_sum', (num1, num2)=>{
   return num1+num2;//sent result back to pageA
});

//or, it is also ok to return a promise instance for async scenarios
messenger.listen('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//async process
            resolve(num1+num2);//sent result back to pageA
        }, 2000)
    })
    return promise;
})

```

```javascript
//Finally, in pageA you will get a console output below:
'sum:' 5

```
