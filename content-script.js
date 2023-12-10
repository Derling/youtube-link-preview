PARAM_START_CHAR = "?"

// youtube constants
YOUTUBE_URL_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g; // https://regexr.com/3dj5t
VIDEO_ID_PARAM = "v";


// 7tv constants
USER_MESSAGE_SPAN_CLASS = "seventv-user-message";

function createIframe(videoId, elementId) {
    // allow is part of the default html from video pages, just copying it over to have similar behavior
    const iframe = document.createElement("iframe");
    iframe.height = 300;
    iframe.width = 300;
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.id = elementId;
    return iframe
}


function getVideoId(url) {
    const urlParams = new URLSearchParams(url.split(PARAM_START_CHAR)[1]);
    return urlParams.get(VIDEO_ID_PARAM);
}

function handleMouseOver(event) {
    const match = event.target.innerHTML.match(YOUTUBE_URL_REGEX);
    if (match === null) {
        return;
    }

    let element = event.fromElement;
    if (element.className !== USER_MESSAGE_SPAN_CLASS) {
        return;
    }

    const videoId = getVideoId(match[0]);
    const elementId = `twitch-yt-${videoId}`;
    if (document.getElementById(elementId) !== null) {
        return;
    }

    element = element.parentElement;
    element.appendChild(createIframe(videoId, elementId));
}

document.addEventListener("mouseover", (e) => handleMouseOver(e));
