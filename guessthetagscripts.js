
const tags = ['chicken', 'malaysia', 'football', 'lemons', 'cars', 'singapore', 'bali', 'thailand', 'tired', 'pasta', 'italy', 'pizza', 'sleep', 'party', 'alcohol', 'toilet', 'full moon', 'beach', 'holiday', 'spain', 'europe', 'england', 'sausages'];
const list = document.getElementById('list-data');
const answerList = document.getElementById('choices');
let answer = "";

// console.log(masonry)


function randomColor(){
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function reset(){
	answerList.innerHTML = "";
	answer = tags[Math.floor(Math.random() * tags.length)];
	getTaggedPhotos(answer);

	const choices = [];
	choices.push(answer);

	while(choices.length < 4){
		const rand = tags[Math.floor(Math.random() * tags.length)];
		if(choices.indexOf(rand) == -1){
			choices.push(rand);
		}
	}

	choices.sort(function(){
		return Math.random() * 2 - 1;
	});

	for(let i = 0; i < choices.length; i++){
		const li = document.createElement('li');
		const btn = document.createElement('button');
		li.appendChild(btn)
		btn.innerHTML = choices[i]
		btn.style.backgroundColor = randomColor();
		btn.onclick = function(){
			if(btn.innerHTML == answer){
				window.alert('you are right!')
			}
			else{
				window.alert('sorry! the answer is ' + answer)
			}

			reset();
		}
		answerList.appendChild(li);
	}
}


function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=qdjYJXBjaCt7a80UhF9LYdnElIhFBx1U50jj0eGqFNcVmI2kAs')
		.then(function(response){
			return response.json();
		})
		.then(function(result){

			// clear list
			list.innerHTML = '';

			const items = result.response;
			let masonry;

			// for each item, add image to list
			for(let i = 0; i < items.length; i++){
				const item = items[i];

				if(item.photos != undefined){
					// create li and img to append
					const altSizes = item.photos[0].alt_sizes
					const imgSrc = altSizes[altSizes.length - 3].url;

					const img = document.createElement('img');
					img.src = imgSrc;
					img.onload = function(){
						masonry.layout();
					}

					const li = document.createElement('li');
					li.appendChild(img);
					// li.innerHTML = imgSrc;

					list.appendChild(li);
				}
			}

			// initialize masonry after list has loaded
			masonry = new Masonry(list, {
				itemSelector: 'li',
				gutterWidth: 8,
			});

			// run layout
			masonry.layout();
		})	
}


reset()