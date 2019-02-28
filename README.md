# js-tile-game-engine
Simple tile-based game engine written in JavaScript.


REMARKS:
- When testing locally (with URL starting with "file:///"), the following error might happen:
    "Access to XMLHttpRequest at 'file:///...' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https."\
    => To allow testing, security features have to be disabled in the browser.\
        For Chrome, start the browser with the following parameters:\
        chromium-browser --disable-web-security --user-data-dir="[some directory here]"\
        ! - All the instances of Chrome must be closed before executing the command, else it will not work!
