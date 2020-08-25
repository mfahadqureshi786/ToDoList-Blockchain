var contractABI=[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "int8"
        }
      ],
      "name": "items",
      "outputs": [
        {
          "name": "id",
          "type": "int8"
        },
        {
          "name": "name",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x050fbc44"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "nItems",
      "outputs": [
        {
          "name": "",
          "type": "int8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x1d046587"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalItems",
      "outputs": [
        {
          "name": "",
          "type": "int8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x2799276d"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        }
      ],
      "name": "addItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x27e9f294"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "int8"
        }
      ],
      "name": "removeItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x8b39ec51"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "id",
          "type": "int8"
        }
      ],
      "name": "getItem",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x3e038994"
    }
  ];
  var contractAddress='0x92dA03e37Fdd0e783a966f1C589AD063E7148655';
  var web3=new Web3('http://localhost:9545');
  var todolist_sc=new web3.eth.Contract(contractABI,contractAddress);
  
  document.addEventListener('DOMContentLoaded',()=>{
    fetchList();
    todolist_sc.methods.nItems().call((err,res)=>{console.log("Total Items created So far:"+res);});
    var accounts;
    var ID;
    
web3.eth.getAccounts().then(res=>{
  accounts=res;
  
}).then(()=>{
  console.log("Account 0:"+accounts[0]);
  var bb;
  web3.eth.getBalance(accounts[0]).then((r)=>{console.log("Balance Before:"+r);bb=r;});

  document.getElementById("adder").addEventListener("click", function(event){

   var task=document.getElementById("newTask").value; 
todolist_sc.methods.addItem(task).send({from:accounts[0]},(err,res)=>{
  document.getElementById("newTask").value="";
window.location.reload();
});
}); 
});

});
  function fetchList(){
    var total;
    var item_id;
    var item_name;
    todolist_sc.methods.nItems().call((error, result) => {
      if(!error){
        total=result;
        
        for(var i=1;i<=total;i++){
          
          generate_trow(i);
          
        
        }
      }
});
  }
   async function generate_trow(id){
     await todolist_sc.methods.getItem(id).call((err1,res1)=>{
           if(!err1){
            if(res1!=""){
              var item_id=id;
              var item_name=res1;
              document.getElementById("tableBody").appendChild(create_table_row(item_id,item_name));
            }
           }

          });
  }
  function create_table_row(id,name){
var elem_tr = document.createElement("tr");

var elem_td = document.createElement("td");

var elem_i = document.createElement("i");
elem_i.classList.add("fa");
elem_i.classList.add("fa-minus");
elem_i.setAttribute("id",id);
elem_i.addEventListener("click",(event)=>{
  var target_id=parseInt(event.target.id);
  var accounts;
  web3.eth.getAccounts().then(res=>{
  accounts=res;
   todolist_sc.methods.removeItem(target_id).send({from:accounts[0]},(err,res)=>{
    window.location.reload();
  });
});
 
});

var table_row=elem_tr;
var elem_id=elem_td;

elem_id.appendChild(document.createTextNode(id));
elem_tr.appendChild(elem_id);
var elem_td_2=document.createElement("td");
elem_td_2.appendChild(document.createTextNode(name));
elem_tr.appendChild(elem_td_2);
var elem_td_3=document.createElement("td");
elem_td_3.appendChild(elem_i);
elem_tr.appendChild(elem_td_3);
return elem_tr;
}