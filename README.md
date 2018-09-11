# Messenger.js

A browser side event-bus.

##### IE9+
##### two-way data transfer.
##### promise response supported.
##### cross domain and iframe.
##### encrypted communication channel.

# Install

script tag:
```html
<script src="./messenger.min.js" ></script>
```
npm:
```javascript
npm i longbow-messenger.js
```

# API

```javascript
//Supose in pageA
//post an event with a name of 'ask_for_sum', and two parameters: 1, 2.
messenger.emit('ask_for_sum', 1, 2).onResponse((result)=>{
     //if somepage is subscribing to this event-name and post it's response back, then it should be received at here:
     console.log('sum:', result)// sum: 3
});
```

```javascript
//subscribe event and send result back:
messenger.listen('ask_for_sum', (num1, num2)=>{
   return num1+num2;
});

//also ok to return promise instance, in case of async scenarios
messenger.listen('ask_for_sum', (num1, num2)=>{
    var promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{//async process
            resolve(num1+num2);//send result back to requester
        }, 2000)
    })
    return promise;
})

```

```javascript
//stop listen
messenger.stopListen('ask_for_sum');

//use 'msgInfo' to do more things!
messenger.emit('ask_for_sum', 1, 2).onResponse((result, msgInfo)=>{    
     //print result     
     console.log('sum:', result);
     
     //count receive times
     console.log('received result count: ', msgInfo.count);  
     
     //stop receiving
     if(msgInfo.count >= 2){
          msgInfo.stopReceive();
     }
})

```

# License

MIT: 

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

