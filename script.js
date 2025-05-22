document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const multiplicationBtn = document.getElementById('multiplication');
    const divisionBtn = document.getElementById('division');
    const mixedBtn = document.getElementById('mixed');
    const rangeTypeSelect = document.getElementById('range-type');
    const numberSelect = document.getElementById('number');
    const exercisesContainer = document.getElementById('exercises');
    const checkBtn = document.getElementById('check');
    const resetBtn = document.getElementById('reset');
    
    // Текущие настройки
    let currentOperation = 'multiplication';
    let currentRangeType = 'on';
    let currentNumber = 2;
    
    // Установка обработчиков событий
    multiplicationBtn.addEventListener('click', function() {
        currentOperation = 'multiplication';
        generateExercises();
    });
    
    divisionBtn.addEventListener('click', function() {
        currentOperation = 'division';
        generateExercises();
    });
    
    mixedBtn.addEventListener('click', function() {
        currentOperation = 'mixed';
        generateExercises();
    });
    
    rangeTypeSelect.addEventListener('change', function() {
        currentRangeType = rangeTypeSelect.value;
        generateExercises();
    });
    
    numberSelect.addEventListener('change', function() {
        currentNumber = parseInt(numberSelect.value);
        generateExercises();
    });
    
    checkBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', resetExercises);
    
    // Генерация упражнений
    function generateExercises() {
        exercisesContainer.innerHTML = '';
        const exercises = [];
        
        if (currentOperation === 'multiplication') {
            generateMultiplicationExercises(exercises);
        } else if (currentOperation === 'division') {
            generateDivisionExercises(exercises);
        } else {
            generateMultiplicationExercises(exercises);
            generateDivisionExercises(exercises);
        }
        
        // Выбираем 10 случайных уникальных примеров
        const shuffled = shuffleArray(exercises).slice(0, 10);
        
        // Создаем две колонки
        const column1 = document.createElement('div');
        column1.className = 'exercise-column';
        const column2 = document.createElement('div');
        column2.className = 'exercise-column';
        
        // Распределяем примеры по колонкам
        shuffled.forEach((exercise, index) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'exercise';
            exerciseElement.innerHTML = `
                <p>${exercise.question} =</p>
                <input type="number" data-answer="${exercise.answer}">
            `;
            
            if (index < 5) {
                column1.appendChild(exerciseElement);
            } else {
                column2.appendChild(exerciseElement);
            }
        });
        
        exercisesContainer.appendChild(column1);
        exercisesContainer.appendChild(column2);
    }
    
    function generateMultiplicationExercises(exercises) {
        const numbers = currentRangeType === 'on' 
            ? [currentNumber] 
            : Array.from({length: currentNumber - 1}, (_, i) => i + 2);
        
        for (let a of numbers) {
            for (let b = 1; b <= 10; b++) {
                if (currentRangeType === 'on' || (a <= currentNumber && b >= currentNumber)) {
                    exercises.push({
                        question: `${a} × ${b}`,
                        answer: a * b
                    });
                }
            }
        }
    }
    
    function generateDivisionExercises(exercises) {
        const divisors = currentRangeType === 'on' 
            ? [currentNumber] 
            : Array.from({length: currentNumber - 1}, (_, i) => i + 2);
        
        for (let b of divisors) {
            for (let multiplier = 1; multiplier <= 10; multiplier++) {
                const a = b * multiplier;
                exercises.push({
                    question: `${a} ÷ ${b}`,
                    answer: multiplier
                });
            }
        }
    }
    
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    // Проверка ответов
    function checkAnswers() {
        const inputs = exercisesContainer.querySelectorAll('input');
        let allCorrect = true;
        
        inputs.forEach(function(input) {
            const userAnswer = parseInt(input.value);
            const correctAnswer = parseInt(input.dataset.answer);
            
            if (isNaN(userAnswer)) {
                input.classList.add('incorrect');
                allCorrect = false;
            } else if (userAnswer !== correctAnswer) {
                input.classList.add('incorrect');
                allCorrect = false;
            } else {
                input.classList.remove('incorrect');
            }
        });
        
        checkBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        
        if (allCorrect) {
            alert('Молодец! Все ответы правильные!');
        }
    }
    
    // Сброс упражнений
    function resetExercises() {
        exercisesContainer.innerHTML = '';
        generateExercises();
        checkBtn.style.display = 'block';
        resetBtn.style.display = 'none';
    }
    
    // Инициализация
    generateExercises();
});