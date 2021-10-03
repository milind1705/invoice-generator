const express = require('express');
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const port = 3000;
const app = express();

let product = {
    name : "Hair Oil",
    price: 250
};

let client = {
    name: "MIlind Waghmare",
    address: "Nagpur"
};

let current_datetime = new Date()
let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()

app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("info")
});
app.post('/submit', (req, res) => {
    return res.send("data saved successfuly")
})

let data = {
    
    "currency": "INR", //See documentation 'Locales and Currency' for more info
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
    //"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
    "sender": {
        "company": "Infoware",
        "address": "Vardan Complex, Lakudi Talav",
        "zip": "380014",
        "city": "Ahmdabad",
        "country": "India"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
       	"company": client.name,
       	"address": client.address,
       	"zip": "4567 CD",
       	"city": "Clientcity",
       	"country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2021.0001",
    "invoiceDate": formatted_date,
    "products": [
        {
            "quantity": "2",
            "description": product.name,
            "tax": 6,
            "price": product.price
        }
        // {
        //     "quantity": "4",
        //     "description": "Test2",
        //     "tax": 21,
        //     "price": 10.45
        // }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
   
};


const invoicePdf = async ()=>{
    let result =await easyinvoice.createInvoice(data);
fs.writeFileSync(`${Date.now()}.pdf`, result.pdf, "base64")
}

 //invoicePdf();
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})