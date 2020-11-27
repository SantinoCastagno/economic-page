const getValues = async (currentPage) => {
    try {
        console.log("GETTED VALUES");
        let fromValues = currentPage * limValues; 
        const url = `http://localhost:3000/api/values?limit=${limValues}&from=${fromValues}`;
        const resp = await fetch( url);
        const data  = await resp.json();
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
    }catch(e){
        console.log(e);
    }
}

const updateValues = async(currentPage) => {
    try {
        tr = table.childNodes;
        console.log(tr);
        let fromValues = currentPage * limValues;
        const url = `http://localhost:3000/api/values?limit=${limValues}&from=${fromValues}`;
        const resp = await fetch( url);
        const data  = await resp.json();
        for (i = 0; i < data.historic.length; i++){
            th = tr[i].childNodes;

            //ESTAMOS RE TRABADOS
            th[0].textContent = data.historic[i].fecha; 
            th[1].textContent = data.historic[i].compra; 
            th[2].textContent = data.historic[i].venta; 
        }
    }catch(e){
        console.log(e);
    }
}

const table = document.querySelector('.table-content');
let currentPage = 0;
const limValues = 5;

getValues(currentPage);

const nextPage = () => {
    currentPage = currentPage + 1;
    updateValues(currentPage);
}

