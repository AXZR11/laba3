"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path = require("path");
console.log('Current directory:', __dirname);
console.log('Migrations path:', path.join(__dirname, 'migrations/**/*.{js,ts}'));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '232332321',
    database: 'laba3',
    entities: [path.join(__dirname, '../dist/**/*.entity{.ts,.js}')],
    synchronize: false,
    migrations: [path.join(__dirname, '../dist/migrations/**/*.{js,ts}')],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
//# sourceMappingURL=data-source.js.map