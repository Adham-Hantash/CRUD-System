//get input status
var CourseName = document.getElementById("CourseName");
var CourseCatigory = document.getElementById("CourseCatigory");
var CoursePrice = document.getElementById("CoursePrice");
var CourseDescription = document.getElementById("CourseDescription");
var CourseCapacity = document.getElementById("CourseCapacity");
var tbody = document.getElementById("tbody");
var Submit = document.getElementById("Submit");
var Clear = document.getElementById("Clear");
var deleteAll = document.getElementById("deleteAll");
var search = document.getElementById("search");
var currentIndex = 0;
var courses;

if(JSON.parse(localStorage.getItem("courses")) == null){
    courses=[];
}

else{
    courses=JSON.parse(localStorage.getItem("courses"));
    readData();
}

Submit.onclick = function(event){
    event.preventDefault();
    if(Submit.value == "Submit")
    addCourse();
    else
    updateCourse(currentIndex);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    printData();
    clearData()
    readData();
}

//create course
function addCourse(){
    var course = {
        CourseName:CourseName.value,
        CourseCatigory:CourseCatigory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value
    };
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
}

function printData(){
    console.log(courses);
}

//clear data
function clearData(){
    CourseName.value="";
    CourseCatigory.value="";
    CoursePrice.value="";
    CourseDescription.value="";
    CourseCapacity.value="";
}

//read data
function readData() {
    var data="";
    for(var i=0 ; i<courses.length ; i++)
data+=`
<tr>
    <td>${i+1}</td>
    <td>${courses[i].CourseName}</td>
    <td>${courses[i].CourseCatigory}</td>
    <td>${courses[i].CoursePrice}</td>
    <td>${courses[i].CourseDescription}</td>
    <td>${courses[i].CourseCapacity}</td>
    <td> <button class="btn btn-info" onclick="getCourse(${i})">Update</button> </td> 
    <td> <button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button> </td>
</tr>
`
tbody.innerHTML = data;
}

//delete course
function deleteCourse(x){

Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        console.log(x);
        courses.splice(x,1);
        localStorage.setItem("courses",JSON.stringify(courses));
        readData();
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

deleteAll.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",JSON.stringify(courses));
            readData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}

//search
search.onkeyup = function(){
    var data="";
    for(var i=0 ; i<courses.length ; i++){
    if(courses[i].CourseName.toLowerCase().includes(search.value.toLowerCase())){
data+=`
<tr>
    <td>${i+1}</td>
    <td>${courses[i].CourseName}</td>
    <td>${courses[i].CourseCatigory}</td>
    <td>${courses[i].CoursePrice}</td>
    <td>${courses[i].CourseDescription}</td>
    <td>${courses[i].CourseCapacity}</td>
    <td> <button class="btn btn-info" onclick="getCourse(${i})">Update</button> </td> 
    <td> <button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button> </td>
</tr>
`
tbody.innerHTML = data;
    }
    }
}


//update

function getCourse(index){
var selCourse = courses[index];
CourseName.value=selCourse.CourseName;
CourseCatigory.value=selCourse.CourseCatigory;
CoursePrice.value=selCourse.CoursePrice;
CourseDescription.value=selCourse.CourseDescription;
CourseCapacity.value=selCourse.CourseCapacity;
Submit.value="Update Course";
}

function updateCourse(i){
    var course = {
        CourseName:CourseName.value,
        CourseCatigory:CourseCatigory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value
    };
    courses[i]=course;
    localStorage.setItem("courses",JSON.stringify(courses));
    Submit.value="Submit";
    readData();
}

