import React from 'react'
import CircleGauge from './CircleGauge'

function CircleGaugeChart(){

    return(
        <div className="row centered">
            <div className="col-md-3"><CircleGauge name="Cal" value={toPercent(todayNut.calories/dietLimits.calorie)} color="orange" /></div>
            <div className="col-md-3"><CircleGauge name="Carbs" value={toPercent(todayNut.carbs/dietLimits.carb)} color="green" /></div>
            <div className="col-md-3"><CircleGauge name="Fats" value={toPercent(todayNut.fats/dietLimits.fat)} color="gold" /></div>
            <div className="col-md-3"><CircleGauge name="Protein" value={toPercent(todayNut.protein/dietLimits.protein)} color="indigo" /></div>                                              
        </div>
    )
}

export default CircleGaugeChart