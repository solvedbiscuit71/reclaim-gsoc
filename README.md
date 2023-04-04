# Reclaim in GSOC

Reclaim in GSOC aims to provides a way to prove your contribution to the GSOC without explicitly giving Google the access to your Github. This is achieved using the Questbook's Reclaim protocal along with its companion mobile app [Reclaim wallet](https://docs.reclaimprotocol.org/installing-reclaim-wallet).

# Prerequisites

Clone the repository
```
git clone https://github.com/solvedbiscuit71/reclaim-gsoc.git
cd reclaim-gsoc
```

Install the node packages
```
cd reclaim-frontend/
npm i
```

```
cd ../reclaim-backend/
npm i
```

Add environmental variable using `.env` file

`./reclaim-backend/.env`
```
PORT=3000
FRONTEND_BASE_URL=<your-react-app-url>
CALLBACK_URL=<your-backend-app-url>
MONGODB_URL=<your-mongodb-url>
```

# Getting Started

Once, you have completed all the prerequisites, run the following commands to run the frontend and backend
```
npm run build
npm run preview
```

By default, the react-app will run at port `4173` and the backend server runs at `3000`