const getValues = async () => {
  try {
    console.log("GETTED VALUES");
    const url = `http://localhost:3000/api/values?limit=${limValues}&from=0`;
    const resp = await fetch(url);
    console.log(resp);
    if (resp.status == 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "OK",
        text: "¡Los datos se cargaron correctamente!",
        showConfirmButton: false,
        timer: 1000,
      });
      const data = await resp.json();
      data.forEach((value) => {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.textContent = value.fecha;
        tr.appendChild(th1);
        let th2 = document.createElement("th");
        th2.textContent = value.compra;
        tr.appendChild(th2);
        let th3 = document.createElement("th");
        th3.textContent = value.venta;

        tr.appendChild(th3);
        table.appendChild(tr);
      });
    } else {
      //Show alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Los datos no pudieron obtenerse!",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateValues = async (page) => {
  try {
    tr = table.childNodes;
    let fromValues = page * limValues;
    const url = `http://localhost:3000/api/values?limit=${limValues}&from=${fromValues}`;
    const resp = await fetch(url);
    console.log(resp);
    if (resp.status == 200) {
      const data = await resp.json();
      console.log("TODO OK");
      for (i = 0; i < data.length; i++) {
        th = tr[i].childNodes;

        //ESTAMOS RE TRABADOS
        th[0].textContent = data[i].fecha;
        th[1].textContent = data[i].compra;
        th[2].textContent = data[i].venta;
      }
    } else {
      console.log("ERROR");
      //Show alert
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "¡No hay mas datos historicos!",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//HTML nodes to manipulate
const table = document.querySelector(".table-content");
const section = document.querySelector("section");
//ACA ME QUEDE
const prevbtn = document.createElement("button");
section.appendChild(prevbtn);
console.log(prevbtn);

const limValues = 5;
getValues();
let currentPage = 0;
const nextPage = () => {
  currentPage = currentPage + 1;
  updateValues(currentPage);
};

const prevtPage = () => {
  currentPage = currentPage - 1;
  updateValues(currentPage);
};
