class Food{
    constructor(){
        this.foodStock = 0;       
        this.image = loadImage('images/Milk.png');
    }

    bedroom(){
        background(bedroomImg, 550,500)
    }
    washroom(){
        background(washRommImg, 550,500)
    }
    garden(){
        background(gardenImg, 550,500)
    }

    display(){
        var x = 80, y = 100;

        //console.log(this.foodStock)

       // imageMode(CENTER)
       if(this.foodStock!== 0){
            for (let index = 0; index < this.foodStock; index++) {
                if(index%10===0){
                    x = 80;
                    y = y+50;
                }
                
                image(this.image, x,y,50,50);
                x=x+30;
            }
        }

    }
}