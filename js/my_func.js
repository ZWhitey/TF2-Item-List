function update() {
    var n = document.getElementById("cal_input");
    var input = n.value;
    var lines = input.split('\n');
    var data = [];
    for (var i = 0; i < lines.length; ++i) {
        if (lines[i].length == 0)
            continue;
        if (/^[0-9]*(\.[0-9]{2})?$/g.test(lines[i])) {
            data.push(lines[i]);
        }
    }
    var ref = 0;
    var rec = 0;
    var scrap = 0;
    for (var i = 0; i < data.length; i++) {
        tmp = data[i].split('.');
        ref += parseInt(tmp[0]);
        if (tmp.length == 2) {
            scrap += Math.round(parseInt(tmp[1]) / 11)
        }
    }
    if (scrap >= 9) {
        ref += Math.floor(scrap / 9);
        scrap %= 9;
    }
    if (scrap >= 3) {
        rec += Math.floor(scrap / 3);
        scrap %= 3;
    }
    $("#c_ref").text(`Refine Metal : ${ref}`);
    $("#c_rec").text(`Reclaimed Metal : ${rec}`);
    $("#c_scrap").text(`Scrap Metal : ${scrap}`);
}

