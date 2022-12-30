// const url = window.location.href;
let baseUrl = "https://better-pullover-tuna.cyclic.app/";

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
                       
                        <div class="card" style="width: 200px; float:left;margin:5px; box-shadow: 5px 2px #888888; background-color: #aaa; height:550px;">
                        <img src="./sample.png" class="card-img-top" alt="...">
                       <hr> <div class="card-body">
                        <u><h1>${eachProduct.name}</h1></u>
                        <p>${eachProduct.price} </p>
                        <p>${eachProduct.category} </p>
                        <p>${eachProduct.description} </p>
                        <div>
                        <button onclick="deleteProduct('${eachProduct._id}')" class="btn btn-danger"    style="width:100%; border-radius: 40%;float:left;"> Delete </button>
                        <button onclick="editProduct('${eachProduct._id}')" class="btn btn-primary" style="width:100%; border-radius: 40%" >Edit </button>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    `
                    // document.querySelector("#result").innerHTML += response.data.message
                    document.querySelector("#productList").innerHTML +=` 
                    <div class="card" style="width: 0px%; float:left;margin:5px; box-shadow: 5px 2px #888888; background-color: #aaa;">
                    
                  <div> <form  id='form-${eachProduct._id}' style="display:none; margin="100px" onsubmit="updateProduct('${eachProduct._id}'); return false">
                   
                   <u><p> <br/>Name::<input type="text" id='name1' value='${eachProduct.name}' required  /></p></u>
                   
                    <p> <br/>Price::<input type="number" id='price2' value='${eachProduct.price}' required />
                   
                   
                    <p> <br/>Category::<input type="text" id='category3' value='${eachProduct.category}' required /></p>
                    
                  
                    <p> <br/>Discription::<input type="text" id='description4' value='${eachProduct.description}'required  />
                    </p>

                    <div>
                    <hr/><br/><button class="btn btn-success" type="submit" style="float:right">Update</button> </p>
                  </div>
                    
                  </div>

                  </div>
                </div>




                    

                 
              
                    `
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