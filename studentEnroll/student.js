import {getClassFromFirebase ,uploadImage, enrollStudentFirebase , getStudentFromDb} from '../firebase.js'

showStudentData();
window.getAvailableClass = async function(){
  const allClass = await getClassFromFirebase()
  console.log(allClass)

   var classSelect = document.getElementById('classSelect');

   allClass.forEach((item)=>{
        classSelect.innerHTML += `
        <option value = '${item.id}'>course: ${item.courseValue} | teacher: ${item.teacherName} | section: ${item.section}  </option>
        `
   })
}

window.enrollStudentInDB = async function(){
    var studentName = document.getElementById('studentName').value;
    var fatherName = document.getElementById('fatherName').value;
    var rollNumber = document.getElementById('rollNumber').value;
    var mobile = document.getElementById('mobile').value;
    var cnic = document.getElementById('cnic').value;
    var studentImg = document.getElementById('studentImg').files[0];

    var courseSelect = document.getElementById('courseSelect');
    var courseValue = courseSelect.options[courseSelect.selectedIndex].value;

    var classSelect = document.getElementById('classSelect');
    var classValue = classSelect.options[classSelect.selectedIndex].value;

    try{
        const imgUrl = await uploadImage(studentImg);

        await enrollStudentFirebase({studentName,fatherName,rollNumber,mobile,cnic,courseValue,classValue,imgUrl})
        alert('successfull')
        // location.href = '../index.html'
    }catch(e){
        alert(e.message)
    }



}

async function showStudentData(){
    const allStudent = await getStudentFromDb();
    let tableBody = document.getElementById('tableBody');

 
    allStudent.forEach((item,index)=>{
        console.log(item)
        tableBody.innerHTML += `  <tr>
        <th scope='row'>${index+1}</th>
        <td>${item.studentName}</td>
        <td>${item.fatherName}</td>
        <td>${item.rollNumber}</td>
        <td>${item.courseValue}</td>
        <td>${item.mobile}</td>
        <td>${item.cnic}</td>
        
    </tr>
    `

    })
}
