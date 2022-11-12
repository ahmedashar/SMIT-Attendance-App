import {adClassToDb, getClassFromFirebase} from '../firebase.js';

window.createClass = async function(){
    var classStart = document.getElementById('classStart').value;
    var classEnd = document.getElementById('classEnd').value;
    var schedule = document.getElementById('schedule').value;
    var teacherName = document.getElementById('teacherName').value;
    var section = document.getElementById('section').value;

    var courseSelect = document.getElementById('courseSelect');
    var courseValue = courseSelect.options[courseSelect.selectedIndex].value;
    var batch = document.getElementById('batch').value;

    try{
        await adClassToDb({classStart,classEnd,schedule,teacherName,section,courseValue,batch})
        alert('successfull')
        
    }catch(e){
        alert(e.message)
    }


}
getClassInfo()

async function getClassInfo(){
  const classInfo = await getClassFromFirebase();
  const tableBody = document.getElementById('tableBody');

//   <tr>
//   <th scope="col">#</th>
//   <th scope="col">Teacher Name</th>
//   <th scope="col">Course</th>
//   <th scope="col">Batch</th>
//   <th scope="col">Section</th>
//   <th scope="col">Schedule</th>
//   <th scope="col">Timing</th>
// </tr>
    console.log(classInfo)
  classInfo.forEach( (item,index)=>{

    // console.log('h')
        tableBody.innerHTML += `
        <tr>
            <th scope='row'>${index+1}</th>
            <td>${item.teacherName}</td>
            <td>${item.courseValue}</td>
            <td>${item.batch}</td>
            <td>${item.section}</td>
            <td>${item.schedule}</td>
            <td>${item.classStart} to ${item.classEnd}</td>
        </tr>
        `
  })
//   for(let item of classInfo){
//     tableContainer.innerHTML += `
//     <tr>
//         <th scope="row">1</th>
//         <td>Mark</td>
//         <td>Otto</td>
//         <td>@mdo</td>
//     </tr>

//     `
// }


  console.log(classInfo)
}
// batch:"8"
// classEnd:"13:34"
// classStart:"14:33"
// courseValue:"web"
// id:"11NTkwNipnuSJCu7SLMs"
// schedule:"Mon"
// section:"A"
// teacherName:"Sir Kashif"