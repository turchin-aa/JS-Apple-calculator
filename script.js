document.addEventListener('DOMContentLoaded', () => {

    let a = ''; // первое число
    let b = ''; // второе число
    let sign = ''; // знак операции
    let finish = false;

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['-', '+', '×', '÷'];

    const calc = document.querySelector('.calc') // весь калькулятор, чтобы отменить дефолтное взаимодействие
    const out = document.querySelector('.calc-screen p'); // число ввода
    const ac = document.querySelector('.ac'); // кнопка очистки
    const buttons = document.querySelector('.buttons'); // блок кнопок
    const operationButtons = document.querySelectorAll('.division, .multiply, .minus, .plus')

    calc.addEventListener('contextmenu', (e) => e.preventDefault())
    calc.addEventListener('mousedown', (e) => e.preventDefault())

    const unpressedButtonOperation = () => {
        operationButtons.forEach(btn => {
            btn.style.background = '#ff9501';
            btn.style.color = '#fff';
        })
    }

    const pressedButtonOperation = () => {
        operationButtons.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                if (btn.style.background = '#fff') {
                    unpressedButtonOperation()
                }
                btn.style.background = '#fff';
                btn.style.color = '#ff9501';
            })
        })
    }
    pressedButtonOperation()

    const clearAll = () => {
        a = '';
        b = '';
        sign = ''; //функция очистки поля
        finish = false;
        out.textContent = 0;
        if (ac.textContent === 'C') {
            ac.textContent = 'AC'
        }
    }

    buttons.addEventListener('click', (event) => {
        let target = event.target; // для удобства
        // проверяем, что нажата именно кнопка, а не область
        if (target && target.classList.contains('btn')) {

            if (target !== target.classList.contains('ac')) {
                ac.textContent = 'C'
            }

            // если нажата кнопка очистки, то вызываем функцию очистки
            if (target.classList.contains('ac')) {
                unpressedButtonOperation()
                clearAll();
                return;

            }
            out.textContent = '';
            const key = target.textContent; // получение значения нажатой кнопки
            //если нажата цифра 0-9 или точка
            if (digit.includes(key)) {
                if (b === '' && sign === '') {
                    a += key;
                    out.textContent = a;
                } else if (a !== '' && b !== '' && finish) { //если нажали равно
                    unpressedButtonOperation()
                    b = key;
                    finish = false;
                    out.textContent = b;
                } else {
                    unpressedButtonOperation()
                    b += key;
                    out.textContent = b; // ввод нового числа после расчетов
                }
                return;

            } else if (key === '+/-' && a !== '' && b === '') {
                a = -a
                out.textContent = a
            } else if (key === '+/-' && a !== '' && b !== '') {
                b = -b
                out.textContent = b
            } else if (key === '%' && a !== '' && b === '') {
                a = a / 100
                out.textContent = a
            } else if (key === '%' && a !== '' && b !== '') {
                b = b / 100
                out.textContent = b
            }

            if (action.includes(key)) {
                sign = key;
                out.textContent = a;
                return;
            } else if (sign !== '' && a !== '' && b !== '' && key === '%') {
                a = (a / 100) * b * 100;
                out.textContent = a
            }
            if (key === '=') {
                if (b === '') {
                    b = a;
                }
                switch (sign) {
                    case '+':
                        a = (+a) + (+b)
                        break;
                    case '-':
                        a = (+a) - (+b)
                        break;
                    case '×':
                        a = (+a) * (+b)
                        break;
                    case '÷':
                        if (b === '0') {
                            out.textContent = 'Ошибка'
                            a = '';
                            b = '';
                            sign = '';
                            return
                        }
                        a = (+a) / (+b)
                        break;
                }
                finish = true;
                out.textContent = a;
            }
        }
    })

})