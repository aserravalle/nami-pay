let Break = [];
let BreakTableHeader = "<table class='striped'>" +
"<thead><tr><th scope='col'>Account Name</th>" +
"<th scope='col'>Due Date</th>" +
"<th scope='col'>Amount Payable</th></thead>" +
"<tbody>";
let DemoBills = [
	["Sam's Salami", "15/08/2020", 2000],
	["Rick's Rent", "27/08/2020", 5000],
	["Betty's Bread", "9/09/2020", 3000],
	["Eric's Electricity", "13/09/2020", 1000]
];

$(document).ready(function(){
  $('select').formSelect();
});

function onClickFetchData(){
  $("#btn_letsgo").hide();

	sleep(2500);

	let data_output = "";
	for (let col = 0; col < DemoBills.length; col++)
  {
     data_output += "<tr><td>" + DemoBills[col][0] +
      "</td><td>" + DemoBills[col][1] +
			"</td><td>" + DemoBills[col][2] +
			"</td></tr>";
	}

	headers = ["Paid To", "Next Due", "Expected Amount"]
  html_table = "<table class='striped'>" +
  "<thead><tr><th scope='col'>" + headers[0] + "</th>" +
  "<th scope='col'>" + headers[1] + "</th>" +
  "<th scope='col'>" + headers[2] + "</th></thead>" +
  "<tbody>" + data_output + "</tbody>" +
  "</table>";

  $("#table_expenses").html(
    html_table
  );

  $("#table_expenses").show()
  $("#btn_letsgo").show();
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// function onClickPopulateBills(biller){
// 	// Use biller's name to get the date and amount of the next payment
// 	next_bill = DemoBills.Where(row => row[0] == biller).First();
//
// 	// Add these values to the form text
// 	$('input_datedue').value(next_bill[1]);
// 	$('input_amount').value(next_bill[2]);
// }

function onClickAddExpense(){
	Break.push({
		account_name: document.getElementById("input_name_break").value,
		due_date: document.getElementById("input_datedue").value,
		amount_payable: parseInt(document.getElementById("input_amount").value)
	});

	$("#div_paybuttons").show();

	DrawBreak();
}

function DrawBreak(){
	let new_row = "";
	for (var i = 0; i < Break.length; i++) {
		new_row += "<tr><td>" + Break[i]['account_name'] +
		"</td><td>" + Break[i]['due_date'] +
		"</td><td>" + Break[i]['amount_payable'] +
		"</td></tr>";
	}

	$("#table_break").html(
		BreakTableHeader + new_row + "</tbody></table>"
	);
}

function onClickClearBreak(){
	ClearBreak();
	$("#div_paybuttons").hide();
}

function ClearBreak(){
	Break = [];
	DrawBreak();
}

function onClickPayNow(){
	$("#div_tide_loan").hide();
	$("#div_pay_now").show();

	// Add up the amount payable and processing fee
	let amount_payable = 0;
	for (var bill = 0; bill < Break.length; bill++) {
		amount_payable += Break[bill]['amount_payable'];
	}
	let transaction_fee = Math.min(Math.round(0.005*amount_payable), 50);

	// Show payment and direct debit date in columns
	$("#amount_payable1").html(
		'$' + amount_payable.toString()
	);
	$("#transaction_fee").html(
		'$' + transaction_fee.toString()
	);

	$("#div_payment_confirmation").hide();
}

function onClickShowContract(){
	$("#div_pay_now").hide();
	$("#div_tide_loan").show();

	let amount_payable = 0;
	for (var bill = 0; bill < Break.length; bill++) {
		amount_payable += Break[bill]['amount_payable'];
	}
	$("#amount_payable2").html(
		'$' + amount_payable.toString()
	);

	let processing_fee = Math.round(0.07*amount_payable);
	$("#processing_fee").html(
		'$' + processing_fee.toString()
	);

	let fortnightly_installment = Math.round((amount_payable + processing_fee)/4);
	$("#fortnightly_installment").html(
		'$' + fortnightly_installment.toString()
	);

	$("#div_payment_confirmation").hide();
}

function onClickAcceptContract(){
	ClearBreak();

	$("#div_paybuttons").hide();
	$("#div_tide_loan").hide();
	$("#div_pay_now").hide();

	$("#div_payment_confirmation").show();
}

function onClickDeclineContract(){
	$("#div_tide_loan").hide();
	$("#div_pay_now").hide();
	$("#div_payment_confirmation").hide();
}



















//
