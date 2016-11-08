(function(){
  var pageHeader   = document.getElementById('page-header'),
      search       = `<div class="student-search">
                    <input id="student-search" placeholder="Search for students...">
                    </div>`,
      studentArray = document.getElementsByClassName('student-item'),
      page         = document.getElementById('page'),
      pageButtons  = '<div class="pagination"><ul id="page-list"></ul></div>';


  pageHeader.innerHTML = search;
  page.innerHTML      += pageButtons;

  function peopleSearch(){
    var searchValue, studentName, searchList = [];

    for(var i = 0; i < studentArray.length; i++){
      studentArray[i].style.display = 'none';
      searchValue  = document.getElementById('student-search').value,
      studentName = studentArray[i].firstElementChild.children[1].textContent;

      if(studentName.indexOf(searchValue) > -1){
        searchList.push(studentArray[i]);
        studentArray[i].style.display = "block";
        studentArray[i].classList.add('searchedItem');
      }
    }
      makePaginationButtons(searchList);
      document.removeEventListener('click', onLoadEventListener);
      document.addEventListener('click', searchEventListener);
      return searchList;
  }

  function paginateOnLoad(){
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

  function paginate(link, list){
    var start = (link * 10) - 10,
        end   = (link * 10) - 1;
        console.log(link)
        console.log(start)
        console.log(end)
    for(var i = 0; i < list.length; i++){
      list[i].style.display = 'none';

      if(i <= end && i >= start){
        console.log('end is' + end + ' and start is ' + start)
        list[i].style.display = 'block';
      }
    }
  }

  function genericEventListener(e, list){
    e.preventDefault();
    if(e.target.tagName.toLowerCase() === "a"){
      var currentList = list,
          link = e.target.innerText;
      paginate(link, list);
    }
  }

  function searchEventListener(e){
    genericEventListener(e, peopleSearch());
  }
  function onLoadEventListener(e){
    genericEventListener(e, studentArray);
  }

  document.addEventListener('keyup', function(e){
    if(e.target.tagName.toLowerCase() === "input"){
      pageButtons.innerHTML = "";
      peopleSearch();
    }
  });

  paginateOnLoad();
  //stuff I need to fix:
    //search pagination only works after button press
})();
