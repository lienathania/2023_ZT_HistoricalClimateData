import { allData_preprocessing} from "./preprocess.js"
import {RefreshUI} from "./index.js";

export const barChart=()=>{
    let width;
    let height;
    let pre_data=[];
    let color="#69b3a2";
    const my = (selection) =>{
        const xScale = d3.scaleBand()
        .range([ 0, width ])
        .domain(pre_data.map(d => d.place))
        .padding(0.2);
        /*
        取得array中最大數值的方法
        console.log(Math.max(...pre_data.map(p => p.number)))
        */

        const yScale = d3.scaleLinear()
        .domain([0, Math.max(...pre_data.map(p => p.number))])
        .range([ height, 0]);
        
        selection.selectAll("rect")
        .data(pre_data)
        .join("rect")
        .attr("x", d => xScale(d.place))
        .attr("y", d => yScale(d.number))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.number))
        .attr("fill", color)
        .attr("stroke","#000")

        //x軸 +地名
        selection.selectAll('.x-axis')
        .data([null])
        .join('g')
        .attr('class', 'x-axis')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
        
        //y軸
        selection.selectAll('.y-axis')
        .data([null])
        .join('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));
    }
    
    my.width = function (_) {
        return arguments.length ? ((width = +_), my) : width;
      };
    
    my.height = function (_) {
        return arguments.length ? ((height = +_), my) : height;
    };

    my.data = function (_) {
        return arguments.length ? ((pre_data = _), my) : pre_data;
    };
    
    my.color=function(_){
        return arguments.length ? ((color = _),my) : color;
    }
    //return my 這個function
    return my;
}

