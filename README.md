# ChainAsyncJS
Library allows you to make sequence execution of Events, Handlers, etc. in next way:

````js
    var chain = new Chain(this.$scope);
    
    chain.wait('meetAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startSkillsAnimation')
    .wait('skillsAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startBeginningAnimation')
    .run();
````
