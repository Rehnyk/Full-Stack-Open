sequenceDiagram
    participant browser
    participant server

    Note right of browser: Note is fetched from the form.  And notes are rerendered.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    
    Note right of browser: Request contains new note as JSON data. And Content-Type header set to application/JSON
    server-->>browser: {"message":"note created"}
    deactivate server



    Note right of browser: Browser stays on the page .../spa, and doesn't send any further HTTP requests
