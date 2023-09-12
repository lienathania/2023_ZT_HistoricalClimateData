import { barChart } from "./barChart.js";
import { getPlaceNumberByYear,getDataByYear,allData_preprocessing} from "./preprocess.js";
import { UI_Function } from "./UI.js";
import { sub_categories_bar, drawFunctionBasedPlace } from "./tia.js";

//某些Attibute需要為數字
const parseRow = (d) => {
    d.year_lunar_st =+d.year_lunar_st;
    d.year_lunar_ed =+d.year_lunar_ed;
    return d;
};

let year_lunar_st=1368;
let year_lunar_ed=1911;

const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


//畫map的所需的projection
const projection =  d3.geoMercator()
.center([116,39])
.scale(600);

// append the svg object to the body of the page

const svg_ChinaMap=d3.select("#ChinaMap").attr("width", 800)
.attr("height", 550)
.append("svg")
.attr("width", 800)
.attr("height", 550)
.append("g")
//.attr("transform", `translate(${-240},${-100})`);

const svg_Rain = d3.select("#Rain")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const svg_Drought = d3.select("#Drought")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const svg_Pest = d3.select("#Pest")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const svg_Crop = d3.select("#Crop")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const sub_Categories_svg = d3.select("#subCategories")
.append("svg")
.attr("width", width*5 + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);



/////////////////////////OUR PLACE FOR GLOBAL VARIABLE////////////////////////////////
var ChinaMapData
var TaiwanMapData
var ClimateDatas
var mainCategory_Chosen = "Pest"
var place_Chosen =['江蘇省']
var cleanData
/////////////////////////OUR PLACE FOR GLOBAL VARIABLE////////////////////////////////

const GetAllData=async()=>{
    ChinaMapData=await d3.json("zh-mainland-provinces.topo.json");
    TaiwanMapData=await d3.json("zh-chn-twn.topo.json")
    ClimateDatas = await d3.csv("REACHES1368_1911_test.csv",parseRow);
}

export const inArray=(array, n)=>{
    for (var i =0; i < array.length; i++){
        if(array[i]==n) return true
    }
    return false
}

const DrawMap=(pre_data,year_lunar_st,year_lunar_ed)=>{
    //console.log(d3.extent([1,2,5,7,8]))
    //console.log(pre_data)
    
    // COLORS
    // define color scale
    var colorScale = d3.scaleLinear()
    .domain([0,10])
    .interpolate(d3.interpolateHcl)
    .range(["Yellow ", "Red"]);
    // add grey color if no values
    var color = function(i){ 
        if (i==undefined) {return "#cccccc"}
            else return colorScale(i)
    }
    
    //console.log("DrawMap")

    // Draw the map
    //畫大陸
    svg_ChinaMap
    .append("g")
        .selectAll("path")
        .data(topojson.feature(ChinaMapData,ChinaMapData.objects.provinces).features)
        .join("path")
        .attr("fill", "#69b3a2")
        .attr("fill",d=>{
            let value=0
            pre_data.forEach(item=>{
              if(item.place==d.properties.name_local.split("|")[0])
                value=item.Quantify;
            })
             return color(value)
           })
        .attr("d", d3.geoPath()
            .projection(projection)
            )
        .style("stroke", "#000")
        .on('click',function(d,i){
            var clicked_city = d.target.__data__.properties.name_local.split("|")
            
            if(place_Chosen.indexOf(clicked_city[0])!=-1){
                var index = place_Chosen.indexOf(clicked_city[0]);  
                place_Chosen.splice(index, 1);
            }
            else place_Chosen.push(clicked_city[0])
            drawFunctionBasedPlace(sub_Categories_svg, place_Chosen, cleanData, mainCategory_Chosen,year_lunar_st,year_lunar_ed)
        })
    
        drawFunctionBasedPlace(sub_Categories_svg, place_Chosen, cleanData, mainCategory_Chosen,year_lunar_st,year_lunar_ed)

    //畫台灣
    //console.log(topojson.feature(TaiwanMapData,TaiwanMapData.objects.layer1).features.filter(function(d) { return d.properties.GU_A3 === 'TWN'; }))
    svg_ChinaMap
    .append("g")
        .selectAll("path")
        .data(topojson.feature(TaiwanMapData,TaiwanMapData.objects.layer1).features.filter(function(d) { return d.properties.GU_A3 === 'TWN'; }))
        .join("path")
        .attr("fill", "#69b3a2")
        .attr("fill", d=>{
            let value=0
            pre_data.forEach(item=>{
              if(item.place==d.properties.NAME.split("|")[0])
                value=item.Quantify;
            })
             return color(value)
           })
        .attr("d", d3.geoPath()
            .projection(projection)
            )
        .style("stroke", "#000")
    
}



export const RefreshUI = (year_lunar_st,year_lunar_ed) => { 
    
    console.log("Refresh UI"+year_lunar_st+" "+year_lunar_ed)
    console.log("main category = " + mainCategory_Chosen)

    cleanData = allData_preprocessing(ClimateDatas, year_lunar_st, year_lunar_ed);

    // 取得做完前處理的資料
    //事件代碼  乾旱"30" 水災"31" 病蟲害"32" 農作歉收"33"" 
    let pre_DroughtData=getPlaceNumberByYear(ClimateDatas,"30",year_lunar_st,year_lunar_ed);
    let pre_RainData= getPlaceNumberByYear(ClimateDatas,"31",year_lunar_st,year_lunar_ed);
    let pre_PestData=getPlaceNumberByYear(ClimateDatas,"32",year_lunar_st,year_lunar_ed);
    let pre_CropData=getPlaceNumberByYear(ClimateDatas,"33",year_lunar_st,year_lunar_ed);


    //------開始做視覺化-----
    //畫地圖
    DrawMap(pre_RainData,year_lunar_st,year_lunar_ed);
    
    //畫BarChart
    //乾旱
    /*let Drought_plot= barChart().data(pre_DroughtData).width(width).height(height).color("Khaki ");
    svg_Drought.call(Drought_plot);

    //水災
    let Rain_plot= barChart().data(pre_RainData).width(width).height(height).color("LightSkyBlue");
    svg_Rain.call(Rain_plot);
    
    //病蟲害
    let Pest_plot=barChart().data(pre_PestData).width(width).height(height).color("DarkGreen ");
    svg_Pest.call(Pest_plot);

    //農作歉收
    let Crop_plot=barChart().data(pre_CropData).width(width).height(height).color("Gold");
    svg_Crop.call(Crop_plot);*/

    sub_categories_bar(sub_Categories_svg,cleanData,mainCategory_Chosen)
    
}

const init= async()=>{
    await GetAllData();
    UI_Function(year_lunar_st,year_lunar_ed);
    RefreshUI(year_lunar_st,year_lunar_ed);
}

init();



//-----------------------Button Function----------------------------
//下載成csv檔案
function Download_Csv(){
    let rangePrice = document.querySelectorAll(".range-price input");
    let year_lunar_st=rangePrice[0].value
    let year_lunar_ed=rangePrice[1].value
    
    let FileName="REACHES"+year_lunar_st.toString()+"_"+year_lunar_ed.toString()+".csv";
    //將字串組成csv格式 存在text這個變數
    let text=""
    
    //想要下載的資料
    let arrayData=getDataByYear(ClimateDatas,year_lunar_st,year_lunar_ed)
    
    //取第一筆資料來找title
    let arrayTitle=Object.keys(ClimateDatas[0])
    
    //第一行是各項attr的title
    text+=arrayTitle.join(',');
    text+="\n";

    arrayData.forEach(d=>{
        arrayTitle.forEach(title=>{
          let item=d[title] ||"";
          item=item.toString();
          text+=item;
          text+=","
        })
        text+="\n";
    })

    var blob = new Blob([text],
        { type: "text/csv;charset=utf-8" });
    
    //要加入bom要不然中文會是亂碼
    blob=bom(blob, { autoBom: true });
    saveAs(blob, FileName);

}
function DrawDroughtMap(){
    
    let pre_DroughtData=getPlaceNumberByYear(ClimateDatas,"30",year_lunar_st,year_lunar_ed);
    DrawMap(pre_DroughtData,year_lunar_st,year_lunar_ed);

    mainCategory_Chosen = "Drought"
}
function DrawFloodMap(){
    
    let pre_FloodData=getPlaceNumberByYear(ClimateDatas,"31",year_lunar_st,year_lunar_ed);
    DrawMap(pre_FloodData,year_lunar_st,year_lunar_ed);

    mainCategory_Chosen = "Flood"
    RefreshUI(year_lunar_st, year_lunar_ed);
}
function DrawPestMap(){
    let pre_PestData=getPlaceNumberByYear(ClimateDatas,"32",year_lunar_st,year_lunar_ed);
    DrawMap(pre_PestData,year_lunar_st,year_lunar_ed);

    mainCategory_Chosen = "Pest"
    
    RefreshUI(year_lunar_st, year_lunar_ed);
}
function DrawCropMap(){
    let pre_CropData=getPlaceNumberByYear(ClimateDatas,"33",year_lunar_st,year_lunar_ed);
    DrawMap(pre_CropData,year_lunar_st,year_lunar_ed);

    mainCategory_Chosen = "Crop"
    
    RefreshUI(year_lunar_st, year_lunar_ed);
}

document.getElementById("Drought_Btn").onclick =  DrawDroughtMap
document.getElementById("Flood_Btn").onclick =  DrawFloodMap
document.getElementById("Pest_Btn").onclick =  DrawPestMap
document.getElementById("Crop_Btn").onclick =  DrawCropMap
document.getElementById("Download_Btn").onclick = Download_Csv

