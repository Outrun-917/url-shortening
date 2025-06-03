const $urlForm = document.querySelector(".url-form");
const $linkInput = document.querySelector(".link-input");

const $shortLinksWrapper = document.querySelector(".short-links-wrapper");

async function sendUrl(url) {
  const res = await fetch("http://10.59.122.39:3000/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  return res;
}

function createShortLinksCards({ longLink, sentUrl }) {
  const shortLink = sentUrl.result_url;

  const $newShortenedLinkWrapper = document.createElement("div");
  $newShortenedLinkWrapper.classList.add("shortened-link-wrapper");

  const $newShortLinkLong = document.createElement("a");
  $newShortLinkLong.classList.add("short-link-long");
  $newShortLinkLong.setAttribute("href", longLink);
  $newShortLinkLong.textContent = longLink;

  $newShortenedLinkWrapper.appendChild($newShortLinkLong);

  const $newShortLinkShort = document.createElement("a");
  $newShortLinkLong.classList.add("short-link-short");
  $newShortLinkLong.setAttribute("href", shortLink);
  $newShortLinkLong.textContent = shortLink;

  $newShortenedLinkWrapper.appendChild($newShortLinkShort);

  const $newShortLinkCopy = document.createElement("button");
  $newShortLinkCopy.classList.add("short-link-copy");
  $newShortLinkCopy.textContent = "Copy";

  $newShortenedLinkWrapper.appendChild($newShortLinkCopy);

  $shortLinksWrapper.appendChild($newShortenedLinkWrapper);
}

$urlForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = $linkInput.value;
  const res = await sendUrl(url);
  const sentUrl = await res.json();

  if (res.status === 200) {
    createShortLinksCards({ url, sentUrl });
  }
});
