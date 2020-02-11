$('#valorVenda').maskMoney();

$(".inputNumber").keyup(function(){
	var valorVenda = document.getElementById("valorVenda").value;
	var numeroParcelas = document.getElementById("numeroParcelas").value;
	var percentualMdr = document.getElementById("percentualMdr").value;

	if (valorVenda != "" && numeroParcelas != "" && percentualMdr != "") {
		alert(numeroParcelas);
		/*if (numeroParcelas > 12){
			$("#numeroParcelas").addClass("Warning");
		}*/
	}
		
});