class Data {
    constructor(en_i, tw_i, en_u, tw_u, i_table, u_table, p_table) {
        this.en_i = en_i;
        this.en_u = en_u;
        this.tw_i = tw_i;
        this.tw_u = tw_u;
        this.i_table = $(`#${i_table}`)
        this.u_table = $(`#${u_table}`)
        this.p_table = $(`#${p_table}`)
        this.paints = [5027, 5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036,
            5037, 5038, 5039, 5040, 5046, 5051, 5052, 5053, 5054, 5055,
            5056, 5060, 5061, 5062, 5063, 5064, 5065, 5076, 5077];
        this.paints_rgb = {
            5027: '#729E42', 5028: '#424F3B', 5029: '#51384A', 5030: '#D8BED8', 5031: '#7D4071',
            5032: '#CF7336', 5033: '#A57545', 5034: '#C5AF91', 5035: '#694D3A', 5036: '#7C6C57',
            5037: '#E7B53B', 5038: '#7E7E7E', 5039: '#E6E6E6', 5040: '#141414', 5046: ['#B8383B', '#5885A2'],
            5051: '#FF69B4', 5052: '#2F4F4F', 5053: '#808000', 5054: '#32CD32', 5055: '#F0E68C',
            5056: '#E9967A', 5060: ['#483838', '#384248'], 5061: ['#A89A8C', '#839FA3'],
            5062: ['#3B1F23', '#18233D'], 5063: ['#654740', '#28394D'], 5064: ['#803020', '#256D8D'],
            5065: ['#C36C2D', '#B88035'], 5076: '#BCDDB3', 5077: '#2D2D24'
        };
        this.pages = Math.ceil(en_i.length / 100);
    }
    getPageCount() {
        return pages;
    }
    updateItemTable(page) {

    }

    updateUnusualtable() {
        let tb = '';
        for (let i = 0; i < this.en_u.length; ++i) {
            tb += `
                <tr>
                    <td>${this.en_u[i]["id"]}</td>            
                    <td><a href="javascript:void(0)" id="u_img_${this.en_u[i]["id"]}" title="${this.en_u[i]["name"]}" data-toggle="popover" data-trigger="focus" data-content="">${this.en_u[i]["name"]}</a></td>           
                    <td>${this.tw_u[i]["name"]}</td>
                    <td>${this.en_u[i]["system"]}</td>           
                </tr>
            `;
        }
        this.u_table.append(tb);
        for (let i = 0; i < this.en_u.length; ++i) {
            let img = `<img src="imgs/${this.en_u[i]["id"]}.png">`;
            $(`#u_img_${this.en_u[i]["id"]}`).popover({ content: img, html: true });
        }
    }
    updatePaintTable() {
        let tp = '';
        for (let i = 0; i < this.tw_i.length; ++i) {
            if (this.paints.indexOf(this.tw_i[i]["defindex"]) != -1) {
                let firColor, secColor;
                if(this.tw_i[i]["attributes"].length == 2){
                    firColor = this.paints_rgb[this.tw_i[i]["defindex"]][0];
                    secColor = this.paints_rgb[this.tw_i[i]["defindex"]][1];
                }
                else{
                    firColor = this.paints_rgb[this.tw_i[i]["defindex"]];
                    secColor = firColor;
                }
                tp += `
                    <tr>
                        <td>${this.tw_i[i]["defindex"]}</td>  
                        <td>${this.en_i[i]["item_name"]}</td>
                        <td>${this.tw_i[i]["item_name"]}</td>
                        <td style="background-color:${firColor}">${this.tw_i[i]["attributes"][0]['value']}</td>
                        <td style="background-color:${secColor}">${this.tw_i[i]["attributes"][(secColor == firColor)?0:1]['value']}</td>
                    </tr>
                    `;
            }
        }
        this.p_table.append(tp);
    }
}