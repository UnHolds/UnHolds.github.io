let resizeReset = function () {
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = window.innerHeight;
}

const opts = {
    particleColor: "rgb(0,255,255)", //0.255.255
    lineColor: "rgb(0,255,255)",
    particleAmount: 100,
    defaultSpeed: 1,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
};

var linkRadius = 200;
var deflinkRadius = linkRadius;

window.addEventListener("resize", function () {
    deBouncer();
});

window.addEventListener("click", function () {
    bclick();
});

var boolclick = false;
let bclick = function () {
    if (boolclick == true) {
        //document.getElementsByClassName('headline')[0].style.visibility = 'hidden';
        //boolclick = false;
    } else {
        boolclick = true;
    }
}

let deBouncer = function () {
    clearTimeout(tid);
    tid = setTimeout(function () {
        resizeReset();
    }, delay);
};


let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};


let linkPoints = function (point1, hubs) {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / linkRadius;
        if (opacity > 0) {
            drawArea.lineWidth = 0.5;
            drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
            drawArea.beginPath();
            drawArea.moveTo(point1.x, point1.y);
            drawArea.lineTo(hubs[i].x, hubs[i].y);
            drawArea.closePath();
            drawArea.stroke();
        }
    }
}


var cid = 0;
var multiSpeed = 4;
var w2;
var h2;
var nw2;
var nh2;
var l = 0;
var b = 0;
var schrink = 0.1; //0.0.5
var boostfensterschrink = 1;
var boostrahmenschrink = 1;
var querformat = true;
var wschrinkfaktor;
var hschrinkfaktor;
var fensterprozent = 0.60;
var rahmenprozent = 0.90;
var samefinishtime = true;
var firststart = true;

var fensterfinishmulti = 1;
var rahmenfinishmulit = 1;


Particle = function (xPos, yPos) {
    this.id = cid;
    cid++;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
    };

    this.vector2 = {
        //x: Math.cos( Math.floor(this.id* 90) ) * this.speed * multiSpeed,
        //y: Math.sin( Math.floor(this.id * 90)) * this.speed * multiSpeed,
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
    };
    this.update = function () {
        this.border();
        if (boolclick == false) {
            this.x += this.vector.x;
            this.y += this.vector.y;
            //linkRadius = deflinkRadius;
            w2 = w;
            h2 = h;
            nw2 = 0;
            nh2 = 0;
            l = 2;
            b = 2;

        } else {
            this.x += this.vector2.x;
            this.y += this.vector2.y;


            wschrinkfaktor = w / h;
            hschrinkfaktor = 1;



            if (samefinishtime == true) {
                rahmenfinishmulit = (l * fensterprozent) / (rahmenprozent * w)
            }




            if ((w * rahmenprozent) < w2) {
                nw2 = nw2 + (schrink * wschrinkfaktor * boostrahmenschrink * rahmenfinishmulit) / 2;
                w2 = w2 - (schrink * wschrinkfaktor * boostrahmenschrink * rahmenfinishmulit) / 2;
            }




            if ((h * rahmenprozent) < h2) {
                nh2 = nh2 + (schrink * hschrinkfaktor * boostrahmenschrink * rahmenfinishmulit) / 2;
                h2 = h2 - (schrink * hschrinkfaktor * boostrahmenschrink * rahmenfinishmulit) / 2;
            }


            if ((w * fensterprozent) > l) {
                l = l + schrink * wschrinkfaktor * boostfensterschrink;
            }

            if ((h * fensterprozent) > b) {
                b = b + schrink * hschrinkfaktor * boostfensterschrink;
            }

            if ((w * fensterprozent) <= l) {
                document.getElementsByClassName('headline')[0].style.visibility = 'visible';
                var elemmid = document.getElementById('idsetmid');
                //elemmid.style.webkitAnimationPlayState="running";

                document.getElementById('mainstart').className = 'unbluranimation';
                document.getElementById('headline').className = 'unbluranimation';

                if (firststart == true) {
                    document.getElementsByClassName('buttoncont')[0].style.visibility = 'visible';
                    var buttons = document.getElementsByTagName('button');
                    for (var i = 0; i < buttons.length; i++) {
                        var button = buttons[i];
                        //button.style.webkitAnimationPlayState="running";
                    }

                    var typer = document.getElementById('typewriter');
                    typer.style.visibility = 'visible';
                    typewriter = setupTypewriter(typewriter);
                    typewriter.type();
                    firststart = false;
                }
            }
        }
    };



    this.border = function () {

        if (this.x > w2) {
            this.vector.x *= -1;
            this.vector2.x *= -1;
        }

        if (this.x < nw2) {
            this.vector.x *= -1;
            this.vector2.x *= -1;
        }

        if (this.y > h2) {
            this.vector.y *= -1;
            this.vector2.y *= -1;
        }

        if (this.y < nh2) {
            this.vector.y *= -1;
            this.vector2.y *= -1;
        }

        if (this.x > ((w - l) / 2) && this.x < (l + (w - l) / 2) && this.x < (w / 2) && this.y > ((h - b) / 2) && this.y < (b + (h - b) / 2) && this.y < (h / 2)) {

            if (this.x - (w - l) / 2 < this.y - (h - b) / 2) {
                this.x = ((w - l) / 2);
                this.vector.x *= -1;
                this.vector2.x *= -1;
            } else {
                this.y = ((h - b) / 2);
                this.vector.y *= -1;
                this.vector2.y *= -1;
            }

        }

        if (this.x > ((w - l) / 2) && this.x < (l + (w - l) / 2) && this.x < (w / 2) && this.y > ((h - b) / 2) && this.y < (b + (h - b) / 2) && this.y > (h / 2)) {

            if (this.x - (w - l) / 2 < (b + (h - b) / 2) - this.y) {
                this.x = (w - l) / 2;
                this.vector.x *= -1;
                this.vector2.x *= -1;
            } else {
                this.y = (b + (h - b) / 2)
                this.vector.y *= -1;
                this.vector2.y *= -1;
            }

        }


        if (this.x > ((w - l) / 2) && this.x < (l + (w - l) / 2) && this.x > (w / 2) && this.y > ((h - b) / 2) && this.y < (b + (h - b) / 2) && this.y < (h / 2)) {

            if ((l + (w - l) / 2) - this.x < this.y - (h - b) / 2) {
                this.x = (l + (w - l) / 2);
                this.vector.x *= -1;
                this.vector2.x *= -1;
            } else {
                this.y = (h - b) / 2;
                this.vector.y *= -1;
                this.vector2.y *= -1;
            }

        }

        if (this.x > ((w - l) / 2) && this.x < (l + (w - l) / 2) && this.x > (w / 2) && this.y > ((h - b) / 2) && this.y < (b + (h - b) / 2) && this.y > (h / 2)) {

            if ((l + (w - l) / 2) - this.x < (b + (h - b) / 2) - this.y) {
                this.x = (l + (w - l) / 2);
                this.vector.x *= -1;
                this.vector2.x *= -1;
            } else {
                this.y = (b + (h - b) / 2)
                this.vector.y *= -1;
                this.vector2.y *= -1;
            }

        }

        if (this.x > w2) {
            this.x = w2;
        }

        if (this.y > h2) {
            this.y = h2;
        }

        if (this.x < nw2) {
            this.x = nw2;
        }

        if (this.y < nh2) {
            this.y = nh2;
        }

    };
    this.draw = function () {
        drawArea.beginPath();
        drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawArea.closePath();
        drawArea.fillStyle = this.color;
        drawArea.fill();
    };
};

function setup() {

    document.getElementsByClassName('subprivate')[0].style.visibility = 'hidden';
    document.getElementsByClassName('sublinks')[0].style.visibility = 'hidden';
    document.getElementsByClassName('subdownload')[0].style.visibility = 'hidden';
    document.getElementsByClassName('submail')[0].style.visibility = 'hidden';

    document.getElementsByClassName('maintext')[0].style.visibility = 'hidden';

    document.getElementsByClassName('headline')[0].style.visibility = 'hidden';
    var elemmid = document.getElementById('idsetmid');
    elemmid.style.webkitAnimationPlayState = "paused";

    document.getElementsByClassName('buttoncont')[0].style.visibility = 'hidden';
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.style.webkitAnimationPlayState = "paused";
    }



    var typer = document.getElementById('typewriter');
    typer.style.visibility = 'hidden';

    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
        particles.push(new Particle());
    }

    if (w > h) {
        linkRadius = Math.floor(w / 10) + 20;
    } else {
        linkRadius = Math.floor(h / 10) + 20;
    }

    window.requestAnimationFrame(loop);
}

function loop() {
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}



const canvasBody = document.getElementById("canvas"),
    drawArea = canvasBody.getContext("2d");
let delay = 200,
    tid,
    rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();
