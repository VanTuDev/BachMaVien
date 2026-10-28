# Bách Mã Viên - website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · lucide-react.

```bash
npm install
npm run dev        # http://localhost:5062  (tự chuyển về /vi)
npm run build && npm start   # production, cũng port 5062
npm run images     # tạo lại public/images từ ../DataImage (chỉ resize, không crop)
```

Sao chép `.env.example` thành `.env.local` và điền:

| Biến | Công dụng |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domain thật (bỏ trống thì tự dùng URL `*.vercel.app` trên Vercel). Dùng cho canonical, sitemap, Open Graph, JSON-LD |
| `BOOKING_WEBHOOK_URL` | Nơi nhận yêu cầu đặt lịch (JSON). Không có thì production trả 503 |

## Cấu trúc

```
messages/<locale>/*.json   Nội dung dịch, mỗi trang một file (common, home, about, services, menu, safety, booking, seo, images)
src/i18n/                  routing (danh sách ngôn ngữ), navigation (Link locale-aware), request (nạp messages)
src/proxy.ts               Chuyển "/" và đường dẫn không prefix sang ngôn ngữ phù hợp
src/app/[locale]/          Các trang: /, about, services, menu, safety, booking
src/app/api/booking/       API nhận form đặt lịch (validate, honeypot, chuyển tiếp webhook)
src/components/ui/         Thành phần dùng chung (Button, Photo, Section, PageHero...)
src/components/sections/   Các khối của từng trang
src/data/                  Dữ liệu không phải văn bản: giá gói, thực đơn, đội ngũ, ảnh, điều hướng
scripts/                   optimize-images.mjs và images.manifest.json (kích thước ảnh gốc)
```

## Việc thường làm

- **Sửa chữ**: sửa trong `messages/vi/*.json` và `messages/en/*.json`. Khóa kiểu TypeScript, thiếu khóa sẽ báo lỗi khi `npm run typecheck`.
- **Đổi giá gói**: `src/data/package-prices.ts` (tự cập nhật thẻ gói, bảng so sánh, form đặt lịch). Giá ghi trong `messages/*/seo.json` cần sửa tay.
- **Đổi món / giá thực đơn**: `src/data/menu.ts` (cập nhật cả ảnh poster `menu.jpg` rồi chạy `npm run images`).
- **Thêm ảnh**: thêm dòng vào `scripts/optimize-images.mjs`, chạy `npm run images`, thêm mô tả (alt) vào `messages/*/images.json`, dùng `<Photo name="..." sizes="..." />`.
- **Thêm tiếng Trung / Hàn**: thêm `zh` / `ko` vào `src/i18n/routing.ts` (và `localeMeta`), sao chép `messages/en` thành `messages/zh`, dịch, thêm font CJK trong `src/lib/fonts.ts` (CSS `:lang(zh)` / `:lang(ko)` đã chuẩn bị sẵn).

## Quy ước

- Không dùng emoji, icon luôn lấy từ `lucide-react`.
- Ảnh luôn hiển thị đúng tỉ lệ gốc (`<Photo>` dùng width/height thật), không crop.
- Font: Be Vietnam Pro (nội dung) + Merriweather (tiêu đề), nạp subset `vietnamese`.

## Deploy lên Vercel

1. Vercel > Add New > Project > import repo `VanTuDev/BachMaVienHoiAn` (Framework: Next.js, nhận từ `vercel.json`).
2. Environment Variables (Production):
   - `BOOKING_WEBHOOK_URL`: bắt buộc để form đặt lịch hoạt động.
   - `NEXT_PUBLIC_SITE_URL`: điền sau khi có domain, ví dụ `https://www.bachmavien.vn`, rồi Redeploy.
3. Mỗi lần push lên `main` Vercel tự build và deploy; pull request có bản preview riêng.
4. Gắn domain: Project > Settings > Domains > Add, rồi trỏ DNS theo hướng dẫn Vercel hiển thị.

`public/images` đã được tối ưu sẵn và nằm trong repo. Ảnh gốc (`DataImage`) không nằm trong repo, nên `npm run images` chỉ chạy được trên máy có thư mục đó.
