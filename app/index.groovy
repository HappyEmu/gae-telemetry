html.html {
    head {
        link(rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css')
        link(rel: 'stylesheet', type: 'text/css', href: 'assets/css/main.css')
        script(type: 'text/javascript', src: 'https://code.jquery.com/jquery-2.1.4.min.js')
        script(type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/lib/gauge.min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/lib/snap.svg-min.js')
        script(type: 'text/javascript', src: 'assets/javascripts/app.js')
        script(type: 'text/javascript', src: 'https://www.youtube.com/iframe_api')
    }

    div(class: 'container') {
        div(class: 'row') {
            div(class: 'gauge') {
                canvas(id: 'gauge-speed', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center')
            }

            div(class: 'gauge') {
                canvas(id: 'gauge-rpm', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center')
            }

            div(class: 'gauge') {
                canvas(id: 'gauge-throttle', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center')
            }

            div(class: 'gauge') {
                canvas(id: 'gauge-brake', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center')
            }
        }

        div(class: 'row') {
            div(class: 'map col-md-6') {
                object(type: 'image/svg+xml', id: 'map', data: 'assets/images/map.svg')
            }

            div(id: 'player', class: 'video col-md-6')
        }
    }
}