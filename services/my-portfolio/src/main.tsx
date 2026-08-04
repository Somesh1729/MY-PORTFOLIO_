import { createRoot } from 'react-dom/client';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import App from './App';
import './index.css';

// 👇 Add this import
import { setBaseUrl } from '@workspace/api-client-react';

// 👇 Add this line
setBaseUrl(import.meta.env.VITE_API_URL);

createRoot(document.getElementById('root')!).render(<App />);