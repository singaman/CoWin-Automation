   let btn = document.querySelector("button");
    let myTable = document.querySelector('#table');
        let item = document.querySelector(".item");
        btn.addEventListener("click",async function(){
            while (item.firstChild)   {
                item.removeChild(item.firstChild);
                setTimeout(function() { alert("Wait for Minute"); }, 5000);
            }
            let pin = document.querySelector(".pin").value;
            let age = document.querySelector(".age").value;
            let email = document.querySelector(".email").value;
            const response = await axios.get(`/details/${pin}/${age}/${email}`);
             console.log(response.data);
             console.log(typeof response.data);
             let Patient = response.data;
             let headers = ['Name', 'Address', 'Vaccine','AgeGroup','Dose','Slot','Date'];
    let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        Patient.forEach(emp => {
            let row = document.createElement('tr');
            Object.values(emp).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            })
            table.appendChild(row);
        });
        myTable.appendChild(table);
    })