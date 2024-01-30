import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Manually set MIME type for @react-three/drei module
    mimeTypes: {
      // Adjust the file extension and MIME type as needed
      ".js": ["application/javascript", "application/x-javascript"]
    }
    }
  
})
