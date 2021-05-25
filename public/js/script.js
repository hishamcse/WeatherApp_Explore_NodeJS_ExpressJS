const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('.msg-1');
const message2 = document.querySelector('.msg-2');

const clearField = () => {
    message2.style.color = 'black';
    message1.textContent = '';
    message2.textContent = '';
};

const fetchData = (location) => {
    fetch(`/weather?address=${location}`).then((response) => {
        if (!response.ok) {
            clearField();
            message2.textContent = response.error().statusText;
            message2.style.color = 'red';
            return;
        }
        return response.json();
    }).then((data) => {
        if (data.error) {
            clearField();
            message2.textContent = data.error;
            message2.style.color = 'red';
            return;
        }

        message1.textContent = `Location: ${data.location}`;
        message2.textContent = `Forecast: ${data.forecast}`;
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearField();
    message1.textContent = 'loading...';

    fetchData(input.value);
});