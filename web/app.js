// const url = window.location.href;
let baseUrl = "http://localhost:5001";

// if (url.split(":")[0] === 'https') {
//     baseUrl = 'https://ill-pink-gorilla-cuff.cyclic.app';
// } else {
//     baseUrl = 'http://localhost:5001';
// }
let post = () => {

    let name = document.querySelector("#name").value
    let price = document.querySelector("#price").value
    let cat = document.querySelector("#cat").value
    let desc = document.querySelector("#desc").value

    axios.post(`${baseUrl}/product`, {
        name: name,
        price: price,
        category: cat,
        description: desc
    })
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            document.querySelector("#result").innerHTML =
                response.data.message

            getAllProducts();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.querySelector("#result").innerHTML =
                response.data.message
        }
        )
}
let getAllProducts = () => {
    axios.get(`${baseUrl}/products`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data.data);
            document.querySelector("#productList").innerHTML = ""

            response?.data?.data.map((eachProduct, index) => {
                document.querySelector("#productList").innerHTML +=
                    `
                    <div id='div-${eachProduct._id}'>
                        <h1>${eachProduct.name} </h1>
                        <p>${eachProduct.price} </p>
                        <p>${eachProduct.category} </p>
                        <p>${eachProduct.description} </p>
                        <button onclick="deleteProduct('${eachProduct._id}')">delete </button>
                        <button onclick="editProduct('${eachProduct._id}')">edit </button>
                       
                    </div>
                   
                    `
                    // document.querySelector("#result").innerHTML += response.data.message
                    document.querySelector("#productList").innerHTML +=` <form  id='form-${eachProduct._id}' style="display:none; margin="100px" onsubmit="updateProduct('${eachProduct._id}'); return false">
                    <br/>Name::<input type="text" size="30"id='name1' value='${eachProduct.name}' required  />
                    <br/>Price::<input type="number" id='price2' value='${eachProduct.price}' required />
                    <br/>Category::<input type="text" id='category3' value='${eachProduct.category}' required />
                    <br/>Discription::<input type="text" id='description4' value='${eachProduct.description}'required  />
                    <br/><button type="submit">Update</button>
                    <br/></form>`
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.querySelector("#result").innerHTML =
                error.data.message
        })
}
let deleteProduct = (id) => {

    axios.delete(`${baseUrl}/product/${id}`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            document.querySelector("#result").innerHTML =
                response.data.message

            getAllProducts();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.querySelector("#result").innerHTML =
                error.data.message
        })


}
let removelist = async () => {

    try {
        let response = await axios.delete(`${baseUrl}/products`)
        let code = prompt("Enter Password ")
        if (code === "Malik") {
            document.querySelector("#result").innerHTML = response.data.message
            setTimeout(() => {
                document.querySelector("#result").innerHTML = ""
            }, 2000);

            document.querySelector("#result").innerHTML = "";
        } else alert("wrong password")
    } catch (error) {
        console.log("error: ", error);
    }

   getAllProducts();
}


let editProduct = async (id) => {

    console.log("edit id: ", id)
    document.querySelector(`#form-${id}`).style.display = "inline"
    document.querySelector(`#div-${id}`).style.display = "none"


}

let updateProduct = async (id) => {
    console.log("update id: ", id)

    let name1 = document.querySelector(`#name1`).value
    let price2= document.querySelector(`#price2`).value
    let category3 = document.querySelector(`#category3`).value
    let description4 = document.querySelector(`#description4`).value

    try {
        let response = await axios.put(`${baseUrl}/product/${id}`,
            {
                name : name1 ,
                price : price2,
                category : category3,
                description : description4 
            })
        
        document.querySelector("#result").innerHTML = response.data.message

        getAllProducts();

    } catch (error) {
        console.log("error: ", error);
    }

}