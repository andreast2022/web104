//Slide Show
let i = 0
let images = [];
images [0] = "lipstickPlantIMG_1681.JPG" 
images [1] = "watermelonPlantIMG_1682.JPG"
images [2] = "begoniaPlantIMG_1684.JPG"
images [3] = "ivyPlantIMG_1683.JPG"
images [4] = "vinePlantIMG_1685.JPG"
images [5] = "rubberPlantIMG_1680.JPG"
images [6] = "snakePlantIMG_1688.JPG"
let length = images.length

let x = document.getElementById("firstImage")

let isSlideShowRunning = false

function slide(){
console.log(isSlideShowRunning)
    if (isSlideShowRunning) {

        //then change all of the images
        console.log (i)
        x.src = images[i];
        if(i < images.length -1){
        
            i++
        } else {
    
            i=0
        }
    }     
}
function autoSlide(){
    setInterval(slide, 2000)
}

function playSlideshow() {

    autoSlide();
    isSlideShowRunning = true
}

function stopSlideShow() {

    isSlideShowRunning = false
}
//Browse my plants
function storeData(){

    let exampleFormControlInput1 = document.getElementById("exampleFormControlInput1").value
    let exampleFormControlSelect1 = document.getElementById("exampleFormControlSelect1").value
    let exampleFormControlSelect2 = document.getElementById("exampleFormControlSelect2").value
    let exampleFormControlTextarea1 = document.getElementById("exampleFormControlTextarea1").value
    // This interval is in minutes
    let newInterval = 1
    if (exampleFormControlSelect1 == "Water: Once per week"){
        newInterval = 1
    } else if (exampleFormControlSelect1 == "Water: Every two weeks"){
        newInterval = 20160
    } else if (exampleFormControlSelect1 == "Water: Every three weeks") {
        newInterval = 30240
    } else if (exampleFormControlSelect1 == "Water: Monthly") {
        newInterval = 40320
    } 
    let fertilizeInterval = 1
    if (exampleFormControlSelect2 == "Feed: Every two weeks") {
        fertilizeInterval = 1.5
    } else if (exampleFormControlSelect2 == "Feed: Monthly") {
        fertilizeInterval = 40320
    } else if (exampleFormControlSelect2 == "Feed: Every 6 months"){
        fertilizeInterval = 241920
    } else if (exampleFormControlSelect2 == "Feed: Yearly") {
        fertilizeInterval = 483840
    }
    //make else if statements for all other html feilds in water
    db.collection("plants").doc().set({
    initialDate: Date.now(),
    wateringInterval: newInterval,
    fertilizeInterval: fertilizeInterval,
    fertilizeDate: Date.now(),
    newPlant: exampleFormControlInput1,
    water: exampleFormControlSelect1,
    fertilizer: exampleFormControlSelect2,
    additional: exampleFormControlTextarea1,
})

.then(function() {
console.log("Document successfully written!");

// Clear form Function

let form = document.getElementById("reset");
  form.reset();



var plants = db.collection('plants');
var businesses = plants.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        let content = document.createElement("LI")
        content.innerText += doc.id + " " + doc.data().firstname

        document.body.appendChild(content)
          // console.log(doc.id, '=>', doc.data());
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
})

.catch(function(error) {
console.error("Error writing document: ", error);
});

  }

//   Alert Functions for water and fertilization schedule

function oneWeek(){

    let today = new Date()
    console.log(today) // this captures the date today

    let addOneWeek = today.getDate() + 7  // this return 25 + 7 

    // this gets the day of the month & adds 7 days to it (one week)

    let alarmTimeObject = new Date()
    
    alarmTime = alarmTimeObject.setDate(32) // takes the variable of today, and it it changes the variable as well

    console.log(alarmTime) // gives time stamp
    console.log(alarmTimeObject)
  
    db.collection("plants").doc().set({
        alarm: alarmTime
    })

    return alarmTime
  
}

function CheckAlarm(){

  let today = new Date() // creates today time to check if alerts are up

  let timestamp = today.getTime() // this gets a timestamp of today

//   var query = citiesRef.where("state", "==", timestamp);

  if(timestamp < alarmTime) { // takes the timestamp of today and compares it with the alarm time stamp previously

    alert("time is up")
  }


}

