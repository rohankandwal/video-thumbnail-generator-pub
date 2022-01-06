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

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    ).toString();
  }

app.post('/generate/thumbnail', (req, res) => {

    // console.log(path.join(__dirname, "t.jpg"))
    // res.status(200).send("SUCCESSFUL");
    var videoUrl = req.body.videoUrl;
    console.log('VideoURL = '+videoUrl);
    const randVal = between(1,1000);
      genThumbnail(req.body.videoUrl, path.join(__dirname, randVal+".jpg"), '500x?').then(()=>{
          console.log("Inside genThumbnail");
            imageToBase64(randVal+".jpg").then((base64Image)=>{
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


