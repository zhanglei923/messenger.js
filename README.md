# Messenger.js

A 'postMessage' based cross iframe/domain event-bus.
Browser Support is IE9+

# Install

```html
<script src="./messenger.min.js" ></script>
```

# API

```javascript
//post an event request 'ask_for_sum' with two parameters 1 and 2, to see if someone is subscribing
messenger.post('ask_for_sum', 1, 2).then((result)=>{
     console.log('sum:', result)
})

```

```javascript
//In pageB, subscribe to this event, get two parameters, do addition and return result back:
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
//Finally, you will get a console print below in pageA:
sum: 3

```

```javascript
//you can also do:
messenger.stopSubscribe('ask_for_sum');//stop subscribe

//use msgInfo.count and msgInfo.stopReceive to limit receives
messenger.post('ask_for_sum', 1, 2).then((result, msgInfo)=>{    
     //print result     
     console.log('sum:', result);
     
     //see how many results received   
     console.log('received result count: ', msgInfo.count);  
     
     //run stopReceive() to stop receiving
     if(msgInfo.count >= 2){
          msgInfo.stopReceive();
     }
})

```

# License

MIT: 

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

