"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const context_1 = require("./context");
const schema_1 = require("./schema/schema");
exports.server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    introspection: true,
    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    context: context_1.context,
});
const port = process.env.PORT || 5000;
exports.server.listen({ port })
    .then(({ url }) => console.log(`Server running at ${url}`))
    .catch(err => console.log(err.message));
