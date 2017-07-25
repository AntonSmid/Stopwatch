$(document).ready(function(){
    
   // variables
        var mode = 0;           // App mode
        var timeCounter = 0;    // time counter
        var lapCounter = 0;     // Lap counter
        var action;             // variable for setInterval
        var lapNumber = 0;      // number of laps
        // min, sec, centisec for time and lap
        var timeMinutes, timeseconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    // On app load show start buttons
    hideshowButtons("#startButton", "#lapButton");
    
    // click on startButton
    $("#startButton").click(function(){
        // mode on
        mode = 1;
        // show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        // start counter
        startAction();
    })
        
    
    // click on stopButton
    $("#stopButton").click(function(){
        // show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        // stop counter
        clearInterval(action);
    })
        
    
    // click on resumeButton
    $("#resumeButton").click(function(){
        // show stop and lap buttons
        hideshowButtons("#stopButton", "#lapButton");
        // start counter
        startAction();
    })

    
    // click on resetButton
    $("#resetButton").click(function(){
        // reload the page
        location.reload();
    })
        
    
    // click on lapButton
    $("#lapButton").click(function(){
        // if mode is ON
        if(mode){
            // stop action
            clearInterval(action);
            // reset lap and print lap details
            lapCounter = 0;
            addLap();
            // start action
            startAction();
        }
            
    })
        
    
// functions ------------------------- //
    
    // shows only two buttons
    function hideshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    // start the counter
    function startAction() {
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }
    
    // updateTime: converts counters to min, sec, centisec
    function updateTime() {
        // 1min = 60 * 100 = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        // 1sec = 100 centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        // the reminder is cs
        timeCentiseconds = (timeCounter%6000)%100;
        // Display time values
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        
        // 1min = 60 * 100 = 6000 centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        // 1sec = 100 centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        // the reminder is cs
        lapCentiseconds = (lapCounter%6000)%100;
        // Display lap values
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
        
    }

    // format numbers
    function format(number){
        if (number < 10) {
            return "0" + number;
        } else {
            return number;
        }
    }
    
    
    // addLap function: print lap details inside the lap box
    function addLap() {
        lapNumber++;
        var myLapDetails =      
        "<div class='lap'>" + 
            "<div class='laptimetitle'>Lap "+ format(lapNumber ) +"</div>" +
            "<div class='laptime'>"+
                "<span>" + format(lapMinutes) + ":</span>"+
                "<span>" + format(lapSeconds) + ":</span>"+
                "<span>" + format(lapCentiseconds) + "</span>"+
            "</div>" +
        "</div>";
       
        $(myLapDetails).prependTo("#laps");
    }
    

    
    

}); /* end ready */

