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

    var gaugeTexts = ["speed", "rpm", "throttle", "brake", "gear", "steering"];
    var selector = [["carState", "mSpeed"], ["carState", "mRpm"], ["carState", "mThrottle"], ["carState", "mBrake"], ["carState", "mGear"], ["carState", "mSteering"]];
    var units = ["km/h", "", "%", "%","","%"];
    var scalings = [3.6, 1, 100, 100, 1, 100];
    var ranges = [[0,300],[0,8000],[0,100],[0,100],[0,6],[-100,100]];


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
        circle = svg.circle(0, 0, 5);
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
        if (started){
            var dist = (values[i]['lapInfo']["mCurrentLapDistance"]/(6997.82 / 4724.63525390625)/2.005 + 900) % (4724.63525390625/2.005);
            var point = path.getPointAtLength(dist);
            console.log('Transforming circle ' + dist +" / " + path.getTotalLength()/2);
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
        var telemetryTime = values[i]["time"];
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
});


function onYouTubeIframeAPIReady() {
    $(document).trigger("yt:ready")
}
