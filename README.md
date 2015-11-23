# sequence js
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

Library now works for AngularJS, using its <code>$scope</code> and events mechanism. But soon it will be re-implemented as separate library.
