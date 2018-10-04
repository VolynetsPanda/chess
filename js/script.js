window.onload = function () {
    const config = {
        color:["#f5c490", "#b6663d"],
        letters:["a", "b", "c", "d", "e", "f", "g", "h"],
        team:["white", "black"],
        img:[],
        nameFigure:["Peshka"]
    };
    const board = [];
    const player1 = [];
    const player2 = [];
    const chess = document.querySelector(".chess");
    function Square(size, color, field, row, col) {
        this.size = size;
        this.color = color;
        this.field = field;
        this.row=row;
        this.col=col;
        this.id=`${this.col}-${this.row}`;
        this.status=false;
        this.team="";
        this.render = () =>{
            this.div = document.createElement("div");
            this.div.style.width=this.size+"px";
            this.div.style.height=this.size+"px";
            this.div.style.background=this.color;
            this.div.style.position="relative";
            this.div.style.color='#000';
            this.div.style.fontWeight='bold';
            this.div.innerText=this.id;
            this.div.setAttribute("data-id", this.id);
            this.field.appendChild(this.div);
            this.pos = [size*config.letters.indexOf(col), size*(row-1)];
            this.div.addEventListener("click", ()=>{
                console.log(this.pos);
            })

        };

        this.render();
    };
    {
        let width = chess.clientWidth/8;
        let nowColor = "";
        for(let i=1; i<=8; i++ ){
            for(let j=1; j<=8; j++ ){
                if((i%2==0 && j%2==0) || (i%2==1 && j%2==1)) nowColor=config.color[1];
                else { nowColor=config.color[0]}
                board.push(new Square(width, nowColor, chess, i, config.letters[j-1]));
            };
        };
        console.log(board)
    };
    class Figure{
        constructor(team){
            this.live=true;
            this.team=team;
            this.keys();
        }
        render(img, left, top){
            this.div = document.createElement("div");
            this.div.style.width=chess.clientWidth/8+"px";
            this.div.style.height=chess.clientWidth/8+"px";
            this.div.style.background=`url("./img/${img}") no-repeat center`;
            this.div.style.backgroundSize="auto 90%";
            this.div.style.position="absolute";
            this.div.style.left=`${left}px`;
            this.div.style.top=`${top}px`;
            chess.appendChild(this.div);
            this.div.addEventListener("click", ()=>{
                this.remove();
            })
        }
        nameF(name){
           return this.name=name;
        }
        idF(id){
            return this.id=id;
        }
        keys(){
            return `${this.team}-${this.name}-${this.id}`
        }
    }
    class Peshka extends Figure{
        constructor(img, left, top){
            super();
            super.render(img, left, top);
        }
    }
    let countW = 1;
    let countB = 1;
    for(let i = 0; i<64; i++){
        if(board[i].row==2) {
            board[i].status=true;
            let peshka = new Peshka("piece_0005_Layer-6.png", board[i].pos[0], board[i].pos[1]);
            peshka.team=config.team[0];
            peshka.nameF(config.nameFigure[0]);
            peshka.idF(countW++);
            player1.push(peshka);
        } else if (board[i].row==7){
            board[i].status=true;
            let peshka = new Peshka("piece_0011_Layer-0.png", board[i].pos[0], board[i].pos[1]);
            peshka.team=config.team[1];
            peshka.nameF(config.nameFigure[0]);
            peshka.idF(countB++);
            player2.push(peshka);
        }
    }
    console.log(player1)
}