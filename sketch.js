var starImg, bgImg;
var star, starBody;
//criar variável para sprite de fada e imgFada
var fadinha, fadinhaAnima; 

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
  starImg = loadImage("images/star.png");
  bgImg = loadImage("images/starNight.png");
  //carregar animação de fada 
  fadinhaAnima = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
}

function setup() {
  createCanvas(800, 750);
  //criar sprite de fada e adicionar animação para fada
  fadinha = createSprite(200,300);
  fadinha.addAnimation("vou",fadinhaAnima);
  fadinha.scale = 0.2;

  star = createSprite(650, 30);
  star.addImage(starImg);
  star.scale = 0.2;

  engine = Engine.create();
  world = engine.world;

  starBody = Bodies.circle(650, 30, 5, {
    restitution: 0.5,
    isStatic: true
  });
  World.add(world, starBody);

  Engine.run(engine);

}

function draw() {
  background(bgImg);

  //fazer com que posição do sprite seja a mesma que a do corpo starBody
  star.x = starBody.position.x
  star.y = starBody.position.y

  //se a estrela encostar na fada, o corpo fica estático
  /*
	exemplo:
	if(star.y > 470 && starBody.position.y > 470 ){
  	Matter.Body.setStatic(starBody,true);
	}
	Ajustar posição de acordo com a posição e o tamanho da sua fada
	*/
  if(star.y > 250 && starBody.position.y > 250 ){
  	Matter.Body.setStatic(starBody,true);
  }
  drawSprites();
}

function keyPressed() {
  //**lembrar que dentro do function keyPressed() usamos keyCode ====

   //se a seta para a direita for apertada, o x da fada aumenta
  if (keyCode === 39) {
    fadinha.x += 39
  }

  //se a seta para a esquerda for apertada, o x da fada diminui
  if (keyCode === 37) {
    fadinha.x -= 39
  }

  //se a seta para baixo for apertada, estrela deixa de ser estática
  if (keyCode === 40) {
    Body.setStatic(starBody,false)
  }
}