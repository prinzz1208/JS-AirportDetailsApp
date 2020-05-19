const searchForm = document.querySelector('#multi-form')
const showAirport = document.querySelector('.showAirport')
const alertFlash = document.querySelector('.alert');

searchForm.addEventListener('submit', (e) => e.preventDefault());
searchForm.querySelector('input').addEventListener('keyup', e => {

    // console.log(e.target.value);
    const searchAP = searchForm.search.value;
    console.log("searchAP",searchAP);
    // initialize the apc library
    var apcm = new apc('multi', {key : 'xxxxxxx', limit: 20});
    
    // handle successful response
    apcm.onSuccess = function (data) {
        alertFlash.classList.replace('alert-danger','alert-success')
        alertFlash.classList.remove('d-none')
        // console.log(data.term.toUpperCase());
        const airports = data['airports']; 
        let count = airports.length;
        alertFlash.innerHTML = `Showing <span class="result">${count}</span> results for ${data.term.toUpperCase()}`
        showAirport.innerHTML = " ";
        console.log(airports);
        airports.forEach( val =>{
            console.log(val.name);
            const HTML = `
            <tr>
            <td>${val.name}</td>
            <td>${val.country.iso}</td>
            <td>${val.state.type}</td>
            <td>${val.city}</td>
            <td>${val.state.name}</td>
            <td>${val.country.name}</td>
            </tr>
        `
        showAirport.innerHTML += HTML;           
        })
    };
    
    // handle response error
    apcm.onError = function (data) {
        alertFlash.textContent = data.message;
        alertFlash.classList.replace('alert-success','alert-danger');
        alertFlash.classList.remove('d-none')
       
        // setTimeout(() => {
        //     alertFlash.classList.add('d-none')     
        // },3000)
       
        
        console.log(data);
    };
    
    // makes the request to get the airport data
    if (searchAP.trim() !== ""){
        apcm.request(searchAP);
    }else{
        !alertFlash.classList.contains('d-none') ?   alertFlash.classList.add('d-none') : "" ;         
    }
})
