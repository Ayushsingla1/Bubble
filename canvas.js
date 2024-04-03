var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c = canvas.getContext('2d');
let radius=30;
var mouse={
    x: undefined,
    y: undefined
}
let arr=[];
var colorarr=[
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#298089'
]

function init(){
    for(let i =0 ; i< 800 ; i++){
        let x = Math.random() * (innerWidth - 2*radius) + 30;
        let y = Math.random() * (innerHeight - 2*radius) + 30;
        let dx=Math.random() * 3;
        let dy=Math.random() * 3;
        let minRadius=Math.floor(Math.random() * 3) + 1;
        arr.push(new circle(x,y,dx,dy,minRadius,radius,40));
    }
  }

window.addEventListener('resize',function(){
  arr=[];
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  init();
})

window.addEventListener('mousemove',function(event){
        mouse.x = event.x,
        mouse.y = event.y
})

function circle(x,y,dx,dy,minRadius,radius,maxRadius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.minRadius=2;
    this.radius=Math.floor(Math.random() * 4) + 1;
    this.maxRadius=40;
    this.color=colorarr[Math.floor(Math.random() * 4)];

    this.create=function(){
        c.beginPath();
        
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }

    this.update=function(){
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx=-this.dx;
        }
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius< this.maxRadius){
            this.radius += 1;
        }
        else if(this.radius > this.minRadius){
            this.radius-=1;
        }
        this.create();

    }
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<800;i++){
        arr[i].update();
    }
}

init();
animate();

