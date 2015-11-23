$(function() {
    var values = null;
    var i = 0;

    $.get('/api', function(data) {
        values = data
    });

    var gaugeTexts = ["speed", "rpm", "throttle", "brake"];
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

    setInterval(function() {
        $.each(gauges, function(idx, val) {
            val.set(values[i]);
            $(val.canvas).parent().find('.gauge-value').html(values[i] + " " + units[idx])
        });
        i++;
    }, 100);
});