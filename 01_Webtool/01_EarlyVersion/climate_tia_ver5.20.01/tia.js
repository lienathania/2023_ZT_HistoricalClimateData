const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
export const sub_categories_bar =(sub_Categories_svg,allData, mainCategory_Chosen) => { 
    //console.log("This is from sub_categories_bar function")


    const sub_categories_data = allData.filter(function (d) {
        if(mainCategory_Chosen == 'Drought' && d.mainCategory == 30)
        {
            return true;
        }
        if(mainCategory_Chosen == 'Flood' && d.mainCategory == 31)
        {
            return true;
        }
        if(mainCategory_Chosen == 'Pest' && d.mainCategory == 32)
        {
            return true;
        }
        if(mainCategory_Chosen == 'Crop' && d.mainCategory == 33)
        {
            return true;
        }
    })

    var temp = [], unique_sub_categories=[];
    sub_categories_data.map((d)=>{
        if(temp[d.subCategory] >= 0)
            temp[d.subCategory]++
        else{
            temp[d.subCategory]= 0
        }
    })

    var sub_categories_list = []
    for (var i=0; i < temp.length; i++){
        var name = 'ERROR'
        var lookFrom 
        if(mainCategory_Chosen == 'Drought') lookFrom = drought_definition 
        else if (mainCategory_Chosen == 'Flood') lookFrom = flood_definition 
        else if (mainCategory_Chosen == 'Pest') lookFrom = pest_definition 
        else if (mainCategory_Chosen == 'Crop') lookFrom = crop_definition 
        lookFrom.map((d)=>{
            if(d.code==i) name = d.name
        })
        if(temp[i] > 0)
            sub_categories_list.push({
                code_number : i,
                name : name,
                count : temp[i]
            })
    }

    sub_categories_list.map((d) => {unique_sub_categories.push(d.name)})

    //console.log(sub_categories_list)


    /////////////////////////////DRAW BARCHART ALSO HERE/////////////////////////////

    sub_Categories_svg.append("rect")
    .attr("x",-50)
    .attr("y",0)
    .attr('width',width+100)
    .attr('height',height*2)
    .attr("fill", "white")

    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(unique_sub_categories)
    .padding(0.2);

    sub_Categories_svg.append("g")
    .attr("transform", "translate("+0+"," + (height+10) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(45)")
    .attr("text-anchor", "start")

    var y = d3.scaleLinear()
    .domain([0, d3.max(temp)])
    .range([ height,0 ]); 

    sub_Categories_svg.append("g")
        .attr("transform", "translate("+0+"," + 10 + ")")
        .call(d3.axisLeft(y));

    sub_Categories_svg
    .append("text")
        .text(mainCategory_Chosen)
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", 40)
        .style("fill","black")
        .style("font-size", "40px")

    var barWidth = x.bandwidth()
    sub_Categories_svg.selectAll("mybar")
        .data(sub_categories_list)
        .enter()
        .append("rect")
        .attr("transform", "translate("+(barWidth/4)+"," + 10 + ")")
        .attr("x", function(d,i) { return (x.bandwidth()+barWidth/4)*i; })
        .attr("y", function(d,i) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d,i) {return height-y(d.count) ; })
        .attr("fill",'#60a164')
        .style("stroke","black")
    //console.log("Sub_categories_bar function ends")
}

export const drawFunctionBasedPlace =(sub_Categories_svg, place_Chosen, cleanData, mainCategory_Chosen,startChosen,startEnd) => { 

    var margin_left_lineChart = width + 100

    console.log("This is from drawFunctionBasedPlace function")
    //console.log(place_Chosen)
    
    const temp = cleanData.filter(function (d) {
        if(mainCategory_Chosen == 'Drought' && d.mainCategory == 30&&place_Chosen.indexOf(d.place_provin)!=-1) return true
        if(mainCategory_Chosen == 'Flood' && d.mainCategory == 31&&place_Chosen.indexOf(d.place_provin)!=-1) return true
        if(mainCategory_Chosen == 'Pest' && d.mainCategory == 32&&place_Chosen.indexOf(d.place_provin)!=-1) return true
        if(mainCategory_Chosen == 'Crop' && d.mainCategory == 33&&place_Chosen.indexOf(d.place_provin)!=-1) return true
    })


    var count_line_chart = []
    for (var i=0; i < place_Chosen.length; i++){
        count_line_chart.push(place_Chosen[i])
        count_line_chart[i] = []
        for(var j=0; j < startEnd-startChosen; j++){
            count_line_chart[i][j]=0
        }
    }

    temp.map((d)=>{
        var index = place_Chosen.indexOf(d.place_provin)
        if(count_line_chart[index][d.year_lunar_st-startChosen] >= 0)
        count_line_chart[index][d.year_lunar_st-startChosen]++
    })

    //console.log("temp")
    //console.log(temp)

    var maxY = 0
    for (var i =0; i < place_Chosen.length; i++){
        if (d3.max(count_line_chart[i]) > maxY)maxY =d3.max(count_line_chart[i])
    }
    //console.log(maxY)
    

    var line_chart_data = []
    for(var i=0; i < place_Chosen.length; i++){
        line_chart_data.push({
            place : place_Chosen[i]
        })
        line_chart_data[i] = []
        for (var j =0; j < startEnd-startChosen; j++){
            var year = startChosen+j
            line_chart_data[i].push({
                year : year,
                count : count_line_chart[i][j]
            })
        }

    }

    sub_Categories_svg.append("rect")
    .attr("x",margin_left_lineChart-30)
    .attr("y",-40)
    .attr('width',width*2)
    .attr('height',height*2)
    .attr("fill", "white")

    var x = d3.scaleTime()
      .domain(d3.extent(line_chart_data[0], function(d) { return d.year; }))
      .range([ 0, width*1.5 ]);
    sub_Categories_svg.append("g")
      .attr("transform", "translate("+margin_left_lineChart+"," + (height+10) + ")")
      .call(d3.axisBottom(x));
    
    var y_line = d3.scaleLinear()
      .domain([0, maxY])
      .range([ height, 0 ]);
    sub_Categories_svg.append("g")
      .attr("transform", "translate("+margin_left_lineChart+"," + 10 + ")")
      .call(d3.axisLeft(y_line));

    
    for(var i=0; i < place_Chosen.length; i++){
        sub_Categories_svg.append("path")
        .datum(line_chart_data[i])
        .attr("fill", "none")
        .attr("stroke",  d3.schemePaired[i])
        .attr("stroke-width", 1.5)
        .attr("transform", "translate("+margin_left_lineChart+"," + 10 + ")")
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) {return y_line(d.count) })
        )
    }
    

    //////////////////SECOND BAR CHART ALSO HERE//////////////////

    var margin_left_barChart = width*3
    
    var count_bar_chart = []
    for (var i=0; i < place_Chosen.length; i++){
        count_bar_chart.push(place_Chosen[i])
        count_bar_chart[i] = []
    }
    temp.map((d)=>{
        var index = place_Chosen.indexOf(d.place_provin)
        if(count_bar_chart[index][d.subCategory] >= 0)
        count_bar_chart[index][d.subCategory]++
        else
        count_bar_chart[index][d.subCategory]=0
    })

    //console.log("count_bar_chart")
    //console.log(count_bar_chart)

    var unique_sub_categories = []

    if(mainCategory_Chosen == 'Drought') unique_sub_categories = [0,1,2,11,21,31,41,51]
    else if (mainCategory_Chosen == 'Flood') unique_sub_categories = [0,1,21,31,41,42,51]
    else if (mainCategory_Chosen == 'Pest') unique_sub_categories = [0,1,2,61]
    else if (mainCategory_Chosen == 'Crop') unique_sub_categories = [0,1,11,21,31,41]
    //console.log(unique_sub_categories)

    var bar_chart_data = []
    var chosen_Place_count = []
    for(var i=0; i< place_Chosen.length; i++){
        bar_chart_data[i] = []
        chosen_Place_count[i]=0
        for (var j=0; j < unique_sub_categories.length; j++){
            var name = 'ERROR'
            var lookFrom 
            if(mainCategory_Chosen == 'Drought') lookFrom = drought_definition 
            else if (mainCategory_Chosen == 'Flood') lookFrom = flood_definition 
            else if (mainCategory_Chosen == 'Pest') lookFrom = pest_definition 
            else if (mainCategory_Chosen == 'Crop') lookFrom = crop_definition 
            lookFrom.map((d)=>{
                if(d.code==unique_sub_categories[j]) name = d.name
            })
            if(count_bar_chart[i][j]==undefined) count_bar_chart[i][j]=0
            chosen_Place_count[i] += count_bar_chart[i][j]
            bar_chart_data[i].push({
                place : place_Chosen[i],
                code_number : unique_sub_categories[j],
                name : name,
                count : count_bar_chart[i][j]
                
            })
        }
    }
    //console.log(chosen_Place_count)

    sub_Categories_svg.append("rect")
    .attr("x",margin_left_barChart)
    .attr("y",0)
    .attr('width',width*1.5)
    .attr('height',height*2)
    .attr("fill", "white")   

    var y_bar = d3.scaleBand()
    .range([height, 0 ])
    .domain(place_Chosen)
    .padding(0.2);

    sub_Categories_svg.append("g")
        .attr("transform", "translate("+margin_left_barChart+"," + 10 + ")")
        .call(d3.axisLeft(y_bar));


    var x_bar = d3.scaleLinear()
        .domain([0, d3.max(chosen_Place_count)])
        .range([ 0,width ]); 
    sub_Categories_svg.append("g")
        .attr("transform", "translate("+margin_left_barChart+"," + (height+10) + ")")
        .call(d3.axisBottom(x_bar))
        .selectAll("text")
        .attr("transform", "translate(0,0)rotate(45)")
        .attr("text-anchor", "start")

    for(var i =0; i < place_Chosen.length; i++){
    
    var barWidth = 0
    bar_chart_data[i].map((d)=>{
        barWidth += d.count
    })
    sub_Categories_svg.selectAll('rectgroup2')
        .data(bar_chart_data[i])
        .enter()
        .append("rect")
        .attr("transform", "translate("+margin_left_barChart+"," + (height+10) + ")")
        .attr("x",0 )
        .attr("y", function(d){console.log(d);return -(height-y_bar(d.place))})
        .attr("width", function(d,k){
            barWidth -= bar_chart_data[i][(unique_sub_categories.length)-1-k]['count']
            return x_bar(barWidth)
        })
        .style("opacity",10)
        .attr("height", y_bar.bandwidth())
        .attr("fill",function(d,k){return d3.schemeSet3[k]})
        .style("stroke","black")
    }

    console.log("drawFunctionBasedPlace function ends")
}












const drought_definition=[{
    code : 0,name : 'Non-Specific'
},{
    code : 1,name : 'Drought'
},{
    code : 2,name : 'Enduring Sunny days'
},{
    code : 11,name : 'Dried water channel'
},{
    code : 21,name : 'Dried tidal water'
},{
    code : 31,name : 'Dried lake/pond'
},{
    code : 41,name : 'Dried well water'
},{
    code : 51,name : 'Dried river/stream water'
}]

const flood_definition=[{
    code : 0,name : 'Non-Specific'
},{
    code : 1,name : 'Flood'
},{
    code : 21,name : 'Tidal flood'
},{
    code : 31,name : 'Lake/pond flood'
},{
    code : 41,name : 'Debris/mud flow, landslides '
},{
    code : 42,name : 'Dragon description related to debris flow'
},{
    code : 51,name : 'River overflow/flood'
}]

const pest_definition=[{
    code : 0,name : 'Non-Specific'
},{
    code : 1,name : 'Locust'
},{
    code : 2,name : 'Other insects'
},{
    code : 61,name : 'Other agro-disease'
}]

const crop_definition=[{
    code : 0,name : 'Non-Specific'
},{
    code : 1,name : 'Uncertain crops'
},{
    code : 11,name : 'Crops'
},{
    code : 21,name : 'Grains'
},{
    code : 31,name : 'Vegetables/fruits'
},{
    code : 41,name : 'Cash crops'
}]