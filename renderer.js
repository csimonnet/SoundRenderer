window.onload = function() {

    var datas = {
        "sound": [
            {"amplitude": 30, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 31, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 32, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 33, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 34, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 35, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 36, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 37, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 38, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 39, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 40, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 39, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 38, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 37, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 36, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 35, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 34, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 33, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 32, "frequency": (Math.random() * 255) + 100},
            {"amplitude": 31, "frequency": (Math.random() * 255) + 100},
        ]
    };

    var smoothed = {
        "sound": smoothCurve(datas.sound)
    };

    var c = document.getElementById("rendering");
    var ctx = c.getContext("2d");
    var currentLoopIndex = 0;
    var loop = smoothed.sound;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(200, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();

    var intervalId = setInterval(function(){
        ctx.beginPath();
        ctx.clearRect(0, 0, 400, 400);
        ctx.strokeStyle = convertFrequencyToRGB(loop[currentLoopIndex].frequency);
        ctx.lineWidth = 5;
        ctx.arc(200, 200, loop[currentLoopIndex].amplitude * 1.5, 0, 2 * Math.PI);
        ctx.stroke();
        currentLoopIndex++;
        if (currentLoopIndex === loop.length) {
            currentLoopIndex = 0;
        }

    }, 50);

    setTimeout(function() { clearInterval(intervalId) }, 10000);

    function convertFrequencyToRGB(frequency) {
        var red = 0;
        var green = 0;
        var blue = 0;
        var step = 1;
        for (var i = 1 ; i <= frequency; i += step) {
            if (i < 85) {
                red++;
            } else if (i < 170) {
                green++;
            } else {
                blue++;
            }
        } 

        return 'rgb('+red+', '+green+', '+blue+')';
    };

    function smoothCurve(datas) {
        var toAddBetween = 3;
        var smoothed = [];
        for (var i = 0; i < datas.length; i++) {
            if (datas[i + 1] === undefined) {
                differenceAmplitude =  datas[0].amplitude - datas[i].amplitude;
                stepAmplitude = differenceAmplitude / toAddBetween;
                differenceFrequency =  datas[0].frequency - datas[i].frequency;
                stepFrequency = differenceFrequency / toAddBetween;
            } else {
                differenceAmplitude =  datas[i + 1].amplitude - datas[i].amplitude;
                stepAmplitude = differenceAmplitude / toAddBetween;
                differenceFrequency =  datas[i + 1].frequency - datas[i].frequency;
                stepFrequency = differenceFrequency / toAddBetween;
            }

            smoothed.push({"amplitude": datas[i].amplitude, "frequency": datas[i].frequency});
            for (j = 1; j <= toAddBetween; j++) {
                smoothed.push({
                    "amplitude": datas[i].amplitude + j*stepAmplitude,
                    "frequency": datas[i].frequency + j*stepFrequency
                })
            }
        }
        return smoothed;

    }
}