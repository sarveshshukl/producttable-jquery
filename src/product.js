$(document).ready(function () {

    $("#edit").hide();
    $("#one").hide();
    $("#two").hide();

    // jQuery methods go here...
    let data = [];
    console.log("hello");

    $("#add").click(fun)
    function fun() {
        console.log("infun");

        let id = $("#id").val();
        let name = $("#name").val();
        let price = $("#price").val();
        let qunty = $("#Quantity").val();
        let para = $("#para").html();
        console.log(para);
        console.log(checkData(id, name, price, qunty));
        console.log("id" + checkId(id));


        if (checkData(id, name, price, qunty) && checkId(id)) {
            addValue(id, name, price, qunty);
            $("#one").text("sucess");
            $("#one").show();
            $("#two").hide();
            console.log("doplycll");
            displayTble();
        } else if (checkId(id) == false) {//show error in para
            $("#two").text("invalid id");
            $("#two").show();
            $("#one").hide();
        }
    }

    function checkData(id, name, price, qunty) {//checking data
        console.log("in check data");
        if (id == "") {
            //show error id missing in para 
            $("#two").text("invalid id");
            $("#one").hide();
            $("#two").show();
            return false;
        } else if (name == "") {
            //show error name missing in para
            $("#two").text("invalid name");
            $("#one").hide();
            $("#two").show();
            return false
        } else if (price == "") {
            //show error
            $("#two").text("invalid price");
            $("#one").hide();
            $("#two").show();
            return false
        } else if (qunty == "") {
            //show error
            $("#two").text("invalid quantity");
            $("#one").hide();
            $("#two").show();
            return false
        }
        return true;
    }

    function checkId(id) {// checking id
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            if (obj.id == id) {
                return false;
            }
        }
        return true;
    }

    function addValue(id, name, price, qunty) { //add value in array
        console.log("in adddata")
        let newdata = {
            id: id,
            name: name,
            price: price,
            qunty: qunty
        }
        data.push(newdata);
    }

    function displayTble() {// display table
        $("#one").show();
        console.log("indiply");
        let html = "<table><tr><th>product id</th><th>product name</th><th>product price</th><th>Quantity</th><th>Action</th></tr>";
        for (let i = 0; i < data.length; i++) {
            console.log(i);
            html += "<tr><td>"
                + data[i].id +
                "</td><td>"
                + data[i].name +
                "</td><td>"
                + data[i].price +
                "</td><td>"
                + data[i].qunty +
                "</td><td>" +
                "<a href=" + " #" + " id=\"edit\" data-pid=" + data[i].id + ">  Edit</a><a href=" + " #" + " id=\"delete\"  data-pid=" + data[i].id + ">  delete</a>"
            "</td></tr>"

        }
        // console.log(html);
        // document.getElementById('table').innerHTML = html + "</table>";
        $("#table").html(html + "</table>");
        resetInput();
    }

    function resetInput() {// reset the input field
        $("#id").val("");
        $("#name").val("");
        $("#price").val("");
        $("#para").html("");
        $("#Quantity").val("");
        // console.log(data);
    }
    // console.log(data);

    let selectid;
    $("#table").on("click", "a#edit", function () {  //clicking the edit link
        $("#one").hide();
        $("#two").hide();

        // alert("The paragraph was clicked.");
        let pid = $(this).data('pid');
        selectid = pid;
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            if (obj.id == pid) {

                let id = obj.id;
                let name = obj.name;
                let price = obj.price;
                let qunty = obj.qunty;
                setInputField(id, name, price, qunty);
            }
        }

    });

    //set the input field and show efit button
    function setInputField(id, name, price, qunty) {

        $("#id").val(id);
        $("#name").val(name);
        $("#price").val(price);
        $("#Quantity").val(qunty);
        $("#edit").show();
        $("#add").hide();
    }
    // clicking thi edit botton
    $("#edit").click(function () {

        $("#one").hide();
        $("#two").hide();

        console.log("wdit click");
        let id = $("#id").val();
        let name = $("#name").val();
        let price = $("#price").val();
        let qunty = $("#Quantity").val();
        console.log(id, name, price, qunty);
        console.log(checkData(id, name, price, qunty));
        if (checkData(id, name, price, qunty)) {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                console.log(i);
                if (obj.id == selectid) {
                    console.log("in if");
                    obj.id = id;
                    obj.name = name;
                    obj.price = price;
                    obj.qunty = qunty;
                    console.log("in dis");
                    displayTble();

                    break;
                }
            }
        }
        $("#add").show();
        $("#edit").hide();
        resetInput();
    })


    //clicking delete link
    $("#table").on("click", "a#delete", function () {
        $("#one").hide();
        $("#two").hide();
        console.log("in delete");
        let pid = $(this).data('pid');
        selectid = pid;
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            if (obj.id == pid) {
                data.splice(i, 1);
                break;
            }
        }
        console.log(data);
        displayTble();
    });

});