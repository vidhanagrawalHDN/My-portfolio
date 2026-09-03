import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

// Custom plugin to handle file uploads locally
function fileUploadPlugin(): Plugin {
  return {
    name: 'file-upload-api',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (!data.image) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'No image provided' }));
              return;
            }

            const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }

            fs.writeFileSync(path.join(publicDir, 'vidhan-photo.png'), buffer);
            fs.writeFileSync(path.join(publicDir, 'My photo Professional.png'), buffer);

            const distDir = path.resolve(process.cwd(), 'dist');
            if (fs.existsSync(distDir)) {
              fs.writeFileSync(path.join(distDir, 'vidhan-photo.png'), buffer);
              fs.writeFileSync(path.join(distDir, 'My photo Professional.png'), buffer);
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: '/vidhan-photo.png' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      server.middlewares.use('/api/upload-certificate', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { certId, fileData } = data;
            if (!certId || !fileData) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing certId or fileData' }));
              return;
            }

            const certsDir = path.resolve(process.cwd(), 'public', 'certificates');
            if (!fs.existsSync(certsDir)) {
              fs.mkdirSync(certsDir, { recursive: true });
            }

            const cleanBase64 = fileData.replace(/^data:[^;]+;base64,/, '');
            const buffer = Buffer.from(cleanBase64, 'base64');
            const targetName = `${certId}.pdf`;
            fs.writeFileSync(path.join(certsDir, targetName), buffer);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: `/certificates/${targetName}` }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), fileUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
