const toDoList=artifacts.require('ToDoList');

module.exports=function(deployer) {
	deployer.deploy(toDoList);
};