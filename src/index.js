import rxjs from 'rxjs'
import {run} from '@cycle/rxjs-run'
import {makeDOMDriver, h1, h4, div, input, p, button, a, label} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'


const Ob = rxjs.Observable

////////////////////////////////////////////////////////////////////
// toggle checkbox
////////////////////////////////////////////////////////////////////
// function main(sources) {

//   const sinks = {
//     DOM: sources.DOM.select('input').events('change')
//     	.map(evt=>evt.target.checked)
//     	.startWith(false)
//     	.map(toggled=>{
//     	return div([
//     		input({attrs: {type: 'checkbox'}}), 
//     		'toggle me',
//     		p(toggled ? 'On' : 'off')
//     		])
//     })
//   }


//   return sinks
// }



////////////////////////////////////////////////////////////////////
// get random user
////////////////////////////////////////////////////////////////////
// function main(sources) {
// 	const click$ = sources.DOM.select('.get-random').events('click');
// 	const user$ = sources.HTTP.select('users').switch().map(resp=>resp.body).startWith(null)

// 	const getRandomUser$ = click$.map(()=>{
// 		const randomNum = Math.round(Math.random() * 9) + 1
// 	    return {
// 	      url: 'http://jsonplaceholder.typicode.com/users/' + String(randomNum),
// 	      category: 'users',
// 	      method: 'GET'
// 	    }		
// 	})

// 	const sinks = {
// 		HTTP: getRandomUser$,
// 		DOM: user$.map(user=>div('.users', [
// 			button({props: {className: 'get-random'}}, 'get random user'),
// 			user === null ? null : div('.user-detail', [
// 				h1('.user-name', user.name),
// 				h4('.user-email', user.email),
// 				a('.user-website', {attrs: {href: user.website} }, user.website)
// 				])]))

// 	}

// 	return sinks

// }



////////////////////////////////////////////////////////////////////
// counter
////////////////////////////////////////////////////////////////////


// function main(sources) {
// 	const count$ = Ob.merge(Ob.of(0), sources.DOM.select('#increase').events('click').mapTo(1), sources.DOM.select('#decrease').events('click').mapTo(-1))
// 					.scan((acc, curr) => acc+curr)
// 					.startWith(0)
					

// 	const sinks = {
// 		DOM: count$.map(count=>div([
// 				button('#increase', 'Increase'),
// 				button('#decrease', 'Decrease'),
// 				p(''+count)
// 			]))
// 	}

// 	return sinks
// }

////////////////////////////////////////////////////////////////////
// bmi
////////////////////////////////////////////////////////////////////

function main(sources) {
	const height$ = sources.DOM.select('#height').events('input').map(evt=>evt.target.value).startWith(1.7)
	const weight$ = sources.DOM.select('#weight').events('input').map(evt=>evt.target.value).startwith(70)


	const vnodeHeight$ = height$.map(h=>div([label('Height'),
		  		input('#height', {attrs: {type: 'range', min: 0, max: 3, step: 0.01 }}),
		  		''+h
	  			]))

	const vnodeWeight$ = weight$.map(w=>div([label('Weight'),
		  		input('#weight', {attrs: {type: 'range', min: 0, max: 200}}),
		  		''+w
	  			]))

	const sinks = {
		DOM: Ob.combineLatest(height$, weight$, (height, weight) => weight / Math.pow(height, 2))
	  .startWith({height:0, weight: 0, bmi: 0})
	  .map(bmi => div([
	  		vnodeHeight$,
	  		vnodeWeight$,
	  		p('Your bmi:' + bmi)
	  	]))
	}

	return sinks
}

const drivers = {
	HTTP: makeHTTPDriver(),
	DOM: makeDOMDriver('#app')
}

run(main, drivers)

