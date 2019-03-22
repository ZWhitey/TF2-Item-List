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
            scrap += Math.round(parseInt(tmp[1], 10) / 11)
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
    $("#c_ref").text(`精煉金屬 : ${ref}`);
    $("#c_rec").text(`回收金屬 : ${rec}`);
    $("#c_scrap").text(`廢金屬 : ${scrap}`);
}
function onClickPagination(page){
    item_data.setPage(page);
    item_data.updateItemTable();
    updatePagination();
}
function updatePagination(){
    var p = $('#pagination');
    p.empty();
    var head = `<li class="page-item ${(item_data.getPage() <= 1)?'disabled':''}">
                    <a class="page-link" href="#" aria-label="Previous" onclick="onClickPagination(${item_data.getPage() - 1})">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                    </a>
                </li>`;
    p.append(head);
    var start = item_data.getPage();
    if(start > item_data.getPageCount() - 7)
        start = item_data.getPageCount() - 6;
    else if(start > 4)
        start -= 3;
    else
        start = 1;
    for(let i = start;i < start + 7;++i){
        if(i > item_data.getPageCount())
            break;
        p.append(`
        <li class="page-item ${(item_data.getPage() == i)?'active':''}">
        <a class="page-link" href="#" onclick="onClickPagination(${i})">${i}</a></li>
        `)
    }
    var tail = `<li class="page-item ${(item_data.getPage() >= item_data.getPageCount())?'disabled':'1'}">
                    <a class="page-link" href="#" aria-label="Next" onclick="onClickPagination(${item_data.getPage() + 1})">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                    </a>
                </li>`;
    p.append(tail);
}