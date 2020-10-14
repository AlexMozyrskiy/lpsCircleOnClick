function lpsCircleOnClick(arr)
/*
    Пример вызова функции

    lpsCircleOnClick({
        elementsClass: 'button',         // класс элементов при нажатии на каждый из которых будет происходить анимация
        circleColor: 'red',             // цвет круга анимации
        animationDuration: '0.5',        // длительность анимации
    });
*/
{
    const elements = document.getElementsByClassName(arr.elementsClass);

    let clickCoordinateX;               //  координата клика по X
    let clickCoordinateY;               //  координата клика по Y
    let circleCenterCoordinateX;        //  координаты центра появляющегося круга по оси Х
    let circleCenterCoordinateY;        //  координаты центра появляющегося круга по оси Y
    let circleRadius;                   //  радиус окружности которую будем анимировать при клике исхлдя из макс размера ширины элемента или высоты

    // ---------- вставим в head тег style лющаие для всех элементов, чтобы разработчик мог определить стили круга такие как: circleColor: 'white', animationDuration: '.5' ---------
    let styleHead = document.createElement('style');

    // Append <style> element to <head>
    document.head.appendChild(styleHead);

    // Grab style element's sheet
    let styleSheet = styleHead.sheet;

    // Insert CSS Rule
    styleSheet.insertRule('.lpsCircleOnClick{background-color: ' + arr.circleColor + '; position: absolute; border-radius: 50%; transform: scale(0); animation-name: lpsCircleOnClick; animation-duration: ' + arr.animationDuration + 's;}', styleSheet.cssRules.length);
    styleSheet.insertRule('@keyframes lpsCircleOnClick {to {transform: scale(2); opacity: 0;}}', styleSheet.cssRules.length);
    // ---------- / вставим в head тег style лющаие для всех элементов, чтобы разработчик мог определить стили круга такие как: circleColor: 'white', animationDuration: '.5' -------

    Array.prototype.forEach.call(elements, function(element) {
        element.style.overflow = 'hidden';
        element.style.position = 'relative';

        element.addEventListener('click', (e) => {
            circleRadius = Math.max(element.clientWidth, element.clientHeight) / 2;

            // ----------------- вставим правили css в тег style индивидуальные для каждой кнопки --------------------------------
            styleSheet.insertRule('.lpsCircleOnClick{width: ' + circleRadius + 'px; height: ' + circleRadius + 'px}', styleSheet.cssRules.length);
            // ----------------- / вставим правили css в тег style индивидуальные для каждой кнопки ------------------------------


            clickCoordinateX = e.layerX == undefined ? e.offsetX : e.layerX;        //  координата клика по X
            clickCoordinateY = e.layerY == undefined ? e.offsetY : e.layerY;        //  координата клика по Y
    
            circleCenterCoordinateX = clickCoordinateX - circleRadius / 2;          //  вычислим координаты центра появляющегося круга по оси Х
            circleCenterCoordinateY = clickCoordinateY - circleRadius / 2;          //  вычислим координаты центра появляющегося круга по оси Y
    
            styleSheet.insertRule('.lpsCircleOnClick{left: ' + circleCenterCoordinateX + 'px;  top: ' + circleCenterCoordinateY + 'px;}', styleSheet.cssRules.length);
    
            element.insertAdjacentHTML('beforeend', '<div class="lpsCircleOnClick"></div>');
        });
    });
}