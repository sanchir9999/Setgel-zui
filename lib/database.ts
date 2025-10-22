// Database connection and schema definitions
import twilio from 'twilio';

// Хэрэглэгчийн бүтэц
export interface User {
    id: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
}

// Баталгаажуулах кодын бүтэц
export interface VerificationCode {
    id: string;
    phone: string;
    code: string;
    expiresAt: Date;
    isUsed: boolean;
    createdAt: Date;
}

// Тестийн үр дүнгийн бүтэц
export interface TestResult {
    id: string;
    userId: string;
    totalScore: number;
    maxScore: number;
    answers: number[];
    advice: string;
    completedAt: Date;
}

// Одоогийн хувьд файлын системд хадгална (сургалтын зорилгоор)
// Бодит ашиглалтын хувьд PostgreSQL, MongoDB гэх мэт database ашиглах
const users: User[] = [];
const verificationCodes: VerificationCode[] = [];
const testResults: TestResult[] = [];

export const db = {
    users: {
        create: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
            const user: User = {
                id: generateId(),
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            users.push(user);
            return user;
        },

        findByPhone: async (phone: string): Promise<User | null> => {
            return users.find(u => u.phone === phone) || null;
        },

        findByEmail: async (email: string): Promise<User | null> => {
            return users.find(u => u.email === email) || null;
        },

        updateVerification: async (userId: string, isVerified: boolean): Promise<User | null> => {
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex === -1) return null;

            users[userIndex].isVerified = isVerified;
            users[userIndex].updatedAt = new Date();
            return users[userIndex];
        }
    },

    verificationCodes: {
        create: async (codeData: Omit<VerificationCode, 'id' | 'createdAt'>): Promise<VerificationCode> => {
            // Өмнөх кодуудыг устгах
            const indicesToRemove: number[] = [];
            for (let i = verificationCodes.length - 1; i >= 0; i--) {
                const vc = verificationCodes[i];
                if (vc.phone === codeData.phone && !vc.isUsed && vc.expiresAt >= new Date()) {
                    indicesToRemove.push(i);
                }
            }
            indicesToRemove.forEach(index => verificationCodes.splice(index, 1));

            const verificationCode: VerificationCode = {
                id: generateId(),
                ...codeData,
                createdAt: new Date(),
            };
            verificationCodes.push(verificationCode);
            return verificationCode;
        },

        findValidCode: async (phone: string, code: string): Promise<VerificationCode | null> => {
            return verificationCodes.find(
                vc => vc.phone === phone &&
                    vc.code === code &&
                    !vc.isUsed &&
                    vc.expiresAt > new Date()
            ) || null;
        },

        markAsUsed: async (id: string): Promise<void> => {
            const codeIndex = verificationCodes.findIndex(vc => vc.id === id);
            if (codeIndex !== -1) {
                verificationCodes[codeIndex].isUsed = true;
            }
        }
    },

    testResults: {
        create: async (resultData: Omit<TestResult, 'id' | 'completedAt'>): Promise<TestResult> => {
            const testResult: TestResult = {
                id: generateId(),
                ...resultData,
                completedAt: new Date(),
            };
            testResults.push(testResult);
            return testResult;
        },

        findByUser: async (userId: string): Promise<TestResult[]> => {
            return testResults.filter(tr => tr.userId === userId);
        }
    }
};

// ID үүсгэх функц
function generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// SMS илгээх функц
export async function sendSMS(phone: string, message?: string): Promise<boolean> {
    console.log(`📱 SMS to ${phone}`);

    // Twilio тохиргоонууд
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    // Хэрэв Twilio тохиргоо дутуу бол fallback рүү шилжих
    if (!accountSid || !authToken || !verifyServiceSid) {
        console.log('⚠️ Twilio Verify тохиргоо дутуу байна. Fallback рүү шилждэж байна.');

        // Fallback зорилгоор manual код үүсгэх
        if (message) {
            // Монголын SMS API (Skytel жишээ) эсвэл бусад API
            const mongolianSMS = await sendMongolianSMS(phone, message);
            if (mongolianSMS) return true;

            console.log(`Fallback консол SMS: ${phone} → ${message}`);
        }

        return false; // Fallback амжилтгүй бол false буцаах
    }

    try {
        const client = twilio(accountSid, authToken);

        // Монголын утасны дугаарыг олон улсын форматруу хөрвүүлэх (+976)
        let formattedPhone = phone;
        if (!phone.startsWith('+')) {
            if (phone.length === 8) {
                formattedPhone = '+976' + phone;
            }
        }

        // Verify Service ашиглаж автомат SMS илгээх (зөвхөн нэг удаа)
        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: formattedPhone, channel: 'sms' });

        console.log(`✅ Twilio Verify SMS илгээгдлээ: ${formattedPhone}`);
        console.log(`Verification SID: ${verification.sid}`);
        return true;

    } catch (error) {
        console.error('❌ Twilio алдаа:', error);

        // Алдаа гарвал fallback manual SMS
        if (message) {
            const mongolianSMS = await sendMongolianSMS(phone, message);
            if (mongolianSMS) return true;

            console.log(`Fallback SMS: ${phone} → ${message}`);
        }

        return false; // Бүх арга амжилтгүй бол false
    }
}

// Монголын SMS API (Skytel, Unitel, Mobicom гэх мэт)
async function sendMongolianSMS(phone: string, message: string): Promise<boolean> {
    try {
        // Skytel SMS API жишээ (API key шаардлагатай)
        const skytelApiKey = process.env.SKYTEL_API_KEY;
        const skytelUsername = process.env.SKYTEL_USERNAME;

        if (skytelApiKey && skytelUsername) {
            const response = await fetch('https://api.skytel.mn/v1/sms/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${skytelApiKey}`
                },
                body: JSON.stringify({
                    username: skytelUsername,
                    phone: phone,
                    message: message
                })
            });

            if (response.ok) {
                console.log(`✅ Skytel SMS илгээгдлээ: ${phone}`);
                return true;
            }
        }

        // Бусад Монголын провайдерууд энд нэмж болно
        console.log('⚠️ Монголын SMS API тохиргоо байхгүй');
        return false;

    } catch (error) {
        console.error('❌ Монголын SMS алдаа:', error);
        return false;
    }
}

// Twilio Verify Service код баталгаажуулах функц
export async function verifyTwilioCode(phone: string, code: string): Promise<{ success: boolean; message: string }> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !verifyServiceSid) {
        return { success: false, message: 'Twilio тохиргоо дутуу байна' };
    }

    try {
        const client = twilio(accountSid, authToken);

        // Монголын утасны дугаарыг олон улсын форматруу хөрвүүлэх (+976)
        let formattedPhone = phone;
        if (!phone.startsWith('+')) {
            if (phone.length === 8) {
                formattedPhone = '+976' + phone;
            }
        }

        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: formattedPhone, code: code });

        if (verificationCheck.status === 'approved') {
            console.log(`✅ Twilio Verify баталгаажуулалт амжилттай: ${formattedPhone}`);
            return { success: true, message: 'Код зөв байна' };
        } else {
            console.log(`❌ Twilio Verify баталгаажуулалт амжилтгүй: ${verificationCheck.status}`);
            return { success: false, message: 'Код буруу эсвэл хугацаа дууссан' };
        }

    } catch (error) {
        console.error('❌ Twilio Verify баталгаажуулах алдаа:', error);
        return { success: false, message: 'Баталгаажуулахад алдаа гарлаа' };
    }
}

// 6 оронтой санамсаргүй код үүсгэх (Fallback зорилгоор)
export function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}