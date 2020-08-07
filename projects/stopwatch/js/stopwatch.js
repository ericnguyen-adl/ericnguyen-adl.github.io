$(function () {
    // variables: 
    var mode = 0; // appmode
    var timeCounter = 0; // time counter
    var lapCounter = 0; // lap counter
    var action;
    var lapNumber = 0;
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    // On App load show start and lap buttons
    hideshowButtons("#startButton", "#lapButton");
    //click on startButton
    $("#startButton").click(function () {
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });

    //click on stopButton
    $("#stopButton").click(function () {
        //show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //stop counter
        clearInterval(action);
    });

    //click on resumeButton
    $("#resumeButton").click(function () {
        //show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    })

    //click on resetButton
    $("#resetButton").click(function () {
        //reload the page
        location.reload();
    });

    //hideshowButtons function shows two buttons
    function hideshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //click on lapButton
    $("#lapButton").click(function () {
        //if mode is ON
        if (mode) {
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });

    //start the counter
    function startAction() {
        action = setInterval(function () {
            timeCounter++;
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }

    //format numbers
    function format(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }


    //updateTime: converts counters to min,sec,centisec
    function updateTime() {
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter / 6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000) % 100;
        $("#timeminutes").text(format(timeMinutes));
        $("#timeseconds").text(format(timeSeconds));
        $("#timecentiseconds").text(format(timeCentiseconds));

        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter / 6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000) % 100;
        $("#lapminutes").text(format(lapMinutes));
        $("#lapseconds").text(format(lapSeconds));
        $("#lapcentiseconds").text(format(lapCentiseconds));
    }
    //addLap function: print lap details inside the lap box
    function addLap() {
        lapNumber++;
        var myLapDetails =
            '<div class="lap">' +
            '<div class="laptimetitle">' +
            'Lap' + lapNumber +
            '</div>' +
            '<div class="laptime">' +
            '<span>' + format(lapMinutes) + '</span>' +
            ':<span>' + format(lapSeconds) + '</span>' +
            ':<span>' + format(lapCentiseconds) + '</span>' +
            '</div>' +
            '</div>';
        $(myLapDetails).prependTo("#laps");
    }
}); 