"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/App.tsx
const react_1 = __importDefault(require("react"));
const EmailForm_1 = __importDefault(require("./components/EmailForm"));
require("./index.css");
const react_query_1 = require("react-query");
const queryClient = new react_query_1.QueryClient();
const App = () => {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <EmailForm_1.default />
      </div>
    </react_query_1.QueryClientProvider>);
};
exports.default = App;
