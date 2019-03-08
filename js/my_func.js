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
function updateItemTable(start){
    var table = $("#table");
    table.empty();
    var cls = '';
    for(var i=start;i<tw.length;++i){
        if(i>= tw.length)
            break;
        cls = getUseClass(tw[i]["used_by_classes"]);
        table.append( `
            <tr class="d-flex">  
                <td class="col-1">${tw[i]["defindex"]}</td>            
                <td class="col-3"><a href="javascript:void(0)" id="i_img_${tw[i]["defindex"]}" title="${tw[i]["item_name"]}" data-toggle="popover" data-trigger="focus" data-content="">${en[i]["item_name"]}</a></td>           
                <td class="col-3">${tw[i]["item_name"]}</td>
                <td class="col-3">${cls}</td>
                <td class="col-2">${tw[i]["item_class"]}</td>           
            </tr>
            `);
        var img = `<img src="${tw[i]['image_url']}">`;
        $(`#i_img_${tw[i]["defindex"]}`).popover({ content: img, html: true });
    }  
}
function getUseClass(classes){
    var cls = '';
    if (classes !== undefined) {
        if (classes.length == 0) {
            cls = 'All Classes';
        }
        else {
            for (var k = 0; k < classes.length; ++k) {
                cls += `<img src="./class_imgs/${classes[k]}.png" width="25" height="25" class="text-nowrap">`
            }
        }
    }
    else {
        cls = 'All Classes';
    }
    return cls;
}
function showPaintTable(){
    var p_table = $("#p_table");
    var tp = '';
    for(var i=0;i<tw.length;++i){
        if (paints.indexOf(tw[i]["defindex"]) != -1){
            if (tw[i]["attributes"].length == 1) {
                tp += `
                        <tr>
                            <td>${tw[i]["defindex"]}</td>  
                            <td>${en[i]["item_name"]}</td>
                            <td>${tw[i]["item_name"]}</td>
                            <td style="background-color:${paints_rgb[tw[i]["defindex"]]}">${tw[i]["attributes"][0]['value']}</td>
                            <td style="background-color:${paints_rgb[tw[i]["defindex"]]}">${tw[i]["attributes"][0]['value']}</td>
                        </tr>
                        `;
            }
            else if (tw[i]["attributes"].length == 2) {
                tp += `
                            <tr>
                                <td>${tw[i]["defindex"]}</td>  
                                <td>${en[i]["item_name"]}</td>
                                <td>${tw[i]["item_name"]}</td>
                                <td style="background-color:${paints_rgb[tw[i]["defindex"]][0]}">${tw[i]["attributes"][0]['value']}</td>
                                <td style="background-color:${paints_rgb[tw[i]["defindex"]][1]}">${tw[i]["attributes"][1]['value']}</td>
                            </tr>
                            `;
            }
        }
    }
    p_table.append(tp);
}
function showUTable(){
    var utable = $("#u_table");
    var tb = '';
    for (var i = 0; i < en_unusual.length; ++i) {
        tb += `
                        <tr>
                            <td>${en_unusual[i]["id"]}</td>            
                            <td><a href="javascript:void(0)" id="u_img_${en_unusual[i]["id"]}" title="${en_unusual[i]["name"]}" data-toggle="popover" data-trigger="focus" data-content="">${en_unusual[i]["name"]}</a></td>           
                            <td>${tw_unusual[i]["name"]}</td>
                            <td>${en_unusual[i]["system"]}</td>           
                        </tr>`;
    }
    utable.append(tb);
    for (var i = 0; i < en_unusual.length; ++i) {
        var img = `<img src="imgs/${en_unusual[i]["id"]}.png">`;
        $(`#u_img_${en_unusual[i]["id"]}`).popover({ content: img, html: true });
    }
}
function showdata() {
    var table = $("#table");
    var p_table = $("#p_table");
    for (var j = 0; j < en_data.length; ++j) {
        var tb = '';
        var tp = '';
        for (var i = 0; i < en_data[j]["items"].length; ++i) {
            if (paints.indexOf(tw_data[j]["items"][i]["defindex"]) != -1) {
                if (tw_data[j]["items"][i]["attributes"].length == 1) {
                    tp += `
                            <tr>
                                <td>${tw_data[j]["items"][i]["defindex"]}</td>  
                                <td>${en_data[j]["items"][i]["item_name"]}</td>
                                <td>${tw_data[j]["items"][i]["item_name"]}</td>
                                <td style="background-color:${paints_rgb[tw_data[j]["items"][i]["defindex"]]}">${tw_data[j]["items"][i]["attributes"][0]['value']}</td>
                                <td style="background-color:${paints_rgb[tw_data[j]["items"][i]["defindex"]]}">${tw_data[j]["items"][i]["attributes"][0]['value']}</td>
                            </tr>
                            `;
                }
                else if (tw_data[j]["items"][i]["attributes"].length == 2) {
                    tp += `
                                <tr>
                                    <td>${tw_data[j]["items"][i]["defindex"]}</td>  
                                    <td>${en_data[j]["items"][i]["item_name"]}</td>
                                    <td>${tw_data[j]["items"][i]["item_name"]}</td>
                                    <td style="background-color:${paints_rgb[tw_data[j]["items"][i]["defindex"]][0]}">${tw_data[j]["items"][i]["attributes"][0]['value']}</td>
                                    <td style="background-color:${paints_rgb[tw_data[j]["items"][i]["defindex"]][1]}">${tw_data[j]["items"][i]["attributes"][1]['value']}</td>
                                </tr>
                                `;
                }
            }
            var cls = '';
            if (tw_data[j]["items"][i]["used_by_classes"] !== undefined) {
                if (tw_data[j]["items"][i]["used_by_classes"].length == 0) {
                    cls = 'All Class';
                }
                else {
                    for (var k = 0; k < tw_data[j]["items"][i]["used_by_classes"].length; ++k) {
                        cls += `<img src="./class_imgs/${tw_data[j]["items"][i]["used_by_classes"][k]}.png" width="25" height="25">`
                    }
                }
            }
            else {
                cls = 'All Class';
            }

            tb += `
                            <tr>  
                                <td>${tw_data[j]["items"][i]["defindex"]}</td>            
                                <td><a href="javascript:void(0)" id="i_img_${tw_data[j]["items"][i]["defindex"]}" title="${en_data[j]["items"][i]["item_name"]}" data-toggle="popover" data-trigger="focus" data-content="">${en_data[j]["items"][i]["item_name"]}</a></td>           
                                <td>${tw_data[j]["items"][i]["item_name"]}</td>
                                <td>${cls}</td>
                                <td>${tw_data[j]["items"][i]["item_class"]}</td>           
                            </tr>`;
        }
        table.append(tb);
        //table_data.append(tb);
        p_table.append(tp);
        for (var i = 0; i < en_data[j]["items"].length; ++i) {
            var img = `<img src="${tw_data[j]['items'][i]['image_url']}">`;
            $(`#i_img_${tw_data[j]["items"][i]["defindex"]}`).popover({ content: img, html: true });
        }
    }

    
}