class Calculator{
    constructor(towriteoperandText, currentoperandText){
        this.towriteoperandText = towriteoperandText
        this.currentoperandText = currentoperandText
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.towriteOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.towriteOperand != ''){
            this.compute()
        }
        this.operation = operation
        this.towriteOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const towrite = parseFloat(this.towriteOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(towrite) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = towrite + current
                break;
            case '-':
                computation = towrite - current
                break;
            case '*':
                computation = towrite * current
                break;
            case '÷':
                computation = towrite / current
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.towriteOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    updateDisplay(){
        this.currentoperandText.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.towriteoperandText.innerText = 
            `${this.getDisplayNumber(this.towriteOperand)} ${this.operation}`
        }else{
            this.towriteoperandText.innerText = ''
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const towriteoperandText = document.querySelector('[data-to-write-operand]');
const currentoperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(towriteoperandText, currentoperandText)

numberButton.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})