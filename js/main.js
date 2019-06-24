ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [53.30540955851826, 34.30579138473654],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        }),

    // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [53.30540955851826, 34.30579138473654]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'БГТУ',
                hintContent: 'Мы здесь'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        });
       

    myMap.geoObjects
        .add(myGeoObject)
       
        .add(new ymaps.Placemark([53.27540426682756,34.315964797930384], {
            iconCaption: ' Аэропарк'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([53.23474567752859,34.35365648761173], {
            iconCaption: 'Площадь Партизан'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#735184'
        }))
        .add(new ymaps.Placemark([53.243960460626035,34.36404018817952], {
            iconCaption: ' Площадь Ленина'
        }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }))
        .add(new ymaps.Placemark([53.25343844967298,34.377112873984316], {
            balloonContent: ' <strong>Преображенская Церковь</strong>',
            iconCaption: 'Бизнес центр'
        }, {
            preset: 'islands#circleDotIcon',
            iconColor: 'yellow'
        }))
        .add(new ymaps.Placemark([53.26861668158134,34.36463186733033], {
             iconCaption: 'Курган Бессмертия',
             balloonContent: 'Тут красиво'
        }, {
            preset: 'islands#governmentCircleIcon'
        }));
        
}
