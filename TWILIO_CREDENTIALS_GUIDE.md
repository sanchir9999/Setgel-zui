# 🔑 Twilio Credentials Guide

## 📊 Таны Twilio Credentials:

### 🔴 Live Credentials (Production):
```
Account SID: AC[your_live_account_sid]
Auth Token:  [your_live_auth_token]
```

### 🧪 Test Credentials (Development):
```
Account SID: AC[your_test_account_sid]
Auth Token:  [your_test_auth_token]
```

## 🎯 Хэзээ ямар credentials ашиглах:

### 🔴 Live Credentials ашиглах:
- ✅ **Production deployment** (Vercel, Netlify г.м)
- ✅ **Бодит SMS илгээх** шаардлагатай үед
- ✅ **Mongolia (+976) руу SMS илгээх**
- ⚠️ **Төлбөртэй** - SMS тус бүрээр төлнө
- ⚠️ **Анхаартай хадгалах** шаардлагатай

### 🧪 Test Credentials ашиглах:
- ✅ **Development орчин** (localhost)
- ✅ **Code тест хийх**
- ✅ **Verify Service тест**
- ✅ **Үнэгүй** - төлбөр хасагдахгүй
- ⚠️ Бодит SMS илгээгдэхгүй (зөвхөн simulation)

## 🔧 Одоогийн тохиргоо:

Таны `.env.local` файлд **Mixed credentials** байна:
```bash
TWILIO_ACCOUNT_SID=AC[live_account_sid]  # Live
TWILIO_AUTH_TOKEN=[test_auth_token]      # Test
```

⚠️ **Холимог байна!** SID болон Token өөр өөр credentials-аас байна.

## ✅ Зөвлөгөө:

### Development орчинд:
```bash
# .env.local файлд Test credentials ашиглах
TWILIO_ACCOUNT_SID=AC[test_account_sid]
TWILIO_AUTH_TOKEN=[test_auth_token]
```

### Production орчинд:
```bash
# Vercel Environment Variables дээр Live credentials
TWILIO_ACCOUNT_SID=AC[live_account_sid]
TWILIO_AUTH_TOKEN=[live_auth_token]
```

## 🧪 Тест хийх:

Test credentials ашиглаж development тест хийгээрэй:
- Алдаа гарахгүй болно
- Verify Service тест хийх боломжтой
- Үнэгүй

Live credentials зөвхөн production дээр ашиглаарай!