// test-production.js - Production горимыг локал дээр тест хийх
const fetch = require('node-fetch');

// Environment variables тохируулах
process.env.NODE_ENV = 'production';
process.env.GMAIL_USER = 'monhbatsanchir1@gmail.com';
process.env.GMAIL_APP_PASSWORD = 'your_app_password_here'; // Бодит password оруулна уу

console.log('Production горимыг тест хийж байна...');
console.log('NODE_ENV:', process.env.NODE_ENV);

async function testEmail() {
    try {
        const response = await fetch('http://localhost:3000/api/survey/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                totalScore: 25,
                maxScore: 75,
                answers: [1, 2, 3, 4, 5],
                advice: 'Test advice'
            })
        });

        const result = await response.json();
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Dev server ажиллаж байгаа эсэхийг шалгах
setTimeout(testEmail, 1000);