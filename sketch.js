var sound, fft, amplitude, r = 300, dr = 50;
var bg;

function preload(){
	sound = loadSound('assets/exactlylikeyou.mp3');
  bg = loadImage("assets/riccio.jpg");
}

function setup(){
  createCanvas(700,700);
  fft = new p5.FFT();
	fft.setInput(sound);
	sound.play();
  amplitude = new p5.Amplitude();
	amplitude.setInput(sound);
}

function draw(){

  backgroundImage(bg);

  strokeWeight(0);
  var myText = 'Exactly like you';
  textFont('Inconsolata');
  textAlign(CENTER);
  textSize(10);
  fill(255,255,255);
  text(myText, 160, 400);

  strokeWeight(1);

  translate(width/2,height/2);
	let waveform = fft.waveform();
	fill(255, 255, 255, 50);
	ellipse(160,-63,40*amplitude.getLevel(),40*amplitude.getLevel());
  fill(255,255,255, 40);
  beginShape();
  stroke(255,100);
  strokeWeight(2);
  for (let i = 0; i< waveform.length; i+=10){
		let ang = i*360/waveform.length;
		let x = (r)*cos(radians(ang));
    let y = (r)*sin(radians(ang));
    let a = map( waveform[i], -1, 1, r-dr, r+dr)*cos(radians(ang));// ;
    let b = map( waveform[i], -1, 1, r-dr, r+dr)*sin(radians(ang));// ;
    vertex(a,b);
		push();
		strokeWeight(1);
		stroke(255,100);
		line(x*2, y*2, a*2, b*2);
		pop();
  }
  endShape();
}


function backgroundImage(bg) {
  push();
  imageMode(CENTER);
  translate(width/2, height/2);
  let scale = Math.max(width / bg.width, height / bg.height);
  image(bg, 0, 0, bg.width * scale, bg.height * scale)
  pop();
}


function mousePressed(){
	if(!sound.isPlaying())sound.play();
}
