import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
  return(
      <>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </>
  )
}

const Statistics = (props) => {
  
    const sumFeedback = () => {
        return props.statistic.good + props.statistic.neutral+ props.statistic.bad;
      }
 
    const calculateAverage = () => {
      if(sumFeedback() > 0) {
          return ((props.statistic.good*1)+(props.statistic.bad*-1))/sumFeedback();
      } else {
          return 0
      }  
    }
    const calculatePositivePercentange = () => {
        if(sumFeedback() > 0) {
          return (props.statistic.good/sumFeedback())*100;
        } else {
            return 0;
    }
    }
     console.log(sumFeedback())
    if(sumFeedback() > 0) {
    return (
        <div>
        <table>
            <tbody>
              <tr><Display text={"good"} value={props.statistic.good} /></tr>
              <tr><Display text={"neutral"}  value={props.statistic.neutral} /></tr>
              <tr><Display text={"bad"} value={props.statistic.bad} /></tr>
              <tr><Display text={"all"} value={sumFeedback()} /></tr>
              <tr><Display text={"average"} value={calculateAverage()} /></tr>
              <tr><Display text={"positive"} value={calculatePositivePercentange()+' %'} /></tr>
            </tbody>
            </table>
            </div>         
     )
   
    } else {
        return (
          <div>
            <h3>No feedback given</h3>
          </div>
        )
  }
  
 
}

const App = () => {
  // save clicks of each button to own state
  const [clicks, setClicks] = useState({
    good: 0, bad: 0, neutral:0
  })
  const indexGood = () => setClicks({...clicks, good: clicks.good + 1 })
  const indexBad = () => setClicks({...clicks, neutral: clicks.neutral + 1 })
  const indexNeutral = () => setClicks({...clicks, bad: clicks.bad + 1 })

  return (
    <div>
    <div>
      <button onClick={() => indexGood()}>
        Good
      </button>
      <button onClick={() => indexBad()}>
        Neutral
      </button>
      <button onClick={() => indexNeutral()}>
        Bad
      </button>
    </div>
    <div>
      

    <Statistics statistic={{good:clicks.good, neutral:clicks.neutral, bad:clicks.bad }} />
  </div>
  
  </div>
  )
  
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)