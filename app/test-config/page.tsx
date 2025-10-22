"use client";

import { useState } from "react";

export default function TestConfigPage() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{
        gmail: { configured: boolean; tested: boolean; error: string | null };
        twilio: { configured: boolean; tested: boolean; error: string | null };
        environment: string;
    } | null>(null);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const checkConfig = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test-config');
            const data = await response.json();
            setResults(data.data);
        } catch {
            console.error('Тохиргоо шалгахад алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    const testEmail = async () => {
        if (!email) return;

        setLoading(true);
        try {
            const response = await fetch('/api/test-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, action: 'test-email' })
            });
            const data = await response.json();
            alert(data.message);
        } catch {
            alert('Имэйл тестлэхэд алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    const testSMS = async () => {
        if (!phone) return;

        setLoading(true);
        try {
            const response = await fetch('/api/test-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, action: 'test-sms' })
            });
            const data = await response.json();
            alert(data.message);
        } catch {
            alert('SMS тестлэхэд алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">🔧 Системийн Тохиргоо Шалгалт</h1>

                <div className="grid gap-6">
                    {/* Тохиргоо шалгах */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">📋 Тохиргооны Төлөв</h2>
                        <button
                            onClick={checkConfig}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Шалгаж байна...' : 'Тохиргоог Шалгах'}
                        </button>

                        {results && (
                            <div className="mt-4 space-y-4">
                                <div className="p-4 border rounded">
                                    <h3 className="font-semibold">📧 Gmail Тохиргоо</h3>
                                    <p>Тохируулсан: {results.gmail.configured ? '✅' : '❌'}</p>
                                    <p>Тестлэгдсэн: {results.gmail.tested ? '✅' : '❌'}</p>
                                    {results.gmail.error && (
                                        <p className="text-red-600">Алдаа: {results.gmail.error}</p>
                                    )}
                                </div>

                                <div className="p-4 border rounded">
                                    <h3 className="font-semibold">📱 Twilio SMS</h3>
                                    <p>Тохируулсан: {results.twilio.configured ? '✅' : '❌'}</p>
                                    <p>Тестлэгдсэн: {results.twilio.tested ? '✅' : '❌'}</p>
                                    {results.twilio.error && (
                                        <p className="text-red-600">Алдаа: {results.twilio.error}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Имэйл тест */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">📧 Имэйл Тест</h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Имэйл хаяг оруулна уу"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            <button
                                onClick={testEmail}
                                disabled={loading || !email}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? 'Илгээж байна...' : 'Тест Имэйл Илгээх'}
                            </button>
                        </div>
                    </div>

                    {/* SMS тест */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">📱 SMS Тест</h2>
                        <div className="space-y-4">
                            <input
                                type="tel"
                                placeholder="Утасны дугаар (жишээ: 99119911)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            <button
                                onClick={testSMS}
                                disabled={loading || !phone}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {loading ? 'Илгээж байна...' : 'Тест SMS Илгээх'}
                            </button>
                        </div>
                    </div>

                    {/* Тайлбар */}
                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-yellow-800 mb-2">ℹ️ Анхаарах зүйлс</h3>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                            <li>• Gmail: 2-factor authentication асаалттай байх шаардлагатай</li>
                            <li>• Gmail App Password үүсгэж .env.local файлд тохируулна уу</li>
                            <li>• Twilio: Account SID, Auth Token, Verify Service SID шаардлагатай</li>
                            <li>• SMS: Twilio Verify Service ашигладаг тул өөр SMS илгээхгүй</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}