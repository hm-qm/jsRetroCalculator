class Calculator {
    constructor(historyScreenElement, resultScreenElement){
        this.historyScreenElement = historyScreenElement;
        this.resultScreenElement = resultScreenElement;
        this.allClear();
    }
    allClear(){
        this.historyScreen = ""
        this.resultScreen = ""
        console.log('allClear function activated')
    }
    delete(){
        this.resultScreen = this.resultScreen.slice(0,-1);
    }
    appendNum(num){
        if (num === '.' && this.resultScreen.includes('.')) return;
        this.resultScreen = this.resultScreen + num.toString();
    }
    operation(operator){
        console.log('operation function activated');
    }
    calculate(){
        console.log('calculate function activated');
    }
    updateScreen(){
        this.resultScreenElement.innerText = this.resultScreen
        console.log('updateScreen function activated');
    }
}



// Variables for 'history' and 'result' screen elements
const historyScreenElement = document.querySelector('[data-history]')
const resultScreenElement = document.querySelector('[data-result]')



// Button selector variables
// Intentional usage of querySelectorAll for unique buttons for array output

const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const operatorsBtn = document.querySelectorAll('[data-operation]')
const numbersBtn = document.querySelectorAll('[data-number]')



// Instantiate new calculator class

const calc = new Calculator(historyScreenElement,resultScreenElement)



// Adding event listeners to button groups, and their respective functions


operatorsBtn.forEach( button => {
    button.addEventListener('click', () => {
        calc.operation(button.innerText)
        calc.updateScreen()
    })
})

numbersBtn.forEach( button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText)
        calc.updateScreen()
    })
})

allClearBtn.addEventListener('click', () => {
    calc.allClear()
    calc.updateScreen()
})

deleteBtn.addEventListener('click', () => {
    calc.delete()
    calc.updateScreen()
})

equalsBtn.addEventListener('click', () => {
    calc.calculate()
    calc.updateScreen()
})

