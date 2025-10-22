import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, totalScore, maxScore, answers, advice } = body;

        // Гүйцэтгэх өгөгдөл шалгах
        if (!userId || typeof totalScore !== 'number' || typeof maxScore !== 'number' || !Array.isArray(answers)) {
            return NextResponse.json(
                { success: false, message: 'Шаардлагатай өгөгдөл дутуу байна' },
                { status: 400 }
            );
        }

        // Хэрэглэгч байгаа эсэхийг шалгах
        const user = await db.users.findByPhone(userId); // userId нь phone дугаар байж болно
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Хэрэглэгч олдсонгүй' },
                { status: 404 }
            );
        }

        // Тестийн үр дүн хадгалах
        const testResult = await db.testResults.create({
            userId: user.id,
            totalScore,
            maxScore,
            answers,
            advice: advice || '',
        });

        return NextResponse.json({
            success: true,
            message: 'Тестийн үр дүн амжилттай хадгалагдлаа',
            data: {
                testId: testResult.id,
                completedAt: testResult.completedAt,
            }
        });

    } catch (error) {
        console.error('Тестийн үр дүн хадгалах API алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}

// Хэрэглэгчийн тестийн түүхийг авах
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'Хэрэглэгчийн ID шаардлагатай' },
                { status: 400 }
            );
        }

        // Хэрэглэгчийн тестийн түүх авах
        const testHistory = await db.testResults.findByUser(userId);

        return NextResponse.json({
            success: true,
            data: {
                tests: testHistory.map(test => ({
                    id: test.id,
                    totalScore: test.totalScore,
                    maxScore: test.maxScore,
                    percentage: Math.round((test.totalScore / test.maxScore) * 100),
                    completedAt: test.completedAt,
                })),
                totalTests: testHistory.length,
            }
        });

    } catch (error) {
        console.error('Тестийн түүх авах API алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}