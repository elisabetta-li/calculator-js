buttonsNumberAndOperation = document.querySelectorAll('button[class=number-operation]');
buttonsOtherOperation = document.querySelectorAll('button[class=other]');
er = document.querySelector('p');
var input = document.querySelector('input');
var val1 = '';
var val2 = '';
var operator = '';
let err = ['Нет данных для удаления', 'Число превышает допустимое количество символов', 'Нет значений для вычисления', 'Делить на ноль нельзя', 'Число уже является дробным!'];

function errorOutput(errCode) {
    er.innerHTML = err[errCode];
    setTimeout(function(){
        er.innerHTML = '';
    }, 2000);
};

buttonsNumberAndOperation.forEach(button => {
    button.addEventListener('click', function() {   
        numberAndOperation(this.value);   
    if(this.value.match('[+*/-]')) {
            button.classList.add('active');
        } 
        else {
            buttonsNumberAndOperation.forEach(b => {
                b.classList.remove('active');
            });
        }
    }) 
});

buttonsOtherOperation.forEach(button => {
    button.addEventListener('click', function() {   
        otherOperation(this.value);     
    }) 
});
                                   
function numberAndOperation(value) {
    switch (value) { 
        case value.match('[0-9]') ? value: true:
            number(value);
            break;   
        case '=':
            equal('');
            break;    
        default:
            operations(value);
            break;
        
    }
} 
function otherOperation(value) {
    switch (value) {
        case 'AC':
            location.reload();  
        case 'C':
            if (input.value === '') {
                errorOutput(0);
            }
            else {
                input.value = input.value.substring(0, input.value.length-1);   
                if (operator === '') {
                    val1 = input.value;
                }
                else {
                    val2 = input.value;
                }
            }             
            break;
        case '.':
            if(input.value.length > 7) {                    
                errorOutput(1);               
                return;
            }
            if(operator === '') {
                val1 = changeValue(val1);
            }
            else {
                val2 = changeValue(val2);
            }
    } 
}

function changeValue(val) {
    switch(val){
        case '':
            input.value = '0.';
            val = '0.'; 
            break;
        case val.includes('.') ? val:true :
            errorOutput(4);
            break;
        default:
            val +='.';
            input.value += '.';
    }
    return val;
 }


function number(value) {
        switch(val1) {
            case '':
                val1 +=value;
                input.value +=value;
                break;                
        default: 
        switch (operator) {
            case '':
                if(input.value === '0') {
                    input.value = value;
                    val1 = value;
                }  
                else if (val1.length < 9) {
                    val1 +=value;
                    input.value +=value;
                }
                else {
                    errorOutput(1);
                }
                break;
            default:
                if(val2 === '') {
                    input.value = value;
                    val2 = value;
                }
                else if(input.value === '0') {
                    input.value = value;
                    val2 = value;
                } 
                else if(val2.length < 9) {
                    val2 +=value;
                    input.value +=value;
                }
                else {
                    errorOutput(1);
                }
                break;                         
        }
        }
}

function equal(value) { 
    var result;
    if (val1 === '' || operator === '' || val2 === '' ) {
        errorOutput(2);
        return;
    }
    else {
        val1 = Number(val1);
        val2 = Number(val2);
        switch(operator) {
            case '+':
                result = val1 + val2;
                break;
            case '-':
                result = val1 - val2;
                break;
            case '*':
                result = val1 * val2;
                break;
            case '/':
                if(val2 === 0) {
                    location.reload();
                    return;
                }
                else {
                  result = val1 / val2;  
                }
                break;
        }
    }

    if(String(result).includes('.') ){
        result = result.toFixed(3);           //округляем в меньшую сторону
        result = String(result).substring(0, result.length-1); 
        if(String(result).endsWith('00')) {
            result = result.substring(0, result.length-3); 
        }
        else if(String(result).endsWith('0')) {
            result = result.substring(0, result.length-1); 
        }        
    }
    if(String(result).length > 9) {
        result = Math.floor(result).toExponential(3);        //экспоненциальные числа - без дробной части
    }
    val1 = result;
    val2 = '';
    operator = value;       //для равно - 0, для оператора - его значение
    input.value = result;       
}
    
function operations(value) {
    switch(val1) {
        case '':
            if(value === '-' || value === '+') {
              val1 = '0';
            }
            else {
              val1 = '1';
            }
            operator = value;
            break;            
        default:
            switch(operator) {
                case '':
                    operator = value;
                    break;
                default:
                    switch(val2) {
                        case '':
                            operator = value;
                            break;
                        default:
                            equal(value);
                    }
            }
    }
}









