module.exports = {
    corsOptions: {
        origin: '*',
        methods: 'GET, POST, PUT, DELETE',
        allowedHeaders: 'Content-Type, Authorization, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
        credentials: true,
        optionsSuccessStatus: 200 
    },
    database: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'e_ecomercedb',
        waitForConnections: true
    }
};
