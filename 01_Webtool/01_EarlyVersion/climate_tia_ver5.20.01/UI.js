import {RefreshUI} from "./index.js";
import { getPlaceNumberByYear ,getDataByYear} from "./preprocess.js";

export const UI_Function=(year_lunar_st,year_lunar_ed)=>{
    let rangeMin = 1;
    const range = document.querySelector(".range-selected");
    const rangeInput = document.querySelectorAll(".range-input input");
    const rangePrice = document.querySelectorAll(".range-price input");

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minRange = parseInt(rangeInput[0].value);
            let maxRange = parseInt(rangeInput[1].value);
            
            year_lunar_st=minRange;
            year_lunar_ed=maxRange;

            if (maxRange - minRange < rangeMin) {     
                if (e.target.className === "min") {
                    rangeInput[0].value = maxRange - rangeMin;        
                } 
                else {
                    rangeInput[1].value = minRange + rangeMin;        
                }
            } 
            else {
                rangePrice[0].value = minRange;
                rangePrice[1].value = maxRange;
                
                //須將起始日期1368-1911 平移到0-543 比例才會正確
                range.style.left =((1368-minRange) / (1368-rangeInput[0].max)) * 100 + "%";
                range.style.right = 100 - ((maxRange-1368) / (rangeInput[1].max-1368)) * 100 + "%";
            }
        });
        //鬆開滑鼠的時候重新繪製圖表
        input.addEventListener("mouseup", (e) => {
        
            RefreshUI(year_lunar_st, year_lunar_ed);
        });
    });

    rangePrice.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = rangePrice[0].value;
            let maxPrice = rangePrice[1].value;
            if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
            }
        });
    });

}


