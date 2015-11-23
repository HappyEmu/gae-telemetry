$(function() {
    var values = null;
    var i = 0;

    $.get('/api', function(data) {
        values = data
    });

    var gaugeTexts = ["speed", "rpm", "throttle", "brake"];

    var gauges = $.map(gaugeTexts, function(val, i) {
        return new JustGage({
            id: "gauge-" + val,
            value: 0,
            min: 0,
            max: 100,
            title: val
        });
    });

    setInterval(function() {
        $.each(gauges, function(idx, val) {
            val.refresh(values[i]);
        });
        i++;
    }, 100);
});