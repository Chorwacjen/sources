function searchResults(html) {

    const results = [];
    const baseUrl = "https://www.animeworld.so/";

    const filmListRegex = /<div class='item'>([\s\S]*?)<div class='inner'><\/div><\/div>/g;
    const items = html.match(filmListRegex);

    for (const item of items) {
        const titleMatch = itemHtml.match(/<a href='[^']+' class='name'>([^<]+)<\/a>/);
        const hrefMatch = itemHtml.match(/<a href='([^']+)'/);
        const imgMatch = itemHtml.match(/<img loading='[^']+' src='([^']+)' alt='([^']+)'>/);

        if (titleMatch && hrefMatch && imgMatch) {
            const title = titleMatch[1];
            const href = hrefMatch[1];
            const imageUrl = imgMatch[1];

            const fullHref = `https://www.animeworld.so/${href}`;
            const fullImageUrl = `${imageUrl}`;

            results.push({
                title: title.trim(),
                image: fullImageUrl.trim(),
                href: fullHref.trim()
            });
        
        }

    return results;
}

function extractDetails(html) {

    const details = [];

    const descriptionMatch = html.match(/<div class='short'>([^<]+)<\/div>/) ;
    let description = descriptionMatch ? descriptionMatch[1] : '';

    const aliasesMatch = html.match(/<div class='title'>([^<]+)<\/div>/) ;
    let aliases = aliasesMatch ? aliasesMatch[1] : '';

    const airdateMatch = html.match(/<dt>.*?<\/dt><dd>.*?Data di Uscita:(.*?)<\/dd>/g) ;
    let airdate = airdateMatch ? airdateMatch[1] : '';

    if (description && airdate) {
            details.push({
                description: description,
                aliases: aliases || 'N/A',
                airdate: airdate
        });
    }
     
    return details;
}

function extractEpisodes(html) {

    const episodes = [];
    const baseUrl = 'https://www.animeworld.so';
    
    const episodeLinks = html.match(/<a class='([^"]+)'[^>]*href='([^"]+)'[\s\S]*?<div class='centerv'>(\d+)<\/a>/g); ;

    if (!episodeLinks) {
        return episodes;
    }
 
    episodeLinks.forEach(link => {
        const hrefMatch = link.match(/href='([^"]+)'/);
        const numberMatch = link.match(/<a class='([^"]+)'>'([^"]+)'<\/a>/); /* not fucking sure whether or not this works, actually whether any thing of this works lmao */
 
        if (hrefMatch && numberMatch) {
            let href = hrefMatch[1];
            const number = numberMatch[1];

            if (!href.startsWith("https")) {
                href = href.startsWith("/") ? baseUrl + href.slice(1) : baseUrl + href;
            }
 
            episodes.push({
                href: href,
                number: number
            });
        }
    });
    episodes.reverse();
    return episodes;
}
