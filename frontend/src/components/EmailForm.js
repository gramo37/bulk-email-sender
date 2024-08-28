"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/EmailForm.tsx
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const react_query_1 = require("react-query");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const api_helper_1 = __importDefault(require("../api.helper"));
const EmailForm = () => {
    const { handleSubmit, reset } = (0, react_hook_form_1.useForm)();
    const [emailDataList, setEmailDataList] = (0, react_1.useState)([
        {
            to: '',
            subject: '',
            contentData: {
                initial_name: '',
                company_name: '',
                role: '',
                source: '',
            },
        },
    ]);
    const mutation = (0, react_query_1.useMutation)((data) => {
        return api_helper_1.default.post('/send-email', data);
    }, {
        onSuccess: (data) => {
            react_toastify_1.toast.success('Emails sent successfully!');
            console.log(data);
            reset();
            setEmailDataList([
                {
                    to: '',
                    subject: '',
                    contentData: {
                        initial_name: '',
                        company_name: '',
                        role: '',
                        source: '',
                    },
                },
            ]);
        },
        onError: (error) => {
            react_toastify_1.toast.error('Failed to send emails.');
            console.error(error);
        }
    });
    const onSubmit = () => {
        mutation.mutate({ data: emailDataList });
    };
    const handleInputChange = (index, field, value) => {
        const newEmailDataList = [...emailDataList];
        if (field.startsWith('contentData.')) {
            const contentField = field.split('.')[1];
            newEmailDataList[index].contentData[contentField] = value;
        }
        else {
            newEmailDataList[index][field] = value;
            // newEmailDataList[index][field as keyof EmailData] = value;
        }
        setEmailDataList(newEmailDataList);
    };
    const addNewEmailData = () => {
        setEmailDataList([...emailDataList, {
                to: '',
                subject: '',
                contentData: {
                    initial_name: '',
                    company_name: '',
                    role: '',
                    source: '',
                },
            }]);
    };
    const deleteEmailData = (index) => {
        const newEmailDataList = emailDataList.filter((_, i) => i !== index);
        setEmailDataList(newEmailDataList);
    };
    return (<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Send Emails</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {emailDataList.map((emailData, index) => (<div key={index} className="space-y-2 border-b pb-4">
            <input type="email" value={emailData.to} onChange={(e) => handleInputChange(index, 'to', e.target.value)} placeholder="Recipient Email" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <input type="text" value={emailData.subject} onChange={(e) => handleInputChange(index, 'subject', e.target.value)} placeholder="Subject" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <input type="text" value={emailData.contentData.initial_name} onChange={(e) => handleInputChange(index, 'contentData.initial_name', e.target.value)} placeholder="Initial Name" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <input type="text" value={emailData.contentData.company_name} onChange={(e) => handleInputChange(index, 'contentData.company_name', e.target.value)} placeholder="Company Name" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <input type="text" value={emailData.contentData.role} onChange={(e) => handleInputChange(index, 'contentData.role', e.target.value)} placeholder="Role" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <input type="text" value={emailData.contentData.source} onChange={(e) => handleInputChange(index, 'contentData.source', e.target.value)} placeholder="Source" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            <button type="button" onClick={() => deleteEmailData(index)} className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Delete
            </button>
          </div>))}
        <button type="button" onClick={addNewEmailData} className="inline-flex items-center mr-2 px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          + Add More
        </button>
        <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Send Emails
        </button>
      </form>
    </div>);
};
exports.default = EmailForm;
