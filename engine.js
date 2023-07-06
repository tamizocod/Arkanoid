    // ustawienia
    let start = false;
    
    let canvas = document.getElementById("board");
    let ctx = canvas.getContext("2d");

    let menu = document.getElementById("menu");
    let ctx2 = menu.getContext("2d");
    
    let x = canvas.width / 2;
    let y = canvas.height - 14;

    let ballSpeed = 2;

    let ballSpeedX = ballSpeed; // dx
    let ballSpeedY = ballSpeed; //dy

    // ball
    let ballRadius = 8;

   

    // Player
    let speadPlayer = 3;

    let playerHeight = 6;
    let playerWidth = 110;
    let playerColor = "teal";
    let playerX = (canvas.width - playerWidth) / 2;

    let rightPressed = false;
    let leftPressed  = false;

    // ilość bloków
    let brickRowCount = 10;
    let brickColumnCount = 10;
    let countRowCol = brickRowCount * brickColumnCount;

    // wielkośc bloków
    let brickWidth = 70;
    let brickHeight = 20;
    let brickPadding = 2;

    // pozycja bloków
    let brickOffsetTop = 40;
    let brickOffsetLeft = 22;

    let score = 0;
    let lives = 2;

    let ballColor = "white";

    let test = 0;

      let bricksColor = [
        "white", 
        "yellow	",
        //"olive",

        "lime",
        //"green",
        
        "aqua",
        //"blue",

        "fuchsia",
        //"purple",

        "gray"

      ];
      


    let bricks = [];
/*
    bricks[0] = [];
    bricks[0][0] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };

    bricks[0][1] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][2] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][3] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][4] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][5] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][6] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][7] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][8] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };
    bricks[0][9] = { x: 0, y: 0, strokes: 2, colorBrick: 2 };

    bricks[1] = [];

    /*
var http_request = new XMLHttpRequest();
 var url = "test.json"; // adres z danymi w formacie JSON

 // pobierz dane w formacie JSON z serwera
 http_request.onreadystatechange = handle_json;
 http_request.open("GET", url, true);
 http_request.send(null);

 function handle_json() {
        if (http_request.readyState == 4) {
                if (http_request.strokes == 200) {
                        var json_data = http_request.responseText; // pobranie tekstu
                        var the_object = JSON.parse(json_data);  // zamiana tekstu na obiekt JSON
                } else {
                        alert('Wystąpił problem z wybranym adresem URL aaaaaaa.');
                }
                http_request = null;
        }
 }

*/



let obj01 = JSON.parse(json);

let bricksTmp = [];

let level = "level1";
let i = 0;
let j = 0;


  // tablica po level
 let obj02 = obj01[level];

 for(let l2 in obj02) {
 
    let obj03 = obj02[l2];
    j = 0;

    bricksTmp[i] = [];

     for(let l3 in obj03)  {

     //console.log("col " + color);

      bricksTmp[i][j] = { x: 0, y: 0, strokes: obj03[l3]  , colorBrick: obj03[l3]  }; 
     // bricksTmp[i][j] = { x: "obj03[l3][0]", y: obj03[l3][1], strokes: obj03[l3][2], colorBrick: obj03[l3][3] }; 


     j++;
     }

 i++;

}
// 1-2 =1 , 3-4 =2, 5-6, =3, 7-8 =4, 9-10 =5
//let tt = 0
//let aa = parseInt((tt + 1) /2);
//console.log(aa);

/*
console.log(getRandomIntInclusive(0, 1));
function getRandomIntInclusive( min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/

function SetStrokes(color)
{
  //let strokes = 0;
 
  //let aa = 
  return parseInt(color+1 /2);
}


// kopiowanie tabeli tymczasowej do właściwej
bricks = bricksTmp;


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    //document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("keydown", keyDownStart, false);
    //document.addEventListener("keyup", keyUpHandler1, false);

    function keyDownStart(e) {
      if (e.keyCode == 32) {
          start = true; 
      }
    }

    // function keyUpHandler1(e) {
    //     if (e.keyCode == 32) {
    //         start = false;
    //     }
    //   }
    // obsługa klawiszy
     function keyDownHandler(e) {
       if (e.keyCode == 39) {
         rightPressed = true;
       } else if (e.keyCode == 37) {
         leftPressed = true;
       }
     }
     function keyUpHandler(e) {
       if (e.keyCode == 39) {
         rightPressed = false;
       } else if (e.keyCode == 37) {
         leftPressed = false;
       }
     }
    //console.log(data, 'the json obj');


    // obsługa myszy
    function mouseMoveHandler(e) {
      let relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width && start) {
        playerX = relativeX - playerWidth / 2;
      }
    }

    // kolizje
    function collisionDetection() {
      for (let c = 0; c < brickRowCount; c++) {
        for (let r = 0; r < brickColumnCount; r++) {
          let b = bricks[c][r];
          if (b.strokes >= 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              ballSpeedY = -ballSpeedY;

              if (b.strokes != 0);
              {
                b.strokes--;
                b.colorBrick--;
              }

              score++;

              if (score == brickColumnCount * brickRowCount) {
                alert("WYGRAŁEŚ!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    function DrawBall() {

      if(!start)
      {x = playerX+50;}

      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ballColor; //"#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function DrawPlayer() {
      //drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        playerX,
        canvas.height - playerHeight,
        playerWidth,
        playerHeight
      );
      ctx.fillStyle = playerColor;
      ctx.fill();
      ctx.closePath();
    }

    function DrawBricks() {
      for (let c = 0; c < brickRowCount; c++) {
        for (let r = 0; r < brickColumnCount; r++) {

         // console.log(bricks[c][r]); //===================================
         // bricks[0][0]
         // let t = ;
         // console.log(t);
          if (bricks[c][r].strokes >= 1) {
            let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = bricksColor[bricks[c][r].colorBrick]; //randBrickCollor(); //"yellow";

            ctx.fill();
            ctx.closePath();
          }
        }
      }
      test = 0;
    }

    function DrawTitleGame() {
      ctx2.font = "22px Verdana";    
      ctx2.fillStyle = "LightGray";
      ctx2.fillText("STRĄĆ CEGIEŁKĘ", 280, 28);
    }

    function DrawScore() {
      ctx2.font = "16px Arial";
      ctx2.fillStyle = "white";
      ctx2.fillText("Punkty: " + score, 10, 70);
    }

    function DrawLives() {
      ctx2.font = "16px Arial";
      ctx2.fillStyle = "white";
      ctx2.fillText("Zycie: " + lives, 680, 70);
    }


    function DrawGameOver() {
      ctx.font = "30px Arial";
      ctx.fillStyle = "Red";
      ctx.fillText("KONIEC GRY", 680, 70);
    }


    function testy(){
       // let bricksColorT = bricksColor;


         for(let i=0; i < bricksColorT.length; i++  )
         {
        
          ctx2.beginPath();
          ctx2.rect(100, 20 * i, 50, 20);
          ctx2.fillStyle = bricksColorT[i]; //randBrickCollor(); //"yellow";
          ctx2.fill();
          ctx2.closePath();
         }


     }


   //  drawNameGame();

     function draw() {
      ctx.clearRect( 0, 0, canvas.width, canvas.height);
      ctx2.clearRect(0, 0, menu.width,   menu.height);

      DrawTitleGame();
      DrawBricks();
      DrawBall();
      DrawPlayer();
      DrawScore();
      DrawLives();
      collisionDetection();

  
      // wykrywanie kolizji ze ścianami
      if (x + ballSpeedX > canvas.width - ballRadius || x + ballSpeedX < ballRadius ) {  ballSpeedX = -ballSpeedX;  }

      // kolizje z player
      if (y + ballSpeedY < ballRadius) { ballSpeedY = +speadBally; } 
      else if (y + ballSpeedY > canvas.height - ballRadius) {
        if (x > playerX && x < playerX + playerWidth) { ballSpeedY = -ballSpeedY; } 
        else {

          lives--;

          if (!lives) {
            alert("KONIEC GRY");
            DrawGameOver();

            //document.location.reload();
           start = false;
          } 
          else {

            // paramentry piłki po utracie zycia
            start = false;
            x = (canvas.width / 2) + 5;
            y = canvas.height - 14;
            ballSpeedX = ballSpeed;
            ballSpeedY = ballSpeed;

            playerX = (canvas.width - playerWidth) / 2;
            
          }
        }
      }

      if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += speadPlayer ;
     } else if (leftPressed && playerX > 0) {
         playerX -= speadPlayer ;
       }


      // ruch piłki
      if(start)
      {
         x = x + ballSpeedX;
         y += ballSpeedY;
      }

     // x = x + dx;
     // y += dy;

      /*
      x += dx;
      y += dy;
      */

      requestAnimationFrame(draw);
    }
    //drawNameGame();
    draw();

   
    //if(true)
    //{
     //draw();
    //}
 