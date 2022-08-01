(function (window, document) {
	'use strict';
	
	const andySearch = (event) => {
		if (!window.searchContent) {
			throw new Error('no search content defined');
		}
		
		const searchParam = event.target.value;
		
		// Construct URLSearchParams object instance from current URL querystring.
		const queryParams = new URLSearchParams(window.location.search);
		
		// Set new or modify existing parameter value.
		queryParams.set('s', searchParam);
		
		// Replace current querystring with the new one.
		history.replaceState(null, null, '?' + queryParams.toString());
		
		const el = document.getElementById('searchResults');
		
		el.innerHTML = '';
		window.searchContent.filter((x) => x.title)
			.filter((x) => {
				const titleArray = x.title.split(' ')
					.map((x) => x.toLowerCase())
					.filter(x => x);
				const searchParamsArray = searchParam.split(' ')
					.map((x) => x.toLowerCase())
					.filter(x => x);
				const searchParamsLength = searchParamsArray.length;
				
				const intersection = searchParamsArray.filter((s) => titleArray.includes(s));
				
				if (intersection.length === searchParamsLength) {
					return x;
				}
			})
			.forEach((result) => {
				const list = document.createElement('li');
				const link = document.createElement('a');
				link.href = result.url;
				link.innerHTML = result.title;
				list.appendChild(link);
				el.appendChild(list);
			});
		
	};
	
	window.addEventListener('load', () => {
		fetch('/index.json')
			.then(async (response) => {
					window.searchContent = await response.json();
					document.getElementById('searchField')
						.addEventListener('input', andySearch);
					
					const params = new Proxy(new URLSearchParams(window.location.search), {
						get: (searchParams, prop) => searchParams.get(prop),
					});
					
					if (params.s) {
						const searchEl = document.getElementById('searchField');
						searchEl.value = params.s;
						
						const event = new Event('input', {
							bubbles: true,
							cancelable: true,
						});
						
						searchEl.dispatchEvent(event);
					}
					
				}
			);
		
		
	});
	
	
})(window, document);
