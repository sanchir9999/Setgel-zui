This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Функцууд

✅ **Амьдралын стрессийн түвшний тест** - 15 асуулттай психологийн тест  
✅ **Дэлгэрэнгүй тайлан** - Оноо, хариултууд, зөвлөгөөтэй  
✅ **Мэйлээр тайлан авах** - Хэрэглэгч тестийн үр дүнгээ мэйлээр хүлээн авдаг  
✅ **Responsive дизайн** - Утас, таблет, компьютерт тохирсон  
✅ **Өдөр/шөнийн горим** - Харанхуй, гэрэл горим солих боломжтой

## Мэйл тохиргоо

Мэйл илгээх үйлдэл зөвхөн **production орчинд** (Vercel дээр deploy хийсэн үед) ажиллана. Хөгжүүлэлтийн үед console дээр мэдээлэл хэвлэгдэнэ.

### Орчны хувьсагч тохируулах:

1. `.env.example` файлыг `.env.local` болгож хуулна уу
2. Gmail тохиргоог оруулна уу:

```bash
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Gmail App Password үүсгэх:
1. Google Account > Security > 2-Step Verification идэвхжүүлэх
2. App passwords хэсгээс шинэ app password үүсгэх
3. Энэ password-ыг `GMAIL_APP_PASSWORD`-т ашиглана

> ⚠️ Зааврыг [эндээс](https://support.google.com/accounts/answer/185833?hl=en) дэлгэрэнгүй харна уу.

### Production Deploy (Vercel):
Vercel дээр deploy хийхдээ Environment Variables хэсэгт дээрх хувьсагчуудыг нэмнэ үү.
