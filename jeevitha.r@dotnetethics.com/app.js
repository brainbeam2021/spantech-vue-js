const cardStyle = document.getElementById('card-style');
cardStyle.style = "margin:50px"

const titleStyle = document.getElementById('list-title-style');
titleStyle.style = "color: black; text-align: center; font-weight: bold; padding: 10px; font-size:25px;"

const add = document.getElementById('add').addEventListener('click', addAnimals)
const clr = document.getElementById('clear').addEventListener('click', clearAnimals);
const fetching = document.getElementById('fetch').addEventListener('click', fetchAnimals);

const filterrr = document.getElementById('filter').addEventListener('click', filterAnimals);
const animal = document.getElementById('animal-name');
const animalNames = document.getElementById('animalList');
const lst = document.getElementById('animalList').addEventListener('click', delAnimal);
const filterName = document.getElementById('filter-animal-name');

function addAnimals(e) {
    if (animal.value === '') {
        alert('Enter Animal')
        e.preventDefault();
    }
    else {

        const outerdiv = document.createElement('div');
        outerdiv.classList.add('row');


        const div1 = document.createElement('div');
        div1.innerHTML = '<img src="img/Tiger.jpeg" class="circle" height="50px" width="50px;">';
        outerdiv.appendChild(div1).className = 'col s4'

        const div2 = document.createElement('div');
        div2.style = "text-align:center;padding-top:15px;"
        div2.innerHTML = '<span>' + animal.value + '</span>';
        outerdiv.appendChild(div2).className = 'col s4 animal-listnames'

        const div3 = document.createElement('div');
        div3.style = "text-align:right;padding-top:15px;"
        const a = document.createElement('a');
        a.style = "cursor:pointer";
        a.innerHTML = '<i class="fa fa-trash"></i>';
        div3.appendChild(a).className = "delete"
        outerdiv.appendChild(div3).className = 'col s4 del'

        animalNames.appendChild(outerdiv);
        animal.value = '';
        e.preventDefault();
    }

}

function clearAnimals(e) {
    animalNames.innerHTML = ''
    e.preventDefault();
}

function fetchAnimals(e) {
    code();
    e.preventDefault()
}

function filterAnimals(e) {
    if (filterName.value === '') {
        alert('Enter Animal')

    }
    else {
        const txt = filterName.value.toLowerCase();
        const animalCollection = document.querySelectorAll('.animal-listnames');
        animalCollection.forEach( ele => {
            const item = ele.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(txt) != -1) {
                ele.parentElement.style.display='block';
            }
            else {
                ele.parentElement.style.display='none';
            }
        })
    }
    e.preventDefault();
}

function delAnimal(e) {
    debugger
    if (e.target.parentElement.parentElement.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
    }
    else if(e.target.classList.contains('noteName')){

        e.target.parentElement.lastChild.style.display='block';
    }
    e.preventDefault();
}

function code(){
    fetch('http://localhost:3000/elephants')
    .then(res =>res.json())
    .then(data=> {
        data.forEach(elephants =>{
                    const outerdiv = document.createElement('div');
                    outerdiv.classList.add('row');
        
                    const div1 = document.createElement('div');
                    let link=elephants.image;
                    div1.innerHTML = '<img src='+link+' class="circle" height="50px" width="50px;">';
                    outerdiv.appendChild(div1).className = 'col s4'
            
                    const div2 = document.createElement('div');
                    div2.style = "text-align:center;padding-top:15px;"
                    let naming=elephants.name;
                    div2.innerHTML = '<a class="noteName" style="cursor:pointer">' + naming + '</a><p style="display:none;">'+elephants.note+'</p>';
                    outerdiv.appendChild(div2).className = 'col s4 animal-listnames'
            
                    const div3 = document.createElement('div');
                    div3.style = "text-align:right;padding-top:15px;"
                    const a=document.createElement('a');
                    a.style="cursor:pointer";
                    a.innerHTML = '<i class="fa fa-trash"></i>';
                    div3.appendChild(a).className="delete"
                    outerdiv.appendChild(div3).className = 'col s4 del'
            
                    animalNames.appendChild(outerdiv);
                    animal.value = '';
                })
        
    })
}
