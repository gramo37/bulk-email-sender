// src/components/EmailForm.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api.helper";
import Input from "./ui/Input";

interface EmailData {
  to: string;
  contentData: {
    initial_name: string;
    company_name: string;
    role: string;
    source: string;
  };
}

interface FormValues {
  data: EmailData[];
}

const EmailForm: React.FC = () => {
  const { handleSubmit, reset } = useForm<FormValues>();
  const [emailDataList, setEmailDataList] = useState<EmailData[]>([
    {
      to: "",
      contentData: {
        initial_name: "",
        company_name: "",
        role: "",
        source: "",
      },
    },
  ]);

  const mutation = useMutation(
    (data: FormValues) => {
      return axiosInstance.post("/send-email", data);
    },
    {
      onSuccess: (data) => {
        toast.success("Emails sent successfully!");
        console.log(data);
        reset();
        setEmailDataList([
          {
            to: "",
            contentData: {
              initial_name: "",
              company_name: "",
              role: "",
              source: "",
            },
          },
        ]);
      },
      onError: (error) => {
        toast.error("Failed to send emails.");
        console.error(error);
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = () => {
    mutation.mutate({ data: emailDataList });
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newEmailDataList = [...emailDataList];
    if (field.startsWith("contentData.")) {
      const contentField = field.split(
        "."
      )[1] as keyof EmailData["contentData"];
      newEmailDataList[index].contentData[contentField] = value;
    } else {
      newEmailDataList[index][field as keyof EmailData] = value as any;
      // newEmailDataList[index][field as keyof EmailData] = value;
    }
    setEmailDataList(newEmailDataList);
  };

  const addNewEmailData = () => {
    setEmailDataList([
      ...emailDataList,
      {
        to: "",
        contentData: {
          initial_name: "",
          company_name: "",
          role: "",
          source: "",
        },
      },
    ]);
  };

  const deleteEmailData = (index: number) => {
    const newEmailDataList = emailDataList.filter((_, i) => i !== index);
    setEmailDataList(newEmailDataList);
  };

  return (
    <div className="mx-5 p-6 bg-white rounded-md shadow-md w-full lg:w-[500px]">
      <h1 className="text-2xl font-bold mb-4">Send Emails</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="max-h-[70vh] overflow-auto">
          {emailDataList.map((emailData, index) => (
            <div key={index} className="space-y-2 border-b pb-4">
              <Input
                type="email"
                value={emailData.to}
                onChange={(e) => handleInputChange(index, "to", e.target.value)}
                placeholder="Recipient Email"
              />
              <Input
                type="text"
                value={emailData.contentData.initial_name}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "contentData.initial_name",
                    e.target.value
                  )
                }
                placeholder="Initial Name"
              />
              <Input
                type="text"
                value={emailData.contentData.company_name}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "contentData.company_name",
                    e.target.value
                  )
                }
                placeholder="Company Name"
              />
              <Input
                type="text"
                value={emailData.contentData.role}
                onChange={(e) =>
                  handleInputChange(index, "contentData.role", e.target.value)
                }
                placeholder="Role"
              />
              <Input
                type="text"
                value={emailData.contentData.source}
                onChange={(e) =>
                  handleInputChange(index, "contentData.source", e.target.value)
                }
                placeholder="Source"
              />
              <button
                type="button"
                onClick={() => deleteEmailData(index)}
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addNewEmailData}
          className="inline-flex items-center mr-2 px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          + Add More
        </button>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Emails
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
