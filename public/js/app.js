// var inputSearch = document.getElementById("search");


var form = document.querySelector('#search-form');
var input = document.getElementById("search");
var msgOne = document.querySelector('.message-1');
var msgTwo = document.querySelector('.message-2');


// console.log(address)

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        var address = input.value
        msgOne.textContent = 'Loading...'
        msgTwo.textContent = ''
        if (address == '') {
            address = '!'
        }
        fetch('/weather?address=' + address).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = data.error
                } else {
                    // console.log(data.location)
                    // console.log(data.forecast)
                    msgOne.textContent = data.location
                    msgTwo.textContent = data.forecast
                }
            })
        })

    });
}