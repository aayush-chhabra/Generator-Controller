'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var vm = require('vm');
var sys = require('sys'),
    exec =require('child_process').exec;

var fileNameString="Aayush";   
var moduleNameString=""; 
var modulesInTheFolder=[];
var fileForFurtherUse = "";
var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

   
  },

  askFor: function () {
    
    
    var obj = this;
    var done = this.async();
    
    this.log(yosay('Welcome to the marvelous Module generator!'));

    var prompts = [{
      type: 'input',
      name: 'nameController',
      message: 'Please enter the name of the controller: ',
      default: "Hello World"
    }];
    this.prompt(prompts, function (props) {
      
      //module creation 
      this.nameController = props.nameController;
      fileNameString = this.nameController;
      fileNameString = fileNameString.split(' ').join('-');
      fileForFurtherUse = fileNameString;
      fileNameString=fileNameString.concat("-controller");
      moduleNameString = this.nameController;
      moduleNameString =  moduleNameString.split(' ').join('');
      moduleNameString=moduleNameString.concat("Controller");
      
      obj.destinationRoot("app/static/js/");
      exec('ls -d -- */',function (error, stdout, stderr) {
      modulesInTheFolder = stdout;
      modulesInTheFolder = modulesInTheFolder.split("\n");
      modulesInTheFolder.splice(modulesInTheFolder.length-1,1);
      var prompts1 = [{
      type: 'list',
      name: 'nameModule',
      message: 'Please enter the name of the module: ',
      choices: modulesInTheFolder,
      default : modulesInTheFolder[0]
      }];
      obj.prompt(prompts1,function (props1)
      {
        this.nameModule = props1.nameModule;
        //console.log(modulesInTheFolder[0]);
        var destinationPath = obj.destinationRoot() + "/" + this.nameModule + "/main.js";
        var destPath = obj.destinationRoot() + "/" + this.nameModule + "/" + fileNameString + ".js";
        var destiPath = obj.destinationRoot() + "/" + this.nameModule + "/" + fileForFurtherUse + ".html";
        //var destinationPath1 = obj.destinationRoot() + "/" + this.nameModule + "/module.js";
        //var indexFile = obj.read(destinationPath);
        var indexFile = obj.readFileAsString(destinationPath);
        var startPositionOfDefine = indexFile.indexOf("define([");
        var stringInDefine = indexFile.substring(startPositionOfDefine+8);
        stringInDefine = stringInDefine.split(']');
        //console.log(stringInDefine[0]);   // get the string in the define function to replace it with a new text, for the controller.
        var temp=",\n\t./'"+moduleNameString+"'";
        //console.log(temp);
        stringInDefine[0]= stringInDefine[0].concat(temp);
        //console.log(stringInDefine[0]);
        var context1 = {
          moduleDescription: stringInDefine[0]
        }
        var cont1 = {
          controllerDescription: moduleNameString
        }
        obj.template("_main.js", destinationPath, context1);
        obj.template("_controller.js", destPath, cont1);
        obj.copy("_greetings.html", destiPath);
        
        done();
      });
      });
      
      
      
      
    }.bind(this));
  },

   addModuletoModule_json: function () {
       var flagToCheckModule = 0;
      
   }
});

module.exports = ModuleGenerator;
