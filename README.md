# Messenger.js

A 'postMessage' based cross iframe/domain event-bus.
Browser Support is IE9+

# Install

```html
<script src="./messenger.min.js" ></script>
```

# API

```javascript
//In pageA, post an event with two numbers to ask for somepage to do calculate
messenger.post('ask_for_sum', 2, 3).then((result)=>{
     console.log('sum:', result)
})

messenger.post('ask_for_sum', 2, 3).then((result, msgInfo)=>{    
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

```javascript
//In pageB, subscribe this particular event 'ask_for_sum', do calculate and return result back:
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
sum: 5

```

```javascript
//you can also do:
messenger.stopSubscribe('ask_for_sum');//stop subscribe

```

# License

MIT: 

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

