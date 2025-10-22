import { NextRequest, NextResponse } from 'next/server';

// Хөгжүүлэлтийн зорилгоор SMS код харуулах API
// Production орчинд устгах ёстой!

let recentCodes: { phone: string; code: string; timestamp: Date }[] = [];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get('phone');

        if (!phone) {
            return NextResponse.json(
                { success: false, message: 'Утасны дугаар шаардлагатай' },
                { status: 400 }
            );
        }

        // Сүүлийн 5 минутын дотор илгээсэн кодыг олох
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const recentCode = recentCodes
            .filter(rc => rc.phone === phone && rc.timestamp > fiveMinutesAgo)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

        if (!recentCode) {
            return NextResponse.json(
                { success: false, message: 'Сүүлийн 5 минутад илгээсэн код олдсонгүй' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                phone: recentCode.phone,
                code: recentCode.code,
                sentAt: recentCode.timestamp,
                note: 'Энэ нь зөвхөн хөгжүүлэлтийн зорилгоор харуулж байна'
            }
        });

    } catch (error) {
        console.error('SMS код авах алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, code } = body;

        if (!phone || !code) {
            return NextResponse.json(
                { success: false, message: 'Утас болон код шаардлагатай' },
                { status: 400 }
            );
        }

        saveDevelopmentSMSCode(phone, code);

        return NextResponse.json({
            success: true,
            message: 'SMS код хадгалагдлаа'
        });

    } catch (error) {
        console.error('SMS код хадгалах алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}

// SMS код хадгалах функц
function saveDevelopmentSMSCode(phone: string, code: string) {
    recentCodes.push({
        phone,
        code,
        timestamp: new Date()
    });

    // 10 минутаас өмнөх кодуудыг устгах
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    recentCodes = recentCodes.filter(rc => rc.timestamp > tenMinutesAgo);
}