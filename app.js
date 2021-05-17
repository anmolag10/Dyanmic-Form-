const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-anmol:anmol@cluster0.jdzqr.mongodb.net/FinalTask", { useNewUrlParser: true });
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const timeSchema = new mongoose.Schema(
    {
        time: Date,
        _id: Number,
    }
)

const subSchema = new mongoose.Schema({
    _id :Number,
    syn : String,
    subDate: Date,
});

const Submission = mongoose.model("Submission",subSchema);

const Time = mongoose.model("Time", timeSchema);


var caseStudy = [{ regno: "0000", title: " Visual Odometry", descrip: "Last year while implementing localisation on the basis of visual odometry,we  faced a lot of issues, due to shakey movements of rover and  had to deal with the loss of frame which in turn resulted in the loss of previous odometry. What do you think how did we overcome this problem? Can you suggest any better approach to visual odometry from realsense D345?", name: "Dishita Midha", id: "1" },
{regno: "0000", title: "Jetson Tx2", descrip: "Nvidia jetson tx2 which we use is extremely important for autonomous task of the rover but it doesn’t work really well with the batteries and keep shutting. Why is important to have jetson on the rover? What do you think is the issue, any plausible mitigation? Suggest an alternative of jetson tx2.", name: "Harsha Vardhan Kumar", id: "2" },
{regno: "0000", title: "Localisation Stack", descrip: "Plan a complete localisation stack for rover 2022, with various localisation parameters available,( use your imagination). You are not allowed to include an IMU but can use its components individually.", name: "Vignesh Iyer", id: "3" },
{ regno: "0000",title: "SICK Lidar", descrip: "The lidar which we use gives us a vary sparse point cloud, what issues o you feel it can cause. Suggest an alternative to use the same point cloud to get lidar odometry. Source a lidar which you feel like will suit your operations the best. Jot down the parameters which you think are important for sourcing a lidar.", name: "Saipranav Vojjala", id: "4" },
{ regno: "0000",title: "Search and Detection", descrip: "You are given a filed of 400 m * 400 m , in that  field you are given  coordinates 10 m away from the actual position of a beacon which is red in color and you can only establish communication with it when 1 m close. What software stack, searching technique and detection algorithm you will choose to reach to that beacon and establish the communication.", name: "Aditya A Iyer", id: "5" },
{ regno: "0000",title: "Wheel Odometry", descrip: "Prepare a plan for implementation on wheel odom  on rover 2022.", name: " Vanisha Agarwal", id: "6" },
]


app.get("/", (req, res) => {

    res.render("index", { caseStudy: caseStudy });
});

app.post("/:id", (req, res) => {
    if (req.params.id != "submission") {
        const id = req.params.id[28];
        if (caseStudy[Number(id) - 1].regno == req.body.regno) {
            Time.findOne({ _id: id}, (err, findid) => {
                if (!err) {
                    if (!findid) {
                        const t = new Time({
                            time: new Date(),
                            _id: id
                        });
                        t.save();
                        res.render("case", { time: new Date(), caseStudy: caseStudy[Number(id) - 1] });
                    }

                    else {
                        res.render("case", { time: findid.time, caseStudy: caseStudy[Number(id) - 1] });

                    }


                }
            });
        }

        else {
            res.render("Unauthorised");
        }
    }

    else {

        var text = req.body.casetext;
        var recivedId = req.body.rid;
        console.log(recivedId);

        Submission.findOne({_id : recivedId},(err,sub)=>{
            if(!err)
            {
                if(!sub)
                {
                    const s = new Submission({
                        _id : Number(recivedId),
                        syn : text
                    });

                    s.save();
                    res.render("sub");


                }

                else
                 {
                     res.render("subf");
                 }
            }
        });
        
        console.log(text);
        console.log(recivedId);

    }


});




app.listen(3000, () => { console.log("Server Started Properly") });