import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// Client side rendered app: react (create react app)
// connect to database (Firebase)
// react-loading-skeleton
// tailwind for styling

// folder struct (will all be in src)
  // -> components,
  // -> constants (routes),
  // -> context,
  // -> helpers,
  // -> hooks,
  // -> pages
  // -> lib (firebase will live in here),
  // -> services (firebase functions)
  // -> styles (tailwind's folder (app/tailwind))