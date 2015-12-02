$(function() {
    var values = null;
    var i = 0;
    var videoToTelemetryOffset = 0;

    $.ajax({
        url: '/api', success: function(data) { values = data }, async: false
    });

    $.ajax({
        url: '/api/getTime', success: function(data) { videoToTelemetryOffset = data[0] }, async: false
    });

    var gaugeTexts = ["speed", "rpm", "throttle", "brake", "clutch", "steering"];
    var selector = [["carState", "mSpeed"], ["carState", "mRpm"], ["carState", "mThrottle"], ["carState", "mBrake"], ["carState", "mClutch"], ["carState", "mSteering"]];
    var units = ["km/h", "", "%", "%","%","%"];
    var scalings = [3.6, 1, 100, 100, 100, 1];
    var ranges = [[0,300],[0,8000],[0,100],[0,100],[0,100],[0,100]];


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


    $('#map').on('load', function() {
        var svg = Snap('#map');
        circle = svg.circle(150, 150, 5);
        started = true;
    });

    var videoSecs = 0;

    setInterval(function() {
        $.each(gauges, function(idx, val) {
            var value = null;
            $.each(selector[idx], function(depth, sel){
                if(depth==0){
                    value = values[i][selector[idx][depth]]
                }
                else{
                    value = value[selector[idx][depth]]
                }
            });
            //var value = values[i][selector[idx][0]][selector[idx][1]];
            value *= scalings[idx];
            value = Number(value.toFixed(0));
            val.set(value);
            $(val.canvas).parent().find('.gauge-value').html(value + " " + units[idx]);
        });
        if (player.getPlayerState()==1) {
            i++;
        }
        var laptime = values[i]["lapInfo"]["mCurrentLap"];
        $( "#LapTime").html(laptime);
        var currentSecs = Number(player.getCurrentTime().toFixed(0));
        $( "#VideoTime").html(videoSecs);
        if(currentSecs!=videoSecs){
            videoSecs = currentSecs;
            syncStreams(videoSecs);
        }
        if (started) circle.transform('translate(1,1)')
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
        var telemetryTime = values[i]["time"];
        $( "#StreamTime").html(telemetryTime);

        var offset = videoSeconds-telemetryTime + videoToTelemetryOffset;
        console.log('TelemetryOffset: ' + videoToTelemetryOffset);
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
});


function onYouTubeIframeAPIReady() {
    $(document).trigger("yt:ready")
}
