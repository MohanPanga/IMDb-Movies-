var myMap = L.map("map", {
    center: [51.5074, 0.1278],
    zoom: 2
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


var url = "http://127.0.0.1:5000/api/movies"

d3.json(url).then(function (data) {
    console.log("api test",data)
    

    for (i = 0; i < data.length; i++) {
        country = data[i]
        lon = country["longitude"]
        lat = country["latitude"]
        country_name = country["country"]
        rating = country["avg_rating"]


        L.circle([lat, lon], {
            radius: 100000,
            fillColor: 'green',
            color: "black",
            weight: 0.75,
            fillOpacity: 0.75
        }).bindPopup("<h1>"+`${country_name}`+"</h1><br> <h3>Average rating: " +`${rating}` + "</h3>").addTo(myMap)

    }
    
    // var legend = L.control({ position: 'bottomleft' });
    
    // legend.onAdd = function (map) {

    //     var div = L.DomUtil.create('div', 'info legend'),
    //         depths = [-10, 10, 20, 50, 100, 200, 500],
    //         labels = [];

    //     // loop through depth intervals and generate a label with a colored square for each interval
    //     div.innerHTML = '<b>Depth Legend</b><br>';
    //     for (var i = 0; i < depths.length; i++) {
    //         div.innerHTML +=
    //             '<i style="background:' + getColor(depths[i] + 1) + '"> &nbsp &nbsp </i> ' +
    //             depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    //     }

    //     return div;
    // };
    // function getColor(d) {
    //     return d > 500 ? '#800026' :
    //         d > 200 ? '#BD0026' :
    //             d > 100 ? '#E31A1C' :
    //                 d > 50 ? '#FC4E2A' :
    //                     d > 20 ? '#FD8D3C' :
    //                         d > 10 ? '#FEB24C' :
    //                             d > -10 ? '#a1d99b' :
    //                                 '#FFEDA0';
    // }
    // legend.addTo(myMap);
}
)


