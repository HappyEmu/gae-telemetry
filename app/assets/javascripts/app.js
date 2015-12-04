$(function() {
    var values = null;
    var i = 0;
    var videoToTelemetryOffset = 0;

    $.ajax({
        url: 'api/startingSet', success: function(data){
            values = data;
            $.ajax({
                url: 'api/complete', success: function(data){values = data; console.log("received full set")}, async: true
            });
        }, async: false
    });

    $.ajax({
        url: '/api/getTime', success: function(data) { videoToTelemetryOffset = data[0] }, async: false
    });

    var gaugeTexts = ["speed", "rpm", "throttle", "brake", "gear", "steering", "fl-tyre-temp", "fl-brake-temp", "fl-slip-speed",
        "fr-tyre-temp", "fr-brake-temp", "fr-slip-speed",
        "rl-tyre-temp", "rl-brake-temp", "rl-slip-speed",
        "rr-tyre-temp", "rr-brake-temp", "rr-slip-speed"];
    var selector = [["carState", "mSpeed"], ["carState", "mRpm"], ["carState", "mThrottle"], ["carState", "mBrake"], ["carState", "mGear"], ["carState", "mSteering"],
        ["wheelsAndTyres", "tyreTemps", 0],["wheelsAndTyres", "brakeTemps", 0], ["wheelsAndTyres", "tyreSlipSpeeds", 0],
        ["wheelsAndTyres", "tyreTemps", 1],["wheelsAndTyres", "brakeTemps", 1], ["wheelsAndTyres", "tyreSlipSpeeds", 1],
        ["wheelsAndTyres", "tyreTemps", 2],["wheelsAndTyres", "brakeTemps", 2], ["wheelsAndTyres", "tyreSlipSpeeds", 2],
        ["wheelsAndTyres", "tyreTemps", 3],["wheelsAndTyres", "brakeTemps", 3], ["wheelsAndTyres", "tyreSlipSpeeds", 3]];
    var units = ["km/h", "", "%", "%","","%","°C","°C", "m/s","°C","°C", "m/s","°C","°C", "m/s","°C","°C", "m/s"];
    var scalings = [3.6, 1, 100, 100, 1, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var ranges = [[0,300],[0,8000],[0,100],[0,100],[0,6],[-100,100], [70,130], [0,700], [0,20], [70,130], [0,700], [0,20], [70,130], [0,700], [0,20], [70,130], [0,700], [0,20]];


    var gauges = $.map(gaugeTexts, function(val, i) {
        var donut =  new Gauge($('#gauge-' + val)[0]);

        var opts = {
            angle: 0, // The length of each line
            pointer: {
                length: 0.75, // The radius of the inner circle
                strokeWidth: 0.02 // The rotation offset
            },
            strokeColor: '#E0E0E0'   // to see which ones work best for you


    };

        donut.setOptions(opts);
        donut.minValue = ranges[i][0];
        donut.maxValue = ranges[i][1];
        return donut;
    });

    var circle = null;
    var started = false;
    var path = null;

    $('#map').on('load', function() {
        var svg = Snap('#map');
        path = Snap('#map').node.firstElementChild;
        console.log('svg path: ' + path);
        circle = svg.circle(1, 1, 15);
        started = true;
    });

    var videoSecs = 0;

    setInterval(function() {
        $.each(gauges, function(idx, val) {
            var value = null;
            value = getValue(i,selector[idx]);
            //var value = values[i][selector[idx][0]][selector[idx][1]];
            value *= scalings[idx];
            value = Number(value.toFixed(0));
            val.set(value);
            $(val.canvas).parent().find('.value').html(value + " " + units[idx]);
        });
        if (player.getPlayerState()==1) {
            i++;
        }
        var laptime = getValue(i,["lapInfo","mCurrentLap"]);
        $( "#LapTime").html(laptime);
        var currentSecs = Number(player.getCurrentTime().toFixed(0));
        $( "#VideoTime").html(videoSecs);
        if(currentSecs!=videoSecs){
            videoSecs = currentSecs;
            syncStreams(videoSecs);
        }
        if (started){
            var dist = (getValue(i,['lapInfo',"mCurrentLapDistance"])/(6997.82 / 4724.63525390625)/2.005 + 900) % (4724.63525390625/2.005);
            var point = path.getPointAtLength(dist);
            //console.log('Transforming circle ' + dist +" / " + path.getTotalLength()/2);
            circle.transform('translate('+point.x+','+point.y+')');
            //circle.setAttribute('transform', 'translate(1,1)');
        }
    }, 33);

    // Setup player
    var player;
    $(document).on("yt:ready", function() {
        console.log('YT API READY!');
        player = new YT.Player('player', {
            height: '720',
            width: '1280',
            videoId: 'n38AwZUa_4Q',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });

    function syncStreams(videoSeconds){
        var telemetryTime = getValue(i,["time"]);
        $( "#StreamTime").html(telemetryTime);

        var offset = videoSeconds-telemetryTime + videoToTelemetryOffset;

        $( "#Offset").html(offset);
        i += Number((offset * 30).toFixed(0));
        if (i<0)
            i = 0
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    function getValue(index, selectors){
        //console.log(index + " / " + values.length)
        if(index>=values.length){
            //console.log(" returned " )
            return 0;
        }
        $.each(selectors, function(depth, sel){
            if(depth==0) {
                value = values[index][sel];
            }
            else{
                value = value[selectors[depth]];
            }
        });
        return value
    }
});


function onYouTubeIframeAPIReady() {
    $(document).trigger("yt:ready")
}

