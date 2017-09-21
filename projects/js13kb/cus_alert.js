var big_div1 = document.createElement('div');
big_div1.setAttribute('id', 'big_div');
big_div1.style.display = 'none';
document.body.appendChild(big_div1);

function cus_alert(msg) {

	var big_div = document.getElementById('big_div');
	big_div.style.position = 'fixed';
	big_div.style.left = '0';
	big_div.style.top = '0';
	big_div.style.width = '100%';
	big_div.style.height = '100%';
	big_div.style.background = 'rgba(0,0,0,0.5)';
	big_div.style.display = 'block';

	big_div.innerHTML = "<div id='msg_box'></div>";

	var small_div = document.getElementById('msg_box');
	small_div.style.margin = '18% auto';
	small_div.style.padding = '25px'
	small_div.style.width = '50%';
	small_div.style.border = '2px solid #111';
	small_div.style.background = '#ddd';
	small_div.innerHTML = "<p>" + msg + "<span id='close_msg'>X</span></p>";

	var button = document.getElementById('close_msg');
	button.style.float = 'right';
	button.onclick = function() {
		big_div.style.display = 'none';
	};
}