$(function() {
    var values = null;
    var i = 0;

    $.ajax({
        url: '/api', success: function(data) { values = data }, async: false
    });

    var gaugeTexts = ["speed", "rpm", "throttle", "brake"];
    var selector = [["carState", "mSpeed"], ["carState", "mRpm"], ["carState", "mThrottle"], ["carState", "mBrake"]];
    var units = ["km/h", "", "%", "%"];

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
        return donut;
    });

    var circle = null;
    var started = false;

    $('#map').on('load', function() {
        var svg = Snap('#map');
        circle = svg.circle(150, 150, 5);
        started = true;
    });

    setInterval(function() {
        $.each(gauges, function(idx, val) {
            var value = values[i][selector[idx][0]][selector[idx][1]];
            val.set(value);
            $(val.canvas).parent().find('.gauge-value').html(value + " " + units[idx]);
        });
        i++;
        if (started) circle.transform('translate(1,1)')
    }, 33);

    // Setup player
    var player;
    $(document).on("yt:ready", function() {
        console.log('YT API READY!');
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'f_uE9qlhxbA',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
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
