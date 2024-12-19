export const appendQueryParams = (paramsObj = {}, useArray = true) => {
    const paramsArr = []
    Object.keys(paramsObj).forEach(key => {
        if (Array.isArray(paramsObj[key])) {
            paramsObj[key].forEach(paramsVal => {
                if (useArray) {
                    paramsArr.push(`${key}[]=${paramsVal}`)
                }
                else {
                    paramsArr.push(`${key}=${paramsVal}`)
                }
            })
        } else {
            if (paramsObj[key] !== "" && paramsObj[key] !== null && paramsObj[key] !== undefined) {
                paramsArr.push(`${key}=${paramsObj[key]}`)
            }
        }
    })
    return paramsArr.join("&")
}

export const makeListingQuery = (query) => {
    const params = {
        page: 1,
        pageLimit: 10,
        ...query
    }
    return params
}

export const formatContentIdeas = (content) => {
    const ideas = content?.split(/\n\d+\.\s\*\*Title:\*\*/);
    const socialMediaContent = {};

    ideas?.forEach((idea, index) => {
        if (index === 0) return; // Skip the first empty element

        const [title, content] = idea?.split('* Content:');
        socialMediaContent[`Idea ${index}`] = {
            Title: title?.trim(),
            Content: content?.trim()
        };
    });

    console.log(socialMediaContent)
    return socialMediaContent
}
