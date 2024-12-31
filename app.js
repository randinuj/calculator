class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            operator: null,
            waitingForOperand: false,
            previousValue: null,
        };
    }

    inputDigit(digit) {
        const { display, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                display: String(digit),
                waitingForOperand: false,
            });
        } else {
            this.setState({
                display: display === '0' ? String(digit) : display + digit,
            });
        }
    }

    inputDot() {
        const { display, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                display: '0.',
                waitingForOperand: false,
            });
        } else if (!display.includes('.')) {
            this.setState({
                display: display + '.',
            });
        }
    }

    clearDisplay() {
        this.setState({
            display: '0',
        });
    }

    toggleSign() {
        const { display } = this.state;
        this.setState({
            display: display.charAt(0) === '-' ? display.substr(1) : '-' + display,
        });
    }

    inputPercent() {
        const { display } = this.state;
        const value = parseFloat(display);

        this.setState({
            display: String(value / 100),
        });
    }

    performOperation(nextOperator) {
        const { display, operator, previousValue } = this.state;
        const inputValue = parseFloat(display);

        if (previousValue == null) {
            this.setState({
                previousValue: inputValue,
            });
        } else if (operator) {
            const currentValue = previousValue || 0;
            const newValue = this.calculate[operator](currentValue, inputValue);

            this.setState({
                display: String(newValue),
                previousValue: newValue,
            });
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator,
        });
    }

    calculate = {
        '/': (prev, next) => prev / next,
        '*': (prev, next) => prev * next,
        '+': (prev, next) => prev + next,
        '-': (prev, next) => prev - next,
        '=': (prev, next) => next,
    };

    render() {
        const { display } = this.state;

        return (
            <div className="calculator">
                <div className="display">{display}</div>
                <div className="buttons">
                    <button onClick={() => this.clearDisplay()}>AC</button>
                    <button onClick={() => this.toggleSign()}>±</button>
                    <button onClick={() => this.inputPercent()}>%</button>
                    <button className="operator" onClick={() => this.performOperation('/')}>÷</button>
                    <button onClick={() => this.inputDigit(7)}>7</button>
                    <button onClick={() => this.inputDigit(8)}>8</button>
                    <button onClick={() => this.inputDigit(9)}>9</button>
                    <button className="operator" onClick={() => this.performOperation('*')}>×</button>
                    <button onClick={() => this.inputDigit(4)}>4</button>
                    <button onClick={() => this.inputDigit(5)}>5</button>
                    <button onClick={() => this.inputDigit(6)}>6</button>
                    <button className="operator" onClick={() => this.performOperation('-')}>−</button>
                    <button onClick={() => this.inputDigit(1)}>1</button>
                    <button onClick={() => this.inputDigit(2)}>2</button>
                    <button onClick={() => this.inputDigit(3)}>3</button>
                    <button className="operator" onClick={() => this.performOperation('+')}>+</button>
                    <button onClick={() => this.inputDigit(0)} style={{ gridColumn: 'span 2' }}>0</button>
                    <button onClick={() => this.inputDot()}>.</button>
                    <button className="operator" onClick={() => this.performOperation('=')}>=</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
