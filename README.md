## บริการจัดการข้อมูลผู้ใช้

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## การติดตั้ง

1. ดาวน์โหลดผ่าน [ลิงก์](https://github.com/UntitleCMS/UserInformationService/releases) หรือใช้คำสั่ง

```bash
$ git clone https://github.com/UntitleCMS/UserInformationService.git
```

2. ติดตั้ง dependencies

```bash
$ npm install
```

## เปิดเซิฟเวอร์เพื่อพัฒนา

1. เปิด RabbitMQ เพื่อจำลองเหตุการการสื่อสารกับบริการย่อยอื่น

```bash
$ docker run -d -p "15672:15672" -p "5672:5672" rabbitmq:3-management
```

2. เปิด MongoDB เพื่อใช้เป็นฐานข้อมูล

```bash
$ docker compose up mongo1
```


1. รันแอพลิเคชั่น UserInformationService แบบตรวจจับการเปลี่ยนแปลง

```bash
# watch mode
$ npm run dev:ts
```

หลังจากนี้ระบบจะตรวจจับการเปลี่ยนแปลงและรันแอปพลิเคชั่นให้อัตโนมัติ

3. รันระบบผ่าน Docker

```bash
$ docker compose up
```
