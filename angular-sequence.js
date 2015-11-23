'use strict';

class SequenceService {
  constructor ($scope) {
    this.scope = $scope;

    this.functions = [];
    this.index = 0;
    
    this.constants = {
      functionTypes: {
        wait: 'wait',
        exec: 'exec',
        broadcast: 'broadcast'
      }
    }

    this.options = {
      loopLastAction: false
    };
  }

  wait (event, eventTarget) {
    var self = this;

    if (!eventTarget) {
      self._waitEvent(event);
    } else {
      self._waitExternalEvent(event, eventTarget);
    }

    return self;
  }
  exec (func) {
    var self = this;

    self._addFunction(func, self.constants.functionTypes.exec);

    return self;
  }
  broadcast (event) {
    var self = this;

    self._addFunction(function BroadCast(){
      self._fireEvent(event);
    }, self.constants.functionTypes.broadcast);

    return self;
  }

  run (options) {
    var self = this;

    //replace assigment with extend
    self.options = options;

    self._execFunction.call(self, 0);
  }

  _addFunction (func, type, agrs) {
    var self = this;

    var args = agrs || [];

    self.functions.push({
      f: func,
      type: type,
      arguments: args,
      name: func.name
    });
    self.index++;
  }
  _execFunction (index) {
    var self = this;

    if (self.functions[index]) {
      var func = self.functions[index];

      console.log('Sequence: Executing function: ' + (func.name ? func.name : '{Anonymous function}'));

      func.f.apply(self, func.arguments);

      if ((func.type === self.constants.functionTypes.exec 
           || func.type === self.constants.functionTypes.broadcast) 
          && self.functions[index + 1])
      {
        self._execFunction(index + 1);
      }
    } else if (self.functions.length <= index) {
      if (self.loopLastAction)
        self._execFunction(index - 1);
      else 
        return;
    } else {
      console.error('Sequence: You are trying to execute not existing function.' +
      'After "wait" functions should be "exec"');
    }
  }
  
  _waitEvent (event) {
    var self = this;
    
    var index = self.index;
    
    self._addFunction(function WaitEvent() {
        var _removeEventHandler = self._addEventHandler(event, function CallBack() {
          _removeEventHandler(); 
          self._execFunction.call(self, index + 1)
        });
    }, self.constants.functionTypes.wait);
  }
  _waitExternalEvent (event, eventTarget) {
    var self = this;
    
    var index = self.index;
    var eventName = "manualChainEvent_" + (index + 1).toString();

    self._addFunction(function WaitInnerEvent() {
      var _removeEventHandler = self._addEventHandler(eventName, function CallBack () {
        _removeEventHandler();
        self._execFunction.call(self, index + 1);
      });

      eventTarget[event].call(eventTarget, function InnerEventCallback() {
        console.log('Sequence: Broadcast inner event ' + eventName);

        self._fireEvent(eventName);
      });
    }, self.constants.functionTypes.wait);
  }
  
  _addEventHandler (event, handler) {
    var removeEventHandler = this.scope.$on(event, handler);
    return removeEventHandler;
  }
  _fireEvent (event, args) {
    var args = args || [];
    
    this.scope.$broadcast(event, args);
  }
}

export default SequenceService;
