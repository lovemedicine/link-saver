async function getIconUrl(url: string): Promise<string> {
  const response = await fetch(
    `https://s2.googleusercontent.com/s2/favicons?domain_url=${encodeURI(url)}`
  );
  console.log(response.url);
  console.log(response.headers);
  return response.url;
}

function faviconUrl(pageUrl: string) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', pageUrl);
  url.searchParams.set('size', '32');
  return url.toString();
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.message === 'getPageInfo') {
    const url = window.location.href;
    const iconUrl = faviconUrl(url);

    sendResponse({
      url,
      title: document.title,
      iconUrl,
    });
  }
});
