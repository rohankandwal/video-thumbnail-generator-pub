const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const ffmpeg = require('ffmpeg-static')
const genThumbnail = require('simple-thumbnail')
const imageToBase64 = require('image-to-base64');
const fs = require('fs');
const path = require('path');
const { RSA_NO_PADDING } = require("constants");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.status(200).send('HOME PAGE' + __dirname);
})

app.post('/makeDir', (req, res)=>{
    fs.mkdirSync(path.join(__dirname, "sex"));
    res.status(200).send("SUCCESS");
})

app.post('/generate/thumbnail', (req, res) => {

    // console.log(path.join(__dirname, "t.jpg"))
    // res.status(200).send("SUCCESSFUL");
 
      genThumbnail(req.body.videoUrl, path.join(__dirname, "t.jpg"), '500x?').then(()=>{
            imageToBase64("t.jpg").then((base64Image)=>{
                res.status(200).send(base64Image)
            }).catch((error)=>{
                res.status(400).send("Could not create base64");
            })
        }).catch((error)=>{
            res.status(400).send(error);
        })
})


app.listen(port, () => {
    console.log("Server listening on port " + port);
});

// genThumbnail('https://files.klapklapapp.com/files/dancecorona.mp4', 
// 'output/t.jpg' , '250x?').then(()=>{
//     console.log("SUCCESSFUL")
   
// }).catch((error)=>{
//     console.log(error)
// })

