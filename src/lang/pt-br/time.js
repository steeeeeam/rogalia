"use strict";

T.time = function(time) {
    var txt = "";
    var minutes = time / 60 | 0;

    function one(n) {
        return n == 1 || n % 10 == 1;
    }

    if (minutes) {
        txt = minutes + " ";
        txt += one(minutes) ? "minuto" : "minutos";
    }
    var seconds = time % 60;
    if (seconds) {
        if (minutes)
            txt += " ";
        txt += seconds + " ";
        txt += one(seconds) ? "segundo" : "segundos";
    }
    return txt;
};
