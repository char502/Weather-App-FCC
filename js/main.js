
// alert('is this working?')


$(document).ready(function () {
    $('.small').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;

            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;

            var url = 'https://api.apixu.com/v1/current.json?key=6e7e0c790a264268b3e100410181604&q=';

            $.getJSON(url + latitude + ',' + longitude, function (data) {

                var data = JSON.stringify(data);
                var json = JSON.parse(data);

                console.log(data);
                console.log(json);

                var country = json.location.country;
                var city = json.location.name;
                var region = json.location.region;

                var tempCel = json.current.temp_c;
                //console.log(tempCel)
                var tempFar = json.current.temp_f;
                //console.log(tempFar);
                var lastUpdated = json.current.last_updated.replace('-', ' ');
                console.log(lastUpdated);

                var windMPH = json.current.wind_mph
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;

                $('#getData').html(city + ', ' + region + ', ' + country);


                if (tempCel <= 10) {
                    $('.other-jumbo').css({
                        'backgroundImage': 'url(https://github.com/char502/Weather-App-FCC/blob/master/js/pics/nature-3279071_960_720.jpg)'
                    });
                    $('#weatherStatement').html("<h1>It's a bit chilly today<hr></h1>");
                } else if (tempCel > 10 && tempCel < 18) {
                    $('.other-jumbo').css({
                        'backgroundImage': 'url(https://github.com/char502/Weather-App-FCC/blob/master/js/pics/sunlight-2547619_960_720.jpg)',
                        'color': 'white'
                    });
                    $('#weatherStatement').html("<h1>It's a mild day today<hr></h1>");
                } else if (tempCel > 18 && tempCel < 28) {
                    $('.other-jumbo').css({
                        'backgroundImage': 'url(https://github.com/char502/Weather-App-FCC/blob/master/js/pics/nature-1071466_960_720.jpg)'
                    });
                    $('#weatherStatement').html("<h1>A lovely warm day today<hr></h1>");
                } else {
                    $('.other-jumbo').css({
                        'backgroundImage': 'url(https://github.com/char502/Weather-App-FCC/blob/master/js/pics/desert-790640_960_720.jpg)'
                    });
                    $('#weatherStatement').html("<h1>It's a really hot day today<hr></h1>");
                }


                $('#data1').html('Time: ' + time);
                $('#data2').html('Wind: ' + windMPH + ' mph');

                // Only show horizontal lines when the data has loaded
                $('.small').show();

                // temp
                $('#data3').html(tempCel + ' &#8451');
                // toggle between Celsius and Fahrenheit
                var yes = true;
                $('#change').on('click', function () {
                    if (yes) {
                        $('#data3').html(tempFar + ' &#8457');
                        $('#change').html('Show in Celsius');
                        $('#change').css({ 'outline': 'none' });
                        yes = false;
                    } else {
                        $('#data3').html(tempCel + ' &#8451');
                        $('#change').html('Show in Fahrenheit');
                        $('#change').css({ 'outline': 'none' });
                        yes = true;
                    }
                });

                //cloud cover
                if (cloud <= 30) {
                    $('#data4').html('Clear Skies');
                } else if (cloud >= 31 && cloud <= 60) {
                    $('#data4').html('Cloudy');
                } else {
                    $('#data4').html('Overcast');
                }

                $('#data5').html('Humidity ' + humidity + '%');
            });
        });
    }
});




