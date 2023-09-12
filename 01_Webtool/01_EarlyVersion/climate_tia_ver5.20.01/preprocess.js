function getPlaceArray(){
    let data=[{place: '河北省'},{place: '山東省'},{place: '江蘇省'},{place: '浙江省'},{place: '江西省'},
          {place: '河南省'},{place: '四川省'},{place: '甘肅省'},{place: '上海市'},{place: '廣西壯族自治區'},
          {place: '陝西省'},{place: '福建省'},{place: '北京市'},{place: '山西省'},{place: '廣東省'},
          {place: '安徽省'},{place: '湖南省'},{place: '湖北省'},{place: '雲南省'},{place: '寧夏回族自治區'},
          {place: '重慶市'},{place: '天津市'},{place: '遼寧省'},{place: '海南省'},{place: '青海省'},
          {place: '貴州省'},{place: '臺灣省'},{place: '吉林省'},{place: '黑龍江省'},{place: '新疆維吾爾自治區'},
          {place: '內蒙古自治區'},{place: '西藏自治區'},{place: '黑龍江'},{place: '內蒙古'}];
    return data;
}

//main_Category_Code 災難的編碼
export const getPlaceNumberByYear=(data,main_Category_Code,year_lunar_st,year_lunar_ed)=>{
    const precipitation = data.filter(function (d) {
        //判斷是否介於使用者選擇的年份     
        if((year_lunar_st<=d.year_lunar_st&&d.year_lunar_st<=year_lunar_ed)||
            year_lunar_st<=d.year_lunar_ed&&d.year_lunar_ed<=year_lunar_ed)
        {
            //事件代碼  乾旱"30" 水災"31" 病蟲害"32" 農作歉收"33"" 
            let eventCodes = d.event_code.split(";")
            for (let i = 0; i < eventCodes.length; i++) {
                if (eventCodes[i].slice(0, 2) == main_Category_Code) {
                    //strength=eventCodes[i].slice(5,6)
                    return true;
                }
            }
        }
    }).map((d)=>{
        
        //找到災害的強度
        let eventCodes = d.event_code.split(";")
        let strength=0
        for (let i = 0; i < eventCodes.length; i++) {
            if (eventCodes[i].slice(0, 2) == main_Category_Code) {
                strength=eventCodes[i].slice(5,6)          
            }
        }
        //只取得想要關注的Attibute
        return{
            year_lunar_st:  d.year_lunar_st, //陽曆起始時間
            year_lunar_ed:  d.year_lunar_ed, //陽曆結束時間
            event_code: d.event_code,        //事件代碼
            place_provin: d.place_provin,    //發生的地點
            place_longit: d.place_longit,    //地點的經度
            place_latitu: d.place_latitu,    //地點的緯度
            hazard_strength:strength         //災害的強度
        }
    })

    //console.log(precipitation)
    let pre_data=getPlaceArray();
    //加一些我想要的欄位
    pre_data.forEach(element=>{
        element["number"]=0;
        element["Normal"]=0;
        element["Heavy"]=0;
        element["VeryHeavy"]=0;
    });
    //計算每個地點發生的數量，和災害程度
    precipitation.forEach(element => {
        pre_data.forEach(item=>{
            if(item.place==element.place_provin)
            {
                //數量
                item.number+=1
                
                //災害程度
                if(element.hazard_strength==0||element.hazard_strength==1||element.hazard_strength==2)
                    item["Normal"]+=1
                else if(element.hazard_strength==3||element.hazard_strength==4||element.hazard_strength==5)
                    item["Heavy"]+=1
                else if(element.hazard_strength==6)
                {
                    item["VeryHeavy"]+=1
                    console.log("very HEAVY")
                }      
                else{
                    //console.log(element.hazard_strength)
                    //console.log(element.event_code)
                }
                    
            }
        })
    });
    
    pre_data.forEach(element=>{
        let normal=element.Normal;
        let heavy=element.Heavy;
        let veryHeavy=element.VeryHeavy;
        let value= (normal*1+heavy*2+veryHeavy*3)/(year_lunar_ed-year_lunar_st)
        element["Quantify"]=value;
    });

    //console.log(pre_data)
    return pre_data;
}

export const getDataByYear=(data,year_lunar_st,year_lunar_ed)=>{
    const precipitation = data.filter(function (d) {
        //判斷是否介於使用者選擇的年份     
        if((year_lunar_st<=d.year_lunar_st&&d.year_lunar_st<=year_lunar_ed)||
            year_lunar_st<=d.year_lunar_ed&&d.year_lunar_ed<=year_lunar_ed)
        {
            //水災的事件代碼為"31"
            //let eventCodes = d.event_code.split(";")
            //for (let i = 0; i < eventCodes.length; i++) {
            //   if (eventCodes[i].slice(0, 2) == "31") {
            //        return true;
            //    }
            //}
            return true;
        }
    })

    return precipitation;
}

export const allData_preprocessing = (data,year_lunar_st, year_lunar_ed)=>{

    var cleanData = [];
    
    const precipitation = data.filter(function (d) {
        //判斷是否介於使用者選擇的年份     
        if((year_lunar_st<=d.year_lunar_st&&d.year_lunar_st<=year_lunar_ed)||
            year_lunar_st<=d.year_lunar_ed&&d.year_lunar_ed<=year_lunar_ed)
        {
            return true;
        }
    })
    .map((d)=>{
        let eventCodes = d.event_code.split(";")
        for(var i=0; i < eventCodes.length; i++){
            if(eventCodes[i].slice(0, 2) == "30"||eventCodes[i].slice(0, 2) == "31"||eventCodes[i].slice(0, 2) == "32"||eventCodes[i].slice(0, 2) == "33"){
                cleanData.push({
                    year_lunar_st:  d.year_lunar_st, //陽曆起始時間
                    year_lunar_ed:  d.year_lunar_ed, //陽曆結束時間
                    event_code: eventCodes[i],        //事件代碼
                    mainCategory: +eventCodes[i].slice(0,2),
                    subCategory: +eventCodes[i].slice(2,4),
                    vocabularyCode: +eventCodes[i].slice(4,7),
                    magnitude: +eventCodes[i].slice(7,8),
                    timeDuration : +eventCodes[i].slice(8,9),
                    place_provin: d.place_provin,    //發生的地點
                    place_longit: d.place_longit,    //地點的經度
                    place_latitu: d.place_latitu,    //地點的緯度
                })                
            }
        }
    })
    
    return cleanData

}
