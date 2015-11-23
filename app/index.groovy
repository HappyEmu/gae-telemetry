html.html {
    head {
        link(rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css')
        script(type: 'text/javascript', src: 'https://code.jquery.com/jquery-2.1.4.min.js')
        script(type: 'text/javascript', src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/lib/raphael-2.1.4.min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/lib/justgage-1.1.0.min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/app.js')
    }

    div(id: 'gauge-speed', class: '200x160p') { }
    div(id: 'gauge-rpm', class: '200x160p') { }
    div(id: 'gauge-throttle', class: '200x160p') { }
    div(id: 'gauge-brake', class: '200x160p') { }
}