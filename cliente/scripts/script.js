const getValues = async() => {
    const url = 'http://localhost:3000/api/getAll/values';
    const resp = await fetch( url);
    const data  = await resp.json();
    return data;
}

const table = document.querySelector('.table-content');

getValues().then(data => {
    data.forEach(value => {
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.textContent = value.fecha;
        tr.appendChild(th1);
        let th2 = document.createElement('th');
        th2.textContent = value.compra;
        tr.appendChild(th2);
        let th3 = document.createElement('th');
        th3.textContent = value.venta;
        tr.appendChild(th3);

        table.appendChild(tr);
    })
});

