import{getClassFromFirebase ,getStudentFromDb} from '../firebase.js'
showData();
function getClassId() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')
    // document.getElementById('adID').innerHTML = `${id}`;
    return id;
} 

async function showData(){
 const classId = getClassId();
 const allClass = await getClassFromFirebase();
 
 var className = document.getElementById('className')
 var searchRollCon = document.getElementById('searchRollCon');

 allClass.forEach((item)=>{
    if(item.id == classId ){
        console.log(item)
        className.innerText = `Course Name: ${item.courseValue}`;

        searchRollCon.innerHTML += `<div class="searchBar">
        <label for="searchRollNo">Enter Roll No</label> <br>
        <input type="text" id="searchRollNo">
    </div>
    <button onclick="searchStudentRollNo('${item.id}')">Search</button>`
    }
 })

}

window.searchStudentRollNo = async function(classID){
    const allStudent = await getStudentFromDb();

    let facultyStudent = []
    allStudent.forEach((item)=>{
        if(classID == item.classValue){
            facultyStudent.push(item);
        }
    })

   var searchRollNo = document.getElementById('searchRollNo').value;
var idCard = document.getElementById('idCard');
    facultyStudent.forEach((item)=>{
        if(item.rollNumber == searchRollNo){
            idCard.innerHTML = `
            <img src='${item.imgUrl}' width='100px' height='100px'>
            <p> Student Name: ${item.studentName} </p>
            <p> Father Name: ${item.fatherName} </p>
            <p> Course Name: ${item.courseValue} </p>
            <p> Mobile No: ${item.mobile} </p>
            <p> Roll No: ${item.rollNumber} </p>
            `
        }else{
            alert('Not Exist')
        }
    })
   console.log(searchRollNo)

    console.log(facultyStudent)
}

{/* <div class="container text-center mt-5 pt-5">
<div class="searchBar">
    <label for="searchRollNo">Enter Roll No</label> <br>
    <input type="text" id="searchRollNo">
</div>
<button onclick="searchStudentRollNo()">Search</button>
</div> */}