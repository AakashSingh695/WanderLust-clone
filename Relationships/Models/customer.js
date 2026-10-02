const mongoose = require("mongoose");
const {Schema} = mongoose;


const MONGO_URL ="mongodb://127.0.0.1:27017/relationDemo";


main().then(()=>{
    console.log("connected to DB");
}).catch(err=>console.log(err));
async function main(){
   await  mongoose.connect(MONGO_URL);
}


const orderSchema = new Schema({
   item: String,
   price: Number,

});

const customerSchema = new Schema({
    name:String,
    orders: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async ()=>{
//     console.log("PRE MIDOLEWare");
// })

customerSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.orders.length){
      let res= await  Order.deleteMany({_id: {$in:customer.orders}})
      console.log(res);
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

const addCust = async () =>{
    let newCust = new Customer({
        name:"Subham"
    });

    let newOrder = new Order({
        itme: "cake",
        price: 250
    });
     
    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};

const delCust = async () =>{
   let data =  await Customer.findByIdAndDelete("6aa91652781074a81f64ca40");
    console.log(data);
}

// addCust();

// delCust();

const showData = async()=>{
   let data = await Customer.find({});
   let order = await Order.find({});
   console.log(data);
   console.log(order);;
}

showData();

// const addCustomer = async () =>{
//     // let cust1 = new Customer({
//     //     name: "Rahul Kumar",
//     // });

//     // let order1 = await Order.findOne({item: "Chips"});
//     // let order2 = await Order.findOne({item: "Chocolate"});

//     // cust1.orders.push(order1);
//     // cust1.orders.push(order2);

//     // let result = await cust1.save();

//     let result = await Customer.find({}).populate("orders");
//     console.log(result[0]);

// };

// addCustomer();

// const addOrders = async () => {
//     let res =  await Order.insertMany([
//         {item:"somasa", price:15},
//         {item:"Chips", price: 10},
//         {item: "Chocolate", Price:50}
//  ] );
//     console.log(res);
// };

// addOrders();