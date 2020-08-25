var ToDoList = artifacts.require("./ToDoList.sol");

contract("ToDoList", function(accounts) {
  var todolist_instance;

  it("Should equal zero", function() {
    return ToDoList.deployed().then(function(instance) {
      return instance.totalItems();
    }).then(function(count) {
      assert.equal(count, 0);
    });
  });

it("Adds item and checks item name", function() {
    return ToDoList.deployed().then(function(instance) {
    	todolist_instance=instance;
      todolist_instance.addItem("Pencil");
    }).then((c)=>{
    	todolist_instance.getItem(0).then((n)=>{
    		assert.equal(n,"Pencil");
    	});
      
    });
  });
it("Removes item and check count",()=>{
	
		todolist_instance.removeItem(1).then(()=>{
			todolist_instance.totalItems().then((n)=>{
				assert(n,0);
			});
		});

});



});