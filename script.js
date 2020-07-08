		// $('#valorVenda').maskMoney();
		//
		// function validarCampos(){
		// 	getValores();
		//
		// 	if (valorVenda != "" && numeroParcelas != "" && percentualMdr != "") {
		// 		/*if (numeroParcelas > 12){
		// 			$("#numeroParcelas").addClass("Warning");
		// 		}*/
		// 		console.log(valorVenda.value.lenght);
		// 		console.log(numeroParcelas.value.lenght);
		// 		console.log(percentualMdr.value.lenght);
		//
		// 		var myHeaders = new Headers();
		// 		myHeaders.append("Content-Type", "application/json");
		//
		// 		var raw = JSON.stringify({"amount":valorVenda,"installments":numeroParcelas,"mdr":percentualMdr});
		//
		// 		var requestOptions = {
		// 			method: 'POST',
		// 			headers: myHeaders,
		// 			body: raw,
		// 			redirect: 'follow'
		// 		};
		//
		// 		fetch("https://hash-front-test.herokuapp.com/", requestOptions)
		// 		.then(response => response.text())
		// 		.then(result => console.log(result))
		// 		.catch(error => console.log('error', error));
		// 	}
		//
		// }
		//
		// function getValores(){
		// 	var valorVenda = document.getElementById("valorVenda").value;
		// 	var numeroParcelas = document.getElementById("numeroParcelas").value;
		// 	var percentualMdr = document.getElementById("percentualMdr").value;
		// } test

		$('#valorVenda').maskMoney();

		$(".inputNumber").keyup(function(){

			var valorVenda = document.getElementById("valorVenda").value;
			valorVenda = valorVenda.replace(" ","");
			valorVenda = valorVenda.replace("$","");
			valorVenda = valorVenda.replace("R","");
			valorVenda = valorVenda.replace(",","");
			valorVenda = valorVenda.replace(".","");
			valorVenda = parseInt(valorVenda);

			var numeroParcelas = document.getElementById("numeroParcelas").value;
			numeroParcelas = parseInt(numeroParcelas);

			var percentualMdr = document.getElementById("percentualMdr").value;
			percentualMdr = parseInt(percentualMdr);

			console.log(typeof valorVenda);
			console.log(valorVenda);

			console.log(typeof numeroParcelas);
			console.log(numeroParcelas);

			console.log(typeof percentualMdr);
			console.log(percentualMdr);

			var settings = {
				"url": "https://hash-front-test.herokuapp.com/",
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Content-Type": "application/json"
				},
				"data": JSON.stringify({"amount":valorVenda,"installments":numeroParcelas,"mdr":percentualMdr}),
			};

			$.ajax(settings).done(function (response) {
				const formatter = new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2
				})

				console.log(response);
				var dias = [];
				dias = Object.values(response);
				console.log("aqui:");
				var amanha = dias[0];
				parseInt(amanha);
				amanha = amanha/100;
				document.getElementById("amanha").innerHTML = formatter.format(amanha);
				var quinzeDias = dias[1];
				parseInt(quinzeDias);
				quinzeDias = quinzeDias/100;
				document.getElementById("15d").innerHTML = formatter.format(quinzeDias);
				var trintaDias = dias[2];
				parseInt(trintaDias);
				trintaDias = trintaDias/100;
				document.getElementById("30d").innerHTML = formatter.format(trintaDias);
				var noventaDias = dias[3];
				parseInt(noventaDias);
				noventaDias = noventaDias/100;
				document.getElementById("90d").innerHTML = formatter.format(noventaDias);
			});
		});
