const Flavor = require("../models/flavor").model;
const Topping = require("../models/topping").model;
const Wafer = require("../models/wafer").model;

exports.icecreams_options_get = async (req, res) => {
  const flavors = await Flavor.find({}).lean();
  const toppings = await Topping.find({}).lean();
  const wafers = await Wafer.find({}).lean();

  const icecreamOptions = {
    flavors,
    toppings,
    wafers,
  };

  res.send({
    success: true,
    data: icecreamOptions,
  });
};




/*


some thing needs to be done.

it takes time.

we need that data to process further

so, we make a fucntion, which will process that data, after previous fucntion sis finished.


and we moe on to other things



function fun1(cb){
    // do something
    cb(err, data)
}

function fun2(err, data, cb){
    if(not error){
        process data
        cb()
    }
}

fun1(fun2)






let data1 = function1 ka response
let data2 = function2(data1)


fucntion1().then(data1=>fucntion2(data1)).catch(error=>{hnadle here})




*/