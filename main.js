class Calculator {
    constructor(previousValueDisplay, currentValueDisplay) {
        this.previousValueDisplay = previousValueDisplay;
        this.currentValueDisplay = currentValueDisplay;
        this.clear();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }

    delete(){
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    appendNum(num) {
        if (num === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + num.toString();
    }

    chooseOp(operation) {
        if(this.currentValue === '') return;
        if(this.previousValue !== '') {
            this.operate();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    operate() {
        let compute
        const pre = parseFloat(this.previousValue);
        const cur = parseFloat(this.currentValue);
        if (isNaN(pre) || isNaN(cur)) return;
        switch (this.operation) {
            case '+': 
                compute = pre + cur;
                break;
            case '-':
                compute = pre - cur;
                break;
            case 'x':
                compute = pre * cur;
                break;
            case '÷':
                compute = pre / cur;
                break;
            case '%':
                compute = pre % cur;
                break;
            default:
                return;
        }
        this.currentValue = compute;
        this.operation = undefined;
        this.previousValue = '';
    }

    addCommas(num) {
        const stringNum = num.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decDigits = stringNum.split('.')[1];
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }
        if(decDigits != null) {
            return `${intDisplay}.${decDigits}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        this.currentValueDisplay.innerText = 
            this.addCommas(this.currentValue);
        if(this.operation != null) {
            this.previousValueDisplay.innerText = 
                `${this.addCommas(this.previousValue)} ${this.operation}`;

        } else {
            this.previousValueDisplay.innerText = ''
        }
    }
}

const numBtns = document.querySelectorAll('[data-number]');
const opBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const acBtn = document.querySelector('[data-allclear]');
const previousValueDisplay = document.querySelector('[data-previous-value]');
const currentValueDisplay = document.querySelector('[data-current-value]');

const calculator = new Calculator(previousValueDisplay, currentValueDisplay);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNum(btn.innerText);
        calculator.updateDisplay();
    });
})

opBtns.forEach(op => {
    op.addEventListener('click', () => {
        calculator.chooseOp(op.innerText);
        calculator.updateDisplay();
    });
})

equalsBtn.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
})


acBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})