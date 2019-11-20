const wetherForm = document.querySelector('form');
const search = document.querySelector('input');
const parg1 = document.querySelector('#parg1');
const parg2 = document.querySelector('#parg2');

wetherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value;
    parg1.textContent = "Loding...";
    parg2.textContent = "";
    fetch('/weather?address=' + address).then((res) => {
        res.json().then((data) => {
            if (data.Error) {
                parg1.textContent = "Error:";
                parg2.textContent = data.Error;

            } else {
                parg2.textContent = data.tempreature;
                parg1.textContent = data.address;


            }
        });
    });


})