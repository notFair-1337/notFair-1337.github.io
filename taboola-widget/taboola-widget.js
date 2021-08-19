(() => {
    const taboolaWidgets = document.querySelectorAll('.js-taboola-widget');
    // make sure that we have any widgets, if not than stop execution
    if (taboolaWidgets.length === 0) return false;
    const widgetsArr = Array.from(taboolaWidgets);

    // map through all widgets
    widgetsArr.map((item, idx) => {
        const url = item.dataset.api;
        const widgetInstance = widgetsArr[idx];
        const widgetWrapper = document.createElement('div');
        const logo = document.createElement('div');
        logo.classList.add('taboola-logo');
        widgetWrapper.classList.add('taboola-grid');

        logo.innerHTML = `<img src="https://cdn.taboola.com/static/f8/f89e1763-220d-4e09-ba69-9e040548fb7a.svg" alt="taboola">`
        widgetInstance.insertAdjacentElement('beforeend', widgetWrapper);
        widgetInstance.insertAdjacentElement('afterbegin', logo);

        fetchDataRecommendation(url)
            .then(widgetItem => {
            // map through items in list property
            widgetItem.list.map(listItem=> {
                recommendationTemplate(listItem, widgetWrapper)
            })

        })
            .catch(error => {
                widgetInstance.innerHTML = `<p>Sorry! taboola not loaded: ===> (${error})</p>`
        });

    })


    // function for getting json data from server
    async function fetchDataRecommendation(url) {
        const response = await fetch(url);
        return await response.json();
    }

    // function for creating recommendation instance
    function recommendationTemplate (props, parent) {

        const {origin, type, branding, name, thumbnail, url} = props;
        const isSponsored = origin === 'sponsored' ? 'target="_blank"' : '';
        const image = thumbnail[0].url;
        const widgetItem = document.createElement('div');

        //here code that render video or link, depends on type

        // if (type === 'video') {
        //     widgetItem.innerHTML = `
        // <div class="taboola-item">
        // <video controls poster="${url}" class="taboola-item__video">
        //     <source src="${url}" type="video/mp4">
        //     <source src="${url}" type="video/ogg">
        //         Your browser does not support the video tag.
        // </video>
        // </div>
        // `;
        //
        // }else{
        //
        //     widgetItem.innerHTML = `
        // <a href="${url}" ${isSponsored} class="taboola-item">
        //     <span class="taboola-item__image">
        //         <img src="${image}" alt="${branding}" class="taboola-item__image-inside">
        //     </span>
        //     <span class="taboola-item__info">
        //         <span class="taboola-item__title">${name}</span>
        //         <span class="taboola-item__brand">${branding}</span>
        //     </span>
        // </a>
        // `;
        // }

        widgetItem.innerHTML = `
        <a href="${url}" ${isSponsored} class="taboola-item">
            <span class="taboola-item__image">
                <img src="${image}" alt="${branding}" class="taboola-item__image-inside">
            </span>
            <span class="taboola-item__info">
                <span class="taboola-item__title">${name}</span>
                <span class="taboola-item__brand">${branding}</span>
            </span>
        </a>
        `;

        widgetItem.classList.add('taboola-grid__item');
        parent.insertAdjacentElement('beforeend', widgetItem)
    }
})();
