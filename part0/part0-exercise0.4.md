```mermaid
sequenceDiagram

    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server

    Note right of browser: The browser executes the JS code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hello from Taiwan 🇹🇼", "date": "2024-07-17T15:59:39.423Z" }, ...]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    Note left of user: I put a new note and click save to make the POST request and add my note to the JSON file.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: { "content": "Hola mundo!!", "date": "2024-07-17" }
    deactivate server

    Note right of browser: The browser renders the JSON file with the new note
