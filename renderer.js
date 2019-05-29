window.onload = function() {

    var datas = {
        "sound": [
            {"amplitude": 30, "frequency": 0},
            {"amplitude": 30, "frequency": 5},
            {"amplitude": 30, "frequency": 10},
            {"amplitude": 32, "frequency": 15},
            {"amplitude": 34, "frequency": 20},
            {"amplitude": 35, "frequency": 25},
            {"amplitude": 36, "frequency": 40},
            {"amplitude": 37, "frequency": 45},
            {"amplitude": 38, "frequency": 50},
            {"amplitude": 39, "frequency": 55},
            {"amplitude": 40, "frequency": 60},
            {"amplitude": 39, "frequency": 65},
            {"amplitude": 38, "frequency": 70},
            {"amplitude": 37, "frequency": 75},
            {"amplitude": 36, "frequency": 78},
            {"amplitude": 35, "frequency": 83},
            {"amplitude": 34, "frequency": 84},
            {"amplitude": 33, "frequency": 85},
            {"amplitude": 32, "frequency": 87},
            {"amplitude": 31, "frequency": 88},
            {"amplitude": 30, "frequency": 90},
            {"amplitude": 28, "frequency": 100}
        ]
    };

    var c = document.getElementById("rendering");
    var ctx = c.getContext("2d");
    var currentLoopIndex = 0;
    var loop = datas.sound;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(200, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();

    var intervalId = setInterval(function(){
        ctx.beginPath();
        ctx.clearRect(0, 0, 400, 400);
        ctx.arc(200, 200, loop[currentLoopIndex].amplitude, 0, 2 * Math.PI);
        ctx.stroke();
        currentLoopIndex++;
        if (currentLoopIndex === 20) {
            currentLoopIndex = 0;
        }

    }, 50);

    setTimeout(function() { clearInterval(intervalId) }, 10000);

    function convertFrequencyToRGB(frequency) {
        if (frequency < 35) {
            //red nuances

        } else if(frequency < 70) {

        } else {

        }
    };

}