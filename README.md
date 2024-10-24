# IMPORTING THE ENVIRONMENT VARIABLES IN VITE

- create the .env variables using -> VITE_VARIABLE_NAME = "value"
- access the variable -> import.meta.env.VITE_VARIABLE_NAME

# ENV VARIABLES IN THIS PROJECT

- VITE_APPWRITE_ENDPOINT
- VITE_APPWRITE_PROJECT_ID

# Features

- the navbar changes its styles when in /new-doc page (implemented using useLocation hook)
- store the currUser data in local storage after login/signup
- users cannot access login/signup page after loggin in

# Notes

## to handle the quill editor changes

- we use onChange prop provided by quill
- more info https://medium.com/@devika.p/unlocking-react-quill-editors-potential-essential-functions-explained-e7fd310c24d7
- inside the onchange, we can pass a function with content param, In my code i have passed an cb func (const handleEditorChanges = (editor)=>{})

## how to use useNavigate in context provider

- we cannot use useNavigate hook in the ContextProvider
- but we need to navigate to home page after the changes are saved in the editor.
- to use navigate() in context provider, we need to pass it as an arg in NewDoc.jsx and we can accept call it in saveNewDoc in contextProvider
