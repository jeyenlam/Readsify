# Readsify
Readsify is an AI-powered web app that features an multi-filters book recommender system, a chatbot to converse about book and a digital bookshelf.

## Table of Contents
- [Demo](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#demo)
- [Inspiration](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#inspiration)
- [Feature](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#features)
- [Built with](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#built-with)  
- [Architecture](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#architecture)
- [Task List](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#task-list)
- [License](https://github.com/jeyenlam/Readsify?tab=readme-ov-file#license)

## Demo  

## Inspiration  
Readsify started from a problem I’ve faced as a reader—spending more time searching for the perfect book than actually reading. It’s frustrating when the hunt for something enjoyable takes so much energy that it drains the excitement. That's why I developed Readsify, a web app that helps ease these common reader problems.

## Features
- 🔒 **Authentication and authorization**: Signup/Login/Logout for a personalized and secured book management system   
- ⚙️ **AI-powered book recommendater system**: Featured with a variety of filters to generate the most personalized book recs  
- 📚 **Multi-featured Library**: Consist of a search bar to look up books info and a digital space to manage books   
- 🤖 **Chatbot**: Use GPT-3.5-turbo model to converse with users about book, another way to ask for recommendations    

## Built with  
- [Next.js](https://nextjs.org/)
- [Django](https://docs.djangoproject.com/en/5.1/)
- [Kaggle](https://www.kaggle.com/)
- [Langchain](https://www.langchain.com/)  
- [JWT](https://jwt.io/)
- [SQLite](https://www.sqlite.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Architecture
![Readsify (2)](https://github.com/user-attachments/assets/2a12589e-4200-4db8-97e5-3df82b2f39ca)

## Task List
- [x] Authentication, authorization
- [ ] Chatbot
  - [x] Funtional system implementation
  - [ ] Book fine-tuned model
  - [ ] Intuitive styles + animation
- [ ] Book Recommder System
  - [x] Preprocess dataset
  - [x] Book vector database
  - [x] Core system implementation
  - [ ] Repreprocess dataset with mood classifier to implement mood filter 
  - [ ] Intuitive styles + animation
- [x] Library
  - [x] Google Book API, search bar, book shelf
     
## License  
```
MIT License

Copyright (c) 2025 Yen Lam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
