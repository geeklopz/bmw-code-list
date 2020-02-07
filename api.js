const search = document.getElementById('search');
const matchList = document.getElementById('card-container');

// json
const searchCodes = async searchText => {
	const res = await fetch('../codes.json');
	const codes = await res.json();

	//console.log(codes);

	//matches
	let matches = codes.filter(code => {
		const regex = new RegExp(`^${searchText}$`);
		return code.codenumber.match(regex);
	});

	if(searchText.length === 0) {
		matches = [];
		matchList.innerHTML = '';
	}

	console.log(matches);

	outputHtml(matches);
};

// show results

const outputHtml = matches => {
	if(matches.length > 0) {
		const html = matches.map(match => `
		<div class="card">
			<div class="code-number">
				<span>CC-ID</span>
				<h3>${match.codenumber}</h3>
			</div>
			<div class="description">
				<span>Description</span>
				<p>${match.description}</p>
			</div>
			<div class="description-pt">
				<span>PT</span>
				<p>${match.translate}</p>
		</div>
		</div>
		`).join('');

		matchList.innerHTML = html;
	}
}

search.addEventListener('input', () => searchCodes(search.value));
