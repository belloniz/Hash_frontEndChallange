		// Adicionar máscara no campo de valor da venda
		$('#valorVenda').maskMoney();

		// Função para formatar os valores finais exibidos para o usuário
		const formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2
		})

		// Cada vez que uma tecla for apertada em um dos 3 campos de input pelo usuário, 
		// essa função será executada para consultar a API e mostrar os valores na tela
		$('input').keyup(function(){
			// Declaração de variáveis que irão receber os valores informados pelo usuário
			var valorVenda,numeroParcelas,percentualMdr;

			// Atribuir os valores as variáveis e então formatar para enviarmos para a API
			valorVenda = document.getElementById("valorVenda").value;
			numeroParcelas = document.getElementById("numeroParcelas").value;
			percentualMdr = document.getElementById("percentualMdr").value;

			// Removendo os pontos, vírgulas e outros caracteres que estavam na máscara do campo de valor da venda 
			valorVenda = valorVenda.replace(",","");
			while (valorVenda.includes(".") == true ){
				valorVenda = valorVenda.replace(".","");
			}
			valorVenda = valorVenda.replace(" ","");
			valorVenda = valorVenda.replace("$","");
			valorVenda = valorVenda.replace("R","");
			
			valorVenda = parseFloat(valorVenda);
			numeroParcelas = parseInt(numeroParcelas);
			percentualMdr = parseFloat(percentualMdr);

			// Consultando a API para receber os valores da antecipação
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
				// Criação da variável que irá amazenar os 3 valores informados pela API
				var dias = [];
				dias = Object.values(response);

				// Caso a API retorne um campo nulo, significa que algum campo não foi preenchido,
				// então os valores de antecipação não são atualizados
				if(dias[0] == null || numeroParcelas > 12){
					if (numeroParcelas > 12) {
					}
				// Caso a API não retorne valores nulos, a API retornou campos com valores zerados ou maiores,
				// então as informações dos valores de antecipção são atualizados.
				// Os valores são recebidos em centavos e então formatados antes de serem exibidos na tela
				} else {
					for (var i = 3; i >= 0; i--) {
						dias[i] = parseInt(dias[i]);
						dias[i] = dias[i]/100;
						dias[i] = formatter.format(dias[i]);
						console.log(dias[i]);
					}
				// Os valores são atualizados na tela para o usuário já formatados
					document.getElementById("amanha").innerHTML = dias[0];
					document.getElementById("15d").innerHTML = dias[1];
					document.getElementById("30d").innerHTML = dias[2];
					document.getElementById("90d").innerHTML = dias[3];
				}

				
			});
		});
