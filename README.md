# Messenger.js

A 'postMessage' based browser side event-bus.

# Install
```html
<script src="./messenger.dist.js" ></script>
```
# Browser Support
IE11+
Will support IE9/10 soon...

# API

```javascript
//In pageA, we need to ask summation for two given numbers.
//Let's name this event as "ask_for_sum", and emit this event and two inputs.
//if any page is listening this event and sent result back, you will receive it in method then():
messenger.post('ask_for_sum', 2, 3).then((result)=>{
     console.log('sum:', result)
})

```

```javascript
//In pageB, listen this particular event, do calculate and return result:
messenger.subscribe('ask_for_sum', (num1, num2)=>{
   return num1+num2;//sent result back to pageA
});

//or, it is also ok to return a promise instance for async scenarios
messenger.subscribe('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//async process
            resolve(num1+num2);//sent result back to pageA
        }, 2000)
    })
    return promise;
})

```

```javascript
//Finally, you will get a console output below in pageA:
'sum:' 5

```

```javascript
//stop subscribe
messenger.stopSubscribe('ask_for_sum');//stop listen

```

# License
MIT: 

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

