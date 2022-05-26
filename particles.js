const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.backgroundColor = "black"
let colors = ["#242F9B","#646FD4","#9BA3EB","#DBDFFD","#A91079","#F806CC"]
let balls = []

const mouse ={
    x : undefined,
    y : undefined
}


window.addEventListener("resize", ()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
    balls = []
    init(800)

})

window.addEventListener("mousemove", e => {
    mouse.x = e.x
    mouse.y = e.y
})

function ball(x,y,dx,dy,r){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.minradius = Math.floor(Math.random() * r) * 2
    this.maxradius = Math.floor(Math.random() * 10*r) + 5*r
    this.c = colors[Math.floor(Math.random()*colors.length)]

    this.draw = () => {
                                     
        
        // ctx.fillStyle = this.c                            //for squares
        // ctx.fillRect(this.x,this.y,this.r,this.r)

        ctx.beginPath()  
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)     //for circles
        ctx.fillStyle = this.c
        ctx.fill()
        
    }

    this.update = () =>{
        this.draw()

        if(this.x+this.r > innerWidth || this.x-this.r < 0){
            dx = -dx
        }
        if(this.y+this.r > innerHeight || this.y-this.r < 0){
            dy = -dy
        }
        this.x+=dx
        this.y+=dy

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            // console.log(`mx : ${mouse.x} ,my : ${mouse.y}\ntx : ${this.x} ty : ${this.y}\n\n`)
            if(this.r < this.maxradius)
                this.r+=1
        }
        else{
            if(this.r > this.minradius){
                this.r -= 1
            }
        }
    }
}

const init = limit => {
    for(let i = 0;i<limit;i++){
        let r =Math.floor(Math.random() * 10)
        let x = Math.floor(Math.random() * (innerWidth-2*r) + r)
        let y = Math.floor(Math.random() * (innerHeight-2*r) + r)
        let dx =( Math.random() - 0.5 ) * 3
        let dy =( Math.random() - 0.5 ) * 3
        balls.push(new ball(x,y,dx,dy,r))
    }
}

function animate(){
    ctx.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)

    for(let ball of balls){
        ball.update()
    }
   

}

animate()
init(800)