const ctx = document.querySelector('.chart-js').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData().then(data => parsMapData(data)).then(drawChart);

function fetchData() {
    return fetch("./data/ZonAnn.Ts+dSST.csv")
        .then(r => r.text())
}
        
    
function parsMapData(data) {
    const parsedData = Papa.parse(data, { header: true }).data;
    const mapedData = parsedData.reduce((acc, entry) => {
        acc.years.push(entry.Year);
        acc.globalTemp.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
        acc.NorthHSp.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
        acc.SouthHsp.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);

        return acc
    }, { years: [], globalTemp: [], NorthHSp: [], SouthHsp: [] });
    return mapedData
}


function drawChart({ years, globalTemp, NorthHSp, SouthHsp }) {
          new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Global temperature',
            data: globalTemp,
            borderColor: 'violet',
            borderWidth: 3,
            borderJoinStyle: 'bevel',
        },
        
        {
            label: 'North Hemisphere',
            data: NorthHSp,           
            borderColor: 'teal',                
            borderWidth: 1,
            borderJoinStyle: 'bevel',
            },
        
          {
            label: 'South Hemisphere',
            data: SouthHsp,           
            borderColor: 'tomato',                
            borderWidth: 1,
            borderJoinStyle: 'bevel',
            }
        
        ],
        
            },
    
    options: {
        scales: {
           y: {
               ticks: {
                    // Include a dollar sign in the ticks
                    callback(value, index, values) {
                        return  value + '°C';
                    }
                }
            }
        },
        

    }
});     
       }