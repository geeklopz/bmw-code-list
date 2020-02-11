const search = document.getElementById('search');
const matchList = document.getElementById('card-container');

matchList.innerHTML = `<h3 style="text-align:center;color:#ccc;">Please enter the error code number!</h3>`;

// json
const searchCodes = async searchText => {
	const res = await fetch('../codes.json');
	const codes = await res.json();

	//console.log(codes);

	//matches
	let matches = codes.filter(code => {
		let clear = searchText.replace(/^(0+)(\d)/g,"$2");
		const regex = new RegExp(`^${clear}$`);
		return code.codenumber.match(regex);
	});

	if(searchText.length === 0) {
		matches = [];
		matchList.innerHTML = `<h3 style="text-align:center;color:#ccc;">Please enter the error code number!</h3>`;
	}

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
