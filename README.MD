<p align="center">
  <img 
    alt="Dev talk" 
    src="/github/Logo.png"
    width="20%"
   />
</p>

<p align="center"><strong>The place to talk about technology with people who understand technology</strong></p>

<br />

## **Dependencies to run:**

### **Backend**
- [Python3](https://www.python.org/downloads/)
- [Pip](https://pypi.org/project/pip/)
- or just [Docker and Docker-Compose](https://docs.docker.com/compose/)

### **Mobile**
- [NodeJs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com)

<br />

## **How run:**

### **Backend**

In docker:

```bash
cd backend &&
docker-compose up -d --build postgres_db &&
docker-compose up -d --build backend
```

Normal:
```bash
cd backend && pip install -r requirements.txt && python3 run.py
```

### **Mobile**
```bash
cd mobile && npm i && npm start
```

<br />

<div align="center">

## **Used technologies:**
  
## **How use mobile app:**

<br />
  
Authentication
-------------
  
<p>
  <img 
    alt="Dev talk" 
    src="/github/Screenshot_1.png"
    width="20%"
   />
</p>

**Make authentication with  [Github Oauth service](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)**

<br/>

Chat
------------

<p>
  <img 
    alt="Dev talk" 
    src="/github/Screenshot_2.png"
    width="20%"
   />
</p>

**Talk in real time with other users in "ChatsScreen" using [Socket.IO(WebSocket)](https://socket.io) connection.** 
<br />
**You can send Images and code snippets to make easy to others users help you**
<br />
<br />
**To  send yours code snippets you just need follow this pattern:**
<br />
"
&lt;code&gt; LANGUAGE_NAME CODE &lt;/code&gt;
"

<br />

<p>
  <img 
    alt="Dev talk" 
    src="/github/Screenshot_3.png"
    width="20%"
   />
</p>
  
**You can talk about everything in "Global" or talk about a specific technology in your chat**
 <br />
 **To select chat, open chats screen clicking on chat name in Header and select a chat**
  
</div>
