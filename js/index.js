const operators = ['~', '^', 'v', '-', '<', '>'];

const init = input => {
	if(input != '') {
		document.getElementById('resultado_formula').innerHTML = '';

		const vectorizedForm = vectorizeForm(input);
		let processedFormula = removeWhiteSpaces(vectorizedForm);
		if (hasMoreThanTenUniqueSymbols(processedFormula)) {
			alert('Digite uma fórmula com 10 ou menos variaveis');
		} else {
			for (subForm of getSubForms(processedFormula)) {
				document.getElementById('resultado_formula').innerHTML += '<p class="balao_resultado w3-animate-opacity">'+subForm+'</p>';
			}
		}
	}
	else {
		alert('Digite uma fórmula!');
	}
};

const vectorizeForm = formula => {
	return formula.split("");
};

const removeWhiteSpaces = formula => {
	return formula.filter(element => element != " ");
};

const hasMoreThanTenUniqueSymbols = formula => {
	let symbols = [];
	let NoSymbolsElements = operators.concat(['(', ')'])

	for(element of formula) {
		if (!(NoSymbolsElements.includes(element))) {
			symbols.push(element);
		}
	}

	return symbols.length <= 10 ? false : true
};

const getSubForms = form => {
	let parenthesesIsOpen = false;
	let extraParentheses = 0;
	let parenthesesStart = 0;
	let parenthesesEnd = 0;
	let subForms = []

	const formLenght = form.length
	for (let index = 0; index < formLenght; index ++) {
		const element = form[index]

		if (!parenthesesIsOpen) {
			
			if (!operators.includes(element)) {
				if (element == "(") {
					parenthesesIsOpen = true;
					parenthesesStart = index+1;
				}
				else if (!(element == ")")) {
					subForms.push(element);
				}
			}

		} else {
			if (element == "(") {
				extraParentheses += 1;
			}
			else if (element == ")") {
				if (extraParentheses > 0) {
					extraParentheses -= 1;
				} else {
					parenthesesEnd = index
					getSubForms(form.slice(parenthesesStart, parenthesesEnd));
					parenthesesIsOpen = false;
				}
			}
		}
	}

	subForms.push(form.join(""));

	return [...subForms];
};

const clean = () => {
	document.getElementById('resultado_formula').innerHTML = '';
	document.getElementById('input_formula').value = '';
};
