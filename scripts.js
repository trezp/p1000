
(function(){
  var pageHeader   = document.getElementById('page-header'),
      studentArray = document.getElementsByClassName('student-item'),
      page         = document.getElementById('page'),
      err          = document.createElement('li'),
      pageButtons  = '<div class="pagination"><ul id="page-list"></ul></div>',
      search       = `<div class="student-search">
                    <input id="student-search" placeholder="Search for students...">
                    </div>`;

//put pagination and search on page and create error message
  pageHeader.innerHTML += search;
  page.innerHTML      += pageButtons;
  err.innerHTML = "<span class='err-message'>Oops! There are no matching students.</span>";

  function peopleSearch(){
    var searchValue, studentName, searchList = [];

    searchValue  = document.getElementById('student-search').value;

  /* hides all students, gets name and email from each item; pushes student to new array if match,
  shows students who match search */
    for(var i = 0; i < studentArray.length; i++){
      studentArray[i].style.display = 'none';
      studentName = studentArray[i].firstElementChild.children[1].textContent,
      studentEmail = studentArray[i].firstElementChild.children[2].textContent;

      if(studentName.indexOf(searchValue) > -1){
        searchList.push(studentArray[i]);
      }
    }

// if search is more than three characters and no match, display error
    if(searchValue.length >= 3 && searchList.length === 0){
      page.appendChild(err);
    } else {
      err.remove();
    }

//hides all but first ten matched students
    searchList.forEach(function(student, index){
      if(index < 9){
        student.style.display = "block";
      }
    });

/* sends matched list to pagination function,
adds/removes correct event listener to pagination buttons,
returns list of matched students */
    makePaginationButtons(searchList);
    document.removeEventListener('click', onLoadEventListener);
    document.addEventListener('click', searchEventListener);
    return searchList;
  }

//hides all but first 10 students, sends all students to pagination function
  function firstTenStudentsOnLoad(){
    for(var i = 0; i < studentArray.length; i++){
      if(i > 9){
        studentArray[i].style.display = 'none';
      } else {
        studentArray[i].style.display = 'block';
      }
    }

    makePaginationButtons(studentArray);
    document.removeEventListener('click', searchEventListener);
    document.addEventListener('click', onLoadEventListener);
  }

//clears any previous pagination, student in a list of students and adds pagination buttons
  function makePaginationButtons(list){
    var numToPage  = list.length,
        numPerPage = 10,
        numOfPageButtons = numToPage / numPerPage,
        pageList   = document.querySelector('#page-list');

    pageList.innerHTML = "";

    if (numOfPageButtons > 1){
      for(var i = 0; i < numOfPageButtons; i++){
        pageList.innerHTML +=
        '<li><a class="page-link" href="#">' + (i + 1) + '</a></li>';
      }
    } else {
      pageList.innerHTML = '';
    }
  }

/* takes in an array of students and an int
based on which page button is clicked, shows and hides correct students */
  function paginate(link, list){
    var start = (link * 10) - 10,
        end   = (link * 10) - 1;

    for(var i = 0; i < list.length; i++){
      list[i].style.display = 'none';

      if(i <= end && i >= start){
        list[i].style.display = 'block';
      }
    }
  }

/* event listeners for initial page load and search functionality.
if the clicked item is a link, gets link number and feeds to paginate function */
  function genericEventListener(e, list){
    e.preventDefault();
    if(e.target.tagName.toLowerCase() === "a"){
      link = e.target.innerText;
      paginate(link, list);
    }
  }
//takes in list of matched students returned by search
  function searchEventListener(e){
    genericEventListener(e, peopleSearch());
  }

//takes in full list of students
  function onLoadEventListener(e){
    genericEventListener(e, studentArray);
  }

  document.addEventListener('keyup', function(e){
    if(e.target.tagName.toLowerCase() === "input"){
      pageButtons.innerHTML = "";
      peopleSearch();
    }
  });

  firstTenStudentsOnLoad();
})();
