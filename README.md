# Angular Events Sequence
Library allows you to make sequence execution of events, handlers, broadcasts, etc. in next way:

````js
    var chain = new Chain(this.$scope);

    chain
    .wait('userAction-1')
    .wait('userScroll-1', self.scrollManager)
    .broadcast('userFinished-Scroll-1-Action')
    .wait('userAction-2')
    .wait('userScroll-2', self.scrollManager)
    .exec(myFunction)
    .broadcast('userFinished-Scroll-2-Action')
    .wait('userAction-3')
    .run({
      loopLastAction: true
    });
````

Library now works for AngularJS, using its `$scope` events mechanism. 

# Action types

Library have now 3 types of functions:
    
`wait (eventName)` - to wait when event has been executed

`exec (funciton)` - executes some code

`broadcast (eventName)` - broadcasts the event
    
# Mechanism

When you create the sequence you are starting some journey. In which you could use 3 types of functions: wait, exec, broadcast. 

example:

````js
    var chain = new Chain(this.$scope);

    chain
    .wait('userAction-1')
    .wait('userScroll-1', self.scrollManager)
    .run();
````

Here you are waiting for the event `userAction-1` from any angular component, then when event has been fired you are going to the next step - waiting for the event `userScroll-1`. When you pass second parameter in `wait` function if means that you are calling method `userSCroll-1` in `self.scrollManager` object and this method is getting callback as parameter. And when callback will be fired from this object next sequence method will be executed.
