import rxjs from 'rxjs'
import {run} from '@cycle/rxjs-run'
import {makeDOMDriver, h1, div, input, p} from '@cycle/dom'


const Ob = rxjs.Observable


function main(sources) {

  const sinks = {
    DOM: sources.DOM.Ob.of(false).map(toggled=>{
    	return div([
    		input({attrs: {type: 'checkbox'}}), 
    		'toggle me',
    		p(toggled ? 'On' : 'off')
    		])
    })
  }
  return sinks
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)