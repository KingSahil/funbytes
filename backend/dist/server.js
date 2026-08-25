"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'FunBytes API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use('/api', api_1.apiRouter);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[FunBytes API Error]:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(config_1.config.port, () => {
        console.log(`⚡ FunBytes API Server listening on port ${config_1.config.port}`);
        console.log(`📡 Endpoints available at http://localhost:${config_1.config.port}/api`);
    });
}
exports.default = app;
