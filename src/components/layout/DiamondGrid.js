import React from 'react'
import '../layout/diamondGrid.css'
import CircleGauge from '../profile/CircleGauge';
import {toPercent} from '../../helpers'

function DiamondGrid(props){
    const {todayNut, dietLimits} = props
    return(
        <div>
            <div className="img-clip-block">
                <div className="img-clip-row">
                    <div className="img-clip-wrap">
                        <div className="overlay">
                            <div className="overlay-content"><CircleGauge value={toPercent(todayNut.protein/dietLimits.protein)} color="indigo" /></div>
                        </div>   
                    </div>
                </div>

                <div className="img-clip-row">
                        <a href="#" className="img-clip-wrap">
                            <div className="overlay">
                                <div className="overlay-content"><CircleGauge value={toPercent(todayNut.calories/dietLimits.calorie)} color="orange" /></div>
                            </div>
                        </a>

                        <a href="#" className="img-clip-wrap">
                            <div className="overlay">			
                                <div className="overlay-content"><CircleGauge value={toPercent(todayNut.carbs/dietLimits.carb)} color="green" /></div>
                            </div>
                        </a>
                </div>

                <div className="img-clip-row">
                    <a href="#" className="img-clip-wrap polygon-clip-rhombus">
                        <div className="overlay">
                                <div className="overlay-content"><CircleGauge value={toPercent(todayNut.fats/dietLimits.fat)} color="gold" /></div>			
                        </div>
                    </a>
                </div>
            </div>

            <svg className="clip-svg">
                <defs>
                        <clipPath id="clip-diamond-demo" clipPathUnits="objectBoundingBox">
                            <polygon points="0.5 0, 1 0.5, 0.5 1, 0 0.5" />
                        </clipPath>
                </defs>	
            </svg>
        </div>
    )
}

export default DiamondGrid