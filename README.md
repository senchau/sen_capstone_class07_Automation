# 🎬 SEN Capstone – Automation Test (Playwright + TypeScript)

## 1. Giới thiệu

Đây là project **Automation Testing** sử dụng **Playwright + TypeScript**, áp dụng mô hình **Page Object Model (POM)** để kiểm thử hệ thống đặt vé xem phim.

Phạm vi kiểm thử:
- Đăng ký / Đăng nhập / Đăng xuất
- Trang chủ
- Chi tiết phim
- Quy trình đặt vé (rạp, suất chiếu, ghế)
- Các component UI dùng chung

Mục tiêu:
- Code test rõ ràng, dễ đọc
- Dễ bảo trì và mở rộng
- Tách biệt rõ ràng giữa test logic và UI locator
- Hạn chế trùng lặp code

---

## 2. Công nghệ sử dụng

- Node.js
- TypeScript
- Playwright
- Page Object Model (POM)
- JSON Test Data
- Playwright HTML Report

---

## 3. Kiến trúc & tư duy thiết kế

Project được xây dựng dựa trên các nguyên tắc:

- **Page Object Model (POM)**
  - Mỗi page đại diện cho một màn hình
  - Locator & action nằm trong page, không nằm trong test

- **Component-based**
  - Các UI component dùng chung (Header, Modal…) được tách riêng
  - Giảm duplication khi nhiều page dùng cùng component

- **Data-driven testing**
  - Test data được tách ra file JSON
  - Dễ thay đổi dữ liệu, dễ mở rộng test case

---

## 4. Fixtures & Helpers

### Fixtures
- Dùng để setup sẵn context cho test
- Hỗ trợ login trước khi chạy test
- Tái sử dụng setup user / auth

### Helpers
- Chứa các hàm tiện ích:
  - Normalize URL
  - Format logs
  - Common helper cho test

➡️ Giúp code test ngắn gọn, dễ đọc.

---

## 5. Page Object Model

### Base Page
- Là lớp cha cho tất cả page
- Chứa các hành động chung:
  - Điều hướng trang
  - Click / Fill
  - Wait page load

### Page
- Mỗi page chỉ chịu trách nhiệm cho **1 màn hình**
- Không chứa assert
- Chỉ expose các hành động cần thiết cho test

### Component
- Đại diện cho các thành phần UI tái sử dụng
- Được inject vào page khi cần

---

## 6. Test cases

- Mỗi test file tương ứng với **một nhóm chức năng**
- Test được viết theo mô hình:
  - Arrange
  - Act
  - Assert
- Test **không chứa locator**
- Test **chỉ gọi method từ Page Object**

---

## 7. Cài đặt

### Cài dependencies
```bash
yarn
```
### Cài Playwright browsers
```bash
npx playwright install
```

## 8. Chạy test

### Chạy toàn bộ test 
```bash
npx playwright test
```
### Chạy test theo thư mục
```bash
npx playwright test tests/authen
```
### Chạy với UI mode
```bash
npx playwright test --ui
```

## 9. Báo cáo test

### Sau khi chạy test
```bash
npx playwright show-report
```

## 10. Quy ước code
- Không viết locator trong file test
- Một page = một file
- Component dùng chung phải tách riêng
- Test data không được hard-code
- Ưu tiên typing bằng TypeScript interface
