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
			showItem : showItem ,
			updateTop : function(val){
				totalBudget += val;
			}
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
			expenseList : ".expenses__list"
		}
		return {
			getInput : function(){
				return {
					type : document.querySelector(DOMStrings.addType).value ,
					value : document.querySelector(DOMStrings.addValue).value ,
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
					cntrlAddItem()
				}
			})
		}

		var cntrlAddItem = function(){

			// Get the input feilds from the UI
			var inputs = UICntl.getInput() ;
			console.log(inputs)

			// Add the item to the budget controller
			newItem = budgetCntl.addItem(inputs.type , inputs.description , inputs.value)
			budgetCntl.showItem()
			
			// Add the items to the UI
			UICntl.addItemList(inputs.type , newItem)

			// Update the Total Budget and the Income and expense on budget Controllers
			budgetCntl.updateTop(newItem.value)
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