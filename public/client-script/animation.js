const peruTrain = () => {
	const dest = document.getElementById('animation');
    
    //create and add flag
    const flag = document.createElement('img');
    flag.setAttribute('id', 'flag');
    flag.src = '/img/peru_flag.png'
    dest.appendChild(flag);
    
    //mountain
    const mountain = document.createElement('p');
    mountain.setAttribute("id", "mountain");
    mountain.innerText = '🏔️'
    dest.appendChild(mountain);
    
    //train
    const train = document.createElement('h1');
    train.setAttribute("id", "train");
    train.innerText = '🚂🚃🚃🦙🚃🚃🚃';
    dest.appendChild(train);
    
    dest.style.display = 'block';
	train.style.display = 'block';
	train.classList.add('peru-animation');
	setTimeout(function(){ 
        // train.classList.remove('peru-animation');
		// train.style.display = 'none';
        dest.innerText = '';
        dest.style.display = 'none';
	}, 5000);
};
//peruTrain()