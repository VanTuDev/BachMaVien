# Bách Mã Viên - website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · lucide-react.

```bash
npm install
npm run dev        # http://localhost:5062  (tự chuyển về /vi)
npm run build && npm start   # production, cũng port 5062
npm run images     # tạo lại public/images từ ../DataImage (chỉ resize, không crop)
npm run video      # nén video demo 3D (4K HEVC) thành MP4 1080p trong public/video, cần ffmpeg
```

Sao chép `.env.example` thành `.env.local` và điền:

| Biến                   | Công dụng                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Domain thật (bỏ trống thì tự dùng URL `*.vercel.app` trên Vercel). Dùng cho canonical, sitemap, Open Graph, JSON-LD |
| `BOOKING_WEBHOOK_URL`  | Nơi nhận yêu cầu đặt lịch (JSON). Không có thì production trả 503                                                   |

## Cấu trúc

```
messages/<locale>/*.json   Nội dung dịch, mỗi trang một file (common, shared, home, about, services, experience, menu, booking, seo, images)
src/i18n/                  routing (danh sách ngôn ngữ), navigation (Link locale-aware), request (nạp messages)
src/proxy.ts               Chuyển "/" và đường dẫn không prefix sang ngôn ngữ phù hợp
src/app/[locale]/          Các trang: /, about, services (vé + dịch vụ), experience (3D), menu, booking
src/app/api/booking/       API nhận form đặt lịch (validate, honeypot, chuyển tiếp webhook)
src/components/ui/         Thành phần dùng chung (Button, Photo, Section, PageHero...)
src/components/sections/   Các khối của từng trang
src/data/                  Dữ liệu không phải văn bản: giá gói, thực đơn, đội ngũ, ảnh, điều hướng
scripts/                   optimize-images.mjs và images.manifest.json (kích thước ảnh gốc)
```

## Việc thường làm

- **Sửa chữ**: sửa trong `messages/vi/*.json` và `messages/en/*.json`. Khóa kiểu TypeScript, thiếu khóa sẽ báo lỗi khi `npm run typecheck`.
- **Đổi giá vé / nội dung vé**: `src/data/tickets.ts` (giá, ảnh vòng tay, mục bao gồm) và `messages/*/shared.json` (tên + mô tả). Giá ghi trong `messages/*/seo.json` cần sửa tay.
- **Giờ mở cửa, số điện thoại, Zalo, email**: `src/data/site.ts` (đang là thông tin tạm, cần thay bằng thông tin thật).
- **Đổi món / giá thực đơn**: `src/data/menu.ts` (cập nhật cả ảnh poster `menu.jpg` rồi chạy `npm run images`).
- **Thêm ảnh**: thêm dòng vào `scripts/optimize-images.mjs`, chạy `npm run images`, thêm mô tả (alt) vào `messages/*/images.json`, dùng `<Photo name="..." sizes="..." />`.
- **Thêm tiếng Trung / Hàn**: thêm `zh` / `ko` vào `src/i18n/routing.ts` (và `localeMeta`), sao chép `messages/en` thành `messages/zh`, dịch, thêm font CJK trong `src/lib/fonts.ts` (CSS `:lang(zh)` / `:lang(ko)` đã chuẩn bị sẵn).

- **Trang Trải Nghiệm 3D (`/experience`)**: cảnh và điểm dừng khai báo trong `src/data/tour.ts` (thứ tự = lộ trình tham quan), chữ trong `messages/*/experience.json`, ảnh render 3D là các mục `scene-*` trong `scripts/optimize-images.mjs`. Mốc thời gian các chương video (`videoChapters`) cũng nằm trong `src/data/tour.ts`; thay video thì chạy `npm run video` rồi chỉnh lại các mốc này.

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
