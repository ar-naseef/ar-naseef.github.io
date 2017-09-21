var main_grid = document.getElementById("main_grid");
var grid_html;
var level = 2;
var svg_size = 550;
var first_box = [];
var random_answer_box;
var positions = [];
var int;
var wins = 0;
var loader = document.getElementById("loader");
var heading = document.getElementById("heading");
var menu = document.getElementById("menu");
var win_width = window.innerWidth;
var menu_btn = document.getElementById("menu_btn").onclick = function() {
	heading.innerHTML = "MENU";
	main_grid.style.display = "none";
	menu.style.display = "block";
	score_board.style.display = "none";
	stopTimer();
};
var timer = document.getElementById("timer");
var score_board = document.getElementById("score_board");
var score = document.getElementById("score");
var lives = document.getElementById("lives");
var leveldis = document.getElementById("leveldis");
var scoreNow = 0;
var livesLeft = 5;

function restartGame() {
	scoreNow = 0;
	livesLeft = 5;
	level = 2;
	mainLoad();
}

function updateScoreBoard() {
	score.innerHTML = "Score: " + scoreNow;
	lives.innerHTML = "Lives: " + livesLeft;
	leveldis.innerHTML = "Level: " + (level-1); 
}

function stopTimer() {
	clearInterval(int);
	timer.style.display = "none";
}

function startTimer() {
	int = setInterval(load2, 20);
	var rad = 90;
	var timerLen = 1/level;
	timer.style.display = "block";
	function load2() {
		if (rad == 0) {
			clearInterval(int);
			if (livesLeft == 0) {
				alert("Game over!\n\nyour score: "+scoreNow+"\n\nRestart Game");
				restartGame();
			} else {
				alert("Time up!! try again");
				livesLeft--;
				mainLoad();				
			}

		} else {
			rad -= timerLen;
			timer.setAttribute("r", rad);
		}
	}
}

function showMenu() {
	var right = (win_width - (40*win_width/100))/2;
	menu.style.right = right;
	heading.innerHTML = "MENU";
	menu.style.display = "block";

	var play_btn = document.getElementById("play_btn").onclick = function() {
		mainLoad();
		menu.style.display = "none";
		main_grid.style.display = "block";
		score_board.style.display = "block";
	};
}

function animate() {
	loader.style.display = "block";
	var len = 0;
	var animater = document.getElementById("animater");
	var anim = setInterval(load,1);

	function load() {
		if (len == 98.5) {
			clearInterval(anim);
			loader.style.display = 'none';
			main_grid.style.display = 'block';
			showMenu();
		} else {
			len += 0.5;
			animater.style.width = len + "%";
			if (len%5 == 0) {
				animater.innerHTML = len+"%";
			}
		}
	}
}

function make_answer(lev) {
	var n = lev + 1;
	var n_boxes = n * n;

	random_answer_box = Math.floor(Math.random()*1000%(n_boxes)) + 1;
	while (random_answer_box == 1) {
		random_answer_box = Math.floor(Math.random()*1000%(n_boxes)) + 1;
	}

	var row = random_answer_box%n;
	var col = Math.floor((random_answer_box)/n)+1;
	
	if (row == 0) {
		row = n;
		col -= 1;
	}
	
	var postion = (4*n*(col-1)*4) + 4*(row-1) + 1;
	var count = 0;
	for (var i=1; i<=4; i++) {
		for (var j=postion; j<(postion+4); j++) {
			positions[count] = j;
			count++;
		}
		postion = postion + 4;
		postion = postion + (n*4) - 4;
	}

	for (var i=0; i< 4*4; i++) {
		if (first_box[i] == 1) {
			document.getElementById("small_box"+positions[i]).style.fill = "rgb(0,0,0)";
		} else {
			document.getElementById("small_box"+positions[i]).style.fill = "rgb(255,255,255)";
		}
	}
}

function creat_boxes(level) {
	var n = level + 1;
	var big_boxes = '';
	var grid_side = svg_size/n;
	var count = 1;
	for (var i=0; i<n; i++) {
		for (var j=0; j<n; j++) {
			big_boxes += '<rect '+'id=big_box'+count+' onclick="check_win(this.id)" x="'+i*grid_side+'" y="'+j*grid_side+'" height="'+grid_side+'" width="'+grid_side+'" style="fill:rgb(255,255,255);stroke-width:4;stroke:rgb(0,0,0);fill-opacity: 0.3"></rect>';
			count++;
		}
	}

	return big_boxes;
}

function creat_small_boxes(level) {
	var html_code = ``;
	var n = level + 1;
	var count = 1;
	var box_size = svg_size/(n*4);
	
	var temp_counter = 0;
	for (var i=0; i<n*4; i++) {
		for (var j=0; j<n*4; j++) {
			var fill_bool = Math.floor(Math.random()*10%2);
			if(j<4 && i<4) {
				first_box[temp_counter] = fill_bool;
				temp_counter++;
			}
			html_code += `<rect `+`id=small_box`+count+` x="`+i*box_size+`" y="`+j*box_size+`" height="`+box_size+`" width="`+box_size+`" style="fill:rgb(`+fill_bool*255+`,`+fill_bool*255+`,`+fill_bool*255+`);stroke-width:1;stroke:rgb(0,0,0)"></rect>`;
			count++;
		}
	}

	var big_boxes = creat_boxes(level);
	html_code += big_boxes;

	return html_code;	
}

function mainLoad() {
	heading.innerHTML = "LOST";
	var html_code = creat_small_boxes(level);
	main_grid.innerHTML = html_code;
	var big_box1 = document.getElementById("big_box1");
	make_answer(level);
	startTimer();
	updateScoreBoard();
}

function check_win(clicked_id) {
	stopTimer();
	var corr_ans = 'big_box' + random_answer_box;
	if (clicked_id == corr_ans) {
		wins++;
		scoreNow = scoreNow + (level-1);
		if (level <= 5 && wins == 3) {
			alert('correct answer.. next level !!!');
			level++;
			wins = 0;
		} else {
			alert('correct answer.. :)');
		}
		console.log(wins);
		mainLoad();
	} else {
		if (livesLeft == 0) {
			alert("Game over!\nyour score: "+scoreNow+"\nRestart Game");
			restartGame();
		} else {
			alert('wrong answer');
			livesLeft -= 1;
			mainLoad();
		}
	}
}