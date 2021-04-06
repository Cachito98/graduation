function localDate(v){
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    let year = d.toISOString().split("T")[0];
    let mins = d.toISOString().split("T")[1].split(".")[0]
    return year+" "+mins
}


module.exports = {
    localDate
};
