var myMap = L.map("map", {
    center: [51.5074, 0.1278],
    zoom: 2
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


var url = "http://127.0.0.1:5000/api/movies"

d3.json(url).then(function (data) {
    console.log("api test", data)


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
        }).bindPopup("<h1>" + `${country_name}` + "</h1><br> <h3>Average rating: " + `${rating}` + "</h3>").addTo(myMap)

    }

}
)

d3.select("#genre").on("change", updateBarchart)

function updateBarchart() {
    let selected_genre = d3.select("#genre").property("value")
    console.log(selected_genre)
    let url = "http://127.0.0.1:5000/" + selected_genre.split(",")[0]
    console.log(url)
    d3.json(url).then(function (data) {
        xlabel = data.map(a => a.country)
        ydata = data.map(a => a.avg_rating)
        bgcolors = data.map(a => getColor(a.avg_rating))
        bdrcolors = data.map(a => 'rgba(153, 102, 255, 1)')
        myChart.data.datasets[0].data = ydata
        myChart.data.datasets[0].backgroundColor = bgcolors
        myChart.data.labels = xlabel
        myChart.update()
    })

}


function getColor(d) {
    return d > 7 ? 'green' :
        d > 5 ? 'yellow' :
            d > 2 ? 'red' : 'darkred';
}

d3.json("http://127.0.0.1:5000/Crime").then(function (data) {

    console.log(data)
    xlabel = data.map(a => a.country)
    ydata = data.map(a => a.avg_rating)
    bgcolors = data.map(a => getColor(a.avg_rating))
    bdrcolors = data.map(a => 'rgba(153, 102, 255, 1)')
    console.log(ydata)
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabel,
            datasets: [{
                label: 'country',
                data: ydata,
                backgroundColor: bgcolors,
                borderColor: bdrcolors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: { text: "Average Rating", display: true, font: { size: 20 } }

                }
            }

        }
    });





})
var myChart