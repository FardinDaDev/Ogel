(function init() {

    fetch("http://localhost:8080/api", {
        method: 'get'
    }).then(response => {
        if (!response.ok) throw response;
        return response.json;
    }).then(json => {
        console.log("OK, initialised");
    }).catch(err => {
        console.log("Couldn't get the JSON: ", err);
    });

})();

let ctx = document.getElementById('machineStatusChart').getContext('2d');
let machineStatusChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
            '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
            '19:00', '20:00', '21:00', '22:00', '23:00'],
    }
});

