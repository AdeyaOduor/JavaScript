

    var database = firebase.database();
    var ref = database.ref('ticketRecord');


var ticketsArray = [];

function newTicket(){
    resetNewTicketDiv();
    let outerDiv= document.getElementById("outerDiv");
    outerDiv.className='container';
    let div = document.createElement('div');
    div.className = 'jumbotron';
    div.style ="background-color:NavajoWhite";
    let form = document.createElement('form');
    form.id ='newTicketForm';
    form.innerHTML ='<h1>ADD NEW TICKET</h1>';
    form.scrollIntoView();
    let divTitle = document.createElement('div');
    divTitle.className='form-group';
    let labelTitle = document.createElement('label');
    labelTitle.className = 'form-group';
    labelTitle.innerHTML = 'Title';
    labelTitle.for = 'ticketName';
    let title = document.createElement("input");
    title.type= 'text';
    title.className ='form-control';
    title.id ='ticketName';

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(title);

    let divEmail = document.createElement('div');
    divEmail.className='form-group';
    let labelEmail = document.createElement('label');
    labelEmail.className = 'form-group';
    labelEmail.innerHTML = 'Email';
    labelEmail.for = 'ticketEmail';
    labelEmail.innerHTML = 'Email';
    let email= document.createElement("input");
    email.type= 'email';
    email.className ='form-control';
    email.id = 'ticketEmail';

    divEmail.appendChild(labelEmail);
    divEmail.appendChild(email);


    let divDepartment = document.createElement('div');
    divDepartment.className='form-group';
    let labelDepartment = document.createElement('label');
    labelDepartment.innerHTML = 'Department';
    labelDepartment.for = 'choseDpt';
    let select = document.createElement('select');
    select.id ='choseDpt';
    select.className = 'form-control';
    let option = document.createElement('option');
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    let option3 = document.createElement('option');
    let option4 = document.createElement('option');
    option.value ='Sales';
    option1.value = 'Accounting';
    option3.value = 'External Client';
    option4.value = 'Admin';
    option2.value = 'Treasury';
    option.innerHTML = 'Sales';
    option1.innerHTML = 'Accounting';
    option3.innerHTML = 'External Client';
    option4.innerHTML = 'Admin';
    option2.innerHTML = 'Treasury';
    divDepartment.appendChild(labelDepartment);
    divDepartment.appendChild(select);
    select.appendChild(option);
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);


    let divPriority = document.createElement('div');
    divPriority.className='form-group';
    let labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority';
    labelPriority.for = 'chosePriority';
    let selectPriority = document.createElement('select');
    selectPriority.className = 'form-control';
    selectPriority.id ='chosePriority';
    let optionPriority = document.createElement('option');
    let optionPriority1 = document.createElement('option');
    let optionPriority2 = document.createElement('option');
    let optionPriority3 = document.createElement('option');
    let optionPriority4 = document.createElement('option');
    optionPriority.value = 'Low';
    optionPriority.innerHTML = 'Low';
    optionPriority1.value = 'Medium';
    optionPriority1.innerHTML = 'Medium';
    optionPriority2.value = 'High';
    optionPriority2.innerHTML = 'High';
    optionPriority3.value = 'Critical';
    optionPriority3.innerHTML = 'Critical';
    optionPriority4.value = 'Emergency';
    optionPriority4.innerHTML = 'Emergency';
    divPriority.appendChild(labelPriority);
    divPriority.appendChild(selectPriority);
    selectPriority.appendChild(optionPriority);
    selectPriority.appendChild(optionPriority1);
    selectPriority.appendChild(optionPriority2);
    selectPriority.appendChild(optionPriority3);
    selectPriority.appendChild(optionPriority4);

    let divMessage = document.createElement('div');
    divMessage.className = 'form-group';
    let labelMessage = document.createElement('label');
    labelMessage.className ='col-sm-2 control-label';
    labelMessage.innerHTML ='Problem';
    labelMessage.for = 'inputText';
    let messageText = document.createElement('textarea');
    messageText.className = 'form-control';
    messageText.id = 'inputText';
    messageText.rows = '3';
    messageText.placeholder ='Problem details';
    divMessage.appendChild(labelMessage);
    divMessage.appendChild(messageText);

    let divPhoneContact = document.createElement('div');
    divPhoneContact.className='form-group';
    let labelPhone = document.createElement('label');
    labelPhone.className = 'form-group';
    labelPhone.innerHTML = 'Contact Phone';
    labelPhone.for = 'ticketContact';
    let contactInput = document.createElement("input");
    contactInput.type= 'text';
    contactInput.className ='form-control';
    contactInput.id = 'ticketContact';
    divPhoneContact.appendChild(labelPhone);
    divPhoneContact.appendChild(contactInput);

    let divCustomer = document.createElement('div');
    divCustomer.className ='form-group';
    let labelCustomer = document.createElement('label');
    labelCustomer.className = 'form-group';
    labelCustomer.innerHTML ='Customer Name';
    labelCustomer.for = 'customerName';
    let customerName = document.createElement("input");
    customerName.type= 'text';
    customerName.className = 'form-control';
    customerName.id = 'customerName';
    divCustomer.appendChild(labelCustomer);
    divCustomer.appendChild(customerName);

    let divStatus = document.createElement('div');
    divStatus.id = 'status';

    let divSubmit = document.createElement('div');
    divSubmit.type = 'button';
    divSubmit.className ='btn btn-success';
    divSubmit.innerHTML='SUBMIT';
    divSubmit.addEventListener("click",ticketSubmit);

    outerDiv.appendChild(div);
    div.appendChild(form);
    form.appendChild(divTitle);
    form.appendChild(divEmail);
    form.appendChild(divDepartment);
    form.appendChild(divPriority);
    form.appendChild(divMessage);
    form.appendChild(divPhoneContact);
    form.appendChild(divCustomer);
    form.appendChild(divSubmit);
    form.appendChild(divStatus);
    document.body.appendChild(outerDiv);
}

function generateTicketNumber(){
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let nums = "0123456789";
    let string_length = 3;
    let number_length = 2;
    let randomstring = '';
    let randomnumber = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);

    }
    for (let i=0; i<number_length; i++) {
        let r = Math.floor(Math.random() * nums.length);
        randomnumber += nums.substring(r,r+1);

    }
        return  (randomstring + randomnumber);

}
function randomTableColor(){
    let x = Math.floor(Math.random()*5);
     let colors = ["table-primary","table-success","table-danger","table-info","table-warning","table-light"];
              return colors[x];

}

function ticketSummary(ticketNumber,ticketTitle,ticketDepartment,ticketPriority,ticketCustomerName){

    let table = document.getElementById("ticketTableBody");
    let row = table.insertRow();
    row.className = randomTableColor();
    let ticketNumberCell = row.insertCell(0);
    let ticketTitleCell = row.insertCell(1);
    let ticketDepartmentCell = row.insertCell(2);
    let ticketPriorityCell = row.insertCell(3);
    let ticketCustomerCell = row.insertCell(4);
    let ticketAction = row.insertCell(5);

    ticketNumberCell.innerHTML = ticketNumber;
    ticketTitleCell.innerHTML = ticketTitle;
    ticketDepartmentCell.innerHTML = ticketDepartment;
    ticketPriorityCell.innerHTML = ticketPriority;
    ticketCustomerCell.innerHTML = ticketCustomerName;
    ticketAction.innerHTML= '<button class="btn-info">View Details</button>';
}
function ticketSubmit(){

    let ticketNumber = generateTicketNumber();
    let ticketTitle = document.getElementById("ticketName").value;
    let ticketEmail = document.getElementById("ticketEmail").value;
    let ticketDepartment = document.getElementById("choseDpt").value;
    let ticketPriority = document.getElementById("chosePriority").value;
    let ticketProblemDetails = document.getElementById("inputText").value;
    let ticketPhoneNo = document.getElementById("ticketContact").value;
    let ticketCustomerName = document.getElementById("customerName").value;

    let ticketDetails ={

        ticketNumber:ticketNumber,
        title : ticketTitle,
        email :ticketEmail,
        department :ticketDepartment,
        priority :ticketPriority,
        details :ticketProblemDetails,
        phone : ticketPhoneNo,
        customerName :ticketCustomerName
    };

    //ticketsArray.push(ticketDetails);
       ref.push(ticketDetails);

    //localStorage.ticketRecord = JSON.stringify(ticketsArray);

    ticketSummary(ticketNumber,ticketTitle,ticketDepartment,ticketPriority,ticketCustomerName);
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "red";
    newOuterDiv.innerHTML = "<h1>Submitted!!</h1>"


    document.getElementById('newTicketForm').reset();
}

function resetNewTicketDiv(){

    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "";
    newOuterDiv.innerHTML = "";

}

function init(){

    ref.once('value',function(snapshot){

        snapshot.forEach(function (item){
           let ticketRecord = (JSON.stringify(item.val()));
           let records = JSON.parse(ticketRecord);
          ticketsArray.push(records);
            ticketSummary(item.val().ticketNumber, item.val().title, item.val().department, item.val().priority, item.val().customerName);
        })

    });
}

function loadSummary(){
    for (let i = 0; i < ticketsArray.length; i++) {
        ticketSummary(ticketsArray[i].ticketNumber, ticketsArray[i].title, ticketsArray[i].department, ticketsArray[i].priority, ticketsArray[i].customerName);
    }
}


function summaryTicket(){

    loadTicketSummary();

    for (let i = 0; i < ticketsArray.length; i++){
        ticketSummary(ticketsArray[i].ticketNumber, ticketsArray[i].title, ticketsArray[i].department, ticketsArray[i].priority, ticketsArray[i].customerName);
    }
}






// get the table element
var $table = document.getElementById("ticketTable"),
// number of rows per page
    $n = 10,
// number of rows of the table
    $rowCount = $table.rows.length,
// get the first cell's tag name (in the first row)
    $firstRow = $table.rows[0].firstElementChild.tagName,
// boolean var to check if table has a head row
    $hasHead = ($firstRow === "TH"),
// an array to hold each row
    $tr = [],
// loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
    $i,$ii,$j = ($hasHead)?1:0,
// holds the first row if it has a (<TH>) & nothing if (<TD>)
    $th = ($hasHead?$table.rows[(0)].outerHTML:"");
// count the number of pages
var $pageCount = Math.ceil($rowCount / $n);
// if we had one page only, then we have nothing to do ..
if ($pageCount > 1) {
    // assign each row outHTML (tag name & innerHTML) to the array
    for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
        $tr[$ii] = $table.rows[$i].outerHTML;
    // create a div block to hold the buttons
    $table.insertAdjacentHTML("afterend","<div id='buttons'></div>");
    // the first sort, default page is the first one
    sort(1);
}

// ($p) is the selected page number. it will be generated when a user clicks a button
function sort($p) {
    /* create ($rows) a variable to hold the group of rows
    ** to be displayed on the selected page,
   ($s) the start point .. the first row in each page, Do The Math **/

    var $rows = $th,$s = (($n * $p)-$n);
    for ($i = $s; $i < ($s+$n) && $i < $tr.length; $i++)
        $rows += $tr[$i];

    // now the table has a processed group of rows ..
    $table.innerHTML = $rows;
    // create the pagination buttons
    document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
    // CSS Stuff
    document.getElementById("id"+$p).setAttribute("class","active");
}



($pCount) : number of pages,($cur) : current page, the selected one ..
function pageButtons($pCount,$cur) {
    /** this variables will disable the "Prev" button on 1st page
       and "next" button on the last one */
    var	$prevDis = ($cur == 1)?"disabled":"",
       $nextDis = ($cur == $pCount)?"disabled":"",
        /* this ($buttons) will hold every single button needed
        ** it will creates each button and sets the onclick attribute
        to the "sort" function with a special ($p) number..**/

        $buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort("+($cur - 1)+")' "+$prevDis+">";
    for ($i=1; $i<=$pCount;$i++)
        $buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+")'>";
    $buttons += "<input type='button' value='Next &gt;&gt;' onclick='sort("+($cur + 1)+")' "+$nextDis+">";
    return $buttons;
}
