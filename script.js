$('#valorVenda').maskMoney();

function validarCampos(){
	getValores();

	if (valorVenda != "" && numeroParcelas != "" && percentualMdr != "") {
		/*if (numeroParcelas > 12){
			$("#numeroParcelas").addClass("Warning");
		}*/
		console.log(valorVenda.value.lenght);
		console.log(numeroParcelas.value.lenght);
		console.log(percentualMdr.value.lenght);

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({"amount":valorVenda,"installments":numeroParcelas,"mdr":percentualMdr});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://hash-front-test.herokuapp.com/", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	}

}

function getValores(){
	var valorVenda = document.getElementById("valorVenda").value;
	var numeroParcelas = document.getElementById("numeroParcelas").value;
	var percentualMdr = document.getElementById("percentualMdr").value;
}