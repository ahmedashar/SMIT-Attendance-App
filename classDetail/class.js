import {adClassToDb, getClassFromFirebase, updateClassFromFirebase, deleteClassFromFirebase} from '../firebase.js';

var classStart = document.getElementById('classStart').value;
var classEnd = document.getElementById('classEnd').value;
var schedule = document.getElementById('schedule').value;
var teacherName = document.getElementById('teacherName').value;
var section = document.getElementById('section').value;
var batch = document.getElementById('batch').value;

var courseSelect = document.getElementById('courseSelect');
var courseValue = courseSelect.options[courseSelect.selectedIndex].value;
window.createClass = async function(){


    try{
        await adClassToDb({classStart,classEnd,schedule,teacherName,section,courseValue,batch})
        alert('successfull')
        
    }catch(e){
        alert(e.message)
    }


}
getClassInfo()

let classInfo;

async function getClassInfo(){
  classInfo = await getClassFromFirebase();

  const tableBody = document.getElementById('tableBody');
  console.log(classInfo)
  classInfo.forEach( (item,index)=>{
    console.log(item)
        tableBody.innerHTML += `
        <tr>
            <th scope='row'>${index+1}</th>
            <td>${item.teacherName}</td>
            <td>${item.courseValue}</td>
            <td>${item.batch}</td>
            <td>${item.section}</td>
            <td>${item.schedule}</td>
            <td>${item.classStart} to ${item.classEnd}</td>
            <td> <button onclick="editClass('${item.id}')">Edit</button>
            <button onclick="deleteClass('${item.id}')">Delete</button> </td>
        </tr>
        `
  })

// delete Class
window.deleteClass = async function(classID){
    await deleteClassFromFirebase(classID);
    window.location.reload();
}

//   console.log(classInfo)
}
let classIdForUpdate;
window.editClass = function(classId){
    var classStart = document.getElementById('classStart');
    var classEnd = document.getElementById('classEnd');
    var schedule = document.getElementById('schedule');
    var teacherName = document.getElementById('teacherName');
    var section = document.getElementById('section');
    var batch = document.getElementById('batch');
    
   classInfo.forEach((item)=>{
    if(item.id === classId){
        teacherName.value = item.teacherName;
        section.value = item.section;
        batch.value = item.batch;
        schedule.value = item.schedule;
        classStart.value = item.classStart;
        classEnd.value = item.classEnd;

        classIdForUpdate = item.id;

    }
   }

   )
   document.getElementById('createClassBtn').style.display = 'none'
   document.getElementById('updateClassBtn').style.display = 'inline'
}

// update class
window.updateClass = async function(){ 
    var classStart = document.getElementById('classStart').value;
    var classEnd = document.getElementById('classEnd').value;
    var schedule = document.getElementById('schedule').value;
    var teacherName = document.getElementById('teacherName').value;
    var section = document.getElementById('section').value;
    var batch = document.getElementById('batch').value;

    await updateClassFromFirebase(classIdForUpdate, {classStart,classEnd,schedule,teacherName,section,batch,courseValue} );
    window.location.reload();

}
// await setDoc(doc(db, "cities", "LA"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
//   });
// batch:"8"
// classEnd:"13:34"
// classStart:"14:33"
// courseValue:"web"
// id:"11NTkwNipnuSJCu7SLMs"
// schedule:"Mon"
// section:"A"
// teacherName:"Sir Kashif"
export default classInfo;