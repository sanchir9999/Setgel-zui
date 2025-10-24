# Production Deployment Guide - Setgel-zui

## 🎯 Таны мэдээлэл дээр үндэслэн:

### Environment Variables for Production (Vercel)

```bash
# Email Configuration
GMAIL_USER=monhbatsanchir1@gmail.com
GMAIL_APP_PASSWORD=siqasdqzgqjrpiqq

# Twilio Configuration  
TWILIO_ACCOUNT_SID=AC[your_account_sid]
TWILIO_AUTH_TOKEN=[your_auth_token]
TWILIO_PHONE_NUMBER=+1315400617

# Optional: Twilio Verify Service (if you want to use Verify Service)
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Application
NODE_ENV=production
```

### 📋 Deployment Steps:

1. **Vercel Dashboard руу орох:**
   - https://vercel.com/dashboard
   - Project сонгох: `Setgel-zui`

2. **Settings → Environment Variables:**
   - Дээрх бүх variables нэмэх
   - "Production" environment сонгох

3. **Redeploy хийх:**
   - Deployments tab → "Redeploy" товч дарах

### 🧪 Test URLs (production deployment дараа):

```bash
# Configuration шалгах
GET https://your-app.vercel.app/api/test-config

# Test email илгээх
POST https://your-app.vercel.app/api/test-config
{
  "action": "test-email",
  "email": "test@example.com"
}

# Test SMS илгээх  
POST https://your-app.vercel.app/api/test-config
{
  "action": "test-sms",
  "phone": "99112233"
}
```

### 🔧 Local Development Test:

Development server (localhost:3001) дээр доорх URL руу очиж тест хийж болно:

- Configuration: http://localhost:3001/api/test-config
- Main app: http://localhost:3001

### ⚠️ Анхаарах зүйлс:

1. **Gmail App Password:**
   - 16 оронтой код зөв эсэхийг шалгах
   - 2-Step Verification идэвхтэй эсэхийг шалгах

2. **Twilio Phone Number:**
   - SMS capability байгаа эсэхийг Twilio Console дээр шалгах
   - Mongolia (+976) рүү SMS илгээх боломжтой эсэхийг шалгах

3. **Vercel Function Limits:**
   - Free план дээр 10,000 function executions/month
   - SMS/Email хязгаарыг анхаарах

### 📞 Тусламж:

Хэрэв production дээр асуудал гарвал:
- `PRODUCTION_TROUBLESHOOTING.md` файлыг уншина уу
- Vercel Function Logs шалгана уу
- Console.log outputs харна уу