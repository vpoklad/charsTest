async function fetchData() {
    const response = await fetch("./data/ZonAnn.Ts+dSST.csv")
    const data = await response.text();
    return data
}
fetchData().then(console.log);

console.log(window);