import{getClassFromFirebase} from '../firebase.js'

window.gotoCreateClass= function(){
    window.location = '../classDetail/class.html'
}
window.gotoEnrollStudent= function(){
    window.location = '../studentEnroll/student.html'
}

showAvailableClasses();

async function showAvailableClasses(){
    const allClass = await getClassFromFirebase();
    const card =  document.getElementById('cardContainer');
    console.log(allClass)
    allClass.forEach((item)=>{
        card.innerHTML += `
        <div class='card'>
            <h2 class='className'>${item.courseValue}</h2>
            <p class='teacherName'>${item.teacherName}</p>
            <button onclick="openAttendanceSec('${item.id}')"> Attendance Section </button>
        </div>
        
        `
    })
}
window.openAttendanceSec = function(classID){
    window.location = `../attendancePage/attendence.html?id=${classID}`

}


{/* <div class="card">
<img id="bannerImg" src="../images/graphicDes.jpeg" alt="">
<h2 class="className">Sir kashif</h2>
<p class="teacherName">asdafda</p>
<button onclick="openAttendanceSec()">Attendance Section</button>
</div> */}