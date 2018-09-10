# Messenger.js

A browser side event-bus.

#### IE9+
#### cross domain.
#### cross iframe.
#### encrypted communication channel.

# Install

```html
<script src="./messenger.min.js" ></script>
```

# API

```javascript
//Supose in pageA
//you post an event named 'ask_for_sum' with two parameters 1 and 2 to see if someone is subscribing.
messenger.post('ask_for_sum', 1, 2).then((result)=>{
     //if someone is subscribing to this event and post his response back, then it should be received at here:
     console.log('sum:', result)// sum: 3
});
```

```javascript
//below is the way to subscribe event and send result back:
messenger.subscribe('ask_for_sum', (num1, num2)=>{
   return num1+num2;//send result back to requester
});

//it is also ok to return a promise instance, for async scenarios
messenger.subscribe('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//async process
            resolve(num1+num2);//send result back to requester
        }, 2000)
    })
    return promise;
})

```

```javascript
//you can also do:
messenger.stopSubscribe('ask_for_sum');//stop subscribe

//use 'msgInfo' to count receives or terminate by run stopReceive()
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

