import { IContentData } from "../validations/mailServiceValidations"

export const template = ({
    company_name,
    role,
    source,
    initial_name
}: IContentData) => {
    return {
        html: `
        <!DOCTYPE html>
            <html>
            <head>
                <title>Hello, World!</title>
                <link rel="stylesheet" href="styles.css" />
            </head>
            <body>
                <p>Hi ${initial_name},</p>
                <p>I hope this email finds you well. I came across your contact information through ${source} and wanted to express my interest in the ${role} at ${company_name}. </p>
                <p>Currently, I am working as a Consultant (Full Stack Developer) at Optanium, where I have gained valuable experience in the field. With 3+ years of experience in HTML, CSS, React, Node.js, Redis, Postgres, MongoDB, TypeScript and Docker, I believe I possess the skills and expertise necessary to excel in this position. </p>
                <p>I have attached my resume for your reference and also shared my portfolio website below. Additionally, I am keen to learn more about the role and how my background aligns with the responsibilities. </p>
                <p>Portfolio Link - https://gramo37.com/me</p>
                <p>Thank you for considering my application. I look forward to the opportunity to discuss further and potentially contribute to the team. </p>
                <br />
                <span>Warm regards,</span><br />
                <span>Prasanna Gramopadhye</span><br />
                <span>gramopadhye37@gmail.com</span><br />
                <span>7875594848</span><br />
            </body>
            </html>
    `,
    subject: `Application for ${role} - Prasanna Gramopadhye`
    }
}