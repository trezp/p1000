(function(){
  document.addEventListener("DOMContentLoaded", function(event) {
    var pageHeader  = document.querySelector('.page-header'),
        search      = `<div class="student-search">
                      <input id="student-search" placeholder="Search for students...">
                      </div>`,
        studentArray = document.querySelectorAll('.student-item'),
        searchArray  = [];


    pageHeader.innerHTML = search;

    function peopleSearch(){
      var searchValue, studentName;
      studentArray.forEach(function(student){
        searchValue  = document.getElementById('student-search').value;
        studentName = student.firstElementChild.children[1].textContent;

        student.style.display = "none";

        if(studentName.indexOf(searchValue) > -1){
          console.log("We have a match: " + studentName);
        }
        if(studentName.indexOf(searchValue) > -1){
          student.style.display = "block";
        }
      });
    }

    var searchField  = document.getElementById('student-search');
    searchField.addEventListener('keyup', peopleSearch)
  });
})();
