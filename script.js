document.addEventListener('DOMContentLoaded', () => {

    let a = ''; // первое число
    let b = ''; // второе число
    let sign = ''; // знак операции
    let finish = false;

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['-', '+', '×', '÷', '%', '+/-'];

    const out = document.querySelector('.calc-screen p'); // число ввода
    const ac = document.querySelector('.ac'); // кнопка очистки
    const buttons = document.querySelector('.buttons'); // блок кнопок

    const percent = (number, numberOfPercent) =>{     //функция подсчета процента
        if (numberOfPercent === number){
            return number/100 
        }
        return (number/100) * numberOfPercent
    }

    const clearAll = () => {
        a = '';
        b = '';
        sign = '';                      //функция очистки поля
        finish = false;
        out.textContent = 0;
    }

    buttons.addEventListener('click', (event) => {
        let target = event.target; // для удобства
        // проверяем, что нажата именно кнопка, а не область
        if (target && target.classList.contains('btn')) {
            // если нажата кнопка очистки, то вызываем функцию очистки
            if (target.classList.contains('ac')) {
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
                    b = key;
                    finish = false;
                    out.textContent = b;
                } 
                 else {
                    b += key;
                    out.textContent = b; // ввод нового числа после расчетов
                }
                return;
            }

            if (action.includes(key)) {
                sign = key;
                out.textContent = sign;   //вывод знака операции
                return;
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
                    case '+/-':
                        a = -(+a)
                        break;
                    case '%':
                        a = percent(a, b)
                        break;
                }
                finish = true;
                out.textContent = a;
            }
        }
    })

})