# 🚨 Twilio Error 21660 - Account/Phone Mismatch

## ❌ Асуудал:
```
Error 21660: Mismatch between the 'From' number +1[phone_number] and the account AC[account_sid]
```

**Шалтгаан:** Phone number таны account-д байхгүй эсвэл зөвшөөрөл алга.

## 🔧 Шийдэл - Verify Service ашиглах:

### 1. Twilio Console дээр Verify Service үүсгэх:
1. https://console.twilio.com руу орно
2. **Verify > Services** хэсэгт орно
3. **"Create new Verify Service"** товч дарна
4. **Service Name:** "Setgel-zui SMS"
5. **Create Service** дарна

### 2. Service SID авах:
- Үүссэн service дээр дарах
- **Service SID** (VAxxxxx...) хуулах
- Жишээ: `VA1234567890abcdef1234567890abcdef`

### 3. .env.local файлд нэмэх:
```bash
# Phone number-ын оронд Verify Service ашиглах
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🎯 Verify Service давуу тал:
- ✅ Phone number шаардлагагүй
- ✅ Trial account дээр ажиллана
- ✅ Mongolia (+976) дэмжнэ
- ✅ Автомат verification код илгээнэ
- ✅ Account/Phone mismatch алдаа гарахгүй

## 📱 Одоогийн fallback:
Development орчинд fallback ажиллаж код console дээр харагдаж байна:
```
SMS код: 796985
```

**Verify Service үүсгэсний дараа бодит SMS ажиллах болно!**