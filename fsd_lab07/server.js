const http = require('http');
const url = require('url');
const rooms = require('./data.json');

// helper to set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow any origin for demo
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');// optional: expose pagination headers or others if needed
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url_received = url.parse(req.url, true);
  const pathname = url_received.pathname;
  const query = url_received.query;

  if (pathname === '/api' || pathname === '/api/rooms' || pathname === '/api/items') {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }

    let results = rooms.slice();
    if (query.city) {
      results = results.filter(r => r.city.toLowerCase() === String(query.city).toLowerCase());
    }
    if (query.roomType) {
      results = results.filter(r => r.roomType.toLowerCase() === String(query.roomType).toLowerCase());
    }
    if (query.hotel) {
      results = results.filter(r => r.hotel.toLowerCase() === String(query.hotel).toLowerCase());
    }
    if (query.available) {
      const want = String(query.available).toLowerCase() === 'true';
      results = results.filter(r => Boolean(r.available) === want);
    }
    if (query.beds) {
      const beds = parseInt(query.beds, 10);
      if (!Number.isNaN(beds)) results = results.filter(r => r.beds === beds);
    }
    if (query.minPrice) {
      const p = parseFloat(query.minPrice);
      if (!Number.isNaN(p)) results = results.filter(r => r.price >= p);
    }
    if (query.maxPrice) {
      const p = parseFloat(query.maxPrice);
      if (!Number.isNaN(p)) results = results.filter(r => r.price <= p);
    }
    if (query.id) {
      const id = parseInt(query.id, 10);
      if (!Number.isNaN(id)) results = results.filter(r => r.id === id);
    }

    if (query.search) {
      const s = String(query.search).toLowerCase();
      results = results.filter(r =>
        r.hotel.toLowerCase().includes(s) ||
        r.city.toLowerCase().includes(s) ||
        r.roomType.toLowerCase().includes(s)
      );
    }

    let total = results.length;
    if (query._page || query._limit) {
      const page = Math.max(1, parseInt(query._page || '1', 10));
      const limit = Math.max(1, parseInt(query._limit || '10', 10));
      const start = (page - 1) * limit;
      results = results.slice(start, start + limit);
      // expose total count header
      res.setHeader('X-Total-Count', String(total));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ data: results, count: results.length }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
