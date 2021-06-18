class Calculator {
    constructor(historyScreenElement, resultScreenElement){
        this.historyScreenElement = historyScreenElement;
        this.resultScreenElement = resultScreenElement;
        this.allClear();
    }

    allClear(){
        this.resultScreen = ""
        this.historyScreen = ""
        this.operator = undefined;
    }

    delete(){
        this.resultScreen = this.resultScreen.slice(0,-1);
    }

    appendNum(num){
        //Allows decimal (.) to be used once per number

        if (num === '.' && this.resultScreen.includes('.')) return;

        //convert to string to allow concatenation of number strings and not addition

        this.resultScreen = this.resultScreen.toString() + num.toString(); 
    }

    operation(operator){
        
        if (this.resultScreen === "") return
        if (this.historyScreen !== ""){
            this.calculate()
        }

        this.operator = operator
        this.historyScreen = this.resultScreen
        this.resultScreen = ""

    }
    

    calculate(){
        const firstEntry = parseFloat(this.historyScreen)
        const lastEntry = parseFloat(this.resultScreen)
        
        if (isNaN(firstEntry) || isNaN(lastEntry)) return; // Operator entry validation

        let calculation = null

        switch (this.operator){
            case '+':
                calculation = firstEntry + lastEntry;
                break;
            case '-':
                calculation = firstEntry - lastEntry;
                break;
            case '÷':
                calculation = firstEntry / lastEntry;
                break;
            case '×':
                calculation = firstEntry * lastEntry;
                break;
            default:
                return
        }

        this.resultScreen = calculation.toString()
        this.operator = null;
        this.historyScreen = "test";

    }

    updateScreen(){

        this.resultScreenElement.innerText = this.resultScreen

        //if operator has been selected with a number after, it will display them in the history screen
        if(this.operator != null){
            this.historyScreenElement.innerText = `${this.historyScreen} ${this.operator}`
        } else {
            this.historyScreenElement.innerText = ""
        }
    }
}



// Variables for 'history' and 'result' screen elements
const historyScreenElement = document.querySelector('[data-history]')
const resultScreenElement = document.querySelector('[data-result]')



// Button selector variables
// Intentional usage of querySelectorAll for unique buttons for array output

const allClearBtn = document.querySelectorAll('[data-all-clear]')
const deleteBtn = document.querySelectorAll('[data-delete]')
const equalsBtn = document.querySelectorAll('[data-equals]')
const operatorsBtn = document.querySelectorAll('[data-operation]')
const numbersBtn = document.querySelectorAll('[data-number]')



// Instantiate new calculator class

const calc = new Calculator(historyScreenElement,resultScreenElement)



/* 

********* All code before this line has been adapted from Web Dev Simplified - 
********* Calculator using Vanilla JavaScript 

*/


/* Function that takes in a button group, converts to array
and adds any specified event listener to each button, 
along with any number of class functions */

const clickEvent = (someBtn, eventType = 'click', ...funcs) => {
    const btnArr = Object.values(someBtn);

    btnArr.forEach(button => {
        button.addEventListener(eventType, (event) => {
            funcs.forEach(func => func(event));
        })
    })
}

// Adding click event listeners to each button group with their respective Calculator class functions

clickEvent(operatorsBtn, 'click', (e) => calc.operation(e.target.innerText), () => calc.updateScreen());

clickEvent(numbersBtn, 'click', (e) => calc.appendNum(e.target.innerText), () => calc.updateScreen());

clickEvent(allClearBtn, 'click', () => calc.allClear(), () => calc.updateScreen());

clickEvent(deleteBtn, 'click', () => calc.delete(), () => calc.updateScreen());

clickEvent(equalsBtn, 'click', () => calc.calculate(), () => calc.updateScreen());


