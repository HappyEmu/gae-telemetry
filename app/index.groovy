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
        div(class: 'row shift') {
            div(class: 'gauge-top') {
                p("Speed", class: 'gauge-name text-center')
                canvas(id: 'gauge-speed', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }

            div(class: 'gauge-top') {
                p("RPM", class: 'gauge-name text-center')
                canvas(id: 'gauge-rpm', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }

            div(class: 'gauge-top') {
                p("Steering", class: 'gauge-name text-center')
                canvas(id: 'gauge-steering', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }

            div(class: 'trackMap') {
                object(type: 'image/svg+xml', id: 'map', data: 'assets/images/map.svg')
            }

            div(class: 'gauge-top') {
                p("Gear", class: 'gauge-name text-center')
                canvas(id: 'gauge-gear', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }
            div(class: 'gauge-top') {
                p("Brake", class: 'gauge-name text-center')
                canvas(id: 'gauge-brake', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }
            div(class: 'gauge-top') {
                p("Throttle", class: 'gauge-name text-center')
                canvas(id: 'gauge-throttle', class: 'gauge-box')
                p("Wululu", class: 'gauge-value text-center value')
            }


        }


        div(class: 'row') {
            div(class: 'col-lg-1'){
                div(class: 'gauge-side-top') {
                    p("FL Tyre", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fl-tyre-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("FL brake", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fl-brake-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("FL slip", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fl-slip-speed', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }

                div(class: 'gauge-side-top') {
                    p("RL Tyre", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rl-tyre-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("RL brake", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rl-brake-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("RL slip", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rl-slip-speed', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
            }
            div(id: 'vidContainer', class: 'col-lg-10') {
                div(id: 'player')
                div(class: 'debug') {
                    span("VideoTime")
                    span("wululu", id: "VideoTime")
                    span("StreamTime")
                    span("wululu", id: "StreamTime")
                    span("Offset")
                    span("wululu", id: "Offset")
                    span("LapCount")
                    span("wululu", id: "LapTime")
                }
            }
            div(class: 'col-lg-1'){
                div(class: 'gauge-side-top') {
                    p("FR Tyre", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fr-tyre-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("FR brake", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fr-brake-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("FR slip", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-fr-slip-speed', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }

                div(class: 'gauge-side-top') {
                    p("RR Tyre", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rr-tyre-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("RR brake", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rr-brake-temp', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
                div(class: 'gauge-side-top') {
                    p("RR slip", class: 'gauge-nameSmall text-center')
                    canvas(id: 'gauge-rr-slip-speed', class: 'gauge-box')
                    p("Wululu", class: 'gauge-valueSmall text-center value')
                }
            }

        }
    }

}