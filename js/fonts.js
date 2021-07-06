var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var RobotoCondensed300 = new FontFaceObserver('RobotoCondensed', {
            weight: '300'
        });
        var RobotoCondensed400 = new FontFaceObserver('RobotoCondensed', {
            weight: 'normal'
        });
        var RobotoCondensed700 = new FontFaceObserver('RobotoCondensed', {
            weight: 'bold'
        });

        Promise.all([
            RobotoCondensed300.load(),
            RobotoCondensed400.load(),
            RobotoCondensed700.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}