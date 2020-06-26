let goGame = document.querySelector('#goGame');
goGame.addEventListener('click', start);
let restartGame = document.querySelector('#restartGame');
restartGame.addEventListener('click', restart);

let table = document.querySelector('#table');
let timeLeft = document.querySelector('#timeLeft');
let timerId;

//функция для запуска игры
function start(event) {
	event.target.disabled = true;		//блокируем кнопку
	timeLeft.innerHTML = 120;		//выставляем значение таймера
	timerId = setInterval(timer, 1000);		//присваеваем Id таймеру для дальнейшего его останова
	

	let trs = table.querySelectorAll('tr');		//находим столбцы (необходимо чтобы узнать размер нашей таблицы)
	let tds = table.querySelectorAll('td');		//находим ячейки
	let item = 1;		//будем сравнивать значение ячейки с этим числом
	for (let td of tds) {		//перебираем ячейки и навешиваем события
		td.style.cursor = 'pointer';
		td.addEventListener('click', function(event) {
			if (event.target.innerHTML == item) {		//если значение в ячейке и наше значение в переменной совпадает,- выделяем ее и увеливаем значение переменной
				event.target.classList.add('right');
				item += 1;
			};
			if (item == tds.length + 1) {		//если нашли все значения в ячейках по порядку от 1-го до n
				alert('You won!!!');
				clearTimeout(timerId);		//останавливаем таймер
				goGame.disabled = false;		//разблокируем кнопку старта
				timeLeft.innerHTML = 120;		//выставляем начальное время в абзаце
				createTable(table, trs.length + 1);		//создаем новую таблицу с большим размером
			};
		});
	};
};

//функция перезапуска игры
function restart() {
	let answer = confirm('Are you sure you want to start the game again?');
	if (answer) {		//если пользователь уверен что хочет начать игру сначала
		clearTimeout(timerId);		//останавливаем таймер
		goGame.disabled = false;		//разблокируем кнопку старта
		timeLeft.innerHTML = 120;		////выставляем начальное время в абзаце
		createTable(table);		//создаем новую таблицу размера 2х2
	};
};

//функция создания таблицы
function createTable(table, tableSize = 2) {		//передаем нашу таблицу и выставляем размер таблицы с "нуля"
	table.innerHTML = '';		//очищаем предыдущие ячейки
	let num1 = 1;		//первое число нашего массива чисел для заполнения таблицы
	let num2 = tableSize * tableSize;		//второе число нашего массива чисел для заполнения таблицы
	let arr = range(num1, num2);		//генерируем массив чисел в интервале м/д двумя значениями
	let newArr = shuffle(arr);		//перебираем массив чисел и устанавливаем в нем случайный порядок следования

	let k = 0;		//значение для выбора числа с массива чисел
	for (let i = 0; i < tableSize; i++) {		//заполняем tr
		let tr = document.createElement('tr');
		for (let j = 0; j < tableSize; j++) {		//заполняем td
			let td = document.createElement('td');
			td.innerHTML = newArr[k];		//записываем значение в ячейку из массива
			k++;
			tr.appendChild(td);
		};
		table.appendChild(tr);
	};
};

//содание таблицы по заходу на страницу
createTable(table);

//создание массива чисел в интервале между двумя значениями для таблицы
function range(num1, num2) {
	let arr = [];
	for (let i = num1; i <= num2; i++) {
		arr.push(i);
	};
	return arr;
};

//создание массива чисел в произвольном порядке без повторения
function shuffle(arr) {
	return arr.sort(function() {
		return Math.random() - 0.5;
	});
};

//запуск таймера обратнго отсета и проверки оставшегося времени
function timer() {
	timeLeft.innerHTML = parseInt(timeLeft.innerHTML) - 1;		//уменьшаем время в абзаце
	if (timeLeft.innerHTML < 0) {		//производим проверку, если время вышло, перезапускаем игру
		alert('You lost...Try again');
		clearTimeout(timerId);		//останавливаем таймер
		goGame.disabled = false;		//разблокирем кнопку
		timeLeft.innerHTML = 120;		//выставляем начальное время
		createTable(table);		//создаем заново таблицу
	};
};