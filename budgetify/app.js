console.log('hey supp...')
var budgetController = (
	function(){
		var totalBudget = 0;
		var Expense = function(id , description , value){
			this.id = id ;
			this.description = description;
			this.value = value
		}

		var Income = function(id , description , value){
			this.id = id ;
			this.description = description;
			this.value = value
		}

		var data = {
			totals : {
				exp : 0,
				inc : 0
			},
			allItems :{
				exp : [] ,
				inc : []
			}
		}

		var showItem = function(){
			console.log(data)
		}

		var updateExpIncAndbudget = function(type , val){
			data.totals[type] += val;
			if (type === 'exp'){
				totalBudget -= val;
			}
			else if (type === 'inc'){
				totalBudget += val;
			}
			return {
				exp : data.totals.exp ,
				inc : data.totals.inc ,
				totalBudget : totalBudget
			}
		}

		var deleteItemFromBudget = function(ID , type){
			var arr = data.allItems[type].map((curr)=>{
				return curr.id;
			});
			index = arr.indexOf(ID);

			if(index !== -1){
				arr.splice
			}
		}

		return {
			addItem : function(type , description , value){ 
				var newItem , id;
				if (data.allItems[type].length !== 0){
					id = data.allItems[type][data.allItems[type].length - 1].id +1;
				} 
				else{
					id = 0;
				}

				if (type === 'exp'){
					var newItem = new Expense(id , description , value);
				}
				else if (type === 'inc'){
					var newItem = new Income(id , description , value);
				}
				data.allItems[type].push(newItem)
				return newItem;
			},
			updateExpIncAndbudget : updateExpIncAndbudget ,
			showItem : showItem  ,
			deleteItemFromBudget : deleteItem 
		}
	}
)()


/// UI controller
var UIController = (
	function(){
		DOMStrings = {
			addDescription : ".add__description",
			addValue : '.add__value',
			addType : ".add__type" ,
			addButton : ".add__btn",
			incomeList :".income__list" ,
			expenseList : ".expenses__list",
			budgetValue : ".budget__value" ,
			budgetIncome :  ".budget__income--value" ,
			budgetExpense : ".budget__expenses--value" , 
			container : '.container'
		}
		return {
			getInput : function(){
				return {
					type : document.querySelector(DOMStrings.addType).value ,
					value : parseFloat(document.querySelector(DOMStrings.addValue).value) ,
					description : document.querySelector(DOMStrings.addDescription).value
				}
			},
			getDOMStrings : function(){
				return DOMStrings
			} , 

			addItemList : function(type , obj){
				//Add the Html placeholder
				var html
				
				if (type === 'inc'){
				html = `<div class="item clearfix" id="income-${obj.id}">
					<div class="item__description">${obj.description}</div>
					<div class="right clearfix">
						<div class="item__value">${obj.value}</div>
						<div class="item__delete">
							<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
						</div>
					</div>
				</div>`
				// Insert the HTML into the DOM
				document.querySelector(DOMStrings.incomeList).insertAdjacentHTML('beforeend' , html)
				}

				else if(type === 'exp'){
					html = `<div class="item clearfix" id="expense-${obj.id}">
					<div class="item__description">${obj.description}</div>
					<div class="right clearfix">
						<div class="item__value">${obj.value}</div>
						<div class="item__delete">
							<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
						</div>
					</div>
				</div>`
				// Insert the HTML into the DOM
				document.querySelector(DOMStrings.expenseList).insertAdjacentHTML('beforeend' , html)	
				}
			} ,
			clearFields : function(){
				list = document.querySelectorAll(DOMStrings.addDescription + ", " + DOMStrings.addValue)
				console.log(list);
				arrayList = Array.prototype.slice.call(list) ;
				console.log(arrayList) ;
				arrayList.forEach(function(ele){
					ele.value = "";
				});

				arrayList[0].focus();
			} ,
			updateBudgetAndExpIncUI : function(budget , exp , inc){
				document.querySelector(DOMStrings.budgetValue).textContent = budget ;
				document.querySelector(DOMStrings.budgetIncome).textContent = inc ;
				//document.querySelector(".budget__income--value").textContent = inc ; 
				document.querySelector(DOMStrings.budgetExpense).textContent = exp ;
			}
		}	
})()

/// appController

var appController = (
	function(UICntl , budgetCntl){

		var setupEventListeners = function(){
			var DOM = UICntl.getDOMStrings();
			addButton = document.querySelector(DOM.addButton);
			addButton.addEventListener('click' , cntrlAddItem)
			document.addEventListener('keypress' , function(event){
				if(event.keyCode === 13 || event.which === 13){
					cntrlAddItem();
				}
			});
			document.querySelector(DOM.container).addEventListener('click' , deleteItem) ;
		} 

		var cntrlAddItem = function(){

			// Get the input feilds from the UI
			var inputs = UICntl.getInput() ;
			console.log("This is the input...")
			console.log(inputs)

			if (inputs.description !== "" && inputs.value > 0 && !isNaN(inputs.value)){

				// Add the item to the budget controller
				newItem = budgetCntl.addItem(inputs.type , inputs.description , inputs.value)           
				budgetCntl.showItem()
				
				// Add the items to the UI
				UICntl.addItemList(inputs.type , newItem)

				// Clear the feilds 
				UICntl.clearFields();


				// Update the Total Budget and the Income and expense on budget Controllers
				var output = budgetCntl.updateExpIncAndbudget(inputs.type , parseFloat(inputs.value))
				budgetCntl.showItem();
				console.log("this is the updated output ...")
				console.log(output)

				// Add these values to the UI
				UICntl.updateBudgetAndExpIncUI(output.totalBudget , output.exp , output.inc);
			}
		}

		var deleteItem = function(event){
			var splitID , type , ID;
			splitID = event.target.parentNode.parentNode.parentNode.parentNode.id.split("-") ;
			type = splitID[0];
			ID = splitID[1];

			// Delete the item from the datastructure ....
		}

		return {
			init : function(){
				console.log('the application has started and listening...')
				setupEventListeners()
			}
		}
			
	}
)(UIController , budgetController)

appController.init()