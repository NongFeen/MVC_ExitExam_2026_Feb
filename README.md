# MVC_ExitExam_2025

```
git clone https://github.com/NongFeen/MVC_ExitExam_2026
cd MVC_ExitExam_2026
npm install
npm run dev
```

แล้วเข้าไปที่
```
localhost:3000
```

Page 
```
/candidatelist
/candidatedetail/:id
/openposition
/applyjob/:id
```
API
```
/allcandidate/
/candidatedetail/:id
/joblist
/jobdetail/:id
/applyjob
```

A.
MVC
ใน Folder models จะเป็นไฟล์ที่จัดการเกี่ยวกับข้อมูลที่เก็บและ logic ที่ใช้จัดการกับ data และส่งข้อมูลที่มีกลับไปให้ controllers
ใน Folder controllers เป็นตัวเชื่อมระหว่าง routes และ Model ที่รับ request จากผู้ใช้งานและส่งกลับข้อมูลที่ได้หรือ error กลับคืน
routes เป็นเส้น API ที่ให้ผู้ใช้เรียกใช้งาน controllers 
ใน Folder Views เป็นสิ่งที่ผู้ใช้เห็น server.js เป็น routes ของแต่ละหน้า page ต่างๆเป็น HTML และมีเส้น /api สำหรับเรียกใช้ API ใน routes เพื่อใช้งาน controller function

B. สรุป Routes/Action
Nav Bar ใช้งานไม่ได้

/candidatelist แสดงผู้สมัครทั้งหมดผ่าน /api/allcandidate โดยเรียงตามชื่อ มีปุ่ม View เพื่อดูลายละเอียดผู้สมัครคนนั้น

/candidatedetail/:id แสดงรายละเอียดผู้สมัครผ่าน /api/candidatedetail/:id โดยจะนำ id นั้นๆไปใช้ในสอง function เพื่อดึงข้อมูลผู้สมัครและดูตำแหน่งที่สมัครและนำ JobID ไปค้นหาบริษัทที่เปิดตำแหน่งนั้นๆ มาแสดง
/openposition แสดงต่ำแหน่งที่เปิดทั้งหมดโดยทุกบริษัท แสดงตำแหน่ง คำอธิบาย ชื่อบริษัท วันสุดท้ายที่สมัครได้ ผ่าน /api/joblist ดึงข้อมูลงานที่มีอยู่ทั้งหมดและนำ JobID ไปค้นหาบริษัทที่เปิดตำแหน่งนั้นๆ มาแสดง
มีปุ่มสำหรับสมัครงานเป็นการ redirect ไปยัง /applyjob/:id
/applyjob/:id ดึงข้อมูลงาน /api/jobdetail/:id นำ jobID ไปหาข้อมูลบริษัทมาแสดงพร้อมกับข้อมูลงาน มีปุ่ม Apply for this Job เพื่อส่ง Post request สมัครงานนั้นๆ จะมีการครวจสอบใน request นั้นๆว่ามี candidateID,jobID ไม่ใช่การสมัครซ้ำและดูวันที่สมัครเกิน deadline หรือไม่ถึงจะสมัครได้


