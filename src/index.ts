import "./style/index.less";

//定义食物类
class Food {
  //定义一个属性表示食物所对应的元素
  element: HTMLElement;
  constructor() {
    //获取页面中的food元素赋值给element
    this.element = document.getElementById("food")!;
  }

  //定义一个获取食物x坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  //定义getY坐标
  get Y() {
    return this.element.offsetTop;
  }

  //修改食物的位置
  change() {
    //生成随机的位置
    //最小0 最大290
    //蛇移动一次就是10px 食物坐标必须整10
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  constructor() {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }
  addScore = () => {
    ++this.score;
    console.log(this.score)
    this.scoreEle.innerHTML = this.score + "";
    if (this.score % 10 === 0) {
      this.levelUp();
    }
  };

  //等级提升
  levelUp = () => {
    if (this.level < 10) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  };
}
class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector("#snake>div")!;
    this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
    this.element = document.getElementById("snake")!;
  }

  //获取蛇的坐标（蛇头
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  //设置坐标

  set X(value: number) {
    //如果新值和旧值相同则不修改
    if (this.X === value) return;
    if (value < 0 || value > 309) {
      throw new Error("撞墙了");
    }
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody()
  }

  set Y(value: number) {
    if (this.Y === value) return;
    if (value < 0 || value > 309) {
      throw new Error("撞墙了");
    }
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody()
  }

  //增加身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  moveBody = () => {
    // 将后边身体的位置设置为前面身体的位置
    // 遍历所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取前面身体的位置
      let X = (<HTMLElement>this.bodies[i - 1]).offsetLeft;
      let Y = (<HTMLElement>this.bodies[i - 1]).offsetTop;

      //将值设置到当前身体上
      (<HTMLElement>this.bodies[i]).style.left = X + "px";
      (<HTMLElement>this.bodies[i]).style.top = Y + "px";
    }
  }
  checkHeadBody=()=>{
    for(let i=1;i<this.bodies.length;i++){
        let bd=this.bodies[i] as HTMLElement
        if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
            throw new Error("撞到自己了")
        }
    }
  }
}

//游戏控制器
class GameControl {
  //定义三个属性
  snake: Snake;
  food: Food;
  scorelPanel: ScorePanel;
  direction = "";
  //创建一个属性莱记录游戏是否结束
  islive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorelPanel = new ScorePanel();
    this.init();
  }

  //游戏的初始化方法
  init = () => {
    document.addEventListener("keydown", this.keydownHandler);
    this.run();
  };
  //创建一个键盘按下的相应函数
  keydownHandler = (event: KeyboardEvent) => {
    if(event.key!=="ArrowRight"&&event.key!=="ArrowLeft"&&event.key!=="ArrowUp"&&event.key!=="ArrowDown"&&event.key!=="ArrowRight"){
        return
    }
    // console.log(event.key)
    //需要检查event.key的值是否合
    if (this.direction === "") {
      this.direction = event.key;
      return
    }
        if (this.direction === "ArrowRight" && event.key !== "ArrowLeft"&&this.snake.bodies[1]) {
        this.direction = event.key;
        return
        
        }
        if (this.direction === "ArrowLeft" && event.key !== "ArrowRight"&&this.snake.bodies[1]) {
        this.direction = event.key;
        return
        }
        if (this.direction === "ArrowUp" && event.key !== "ArrowDown"&&this.snake.bodies[1]) {
        this.direction = event.key;
        return
        }
        if (this.direction === "ArrowDown" && event.key !== "ArrowUp"&&this.snake.bodies[1]) {
        this.direction = event.key;
        return
        }
        if(!this.snake.bodies[1]){
            this.direction = event.key;
        }
        
  };
  run = () => {
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
        default:
    }
    if (this.checkEat(X, Y)) {
      //食物位置
      this.food.change();
      //增加分数
      this.scorelPanel.addScore();
      //增加一节
      this.snake.addBody();
    }
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      this.islive = false;
      alert("游戏结束");
    }
    //开启一个定时调用
    this.islive && setTimeout(() => this.run(), 300 / this.scorelPanel.level);
  };

  //定义一个方法 检查蛇是否迟到食物
  checkEat = (X: number, Y: number) => {
    return X === this.food.X && Y === this.food.Y;
  };
}
const a = new GameControl();
